import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const collection = searchParams.get('collection')
        const category = searchParams.get('category')
        const sort = searchParams.get('sort') || 'popular'
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '12')

        const skip = (page - 1) * limit

        // Build where clause
        let where: any = {}

        if (collection) {
            const collectionData = await prisma.collection.findUnique({
                where: { slug: collection },
            })
            if (collectionData) {
                where.collections = {
                    some: { collectionId: collectionData.id }
                }
            }
        }

        if (category) {
            where.category = category
        }

        // Build orderBy
        let orderBy: any = {}
        if (sort === 'price-asc') {
            orderBy = { price: 'asc' }
        } else if (sort === 'price-desc') {
            orderBy = { price: 'desc' }
        } else if (sort === 'newest') {
            orderBy = { createdAt: 'desc' }
        } else {
            orderBy = { featured: 'desc' }
        }

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                orderBy,
                skip,
                take: limit,
                include: {
                    variants: true,
                },
            }),
            prisma.product.count({ where }),
        ])

        return NextResponse.json({
            products,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        })
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        )
    }
}
