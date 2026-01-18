'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useCart } from '@/hooks/useCart'

export default function CheckoutSuccessPage() {
    const { clearCart } = useCart()

    useEffect(() => {
        // Clear cart after successful payment
        clearCart()
    }, [clearCart])

    return (
        <div className="container-custom flex min-h-[calc(100vh-200px)] items-center justify-center py-12">
            <div className="max-w-md text-center">
                <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-green-100 p-6">
                        <CheckCircle className="h-16 w-16 text-green-600" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-neutral-900">Order Confirmed!</h1>
                <p className="mt-4 text-neutral-600">
                    Thank you for your purchase. We&apos;ve sent a confirmation email with your order details.
                </p>

                <div className="mt-8 space-y-3">
                    <Link href="/account">
                        <Button className="w-full">View Orders</Button>
                    </Link>
                    <Link href="/shop">
                        <Button className="w-full" variant="outline">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>

                <p className="mt-6 text-sm text-neutral-500">
                    You&apos;ll receive shipping updates via email as your order progresses.
                </p>
            </div>
        </div>
    )
}
