'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { FadeIn } from '@/components/animations/fade-in'
import { signIn } from 'next-auth/react'

export default function RegisterPage() {
  const router = useRouter()
  const { addToast } = useToast()
  
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In production, this would hit an API route /api/auth/register
      // For MVP, simulating success and redirecting to login
      await new Promise(r => setTimeout(r, 1500))
      
      addToast({ title: 'Account Created', description: 'Welcome to LuxeWash. Please sign in.', type: 'success' })
      router.push('/login')
    } catch (err: unknown) {
      addToast({ title: 'Registration Failed', description: (err as Error).message, type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FadeIn>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display text-white mb-2">Join LuxeWash</h1>
          <p className="text-sm text-text-secondary">Create your account to unlock exclusive member privileges.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input 
            label="Email Address"
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input 
            label="Phone Number"
            type="tel"
            placeholder="(555) 000-0000"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            required
          />
          <Input 
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <Button type="submit" variant="premium" className="w-full mt-2" isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-white/10" />
          <span className="flex-shrink-0 mx-4 text-xs text-text-tertiary uppercase tracking-widest">or sign up with</span>
          <div className="flex-grow border-t border-white/10" />
        </div>

        <button 
          onClick={() => signIn('google')}
          type="button" 
          className="w-full flex items-center justify-center gap-3 border border-white/10 bg-void/50 hover:bg-white/5 text-white font-medium py-3 rounded-sm transition-colors text-sm"
        >
          <FcGoogle size={20} /> Google
        </button>

        <p className="text-center text-sm text-text-secondary pt-4">
          Already a member?{' '}
          <Link href="/login" className="text-gold hover:text-white transition-colors underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </FadeIn>
  )
}
