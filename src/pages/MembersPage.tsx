// src/pages/MembersPage.tsx

import { useQuery } from "@tanstack/react-query";
import { fetchMembers } from "../api/client";
import MemberCard from "../components/MemberCard";
import type { Member } from "../types";

function MembersPage() {
  const { data: members, isPending, isError } = useQuery<Member[]>({
    queryKey: ["members"],
    queryFn: fetchMembers,
  });

  if (isPending) {
    return <div className="p-6 text-gray-500">Loading members...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-red-600 bg-red-50 rounded-lg">
        Failed to load members.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Members Directory
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members?.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export default MembersPage;