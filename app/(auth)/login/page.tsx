'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { FadeIn } from '@/components/animations/fade-in'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { addToast } = useToast()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const callbackUrl = searchParams.get('callbackUrl') || '/portal'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl,
      })

      if (res?.error) {
        addToast({ title: 'Authentication Failed', description: 'Invalid email or password', type: 'error' })
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl })
  }

  return (
    <FadeIn>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display text-white mb-2">Welcome Back</h1>
          <p className="text-sm text-text-secondary">Sign in to manage your vehicles and upcoming details.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input 
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          
          <div className="space-y-1">
            <Input 
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <div className="flex justify-end pt-1">
              <Link href="/forgot-password" className="text-xs text-gold hover:text-white transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>

          <Button type="submit" variant="premium" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-white/10" />
          <span className="flex-shrink-0 mx-4 text-xs text-text-tertiary uppercase tracking-widest">or continue with</span>
          <div className="flex-grow border-t border-white/10" />
        </div>

        <button 
          onClick={handleGoogleSignIn}
          type="button" 
          className="w-full flex items-center justify-center gap-3 border border-white/10 bg-void/50 hover:bg-white/5 text-white font-medium py-3 rounded-sm transition-colors text-sm"
        >
          <FcGoogle size={20} /> Google
        </button>

        <p className="text-center text-sm text-text-secondary pt-4">
          Don't have an account?{' '}
          <Link href="/register" className="text-gold hover:text-white transition-colors underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </div>
    </FadeIn>
  )
}
