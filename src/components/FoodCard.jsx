import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Plus, Flame, Leaf } from "lucide-react";

const TAG_ICON = {
  Picante: Flame,
  Orgánico: Leaf,
};

export default function FoodCard({ item }) {
  const ref = useRef(null);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [added, setAdded] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const size = item.sizes[sizeIndex];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.35 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="group relative overflow-hidden rounded-3xl bg-ink-light shadow-lg shadow-black/40"
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.12 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => {
            const Icon = TAG_ICON[tag];
            return (
              <span
                key={tag}
                className="flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold text-white backdrop-blur"
              >
                {Icon && <Icon size={12} className="text-brand" />}
                {tag}
              </span>
            );
          })}
        </div>

        <motion.button
          initial={{ opacity: 0, scale: 0.7 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          animate={added ? { scale: [1, 1.2, 1] } : {}}
          className="absolute bottom-3 right-3 rounded-full bg-brand p-2.5 text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
          onClick={() => setAdded(true)}
          aria-label="Añadir rápido"
        >
          <Plus size={18} />
        </motion.button>
      </div>

      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-bold">{item.name}</h3>
          <span className="whitespace-nowrap font-serif text-lg font-bold text-brand">${size.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-white/60">{item.description}</p>

        {item.sizes.length > 1 && (
          <div className="flex gap-2 pt-1">
            {item.sizes.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setSizeIndex(i)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  i === sizeIndex ? "bg-brand text-white" : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
