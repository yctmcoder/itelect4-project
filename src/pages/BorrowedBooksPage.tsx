// src/pages/BorrowedBooksPage.tsx

import BookStatusBadge from "../components/BookStatusBadge";
import { allBooks } from "../data/mockData";

function BooksPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Library Books
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allBooks.map((book) => (
          <BookStatusBadge key={book.id} book={book}>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Book ID: {book.id}
            </p>
          </BookStatusBadge>
        ))}
      </div>
    </div>
  );
}

export default BooksPage;