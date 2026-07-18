import type { Book } from "../types";

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Status: {book.available ? "Available" : "Borrowed"}</p>
    </div>
  );
}

export default BookCard;