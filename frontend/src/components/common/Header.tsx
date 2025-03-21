"use client";
import { Logo } from "./Logo";
import Link from "next/link";
import ModeColors from "@/json/ModeColors.json";
import { AuthButton } from "./AuthButton";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { useNowMode } from "@/app/NowModeContext";
import { MenuOutlined } from "@ant-design/icons";

type NavItem = {
  key: string;
  label: ReactNode;
  href: string;
};

const NavItems: NavItem[] = [
  {
    key: "Home",
    label: <>首頁</>,
    href: "/",
  },
  {
    key: "Rank",
    label: <>排行</>,
    href: "/Rank",
  },
  {
    key: "Profile",
    label: <>個人檔案</>,
    href: "/Profile",
  },
];

export const Header = () => {
  const pathName = usePathname();
  const { NowMode } = useNowMode();
  const [IsOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header>
      <div>
        <Logo />
        <MenuOutlined
          className="Title Menu"
          style={{
            color: "#FFFFFF",
            cursor: "pointer",
          }}
          onClick={() => {
            setIsOpen(!IsOpen);
          }}
        />
      </div>
      {IsOpen &&
        NavItems.map((item: NavItem) => {
          const isCurrentPath = pathName === item.href;
          return (
            <Link
              className="Menu Label"
              style={{
                transition: "ease-in-out 0.5s",
                textAlign: "center",
                width: "100%",
                color: isCurrentPath ? ModeColors[NowMode].light : "#FFFFFF",
                padding: "0.5em 0"
              }}
              key={item.key}
              href={item.href}
              aria-current={isCurrentPath ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}

      <nav role="navigation">
        {NavItems.map((item: NavItem) => {
          const isCurrentPath = pathName === item.href;
          return (
            <Link
              className="Content"
              style={{
                color: isCurrentPath ? ModeColors[NowMode].light : "#FFFFFF",
              }}
              key={item.key}
              href={item.href}
              aria-current={isCurrentPath ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
        <AuthButton />
      </nav>
    </header>
  );
};
