import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="text-2xl p-8">
              🍽️ Menú del Restaurante — Sprint 1 OK
            </div>
          }
        />
        <Route
          path="/login"
          element={<div className="text-2xl p-8">🔐 Login — próximamente</div>}
        />
        <Route
          path="/admin"
          element={<div className="text-2xl p-8">⚙️ Admin — próximamente</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
