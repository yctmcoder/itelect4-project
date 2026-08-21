import { NavLink, Outlet } from "react-router";
import useAuthStore from "../store/authStore";
import useUiStore from "../store/uiStore"; // <-- NEW
// The useToggle import is GONE -- Layout does not own dark mode now
function Layout() {
 // WAS: const [isDarkMode, toggleDarkMode] = useToggle(false);
 const isDarkMode = useUiStore((state) => state.isDarkMode);
 const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);


  // ===== AUTH STORE =====
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  // ===== NAVIGATION STYLES =====

  const base =
    "rounded px-3 py-1.5 text-sm transition";

  const activeLink =
    `${base} bg-blue-600 font-semibold text-white`;

  const idleLink =
    `${base} text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700`;

  // NavLink provides the isActive value
  const linkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }): string =>
    isActive ? activeLink : idleLink;

  return (
    <div className={isDarkMode ? "dark" : ""}>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

        {/* ===== NAVIGATION BAR ===== */}

        <nav
          className="
            flex flex-wrap items-center gap-2
            border-b border-gray-200
            bg-white p-4
            dark:border-gray-700
            dark:bg-gray-800
          "
        >

          {/* ===== APP NAME ===== */}

          <span
            className="
              mr-4
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            📚 Library App
          </span>

          {/* ===== DASHBOARD ===== */}

          <NavLink
            to="/"
            end
            className={linkClass}
          >
            Dashboard
          </NavLink>

          {/* ===== BOOKS ===== */}

          <NavLink
            to="/books"
            className={linkClass}
          >
            Books
          </NavLink>

          {/* ===== MEMBERS ===== */}

          <NavLink
            to="/members"
            className={linkClass}
          >
            Members
          </NavLink>

          {/* ===== BORROW RECORDS ===== */}

          <NavLink
            to="/borrow-records"
            className={linkClass}
          >
            Borrow Records
          </NavLink>

          {/* ===== LOGIN / LOGOUT ===== */}

          {userName === null ? (
            <NavLink
              to="/login"
              className={linkClass}
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={logout}
              className="
                rounded
                px-3 py-1.5
                text-sm
                text-gray-700
                hover:bg-gray-200
                dark:text-gray-300
                dark:hover:bg-gray-700
              "
            >
              Logout ({userName})
            </button>
          )}

          {/* ===== DARK MODE ===== */}

          <button
            onClick={toggleDarkMode}
            className="
              ml-auto
              rounded
              bg-gray-800
              px-3 py-1.5
              text-sm
              text-white
              transition
              hover:bg-gray-700
              dark:bg-gray-200
              dark:text-gray-900
              dark:hover:bg-white
            "
          >
            {isDarkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"}
          </button>

        </nav>

        {/* ===== PAGE CONTENT ===== */}

        <main className="p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default Layout;