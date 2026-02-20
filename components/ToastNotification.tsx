"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

export interface ToastData {
    id: number;
    name: string;
    image: string;
}

interface ToastProps {
    toasts: ToastData[];
    onRemove: (id: number) => void;
}

export default function ToastNotification({ toasts, onRemove }: ToastProps) {
    return (
        <div
            style={{
                position: "fixed",
                top: "5rem",
                right: "1.25rem",
                zIndex: 60,
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
                pointerEvents: "none",
            }}
        >
            <AnimatePresence>
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
                ))}
            </AnimatePresence>
        </div>
    );
}

function ToastItem({ toast, onRemove }: { toast: ToastData; onRemove: (id: number) => void }) {
    useEffect(() => {
        const timer = setTimeout(() => onRemove(toast.id), 2600);
        return () => clearTimeout(timer);
    }, [toast.id, onRemove]);

    return (
        <motion.div
            layout
            initial={{ x: 80, opacity: 0, scale: 0.85 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 80, opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                backgroundColor: "#fff",
                padding: "0.6rem 0.9rem 0.6rem 0.6rem",
                borderRadius: "14px",
                boxShadow: "0 8px 28px rgba(45,24,16,0.15)",
                border: "1px solid rgba(244,143,177,0.3)",
                minWidth: "220px",
                maxWidth: "280px",
                pointerEvents: "auto",
            }}
        >
            {/* Miniatura */}
            <div style={{ width: 40, height: 40, borderRadius: "8px", overflow: "hidden", flexShrink: 0 }}>
                <img src={toast.image} alt={toast.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            {/* Texto */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.72rem", color: "#8B5E3C", margin: 0 }}>Agregado al carrito</p>
                <p style={{
                    fontSize: "0.82rem", fontWeight: 700, color: "#2D1810",
                    margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                    {toast.name}
                </p>
            </div>

            {/* Check icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 600 }}
            >
                <CheckCircle size={20} color="#F48FB1" fill="rgba(244,143,177,0.12)" />
            </motion.div>
        </motion.div>
    );
}
