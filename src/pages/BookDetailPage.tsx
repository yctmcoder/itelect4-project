// src/pages/BookDetailPage.tsx

import { useParams, useNavigate } from "react-router";

import BookCard from "../components/BookCard";

import type { Book } from "../types";

// ===== MOCK BOOK DATA =====

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

function BookDetailPage() {
  // ===== GET BOOK ID FROM URL =====

  const { id } = useParams<{ id: string }>();

  // ===== NAVIGATION =====

  const navigate = useNavigate();

  // ===== FIND BOOK =====

  const book = allBooks.find(
    (b) => b.id === Number(id)
  );

  // ===== BOOK NOT FOUND =====

  if (book === undefined) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        <h2 className="font-semibold">
          Book Not Found
        </h2>

        <p className="mt-1">
          No book was found with ID "{id}".
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
        {book.title}
      </h2>

      {/* ===== BOOK CARD ===== */}

      <div className="max-w-sm">
        <BookCard
          book={book}
          onBorrow={() => {
            console.log(
              `${book.title} has been borrowed.`
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
            {book.id}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">
              Author:
            </span>{" "}
            {book.author}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">
              Genre:
            </span>{" "}
            {book.genre}
          </p>

          <p className="text-gray-600 dark:text-gray-300">
            <span className="font-semibold">
              Status:
            </span>{" "}
            {book.available
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