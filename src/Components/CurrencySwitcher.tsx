import { useState } from "react";
import DollarSVG from "../Assets/Icons/DollarSign";
import GelSVG from "../Assets/Icons/GelSign";

type Props = {};

export default function CurrencySwitcher({}: Props) {
  const [isGel, toggleIsGel] = useState(true);

  return (
    <div className="w-[46px] h-6 border relative rounded-full">
      <div
        className={`flex justify-center transition duration-150 cursor-pointer absolute top-[-1px] left-[-1px] items-center w-6 h-6 rounded-full ${
          isGel ? "bg-secondary-black" : "bg-transparent"
        }`}
        onClick={() => toggleIsGel(true)}
      >
        <GelSVG color={isGel ? "#fff" : "#8C929B"} />
      </div>
      <div
        className={`flex justify-center transition duration-150 cursor-pointer absolute top-[-1px] right-[-1px] items-center w-6 h-6 rounded-full ${
          isGel ? "bg-transparent" : "bg-secondary-black"
        }`}
        onClick={() => toggleIsGel(false)}
      >
        <DollarSVG color={isGel ? "#8C929B" : "#fff"} />
      </div>
    </div>
  );
}
