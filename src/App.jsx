import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase
      .from("menu_items")
      .select("*")
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setItems(data);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="p-8">
              <h1 className="text-2xl font-bold mb-4">Test Supabase</h1>
              {error && <p className="text-red-500">Error: {error}</p>}
              {items.map((item) => (
                <div key={item.id} className="mb-2 p-2 border rounded">
                  <span className="font-semibold">{item.nombre}</span>
                  <span className="ml-4 text-gray-500">{item.categoria}</span>
                  <span className="ml-4 text-green-600">S/ {item.precio}</span>
                </div>
              ))}
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
