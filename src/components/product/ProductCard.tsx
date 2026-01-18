'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import { Heart } from 'lucide-react'

interface ProductCardProps {
    id: string
    slug: string
    name: string
    price: number
    images: string[]
    category: string
}

export default function ProductCard({ slug, name, price, images, category }: ProductCardProps) {
    const parsedImages = typeof images === 'string' ? JSON.parse(images) : images
    const mainImage = parsedImages[0] || '/placeholder.png'

    return (
        <Link href={`/product/${slug}`} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100">
                <Image
                    src={mainImage}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <button
                    className="absolute right-3 top-3 rounded-full bg-white p-2 opacity-0 shadow-md transition-opacity hover:bg-neutral-100 group-hover:opacity-100"
                    onClick={(e) => {
                        e.preventDefault()
                        // Wishlist functionality placeholder
                    }}
                    aria-label="Add to wishlist"
                >
                    <Heart className="h-5 w-5 text-neutral-700" />
                </button>
            </div>
            <div className="mt-3">
                <p className="text-sm text-neutral-500">{category}</p>
                <h3 className="mt-1 font-medium text-neutral-900 group-hover:text-brand-600">
                    {name}
                </h3>
                <p className="mt-1 font-semibold text-neutral-900">{formatPrice(price)}</p>
            </div>
        </Link>
    )
}
