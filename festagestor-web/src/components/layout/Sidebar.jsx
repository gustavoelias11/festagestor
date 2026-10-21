import { Link, NavLink, useNavigate } from "react-router-dom";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect width="7" height="9" x="3" y="3" rx="1"></rect>
          <rect width="7" height="5" x="14" y="3" rx="1"></rect>
          <rect width="7" height="9" x="14" y="12" rx="1"></rect>
          <rect width="7" height="5" x="3" y="16" rx="1"></rect>
        </svg>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
          <path d="M12 22V12"></path>
          <polyline points="3.29 7 12 12 20.71 7"></polyline>
          <path d="m7.5 4.27 9 5.15"></path>
        </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="m16 17 5-5-5-5"></path>
              <path d="M21 12H9"></path>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
