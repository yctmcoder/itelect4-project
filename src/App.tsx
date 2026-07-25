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
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Stores library books
  const [books, setBooks] = useState<Book[]>([]);

  // Stores borrowed books
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);

  // Tracks whether library data is loading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Stores the current search text
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ===== CUSTOM useToggle HOOK =====

  // Controls whether borrowed books are displayed
  const [showBorrowedBooks, toggleBorrowedBooks] = useToggle(false);

  // ===== CUSTOM usePrevious HOOK =====

  // Stores the previous search term
  const previousSearch = usePrevious(searchTerm);

  // ===== TYPED DOM REFERENCE WITH useRef =====

  // Reference to the book search input
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Runs once when the component mounts
  useEffect(() => {
    setTimeout(() => {
      // Simulate fetched library data
      setBooks([book]);
      setIsLoading(false);
    }, 500);
  }, []);

  // ===== TYPED DOM EVENT =====

  // Handles changes to the search input
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  // ===== FILTERED BOOKS =====

  // Filters books based on the search term
  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== TYPED DOM REFERENCE FUNCTION =====

  // Focus the search input programmatically
  const focusSearch = (): void => {
    searchInputRef.current?.focus();
  };

  // ===== TYPED EVENT HANDLER =====

  // Handles borrowing a book
  const handleBorrow = (book: Book): void => {
    setSelectedBook(book);

    setBorrowedBooks((previousBooks) => [
      ...previousBooks,
      book,
    ]);

    console.log(`${book.title} has been borrowed.`);
  };

  // ===== LOADING STATE =====

  if (isLoading) {
    return <p>Loading library books...</p>;
  }

  // ===== FINAL DYNAMIC UI RENDER =====

  return (
    <div className="app">
      <h1>📚 Library App</h1>

      {/* ===== SEARCH BOOKS ===== */}

      <input
        ref={searchInputRef}
        value={searchTerm}
        type="text"
        placeholder="Search books..."
        onChange={handleSearchChange}
      />

      <button onClick={focusSearch}>
        Focus Search
      </button>

      {/* ===== PREVIOUS SEARCH ===== */}

      {previousSearch !== undefined &&
        previousSearch !== searchTerm && (
          <p>
            Previous search: "{previousSearch}"
          </p>
        )}

      {/* ===== AVAILABLE BOOKS ===== */}

      <h2>Available Books</h2>

      {filteredBooks.map((libraryBook) => (
        <BookCard
          key={libraryBook.id}
          book={libraryBook}
          onBorrow={handleBorrow}
        />
      ))}

      {/* ===== NO SEARCH RESULTS ===== */}

      {filteredBooks.length === 0 && (
        <p>
          No books found matching "{searchTerm}".
        </p>
      )}

      {/* ===== MEMBER ===== */}

      <MemberCard
        member={member}
      />

      {/* ===== SELECTED BOOK ===== */}

      {selectedBook && (
        <p>
          Selected: {selectedBook.title}
        </p>
      )}

      {/* ===== BORROW RECORD ===== */}

      <BorrowRecordCard
        record={borrowRecord}
      >
        <p>No overdue books.</p>
      </BorrowRecordCard>

      {/* ===== BORROWED BOOKS TOGGLE ===== */}

      <button onClick={toggleBorrowedBooks}>
        {showBorrowedBooks
          ? "Hide Borrowed Books"
          : "Show Borrowed Books"}
      </button>

      {/* ===== BORROWED BOOKS ===== */}

      {showBorrowedBooks && (
        <>
          <h2>Borrowed Books</h2>

          {borrowedBooks.length > 0 ? (
            <ul>
              {borrowedBooks.map((borrowedBook, index) => (
                <li key={`${borrowedBook.id}-${index}`}>
                  {borrowedBook.title} by{" "}
                  {borrowedBook.author}
                </li>
              ))}
            </ul>
          ) : (
            <p>No books have been borrowed yet.</p>
          )}
        </>
      )}
    </div>
  );
}

export default App;