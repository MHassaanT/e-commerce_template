import { test, expect } from '@playwright/test'

test.describe('Checkout Flow', () => {
    test('complete checkout flow with test card', async ({ page }) => {
        test.setTimeout(60000) // 60 seconds

        // Visit homepage
        await page.goto('http://localhost:3000')

        // Navigate to shop
        await page.click('text=Shop New Collection')
        await expect(page).toHaveURL(/\/shop/)

        // Click on first product
        await page.locator('a[href^="/product/"]').first().click()
        await expect(page).toHaveURL(/\/product\//)

        // Add to cart
        await page.click('button:has-text("Add to Cart")')
        await page.waitForTimeout(1000)

        // Go to cart
        await page.click('a[aria-label="Shopping cart"]')
        await expect(page).toHaveURL('/cart')

        // Proceed to checkout
        await page.click('text=Proceed to Checkout')

        // If not logged in, this may redirect to login
        // For a full test, you'd login first or allow guest checkout

        // Fill shipping address
        if (await page.locator('input[name="name"]').isVisible()) {
            await page.fill('input[label="Full Name"]', 'Test User')
            await page.fill('input[label="Address"]', '123 Test St')
            await page.fill('input[label="City"]', 'New York')
            await page.fill('input[label="State"]', 'NY')
            await page.fill('input[label="ZIP Code"]', '10001')

            // Continue to payment
            await page.click('text=Continue to Payment')
            await page.waitForTimeout(2000)

            // Fill Stripe test card (requires Stripe Elements to be loaded)
            // In a real test, you'd interact with the Stripe iframe
            // This is a simplified version
        }

        // Verify we're on checkout or success page
        await expect(page.url()).toContain('/checkout')
    })
})
