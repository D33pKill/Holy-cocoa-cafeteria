"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, MessageCircle, ShoppingBag, Trash2 } from "lucide-react";
import { CartItem } from "@/app/page";
import { formatPrice } from "@/lib/products";

interface CartDrawerProps {
    isOpen: boolean;
    cart: CartItem[];
    onClose: () => void;
    onAdd: (id: number) => void;
    onRemove: (id: number) => void;
    onDelete: (id: number) => void;
    whatsappUrl: string;
}

export default function CartDrawer({ isOpen, cart, onClose, onAdd, onRemove, onDelete, whatsappUrl }: CartDrawerProps) {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        style={{
                            position: "fixed", inset: 0,
                            backgroundColor: "rgba(45,24,16,0.45)",
                            backdropFilter: "blur(4px)", zIndex: 50,
                        }}
                    />

                    {/* Drawer */}
                    <motion.aside
                        key="drawer"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 320, damping: 35 }}
                        style={{
                            position: "fixed", top: 0, right: 0, bottom: 0,
                            width: "min(420px, 100vw)",
                            backgroundColor: "#FFFDF9", zIndex: 51,
                            display: "flex", flexDirection: "column",
                            boxShadow: "-8px 0 40px rgba(45,24,16,0.18)",
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: "1.25rem 1.5rem",
                            borderBottom: "1px solid #FDEFD8",
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <ShoppingBag size={20} color="#2D1810" />
                                <h2 style={{
                                    fontFamily: "var(--font-playfair), Georgia, serif",
                                    fontWeight: 700, fontSize: "1.2rem", color: "#2D1810",
                                }}>
                                    Tu Pedido
                                </h2>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                style={{
                                    padding: "0.35rem", borderRadius: "50%",
                                    backgroundColor: "#FDEFD8", color: "#2D1810",
                                    border: "none", cursor: "pointer", display: "flex",
                                }}
                            >
                                <X size={18} />
                            </motion.button>
                        </div>

                        {/* Items */}
                        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
                            {cart.length === 0 ? (
                                <div style={{
                                    display: "flex", flexDirection: "column",
                                    alignItems: "center", justifyContent: "center",
                                    height: "100%", gap: "1rem", opacity: 0.5,
                                }}>
                                    <ShoppingBag size={48} color="#8B5E3C" strokeWidth={1} />
                                    <p style={{ color: "#8B5E3C", fontWeight: 500 }}>Tu carrito está vacío</p>
                                </div>
                            ) : (
                                <AnimatePresence initial={false}>
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 40, scale: 0.95 }}
                                            transition={{ duration: 0.22 }}
                                            style={{
                                                display: "flex", alignItems: "center", gap: "0.75rem",
                                                padding: "0.85rem 0", borderBottom: "1px solid #FDEFD8",
                                            }}
                                        >
                                            <div style={{ width: 54, height: 54, borderRadius: "10px", overflow: "hidden", flexShrink: 0 }}>
                                                <img src={item.image} alt={item.name}
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                            </div>

                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontWeight: 600, fontSize: "0.88rem", color: "#2D1810", lineHeight: 1.3 }}>
                                                    {item.name}
                                                </p>
                                                <p style={{ fontSize: "0.8rem", color: "#F48FB1", fontWeight: 700 }}>
                                                    {formatPrice(item.price * item.qty)}
                                                </p>
                                            </div>

                                            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                                <motion.button whileTap={{ scale: 0.85 }} onClick={() => onRemove(item.id)}
                                                    style={{
                                                        width: 26, height: 26, borderRadius: "50%",
                                                        backgroundColor: "#FDEFD8", border: "none", cursor: "pointer",
                                                        display: "flex", alignItems: "center", justifyContent: "center", color: "#2D1810",
                                                    }}>
                                                    <Minus size={12} />
                                                </motion.button>
                                                <span style={{ fontWeight: 700, fontSize: "0.9rem", color: "#2D1810", minWidth: "1.4rem", textAlign: "center" }}>
                                                    {item.qty}
                                                </span>
                                                <motion.button whileTap={{ scale: 0.85 }} onClick={() => onAdd(item.id)}
                                                    style={{
                                                        width: 26, height: 26, borderRadius: "50%",
                                                        backgroundColor: "#F48FB1", border: "none", cursor: "pointer",
                                                        display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
                                                    }}>
                                                    <Plus size={12} />
                                                </motion.button>
                                                <motion.button whileTap={{ scale: 0.85 }} onClick={() => onDelete(item.id)}
                                                    style={{
                                                        marginLeft: "0.2rem", padding: "0.2rem",
                                                        border: "none", background: "none", cursor: "pointer", color: "#D4915A", display: "flex",
                                                    }}>
                                                    <Trash2 size={14} />
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer con total y botón WhatsApp */}
                        {cart.length > 0 && (
                            <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid #FDEFD8", backgroundColor: "#FFF8EE" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                                    <span style={{ fontWeight: 600, color: "#5C3A2A" }}>Total</span>
                                    <span style={{
                                        fontFamily: "var(--font-playfair), Georgia, serif",
                                        fontWeight: 700, fontSize: "1.15rem", color: "#2D1810",
                                    }}>
                                        {formatPrice(total)}
                                    </span>
                                </div>

                                <motion.a
                                    whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(37,211,102,0.4)" }}
                                    whileTap={{ scale: 0.97 }}
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        gap: "0.6rem", width: "100%", padding: "0.9rem 1.5rem",
                                        backgroundColor: "#25D366", color: "#fff",
                                        borderRadius: "14px", fontWeight: 700, fontSize: "0.95rem",
                                        textDecoration: "none", cursor: "pointer",
                                    }}
                                >
                                    <MessageCircle size={20} />
                                    Enviar Pedido por WhatsApp
                                </motion.a>
                            </div>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
