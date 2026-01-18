'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotal } = useCart()
    const subtotal = getTotal()
    const shipping = subtotal > 100 ? 0 : 10
    const total = subtotal + shipping

    if (items.length === 0) {
        return (
            <div className="container-custom flex min-h-[calc(100vh-200px)] items-center justify-center py-12">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-neutral-900">Your cart is empty</h2>
                    <p className="mt-2 text-neutral-600">Add some items to get started</p>
                    <Link href="/shop">
                        <Button className="mt-6">Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container-custom py-12">
            <h1 className="mb-8 text-3xl font-bold text-neutral-900">Shopping Cart</h1>

            <div className="grid gap-12 lg:grid-cols-3">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="space-y-6">
                        {items.map((item) => (
                            <div key={item.variantId} className="flex gap-6 border-b pb-6">
                                <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col">
                                    <div className="flex justify-between">
                                        <div>
                                            <Link href={`/product/${item.slug}`} className="font-medium text-neutral-900 hover:text-brand-600">
                                                {item.name}
                                            </Link>
                                            <p className="mt-1 text-sm text-neutral-600">
                                                {item.color} / {item.size}
                                            </p>
                                        </div>
                                        <p className="font-semibold text-neutral-900">
                                            {formatPrice(item.price)}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                                                className="rounded border border-neutral-300 px-3 py-1 hover:bg-neutral-100"
                                            >
                                                -
                                            </button>
                                            <span className="w-12 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                                                className="rounded border border-neutral-300 px-3 py-1 hover:bg-neutral-100"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeItem(item.variantId)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div>
                    <div className="rounded-lg border border-neutral-200 bg-white p-6">
                        <h2 className="text-lg font-semibold text-neutral-900">Order Summary</h2>

                        <div className="mt-6 space-y-4">
                            <div className="flex justify-between text-sm">
                                <p className="text-neutral-600">Subtotal</p>
                                <p className="font-medium text-neutral-900">{formatPrice(subtotal)}</p>
                            </div>
                            <div className="flex justify-between text-sm">
                                <p className="text-neutral-600">Shipping</p>
                                <p className="font-medium text-neutral-900">
                                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                                </p>
                            </div>
                            {subtotal < 100 && (
                                <p className="text-xs text-neutral-500">
                                    Add {formatPrice(100 - subtotal)} more for free shipping
                                </p>
                            )}

                            <div className="border-t pt-4">
                                <div className="flex justify-between">
                                    <p className="font-semibold text-neutral-900">Total</p>
                                    <p className="text-2xl font-bold text-neutral-900">{formatPrice(total)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            <Link href="/checkout">
                                <Button className="w-full" size="lg">
                                    Proceed to Checkout
                                </Button>
                            </Link>
                            <Link href="/shop">
                                <Button className="w-full" variant="outline">
                                    Continue Shopping
                                </Button>
                            </Link>
                        </div>

                        {/* Promo Code UI */}
                        <div className="mt-6 border-t pt-6">
                            <p className="mb-2 text-sm font-medium text-neutral-900">Promo Code</p>
                            <div className="flex gap-2">
                                <Input placeholder="Enter code" disabled />
                                <Button variant="outline" size="sm" disabled>
                                    Apply
                                </Button>
                            </div>
                            <p className="mt-2 text-xs text-neutral-500">Promo codes are mock UI for demo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
