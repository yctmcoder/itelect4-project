// src/data/mockData.ts

import type {
  Member,
  BorrowRecord,
} from "../types";

// =====================================================
// MOCK MEMBER
// =====================================================

// There is no /users endpoint yet.
// The member remains hard-coded for now.

export const member: Member = {
  id: 101,
  name: "Juan dela Cruz",
  email: "juan@example.com",
  membershipType: "student",
  active: true,
};

// =====================================================
// MOCK BORROW RECORD
// =====================================================

// Borrow record remains hard-coded for now.
// It can be moved to json-server later when the
// borrow-record API is implemented.

export const borrowRecord: BorrowRecord = {
  id: 1,
  memberId: 101,
  bookId: 1,
  borrowDate: new Date(),
  returnDate: new Date(),
  fine: 0,
};