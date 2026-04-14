import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import MenuCard from "../components/MenuCard";
import CategoryTabs from "../components/CategoryTabs";

const ORDEN_CATEGORIAS = ["ENTRADA", "MENU", "ESPECIALES", "REFRESCO"];

const LABELS = {
  ENTRADA: "Entradas",
  MENU: "Segundos",
  ESPECIALES: "Especiales",
  REFRESCO: "Refrescos",
};

function MenuPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState("TODOS");
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetchMenu();
    fetchConfig();

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

  async function fetchConfig() {
    const { data } = await supabase
      .from("configuracion")
      .select("*")
      .eq("id", 1)
      .single();
    if (data) setConfig(data);
  }

  function handleWhatsApp() {
    if (!config) return;
    const texto = encodeURIComponent(config.mensaje);
    window.open(
      "https://wa.me/" + config.whatsapp + "?text=" + texto,
      "_blank",
    );
  }

  const itemsFiltrados =
    categoriaActiva === "TODOS"
      ? items
      : items.filter((item) => item.categoria === categoriaActiva);

  const disponibles = itemsFiltrados.filter((item) => item.disponible);

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {config ? config.nombre_restaurante : "Nuestro Menu"}
          </h1>
          <CategoryTabs
            activa={categoriaActiva}
            onChange={setCategoriaActiva}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800" />
          </div>
        ) : categoriaActiva === "TODOS" ? (
          <VistaGeneral items={items} config={config} />
        ) : disponibles.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-4xl mb-4">:)</p>
            <p>No hay platos disponibles en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {disponibles.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
      {config && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-20">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={handleWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white font-semibold py-3.5 rounded-2xl transition-all text-sm shadow-lg shadow-green-200"
            >
              Pedir por WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function VistaGeneral({ items, config }) {
  const disponibles = items.filter((i) => i.disponible);

  return (
    <div className="max-w-lg mx-auto">
      {config && config.precio_menu && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Precio del menu
          </p>
          <p className="text-4xl font-bold text-gray-800">
            S/ {Number(config.precio_menu).toFixed(2)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Incluye entrada, segundo y refresco
          </p>
        </div>
      )}

      {ORDEN_CATEGORIAS.map((cat) => {
        const platosCategoria = disponibles.filter((i) => i.categoria === cat);
        if (platosCategoria.length === 0) return null;

        return (
          <div key={cat} className="mb-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">
              {LABELS[cat]}
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {platosCategoria.map((item, index) => (
                <div
                  key={item.id}
                  className={
                    "flex justify-between items-center px-4 py-3 " +
                    (index < platosCategoria.length - 1
                      ? "border-b border-gray-50"
                      : "")
                  }
                >
                  <span className="text-gray-700 text-sm">{item.nombre}</span>
                  {item.categoria !== "MENU" &&
                    item.categoria !== "ENTRADA" && (
                      <span className="text-gray-500 text-sm font-medium ml-4 whitespace-nowrap">
                        S/ {Number(item.precio).toFixed(2)}
                      </span>
                    )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MenuPage;
