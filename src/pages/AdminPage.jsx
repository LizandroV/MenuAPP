import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import AdminCard from "../components/AdminCard";
import DishModal from "../components/DishModal";

const CATS = ["TODOS", "ENTRADA", "MENU", "ESPECIALES", "REFRESCO"];

function AdminPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState("TODOS");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const { data } = await supabase
      .from("menu_items")
      .select("*")
      .order("orden", { ascending: true });
    setItems(data || []);
    setLoading(false);
  }

  async function handleToggle(item) {
    await supabase
      .from("menu_items")
      .update({ disponible: !item.disponible })
      .eq("id", item.id);
    fetchItems();
  }

  async function handleDelete(item) {
    if (!window.confirm("Eliminar " + item.nombre + "?")) return;
    if (item.foto_url) {
      const fileName = item.foto_url.split("/").pop();
      await supabase.storage.from("menu-fotos").remove([fileName]);
    }
    await supabase.from("menu_items").delete().eq("id", item.id);
    fetchItems();
  }

  function handleEdit(item) {
    setSelected(item);
    setModalOpen(true);
  }

  function handleNuevo() {
    setSelected(null);
    setModalOpen(true);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  const filtered =
    cat === "TODOS" ? items : items.filter((i) => i.categoria === cat);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Panel Admin</h1>
              <p className="text-xs text-gray-400">{items.length} platos</p>
            </div>
            <div className="flex gap-2">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 text-xs rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                Ver menu
              </a>

              <button
                onClick={handleLogout}
                className="px-3 py-2 text-xs rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200"
              >
                Salir
              </button>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={
                  "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap " +
                  (c === cat
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-500 border border-gray-200")
                }
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <button
              onClick={handleNuevo}
              className="min-h-[200px] rounded-2xl border-2 border-dashed border-gray-200 hover:border-gray-400 text-gray-400 hover:text-gray-600 flex flex-col items-center justify-center gap-2"
            >
              <span className="text-3xl">+</span>
              <span className="text-xs font-medium">Agregar plato</span>
            </button>

            {filtered.map((item) => (
              <AdminCard
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <DishModal
          item={selected}
          onClose={() => setModalOpen(false)}
          onSaved={fetchItems}
        />
      )}
    </div>
  );
}

export default AdminPage;
