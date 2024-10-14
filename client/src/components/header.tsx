import { ModeToggle } from "@/components/ModeToggle";
import React from "react";
import ButtonLogout from "@/components/button-logout";

export default function Header() {
  return (
    <div>
      <ModeToggle />
      <li>
        <ButtonLogout />
      </li>
    </div>
  );
}
