"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import { PRODUCTS, formatPrice, type Category, type Product } from "@/lib/products";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryFilter from "@/components/CategoryFilter";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import FloatingButton from "@/components/FloatingButton";
import ToastNotification, { type ToastData } from "@/components/ToastNotification";

// ─── Número real del cliente ────────────────────────────────────────────────
const WHATSAPP_NUMBER = "56937244264";

// ─── Tipos ───────────────────────────────────────────────────────────────────
export interface CartItem extends Product {
  qty: number;
}

let toastId = 0;

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  // Siempre arranca desde arriba, sin importar el scroll anterior
  useEffect(() => {
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // Filtrado reactivo
  const filteredProducts = useMemo(
    () =>
      activeCategory === "Todos"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  // ── Toast helpers ──────────────────────────────────────────────────────────
  const addToast = useCallback((product: Product) => {
    const id = ++toastId;
    setToasts((prev) => [...prev.slice(-3), { id, name: product.name, image: product.image }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Cart handlers ──────────────────────────────────────────────────────────
  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    addToast(product);
  }, [addToast]);

  const incrementQty = useCallback((id: number) =>
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, qty: i.qty + 1 } : i)), []);

  const decrementQty = useCallback((id: number) =>
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (!item) return prev;
      if (item.qty === 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) => i.id === id ? { ...i, qty: i.qty - 1 } : i);
    }), []);

  const deleteFromCart = useCallback((id: number) =>
    setCart((prev) => prev.filter((i) => i.id !== id)), []);

  // ── WhatsApp URL con número real ───────────────────────────────────────────
  const whatsappUrl = useMemo(() => {
    if (cart.length === 0) return "#";
    const lines = cart.map((i) => `${i.qty}x ${i.name}`).join(", ");
    const total = formatPrice(cartTotal);
    const msg = `Hola Holy Cocoa 🍫, me gustaría pedir:\n${lines}\n\nTotal: ${total}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [cart, cartTotal]);

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={() => setIsCartOpen(true)} />

      <main>
        <HeroSection />

        <section
          id="menu"
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.25rem 5rem" }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <p style={{
              color: "#D4AF37", fontWeight: 700, letterSpacing: "0.2em",
              textTransform: "uppercase", fontSize: "0.75rem", marginBottom: "0.4rem",
            }}>
              ✦ Nuestro Menú
            </p>
            <h2 style={{
              fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 900,
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#2D1810",
              lineHeight: 1.15, marginBottom: "1.5rem",
            }}>
              Hechos con amor &amp; chocolate
            </h2>
            <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem 0", color: "#8B5E3C" }}>
              <p style={{ fontSize: "2rem" }}>🍫</p>
              <p style={{ fontWeight: 500 }}>No hay productos en esta categoría.</p>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: "#2D1810",
        textAlign: "center",
        padding: "2.5rem 1.5rem",
        fontSize: "0.82rem",
        lineHeight: 1.7,
      }}>
        {/* Logo en footer */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.85rem" }}>
          <Image
            src="/logo.png"
            alt="Holy Cocoa"
            width={120}
            height={48}
            style={{
              height: "48px",
              width: "auto",
              objectFit: "contain",
              filter: "brightness(0) saturate(100%) invert(78%) sepia(48%) saturate(500%) hue-rotate(5deg) brightness(105%)",
            }}
          />
        </div>

        <p style={{ color: "rgba(255,253,249,0.55)", marginBottom: "0.25rem" }}>
          Pastelería Artesanal · Santiago, Chile
        </p>
        <p>
          <span style={{ color: "rgba(255,253,249,0.45)" }}>Pedidos por WhatsApp:{" "}</span>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            style={{ color: "#D4AF37", textDecoration: "none", fontWeight: 600 }}
            target="_blank" rel="noopener noreferrer"
          >
            +56 9 3724 4264
          </a>
        </p>

        {/* Íconos redes sociales */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
          {["Instagram", "TikTok", "WhatsApp"].map((red) => (
            <span
              key={red}
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "#D4AF37",
                textTransform: "uppercase",
                opacity: 0.9,
              }}
            >
              {red}
            </span>
          ))}
        </div>

        <p style={{ color: "rgba(255,253,249,0.25)", fontSize: "0.7rem", marginTop: "1.25rem" }}>
          © 2025 Holy Cocoa — Todos los derechos reservados
        </p>
      </footer>

      {/* Toast notifications */}
      <ToastNotification toasts={toasts} onRemove={removeToast} />

      {/* Cart drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        onClose={() => setIsCartOpen(false)}
        onAdd={incrementQty}
        onRemove={decrementQty}
        onDelete={deleteFromCart}
        whatsappUrl={whatsappUrl}
      />

      {/* FAB flotante */}
      <FloatingButton cartCount={cartCount} onClick={() => setIsCartOpen(true)} />
    </>
  );
}
