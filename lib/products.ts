export interface Product {
  id: number
  name: string
  shortName: string
  price: number
  originalPrice: number
  installments: number
  installmentPrice: number
  rating: number
  reviews: number
  image: string
  images: string[]
  category: string
  description: string
  safetyNote: string
  specs: string[]
  sold: number
}


export const products: Product[] = [
  {
    id: 1,
    name: "Vergalhão de Aço CA-50 10mm - Barra 12m",
    shortName: "Vergalhão de Aço CA-50",
    price: 49.90,
    originalPrice: 69.90,
    installments: 3,
    installmentPrice: 16.63,
    rating: 4.5,
    reviews: 237,
    image: "/products/vergalhao.png",
    images: ["/products/vergalhao.png", "/products/vergalhao.png", "/products/vergalhao.png"],
    category: "Aço e Ferragens",
    description: "O Vergalhão de Aço CA-50 10mm é um item essencial para qualquer obra de construção civil. Utilizado na armação de estruturas de concreto armado como lajes, vigas, pilares e fundações, este vergalhão garante resistência e durabilidade à sua construção. Com 12 metros de comprimento e diâmetro de 10mm, é ideal para obras residenciais e comerciais. Fabricado com aço de alta qualidade seguindo as normas ABNT, é um material que oferece segurança estrutural para o seu projeto.",
    safetyNote: "O vergalhão, por ser uma barra longa e metálica, pode representar risco quando manuseado ou transportado próximo à rede elétrica. Seu comprimento e material condutor exigem atenção especial durante a obra.",
    specs: ["Material: Aço CA-50", "Diâmetro: 10mm", "Comprimento: 12 metros", "Norma: ABNT NBR 7480", "Peso aprox.: 7,4 kg"],
    sold: 1543,
  },
]

export const categories = [
  "Todos",
  "Aço e Ferragens",
  "Andaimes e Escoramentos",
  "Antenas e Comunicação",
  "Escadas e Acesso",
  "Máquinas e Equipamentos",
]
