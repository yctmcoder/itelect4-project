// ===== INTERFACES =====
// An interface defines the SHAPE of an object.

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  available: boolean;
}

export interface Member {
  id: number;
  name: string;
  email: string;
  membershipType: "student" | "faculty" | "guest";
  active: boolean;
}

export interface BorrowRecord {
  id: number;
  memberId: number;
  bookId: number;
  borrowDate: Date;
  returnDate: Date;
  fine?: number; // optional
}

// ===== TYPE ALIASES =====

// Alias for a union type
export type ID = number | string;

// Alias for an object shape
export type ShelfLocation = {
  shelf: string;
  row: number;
};

// Alias for a function signature
export type Formatter = (value: number) => string;

// Using them
const bookId: ID = "BK-2026-001";
const location: ShelfLocation = {
  shelf: "A",
  row: 3,
};

const formatFine: Formatter = (value) => `₱${value.toFixed(2)}`;

console.log(bookId);
console.log(formatFine(25));

// ===== UNION TYPES =====

export type StringOrNumber = string | number;

export type BookStatus =
  | "available"
  | "borrowed"
  | "reserved";

// Function using a union type
export function printId(id: StringOrNumber): void {
  console.log(`ID: ${id}`);
}

printId(101);
printId("BK-2026-001");

// ===== INTERSECTION TYPES =====

// BookWithBorrower combines Book + extra properties
export type BookWithBorrower = Book & {
  borrowedBy: Member;
  dueDate: Date;
};

const borrowedBook: BookWithBorrower = {
  id: 1,
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  genre: "Fantasy",
  available: false,

  borrowedBy: {
    id: 101,
    name: "Juan dela Cruz",
    email: "juan@example.com",
    membershipType: "student",
    active: true,
  },

  dueDate: new Date(),
};

// ===== GENERIC INTERFACE =====

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// ===== UTILITY TYPES =====

// Partial<T>
export type BookUpdate = Partial<Book>;

// Pick<T,K>
export type BookPreview = Pick<
  Book,
  "id" | "title" | "author"
>;

// Omit<T,K>
export type PublicBook = Omit<
  Book,
  "available"
>;

// Record<K,T>
export type GenreCount = Record<
  "Fantasy" | "Science Fiction" | "Mystery",
  number
>;

// ===== ENUMS =====

// Regular enum
export enum BorrowStatus {
  Borrowed,
  Returned,
  Overdue,
}

// const enum
export const enum MembershipType {
  Student = "student",
  Faculty = "faculty",
  Guest = "guest",
}
