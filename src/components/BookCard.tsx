// src/components/BookCard.tsx

import type { Book } from "../types";

interface BookCardProps {
  book: Book;
  onBorrow: (book: Book) => void;
  variant?: "default" | "compact";
}

function BookCard({
  book,
  onBorrow,
  variant = "default",
}: BookCardProps) {
  const isCompact = variant === "compact";

  return (
    <div
      className={`rounded-xl border border-blue-200 bg-white p-5 shadow-md transition hover:shadow-lg dark:border-blue-800 dark:bg-gray-800 ${
        isCompact ? "p-3" : "p-5"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3
          className={`font-bold text-blue-800 dark:text-blue-200 ${
            isCompact ? "text-lg" : "text-xl"
          }`}
        >
          📖 {book.title}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            book.available
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {book.available ? "Available" : "Borrowed"}
        </span>
      </div>

      {!isCompact && (
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Author: {book.author}
        </p>
      )}

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Genre: {book.genre}
      </p>

      <button
        onClick={() => onBorrow(book)}
        disabled={!book.available}
        className={`mt-4 rounded-lg px-4 py-2 text-sm font-medium text-white transition ${
          book.available
            ? "bg-blue-600 hover:bg-blue-700"
            : "cursor-not-allowed bg-gray-400"
        }`}
      >
        {book.available ? "Borrow Book" : "Currently Unavailable"}
      </button>
    </div>
  );
}

export default BookCard;