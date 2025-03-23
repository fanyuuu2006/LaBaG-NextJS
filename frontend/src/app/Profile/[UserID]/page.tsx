import { ProfileSection } from "@/components/Profile//ProfileSection";

export default function ProfilePage({ UserID }: { UserID: string }) {
  return <ProfileSection UserID={UserID} />;
}
