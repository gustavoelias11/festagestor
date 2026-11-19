import { Link, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Package } from "lucide-react";

export function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("@Festagestor:token");
    navigate("/");
  };

  return (
    <div className="w-64 border-r border-gray-200 bg-white h-screen flex flex-col shrink-0 sticky top-0 overflow-y-auto shadow-sm">
      <div className="p-6">
        <Link to="/dashboard" className="block">
          {/* Confirme se o nome da imagem está correto no seu projeto */}
          <img
            src="../../../public/festagestor-logo-transparent.png"
            alt="FestaGestor"
            className="h-14 w-full object-contain object-left"
          />
        </Link>
      </div>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            isActive
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "text-gray-500 hover:bg-gray-100 hover:text-foreground"
          }`
        }
      >
        <LayoutDashboard className="w-5 h-5" />
        Dashboard
      </NavLink>
      <NavLink
        to="/itens"
        className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
            isActive
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "text-gray-500 hover:bg-gray-100 hover:text-foreground"
          }`
        }
      >
        <Package className="w-5 h-5" />
        Itens
      </NavLink>

      <div className="p-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-lg border border-gray-100">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs uppercase shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-foreground">
              Administrador
            </p>
            <p className="text-xs text-gray-500 truncate">admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-danger transition-colors shrink-0"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
