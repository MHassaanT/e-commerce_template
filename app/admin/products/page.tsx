'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatPrice } from '@/lib/utils'

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products?limit=100')
                const data = await response.json()
                setProducts(data.products || [])
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    return (
        <div className="container-custom py-12">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">Products</h1>
                    <p className="mt-2 text-neutral-600">
                        Manage your product catalog
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                </Button>
            </div>

            {loading ? (
                <Card>
                    <p className="py-12 text-center text-neutral-600">Loading products...</p>
                </Card>
            ) : (
                <div className="space-y-4">
                    {products.map((product) => {
                        const totalStock = product.variants?.reduce((sum: number, v: any) => sum + v.stock, 0) || 0
                        const stockStatus = totalStock > 50 ? 'success' : totalStock > 20 ? 'warning' : 'error'

                        return (
                            <Card key={product.id}>
                                <div className="flex items-center gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-semibold text-neutral-900">{product.name}</h3>
                                            <Badge variant={stockStatus}>{totalStock} in stock</Badge>
                                            {product.featured && <Badge variant="info">Featured</Badge>}
                                        </div>
                                        <p className="mt-1 text-sm text-neutral-600">
                                            {product.category} • {product.variants?.length || 0} variants
                                        </p>
                                        <p className="mt-1 text-lg font-semibold text-neutral-900">
                                            {formatPrice(product.price)}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
