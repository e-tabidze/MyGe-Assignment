import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CarSVG from "../Assets/Icons/Car";
import TractorSVG from "../Assets/Icons/Tractor";
import MotoSVG from "../Assets/Icons/Moto";

type Props = {};

const colorScheme = { inactive: "#8C929B", active: "#FD4100" };
const bgColorScheme = {
  inactive: "border-b-[#E2E5EB] bg-[#F9F9FB]",
  active: "border-b-[#FD4100] bg-white",
};

export default function ClickSelector({}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicleType, setVehicleType] = useState("0");

  useEffect(() => {
    handleSetInitial();
  }, []);

  const handleSetInitial = () => {
    let searchObj = Object.fromEntries(searchParams);

    if (searchObj.vehicleType) {
      setVehicleType(searchObj.vehicleType);
    } else {
      searchObj.vehicleType = vehicleType;
      setSearchParams(searchObj);
    }
  };

  const handleSetQuery = (typeID: string) => {
    let searchObj = Object.fromEntries(searchParams);

    searchObj.vehicleType = typeID;

    delete searchObj.Mans;
    delete searchObj.Cats;

    setVehicleType(typeID);
    setSearchParams(searchObj);
  };

  return (
    <div className="w-full flex flex-row">
      <div
        onClick={() => handleSetQuery("0")}
        className={`flex items-center justify-center grow sm:w-[83px] ${
          vehicleType === "0" ? bgColorScheme.active : bgColorScheme.inactive
        } h-12 rounded-tl-[11px] cursor-pointer transition duration-300 hover:bg-white border-b`}
      >
        <CarSVG
          color={
            vehicleType === "0" ? colorScheme.active : colorScheme.inactive
          }
        />
      </div>
      <div
        onClick={() => handleSetQuery("1")}
        className={`flex items-center justify-center ${
          vehicleType === "1" ? bgColorScheme.active : bgColorScheme.inactive
        } grow sm:w-[83px] h-12  cursor-pointer transition duration-300 hover:bg-white box-border border-x border-b`}
      >
        <TractorSVG
          color={
            vehicleType === "1" ? colorScheme.active : colorScheme.inactive
          }
        />
      </div>
      <div
        onClick={() => handleSetQuery("2")}
        className={`flex items-center justify-center ${
          vehicleType === "2" ? bgColorScheme.active : bgColorScheme.inactive
        } grow sm:w-[83px] h-12  rounded-tr-[11px] transition duration-300 hover:bg-white cursor-pointer border-b`}
      >
        <MotoSVG
          color={
            vehicleType === "2" ? colorScheme.active : colorScheme.inactive
          }
        />
      </div>
    </div>
  );
}
