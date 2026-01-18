import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/product/ProductCard'
import { prisma } from '@/lib/db'

export const revalidate = 3600 // Revalidate every hour

async function getHomeData() {
    const [collections, featuredProducts] = await Promise.all([
        prisma.collection.findMany({
            take: 3,
        }),
        prisma.product.findMany({
            where: { featured: true },
            take: 8,
            include: {
                variants: true,
            },
        }),
    ])

    return { collections, featuredProducts }
}

export default async function HomePage() {
    const { collections, featuredProducts } = await getHomeData()

    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[600px] bg-neutral-900">
                <Image
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
                    alt="Fashion hero"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                        <h1 className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl">
                            Timeless Style.<br />Modern Comfort.
                        </h1>
                        <p className="mb-8 text-lg text-neutral-200 md:text-xl">
                            Discover our newest collection of premium essentials
                        </p>
                        <Link href="/shop">
                            <Button size="lg" variant="secondary">
                                Shop New Collection
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Collections */}
            <section className="container-custom py-16">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl">
                        Shop by Collection
                    </h2>
                    <p className="mt-4 text-neutral-600">
                        Curated selections for every style
                    </p>
                </div>
                <div className="grid gap-6 md:grid-cols-3">
                    {collections.map((collection) => (
                        <Link
                            key={collection.id}
                            href={`/shop?collection=${collection.slug}`}
                            className="group relative h-[400px] overflow-hidden rounded-lg"
                        >
                            <Image
                                src={collection.image || '/placeholder.png'}
                                alt={collection.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 className="text-2xl font-bold">{collection.name}</h3>
                                <p className="mt-2 text-sm text-neutral-200">
                                    {collection.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Best Sellers */}
            <section className="bg-neutral-50 py-16">
                <div className="container-custom">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl">
                            Best Sellers
                        </h2>
                        <p className="mt-4 text-neutral-600">
                            Customer favorites you&apos;ll love
                        </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {featuredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                slug={product.slug}
                                name={product.name}
                                price={product.price}
                                images={JSON.parse(product.images)}
                                category={product.category}
                            />
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Link href="/shop">
                            <Button variant="outline" size="lg">
                                View All Products
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="container-custom py-16">
                <div className="grid gap-12 md:grid-cols-3">
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                            <svg className="h-8 w-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">Premium Quality</h3>
                        <p className="text-neutral-600">
                            Ethically sourced materials crafted to last a lifetime
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                            <svg className="h-8 w-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">Fast Shipping</h3>
                        <p className="text-neutral-600">
                            Free shipping on orders over $100 with express options
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-100">
                            <svg className="h-8 w-8 text-brand-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold">Easy Returns</h3>
                        <p className="text-neutral-600">
                            30-day hassle-free returns on all purchases
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
