"use client";
import { Logo } from "./Logo";
import Link from "next/link";
import ModeColors from "@/json/ModeColors.json";
import { AuthButton } from "./AuthButton";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useNowMode } from "@/app/NowModeContext";
import { Container, Nav, Navbar } from "react-bootstrap";
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
              textAlign: "center",
            }}
          >
            {NavItems.map((item) => {
              const isCurrentPath = pathName === item.href;
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

          {/* 置中 AuthButton */}
          <div
            style={{
              margin: "0 0.5em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <AuthButton
              className="Note"
              style={{
                padding: "1em",
              }}
            />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
