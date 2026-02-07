"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/marketplace/header"
import { ProductCard } from "@/components/marketplace/product-card"
import { ProductModal } from "@/components/marketplace/product-modal"
import { CartDrawer } from "@/components/marketplace/cart-drawer"
import { CartProvider } from "@/lib/cart-context"
import { products, type Product } from "@/lib/products"
import { ShieldCheck, Truck, CreditCard, Headphones } from "lucide-react"

function MarketplaceContent() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "Todos" || product.category === activeCategory
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <div className="min-h-screen bg-background">
      <Header
        onCategoryChange={setActiveCategory}
        onSearch={setSearchQuery}
        activeCategory={activeCategory}
      />

      {/* Hero banner */}
      <section className="bg-gradient-to-r from-foreground to-foreground/90 px-4 py-10 md:py-16">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="font-heading text-2xl font-extrabold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
            <span className="text-primary">Equipamentos</span> de Construção
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/70 md:text-base">
            Encontre os melhores materiais e equipamentos para sua obra com os melhores preços.
            Segurança e qualidade em um só lugar.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-primary-foreground/60 md:text-sm">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <span>Frete Grátis</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary" />
              <span>12x sem juros</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Compra Segura</span>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-primary" />
              <span>Suporte 24h</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products section */}
      <main className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg font-bold text-foreground md:text-2xl">
              {activeCategory === "Todos"
                ? "Todos os Produtos"
                : activeCategory}
            </h2>
            <p className="text-xs text-muted-foreground md:text-sm">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "produto encontrado"
                : "produtos encontrados"}
            </p>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg font-semibold text-foreground">
              Nenhum produto encontrado
            </p>
            <p className="text-sm text-muted-foreground">
              Tente buscar por outro termo ou categoria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </main>

      {/* Safety info section */}
      <section className="border-t border-border bg-muted px-4 py-10 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <h2 className="mb-3 font-heading text-lg font-bold text-foreground md:text-2xl">
            Compra com Segurança Inteligente
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Nosso marketplace conta com um sistema inovador que cruza o CEP de entrega com o mapa
            da rede elétrica. Ao comprar itens como vergalhões, andaimes, antenas e escadas, o
            sistema realiza automaticamente uma análise de segurança, ajudando a prevenir
            acidentes durante a obra. Sua segurança é nossa prioridade.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground px-4 py-8 text-center">
        <p className="text-xs text-primary-foreground/50">
          Este é um protótipo demonstrativo (MVP). Nenhum pagamento real é processado.
        </p>
        <p className="mt-1 text-xs text-primary-foreground/30">
          Marketplace de Equipamentos de Construção - Protótipo de Segurança Energisa
        </p>
      </footer>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <CartDrawer />
    </div>
  )
}

export default function Page() {
  return (
    <CartProvider>
      <MarketplaceContent />
    </CartProvider>
  )
}
