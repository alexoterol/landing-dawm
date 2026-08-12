import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories, menuItems } from "../data/menu.js";
import FoodCard from "./FoodCard.jsx";

export default function MenuSection() {
  const [active, setActive] = useState(categories[0]);
  const items = menuItems.filter((item) => item.category === active);

  return (
    <section id="menu" className="mx-auto max-w-6xl px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-serif text-4xl font-extrabold md:text-5xl"
      >
        Nuestro <span className="text-brand">Menú</span>
      </motion.h2>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`relative rounded-full px-5 py-2 text-sm font-bold transition ${
              active === cat ? "text-white" : "text-white/60 hover:text-white"
            }`}
          >
            {active === cat && (
              <motion.span
                layoutId="menu-tab-bg"
                className="absolute inset-0 rounded-full bg-brand"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
