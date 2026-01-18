'use client'

import { Fragment, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
    title?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Modal({ isOpen, onClose, children, title, size = 'md' }: ModalProps) {
    if (!isOpen) return null

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                    onClick={onClose}
                    aria-hidden="true"
                />

                {/* Modal */}
                <div
                    className={cn(
                        'relative w-full rounded-lg bg-white p-6 shadow-xl',
                        sizes[size]
                    )}
                >
                    {/* Header */}
                    {title && (
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-neutral-900">{title}</h2>
                            <button
                                onClick={onClose}
                                className="rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
                                aria-label="Close modal"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    )}

                    {/* Content */}
                    {children}
                </div>
            </div>
        </div>
    )
}
