'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'
import Button from '../ui/Button'
import Input from '../ui/Input'

export default function Footer() {
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setMessage('')

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            if (response.ok) {
                setMessage('Thanks for subscribing!')
                setEmail('')
            } else {
                setMessage('Something went wrong. Please try again.')
            }
        } catch (error) {
            setMessage('Something went wrong. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <footer className="border-t border-neutral-200 bg-neutral-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <h3 className="text-xl font-bold text-neutral-900">LUXE</h3>
                        <p className="mt-4 text-sm text-neutral-600">
                            Premium clothing for the modern lifestyle. Sustainable, ethical, and timeless.
                        </p>
                        <div className="mt-6 flex space-x-4">
                            <a href="#" className="text-neutral-600 hover:text-neutral-900" aria-label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-neutral-600 hover:text-neutral-900" aria-label="Facebook">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-neutral-600 hover:text-neutral-900" aria-label="Twitter">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-semibold text-neutral-900">Shop</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><Link href="/shop" className="text-neutral-600 hover:text-neutral-900">All Products</Link></li>
                            <li><Link href="/shop?collection=men" className="text-neutral-600 hover:text-neutral-900">Men</Link></li>
                            <li><Link href="/shop?collection=women" className="text-neutral-600 hover:text-neutral-900">Women</Link></li>
                            <li><Link href="/shop?collection=essentials" className="text-neutral-600 hover:text-neutral-900">Essentials</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-neutral-900">Company</h4>
                        <ul className="mt-4 space-y-2 text-sm">
                            <li><Link href="/about" className="text-neutral-600 hover:text-neutral-900">About Us</Link></li>
                            <li><Link href="/privacy" className="text-neutral-600 hover:text-neutral-900">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-neutral-600 hover:text-neutral-900">Terms of Service</Link></li>
                            <li><Link href="/shipping" className="text-neutral-600 hover:text-neutral-900">Shipping & Returns</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold text-neutral-900">Stay Updated</h4>
                        <p className="mt-4 text-sm text-neutral-600">
                            Subscribe to get special offers and updates.
                        </p>
                        <form onSubmit={handleSubscribe} className="mt-4 flex flex-col space-y-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button type="submit" isLoading={isSubmitting} size="sm">
                                Subscribe
                            </Button>
                            {message && <p className="text-sm text-neutral-600">{message}</p>}
                        </form>
                    </div>
                </div>

                <div className="mt-12 border-t border-neutral-200 pt-8 text-center text-sm text-neutral-600">
                    <p>&copy; {new Date().getFullYear()} LUXE. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
