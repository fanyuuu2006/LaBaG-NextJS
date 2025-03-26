"use client";
import { Logo } from "./Logo";
import Link from "next/link";
import ModeColors from "@/json/ModeColors.json";
import { ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useNowMode } from "@/context/NowModeContext";
import { Container, Nav, Navbar } from "react-bootstrap";
import {
  HomeOutlined,
  MenuOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useUser } from "@/context/UserContext";

type NavItem = {
  key: string;
  label: ReactNode;
  href: string;
};

export const Header = () => {
  const { User, signOut } = useUser();
  const pathName = usePathname();
  const { NowMode } = useNowMode();

  const NavItems: NavItem[] = useMemo(() => {
    return [
      {
        key: "Home",
        label: (
          <>
            <HomeOutlined /> 首頁
          </>
        ),
        href: "/",
      },
      {
        key: "Rank",
        label: (
          <>
            <TrophyOutlined /> 排行榜
          </>
        ),
        href: "/Rank",
      },
      {
        key: "Profile",
        label: (
          <>
            <UserOutlined /> {User?.name ?? "個人檔案"}
          </>
        ),
        href: `/Profile`,
      },
      {
        key: "Sign",
        label: (
          <div onClick={() => User && signOut()}>{User ? "登出" : "登入"}</div>
        ),
        href: User ? "#" : "/Login",
      },
    ];
  }, [User, signOut]); // 只依赖必要的字段

  return (
    <Navbar
      className="sticky-top"
      expand="md" // medium
      style={{
        zIndex: 1050,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(2px)",
      }}
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} href="/">
          <Logo />
        </Navbar.Brand>

        {/* 漢堡選單按鈕 */}
        <Navbar.Toggle
          aria-controls="navbar-nav"
          style={{
            backgroundColor: "transparent", // 透明背景
            border: "none", // 移除框線
            boxShadow: "none", // 移除陰影
          }}
        >
          <MenuOutlined className="Title" style={{ color: "#FFFFFF" }} />
        </Navbar.Toggle>

        {/* Navbar 選單內容 */}
        <Navbar.Collapse id="navbar-nav">
          <Nav
            className="Content ms-auto"
            style={{
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            {NavItems.map((item) => {
              const isCurrentPath =
                pathName === "/"
                  ? item.href === "/"
                  : pathName.startsWith(item.href) && item.href !== "/";

              return (
                <Nav.Link
                  as={Link}
                  href={item.href}
                  key={item.key}
                  style={{
                    color: isCurrentPath
                      ? ModeColors[NowMode].light
                      : "#FFFFFF",
                  }}
                  aria-current={isCurrentPath ? "page" : undefined}
                >
                  {item.label}
                </Nav.Link>
              );
            })}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
