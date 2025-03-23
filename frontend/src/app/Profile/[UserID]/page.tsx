"use client"
import { ProfileSection } from "@/components/Profile/ProfileSection";
import React from "react";

interface PageProps {
  params: Promise<{ UserID: string }>;  // 確保這裡是Promise
}

export default function ProfilePage({ params }: PageProps) {
  const [userID, setUserID] = React.useState<string | null>(null);

  React.useEffect(() => {
    // 假設params是Promise，需要解決它
    params.then((data) => {
      setUserID(data.UserID);
    });
  }, [params]);


  return <ProfileSection UserID={userID} />;
}
