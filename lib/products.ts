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
  {
    id: 2,
    name: "Andaime Tubular Metálico 1,5m x 1,0m - Galvanizado",
    shortName: "Andaime Tubular Metálico",
    price: 799.90,
    originalPrice: 999.90,
    installments: 10,
    installmentPrice: 79.99,
    rating: 4.6,
    reviews: 95,
    image: "/products/andaime.png",
    images: ["/products/andaime.png", "/products/andaime.png"],
    category: "Andaimes e Escoramentos",
    description: "Andaime tubular metálico galvanizado ideal para trabalhos em altura em construção e manutenção. Estrutura robusta em aço com acabamento galvanizado, oferecendo resistência à corrosão e montagem modular para diferentes configurações conforme necessidade da obra. Atende exigências de segurança para trabalhos civis profissionais. Dimensões 1,5m x 1,0m. :contentReference[oaicite:0]{index=0}",
    safetyNote: "Deve ser utilizado com equipamentos de proteção individual (EPI) e seguir normas de segurança para trabalhos em altura.",
    specs: ["Material: Aço galvanizado", "Dimensões: 1,5m x 1,0m", "Normas: NR-18/NBR 6494", "Capacidade de carga aprox.: 150 kg/m²", "Soldagem MIG"], 
    sold: 421,
  },
  {
    id: 3,
    name: "Antena Digital Externa UHF/VHF com Mastro 3m",
    shortName: "Antena Digital Externa",
    price: 129.90,
    originalPrice: 179.90,
    installments: 3,
    installmentPrice: 43.30,
    rating: 4.2,
    reviews: 158,
    image: "/products/antena.png",
    images: ["/products/antena.png", "/products/antena.png"],
    category: "Antenas e Comunicação",
    description: "Antena digital externa compatível com sinais UHF e VHF para TV aberta. Ideal para captação de canais digitais com melhor recepção em áreas urbanas e rurais. Acompanha mastro de 3m para instalação elevada, garantindo maior linha de vista para o sinal. Frequência típica de operação entre VHF e UHF para HDTV. :contentReference[oaicite:1]{index=1}",
    safetyNote: "Instalar o mastro com fixação segura e, se possível, com aterramento adequado para evitar riscos em tempestades elétricas.",
    specs: ["Frequência: VHF/UHF HDTV", "Inclui mastro 3m", "Impedância: 75 Ω", "Material: Alumínio/Aço", "Uso: Externo"],
    sold: 863,
  },
  {
    id: 4,
    name: "Escada Extensível Alumínio 3 em 1 - 7,2m (2x13 Degraus)",
    shortName: "Escada Extensível Alumínio 3 em 1",
    price: 287.50,
    originalPrice: 399.99,
    installments: 10,
    installmentPrice: 28.75,
    rating: 4.4,
    reviews: 204,
    image: "/products/escada.png",
    images: ["/products/escada.png", "/products/escada.png"],
    category: "Escadas e Acesso",
    description: "Escada extensível em alumínio com configuração 3 em 1 (aberta, extensível e simples) com 2x13 degraus, alcançando até aproximadamente 7,2m de altura. Perfeita para manutenção, construção e serviços em altura, combinando leveza e resistência do alumínio com versatilidade de uso profissional. :contentReference[oaicite:2]{index=2}",
    safetyNote: "Sempre utilize a escada em superfície firme e aplique travas de segurança ao estender. Use EPI ao realizar trabalhos em altura.",
    specs: ["Material: Alumínio", "Degraus: 2x13", "Altura máxima: ~7,2m", "Capacidade de carga: até 150kg", "Sistema 3 em 1"],
    sold: 673,
  },
  {
    id: 5,
    name: "Mastro de Aço Galvanizado 6m para Antena",
    shortName: "Mastro de Aço Galvanizado 6m",
    price: 249.90,
    originalPrice: 329.90,
    installments: 4,
    installmentPrice: 62.48,
    rating: 4.3,
    reviews: 76,
    image: "/products/mastro.png",
    images: ["/products/mastro.png"],
    category: "Antenas e Comunicação",
    description: "Mastro de aço galvanizado de 6m ideal para fixação de antenas externas e outros equipamentos de sinal. O acabamento galvanizado protege contra corrosão, garantindo durabilidade mesmo em condições climáticas adversas. Excelente para ampliar a recepção de sinal. (Dados típicos de mastro de antena galvanizado).",
    safetyNote: "Fixar em suporte adequado e, se for utilizado para antena de TV, considerar aterramento conforme normas de telecomunicação.",
    specs: ["Material: Aço galvanizado", "Altura: 6 metros", "Diâmetro padrão para fixação", "Acabamento anticorrosivo", "Uso externo"],
    sold: 312,
  },
  {
    id: 6,
    name: "Torre Metálica para Linha de Vida 3m",
    shortName: "Torre Metálica Linha de Vida",
    price: 1899.90,
    originalPrice: 2299.90,
    installments: 12,
    installmentPrice: 158.33,
    rating: 4.7,
    reviews: 58,
    image: "/products/torre.png",
    images: ["/products/torre.png"],
    category: "Andaimes e Escoramentos",
    description: "Torre metálica de 3m projetada para sistemas de linha de vida em trabalhos em altura. Estrutura robusta para ancoragem de equipamentos de segurança, garantindo pontos de acesso seguros para equipes técnicas. Ideal para construções e manutenção industrial.",
    safetyNote: "Instalar com profissionais qualificados e verificar conformidade com normas de segurança em trabalhos em altura antes do uso.",
    specs: ["Altura: 3 metros", "Estrutura metálica reforçada", "Compatível com linha de vida", "Pontos de ancoragem seguros", "Uso profissional"],
    sold: 140,
  },
  {
    id: 7,
    name: "Tela Soldada Q-196 - Malha 15x15cm (2,45x6m)",
    shortName: "Tela Soldada Q-196",
    price: 289.90,
    originalPrice: 349.90,
    installments: 5,
    installmentPrice: 57.98,
    rating: 4.5,
    reviews: 125,
    image: "/products/tela.png",
    images: ["/products/tela.png", "/products/tela.png"],
    category: "Aço e Ferragens",
    description: "Tela soldada em aço com malha 15x15cm no tamanho 2,45x6m, usada para cercas, reforço estrutural e proteção em obras civis e industriais. O produto Q-196 é um padrão comum de tela soldada, garantindo resistência e versatilidade de aplicação.",
    safetyNote: "Cortar e manusear sempre com EPI adequado (luvas, óculos), pois as arestas podem ferir durante o manuseio.",
    specs: ["Material: Aço soldado", "Malha: 15x15cm", "Dimensões: 2,45x6m", "Norma: Q-196 padrão", "Uso: cercas e reforços"],
    sold: 918,
  }
]

export const categories = [
  "Todos",
  "Aço e Ferragens",
  "Andaimes e Escoramentos",
  "Antenas e Comunicação",
  "Escadas e Acesso",
  "Máquinas e Equipamentos",
]
