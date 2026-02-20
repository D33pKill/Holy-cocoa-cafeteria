"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { Product, formatPrice } from "@/lib/products";

interface ProductCardProps {
    product: Product;
    onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [justAdded, setJustAdded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
        layoutEffect: false,
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

    const handleAdd = useCallback(() => {
        onAdd(product);
        setJustAdded(true);
        setTimeout(() => setJustAdded(false), 1200);
    }, [onAdd, product]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -4, boxShadow: "0 18px 48px -4px rgba(212,175,55,0.22)" }}
            style={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 4px 24px -2px rgba(45,24,16,0.09)",
                border: "1px solid rgba(212,175,55,0.15)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
            }}
        >
            {/* Flash overlay al agregar — tinte dorado */}
            <AnimatePresence>
                {justAdded && (
                    <motion.div
                        key="flash"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "rgba(212,175,55,0.12)",
                            zIndex: 5,
                            borderRadius: "20px",
                            pointerEvents: "none",
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Imagen con parallax */}
            <div style={{ height: "200px", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                {product.badge && (
                    <div style={{
                        position: "absolute", top: 12, left: 12, zIndex: 2,
                        backgroundColor: "rgba(255,253,249,0.92)", color: "#2D1810",
                        borderRadius: "9999px", padding: "0.25rem 0.65rem",
                        fontSize: "0.72rem", fontWeight: 700,
                        backdropFilter: "blur(6px)", boxShadow: "0 2px 8px rgba(45,24,16,0.12)",
                    }}>
                        {product.badge}
                    </div>
                )}
                <motion.img
                    src={product.image}
                    alt={product.name}
                    style={{
                        width: "100%", height: "260px",
                        objectFit: "cover", objectPosition: "center",
                        y: imageY, willChange: "transform", display: "block",
                    }}
                    loading="lazy"
                />
            </div>

            {/* Contenido */}
            <div style={{
                padding: "1rem 1.1rem 1.1rem", flex: 1,
                display: "flex", flexDirection: "column", gap: "0.35rem",
            }}>
                <span style={{
                    fontSize: "0.68rem", fontWeight: 700,
                    letterSpacing: "0.08em", color: "#D4AF37", textTransform: "uppercase",
                }}>
                    {product.category}
                </span>

                <h3 style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontWeight: 700, fontSize: "1rem", color: "#2D1810", lineHeight: 1.3, margin: 0,
                }}>
                    {product.name}
                </h3>

                <p style={{ fontSize: "0.8rem", color: "#8B5E3C", lineHeight: 1.5, margin: 0, flex: 1 }}>
                    {product.description}
                </p>

                {/* Precio + botón */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.65rem" }}>
                    <span style={{
                        fontWeight: 800,
                        fontSize: "1.15rem",
                        color: "#D4AF37",
                        letterSpacing: "-0.02em",
                    }}>
                        {formatPrice(product.price)}
                    </span>

                    {/* Botón animado con estado "agregado" */}
                    <motion.button
                        whileTap={{ scale: 0.85 }}
                        animate={justAdded
                            ? { scale: 1.12 }
                            : { scale: 1 }
                        }
                        transition={{ type: "spring", stiffness: 500, damping: 28 }}
                        onClick={handleAdd}
                        style={{
                            width: 38, height: 38, borderRadius: "50%",
                            border: "none", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: justAdded ? "#fff" : "#2D1810",
                            background: justAdded
                                ? "linear-gradient(135deg, #22c55e, #16a34a)"
                                : "linear-gradient(135deg, #F0D060 0%, #D4AF37 60%, #A8861A 100%)",
                            boxShadow: justAdded
                                ? "0 4px 16px rgba(34,197,94,0.45)"
                                : "0 4px 14px rgba(212,175,55,0.45)",
                        }}
                        aria-label={`Agregar ${product.name} al carrito`}
                    >
                        <AnimatePresence mode="wait">
                            {justAdded ? (
                                <motion.span
                                    key="check"
                                    initial={{ scale: 0, rotate: -90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0 }}
                                    transition={{ type: "spring", stiffness: 600, damping: 24 }}
                                >
                                    <Check size={18} strokeWidth={3} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="plus"
                                    initial={{ scale: 0, rotate: 90 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0 }}
                                    transition={{ type: "spring", stiffness: 600, damping: 24 }}
                                >
                                    <Plus size={18} strokeWidth={2.5} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
