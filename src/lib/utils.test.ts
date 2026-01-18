import { formatPrice } from '@/lib/utils'

describe('formatPrice', () => {
    it('formats USD correctly', () => {
        expect(formatPrice(10)).toBe('$10.00')
        expect(formatPrice(10.5)).toBe('$10.50')
        expect(formatPrice(1000)).toBe('$1,000.00')
    })

    it('handles zero', () => {
        expect(formatPrice(0)).toBe('$0.00')
    })
})
