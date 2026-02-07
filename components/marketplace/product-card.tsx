"use client"

import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

interface ProductCardProps {
    product: Product
    onSelect: (product: Product) => void
}

function formatPrice(price: number) {
    return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}

function StarRating({ rating, reviews }: {rating: number; reviews: number }) {
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex" aria-label={`${rating} de 5 estrelas`}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`h-3 w-3.5 ${
                            star <= Math.floor(rating)
                                ? "fill-accent text-accent"
                                : star <= rating
                                    ? "fill-accent/50 text-accent"
                                    : "fill-muted text-muted"
                        }`}
                    />
                ))}
            </div>
            <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
    )
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
    const { addToCart } = useCart()
    const discount = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
    )

    return (
        <article
        className="group relative flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        onClick={() => onSelect(product)}
        onKeyDown={(e) => e.key === "Enter" && onSelect(product)}
        role="button"
        tabIndex={0}
        arial-label={`Ver detalhes de ${product.name}`}
        >
            {/* Discount Badge */}
            {discount > 0 && (
                <div className="absolute left-3 top-3 z-10 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
                    -{discount}%
                </div>
            )}

            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-card"> 
                <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
            </div>

            {/* Product Info */}
            <div className="flex flex-1 flex-col p-4">
                <span className="mb-1 text-xs font-medium text-primary">
                    {product.category}
                </span>
                <h3 className="mb-2 line-clamp-2 text-sm font-semibold leading-snug text-card-foreground group-hover:text-primary">
                    {product.name}
                </h3>

                <StarRating rating={product.rating} reviews={product.reviews} />

                <div className="mt-auto pt-3">
                    {product.originalPrice > product.price && (
                        <p className="text-xs text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                        </p>
                    )}
                    <p className="text-xs text-muted-foreground">
                        {formatPrice(product.price)}
                    </p>
                    <p>
                        em até{" "}
                        <span>
                            {product.installments}x de {formatPrice(product.installmentPrice)}
                        </span> {" "}
                         sem juros
                    </p>
                </div>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation()
                        addToCart(product)
                    }}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 activate:scale-[0.98] cursor-pointer"
                >
                    <ShoppingCart className="h-4 w-4" />
                    Comprar
                </button>

            </div>


        </article>
    )
}