import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps {
    children: ReactNode
    className?: string
    hover?: boolean
}

export default function Card({ children, className, hover = false }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-lg border border-neutral-200 bg-white p-6 shadow-sm',
                hover && 'transition-shadow duration-200 hover:shadow-md',
                className
            )}
        >
            {children}
        </div>
    )
}
