import React from "react";
import { useSearchParams } from "react-router-dom";
import ArrowRight from "../Assets/Icons/ArrowRight";
type Props = {

};

export default function BreadCrumbs({}: Props) {
  const [searchParams] = useSearchParams();

  let searchObj = Object.fromEntries(searchParams);
  return (
    <div className="py-5 sm:px-0 px-1 w-full flex flex-row items-center text-xs">
      <span className="text-main-gray">მთავარი</span>
      <ArrowRight className="mx-2" />
      <span className="text-main-gray">ძიება</span>
      <ArrowRight className="mx-2" />
      <span className="text-main-orange">{searchObj.ForRent === "1" ? "ქირავდება" : "იყიდება"}</span>
    </div>
  );
}
