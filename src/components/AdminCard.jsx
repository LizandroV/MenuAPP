function AdminCard({ item, onEdit, onToggle, onDelete }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-opacity duration-300 ${!item.disponible ? "opacity-60" : ""}`}
    >
      {/* Foto */}
      <div className="relative h-36 bg-gray-100">
        {item.foto_url ? (
          <img
            src={item.foto_url}
            alt={item.nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">
            🍽️
          </div>
        )}
        {!item.disponible && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex justify-between items-start gap-1 mb-1">
          <h3 className="font-semibold text-gray-800 text-sm leading-tight">
            {item.nombre}
          </h3>
          <span className="text-green-600 font-bold text-sm whitespace-nowrap">
            S/ {Number(item.precio).toFixed(2)}
          </span>
        </div>
        <span className="inline-block text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full mb-3">
          {item.categoria}
        </span>

        {/* Acciones */}
        <div className="flex gap-2">
          <button
            onClick={() => onToggle(item)}
            className={`flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors ${
              item.disponible
                ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                : "bg-green-50 text-green-700 hover:bg-green-100"
            }`}
          >
            {item.disponible ? "Agotar" : "Disponible"}
          </button>
          <button
            onClick={() => onEdit(item)}
            className="flex-1 text-xs py-1.5 rounded-lg font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(item)}
            className="flex-1 text-xs py-1.5 rounded-lg font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminCard;
