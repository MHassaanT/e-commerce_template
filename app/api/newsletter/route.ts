import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { newsletterSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email } = newsletterSchema.parse(body)

        await prisma.newsletter.create({
            data: { email },
        })

        return NextResponse.json({ message: 'Subscribed successfully' }, { status: 201 })
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: 'Email already subscribed' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Invalid email address' },
            { status: 400 }
        )
    }
}
