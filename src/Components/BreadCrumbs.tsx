import React from "react";
import ArrowRight from "../Assets/Icons/ArrowRight";
type Props = {};

export default function BreadCrumbs({}: Props) {
  // TODO: Add Render Path with QueryString

  return (
    <div className="py-5 w-full flex flex-row items-center text-xs">
      <span className="text-main-gray">მთავარი</span>
      <ArrowRight className="mx-2" />
      <span className="text-main-gray">ძიება</span>
      <ArrowRight className="mx-2" />
      <span className="text-main-orange">იყიდება</span>
    </div>
  );
}
