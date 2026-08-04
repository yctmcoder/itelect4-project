// src/App.tsx

import { useState, useEffect, useRef } from "react";

import BookCard from "./components/BookCard";
import MemberCard from "./components/MemberCard";
import BorrowRecordCard from "./components/BorrowCard";

import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";

import type {
  Book,
  Member,
  BorrowRecord,
} from "./types";

function App() {
  // ===== TYPED STATE WITH useState<T> =====

  // Stores the currently selected book
  const [selectedBook, setSelectedBook] =
    useState<Book | null>(null);

  // Stores library books
  const [books, setBooks] =
    useState<Book[]>([]);

  // Stores borrowed books
  const [borrowedBooks, setBorrowedBooks] =
    useState<Book[]>([]);

  // Tracks whether library data is loading
  const [isLoading, setIsLoading] =
    useState<boolean>(true);

  // Tracks whether an error occurred
  const [isError, setIsError] =
    useState<boolean>(false);

  // Stores the current search text
  const [searchTerm, setSearchTerm] =
    useState<string>("");

  // ===== TYPED DOM REFERENCE WITH useRef =====

  // Reference to the search input
  const searchInputRef =
    useRef<HTMLInputElement>(null);

  // ===== CUSTOM useToggle HOOK =====

  // Controls whether borrowed books are displayed
  const [
    showBorrowedBooks,
    toggleBorrowedBooks,
  ] = useToggle(false);

  // Controls Dark Mode
  const [
    isDarkMode,
    toggleDarkMode,
  ] = useToggle(false);

  // ===== CUSTOM usePrevious HOOK =====

  // Stores the previous search term
  const previousSearch =
    usePrevious(searchTerm);

  // ===== MOCK DATA =====

  const book: Book = {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    available: true,
  };

  const member: Member = {
    id: 101,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    membershipType: "student",
    active: true,
  };

  const borrowRecord: BorrowRecord = {
    id: 1,
    memberId: 101,
    bookId: 1,
    borrowDate: new Date(),
    returnDate: new Date(),
    fine: 0,
  };

  // ===== LOADING MOCK DATA WITH useEffect =====

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooks([book]);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // ===== TYPED DOM EVENT =====

  // Handles changes to the search input
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  // ===== TYPED DOM REFERENCE FUNCTION =====

  // Focuses the search input programmatically
  const focusSearch = (): void => {
    searchInputRef.current?.focus();
  };

  // ===== FILTERED BOOKS =====

  // Filters books by title, author, or genre
  const filteredBooks = books.filter(
    (b) =>
      b.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      b.author
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      b.genre
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // ===== TYPED EVENT HANDLER =====

  // Handles borrowing a book
  const handleBorrow = (
    selectedBook: Book
  ): void => {
    setSelectedBook(selectedBook);

    setBorrowedBooks(
      (previousBooks) => [
        ...previousBooks,
        selectedBook,
      ]
    );

    console.log(
      `${selectedBook.title} has been borrowed.`
    );
  };

  // ===== LOADING STATE =====

  if (isLoading) {
    return (
      <div
        className={
          isDarkMode
            ? "dark"
            : ""
        }
      >
        <div className="min-h-screen bg-gray-50 p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
          <h1 className="mb-4 text-3xl font-bold">
            📚 Library App
          </h1>

          <p className="animate-pulse text-gray-500 dark:text-gray-400">
            Loading library books...
          </p>
        </div>
      </div>
    );
  }

  // ===== ERROR STATE =====

  if (isError) {
    return (
      <div
        className={
          isDarkMode
            ? "dark"
            : ""
        }
      >
        <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
          <div className="m-6 rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-300">
            <h2 className="font-bold">
              Library Error
            </h2>

            <p>
              Could not load library books.
              Please try again.
            </p>

            <button
              onClick={() => setIsError(false)}
              className="mt-3 rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== FINAL DYNAMIC UI =====

  return (
    <div
      className={
        isDarkMode
          ? "dark"
          : ""
      }
    >
      <div className="min-h-screen bg-gray-50 p-6 text-gray-900 dark:bg-gray-900 dark:text-gray-100">

        {/* ===== PAGE HEADER ===== */}

        <div className="mx-auto max-w-6xl">

          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <h1 className="text-3xl font-bold">
              📚 Library App
            </h1>

            {/* ===== DARK MODE BUTTON ===== */}

            <div className="flex gap-2">

              <button
                onClick={toggleDarkMode}
                className="rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-white"
              >
                {isDarkMode
                  ? "☀️ Light Mode"
                  : "🌙 Dark Mode"}
              </button>

              {/* ===== SIMULATE ERROR BUTTON ===== */}

              <button
                onClick={() => setIsError(true)}
                className="rounded-md bg-red-100 px-3 py-2 text-xs font-medium text-red-700 transition hover:bg-red-200 dark:bg-red-900 dark:text-red-200"
              >
                Simulate Error
              </button>

            </div>

          </div>

          {/* ===== SEARCH SECTION ===== */}

          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">

            <h2 className="mb-3 text-lg font-semibold">
              Search Library
            </h2>

            <div className="flex flex-col gap-3 sm:flex-row">

              <input
                ref={searchInputRef}
                value={searchTerm}
                type="text"
                placeholder="Search by title, author, or genre..."
                onChange={handleSearchChange}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
              />

              <button
                onClick={focusSearch}
                className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
              >
                Focus Search
              </button>

            </div>

            {/* ===== PREVIOUS SEARCH ===== */}

            {previousSearch !== undefined &&
              previousSearch !== searchTerm && (
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  Previous search: "{previousSearch}"
                </p>
              )}

          </div>

          {/* ===== LIBRARY CARDS GRID ===== */}

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {/* ===== AVAILABLE BOOKS ===== */}

            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">

              <h2 className="mb-4 text-xl font-bold">
                Available Books
              </h2>

              {filteredBooks.length > 0 ? (
                <div className="space-y-4">

                  {filteredBooks.map(
                    (libraryBook) => (
                      <BookCard
                        key={libraryBook.id}
                        book={libraryBook}
                        onBorrow={handleBorrow}
                      />
                    )
                  )}

                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No books found matching "{searchTerm}".
                </p>
              )}

            </div>

            {/* ===== MEMBER ===== */}

            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">

              <h2 className="mb-4 text-xl font-bold">
                Library Member
              </h2>

              <MemberCard
                member={member}
              />

            </div>

            {/* ===== BORROW RECORD ===== */}

            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">

              <h2 className="mb-4 text-xl font-bold">
                Borrow Record
              </h2>

              <BorrowRecordCard
                record={borrowRecord}
              >
                <p className="text-green-600 dark:text-green-400">
                  No overdue books.
                </p>
              </BorrowRecordCard>

            </div>

          </div>

          {/* ===== SELECTED BOOK ===== */}

          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">

            <h2 className="mb-3 text-xl font-bold">
              Selected Book
            </h2>

            {selectedBook ? (
              <p className="text-gray-700 dark:text-gray-300">
                Selected:{" "}
                <span className="font-semibold">
                  {selectedBook.title}
                </span>
              </p>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No book selected.
              </p>
            )}

          </div>

          {/* ===== BORROWED BOOKS ===== */}

          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <h2 className="text-xl font-bold">
                Borrowed Books
              </h2>

              <button
                onClick={toggleBorrowedBooks}
                className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
              >
                {showBorrowedBooks
                  ? "Hide Borrowed Books"
                  : "Show Borrowed Books"}
              </button>

            </div>

            {/* ===== BORROWED BOOK LIST ===== */}

            {showBorrowedBooks && (
              <div className="mt-4">

                {borrowedBooks.length > 0 ? (
                  <ul className="space-y-2">

                    {borrowedBooks.map(
                      (
                        borrowedBook,
                        index
                      ) => (
                        <li
                          key={`${borrowedBook.id}-${index}`}
                          className="rounded-md bg-gray-50 p-3 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
                        >
                          <span className="font-semibold">
                            {borrowedBook.title}
                          </span>{" "}
                          by{" "}
                          {borrowedBook.author}
                        </li>
                      )
                    )}

                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No books have been borrowed yet.
                  </p>
                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default App;