import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ASAPSVG from "../Assets/Icons/ASAP";
import CheckSVG from "../Assets/Icons/CheckMark";
import CleanHistorySVG from "../Assets/Icons/CleanHistory";
import GearBoxSVG from "../Assets/Icons/GearBox";
import GeFlagSVG from "../Assets/Icons/GeFlag";
import GelSVG from "../Assets/Icons/GelSign";
import HeartSVG from "../Assets/Icons/Heart";
import MotorSVG from "../Assets/Icons/Motor";
import NotesSVG from "../Assets/Icons/Notes";
import PerfectSVG from "../Assets/Icons/Perfect";
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

  const calculateEngineVolume = () => {
    let engineVolume = product.engine_volume.toString();
    return engineVolume.slice(0, 1) + "." + engineVolume.slice(1, 2);
  };

  const handleReturnCurrency = () => {
    let currency = searchParams.get("currId");

    let value = currency === "3" ? product.price_value : product.price_usd;
    return Math.round(value).toLocaleString("en");
  };

  const handleDateRender = () => {
    let dateNow = Date.now();

    let diff = dateNow - Date.parse(product.order_date);

    let suffix = "";

    var diffDays = Math.floor(diff / 86400000); // days
    var diffWeeks = Math.floor(diff / 86400000 / 7); // days
    var diffHrs = Math.floor((diff % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diff % 86400000) % 3600000) / 60000);

    if (diffMins > 0) suffix = `${diffMins} წუთის წინ`;
    if (diffHrs > 0) suffix = `${diffHrs} საათის წინ`;
    if (diffDays > 0) suffix = `${diffDays} დღის წინ`;
    if (diffWeeks > 0) suffix = `${diffWeeks} კვირის წინ`;
    return suffix;
  };

  return (
    <div
      className={`flex flex-col max-w-full sm:grow bg-white sm:rounded-[14px] sm:mb-2.5 box-border border-b sm:border border-[#E2E5EB] ${
        product.prom_color && "!border-main-cyan !bg-secondary-cyan"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center px-3 py-4">
        <div className="sm:hidden block w-full mb-2">
          <ProductHeader
            manName={manName}
            modelName={modelName}
            product={product}
            handleReturnCurrency={handleReturnCurrency}
          />
        </div>
        <div className="w-full sm:w-[182px] sm:h-36 relative">
          <img
            src={`https://static.my.ge/myauto/photos/${product.photo}/thumbs/${product.car_id}_1.jpg?v=${product.photo_ver}`}
            className="rounded-lg w-full h-full"
          />
          <HeartSVG className="sm:hidden absolute top-3 right-3 w-5 h-5" color="#fff" />
        </div>
        <div className="flex flex-col w-full sm:w-auto sm:grow justify-between sm:ml-4 h-36">
          <div className="hidden sm:block">
            <ProductHeader
              manName={manName}
              modelName={modelName}
              product={product}
              handleReturnCurrency={handleReturnCurrency}
            />
          </div>
          <div className="flex flex-col text-xs">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row sm:justify-between items-center w-full sm:w-auto">
                <div className="flex items-center w-2/5 sm:w-[180px]">
                  <MotorSVG />
                  <span className="ml-3 text-main-black my-2.5">
                    {`${calculateEngineVolume()} ${
                      EnumTypeFuelType[product.fuel_type_id]
                    }`}
                  </span>
                </div>

                <div className="flex items-center w-2/5 sm:w-[180px] ml-[30px]">
                  <RunSVG />
                  <span className="ml-3 text-main-black my-2.5">
                    {product.car_run_km} კმ
                  </span>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-row items-center">
                <span className="mr-1 text-xl font-md text-secondary-black">
                  {handleReturnCurrency()}
                </span>
                <CurrencySwitcher />
              </div>
            </div>
            <div className="flex flex-row w-full sm:w-auto">
              <div className="flex items-center w-2/5 sm:w-[180px]">
                <GearBoxSVG />
                <span className="ml-3 text-main-black my-2.5">
                  {EnumTypeGearType[product.gear_type_id]}
                </span>
              </div>
              <div className="flex items-center w-2/5 sm:w-[180px] ml-[30px]">
                <WheelSVG />
                <span className="ml-3 text-main-black my-2.5">
                  {product.right_wheel ? "მარჯვენა" : "მარცხენა"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-main-gray text-xs">
              {`${product.views} ნახვა • ${handleDateRender()}`}
            </div>
            <div className="flex w-[50px] sm:w-[90px] justify-between">
              <NotesSVG /> <ScalesSVG /> <HeartSVG className="hidden sm:block" />
            </div>
          </div>
        </div>
      </div>
      {product.stickers && (
        <div className="flex items-center flex-row border-t border-third-cyan w-full py-2.5 px-4">
          <div className="flex h-fit ml-2 flex-row items-center p-1 rounded-full bg-white">
            <ASAPSVG />
            <span className="ml-1 text-xs">სასწრაფოდ</span>
          </div>
          <div className="flex h-fit ml-2 flex-row items-center p-1 rounded-full bg-white">
            <PerfectSVG />
            <span className="ml-1 text-xs">იდეალურ მდგომარეობაში</span>
          </div>
          <div className="flex h-fit ml-2 flex-row items-center p-1 rounded-full bg-white">
            <CleanHistorySVG />
            <span className="ml-1 text-xs">სუფთა ისტორია</span>
          </div>
        </div>
      )}
    </div>
  );
}

interface IProductHeader {
  manName: string;
  modelName: string;
  product: IProduct;
  handleReturnCurrency: () => string;
}

const ProductHeader = ({
  manName,
  modelName,
  product,
  handleReturnCurrency,
}: IProductHeader) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div className="flex flex-row sm:justify-between items-center text-sm font-medium">
        <span className="text-secondary-black mr-2">
          {`${manName} ${modelName} ${product.car_model}`}
        </span>
        <span className="text-secondary-gray">{product.prod_year} წ</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="sm:hidden flex flex-row items-center mt-2.5">
          <span className="mr-1 text-xl font-md text-secondary-black">
            {handleReturnCurrency()}
          </span>
          <CurrencySwitcher />
        </div>
        <div className="flex flex-row items-center">
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
    </div>
  );
};
