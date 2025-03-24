"use client";
import { ProfileSection } from "@/components/Profile/ProfileSection";
import React, { useEffect, useState } from "react";

interface PageProps {
  params: Promise<{ UserID: string }>; // 確保這裡是Promise
}

export default function ProfileIDPage({ params }: PageProps) {
  const [userID, setUserID] = useState<string | null>(null);

  useEffect(() => {
    // 假設params是Promise，需要解決它
    params.then((data) => {
      setUserID(data.UserID);
    });
  }, [params]);

  return userID ? <ProfileSection UserID={userID} /> : <>LOADING...</>;
}
