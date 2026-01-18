'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
    variantId: string
    productId: string
    name: string
    price: number
    size: string
    color: string
    quantity: number
    image: string
    slug: string
}

interface CartStore {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (variantId: string) => void
    updateQuantity: (variantId: string, quantity: number) => void
    clearCart: () => void
    getTotal: () => number
    getItemCount: () => number
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                set((state) => {
                    const existingItem = state.items.find((i) => i.variantId === item.variantId)

                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.variantId === item.variantId
                                    ? { ...i, quantity: i.quantity + item.quantity }
                                    : i
                            ),
                        }
                    }

                    return { items: [...state.items, item] }
                })
            },

            removeItem: (variantId) => {
                set((state) => ({
                    items: state.items.filter((i) => i.variantId !== variantId),
                }))
            },

            updateQuantity: (variantId, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(variantId)
                    return
                }

                set((state) => ({
                    items: state.items.map((i) =>
                        i.variantId === variantId ? { ...i, quantity } : i
                    ),
                }))
            },

            clearCart: () => {
                set({ items: [] })
            },

            getTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
            },

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0)
            },
        }),
        {
            name: 'cart-storage',
        }
    )
)
