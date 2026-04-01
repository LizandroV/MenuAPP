import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import MenuCard from "../components/MenuCard";
import CategoryTabs from "../components/CategoryTabs";

function MenuPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState("TODOS");

  useEffect(() => {
    fetchMenu();

    // Escuchar cambios en tiempo real
    const channel = supabase
      .channel("menu-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "menu_items" },
        () => {
          fetchMenu();
        },
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  async function fetchMenu() {
    const { data } = await supabase
      .from("menu_items")
      .select("*")
      .order("orden", { ascending: true });

    setItems(data || []);
    setLoading(false);
  }

  const itemsFiltrados =
    categoriaActiva === "TODOS"
      ? items
      : items.filter((item) => item.categoria === categoriaActiva);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            🍽️ Nuestro Menú
          </h1>
          <CategoryTabs
            activa={categoriaActiva}
            onChange={setCategoriaActiva}
          />
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800" />
          </div>
        ) : itemsFiltrados.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-4xl mb-4">🍴</p>
            <p>No hay platos en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {itemsFiltrados.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center text-gray-400 text-xs py-8">
        Los precios incluyen impuestos
      </div>
    </div>
  );
}

export default MenuPage;
