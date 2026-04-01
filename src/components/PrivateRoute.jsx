import { Navigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

function PrivateRoute({ children }) {
  const { session } = useAuth();

  // Mientras verifica la sesión, no muestra nada
  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-800" />
      </div>
    );
  }

  // Si no hay sesión, redirige al login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
