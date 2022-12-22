import { SetStateAction, useState, Dispatch } from "react";
import ArrowBottom from "../Assets/Icons/ArrowBottom";
import { ICategory, IBargain, IManufacturer, IModel } from "../Types/general";

type Props = {
  label: string;
  filterData: IBargain[] | IManufacturer[] | ICategory[];
};

interface ILabelArr {
  bargainType: string;
  manufacturer: string;
  category: string;
  [key: string]: string;
}

const labelArr: ILabelArr = {
  bargainType: "გარიგების ტიპი",
  manufacturer: "მწარმოებელი",
  models: "მოდელი",
  category: "კატეგორია",
};

export default function CustomDropdown({ label, filterData }: Props) {
  const [filterState, setFilterState] = useState<string>("");
  const [filterID, setFilterID] = useState<number | null>(null);

  const [filterActive, toggleFilterActive] = useState<boolean>(false);

  const handleFilterToggle = () => {
    if (label === "models" && filterData.length === 0) return;
    toggleFilterActive(!filterActive);
  };

  // User Defined Type-Guards
  function isManufacturer(obj: any): obj is IManufacturer {
    return "man_id" in obj;
  }

  function isModel(obj: any): obj is IModel {
    return "model_name" in obj;
  }

  function isCategory(obj: any): obj is ICategory {
    return "category_id" in obj;
  }

  function isBargain(obj: any): obj is IBargain {
    return "name" in obj;
  }

  return (
    <div className="relative">
      <span className="text-xs">{labelArr[label]}</span>

      <div
        onClick={handleFilterToggle}
        className="flex flex-row justify-between items-center cursor-pointer w-full mt-2 mb-5 border border-[#C2C9D8] hover:border-[#6F7383] rounded-lg text-[13px] py-[13.5px] px-3"
      >
        <span className="text-main-gray">
          {filterState || `ყველა ${labelArr[label]}`}
        </span>

        <div className={`transition duration-300 ${filterActive && 'rotate-180'}`}>
          <ArrowBottom />
        </div>
      </div>

      {filterActive && (
        <div className="absolute top-[90px] w-full bg-transparent z-10">
          <div className="w-full py-2 border rounded-xl bg-white box-border max-h-[300px] overflow-x-scroll">
            {(label === "manufacturer" || label === "models") && (
              <div className="flex flex-row justify-between items-center text-sm px-4 py-2">
                <span>{label === "manufacturer" ? "პოპულარული" : "BMW"}</span>
                <div className="h-[1px] w-14 bg-[#e9e9f0] text-[#454857]"></div>
              </div>
            )}

            {filterData.map(
              (item: IBargain | IManufacturer | IModel | ICategory) => (
                <div className="flex flex-row cursor-pointer items-center px-4 py-2 text-main-gray hover:text-secondary-black">
                  <div className="w-[14px] h-[14px] border border-[#a4aec1] bg-white mr-3 rounded"></div>
                  {isBargain(item) && <span>{item.name}</span>}
                  {isManufacturer(item) && <span>{item.man_name}</span>}
                  {isModel(item) && <span>{item.model_name}</span>}
                  {isCategory(item) && <span>{item.title}</span>}
                </div>
              )
            )}

            <div>{/* Buttons */}</div>
          </div>
        </div>
      )}
    </div>
  );
}
