"use client";
import React from "react";
import { FloatingNav } from "../components/floating-navbar";

export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/"
    },
    {
      name: "Reports",
      link: "/about"

    },
    {
      name: "Inbox",
      link: "/contact"

    },
  ];
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}