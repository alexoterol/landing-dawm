import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { guardarComentario } from "../lib/firebase.js";

const initialForm = { nombre: "", tipo: "", mensaje: "" };

export default function ContactSection() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(null);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.tipo || !form.mensaje) return;

    const result = await guardarComentario(form);
    if (result.ok) {
      setSent(form);
      setForm(initialForm);
      setTimeout(() => setSent(null), 5000);
    } else {
      setError(true);
    }
  };

  return (
    <section id="contacto" className="px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 text-center font-serif text-4xl font-extrabold md:text-5xl"
      >
        Contáct<span className="text-brand">anos</span>
      </motion.h2>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl space-y-6 rounded-3xl bg-ink-light p-6 shadow-lg shadow-black/30"
      >
        {error && <p className="text-sm font-medium text-red-400">Hubo un error al enviar tu mensaje.</p>}

        <div>
          <label htmlFor="nombre" className="mb-2 block text-sm font-bold">
            Tu Nombre
          </label>
          <input
            id="nombre"
            type="text"
            required
            placeholder="Ingresa tu nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="w-full rounded border border-brand bg-ink px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <div>
          <label htmlFor="tipo" className="mb-2 block text-sm font-bold">
            Tipo de Consulta
          </label>
          <select
            id="tipo"
            required
            value={form.tipo}
            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
            className="w-full rounded border border-brand bg-ink px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="">Selecciona una opción</option>
            <option value="pedido">Pedido</option>
            <option value="reclamo">Reclamo</option>
            <option value="sugerencia">Sugerencia</option>
          </select>
        </div>

        <div>
          <label htmlFor="mensaje" className="mb-2 block text-sm font-bold">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            rows={4}
            required
            placeholder="Escribe tu mensaje aquí..."
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
            className="w-full rounded border border-brand bg-ink px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full bg-brand px-6 py-2 font-bold text-white transition hover:bg-white hover:text-ink"
        >
          Enviar
        </motion.button>
      </motion.form>

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-[90%] max-w-md rounded-3xl border border-brand bg-ink p-6 shadow-2xl"
            >
              <button
                onClick={() => setSent(null)}
                className="absolute right-3 top-2 text-2xl font-bold text-brand hover:text-white"
                aria-label="Cerrar"
              >
                <X />
              </button>
              <h3 className="mb-4 text-center text-xl font-bold text-brand">Tu mensaje ha sido enviado</h3>
              <div className="space-y-2">
                <p>
                  <strong>Nombre:</strong> {sent.nombre}
                </p>
                <p>
                  <strong>Tipo:</strong> {sent.tipo}
                </p>
                <p>
                  <strong>Mensaje:</strong> {sent.mensaje}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
