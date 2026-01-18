import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Seeding database...')

    // Create admin user
    const hashedPassword = await bcrypt.hash('demo123', 10)
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@demo.com' },
        update: {},
        create: {
            email: 'admin@demo.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'admin',
        },
    })
    console.log('✅ Admin user created:', adminUser.email)

    // Create regular user
    const regularUser = await prisma.user.upsert({
        where: { email: 'user@demo.com' },
        update: {},
        create: {
            email: 'user@demo.com',
            name: 'Demo User',
            password: hashedPassword,
            role: 'user',
        },
    })
    console.log('✅ Regular user created:', regularUser.email)

    // Create collections
    const collections = await Promise.all([
        prisma.collection.upsert({
            where: { slug: 'men' },
            update: {},
            create: {
                slug: 'men',
                name: "Men's Collection",
                description: 'Timeless pieces for the modern man',
                image:
                    'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=800&q=80',
            },
        }),
        prisma.collection.upsert({
            where: { slug: 'women' },
            update: {},
            create: {
                slug: 'women',
                name: "Women's Collection",
                description: 'Elegant and versatile essentials',
                image:
                    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
            },
        }),
        prisma.collection.upsert({
            where: { slug: 'essentials' },
            update: {},
            create: {
                slug: 'essentials',
                name: 'Essentials',
                description: 'Everyday basics you need',
                image:
                    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
            },
        }),
    ])
    console.log('✅ Collections created')

    // Product data
    const productsData = [
        // Men's Collection
        {
            slug: 'premium-white-tee',
            name: 'Premium White T-Shirt',
            description:
                'A wardrobe essential. Made from 100% organic cotton with a relaxed fit. Perfect for layering or wearing solo.',
            price: 45.0,
            category: 'tops',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
                'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&q=80',
            ]),
            featured: true,
            collectionSlug: 'men',
            variants: [
                { size: 'S', color: 'White', stock: 25, sku: 'PWT-S-WHT' },
                { size: 'M', color: 'White', stock: 30, sku: 'PWT-M-WHT' },
                { size: 'L', color: 'White', stock: 20, sku: 'PWT-L-WHT' },
                { size: 'XL', color: 'White', stock: 15, sku: 'PWT-XL-WHT' },
            ],
        },
        {
            slug: 'classic-black-hoodie',
            name: 'Classic Black Hoodie',
            description:
                'Ultra-soft fleece hoodie with adjustable drawstring. Your go-to for comfort and style.',
            price: 89.0,
            category: 'outerwear',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
                'https://images.unsplash.com/photo-1620799140188-3b2a7c2e0e12?w=800&q=80',
            ]),
            featured: true,
            collectionSlug: 'men',
            variants: [
                { size: 'S', color: 'Black', stock: 18, sku: 'CBH-S-BLK' },
                { size: 'M', color: 'Black', stock: 22, sku: 'CBH-M-BLK' },
                { size: 'L', color: 'Black', stock: 20, sku: 'CBH-L-BLK' },
                { size: 'XL', color: 'Black', stock: 12, sku: 'CBH-XL-BLK' },
            ],
        },
        {
            slug: 'slim-fit-chinos',
            name: 'Slim Fit Chinos',
            description:
                'Modern slim fit chinos crafted from premium stretch cotton. Versatile enough for work or weekend.',
            price: 78.0,
            category: 'bottoms',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
                'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80',
            ]),
            featured: false,
            collectionSlug: 'men',
            variants: [
                { size: 'S', color: 'Khaki', stock: 15, sku: 'SFC-S-KHK' },
                { size: 'M', color: 'Khaki', stock: 20, sku: 'SFC-M-KHK' },
                { size: 'L', color: 'Khaki', stock: 18, sku: 'SFC-L-KHK' },
                { size: 'XL', color: 'Khaki', stock: 10, sku: 'SFC-XL-KHK' },
                { size: 'M', color: 'Navy', stock: 22, sku: 'SFC-M-NVY' },
                { size: 'L', color: 'Navy', stock: 16, sku: 'SFC-L-NVY' },
            ],
        },
        {
            slug: 'denim-jacket-blue',
            name: 'Classic Denim Jacket',
            description:
                'Timeless denim jacket with a modern fit. Built to last and only gets better with age.',
            price: 125.0,
            category: 'outerwear',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
                'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=80',
            ]),
            featured: false,
            collectionSlug: 'men',
            variants: [
                { size: 'S', color: 'Blue', stock: 10, sku: 'CDJ-S-BLU' },
                { size: 'M', color: 'Blue', stock: 14, sku: 'CDJ-M-BLU' },
                { size: 'L', color: 'Blue', stock: 12, sku: 'CDJ-L-BLU' },
                { size: 'XL', color: 'Blue', stock: 8, sku: 'CDJ-XL-BLU' },
            ],
        },

        // Women's Collection
        {
            slug: 'silk-blend-blouse',
            name: 'Silk Blend Blouse',
            description:
                'Elegant silk blend blouse with delicate draping. Perfect for office or evening wear.',
            price: 95.0,
            category: 'tops',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1564257577489-65b9f37077d8?w=800&q=80',
                'https://images.unsplash.com/photo-1566206091558-7f218b696731?w=800&q=80',
            ]),
            featured: true,
            collectionSlug: 'women',
            variants: [
                { size: 'XS', color: 'Ivory', stock: 12, sku: 'SBB-XS-IVY' },
                { size: 'S', color: 'Ivory', stock: 18, sku: 'SBB-S-IVY' },
                { size: 'M', color: 'Ivory', stock: 20, sku: 'SBB-M-IVY' },
                { size: 'L', color: 'Ivory', stock: 15, sku: 'SBB-L-IVY' },
                { size: 'S', color: 'Black', stock: 16, sku: 'SBB-S-BLK' },
                { size: 'M', color: 'Black', stock: 18, sku: 'SBB-M-BLK' },
            ],
        },
        {
            slug: 'high-waist-jeans',
            name: 'High-Waist Skinny Jeans',
            description:
                'Flattering high-waist design with stretch for all-day comfort. A modern classic.',
            price: 89.0,
            category: 'bottoms',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
                'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&q=80',
            ]),
            featured: true,
            collectionSlug: 'women',
            variants: [
                { size: 'XS', color: 'Dark Wash', stock: 14, sku: 'HWJ-XS-DRK' },
                { size: 'S', color: 'Dark Wash', stock: 22, sku: 'HWJ-S-DRK' },
                { size: 'M', color: 'Dark Wash', stock: 25, sku: 'HWJ-M-DRK' },
                { size: 'L', color: 'Dark Wash', stock: 18, sku: 'HWJ-L-DRK' },
            ],
        },
        {
            slug: 'ribbed-knit-sweater',
            name: 'Ribbed Knit Sweater',
            description:
                'Cozy ribbed knit in a relaxed fit. Layer it or wear it as a statement piece.',
            price: 72.0,
            category: 'tops',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
                'https://images.unsplash.com/photo-1620799139834-6b8f844fbe97?w=800&q=80',
            ]),
            featured: false,
            collectionSlug: 'women',
            variants: [
                { size: 'XS', color: 'Cream', stock: 10, sku: 'RKS-XS-CRM' },
                { size: 'S', color: 'Cream', stock: 15, sku: 'RKS-S-CRM' },
                { size: 'M', color: 'Cream', stock: 18, sku: 'RKS-M-CRM' },
                { size: 'L', color: 'Cream', stock: 12, sku: 'RKS-L-CRM' },
            ],
        },
        {
            slug: 'pleated-midi-skirt',
            name: 'Pleated Midi Skirt',
            description:
                'Flowing pleated skirt with an elegant midi length. Effortlessly chic for any occasion.',
            price: 85.0,
            category: 'bottoms',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80',
                'https://images.unsplash.com/photo-1590735213920-68192a487bc2?w=800&q=80',
            ]),
            featured: false,
            collectionSlug: 'women',
            variants: [
                { size: 'XS', color: 'Black', stock: 8, sku: 'PMS-XS-BLK' },
                { size: 'S', color: 'Black', stock: 12, sku: 'PMS-S-BLK' },
                { size: 'M', color: 'Black', stock: 14, sku: 'PMS-M-BLK' },
                { size: 'L', color: 'Black', stock: 10, sku: 'PMS-L-BLK' },
            ],
        },

        // Essentials
        {
            slug: 'basic-crew-neck-tee',
            name: 'Basic Crew Neck Tee (3-Pack)',
            description:
                'The foundation of any wardrobe. Soft, durable, and available in classic colors.',
            price: 35.0,
            category: 'tops',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80',
                'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
            ]),
            featured: false,
            collectionSlug: 'essentials',
            variants: [
                { size: 'S', color: 'White', stock: 30, sku: 'BCN-S-WHT' },
                { size: 'M', color: 'White', stock: 35, sku: 'BCN-M-WHT' },
                { size: 'L', color: 'White', stock: 28, sku: 'BCN-L-WHT' },
                { size: 'S', color: 'Black', stock: 32, sku: 'BCN-S-BLK' },
                { size: 'M', color: 'Black', stock: 38, sku: 'BCN-M-BLK' },
                { size: 'L', color: 'Black', stock: 30, sku: 'BCN-L-BLK' },
            ],
        },
        {
            slug: 'cotton-joggers',
            name: 'Cotton Joggers',
            description:
                'Relaxed fit joggers in soft cotton fleece. Perfect for lounging or casual outings.',
            price: 58.0,
            category: 'bottoms',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
                'https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=800&q=80',
            ]),
            featured: false,
            collectionSlug: 'essentials',
            variants: [
                { size: 'S', color: 'Gray', stock: 20, sku: 'CTJ-S-GRY' },
                { size: 'M', color: 'Gray', stock: 25, sku: 'CTJ-M-GRY' },
                { size: 'L', color: 'Gray', stock: 22, sku: 'CTJ-L-GRY' },
                { size: 'XL', color: 'Gray', stock: 18, sku: 'CTJ-XL-GRY' },
            ],
        },
        {
            slug: 'athletic-socks-pack',
            name: 'Athletic Socks (6-Pack)',
            description:
                'Moisture-wicking athletic socks with arch support. Essential for your active lifestyle.',
            price: 24.0,
            category: 'accessories',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&q=80',
            ]),
            featured: false,
            collectionSlug: 'essentials',
            variants: [
                { size: 'M', color: 'White', stock: 45, sku: 'ASP-M-WHT' },
                { size: 'L', color: 'White', stock: 40, sku: 'ASP-L-WHT' },
                { size: 'M', color: 'Black', stock: 42, sku: 'ASP-M-BLK' },
                { size: 'L', color: 'Black', stock: 38, sku: 'ASP-L-BLK' },
            ],
        },
        {
            slug: 'canvas-tote-bag',
            name: 'Canvas Tote Bag',
            description:
                'Durable canvas tote with reinforced handles. Eco-friendly and stylish for everyday use.',
            price: 28.0,
            category: 'accessories',
            images: JSON.stringify([
                'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
                'https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?w=800&q=80',
            ]),
            featured: false,
            collectionSlug: 'essentials',
            variants: [
                { size: 'One Size', color: 'Natural', stock: 35, sku: 'CTB-OS-NAT' },
                { size: 'One Size', color: 'Black', stock: 30, sku: 'CTB-OS-BLK' },
            ],
        },
    ]

    // Create products with variants
    for (const productData of productsData) {
        const { variants, collectionSlug, ...productInfo } = productData

        const product = await prisma.product.upsert({
            where: { slug: productInfo.slug },
            update: {},
            create: productInfo,
        })

        // Add to collection
        const collection = collections.find((c) => c.slug === collectionSlug)
        if (collection) {
            await prisma.collectionProduct.upsert({
                where: {
                    collectionId_productId: {
                        collectionId: collection.id,
                        productId: product.id,
                    },
                },
                update: {},
                create: {
                    collectionId: collection.id,
                    productId: product.id,
                },
            })
        }

        // Create variants
        for (const variantData of variants) {
            await prisma.productVariant.upsert({
                where: { sku: variantData.sku },
                update: {},
                create: {
                    ...variantData,
                    productId: product.id,
                },
            })
        }
    }
    console.log('✅ Products created with variants')

    // Create sample orders for demo user
    const sampleVariant1 = await prisma.productVariant.findFirst({
        where: { sku: 'PWT-M-WHT' },
    })
    const sampleVariant2 = await prisma.productVariant.findFirst({
        where: { sku: 'CBH-L-BLK' },
    })

    if (sampleVariant1 && sampleVariant2) {
        await prisma.order.create({
            data: {
                userId: regularUser.id,
                email: regularUser.email,
                subtotal: 134.0,
                shipping: 10.0,
                tax: 0,
                total: 144.0,
                status: 'delivered',
                shippingAddress: JSON.stringify({
                    name: 'Demo User',
                    address: '123 Main Street',
                    city: 'New York',
                    state: 'NY',
                    zip: '10001',
                    country: 'US',
                }),
                items: {
                    create: [
                        {
                            variantId: sampleVariant1.id,
                            quantity: 1,
                            price: 45.0,
                        },
                        {
                            variantId: sampleVariant2.id,
                            quantity: 1,
                            price: 89.0,
                        },
                    ],
                },
            },
        })

        await prisma.order.create({
            data: {
                userId: regularUser.id,
                email: regularUser.email,
                subtotal: 89.0,
                shipping: 10.0,
                tax: 0,
                total: 99.0,
                status: 'shipped',
                shippingAddress: JSON.stringify({
                    name: 'Demo User',
                    address: '123 Main Street',
                    city: 'New York',
                    state: 'NY',
                    zip: '10001',
                    country: 'US',
                }),
                items: {
                    create: [
                        {
                            variantId: sampleVariant2.id,
                            quantity: 1,
                            price: 89.0,
                        },
                    ],
                },
            },
        })
    }
    console.log('✅ Sample orders created')

    // Create newsletter subscribers
    const subscribers = [
        'subscriber1@example.com',
        'subscriber2@example.com',
        'subscriber3@example.com',
    ]

    for (const email of subscribers) {
        await prisma.newsletter.upsert({
            where: { email },
            update: {},
            create: { email },
        })
    }
    console.log('✅ Newsletter subscribers created')

    console.log('🎉 Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
