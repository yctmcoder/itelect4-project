import type { Book } from "../types";

interface BookCardProps {
  book: Book;
  onBorrow: (book: Book) => void;
}

function BookCard({ book, onBorrow }: BookCardProps) {
  const handleBorrow = (): void => {
    onBorrow(book);
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Status: {book.available ? "Available" : "Borrowed"}</p>

      <button onClick={handleBorrow}>
        Borrow Book
      </button>
    </div>
  );
}

export default BookCard;