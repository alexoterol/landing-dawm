import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Phone } from "lucide-react";
import { locations } from "../data/locations.js";

function LocationCard({ location }) {
  const [showCrowd, setShowCrowd] = useState(false);

  return (
    <div className="relative mx-auto flex min-w-full max-w-5xl snap-center flex-col gap-6 rounded-3xl bg-ink-light p-4 shadow-lg shadow-black/30 md:min-w-[90%] md:flex-row">
      <div className="relative w-full md:w-1/2">
        {showCrowd ? (
          <img
            src={location.imagenCrowd}
            alt={`Afluencia en ${location.nombre}`}
            className="h-64 w-full rounded-2xl object-cover md:h-full"
          />
        ) : (
          <iframe
            title={location.nombre}
            className="h-64 w-full rounded-2xl md:h-full"
            src={location.mapaSrc}
            style={{ border: 0 }}
            loading="lazy"
          />
        )}
        <button
          onClick={() => setShowCrowd((v) => !v)}
          className="absolute right-3 top-1/2 z-20 h-5 w-5 -translate-y-1/2 rounded-full bg-white shadow-lg shadow-black/70 transition hover:scale-110"
          style={{ opacity: showCrowd ? 1 : 0.6 }}
          aria-label="Alternar vista de afluencia"
        />
      </div>

      <div className="flex flex-col justify-center gap-3 md:w-1/2">
        <p className="text-lg font-bold">{location.nombre}</p>
        <p className="text-sm text-white/60">{location.direccion}</p>
        <p className="text-xs italic text-white/40">{location.referencia}</p>
        <div className="flex items-center gap-2 pt-2">
          <a
            href={`tel:${location.telefono}`}
            className="flex items-center gap-1 rounded border border-white px-3 py-1 font-bold transition hover:bg-white hover:text-ink"
          >
            <Phone size={16} />
            Contacto
          </a>
          <span className="text-sm text-white/60">{location.telefono}</span>
        </div>
      </div>
    </div>
  );
}

export default function LocationsSection() {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  const go = (dir) => {
    const next = Math.min(Math.max(index + dir, 0), locations.length - 1);
    setIndex(next);
    trackRef.current?.scrollTo({ left: trackRef.current.offsetWidth * next, behavior: "smooth" });
  };

  return (
    <section id="ubicaciones" className="mx-auto max-w-6xl overflow-hidden px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 text-center font-serif text-4xl font-extrabold md:text-5xl"
      >
        Nuestras <span className="text-brand">Ubicaciones</span>
      </motion.h2>

      <div className="relative flex items-center">
        <button
          onClick={() => go(-1)}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-brand"
          aria-label="Anterior"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-brand"
          aria-label="Siguiente"
        >
          <ChevronRight />
        </button>

        <div ref={trackRef} className="scrollbar-hide flex w-full snap-x scroll-smooth gap-6 overflow-x-auto">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      </div>
    </section>
  );
}
