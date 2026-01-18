'use client'

import Link from 'next/link'
import { ShoppingCart, User, Menu, Search } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useSession } from 'next-auth/react'

export default function Header() {
    const { getItemCount } = useCart()
    const { data: session } = useSession()
    const itemCount = getItemCount()

    return (
        <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold text-neutral-900">LUXE</span>
                    </Link>

                    {/* Navigation - Desktop */}
                    <nav className="hidden space-x-8 md:flex">
                        <Link href="/shop" className="text-sm font-medium text-neutral-700 hover:text-neutral-900">
                            Shop
                        </Link>
                        <Link href="/shop?collection=men" className="text-sm font-medium text-neutral-700 hover:text-neutral-900">
                            Men
                        </Link>
                        <Link href="/shop?collection=women" className="text-sm font-medium text-neutral-700 hover:text-neutral-900">
                            Women
                        </Link>
                        <Link href="/shop?collection=essentials" className="text-sm font-medium text-neutral-700 hover:text-neutral-900">
                            Essentials
                        </Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                        <button className="text-neutral-700 hover:text-neutral-900" aria-label="Search">
                            <Search className="h-5 w-5" />
                        </button>

                        <Link
                            href={session ? '/account' : '/login'}
                            className="text-neutral-700 hover:text-neutral-900"
                            aria-label="Account"
                        >
                            <User className="h-5 w-5" />
                        </Link>

                        <Link href="/cart" className="relative text-neutral-700 hover:text-neutral-900" aria-label="Shopping cart">
                            <ShoppingCart className="h-5 w-5" />
                            {itemCount > 0 && (
                                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        <button className="md:hidden" aria-label="Menu">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}
