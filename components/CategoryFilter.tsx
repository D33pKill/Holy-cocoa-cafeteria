"use client";

import { motion } from "framer-motion";
import { Category, CATEGORIES } from "@/lib/products";

interface CategoryFilterProps {
    active: Category;
    onChange: (cat: Category) => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
    return (
        <div
            style={{
                display: "flex",
                gap: "0.6rem",
                overflowX: "auto",
                paddingBottom: "0.25rem",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
            }}
        >
            {CATEGORIES.map((cat) => {
                const isActive = cat === active;
                return (
                    <motion.button
                        key={cat}
                        whileTap={{ scale: 0.93 }}
                        onClick={() => onChange(cat)}
                        style={{
                            flexShrink: 0,
                            padding: "0.45rem 1.1rem",
                            borderRadius: "9999px",
                            fontSize: "0.85rem",
                            fontWeight: isActive ? 700 : 500,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            background: isActive
                                ? "linear-gradient(135deg, #F0D060 0%, #D4AF37 60%, #A8861A 100%)"
                                : "#FCE7E9",
                            color: isActive ? "#2D1810" : "#5C3A2A",
                            border: isActive
                                ? "1.5px solid #D4AF37"
                                : "1.5px solid rgba(212,175,55,0.2)",
                            boxShadow: isActive
                                ? "0 4px 14px rgba(212,175,55,0.38)"
                                : "none",
                        }}
                    >
                        {cat}
                    </motion.button>
                );
            })}
        </div>
    );
}
