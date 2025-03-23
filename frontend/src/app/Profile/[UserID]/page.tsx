"use client";
import { ProfileSection } from "@/components/Profile/ProfileSection";
import React from "react";

interface PageProps {
  params: Promise<{ UserID: string }>; // 確保這裡的類型正確
}

export default function ProfilePage({ params }: PageProps) {
  const { UserID } = React.use(params) as { UserID: string };
  return <ProfileSection UserID={UserID} />;
}
