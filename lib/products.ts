export type Category = "Todos" | "Cookies" | "Brownies" | "Café" | "Packs";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Exclude<Category, "Todos">;
  image: string;
  badge?: string;
}

export const CATEGORIES: Category[] = ["Todos", "Cookies", "Brownies", "Café", "Packs"];

export const PRODUCTS: Product[] = [
  // ─── Cookies ───────────────────────────────────────────────────
  {
    id: 1,
    name: "Cookie Chunky Chocolate",
    description: "Masa suave con chips de chocolate belga 70% y borde crujiente dorado.",
    price: 2800,
    category: "Cookies",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop",
    badge: "⭐ Más vendido",
  },
  {
    id: 2,
    name: "Cookie Mantequilla Café",
    description: "Mantequilla noisette, extracto de vainilla y crystales de sal marina.",
    price: 2600,
    category: "Cookies",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Cookie Red Velvet",
    description: "Masa aterciopelada roja con relleno de queso crema y chips blancos.",
    price: 3200,
    category: "Cookies",
    image: "https://images.unsplash.com/photo-1615870216519-2f9fa575b8b6?w=600&auto=format&fit=crop",
    badge: "✨ Especial",
  },
  {
    id: 4,
    name: "Cookie Avena & Arándanos",
    description: "Avena entera, arándanos deshidratados y un toque de canela.",
    price: 2500,
    category: "Cookies",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop",
  },
  // ─── Brownies ──────────────────────────────────────────────────
  {
    id: 5,
    name: "Brownie Fudge Clásico",
    description: "Denso, húmedo y oscuro. El brownie perfecto de chocolate amargo.",
    price: 3200,
    category: "Brownies",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop",
    badge: "🍫 Signature",
  },
  {
    id: 6,
    name: "Brownie Nuez & Caramelo",
    description: "Brownie intenso con nueces tostadas y hilo de caramelo salado.",
    price: 3500,
    category: "Brownies",
    image: "https://images.unsplash.com/photo-1548369937-47519962c11a?w=600&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Brownie Mármol",
    description: "Swirl de queso crema vainilla sobre fudge de chocolate negro.",
    price: 3800,
    category: "Brownies",
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=600&auto=format&fit=crop",
    badge: "🌀 Nuevo",
  },
  {
    id: 8,
    name: "Brownie Oreo Crunch",
    description: "Base de brownie esponjoso con una capa crujiente de galletas Oreo trituradas.",
    price: 3900,
    category: "Brownies",
    image: "https://images.unsplash.com/photo-1565793979771-9dfb9cf40ae9?w=600&auto=format&fit=crop",
  },
  // ─── Café ───────────────────────────────────────────────────────
  {
    id: 9,
    name: "Café Latte Holy",
    description: "Shot doble de espresso, leche cremosa vaporizada con arte latte.",
    price: 3200,
    category: "Café",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop",
  },
  {
    id: 10,
    name: "Cappuccino Artesanal",
    description: "Espresso intenso con espuma de leche sedosa y toque de cacao.",
    price: 3000,
    category: "Café",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop",
    badge: "☕ Favorito",
  },
  {
    id: 11,
    name: "Mocha Holy Cocoa",
    description: "Chocolate oscuro derretido, espresso y crema de leche. Puro vicio.",
    price: 3800,
    category: "Café",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop",
    badge: "🔥 Hot",
  },
  // ─── Packs ──────────────────────────────────────────────────────
  {
    id: 12,
    name: "Pack Dúo Cookie + Café",
    description: "Tu cookie favorita + un café latte. El desayuno perfecto.",
    price: 5500,
    category: "Packs",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop",
    badge: "💰 Ahorra $500",
  },
  {
    id: 13,
    name: "Pack Brownie & Friends (x4)",
    description: "4 brownies surtidos: fudge, nuez, mármol y oreo. Ideal para compartir.",
    price: 12900,
    category: "Packs",
    image: "https://images.unsplash.com/photo-1611270629569-8b357cb88da9?w=600&auto=format&fit=crop",
    badge: "🎁 Regalo",
  },
  {
    id: 14,
    name: "Pack Holy Completo (x6 Cookies)",
    description: "6 cookies surtidas de la selección Holy Cocoa del mes.",
    price: 14900,
    category: "Packs",
    image: "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=600&auto=format&fit=crop",
    badge: "⭐ Más pedido",
  },
];

export function formatPrice(price: number): string {
  return "$" + price.toLocaleString("es-CL");
}
