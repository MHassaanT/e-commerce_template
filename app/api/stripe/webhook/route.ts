import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { sendOrderConfirmation } from '@/lib/email'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
    try {
        const body = await request.text()
        const signature = headers().get('stripe-signature')!

        let event
        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
        } catch (err: any) {
            console.error('Webhook signature verification failed:', err.message)
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
        }

        // Handle the event
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data.object

            // Find the order by payment intent ID
            const order = await prisma.order.findFirst({
                where: { stripePaymentId: paymentIntent.id },
                include: {
                    items: {
                        include: {
                            variant: true,
                        },
                    },
                },
            })

            if (order) {
                // Update order status
                await prisma.order.update({
                    where: { id: order.id },
                    data: { status: 'processing' },
                })

                // Update stock for each item
                for (const item of order.items) {
                    await prisma.productVariant.update({
                        where: { id: item.variantId },
                        data: {
                            stock: {
                                decrement: item.quantity,
                            },
                        },
                    })
                }

                // Send confirmation email
                await sendOrderConfirmation(order.email, order.id, order.total)

                console.log('✅ Order processed:', order.id)
            }
        }

        return NextResponse.json({ received: true })
    } catch (error) {
        console.error('Webhook error:', error)
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        )
    }
}
