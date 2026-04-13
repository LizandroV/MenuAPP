import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

function ConfigModal({ onClose }) {
  const [form, setForm] = useState({
    whatsapp: "",
    mensaje: "",
    nombre_restaurante: "",
    precio_menu: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase
      .from("configuracion")
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) setForm(data);
        setLoading(false);
      });
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    await supabase
      .from("configuracion")
      .update({ ...form, precio_menu: parseFloat(form.precio_menu) })
      .eq("id", 1);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">Configuracion</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            x
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800" />
          </div>
        ) : (
          <form onSubmit={handleSave} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del restaurante
              </label>
              <input
                type="text"
                required
                value={form.nombre_restaurante}
                onChange={(e) =>
                  setForm({ ...form, nombre_restaurante: e.target.value })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Precio del menu (S/)
              </label>
              <input
                type="number"
                required
                min="0"
                step="0.50"
                value={form.precio_menu}
                onChange={(e) =>
                  setForm({ ...form, precio_menu: e.target.value })
                }
                placeholder="15.00"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-gray-400"
              />
              <p className="text-xs text-gray-400 mt-1">
                Se muestra en la parte superior de la vista general
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numero de WhatsApp
              </label>
              <input
                type="text"
                required
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                placeholder="51999999999"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-gray-400"
              />
              <p className="text-xs text-gray-400 mt-1">
                Codigo de pais + numero sin espacios. Ej: 51987654321
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje predeterminado
              </label>
              <textarea
                required
                rows={3}
                value={form.mensaje}
                onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-gray-400 resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2.5 rounded-xl bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 disabled:opacity-50"
              >
                {saved ? "Guardado!" : saving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ConfigModal;
