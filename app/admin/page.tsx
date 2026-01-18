'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Package, ShoppingBag, Settings } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function AdminPage() {
    const { data: session } = useSession()

    return (
        <div className="container-custom py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-neutral-900">Admin Dashboard</h1>
                <p className="mt-2 text-neutral-600">
                    Manage your store, products, and orders
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Products */}
                <Link href="/admin/products">
                    <Card hover className="h-full cursor-pointer">
                        <div className="flex flex-col items-center py-8 text-center">
                            <div className="rounded-full bg-brand-100 p-4">
                                <ShoppingBag className="h-8 w-8 text-brand-600" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-neutral-900">Products</h3>
                            <p className="mt-2 text-sm text-neutral-600">
                                Manage product catalog and inventory
                            </p>
                            <Button variant="outline" className="mt-4">
                                Manage Products
                            </Button>
                        </div>
                    </Card>
                </Link>

                {/* Orders */}
                <Link href="/admin/orders">
                    <Card hover className="h-full cursor-pointer">
                        <div className="flex flex-col items-center py-8 text-center">
                            <div className="rounded-full bg-brand-100 p-4">
                                <Package className="h-8 w-8 text-brand-600" />
                            </div>
                            <h3 className="mt-4 text-lg font-semibold text-neutral-900">Orders</h3>
                            <p className="mt-2 text-sm text-neutral-600">
                                View and manage customer orders
                            </p>
                            <Button variant="outline" className="mt-4">
                                View Orders
                            </Button>
                        </div>
                    </Card>
                </Link>

                {/* Settings */}
                <Card className="h-full bg-neutral-50">
                    <div className="flex flex-col items-center py-8 text-center">
                        <div className="rounded-full bg-neutral-200 p-4">
                            <Settings className="h-8 w-8 text-neutral-600" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-neutral-900">Settings</h3>
                        <p className="mt-2 text-sm text-neutral-600">
                            Configure store settings
                        </p>
                        <Button variant="ghost" className="mt-4" disabled>
                            Coming Soon
                        </Button>
                    </div>
                </Card>
            </div>

            {/* Quick Stats */}
            <div className="mt-12">
                <h2 className="mb-6 text-xl font-semibold text-neutral-900">Quick Stats</h2>
                <div className="grid gap-6 md:grid-cols-4">
                    <Card>
                        <p className="text-sm text-neutral-600">Total Products</p>
                        <p className="mt-2 text-3xl font-bold text-neutral-900">12</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-neutral-600">Orders Today</p>
                        <p className="mt-2 text-3xl font-bold text-neutral-900">0</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-neutral-600">Pending Orders</p>
                        <p className="mt-2 text-3xl font-bold text-neutral-900">0</p>
                    </Card>
                    <Card>
                        <p className="text-sm text-neutral-600">Low Stock Items</p>
                        <p className="mt-2 text-3xl font-bold text-neutral-900">2</p>
                    </Card>
                </div>
            </div>
        </div>
    )
}
