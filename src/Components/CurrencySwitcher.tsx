import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DollarSVG from "../Assets/Icons/DollarSign";
import GelSVG from "../Assets/Icons/GelSign";

type Props = {};

export default function CurrencySwitcher({}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isGel, toggleIsGel] = useState(true);

  let searchObj = Object.fromEntries(searchParams);
  useEffect(() => {
    const currID = searchObj.currId;

    if (currID) {
      toggleIsGel(JSON.parse(currID) === 3);
    } else {
      searchObj.currId = "3";
      setSearchParams(searchObj);
    }
  }, [searchParams]);

  const handleToggleGel = () => {
    searchObj.currId = isGel ? "1" : "3";
    setSearchParams(searchObj);
  };

  return (
    <div
      className="w-[46px] h-6 border relative rounded-full"
      onClick={handleToggleGel}
    >
      <div
        className={`flex justify-center transition duration-150 cursor-pointer absolute top-[-1px] left-[-1px] items-center w-6 h-6 rounded-full ${
          isGel ? "bg-secondary-black" : "bg-transparent"
        }`}
      >
        <GelSVG color={isGel ? "#fff" : "#8C929B"} />
      </div>
      <div
        className={`flex justify-center transition duration-150 cursor-pointer absolute top-[-1px] right-[-1px] items-center w-6 h-6 rounded-full ${
          isGel ? "bg-transparent" : "bg-secondary-black"
        }`}
      >
        <DollarSVG color={isGel ? "#8C929B" : "#fff"} />
      </div>
    </div>
  );
}
