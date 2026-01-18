import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { stripe, SHIPPING_RATES } from '@/lib/stripe'
import { generateOrderNumber } from '@/lib/utils'

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        const body = await request.json()
        const { items, shippingAddress, shippingMethod } = body

        // Calculate totals
        let subtotal = 0
        const orderItems = []

        for (const item of items) {
            const variant = await prisma.productVariant.findUnique({
                where: { id: item.variantId },
                include: { product: true },
            })

            if (!variant) {
                return NextResponse.json(
                    { error: `Variant ${item.variantId} not found` },
                    { status: 404 }
                )
            }

            if (variant.stock < item.quantity) {
                return NextResponse.json(
                    { error: `Insufficient stock for ${variant.product.name}` },
                    { status: 400 }
                )
            }

            const itemPrice = variant.product.price + variant.priceDelta
            subtotal += itemPrice * item.quantity

            orderItems.push({
                variantId: variant.id,
                quantity: item.quantity,
                price: itemPrice,
            })
        }

        const shipping = SHIPPING_RATES[shippingMethod as keyof typeof SHIPPING_RATES] || SHIPPING_RATES.standard
        const total = subtotal + shipping

        // Create Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(total * 100), // Convert to cents
            currency: 'usd',
            metadata: {
                userId: session?.user?.id || 'guest',
                email: session?.user?.email || body.email,
            },
        })

        // Create order in pending state
        const order = await prisma.order.create({
            data: {
                userId: session?.user?.id,
                email: session?.user?.email || body.email,
                subtotal,
                shipping,
                total,
                status: 'pending',
                shippingAddress: JSON.stringify(shippingAddress),
                stripePaymentId: paymentIntent.id,
                items: {
                    create: orderItems,
                },
            },
            include: {
                items: {
                    include: {
                        variant: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
            },
        })

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
            orderId: order.id,
        })
    } catch (error) {
        console.error('Error creating payment intent:', error)
        return NextResponse.json(
            { error: 'Failed to create payment intent' },
            { status: 500 }
        )
    }
}
