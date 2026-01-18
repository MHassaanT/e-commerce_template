'use client'

import Card from '@/components/ui/Card'

export default function AdminOrdersPage() {
    return (
        <div className="container-custom py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-neutral-900">Orders</h1>
                <p className="mt-2 text-neutral-600">
                    View and manage customer orders
                </p>
            </div>

            <Card>
                <div className="py-12 text-center">
                    <p className="text-neutral-600">No orders yet</p>
                    <p className="mt-2 text-sm text-neutral-500">
                        Orders will appear here once customers start purchasing
                    </p>
                </div>
            </Card>
        </div>
    )
}
