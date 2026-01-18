'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SizeSelectorProps {
    sizes: string[]
    selectedSize: string
    onSizeChange: (size: string) => void
    availableSizes?: string[]
}

export default function SizeSelector({
    sizes,
    selectedSize,
    onSizeChange,
    availableSizes = sizes
}: SizeSelectorProps) {
    return (
        <div>
            <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-medium text-neutral-900">Size</label>
                <button className="text-sm text-neutral-600 underline hover:text-neutral-900">
                    Size Guide
                </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => {
                    const isAvailable = availableSizes.includes(size)
                    const isSelected = selectedSize === size

                    return (
                        <button
                            key={size}
                            onClick={() => isAvailable && onSizeChange(size)}
                            disabled={!isAvailable}
                            className={cn(
                                'rounded-lg border-2 py-3 text-sm font-medium transition-all',
                                isSelected && 'border-neutral-900 bg-neutral-900 text-white',
                                !isSelected && isAvailable && 'border-neutral-300 hover:border-neutral-900',
                                !isAvailable && 'cursor-not-allowed border-neutral-200 text-neutral-300 line-through'
                            )}
                        >
                            {size}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
