// src/pages/BookDetailPage.tsx

import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";

import BookCard from "../components/BookCard";

import type { Book } from "../types/index";

import { fetchBookById } from "../api/client";

function BookDetailPage() {
  // ===== GET BOOK ID FROM URL =====

  const { id } = useParams<{ id: string }>();

  // ===== NAVIGATION =====

  const navigate = useNavigate();

  // ===== FETCH BOOK =====

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery<Book>({
    queryKey: ["books", id],
    queryFn: () => fetchBookById(id!),
    enabled: Boolean(id),
  });

  // ===== LOADING STATE =====

  if (isPending) {
    return (
      <div className="animate-pulse p-6 text-gray-500 dark:text-gray-400">
        Loading book...
      </div>
    );
  }

  // ===== ERROR STATE =====

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
        <h2 className="font-semibold">
          Book Not Found
        </h2>

        <p className="mt-1">
          {error.message}
        </p>

        <button
          onClick={() => navigate("/books")}
          className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Back to Books
        </button>
      </div>
    );
  }

  // ===== BOOK DETAILS =====

  return (
    <div>
      {/* ===== TITLE ===== */}

      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {data.title}
      </h2>

      {/* ===== BOOK CARD ===== */}

      <div className="max-w-sm">
        <BookCard
          book={data}
          onBorrow={() => {
            console.log(
              `${data.title} has been borrowed.`
            );
          }}
        />
      </div>

      {/* ===== ADDITIONAL INFORMATION ===== */}

      <div className="mt-4 max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
          Book Information
        </h3>

        <div className="space-y-2 text-sm">
          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">
              ID:
            </span>{" "}
            {data.id}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">
              Author:
            </span>{" "}
            {data.author}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">
              Genre:
            </span>{" "}
            {data.genre}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">
              Status:
            </span>{" "}
            {data.available
              ? "Available"
              : "Currently Borrowed"}
          </p>
        </div>
      </div>

      {/* ===== BACK BUTTON ===== */}

      <button
        onClick={() => navigate("/books")}
        className="mt-4 rounded bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        ← Back to Books
      </button>
    </div>
  );
}

export default BookDetailPage;