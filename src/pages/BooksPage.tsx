// src/pages/BooksPage.tsx

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";

import type { Book } from "../types";
import BookCard from "../components/BookCard";

import usePrevious from "../hooks/usePrevious";

// ===== LIBRARY BOOK DATA =====

const allBooks: Book[] = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    available: true,
  },
  {
    id: 2,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    available: true,
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    available: false,
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    available: true,
  },
  {
    id: 5,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    available: true,
  },
  {
    id: 6,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    available: false,
  },
];

function BooksPage() {
  // ===== STATE =====

  const [books, setBooks] =
    useState<Book[]>([]);

  const [isLoading, setIsLoading] =
    useState<boolean>(true);

  const [isError, setIsError] =
    useState<boolean>(false);

  const [searchTerm, setSearchTerm] =
    useState<string>("");

  // ===== SEARCH REFERENCE =====

  const searchInputRef =
    useRef<HTMLInputElement>(null);

  // ===== PREVIOUS SEARCH =====

  const previousSearch =
    usePrevious(searchTerm);

  // ===== LOAD BOOKS =====

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooks(allBooks);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // ===== SEARCH HANDLER =====

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  // ===== FILTER BOOKS =====

  const filteredBooks = books.filter((book) => {
    const search = searchTerm.toLowerCase();

    return (
      book.title
        .toLowerCase()
        .includes(search) ||
      book.author
        .toLowerCase()
        .includes(search) ||
      book.genre
        .toLowerCase()
        .includes(search)
    );
  });

  // ===== LOADING STATE =====

  if (isLoading) {
    return (
      <div className="animate-pulse p-6 text-gray-500 dark:text-gray-400">
        Loading library books...
      </div>
    );
  }

  // ===== ERROR STATE =====

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        <p className="font-semibold">
          Could not load library books.
        </p>

        <button
          onClick={() => {
            setIsError(false);
            setIsLoading(true);

            setTimeout(() => {
              setBooks(allBooks);
              setIsLoading(false);
            }, 500);
          }}
          className="mt-3 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ===== PAGE UI =====

  return (
    <div>

      {/* ===== PAGE TITLE ===== */}

      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        📚 Books
      </h2>

      {/* ===== ERROR TEST BUTTON ===== */}

      <button
        onClick={() => setIsError(true)}
        className="mb-3 rounded bg-red-100 px-2 py-1 text-xs text-red-700 hover:bg-red-200"
      >
        Simulate Error
      </button>

      {/* ===== SEARCH ===== */}

      <input
        ref={searchInputRef}
        value={searchTerm}
        onChange={handleSearchChange}
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
        Showing {filteredBooks.length} of{" "}
        {books.length} books
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
                  console.log(
                    `${book.title} selected`
                  );
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
              Try searching for another title,
              author, or genre.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default BooksPage;