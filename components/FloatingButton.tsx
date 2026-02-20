"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

interface FloatingButtonProps {
    cartCount: number;
    onClick: () => void;
}

export default function FloatingButton({ cartCount, onClick }: FloatingButtonProps) {
    return (
        <AnimatePresence>
            {cartCount > 0 && (
                <motion.button
                    key="fab"
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    whileHover={{ scale: 1.06, boxShadow: "0 12px 36px rgba(244,143,177,0.55)" }}
                    whileTap={{ scale: 0.93 }}
                    onClick={onClick}
                    style={{
                        position: "fixed", bottom: "1.75rem", right: "1.75rem", zIndex: 45,
                        display: "flex", alignItems: "center", gap: "0.55rem",
                        padding: "0.85rem 1.4rem",
                        backgroundColor: "#F48FB1", color: "#fff",
                        borderRadius: "9999px", border: "none", cursor: "pointer",
                        fontWeight: 700, fontSize: "0.9rem",
                        boxShadow: "0 8px 28px rgba(244,143,177,0.45)",
                    }}
                >
                    <div style={{ position: "relative" }}>
                        <ShoppingBag size={20} />
                        <motion.span
                            key={cartCount}
                            initial={{ scale: 1.5 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                            style={{
                                position: "absolute", top: -8, right: -8,
                                backgroundColor: "#2D1810", color: "#fff",
                                borderRadius: "9999px", width: 18, height: 18,
                                fontSize: "0.65rem", fontWeight: 700,
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                        >
                            {cartCount > 9 ? "9+" : cartCount}
                        </motion.span>
                    </div>
                    Ver Pedido
                </motion.button>
            )}
        </AnimatePresence>
    );
}
