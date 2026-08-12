import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#menu", label: "Menú" },
  { href: "#ubicaciones", label: "Ubicaciones" },
  { href: "#reseñas", label: "Reseñas" },
  { href: "#nosotros", label: "Sobre Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand/40 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="flex items-center gap-3">
          <img src="/img/rukito-logo.jpeg" alt="Rukito Logo" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-serif text-xl font-black tracking-tight">RUKITO</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="font-medium text-white/90 transition hover:text-brand">
              {link.label}
            </a>
          ))}
          <motion.a
            href="https://wa.me/593991234567"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-brand px-4 py-2 text-sm font-bold text-white shadow-lg shadow-brand/30 transition hover:bg-white hover:text-ink"
          >
            Ordenar
          </motion.a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-white md:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-brand/20 md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-medium text-white/90 hover:text-brand"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/593991234567"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-brand px-4 py-2 text-center text-sm font-bold text-white"
              >
                Ordenar
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
