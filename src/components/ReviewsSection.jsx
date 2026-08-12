import { motion } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import { reviews } from "../data/reviews.js";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ReviewsSection() {
  return (
    <section id="reseñas" className="mx-auto max-w-6xl px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-serif text-4xl font-extrabold md:text-5xl"
      >
        Lo que dicen de <span className="text-brand">nosotros</span>
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-12 grid gap-6 md:grid-cols-3"
      >
        {reviews.map((review) => (
          <motion.div key={review.nombre} variants={item} className="flex flex-col gap-3 rounded-3xl bg-ink-light p-5 shadow-lg shadow-black/30">
            <div className="flex items-center gap-3">
              <img src={review.avatar} alt={review.nombre} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="text-base font-medium">{review.nombre}</p>
                <p className="text-sm text-white/50">{review.fecha}</p>
              </div>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={18} className={i < review.rating ? "fill-ember text-ember" : "text-white/20"} />
              ))}
            </div>
            <p className="text-base text-white/80">{review.mensaje}</p>
            <div className="flex gap-6 text-white/50">
              <span className="flex items-center gap-2">
                <ThumbsUp size={16} /> {review.likes}
              </span>
              <span className="flex items-center gap-2">
                <ThumbsDown size={16} /> {review.dislikes}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
