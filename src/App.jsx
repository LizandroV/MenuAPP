import { BrowserRouter, Routes, Route } from "react-router-dom";
import MenuPage from "./pages/MenuPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route
          path="/login"
          element={<div className="p-8 text-xl">🔐 Login — próximamente</div>}
        />
        <Route
          path="/admin"
          element={<div className="p-8 text-xl">⚙️ Admin — próximamente</div>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
