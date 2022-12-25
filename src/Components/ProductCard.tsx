import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CheckSVG from "../Assets/Icons/CheckMark";
import GearBoxSVG from "../Assets/Icons/GearBox";
import GeFlagSVG from "../Assets/Icons/GeFlag";
import GelSVG from "../Assets/Icons/GelSign";
import HeartSVG from "../Assets/Icons/Heart";
import MotorSVG from "../Assets/Icons/Motor";
import NotesSVG from "../Assets/Icons/Notes";
import RunSVG from "../Assets/Icons/Run";
import ScalesSVG from "../Assets/Icons/Scales";
import WheelSVG from "../Assets/Icons/Wheel";
import { EnumTypeFuelType, EnumTypeGearType } from "../Helper/Contsants";
import { IManufacturer, IProduct } from "../Types/general";
import CurrencySwitcher from "./CurrencySwitcher";

type Props = {
  product: IProduct;
  handleGetModelName: (man_id: number, model_id: number) => Promise<string>;
  handleGetManufacturer: (man_id: number) => IManufacturer | undefined;
};

export default function ProductCard({
  product,
  handleGetManufacturer,
  handleGetModelName,
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [modelName, setModelName] = useState("");
  const [manName, setManName] = useState("");

  useEffect(() => {
    handleSetModel();
    handelSetMan();
  }, []);

  const handleSetModel = async () => {
    let model = await handleGetModelName(product.man_id, product.model_id);

    setModelName(model);
  };

  const handelSetMan = async () => {
    let man = handleGetManufacturer(product.man_id)?.man_name;

    setManName(man || "");
  };

  let dateToday = new Date();

  const calculateEngineVolume = () => {
    let engineVolume = product.engine_volume.toString();
    return engineVolume.slice(0, 1) + "." + engineVolume.slice(1, 2);
  };

  const handleReturnCurrency = () => {
    let currency = searchParams.get("currId");

    let value = currency === "3" ? product.price_value : product.price_usd;
    return value.toLocaleString("en");
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
              {`${manName} ${modelName} ${product.car_model}`}
            </span>
            <span className="text-secondary-gray">{product.prod_year} წ</span>
          </div>
          <div className="flex items-center">
            <span
              className={`pr-4 text-[11px] ${
                product.customs_passed ? "text-main-green" : "text-main-orange"
              }`}
            >
              {/* განბაჟება 2,176 ლ */}
              {product.customs_passed ? (
                <div className="flex flex-row items-center">
                  <CheckSVG color="#26B753" />
                  <span className="ml-1.5">განბაჟებული</span>
                </div>
              ) : (
                <>განუბაჟებელი</>
              )}
            </span>
            {product.parent_loc_id === 1 ? <GeFlagSVG /> : null}
            <span className="pl-2 text-xs text-main-gray">
              {product.parent_loc_id === 1
                ? product.location_id === 2
                  ? "თბილისი"
                  : "საქართველოშია"
                : "გზაშია"}
            </span>
          </div>
        </div>
        <div className="flex flex-col text-xs">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between items-center">
              <div className="flex items-center w-[180px]">
                <MotorSVG />
                <span className="ml-3 text-main-black my-2.5">
                  {`${calculateEngineVolume()} ${EnumTypeFuelType[product.fuel_type_id]}`}
                </span>
              </div>

              <div className="flex items-center w-[180px] ml-[30px]">
                <RunSVG />
                <span className="ml-3 text-main-black my-2.5">
                  {product.car_run_km} კმ
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <span className="mr-1 text-xl font-md text-secondary-black">{handleReturnCurrency()}</span>
              <CurrencySwitcher />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex items-center w-[180px]">
              <GearBoxSVG />
              <span className="ml-3 text-main-black my-2.5">
                {EnumTypeGearType[product.gear_type_id]}
              </span>
            </div>
            <div className="flex items-center w-[180px] ml-[30px]">
              <WheelSVG />
              <span className="ml-3 text-main-black my-2.5">
                {product.right_wheel ? "მარჯვენა" : "მარცხენა"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-main-gray text-xs">
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
