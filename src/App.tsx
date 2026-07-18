// src/App.tsx

import BookCard from "./components/BookCard";
import MemberCard from "./components/MemberCard";
import BorrowRecordCard from "./components/BorrowCard";

import type {
  Book,
  Member,
  BorrowRecord,
} from "./types";

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

function App() {
  const handleBorrow = (book: Book): void => {
    console.log(`${book.title} has been borrowed.`);
  };

  return (
    <div className="app">
      <h1>📚 Library App</h1>

      <BookCard
        book={book}
        onBorrow={handleBorrow}
      />

      <MemberCard
        member={member}
      />

      <BorrowRecordCard
        record={borrowRecord}
      >
        <p>No overdue books.</p>
      </BorrowRecordCard>
    </div>
  );
}

export default App;