// src/pages/BorrowedBooksPage.tsx

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";

import type { Book } from "../types/index";

import BookCard from "../components/BookCard";

import { fetchBooks, updateBook } from "../api/client";

function BorrowedBooksPage() {
  // ===== QUERY CLIENT =====

  const queryClient = useQueryClient();

  // ===== READ BOOKS =====

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  // ===== BORROW BOOK MUTATION =====

  const borrowBook = useMutation({
    mutationFn: (book: Book) =>
      updateBook(book.id, {
        available: false,
      }),

    onSuccess: () => {
      // The books list is now out of date.
      // Tell React Query to fetch it again.
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
  });

  // ===== BORROW HANDLER =====

  const handleBorrow = (book: Book): void => {
    borrowBook.mutate(book);
  };

  // ===== LOADING STATE =====

  if (isPending) {
    return (
      <div className="animate-pulse p-6 text-gray-500 dark:text-gray-400">
        Loading borrowed books...
      </div>
    );
  }

  // ===== ERROR STATE =====

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
        <p className="font-semibold">
          Could not load borrowed books.
        </p>

        <p className="mt-1 text-sm">
          {error.message} -- is json-server running on port 3000?
        </p>
      </div>
    );
  }

  // ===== FILTER BORROWED BOOKS =====

  const borrowedBooks = data.filter(
    (book) => !book.available
  );

  // ===== PAGE UI =====

  return (
    <div>
      {/* ===== PAGE TITLE ===== */}

      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        📖 Borrowed Books
      </h2>

      {/* ===== MUTATION ERROR ===== */}

      {borrowBook.isError && (
        <p className="mb-4 text-sm text-red-700 dark:text-red-400">
          {borrowBook.error.message}
        </p>
      )}

      {/* ===== BOOK COUNT ===== */}

      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {borrowedBooks.length} borrowed{" "}
        {borrowedBooks.length === 1 ? "book" : "books"}
      </p>

      {/* ===== BOOK GRID ===== */}

      {borrowedBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {borrowedBooks.map((book) => (
            <Link
              key={book.id}
              to={`/books/${book.id}`}
              className="block"
            >
              <BookCard
                book={book}
                onBorrow={() => {
                  handleBorrow(book);
                }}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
          <p className="font-medium text-gray-700 dark:text-gray-200">
            No borrowed books.
          </p>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            There are currently no books marked as borrowed.
          </p>
        </div>
      )}
    </div>
  );
}

export default BorrowedBooksPage;