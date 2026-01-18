'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/product/ProductGallery'
import SizeSelector from '@/components/product/SizeSelector'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/utils'
import { Check } from 'lucide-react'

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    const [product, setProduct] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedVariant, setSelectedVariant] = useState<any>(null)
    const [addedToCart, setAddedToCart] = useState(false)
    const { addItem } = useCart()

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(`/api/products?slug=${params.slug}`)
                const data = await response.json()
                const foundProduct = data.products?.[0]

                if (!foundProduct) {
                    notFound()
                }

                setProduct(foundProduct)

                // Set default selections
                if (foundProduct.variants?.length > 0) {
                    const firstVariant = foundProduct.variants[0]
                    setSelectedSize(firstVariant.size)
                    setSelectedColor(firstVariant.color)
                    setSelectedVariant(firstVariant)
                }
            } catch (error) {
                console.error('Error fetching product:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [params.slug])

    useEffect(() => {
        if (product && selectedSize && selectedColor) {
            const variant = product.variants.find(
                (v: any) => v.size === selectedSize && v.color === selectedColor
            )
            setSelectedVariant(variant)
        }
    }, [selectedSize, selectedColor, product])

    const handleAddToCart = () => {
        if (!selectedVariant) return

        const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images

        addItem({
            variantId: selectedVariant.id,
            productId: product.id,
            name: product.name,
            price: product.price + selectedVariant.priceDelta,
            size: selectedVariant.size,
            color: selectedVariant.color,
            quantity: 1,
            image: images[0],
            slug: product.slug,
        })

        setAddedToCart(true)
        setTimeout(() => setAddedToCart(false), 2000)
    }

    if (loading) {
        return (
            <div className="container-custom flex min-h-[600px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-900"></div>
                </div>
            </div>
        )
    }

    if (!product) {
        notFound()
    }

    const images = typeof product.images === 'string' ? JSON.parse(product.images) : product.images
    const availableSizes = [...new Set(product.variants.filter((v: any) => v.color === selectedColor).map((v: any) => v.size))] as string[]
    const availableColors = [...new Set(product.variants.map((v: any) => v.color))] as string[]

    const stockStatus = selectedVariant?.stock > 10 ? 'In Stock' : selectedVariant?.stock > 0 ? 'Low Stock' : 'Out of Stock'
    const stockBadgeVariant = selectedVariant?.stock > 10 ? 'success' : selectedVariant?.stock > 0 ? 'warning' : 'error'

    return (
        <div className="container-custom py-12">
            <div className="grid gap-12 lg:grid-cols-2">
                {/* Images */}
                <div>
                    <ProductGallery images={images} productName={product.name} />
                </div>

                {/* Product Info */}
                <div>
                    <div className="mb-4">
                        <p className="text-sm uppercase text-neutral-500">{product.category}</p>
                        <h1 className="mt-2 text-3xl font-bold text-neutral-900">{product.name}</h1>
                        <p className="mt-4 text-3xl font-semibold text-neutral-900">
                            {formatPrice(product.price + (selectedVariant?.priceDelta || 0))}
                        </p>
                    </div>

                    <div className="mb-6">
                        <Badge variant={stockBadgeVariant}>{stockStatus}</Badge>
                    </div>

                    <p className="mb-8 text-neutral-600">{product.description}</p>

                    {/* Color Selection */}
                    <div className="mb-6">
                        <label className="mb-3 block text-sm font-medium text-neutral-900">
                            Color: {selectedColor}
                        </label>
                        <div className="flex gap-2">
                            {availableColors.map((color) => (
                                <button
                                    key={color as string}
                                    onClick={() => setSelectedColor(color as string)}
                                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${selectedColor === color
                                        ? 'border-neutral-900 bg-neutral-900 text-white'
                                        : 'border-neutral-300 hover:border-neutral-900'
                                        }`}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Size Selection */}
                    <div className="mb-8">
                        <SizeSelector
                            sizes={['XS', 'S', 'M', 'L', 'XL']}
                            selectedSize={selectedSize}
                            onSizeChange={setSelectedSize}
                            availableSizes={availableSizes}
                        />
                    </div>

                    {/* Add to Cart */}
                    <Button
                        className="w-full"
                        size="lg"
                        onClick={handleAddToCart}
                        disabled={!selectedVariant || selectedVariant.stock === 0 || addedToCart}
                    >
                        {addedToCart ? (
                            <>
                                <Check className="mr-2 h-5 w-5" />
                                Added to Cart
                            </>
                        ) : selectedVariant?.stock === 0 ? (
                            'Out of Stock'
                        ) : (
                            'Add to Cart'
                        )}
                    </Button>

                    {/* Product Details */}
                    <div className="mt-12 border-t pt-8">
                        <h3 className="mb-4 font-semibold text-neutral-900">Product Details</h3>
                        <div className="space-y-2 text-sm text-neutral-600">
                            <p>• Premium quality materials</p>
                            <p>• Ethically sourced and sustainable</p>
                            <p>• Machine washable</p>
                            <p>• Free shipping on orders over $100</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
