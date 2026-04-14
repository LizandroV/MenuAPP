const CATEGORIAS = ["TODOS", "ENTRADA", "MENU", "ESPECIALES", "REFRESCO"];

const LABELS = {
  TODOS: "Menú del dia",
  ENTRADA: "Entradas",
  MENU: "Segundos",
  ESPECIALES: "Especiales",
  REFRESCO: "Refrescos",
};

function CategoryTabs({ activa, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {CATEGORIAS.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
            ${
              activa === cat
                ? "bg-gray-800 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-400"
            }`}
        >
          {LABELS[cat]}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
