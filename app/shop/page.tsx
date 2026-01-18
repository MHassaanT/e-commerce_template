'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/product/ProductCard'
import Spinner from '@/components/ui/Spinner'

function ShopContent() {
    const searchParams = useSearchParams()
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [sort, setSort] = useState('popular')
    const collection = searchParams.get('collection')

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true)
            const params = new URLSearchParams({
                ...(collection && { collection }),
                sort,
            })

            const response = await fetch(`/api/products?${params}`)
            const data = await response.json()
            setProducts(data.products || [])
            setLoading(false)
        }

        fetchProducts()
    }, [collection, sort])

    return (
        <div className="container-custom py-12">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-neutral-900">
                    {collection ? collection.charAt(0).toUpperCase() + collection.slice(1) : 'All Products'}
                </h1>
                <p className="mt-2 text-neutral-600">
                    Discover our collection of premium essentials
                </p>
            </div>

            {/* Filters and Sort */}
            <div className="mb-8 flex items-center justify-between">
                <p className="text-sm text-neutral-600">
                    {loading ? 'Loading...' : `${products.length} products`}
                </p>
                <div className="flex items-center gap-4">
                    <label className="text-sm text-neutral-600">Sort by:</label>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="rounded-lg border border-neutral-300 px-4 py-2 text-sm focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    >
                        <option value="popular">Most Popular</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="newest">Newest</option>
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <Spinner size="lg" />
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            slug={product.slug}
                            name={product.name}
                            price={product.price}
                            images={product.images}
                            category={product.category}
                        />
                    ))}
                </div>
            )}

            {products.length === 0 && !loading && (
                <div className="py-20 text-center">
                    <p className="text-neutral-600">No products found</p>
                </div>
            )}
        </div>
    )
}

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="container-custom flex min-h-[600px] items-center justify-center">
                <Spinner size="lg" />
            </div>
        }>
            <ShopContent />
        </Suspense>
    )
}
