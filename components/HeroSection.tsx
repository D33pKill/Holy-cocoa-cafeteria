"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                height: "90vh",
                minHeight: "550px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Parallax Background */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: "-15%",
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=1600&auto=format&fit=crop&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    y: bgY,
                    scale,
                }}
            />

            {/* Overlay — slightly warmer golden-brown tint at top */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to bottom, rgba(45,24,16,0.60) 0%, rgba(45,24,16,0.35) 50%, rgba(255,253,249,0.92) 100%)",
                }}
            />

            {/* Content */}
            <motion.div
                style={{
                    position: "relative",
                    zIndex: 2,
                    textAlign: "center",
                    padding: "0 1.5rem",
                    opacity,
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p
                        style={{
                            color: "#F0D060",
                            fontWeight: 700,
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            fontSize: "0.8rem",
                            marginBottom: "0.75rem",
                            textShadow: "0 1px 6px rgba(45,24,16,0.5)",
                        }}
                    >
                        Pastelería Artesanal ✦ Santiago
                    </p>
                    <h1
                        style={{
                            fontFamily: "var(--font-playfair), Georgia, serif",
                            fontWeight: 900,
                            fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                            color: "#FFFDF9",
                            lineHeight: 1.05,
                            marginBottom: "0.6rem",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Holy
                        <br />
                        Cocoa
                    </h1>
                    {/* Línea decorativa dorada */}
                    <div style={{
                        width: "64px",
                        height: "2px",
                        background: "linear-gradient(90deg, transparent, #F0D060, #D4AF37, transparent)",
                        margin: "0 auto 1.2rem",
                        borderRadius: "9999px",
                    }} />
                    <p
                        style={{
                            color: "rgba(255,253,249,0.85)",
                            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                            maxWidth: "430px",
                            margin: "0 auto 2rem",
                            lineHeight: 1.6,
                        }}
                    >
                        Cookies, brownies y café de especialidad hechos con amor y el mejor chocolate.
                    </p>
                    <motion.a
                        href="#menu"
                        whileHover={{
                            scale: 1.04,
                            boxShadow: "0 0 28px rgba(212,175,55,0.65)",
                        }}
                        whileTap={{ scale: 0.96 }}
                        style={{
                            display: "inline-block",
                            padding: "0.85rem 2.2rem",
                            background: "linear-gradient(135deg, #F0D060 0%, #D4AF37 55%, #A8861A 100%)",
                            color: "#2D1810",
                            borderRadius: "9999px",
                            fontWeight: 800,
                            fontSize: "0.95rem",
                            textDecoration: "none",
                            letterSpacing: "0.06em",
                            boxShadow: "0 4px 18px rgba(212,175,55,0.45)",
                        }}
                    >
                        Ver Menú ↓
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                    position: "absolute",
                    bottom: "1.5rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "rgba(240,208,96,0.75)",
                    zIndex: 2,
                }}
            >
                <ChevronDown size={24} />
            </motion.div>
        </div>
    );
}
