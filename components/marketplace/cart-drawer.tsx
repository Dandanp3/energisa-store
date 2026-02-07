"use client"

import { useEffect } from "react"
import Image from "next/image"
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "./product-card"

export function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart()

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isCartOpen])

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-[110]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
        onKeyDown={(e) => e.key === "Escape" && setIsCartOpen(false)}
        role="button"
        tabIndex={0}
        aria-label="Fechar carrinho"
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md animate-in slide-in-from-right flex-col bg-card shadow-2xl duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-heading text-lg font-bold text-card-foreground">
              Carrinho ({totalItems})
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            className="rounded-full p-1.5 text-card-foreground transition-colors hover:bg-muted"
            aria-label="Fechar carrinho"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground/30" />
              <p className="text-lg font-semibold text-card-foreground">
                Carrinho vazio
              </p>
              <p className="text-sm text-muted-foreground">
                Adicione produtos para começar
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 rounded-xl border border-border bg-muted/50 p-3"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-card">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover p-1"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h4 className="line-clamp-2 text-xs font-semibold text-card-foreground">
                      {item.product.shortName}
                    </h4>
                    <p className="mt-1 text-sm font-bold text-primary">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-card-foreground transition-colors hover:bg-muted"
                          aria-label="Diminuir"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-card-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-card-foreground transition-colors hover:bg-muted"
                          aria-label="Aumentar"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="rounded-md p-1.5 text-destructive transition-colors hover:bg-destructive/10"
                        aria-label="Remover item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-xl font-bold text-card-foreground">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button
              type="button"
              className="w-full rounded-xl bg-primary py-3.5 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 active:scale-[0.98]"
            >
              Finalizar compra
            </button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Frete e descontos calculados no checkout
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
