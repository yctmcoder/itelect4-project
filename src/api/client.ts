
import type { Book, Member, BorrowRecord } from "../types";

// =====================================================
// API CONFIGURATION
// =====================================================

// Configure VITE_API_URL in .env.local
// Example: VITE_API_URL=https://your-backend.vercel.app
const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:4000"
).replace(/\/$/, "");

// Get JWT token saved after login
function getAuthHeaders(includeJson = false): HeadersInit {
  const token = localStorage.getItem("token");

  return {
    ...(includeJson
      ? { "Content-Type": "application/json" }
      : {}),
    ...(token
      ? { Authorization: `Bearer ${token}` }
      : {}),
  };
}

// Convert MongoDB's _id to the frontend's id
function normalizeBook(
  book: Book & { _id?: string }
): Book {
  return {
    ...book,
    id: book._id ?? book.id,
  };
}

// Display backend errors when available
async function getApiError(
  response: Response,
  fallbackMessage: string
): Promise<Error> {
  const body = await response.json().catch(() => null);

  return new Error(
    body?.message ||
      `${fallbackMessage} (HTTP ${response.status})`
  );
}

// =====================================================
// BOOKS — EXPRESS + MONGODB ATLAS
// =====================================================

// GET /api/books
export async function fetchBooks(): Promise<Book[]> {
  const res = await fetch(`${API_URL}/api/books`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw await getApiError(res, "Could not load books");
  }

  const books = await res.json();

  return books.map((book: Book & { _id?: string }) =>
    normalizeBook(book)
  );
}

// GET /api/books/:id
export async function fetchBookById(
  id: string | number
): Promise<Book> {
  const res = await fetch(`${API_URL}/api/books/${id}`, {
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw await getApiError(res, "Could not find book");
  }

  return normalizeBook(await res.json());
}

// Search books belonging to the logged-in user
export async function fetchBooksByTitle(
  title: string
): Promise<Book[]> {
  const books = await fetchBooks();

  return books.filter((book) =>
    book.title.toLowerCase().includes(title.toLowerCase())
  );
}

// POST /api/books
export async function createBook(
  newBook: Omit<Book, "id">
): Promise<Book> {
  const res = await fetch(`${API_URL}/api/books`, {
    method: "POST",
    headers: getAuthHeaders(true),
    body: JSON.stringify(newBook),
  });

  if (!res.ok) {
    throw await getApiError(res, "Could not save book");
  }

  return normalizeBook(await res.json());
}

// PATCH /api/books/:id
export async function updateBook(
  id: string | number,
  updates: Partial<Omit<Book, "id">>
): Promise<Book> {
  const res = await fetch(`${API_URL}/api/books/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(true),
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw await getApiError(res, "Could not update book");
  }

  return normalizeBook(await res.json());
}

// DELETE /api/books/:id
export async function deleteBook(
  id: string | number
): Promise<void> {
  const res = await fetch(`${API_URL}/api/books/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw await getApiError(res, "Could not delete book");
  }
}

// =====================================================
// MEMBERS — NOT YET IMPLEMENTED IN EXPRESS BACKEND
// =====================================================

// These functions are preserved from your JSON Server
// implementation. They require corresponding backend routes.

// GET /members
export async function fetchMembers(): Promise<Member[]> {
  const res = await fetch(`${API_URL}/members`);

  if (!res.ok) {
    throw new Error("Could not load members");
  }

  return res.json();
}

// GET /members/:id
export async function fetchMemberById(
  id: string | number
): Promise<Member> {
  const res = await fetch(`${API_URL}/members/${id}`);

  if (!res.ok) {
    throw new Error(`No member found with id "${id}".`);
  }

  return res.json();
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
  id: string | number,
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
export async function deleteMember(
  id: string | number
): Promise<void> {
  const res = await fetch(`${API_URL}/members/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Could not delete the member");
  }
}

// =====================================================
// BORROW RECORDS — NOT YET IMPLEMENTED IN EXPRESS BACKEND
// =====================================================

// These functions are preserved from your JSON Server
// implementation. They require corresponding backend routes.

// GET /borrowRecords
export async function fetchBorrowRecords(): Promise<
  BorrowRecord[]
> {
  const res = await fetch(`${API_URL}/borrowRecords`);

  if (!res.ok) {
    throw new Error("Could not load borrow records");
  }

  return res.json();
}

// GET /borrowRecords/:id
export async function fetchBorrowRecordById(
  id: string | number
): Promise<BorrowRecord> {
  const res = await fetch(`${API_URL}/borrowRecords/${id}`);

  if (!res.ok) {
    throw new Error("Could not find borrow record");
  }

  return res.json();
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
  id: string | number,
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
export async function deleteBorrowRecord(
  id: string | number
): Promise<void> {
  const res = await fetch(`${API_URL}/borrowRecords/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Could not delete the borrow record");
  }
}
