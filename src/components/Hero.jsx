import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Star, Rocket } from "lucide-react";

export default function Hero() {
  const glowX = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const glowY = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pt-8"
    >
      <motion.div
        className="pointer-events-none absolute -z-10 h-[32rem] w-[32rem] rounded-full bg-brand/25 blur-[120px]"
        style={{ left: glowX, top: glowY, translateX: "-50%", translateY: "-50%" }}
      />
      <div className="pointer-events-none absolute -z-10 top-1/3 right-0 h-96 w-96 rounded-full bg-leaf/10 blur-[100px]" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6 text-center md:text-left"
        >
          <span className="inline-block rounded-full border border-brand/50 px-4 py-1 text-xs font-bold tracking-widest text-brand uppercase">
            Grill & Drinks · Guayaquil
          </span>
          <h1 className="text-balance font-serif text-5xl font-extrabold leading-tight md:text-7xl">
            El sabor que se <span className="text-brand">enciende</span> en cada bocado
          </h1>
          <p className="mx-auto max-w-md text-lg text-white/70 md:mx-0">
            Parrilla al carbón, cócteles de autor y el ritmo de la ciudad en un mismo lugar. Ordena ya o mira nuestro TikTok.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2 md:justify-start">
            <motion.a
              href="https://wa.me/593991234567"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden rounded-full bg-brand px-8 py-3 text-lg font-bold text-white shadow-lg shadow-brand/30"
            >
              <span className="relative z-10">Ordenar en WhatsApp</span>
              <motion.span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ x: "-120%" }}
                animate={{ x: "120%" }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", repeatDelay: 1 }}
              />
            </motion.a>
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border-2 border-white/80 px-8 py-3 text-lg font-bold text-white transition hover:bg-white hover:text-ink"
            >
              Reservar Mesa
            </motion.a>
          </div>
        </motion.div>

        <div className="relative mx-auto flex h-[26rem] w-[26rem] max-w-full items-center justify-center">
          <motion.img
            src="/img/promo3.png"
            alt="Plato estrella de Rukito"
            className="h-72 w-72 rounded-3xl object-cover shadow-2xl shadow-black/60 md:h-80 md:w-80"
            animate={{ y: [0, -14, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute left-0 top-6 rounded-2xl bg-ink-light/90 px-4 py-2 shadow-xl backdrop-blur"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-1.5 text-sm font-bold">
              <Star size={16} className="fill-ember text-ember" />
              4.9 (2k+ Reseñas)
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-4 right-0 rounded-2xl bg-ink-light/90 px-4 py-2 shadow-xl backdrop-blur"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.4 }}
          >
            <div className="flex items-center gap-1.5 text-sm font-bold">
              <Rocket size={16} className="text-brand" />
              Envío en &lt;30 min
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
