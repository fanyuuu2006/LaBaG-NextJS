import { ProfileSection } from "@/components/Profile/ProfileSection";
import React from "react";

interface PageProps {
  params: { UserID: string };  // 改為同步的 params
}

export default function ProfilePage({ params }: PageProps) {
  const { UserID } = params;  // 直接解構出 UserID
  return <ProfileSection UserID={UserID} />;
}
