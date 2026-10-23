
import { useState, type FormEvent } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Link } from "react-router";

import type { Book } from "../types/index";
import BookCard from "../components/BookCard";
import usePrevious from "../hooks/usePrevious";
import useUiStore from "../store/uiStore";
import { fetchBooks, createBook } from "../api/client";

// Genres supported by your Express backend
const GENRES = [
  "Fantasy",
  "Fiction",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Non-Fiction",
  "Biography",
  "History",
  "Other",
];

function BooksPage() {
  const queryClient = useQueryClient();

  // =====================================================
  // CREATE BOOK FORM
  // =====================================================

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("Fantasy");
  const [available, setAvailable] = useState(true);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // =====================================================
  // FETCH BOOKS
  // =====================================================

  const {
    data = [],
    isPending,
    isError,
    error,
  } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  // =====================================================
  // CREATE BOOK MUTATION
  // =====================================================

  const createMutation = useMutation({
    mutationFn: createBook,

    onSuccess: async () => {
      // Refresh books from MongoDB Atlas
      await queryClient.invalidateQueries({
        queryKey: ["books"],
      });

      setTitle("");
      setAuthor("");
      setGenre("Fantasy");
      setAvailable(true);
      setFormError("");
      setShowForm(false);

      setSuccessMessage(
        "Book created successfully and saved to MongoDB Atlas!"
      );
    },

    onError: (error: Error) => {
      setFormError(error.message);
    },
  });

  // =====================================================
  // GLOBAL SEARCH STORE
  // =====================================================

  const searchTerm = useUiStore(
    (state) => state.searchTerm
  );

  const setSearchTerm = useUiStore(
    (state) => state.setSearchTerm
  );

  const previousSearch = usePrevious(searchTerm);

  // =====================================================
  // SUBMIT NEW BOOK
  // =====================================================

  const handleCreateBook = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setFormError("");
    setSuccessMessage("");

    if (!title.trim() || !author.trim()) {
      setFormError(
        "Please enter a book title and author."
      );
      return;
    }

    createMutation.mutate({
      title: title.trim(),
      author: author.trim(),
      genre,
      available,
    });
  };

  // =====================================================
  // FILTER BOOKS
  // =====================================================

  const filteredBooks = data.filter((book) => {
    const search = searchTerm.toLowerCase();

    return (
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search) ||
      book.genre.toLowerCase().includes(search)
    );
  });

  // =====================================================
  // PAGE UI
  // =====================================================

  return (
    <div>
      {/* PAGE HEADER */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          📚 Books
        </h2>

        <button
          type="button"
          onClick={() => {
            setShowForm(!showForm);
            setFormError("");
            setSuccessMessage("");
          }}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          {showForm ? "Cancel" : "+ Add Book"}
        </button>
      </div>

      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div
          role="status"
          className="mb-4 rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
        >
          {successMessage}
        </div>
      )}

      {/* CREATE BOOK FORM */}
      {showForm && (
        <form
          onSubmit={handleCreateBook}
          className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Add New Book
          </h3>

          {/* TITLE */}
          <label
            htmlFor="book-title"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Book Title
          </label>

          <input
            id="book-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
            required
            minLength={2}
            maxLength={150}
            disabled={createMutation.isPending}
            className="mb-3 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />

          {/* AUTHOR */}
          <label
            htmlFor="book-author"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Author
          </label>

          <input
            id="book-author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author name"
            required
            minLength={2}
            disabled={createMutation.isPending}
            className="mb-3 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          />

          {/* GENRE */}
          <label
            htmlFor="book-genre"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Genre
          </label>

          <select
            id="book-genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            disabled={createMutation.isPending}
            className="mb-3 w-full rounded border border-gray-300 bg-white p-2 text-gray-900 outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
          >
            {GENRES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* AVAILABILITY */}
          <label className="mb-4 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) =>
                setAvailable(e.target.checked)
              }
              disabled={createMutation.isPending}
              className="h-4 w-4 accent-blue-600"
            />
            Available for borrowing
          </label>

          {/* FORM ERROR */}
          {formError && (
            <p
              role="alert"
              className="mb-3 rounded bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300"
            >
              {formError}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="rounded bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {createMutation.isPending
              ? "Saving Book..."
              : "Save Book"}
          </button>
        </form>
      )}

      {/* SEARCH */}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search books by title, author, or genre..."
        className="w-full rounded border border-gray-300 bg-white p-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      />

      {/* PREVIOUS SEARCH */}
      {previousSearch !== undefined &&
        previousSearch !== searchTerm && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Previous search: "{previousSearch}"
          </p>
        )}

      {/* BOOK COUNT */}
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Showing {filteredBooks.length} of {data.length} books
      </p>

      {/* LOADING STATE */}
      {isPending && (
        <p className="mt-4 animate-pulse text-gray-500 dark:text-gray-400">
          Loading library books...
        </p>
      )}

      {/* ERROR STATE */}
      {isError && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-900/20 dark:text-red-400">
          <p className="font-semibold">
            Could not load library books.
          </p>

          <p className="mt-1 text-sm">
            {error.message}
          </p>
        </div>
      )}

      {/* BOOK GRID */}
      {!isPending && !isError && (
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
                {data.length === 0
                  ? "Your library has no books yet. Click Add Book to create one."
                  : "Try searching for another title, author, or genre."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BooksPage;
