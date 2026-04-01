function MenuCard({ item }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-opacity duration-300 ${!item.disponible ? "opacity-50" : ""}`}
    >
      <div className="relative h-48 bg-gray-100">
        {item.foto_url ? (
          <img
            src={item.foto_url}
            alt={item.nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🍽️
          </div>
        )}
        {!item.disponible && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
              Agotado
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start gap-2">
          <h3
            className={`font-semibold text-gray-800 text-base leading-tight ${!item.disponible ? "line-through text-gray-400" : ""}`}
          >
            {item.nombre}
          </h3>
          <span className="text-green-600 font-bold text-base whitespace-nowrap">
            S/ {Number(item.precio).toFixed(2)}
          </span>
        </div>
        {item.descripcion && (
          <p className="text-gray-500 text-sm mt-1 leading-snug">
            {item.descripcion}
          </p>
        )}
      </div>
    </div>
  );
}

export default MenuCard;
