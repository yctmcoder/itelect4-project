// src/pages/DashboardPage.tsx

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Book } from "../types/index";

import BookCard from "../components/BookCard";
import MemberCard from "../components/MemberCard";
import useToggle from "../hooks/useToggle";

import { member } from "../data/mockData";
import { fetchBooks } from "../api/client";

function DashboardPage() {
  // ===== FETCH BOOKS =====

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  // ===== SELECTED BOOK =====

  const [selectedBook, setSelectedBook] =
    useState<Book | null>(null);

  // ===== DETAILS TOGGLE =====

  const [showDetails, toggleDetails] =
    useToggle(false);

  // ===== BORROW HANDLER =====

  const handleBorrow = (book: Book): void => {
    setSelectedBook(book);
  };

  // ===== LOADING STATE =====

  if (isPending) {
    return (
      <div className="animate-pulse p-6 text-gray-500 dark:text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  // ===== ERROR STATE =====

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
        <p className="font-semibold">
          Could not load dashboard books.
        </p>

        <p className="mt-1 text-sm">
          {error.message} -- is json-server running on port 3000?
        </p>
      </div>
    );
  }

  // ===== PAGE UI =====

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Library Dashboard
      </h2>

      {/* ===== BOOKS AND MEMBER ===== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* ===== BOOK CARDS ===== */}

        {data.map((libraryBook: Book) => (
          <BookCard
            key={libraryBook.id}
            book={libraryBook}
            onBorrow={handleBorrow}
          />
        ))}

        {/* ===== MEMBER CARD ===== */}

        <MemberCard
          member={member}
        />

      </div>

      {/* ===== DETAILS BUTTON ===== */}

      <button
        onClick={toggleDetails}
        className="mt-4 rounded bg-gray-200 px-3 py-1.5 text-sm dark:bg-gray-700 dark:text-white"
      >
        {showDetails ? "Hide" : "Show"} Details
      </button>

      {/* ===== SELECTED BOOK ===== */}

      {showDetails &&
        selectedBook !== null && (
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            Selected: {selectedBook.title} by{" "}
            {selectedBook.author}
          </p>
        )}
    </div>
  );
}

export default DashboardPage;