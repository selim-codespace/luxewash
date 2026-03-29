import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import sharp from 'sharp'

const s3Client = new S3Client({
  region: process.env.S3_REGION || 'auto',
  endpoint: process.env.S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || '',
    secretAccessKey: process.env.S3_SECRET_KEY || '',
  },
})

const BUCKET = process.env.S3_BUCKET_NAME || 'luxewash'

/**
 * Generate a pre-signed URL for direct client-to-R2/S3 upload
 */
export async function generateUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    ContentType: contentType,
  })

  // URL expires in 15 minutes
  return getSignedUrl(s3Client, command, { expiresIn: 900 })
}

/**
 * Server-side image upload with optional processing using Sharp
 */
export async function processAndUploadImage(fileBuffer: Buffer, filename: string, options?: { width?: number; height?: number }) {
  let processedBuffer = fileBuffer
  
  if (options) {
    let pipeline = sharp(fileBuffer).webp({ quality: 80 })
    if (options.width || options.height) {
      pipeline = pipeline.resize(options.width, options.height, { fit: 'cover' })
    }
    processedBuffer = await pipeline.toBuffer()
  }

  const key = `uploads/${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '')}`

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: processedBuffer,
      ContentType: 'image/webp',
    })
  )

  return `https://${process.env.NEXT_PUBLIC_CDN_DOMAIN}/${key}`
}

export async function deleteFileFromStorage(key: string) {
  await s3Client.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  )
}
