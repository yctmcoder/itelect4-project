// src/pages/DashboardPage.tsx

import { useState } from "react";

import type { Book } from "../types";

import BookCard from "../components/BookCard";
import MemberCard from "../components/MemberCard";
import useToggle from "../hooks/useToggle";

import {
  allBooks,
  member,
} from "../data/mockData";

function DashboardPage() {
  // Stores the currently selected book
  const [selectedBook, setSelectedBook] =
    useState<Book | null>(null);

  // Controls whether details are displayed
  const [showDetails, toggleDetails] =
    useToggle(false);

  // Handles borrowing a book
  const handleBorrow = (book: Book): void => {
    setSelectedBook(book);
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Library Dashboard
      </h2>

      {/* ===== BOOKS AND MEMBER ===== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* ===== BOOK CARDS ===== */}

        {allBooks.map((libraryBook) => (
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