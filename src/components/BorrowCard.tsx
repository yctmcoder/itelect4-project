import type { BorrowRecord } from "../types";

interface BorrowRecordCardProps {
  record: BorrowRecord;
  children?: React.ReactNode;
}

const BorrowRecordCard: React.FC<BorrowRecordCardProps> = ({
  record,
  children,
}) => {
  return (
    <div className="borrow-record-card">
      <h3>Borrow Record #{record.id}</h3>
      <p>Book ID: {record.bookId}</p>
      <p>Member ID: {record.memberId}</p>
      <p>Borrowed: {record.borrowDate.toLocaleDateString()}</p>
      <p>Return: {record.returnDate.toLocaleDateString()}</p>

      {children}
    </div>
  );
};

export default BorrowRecordCard;