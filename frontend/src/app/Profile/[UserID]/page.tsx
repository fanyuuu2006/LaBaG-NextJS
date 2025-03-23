"use client";
import { ProfileSection } from "@/components/Profile/ProfileSection";
import React from "react";

export default function ProfilePage({
  params,
}: {
  params: React.Usable<unknown>;
}) {
  const { UserID } = React.use(params) as { UserID: string };
  return <ProfileSection UserID={UserID} />;
}
