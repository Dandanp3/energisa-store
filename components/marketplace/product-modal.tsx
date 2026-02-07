"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  X,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  Truck,
  Shield,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowLeft,
} from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { formatPrice, StarRating } from "./product-card"

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [cep, setCep] = useState("")
  const [cepChecked, setCepChecked] = useState(false)
  const [cepLoading, setCepLoading] = useState(false)
  const [showSafety, setShowSafety] = useState(false)
  const { addToCart, setIsCartOpen } = useCart()

  const [safetyExplanation] = useState(
    "Este produto passa por uma análise automática de segurança. Ao informar o CEP, o sistema cruza a localização da entrega com a rede elétrica da Energisa, ajudando a prevenir acidentes durante a obra."
  )

  const handleClose = useCallback(() => {
    onClose()
    setQuantity(1)
    setSelectedImage(0)
    setCep("")
    setCepChecked(false)
    setCepLoading(false)
    setShowSafety(false)
  }, [onClose])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose()
    }
    if (product) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleEscape)
    }
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleEscape)
    }
  }, [product, handleClose])

  if (!product) return null

  const handleCepCheck = () => {
    if (cep.length < 8) return
    setCepLoading(true)
    setTimeout(() => {
      setCepLoading(false)
      setCepChecked(true)
    }, 1500)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    handleClose()
    setIsCartOpen(true)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  )

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-foreground/60 p-4 backdrop-blur-sm md:p-6"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalhes do produto: ${product.name}`}
    >
      <div
        className="relative my-4 w-full max-w-4xl animate-in fade-in zoom-in-95 rounded-2xl bg-card shadow-2xl duration-300"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === "Escape" && handleClose()}
      >
        {/* Close button - more prominent */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-card p-2.5 shadow-lg text-card-foreground ring-2 ring-border transition-all hover:bg-destructive hover:text-destructive-foreground hover:ring-destructive cursor-pointer"
          aria-label="Fechar"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          {/* Left: Images */}
          <div className="p-5 md:p-6">
            <div className="relative mb-3 aspect-square overflow-hidden rounded-xl bg-muted">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {discount > 0 && (
                <div className="absolute left-2 top-2 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
                  -{discount}%
                </div>
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={`thumb-${product.id}-${idx}`}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-14 w-14 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === idx
                      ? "border-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                  aria-label={`Ver imagem ${idx + 1}`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} - imagem ${idx + 1}`}
                    fill
                    className="object-cover p-1"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product details */}
          <div className="flex flex-col border-t border-border p-5 md:border-l md:border-t-0 md:p-6">
            <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {product.category}
            </span>
            <h2 className="mb-2 font-heading text-lg font-bold leading-tight text-card-foreground md:text-xl">
              {product.name}
            </h2>

            <div className="mb-3 flex items-center gap-2">
              <StarRating rating={product.rating} reviews={product.reviews} />
              <span className="text-xs text-muted-foreground">
                {product.sold.toLocaleString("pt-BR")} vendidos
              </span>
            </div>

            {/* Price */}
            <div className="mb-3 rounded-xl bg-muted p-3">
              {product.originalPrice > product.price && (
                <p className="text-xs text-muted-foreground line-through">
                  De: {formatPrice(product.originalPrice)}
                </p>
              )}
              <p className="text-2xl font-bold text-card-foreground">
                {formatPrice(product.price)}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                em até{" "}
                <span className="font-bold text-primary">
                  {product.installments}x de{" "}
                  {formatPrice(product.installmentPrice)}
                </span>{" "}
                sem juros
              </p>
            </div>

            {/* Quantity */}
            <div className="mb-3">
              <label className="mb-1.5 block text-xs font-semibold text-card-foreground">
                Quantidade:
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-card-foreground transition-colors hover:bg-muted cursor-pointer"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="flex h-9 w-12 items-center justify-center rounded-lg border border-border text-center text-sm font-bold text-card-foreground">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-card-foreground transition-colors hover:bg-muted cursor-pointer"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mb-3 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.98] sur cursor-pointer"
              >
                <Zap className="h-4 w-4" />
                Comprar agora
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary bg-transparent px-5 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary/5 active:scale-[0.98] cursor-pointer"
              >
                <ShoppingCart className="h-4 w-4" />
                Adicionar ao carrinho
              </button>
            </div>

            {/* Benefits */}
            <div className="mb-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Truck className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span>Frete grátis acima de R$ 299</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5 shrink-0 text-primary" />
                <span>Garantia de 12 meses</span>
              </div>
            </div>

            {/* CEP section */}
            <div className="rounded-xl border border-border bg-muted/50 p-3">
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-card-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                Informe o CEP da entrega
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="00000-000"
                  value={cep}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 8)
                    if (value.length > 5) {
                      setCep(`${value.slice(0, 5)}-${value.slice(5)}`)
                    } else {
                      setCep(value)
                    }
                    setCepChecked(false)
                  }}
                  className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-xs text-card-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={handleCepCheck}
                  disabled={cep.replace(/\D/g, "").length < 8 || cepLoading}
                  className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
                >
                  {cepLoading ? (
                    <span className="flex items-center gap-1">
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                      Analisando
                    </span>
                  ) : (
                    "Consultar"
                  )}
                </button>
              </div>

              {/* CEP result */}
              {cepChecked && (
                <div className="mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="mb-2 flex items-start gap-1.5 rounded-lg bg-primary/10 p-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-semibold text-card-foreground">
                        Entrega: 5 a 8 dias úteis
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Frete: Grátis
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1.5 rounded-lg bg-accent/20 p-2">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    <p className="text-xs leading-relaxed text-card-foreground">
                      Análise de segurança concluída: produto adequado para sua região.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom section: Description + Safety */}
        <div className="max-h-[400px] overflow-y-auto border-t border-border p-5 md:p-6">
          {/* Description */}
          <div className="mb-4">
            <h3 className="mb-2 font-heading text-base font-bold text-card-foreground">
              Descrição do Produto
            </h3>
            <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div
                  key={spec}
                  className="flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1.5 text-xs text-card-foreground"
                >
                  <CheckCircle2 className="h-3 w-3 shrink-0 text-primary" />
                  {spec}
                </div>
              ))}
            </div>
          </div>

          {/* Safety note */}
          <div className="rounded-xl border border-accent/30 bg-accent/10 p-3">
            <div className="mb-1.5 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-accent" />
              <h4 className="font-heading text-xs font-bold text-card-foreground">
                Nota de Segurança
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {product.safetyNote}
            </p>
          </div>

          {/* Conceptual explanation */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowSafety(!showSafety)}
              className="flex w-full items-center justify-between rounded-xl border border-border bg-muted/50 px-3 py-2.5 text-left transition-colors hover:bg-muted"
            >
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                <span className="font-heading text-xs font-bold text-card-foreground">
                  Como funciona a segurança desse produto?
                </span>
              </div>
              {showSafety ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {showSafety && (
              <div className="mt-2 animate-in fade-in slide-in-from-top-2 rounded-xl border border-border bg-card p-3 duration-300">
                <div className="flex flex-col gap-3 text-xs leading-relaxed text-muted-foreground">
                  <p>
                    Grandes marketplaces e lojas online como Amazon, Mercado
                    Livre e Magazine Luiza vendem diariamente milhares de itens
                    utilizados em obras, como{" "}
                    <strong className="text-card-foreground">
                      vergalhões, andaimes, antenas e escadas
                    </strong>
                    . Esses produtos, quando manuseados ou instalados próximos
                    à rede elétrica, podem causar acidentes graves.
                  </p>
                  <p>
                    A proposta deste sistema é integrar-se diretamente com as
                    plataformas de venda e também com os{" "}
                    <strong className="text-card-foreground">
                      sistemas de alvará das prefeituras
                    </strong>{" "}
                    e com a{" "}
                    <strong className="text-card-foreground">
                      emissão de nota fiscal
                    </strong>
                    . Sempre que um item potencialmente perigoso for vendido, o
                    sistema realiza automaticamente o{" "}
                    <strong className="text-card-foreground">
                      cruzamento do CEP de entrega com o mapa da rede elétrica
                    </strong>{" "}
                    da concessionária (como a Energisa).
                  </p>
                  <p>
                    Dessa forma, é possível alertar o comprador, a loja e até a
                    concessionária sobre possíveis riscos, contribuindo para a{" "}
                    <strong className="text-card-foreground">
                      prevenção de acidentes com a rede elétrica
                    </strong>{" "}
                    durante obras e instalações.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer with back button */}
        <div className="border-t border-border bg-muted/30 p-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-border bg-card px-4 py-2.5 text-sm font-semibold text-card-foreground transition-all hover:bg-muted active:scale-[0.98] cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a loja
          </button>
        </div>
      </div>
    </div>
  )
}
