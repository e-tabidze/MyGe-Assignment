import React from "react";
import LogoSVG from "../Assets/Icons/Logo";

type Props = {};

export default function Header({}: Props) {
  return (
    <div className="w-full p-[17px] bg-white-900">
      <div className="max-w-[1050px] mx-auto">
        <LogoSVG />
      </div>
    </div>
  );
}
