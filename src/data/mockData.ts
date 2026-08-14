// src/data/mockData.ts

import type {
  Book,
  Member,
  BorrowRecord,
} from "../types";

// ===== MOCK BOOKS =====

export const allBooks: Book[] = [
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
];

// ===== MOCK MEMBER =====

export const member: Member = {
  id: 101,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  membershipType: "student",
  active: true,
};

// ===== MOCK BORROW RECORD =====

export const borrowRecord: BorrowRecord = {
  id: 1,
  memberId: 101,
  bookId: 1,
  borrowDate: new Date(),
  returnDate: new Date(),
  fine: 0,
};