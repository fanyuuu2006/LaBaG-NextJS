"use client";
import { Logo } from "./Logo";
import Link from "next/link";
import ModeColors from "@/json/ModeColors.json";
import { AuthButton } from "./AuthButton";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useNowMode } from "@/app/NowModeContext";
import { Button } from "antd";
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
];

export const Header = () => {
  const pathName = usePathname();
  const { NowMode } = useNowMode();
  return (
    <header>
      <Logo />
      <Button
        className="Menu"
        type="text"
        style={{
          backgroundColor: ModeColors[NowMode].dark,
          color: ModeColors[NowMode].light,
        }}
        icon={<MenuOutlined />}
        size="large"
      />
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
