import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Providers from './providers'


export const metadata: Metadata = {
    title: 'LUXE - Premium Clothing Store',
    description: 'Discover timeless fashion pieces crafted with care. Premium quality clothing for the modern lifestyle.',
    keywords: 'clothing, fashion, premium, sustainable, e-commerce',
    authors: [{ name: 'LUXE' }],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://luxe-store.com',
        siteName: 'LUXE',
        title: 'LUXE - Premium Clothing Store',
        description: 'Discover timeless fashion pieces crafted with care.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'LUXE Store',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LUXE - Premium Clothing Store',
        description: 'Discover timeless fashion pieces crafted with care.',
        images: ['/og-image.jpg'],
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    )
}
