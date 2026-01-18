'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function SignupPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState<any>({})
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})
        setIsLoading(true)

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match' })
            setIsLoading(false)
            return
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                const data = await response.json()
                setErrors({ general: data.error || 'Failed to create account' })
                setIsLoading(false)
                return
            }

            // Auto sign in after signup
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            })

            if (result?.error) {
                setErrors({ general: 'Account created but signin failed. Please login manually.' })
            } else {
                router.push('/account')
                router.refresh()
            }
        } catch (error) {
            setErrors({ general: 'Something went wrong. Please try again.' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container-custom flex min-h-[calc(100vh-200px)] items-center justify-center py-12">
            <div className="w-full max-w-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-neutral-900">Create Account</h1>
                    <p className="mt-2 text-neutral-600">Join LUXE today</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {errors.general && (
                        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
                            {errors.general}
                        </div>
                    )}

                    <Input
                        label="Full Name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        autoComplete="name"
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        autoComplete="email"
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        autoComplete="new-password"
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        error={errors.confirmPassword}
                        required
                        autoComplete="new-password"
                    />

                    <Button type="submit" className="w-full" isLoading={isLoading}>
                        Create Account
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-neutral-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-brand-600 hover:text-brand-500">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
