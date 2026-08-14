// src/App.tsx

import { Routes, Route } from "react-router";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardPage from "./pages/DashboardPage";
import BooksPage from "./pages/BooksPage";
import BookDetailPage from "./pages/BookDetailPage";
import BorrowedBooksPage from "./pages/BorrowedBooksPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>

      {/* ===== MAIN LAYOUT ===== */}

      <Route path="/" element={<Layout />}>

        {/* ===== DASHBOARD ===== */}

        <Route
          index
          element={<DashboardPage />}
        />

        {/* ===== BOOKS ===== */}

        <Route
          path="books"
          element={<BooksPage />}
        />

        {/* ===== BOOK DETAILS ===== */}

        <Route
          path="books/:id"
          element={<BookDetailPage />}
        />

        {/* ===== LOGIN ===== */}

        <Route
          path="login"
          element={<LoginPage />}
        />

        {/* ===== PROTECTED ROUTES ===== */}

        <Route element={<ProtectedRoute />}>

          {/* Only logged-in users can access borrowed books */}
          <Route
            path="books/borrowed"
            element={<BorrowedBooksPage />}
          />

        </Route>

        {/* ===== 404 ===== */}

        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Route>

    </Routes>
  );
}

export default App;