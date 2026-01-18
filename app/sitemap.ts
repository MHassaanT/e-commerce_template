import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    // Get all products
    // Get all products, handle DB failure gracefully during build
    let products: { slug: string; updatedAt: Date }[] = []
    try {
        products = await prisma.product.findMany({
            select: {
                slug: true,
                updatedAt: true,
            },
        })
    } catch (e) {
        console.warn('Could not fetch products for sitemap (likely no DB connection during build)')
    }

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
