import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  console.warn('OPENAI_API_KEY is not defined in environment variables')
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-proj-placeholder',
})

/**
 * Get AI-driven car wash service recommendations based on user input.
 */
export async function getWashRecommendation(carType: string, dirtLevel: string, contextRules: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are an expert car detailing concierge for LuxeWash.
        Based on the car type and dirt level, recommend one of our packages:
        - Signature Exterior Wash
        - The Luxe Detail
        Respond in JSON format: { "recommendedPackageSlug": string, "rationale": string }`,
      },
      {
        role: 'user',
        content: `Car: ${carType}, Dirt Level: ${dirtLevel}. Rules: ${contextRules}`,
      },
    ],
    response_format: { type: 'json_object' },
  })

  return JSON.parse(response.choices[0].message.content || '{}')
}

/**
 * Analyze an uploaded photo using Vision API to detect dirt level, damage, etc.
 */
export async function analyzeCarPhoto(imageUrl: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Analyze this car photo. Extract: condition, dirtLevel (1-10), visibleDamage (boolean), damageDescription. Return JSON.' },
          { type: 'image_url', image_url: { url: imageUrl } },
        ],
      },
    ],
    response_format: { type: 'json_object' },
  })
  
  return JSON.parse(response.choices[0].message.content || '{}')
}
