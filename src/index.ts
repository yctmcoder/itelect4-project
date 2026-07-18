// At the TOP of src/index.ts

import type { Book, Member } from "./types";

// ===== USING INTERFACES =====

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

console.log(book);
console.log(member);

// ===== PRIMITIVE TYPE ANNOTATIONS =====

// Variables with explicit types
const libraryName: string = "DLSL Library System";
const currentYear: number = 2026;
const isOpen: boolean = true;
console.log(isOpen);
const nothing: null = null;
console.log(nothing);
const notSet: undefined = undefined;
console.log(notSet);

// Function: typed parameters + typed return value
function greet(name: string, year: number): string {
  return `Welcome to ${name} - Library System (${year})`;
}

// void: function that does NOT return a value
function logMessage(message: string): void {
  console.log(message);
}

logMessage(greet(libraryName, currentYear));

// ===== SPECIAL TYPES =====

// any
let anything: any = "Library";
anything = 42;
anything = false;

console.log(anything);

// unknown
let userInput: unknown = "Borrow Book";

if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}


// ===== TYPE NARROWING =====

import type { StringOrNumber } from "./types";

// Narrowing with typeof
function processInput(input: StringOrNumber): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  }

  return input.toFixed(2);
}

// Narrowing with instanceof
function formatDate(value: string | Date): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  return value;
}

console.log(processInput("library"));
console.log(processInput(12345));
console.log(formatDate(new Date()));

// ===== GENERIC FUNCTIONS =====

function getFirst<T>(items: T[]): T | undefined {
  return items[0];
}

function getById<T extends { id: number }>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

const firstBook = getFirst<Book>([book]);
const foundBook = getById<Book>([book], 1);

console.log(firstBook?.title);
console.log(foundBook?.author);

// ===== GENERIC INTERFACE =====

import type { ApiResponse } from "./types";

const bookResponse: ApiResponse<Book> = {
  success: true,
  data: book,
};

const memberResponse: ApiResponse<Member[]> = {
  success: true,
  data: [member],
};

console.log(memberResponse);

console.log(bookResponse.data.title);

// ===== USING UTILITY TYPES =====

import type {
  BookUpdate,
  BookPreview,
  PublicBook,
  GenreCount,
} from "./types";

// Partial<T>
const patch: BookUpdate = {
  title: "The Hobbit: Revised Edition",
};
console.log(patch);

// Pick<T,K>
const preview: BookPreview = {
  id: 1,
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
};
console.log(preview);

// Omit<T,K>
const publicBook: PublicBook = {
  id: 1,
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  genre: "Fantasy",
};
console.log(publicBook);

// Record<K,T>
const genreCount: GenreCount = {
  Fantasy: 12,
  Mystery: 8,
  "Science Fiction": 5,
};
console.log(genreCount);

// ===== ReturnType<T> =====

function createBorrowRecord(bookId: number) {
  return {
    id: 1,
    memberId: 101,
    bookId,
    borrowDate: new Date(),
  };
}

type NewBorrowRecord = ReturnType<typeof createBorrowRecord>;

const borrowRecord: NewBorrowRecord = createBorrowRecord(1);

console.log(borrowRecord);
// ===== USING ENUMS =====

import { BorrowStatus, MembershipType } from "./types";

let status: BorrowStatus = BorrowStatus.Borrowed;

console.log(BorrowStatus[status]);

status = BorrowStatus.Returned;

console.log(status === BorrowStatus.Returned);

const membership: MembershipType = MembershipType.Student;

console.log(membership);