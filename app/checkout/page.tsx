'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'
import { useEffect } from 'react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
    const stripe = useStripe()
    const elements = useElements()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) return

        setIsLoading(true)
        setError('')

        const { error: submitError } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success`,
            },
        })

        if (submitError) {
            setError(submitError.message || 'Payment failed')
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            {error && (
                <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
                    {error}
                </div>
            )}
            <Button type="submit" className="w-full" size="lg" isLoading={isLoading} disabled={!stripe}>
                Pay Now
            </Button>
            <p className="text-center text-xs text-neutral-500">
                Test Mode: Use card 4242 4242 4242 4242 with any future date and CVC
            </p>
        </form>
    )
}

export default function CheckoutPage() {
    const { data: session } = useSession()
    const { items, getTotal, clearCart } = useCart()
    const router = useRouter()
    const [clientSecret, setClientSecret] = useState('')
    const [shippingMethod, setShippingMethod] = useState('standard')
    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'US',
    })

    const subtotal = getTotal()
    const shipping = shippingMethod === 'express' ? 25 : 10
    const total = subtotal + shipping

    useEffect(() => {
        if (items.length === 0) {
            router.push('/cart')
        }
    }, [items, router])

    const handleCreatePayment = async () => {
        try {
            const response = await fetch('/api/stripe/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: items.map(item => ({ variantId: item.variantId, quantity: item.quantity })),
                    shippingAddress,
                    shippingMethod,
                    email: session?.user?.email || 'guest@example.com',
                }),
            })

            const data = await response.json()
            setClientSecret(data.clientSecret)
        } catch (error) {
            console.error('Error creating payment:', error)
        }
    }

    if (items.length === 0) {
        return null
    }

    return (
        <div className="container-custom py-12">
            <h1 className="mb-8 text-3xl font-bold text-neutral-900">Checkout</h1>

            <div className="grid gap-12 lg:grid-cols-3">
                {/* Checkout Form */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Shipping Address */}
                    <div>
                        <h2 className="mb-4 text-xl font-semibold text-neutral-900">Shipping Address</h2>
                        <div className="space-y-4">
                            <Input
                                label="Full Name"
                                value={shippingAddress.name}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                                required
                            />
                            <Input
                                label="Address"
                                value={shippingAddress.address}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                                required
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Input
                                    label="City"
                                    value={shippingAddress.city}
                                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                    required
                                />
                                <Input
                                    label="State"
                                    value={shippingAddress.state}
                                    onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Input
                                    label="ZIP Code"
                                    value={shippingAddress.zip}
                                    onChange={(e) => setShippingAddress({ ...shippingAddress, zip: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Country"
                                    value={shippingAddress.country}
                                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Shipping Method */}
                    <div>
                        <h2 className="mb-4 text-xl font-semibold text-neutral-900">Shipping Method</h2>
                        <div className="space-y-3">
                            <label className="flex cursor-pointer items-center justify-between rounded-lg border-2 border-neutral-300 p-4 hover:border-neutral-900">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value="standard"
                                        checked={shippingMethod === 'standard'}
                                        onChange={(e) => setShippingMethod(e.target.value)}
                                        className="mr-3"
                                    />
                                    <div>
                                        <p className="font-medium">Standard Shipping</p>
                                        <p className="text-sm text-neutral-600">5-7 business days</p>
                                    </div>
                                </div>
                                <p className="font-semibold">{formatPrice(10)}</p>
                            </label>
                            <label className="flex cursor-pointer items-center justify-between rounded-lg border-2 border-neutral-300 p-4 hover:border-neutral-900">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        name="shipping"
                                        value="express"
                                        checked={shippingMethod === 'express'}
                                        onChange={(e) => setShippingMethod(e.target.value)}
                                        className="mr-3"
                                    />
                                    <div>
                                        <p className="font-medium">Express Shipping</p>
                                        <p className="text-sm text-neutral-600">2-3 business days</p>
                                    </div>
                                </div>
                                <p className="font-semibold">{formatPrice(25)}</p>
                            </label>
                        </div>
                    </div>

                    {/* Payment */}
                    <div>
                        <h2 className="mb-4 text-xl font-semibold text-neutral-900">Payment</h2>
                        {!clientSecret ? (
                            <Button onClick={handleCreatePayment} className="w-full">
                                Continue to Payment
                            </Button>
                        ) : (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm clientSecret={clientSecret} />
                            </Elements>
                        )}
                    </div>
                </div>

                {/* Order Summary */}
                <div>
                    <div className="sticky top-24 rounded-lg border border-neutral-200 bg-white p-6">
                        <h2 className="text-lg font-semibold text-neutral-900">Order Summary</h2>

                        <div className="mt-6 space-y-4">
                            {items.map((item) => (
                                <div key={item.variantId} className="flex gap-3 text-sm">
                                    <div className="flex-1">
                                        <p className="font-medium text-neutral-900">{item.name}</p>
                                        <p className="text-neutral-600">
                                            {item.color} / {item.size} × {item.quantity}
                                        </p>
                                    </div>
                                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <p className="text-neutral-600">Subtotal</p>
                                    <p className="font-medium">{formatPrice(subtotal)}</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="text-neutral-600">Shipping</p>
                                    <p className="font-medium">{formatPrice(shipping)}</p>
                                </div>
                                <div className="flex justify-between border-t pt-2">
                                    <p className="font-semibold text-neutral-900">Total</p>
                                    <p className="text-xl font-bold text-neutral-900">{formatPrice(total)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
