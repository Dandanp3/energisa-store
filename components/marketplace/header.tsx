"use client"

import React from "react"

import { useState } from "react"
import { Search, ShoppingCart, Menu, X, MapPin, User } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { categories } from "@/lib/products"

interface HeaderProps {
  onCategoryChange: (category: string) => void
  onSearch: (query: string) => void
  activeCategory: string
}

export function Header({ onCategoryChange, onSearch, activeCategory }: HeaderProps) {
  const [siteName, setSiteName] = useState("ENERGISA STORE")
  const [isEditingName, setIsEditingName] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems, setIsCartOpen } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <header className="sticky top-0 z-50 bg-foreground text-primary-foreground shadow-lg">
      {/* Top bar */}
      <div className="bg-primary/90 px-4 py-1.5 text-center text-xs font-medium text-primary-foreground md:text-sm">
        Frete grátis para compras acima de R$ 299,00 | Parcele em até 12x sem juros
      </div>

      {/* Main header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Mobile menu button */}
        <button
          type="button"
          className="mr-2 rounded-md p-1.5 text-primary-foreground transition-colors hover:bg-primary-foreground/10 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Site name (editable) */}
        <div className="mr-4 shrink-0">
          {isEditingName ? (
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => e.key === "Enter" && setIsEditingName(false)}
              className="w-40 rounded-md border border-primary-foreground/30 bg-primary-foreground/10 px-2 py-1 font-heading text-lg font-bold text-primary-foreground outline-none focus:border-primary md:w-56 md:text-xl"
              autoFocus
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingName(true)}
              className="font-heading text-lg font-bold tracking-tight text-primary-foreground transition-colors hover:text-primary md:text-xl"
              title="Clique para editar o nome do site"
            >
              {siteName}
            </button>
          )}
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="mx-4 hidden max-w-2xl flex-1 md:flex"
        >
          <div className="relative flex w-full">
            <input
                type="text"
                placeholder="Buscar equipamentos de construção..."
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value)
                    onSearch(e.target.value)
                }}
                // ADICIONE bg-white AQUI:
                className="w-full rounded-l-lg border-0 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-500"
                />
            <button
              type="submit"
              className="rounded-r-lg bg-primary px-5 text-primary-foreground transition-colors hover:bg-primary/80"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button type="button" className="hidden items-center gap-1.5 text-xs text-primary-foreground/80 transition-colors hover:text-primary-foreground md:flex">
            <MapPin className="h-4 w-4" />
            <span>Informe seu CEP</span>
          </button>
          <button type="button" className="hidden items-center gap-1.5 text-xs text-primary-foreground/80 transition-colors hover:text-primary-foreground md:flex">
            <User className="h-4 w-4" />
            <span>Entre / Cadastre-se</span>
          </button>
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="relative rounded-full p-2 text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            aria-label={`Carrinho com ${totalItems} itens`}
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <form onSubmit={handleSearch} className="px-4 pb-3 md:hidden">
        <div className="relative flex w-full">
          <input
            type="text"
            placeholder="Buscar equipamentos..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              onSearch(e.target.value)
            }}
            className="w-full rounded-l-lg border-0 px-4 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className="rounded-r-lg bg-primary px-4 text-primary-foreground transition-colors hover:bg-primary/80"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Categories */}
      <nav className="border-t border-primary-foreground/10 bg-foreground/95">
        <div className="mx-auto hidden max-w-7xl items-center gap-1 overflow-x-auto px-4 py-2 md:flex">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-primary-foreground/10 bg-foreground md:hidden">
          <div className="flex flex-col px-4 py-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  onCategoryChange(cat)
                  setMobileMenuOpen(false)
                }}
                className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
