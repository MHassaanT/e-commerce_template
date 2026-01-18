'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import { formatPrice, formatDate } from '@/lib/utils'
import { Package, User as UserIcon, LogOut } from 'lucide-react'

export default function AccountPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login')
        }
    }, [status, router])

    useEffect(() => {
        async function fetchOrders() {
            try {
                // In a real app, this would be an API call
                // For demo, we'll simulate with empty array
                setOrders([])
            } catch (error) {
                console.error('Error fetching orders:', error)
            } finally {
                setLoading(false)
            }
        }

        if (session) {
            fetchOrders()
        }
    }, [session])

    if (status === 'loading' || !session) {
        return null
    }

    const isAdmin = (session.user as any)?.role === 'admin'

    return (
        <div className="container-custom py-12">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">My Account</h1>
                    <p className="mt-2 text-neutral-600">Welcome back, {session.user?.name}</p>
                </div>
                <Button variant="outline" onClick={() => signOut({ callbackUrl: '/' })}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Quick Actions */}
                <div className="space-y-4">
                    <Card>
                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-brand-100 p-3">
                                <UserIcon className="h-6 w-6 text-brand-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-neutral-900">Profile</h3>
                                <p className="mt-1 text-sm text-neutral-600">{session.user?.email}</p>
                            </div>
                        </div>
                    </Card>

                    {isAdmin && (
                        <Link href="/admin">
                            <Card hover className="cursor-pointer border-brand-200 bg-brand-50">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-brand-500 p-2">
                                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-neutral-900">Admin Dashboard</p>
                                        <p className="text-sm text-neutral-600">Manage products & orders</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    )}
                </div>

                {/* Orders */}
                <div className="lg:col-span-2">
                    <h2 className="mb-6 text-xl font-semibold text-neutral-900">Recent Orders</h2>

                    {loading ? (
                        <Card>
                            <p className="text-center text-neutral-600">Loading orders...</p>
                        </Card>
                    ) : orders.length === 0 ? (
                        <Card>
                            <div className="py-12 text-center">
                                <Package className="mx-auto h-12 w-12 text-neutral-400" />
                                <p className="mt-4 text-neutral-600">No orders yet</p>
                                <p className="mt-2 text-sm text-neutral-500">
                                    Start shopping to see your orders here
                                </p>
                                <Link href="/shop">
                                    <Button className="mt-6">Browse Products</Button>
                                </Link>
                            </div>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <Card key={order.id} hover>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3">
                                                <p className="font-semibold text-neutral-900">Order #{order.id.slice(0, 8)}</p>
                                                <Badge variant="info">{order.status}</Badge>
                                            </div>
                                            <p className="mt-2 text-sm text-neutral-600">
                                                Placed on {formatDate(order.createdAt)}
                                            </p>
                                            <p className="mt-1 text-sm text-neutral-600">
                                                {order.items.length} items • {formatPrice(order.total)}
                                            </p>
                                        </div>
                                        <Link href={`/account/orders/${order.id}`}>
                                            <Button variant="outline" size="sm">
                                                View Details
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
