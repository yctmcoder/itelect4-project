import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

import type { Book } from "../types/index";
import BookCard from "../components/BookCard";
import usePrevious from "../hooks/usePrevious";
import useUiStore from "../store/uiStore";
import { fetchBooks } from "../api/client";

function BooksPage() {
  // ===== FETCH BOOKS =====
  // React Query handles loading, error,
  // caching, and fetching.

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  // ===== SEARCH FROM GLOBAL STORE =====

  const searchTerm = useUiStore(
    (state) => state.searchTerm
  );

  const setSearchTerm = useUiStore(
    (state) => state.setSearchTerm
  );

  // ===== PREVIOUS SEARCH =====

  const previousSearch = usePrevious(searchTerm);

  // ===== LOADING STATE =====

  if (isPending) {
    return (
      <div className="animate-pulse p-6 text-gray-500 dark:text-gray-400">
        Loading library books...
      </div>
    );
  }

  // ===== ERROR STATE =====

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
        <p className="font-semibold">
          Could not load library books.
        </p>

        <p className="mt-1 text-sm">
          {error.message} -- is json-server running on port 3000?
        </p>
      </div>
    );
  }

  // ===== FILTER BOOKS =====
  // At this point, data is Book[].

  const filteredBooks = data.filter((book) => {
    const search = searchTerm.toLowerCase();

    return (
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search) ||
      book.genre.toLowerCase().includes(search)
    );
  });

  // ===== PAGE UI =====

  return (
    <div>
      {/* ===== PAGE TITLE ===== */}

      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        📚 Books
      </h2>

      {/* ===== SEARCH ===== */}

      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search books by title, author, or genre..."
        className="
          w-full
          rounded
          border border-gray-300
          bg-white
          p-2
          text-gray-900
          outline-none
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          dark:border-gray-600
          dark:bg-gray-800
          dark:text-white
        "
      />

      {/* ===== PREVIOUS SEARCH ===== */}

      {previousSearch !== undefined &&
        previousSearch !== searchTerm && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Previous search: "{previousSearch}"
          </p>
        )}

      {/* ===== BOOK COUNT ===== */}

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Showing {filteredBooks.length} of {data.length} books
      </p>

      {/* ===== BOOK GRID ===== */}

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className="block"
            >
              <BookCard
                book={book}
                onBorrow={() => {
                  console.log(`${book.title} selected`);
                }}
              />
            </Link>
          ))
        ) : (
          <div className="col-span-full rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="font-medium text-gray-700 dark:text-gray-200">
              No books found.
            </p>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Try searching for another title, author, or genre.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BooksPage;