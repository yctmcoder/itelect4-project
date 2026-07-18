import type { Member } from "../types";

interface MemberCardProps {
  member: Member;
}

function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="member-card">
      <h3>{member.name}</h3>
      <p>{member.email}</p>
      <p>Membership: {member.membershipType}</p>
      <p>{member.active ? "Active" : "Inactive"}</p>
    </div>
  );
}

export default MemberCard;