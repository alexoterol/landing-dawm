import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, X } from "lucide-react";

const WHATSAPP_NUMBER = "593991234567";
const initialForm = { nombre: "", personas: 2, fecha: "", hora: "" };

export default function ReservationWidget() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hola Rukito! Quiero reservar mesa para ${form.personas} personas a nombre de ${form.nombre}, el ${form.fecha} a las ${form.hora}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    setOpen(false);
    setForm(initialForm);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-bold text-white shadow-xl shadow-brand/40"
      >
        <CalendarCheck size={20} />
        Reservar Mesa
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          >
            <motion.form
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onSubmit={handleSubmit}
              className="relative w-full max-w-sm space-y-4 rounded-3xl border border-brand bg-ink-light p-6 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 text-brand hover:text-white"
                aria-label="Cerrar"
              >
                <X />
              </button>
              <h3 className="font-serif text-xl font-bold">Reserva tu Mesa</h3>

              <input
                required
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="w-full rounded border border-white/20 bg-ink px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />
              <div className="flex gap-3">
                <input
                  required
                  type="date"
                  value={form.fecha}
                  onChange={(e) => setForm({ ...form, fecha: e.target.value })}
                  className="w-1/2 rounded border border-white/20 bg-ink px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
                <input
                  required
                  type="time"
                  value={form.hora}
                  onChange={(e) => setForm({ ...form, hora: e.target.value })}
                  className="w-1/2 rounded border border-white/20 bg-ink px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
                />
              </div>
              <input
                required
                type="number"
                min={1}
                max={20}
                value={form.personas}
                onChange={(e) => setForm({ ...form, personas: e.target.value })}
                className="w-full rounded border border-white/20 bg-ink px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
              />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-full bg-brand py-2 font-bold text-white"
              >
                Confirmar por WhatsApp
              </motion.button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
