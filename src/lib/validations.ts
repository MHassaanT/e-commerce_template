import { z } from 'zod'

// Address validation
export const addressSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    address: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
    country: z.string().min(2, 'Country is required'),
    phone: z.string().optional(),
})

export type AddressInput = z.infer<typeof addressSchema>

// Auth validation
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const signupSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
})

export type LoginInput = z.infer<typeof loginSchema>
export type SignupInput = z.infer<typeof signupSchema>

// Product validation
export const productSchema = z.object({
    name: z.string().min(2, 'Product name is required'),
    slug: z.string().min(2, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Invalid slug format'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.number().positive('Price must be greater than 0'),
    category: z.string().min(2, 'Category is required'),
    images: z.array(z.string().url()).min(1, 'At least one image is required'),
    featured: z.boolean().optional(),
})

export type ProductInput = z.infer<typeof productSchema>

// Product variant validation
export const variantSchema = z.object({
    sku: z.string().min(3, 'SKU is required'),
    size: z.string().min(1, 'Size is required'),
    color: z.string().min(2, 'Color is required'),
    stock: z.number().int().nonnegative('Stock must be 0 or greater'),
    priceDelta: z.number().optional(),
})

export type VariantInput = z.infer<typeof variantSchema>

// Newsletter validation
export const newsletterSchema = z.object({
    email: z.string().email('Invalid email address'),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>

// Order validation
export const createOrderSchema = z.object({
    items: z.array(z.object({
        variantId: z.string(),
        quantity: z.number().int().positive(),
    })).min(1, 'Order must have at least one item'),
    shippingAddress: addressSchema,
    shippingMethod: z.enum(['standard', 'express']),
})

export type CreateOrderInput = z.infer<typeof createOrderSchema>

// Coupon validation
export const couponSchema = z.object({
    code: z.string().min(3, 'Coupon code is required'),
})

export type CouponInput = z.infer<typeof couponSchema>
