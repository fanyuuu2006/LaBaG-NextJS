import { ProfileSection } from "@/components/Profile/ProfileSection";
import React from "react";

interface PageProps {
  params: { UserID: string }; 
}

export default function ProfilePage({ params }: PageProps) {
  const { UserID } = params;  // 解構出 UserID
  return <ProfileSection UserID={UserID} />;
}
