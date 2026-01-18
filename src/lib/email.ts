// Mock email service for demo
// Replace with SendGrid or other email provider in production

interface EmailOptions {
    to: string
    subject: string
    html: string
}

export async function sendEmail(options: EmailOptions): Promise<void> {
    // In production, integrate with SendGrid:
    // const sgMail = require('@sendgrid/mail')
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    // await sgMail.send(options)

    console.log('📧 [MOCK EMAIL] Sending email...')
    console.log('  To:', options.to)
    console.log('  Subject:', options.subject)
    console.log('  HTML:', options.html.substring(0, 100) + '...')
    console.log('✅ Email sent (mocked)')
}

export async function sendOrderConfirmation(email: string, orderNumber: string, orderTotal: number): Promise<void> {
    await sendEmail({
        to: email,
        subject: `Order Confirmation - #${orderNumber}`,
        html: `
      <h1>Thank you for your order!</h1>
      <p>Your order #${orderNumber} has been confirmed.</p>
      <p>Total: $${orderTotal.toFixed(2)}</p>
      <p>We'll send you shipping updates as your order progresses.</p>
    `,
    })
}

export async function sendShippingUpdate(email: string, orderNumber: string, trackingNumber?: string): Promise<void> {
    await sendEmail({
        to: email,
        subject: `Your order has shipped - #${orderNumber}`,
        html: `
      <h1>Your order is on the way!</h1>
      <p>Order #${orderNumber} has been shipped.</p>
      ${trackingNumber ? `<p>Tracking number: ${trackingNumber}</p>` : ''}
      <p>You should receive it within 3-5 business days.</p>
    `,
    })
}
