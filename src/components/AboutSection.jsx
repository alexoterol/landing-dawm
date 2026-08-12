import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="nosotros" className="mx-auto max-w-4xl px-6 py-20 text-center">
      <motion.img
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        src="/img/rukito-logo.jpeg"
        alt="Rukito"
        className="mx-auto mb-6 h-24 w-24 rounded-full object-cover shadow-lg shadow-brand/30"
      />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-serif text-4xl font-extrabold md:text-5xl"
      >
        Sobre <span className="text-brand">Nosotros</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
      >
        En Rukito, fusionamos el estilo urbano con una experiencia culinaria moderna. Nos apasiona ofrecer platos
        irresistibles preparados con ingredientes frescos, ideales para quienes buscan una experiencia rápida pero
        con personalidad. Nos destacamos por nuestra presencia en redes sociales, promociones creativas y un
        ambiente relajado que refleja el ritmo de la ciudad.
      </motion.p>
    </section>
  );
}
