export default function ShippingPage() {
    return (
        <div className="container-custom py-12">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-4xl font-bold text-neutral-900">Shipping & Returns</h1>
                <p className="mt-4 text-neutral-600">Last updated: January 2026</p>

                <div className="prose prose-neutral mt-12 max-w-none">
                    <h2>Shipping Information</h2>

                    <h3>Shipping Methods</h3>
                    <p>We offer two shipping options:</p>
                    <ul>
                        <li><strong>Standard Shipping ($10):</strong> 5-7 business days</li>
                        <li><strong>Express Shipping ($25):</strong> 2-3 business days</li>
                    </ul>
                    <p><strong>Free standard shipping</strong> on all orders over $100!</p>

                    <h3>Processing Time</h3>
                    <p>
                        Orders are typically processed within 1-2 business days. You will receive a confirmation email with tracking information once your order ships.
                    </p>

                    <h3>International Shipping</h3>
                    <p>
                        Currently, we only ship within the United States. International shipping will be available soon.
                    </p>

                    <h2>Returns Policy</h2>

                    <h3>30-Day Return Window</h3>
                    <p>
                        We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in original condition with all tags attached.
                    </p>

                    <h3>How to Return</h3>
                    <ol>
                        <li>Log into your account and navigate to your order history</li>
                        <li>Select the order and items you wish to return</li>
                        <li>Print the prepaid return label we&apos;ll email you</li>
                        <li>Package items securely and attach the label</li>
                        <li>Drop off at any authorized carrier location</li>
                    </ol>

                    <h3>Refunds</h3>
                    <p>
                        Once we receive and inspect your return, we&apos;ll process your refund within 5-7 business days. Refunds will be issued to your original payment method.
                    </p>

                    <h3>Exchanges</h3>
                    <p>
                        For exchanges, please return the original item and place a new order for the item you&apos;d like instead. This ensures you get your preferred item as quickly as possible.
                    </p>

                    <h3>Non-Returnable Items</h3>
                    <p>The following items cannot be returned:</p>
                    <ul>
                        <li>Final sale items</li>
                        <li>Items without original tags</li>
                        <li>Worn or washed items</li>
                        <li>Underwear and intimate apparel (for hygiene reasons)</li>
                    </ul>

                    <h2>Contact Us</h2>
                    <p>
                        Have questions about shipping or returns? Email us at support@luxe-store.com or call 1-800-LUXE-SHOP
                    </p>
                </div>
            </div>
        </div>
    )
}
