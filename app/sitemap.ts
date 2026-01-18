import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Get all products
    const products = await prisma.product.findMany({
        select: {
            slug: true,
            updatedAt: true,
        },
    })

    const productUrls = products.map((product) => ({
        url: `${baseUrl}/product/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Static pages
    const routes = [
        '',
        '/shop',
        '/login',
        '/signup',
        '/cart',
        '/privacy',
        '/terms',
        '/shipping',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.5,
    }))

    return [...routes, ...productUrls]
}
