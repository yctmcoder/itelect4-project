// src/components/BookStatusBadge.tsx

import type { ReactNode } from "react";
import type { Book } from "../types/index";

interface BookStatusBadgeProps {
  book: Book;
  children?: ReactNode;
}

function BookStatusBadge({
  book,
  children,
}: BookStatusBadgeProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* ===== BOOK TITLE ===== */}

      <p className="text-gray-900 dark:text-white">
        {book.title}
      </p>

      {/* ===== AUTHOR ===== */}

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Author: {book.author}
      </p>

      {/* ===== GENRE ===== */}

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Genre: {book.genre}
      </p>

      {/* ===== BOOK STATUS ===== */}

      <p
        className={
          book.available
            ? "mt-2 text-sm font-semibold text-green-600 dark:text-green-400"
            : "mt-2 text-sm font-semibold text-red-600 dark:text-red-400"
        }
      >
        {book.available
          ? "Available"
          : "Currently Borrowed"}
      </p>

      {/* ===== CHILDREN ===== */}

      {children}
    </div>
  );
}

export default BookStatusBadge;