"use client";
import { ProfileSection } from "@/components/Profile/ProfileSection";
import React, { useEffect, useState } from "react";

interface PageProps {
  params: Promise<{ UserID: string }>;
}

export default function ProfileIDPage({ params }: PageProps) {
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    params.then((data) => {
      setUserID(data.UserID);
    });
  }, [params]);

  return userID ? <ProfileSection UserID={userID} /> : <>載入中...</>;
}
