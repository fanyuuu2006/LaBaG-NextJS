"use client"
import { ProfileSection } from "@/components/Profile/ProfileSection";

export default function ProfilePage({ params }: { params: { UserID: string } }) {
  return <ProfileSection UserID={params.UserID} />;
}