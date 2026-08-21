// src/api/client.ts

import type {
  Book,
  Member,
  BorrowRecord,
} from "../types";

// Change this if your JSON Server/API uses another URL
const API_URL = "http://localhost:3000";

// =====================================================
// BOOKS
// =====================================================

// GET /books
export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch(`${API_URL}/books`);

  if (!res.ok) {
    throw new Error("Could not load books");
  }

  return res.json();
}

// GET /books?id=1
export async function fetchBookById(id: number): Promise<Book> {
  const res = await fetch(`${API_URL}/books?id=${id}`);

  if (!res.ok) {
    throw new Error("Could not load book");
  }

  const matches: Book[] = await res.json();

  if (matches.length === 0) {
    throw new Error(`No book found with id "${id}".`);
  }

  return matches[0];
}

// GET /books?title=...
export async function fetchBooksByTitle(
  title: string
): Promise<Book[]> {
  const res = await fetch(
    `${API_URL}/books?title=${encodeURIComponent(title)}`
  );

  if (!res.ok) {
    throw new Error("Could not search books");
  }

  return res.json();
}

// POST /books
export async function createBook(
  newBook: Omit<Book, "id">
): Promise<Book> {
  const res = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  });

  if (!res.ok) {
    throw new Error("Could not save the book");
  }

  return res.json();
}

// PATCH /books/:id
export async function updateBook(
  id: number,
  updates: Partial<Omit<Book, "id">>
): Promise<Book> {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error("Could not update the book");
  }

  return res.json();
}

// DELETE /books/:id
export async function deleteBook(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Could not delete the book");
  }
}

// =====================================================
// MEMBERS
// =====================================================

// GET /members
export async function fetchMembers(): Promise<Member[]> {
  const res = await fetch(`${API_URL}/members`);

  if (!res.ok) {
    throw new Error("Could not load members");
  }

  return res.json();
}

// GET /members?id=1
export async function fetchMemberById(
  id: number
): Promise<Member> {
  const res = await fetch(`${API_URL}/members?id=${id}`);

  if (!res.ok) {
    throw new Error("Could not load member");
  }

  const matches: Member[] = await res.json();

  if (matches.length === 0) {
    throw new Error(`No member found with id "${id}".`);
  }

  return matches[0];
}

// POST /members
export async function createMember(
  newMember: Omit<Member, "id">
): Promise<Member> {
  const res = await fetch(`${API_URL}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMember),
  });

  if (!res.ok) {
    throw new Error("Could not save the member");
  }

  return res.json();
}

// PATCH /members/:id
export async function updateMember(
  id: number,
  updates: Partial<Omit<Member, "id">>
): Promise<Member> {
  const res = await fetch(`${API_URL}/members/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error("Could not update the member");
  }

  return res.json();
}

// DELETE /members/:id
export async function deleteMember(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/members/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Could not delete the member");
  }
}

// =====================================================
// BORROW RECORDS
// =====================================================

// GET /borrowRecords
export async function fetchBorrowRecords(): Promise<BorrowRecord[]> {
  const res = await fetch(`${API_URL}/borrowRecords`);

  if (!res.ok) {
    throw new Error("Could not load borrow records");
  }

  return res.json();
}

// GET /borrowRecords?id=1
export async function fetchBorrowRecordById(
  id: number
): Promise<BorrowRecord> {
  const res = await fetch(`${API_URL}/borrowRecords?id=${id}`);

  if (!res.ok) {
    throw new Error("Could not load borrow record");
  }

  const matches: BorrowRecord[] = await res.json();

  if (matches.length === 0) {
    throw new Error(`No borrow record found with id "${id}".`);
  }

  return matches[0];
}

// POST /borrowRecords
export async function createBorrowRecord(
  newRecord: Omit<BorrowRecord, "id">
): Promise<BorrowRecord> {
  const res = await fetch(`${API_URL}/borrowRecords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecord),
  });

  if (!res.ok) {
    throw new Error("Could not save the borrow record");
  }

  return res.json();
}

// PATCH /borrowRecords/:id
export async function updateBorrowRecord(
  id: number,
  updates: Partial<Omit<BorrowRecord, "id">>
): Promise<BorrowRecord> {
  const res = await fetch(`${API_URL}/borrowRecords/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error("Could not update the borrow record");
  }

  return res.json();
}

// DELETE /borrowRecords/:id
export async function deleteBorrowRecord(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/borrowRecords/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Could not delete the borrow record");
  }
}