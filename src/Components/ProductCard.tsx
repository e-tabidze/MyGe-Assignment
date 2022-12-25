import React, { useEffect } from "react";
import GearBoxSVG from "../Assets/Icons/GearBox";
import GeFlagSVG from "../Assets/Icons/GeFlag";
import GelSVG from "../Assets/Icons/GelSign";
import HeartSVG from "../Assets/Icons/Heart";
import MotorSVG from "../Assets/Icons/Motor";
import NotesSVG from "../Assets/Icons/Notes";
import RunSVG from "../Assets/Icons/Run";
import ScalesSVG from "../Assets/Icons/Scales";
import WheelSVG from "../Assets/Icons/Wheel";
import { EnumTypeGearType } from "../Helper/Contsants";
import { IManufacturer, IProduct } from "../Types/general";
import CurrencySwitcher from "./CurrencySwitcher";

type Props = {
  product: IProduct;
  handleGetManufacturer: () => IManufacturer | undefined;
  setManId: React.Dispatch<React.SetStateAction<any>>;
  manId: string;
};

export default function ProductCard({
  product,
  handleGetManufacturer,
  setManId,
}: Props) {
  useEffect(() => {
    setManufacturerId();
  }, []);

  const setManufacturerId = () => setManId(handleGetManufacturer()?.man_id);

  let dateToday = new Date();

  const calculateEngineVolume = () => {
    let engineVolume = product.engine_volume.toString();
    return engineVolume.slice(0, 1) + "." + engineVolume.slice(1, 2);
  };
  return (
    <div className="flex flex-row items-center max-w-[780px] bg-white rounded-[14px] box-border border border-[#E2E5EB] px-3 py-4 mb-2.5">
      <div className="!w-[182px] !h-[144px]">
        <img
          src={`https://static.my.ge/myauto/photos/${product.photo}/thumbs/${product.car_id}_1.jpg?v=${product.photo_ver}`}
          className="rounded-lg w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-between ml-4 h-[144px] w-[558px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row justify-between items-center text-sm font-medium">
            <span className="text-secondary-black mr-2">
              {handleGetManufacturer()?.man_name} {product.car_model}
            </span>
            <span className="text-secondary-gray">{product.prod_year} წ</span>
          </div>
          <div className="flex items-center">
            <span className="pr-4 text-[11px] text-main-orange">
              განბაჟება 2,176 ლ
            </span>
            <GeFlagSVG />
            <span className="pl-2 text-sm text-main-gray">გზაშია</span>
          </div>
        </div>
        <div className="flex">
          <div className="grow">
            <div className="flex items-center">
              <MotorSVG />
              <span className="ml-3 text-sm text-main-black my-2.5">
                {calculateEngineVolume()}
              </span>
            </div>
            <div className="flex items-center">
              <GearBoxSVG />
              <span className="ml-3 text-sm text-main-black my-2.5">
                {EnumTypeGearType[product.gear_type_id]}
              </span>
            </div>
          </div>
          <div className="grow">
            <div className="flex items-center">
              <RunSVG />
              <span className="ml-3 text-sm text-main-black my-2.5">
                {product.car_run_km} კმ
              </span>
            </div>
            <div className="flex items-center">
              <WheelSVG />
              <span className="ml-3 text-sm text-main-black my-2.5">
                {product.right_wheel ? "მარჯვენა" : "მარცხენა"}
              </span>
            </div>
          </div>
          <div className="grow flex justify-end pt-7">
            <span className="pr-2"> {product.price.toLocaleString("en")} </span>
            <CurrencySwitcher />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-main-gray text-sm">
            {product.views} ნახვა •{" "}
            {Math.ceil(
              // @ts-ignore
              (Date.parse(dateToday) - Date.parse(product.order_date)) /
                86400000
            )}{" "}
            დღის წინ
          </div>
          <div className="flex w-[90px] justify-between">
            <NotesSVG /> <ScalesSVG /> <HeartSVG />
          </div>
        </div>
      </div>
    </div>
  );
}
