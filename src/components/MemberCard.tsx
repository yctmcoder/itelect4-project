// src/components/MemberCard.tsx

import type { Member } from "../types";

interface MemberCardProps {
  member: Member;
}

function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 shadow-md dark:border-blue-800 dark:bg-blue-950">
      <h3 className="text-xl font-bold text-blue-800 dark:text-blue-200">
        📚 Library Member
      </h3>

      <p className="mt-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
        {member.name}
      </p>

      <p className="text-gray-600 dark:text-gray-300">
        Email: {member.email}
      </p>

      <p className="text-gray-600 dark:text-gray-300">
        Membership: {member.membershipType}
      </p>

      <p className="text-gray-600 dark:text-gray-300">
        Status: {member.active ? "Active" : "Inactive"}
      </p>

      <button
        className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        View Member Details
      </button>
    </div>
  );
}

export default MemberCard;