import { motion } from "framer-motion";
import { Beef, Flame, ChefHat, UtensilsCrossed } from "lucide-react";

const STEPS = [
  {
    icon: Beef,
    title: "Selección del Corte",
    text: "Elegimos a diario los mejores cortes y costillas, frescos y de proveedores locales de confianza.",
  },
  {
    icon: ChefHat,
    title: "Marinado de la Casa",
    text: "24 horas de marinado con nuestra receta secreta para que cada bocado tenga carácter.",
  },
  {
    icon: Flame,
    title: "A la Brasa",
    text: "Cocción lenta al carbón, el punto exacto que le da el sabor ahumado que nos distingue.",
  },
  {
    icon: UtensilsCrossed,
    title: "A tu Mesa",
    text: "Servido caliente, recién salido de la parrilla, con el ritmo y la energía de Rukito.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ProcessSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-serif text-4xl font-extrabold md:text-5xl"
      >
        De la Brasa a <span className="text-brand">tu Mesa</span>
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mt-14 grid gap-6 md:grid-cols-4"
      >
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            variants={item}
            className="relative rounded-3xl bg-ink-light p-6 text-center shadow-lg shadow-black/30"
          >
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
              {i + 1}
            </span>
            <step.icon className="mx-auto mt-3 mb-4 text-brand" size={36} />
            <h3 className="font-serif text-lg font-bold">{step.title}</h3>
            <p className="mt-2 text-sm text-white/60">{step.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
