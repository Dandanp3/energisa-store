import React from "react"
import type { Metadata, Viewport } from 'next'
import { Poppins, Nunito } from 'next/font/google'

import './globals.css'
// 1. ADICIONE ESTE IMPORT (Verifique se o caminho do seu arquivo está correto)
import { CartProvider } from "@/lib/cart-context" 

const _poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

const _nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Marketplace de Equipamentos de Construção',
  description: 'Encontre os melhores equipamentos e materiais de construção com segurança e os melhores preços.',
}

export const viewport: Viewport = {
  themeColor: '#EA580C',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${_poppins.variable} ${_nunito.variable} font-sans antialiased`}>
        {/* 2. ENVOLVA O CHILDREN COM O PROVIDER */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}