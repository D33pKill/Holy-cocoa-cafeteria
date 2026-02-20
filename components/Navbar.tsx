"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";

interface NavbarProps {
    cartCount: number;
    onCartOpen: () => void;
}

export default function Navbar({ cartCount, onCartOpen }: NavbarProps) {
    return (
        <header className="sticky top-0 z-40 w-full">
            <div style={{
                backgroundColor: "rgba(255,253,249,0.88)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                borderBottom: "1px solid rgba(212,175,55,0.2)",
            }}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

                    {/* Logo image */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Image
                            src="/logo.png"
                            alt="Holy Cocoa"
                            width={140}
                            height={56}
                            style={{ height: "52px", width: "auto", objectFit: "contain" }}
                            priority
                        />
                    </div>

                    {/* Cart button con wiggle al agregar */}
                    <motion.button
                        key={cartCount}
                        animate={cartCount > 0
                            ? { rotate: [0, -14, 12, -8, 6, 0] }
                            : { rotate: 0 }
                        }
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={onCartOpen}
                        style={{
                            position: "relative", padding: "0.4rem",
                            color: "#D4AF37", background: "none", border: "none", cursor: "pointer",
                        }}
                        aria-label="Abrir carrito"
                    >
                        <ShoppingBag size={26} strokeWidth={1.5} />
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span
                                    key="badge"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 28 }}
                                    style={{
                                        position: "absolute", top: 0, right: 0,
                                        background: "linear-gradient(135deg, #F0D060, #D4AF37)",
                                        color: "#2D1810",
                                        borderRadius: "9999px", width: 18, height: 18,
                                        fontSize: "0.65rem", fontWeight: 700,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}
                                >
                                    {cartCount > 9 ? "9+" : cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>

                </div>
            </div>
        </header>
    );
}
