"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

// ── Ghost Click Button ────────────────────────────────────────────────────────
function MenuButton() {
    const [rippleKey, setRippleKey] = useState(0);
    const [ghostActive, setGhostActive] = useState(false);

    // Scroll suave con duración y easing custom
    const scrollToMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        const target = document.getElementById("menu");
        if (!target) return;
        const start = window.scrollY;
        const end = target.getBoundingClientRect().top + start;
        const duration = 700;
        const startTime = performance.now();
        const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic: arranca rápido, frena suave
        const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, start + (end - start) * ease(progress));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    // Dispara el ghost click cada 3 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setGhostActive(true);
            setRippleKey((k) => k + 1);
            setTimeout(() => setGhostActive(false), 400);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        // Glow exterior que pulsa en sincronía con el ghost click
        <motion.div
            animate={ghostActive
                ? { boxShadow: "0 0 48px 16px rgba(212,175,55,0.55)" }
                : { boxShadow: "0 0 22px 4px rgba(212,175,55,0.28)" }
            }
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ display: "inline-block", borderRadius: "9999px" }}
        >
            <motion.a
                href="#menu"
                onClick={scrollToMenu}
                // Ghost Click: shrink 1.0 → 0.95 → 1.0
                animate={ghostActive
                    ? { scale: [1, 0.95, 1] }
                    : { scale: 1 }
                }
                transition={ghostActive
                    ? { duration: 0.38, ease: "easeInOut" }
                    : { duration: 0.2 }
                }
                // Interacción real del usuario
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.90, transition: { duration: 0.08 } }}
                style={{
                    position: "relative",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1rem 2.8rem",
                    background: "linear-gradient(135deg, #FDE68A 0%, #D4AF37 50%, #B8860B 100%)",
                    color: "#2D1810",
                    borderRadius: "9999px",
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(212,175,55,0.5)",
                    boxShadow: "0 6px 20px rgba(212,175,55,0.4)",
                    overflow: "hidden",
                    cursor: "pointer",
                }}
            >
                {/* Shimmer sweep pasivo */}
                <motion.span
                    animate={{ x: ["-130%", "230%"] }}
                    transition={{ duration: 1.0, repeat: Infinity, repeatDelay: 2.6, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "40%",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.38), transparent)",
                        transform: "skewX(-12deg)",
                        pointerEvents: "none",
                    }}
                />

                {/* Ripple — onda de choque desde el centro */}
                <AnimatePresence>
                    <motion.span
                        key={rippleKey}
                        initial={{ scale: 0, opacity: 0.55 }}
                        animate={{ scale: 3.5, opacity: 0 }}
                        transition={{ duration: 0.65, ease: "easeOut" }}
                        style={{
                            position: "absolute",
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            backgroundColor: "rgba(255,255,255,0.35)",
                            pointerEvents: "none",
                            top: "50%",
                            left: "50%",
                            marginTop: "-40px",
                            marginLeft: "-40px",
                        }}
                    />
                </AnimatePresence>

                VER EL MENÚ
            </motion.a>
        </motion.div>
    );
}

export default function HeroSection() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
        layoutEffect: false,
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
                    <MenuButton />
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
