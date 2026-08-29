// src/pages/BorrowedBooksPage.tsx

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link } from "react-router";

import type { Book } from "../types/index";

import {
  bookSchema,
  type BookFormValues,
} from "../schemas/bookSchemas";

import BookCard from "../components/BookCard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  fetchBooks,
  updateBook,
} from "../api/client";

function BorrowedBooksPage() {
  // ===== QUERY CLIENT =====

  const queryClient = useQueryClient();

  // ===== FORM =====

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    mode: "onBlur",

    defaultValues: {
      title: "",
      author: "",
      genre: "",
    },
  });

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
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });

      reset();
    },
  });

  // ===== FORM SUBMIT =====

  const onSubmit = (
    values: BookFormValues
  ): void => {
    const book = data?.find(
      (item) =>
        item.title.toLowerCase() ===
        values.title.toLowerCase()
    );

    if (book === undefined) {
      return;
    }

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

      {/* ===== BORROW FORM ===== */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 grid max-w-lg gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        {/* ===== FORM TITLE ===== */}

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Borrow a Book
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Enter the book information to borrow a book.
          </p>
        </div>

        {/* ===== BOOK TITLE ===== */}

        <div className="grid gap-1.5">
          <Label
            htmlFor="title"
            className="text-foreground"
          >
            Book Title
          </Label>

          <Input
            id="title"
            {...register("title")}
            aria-invalid={
              errors.title ? true : undefined
            }
            placeholder="Enter book title"
          />

          {errors.title && (
            <p className="text-sm text-red-600">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* ===== AUTHOR ===== */}

        <div className="grid gap-1.5">
          <Label
            htmlFor="author"
            className="text-foreground"
          >
            Author
          </Label>

          <Input
            id="author"
            {...register("author")}
            aria-invalid={
              errors.author ? true : undefined
            }
            placeholder="Enter author"
          />

          {errors.author && (
            <p className="text-sm text-red-600">
              {errors.author.message}
            </p>
          )}
        </div>

        {/* ===== GENRE ===== */}

        <div className="grid gap-1.5">
          <Label
            htmlFor="genre"
            className="text-foreground"
          >
            Genre
          </Label>

          <Input
            id="genre"
            {...register("genre")}
            aria-invalid={
              errors.genre ? true : undefined
            }
            placeholder="Enter genre"
          />

          {errors.genre && (
            <p className="text-sm text-red-600">
              {errors.genre.message}
            </p>
          )}
        </div>

        {/* ===== MUTATION ERROR ===== */}

        {borrowBook.isError && (
          <p className="text-sm text-red-600">
            {borrowBook.error.message}
          </p>
        )}

        {/* ===== SUBMIT BUTTON ===== */}

        <Button
          type="submit"
          disabled={borrowBook.isPending}
          className="justify-self-start"
        >
          {borrowBook.isPending
            ? "Borrowing..."
            : "Borrow book"}
        </Button>
      </form>

      {/* ===== BOOK COUNT ===== */}

      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {borrowedBooks.length} borrowed{" "}
        {borrowedBooks.length === 1
          ? "book"
          : "books"}
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
                  borrowBook.mutate(book);
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