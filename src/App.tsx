// src/App.tsx

import { useState, useEffect, useRef } from "react";

import BookCard from "./components/BookCard";
import MemberCard from "./components/MemberCard";
import BorrowRecordCard from "./components/BorrowCard";

import type {
  Book,
  Member,
  BorrowRecord,
} from "./types";

function App() {
  // ===== TYPED STATE WITH useState<T> =====

  // Stores the currently selected book
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Array state -- stores library books
  const [books, setBooks] = useState<Book[]>([]);

  // Array state -- stores borrowed books
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);

  // Boolean state -- tracks whether library data is loading
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Search state -- stores the current search text
  const [searchTerm, setSearchTerm] = useState<string>("");

  // ===== TYPED DOM REFERENCE WITH useRef =====

  // useRef<T>(null) -- T is the DOM element type
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus the search input programmatically
  const focusSearch = (): void => {
    searchInputRef.current?.focus();
  };

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

  // useEffect(fn, deps) -- fn runs after render;
  // an empty deps array [] means "run once, on mount"
  useEffect(() => {
    setTimeout(() => {
      // Reusing GT1's book mock data as the "fetched" result
      setBooks([book]);
      setIsLoading(false);
    }, 500);
  }, []);

  // ===== TYPED DOM EVENTS INSIDE HOOKS =====

  // React.ChangeEvent<HTMLInputElement> types e.target as an <input>
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchTerm(e.target.value);
  };

  // ===== FILTERED BOOKS =====

  // Derived value -- recomputed every render,
  // not stored in state
  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ===== TYPED EVENT HANDLER =====

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

  return (
    <div className="app">
      <h1>📚 Library App</h1>

      {/* ===== SEARCH BOOKS WITH useRef AND useState ===== */}

      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <button onClick={focusSearch}>
        Focus Search
      </button>

      {/* Library Books */}
      <h2>Available Books</h2>

      {filteredBooks.length > 0 ? (
        filteredBooks.map((libraryBook) => (
          <BookCard
            key={libraryBook.id}
            book={libraryBook}
            onBorrow={handleBorrow}
          />
        ))
      ) : (
        <p>No books found matching "{searchTerm}".</p>
      )}

      {/* Member */}
      <MemberCard
        member={member}
      />

      {/* Borrow Record */}
      <BorrowRecordCard
        record={borrowRecord}
      >
        <p>No overdue books.</p>
      </BorrowRecordCard>

      {/* Selected Book */}
      <h2>Selected Book</h2>

      {selectedBook ? (
        <p>
          Selected: {selectedBook.title}
        </p>
      ) : (
        <p>No book selected.</p>
      )}

      {/* Borrowed Books */}
      <h2>Borrowed Books</h2>

      {borrowedBooks.length > 0 ? (
        <ul>
          {borrowedBooks.map((borrowedBook, index) => (
            <li key={`${borrowedBook.id}-${index}`}>
              {borrowedBook.title} by {borrowedBook.author}
            </li>
          ))}
        </ul>
      ) : (
        <p>No books have been borrowed yet.</p>
      )}
    </div>
  );
}

export default App;