import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ArrowBottom from "../Assets/Icons/ArrowBottom";
import { ICategory, IBargain, IManufacturer, IModel } from "../Types/general";
import CustomButton from "./CustomButton";

type Props = {
  label: string;
  filterData: IBargain[] | IManufacturer[] | IModel[] | ICategory[];
  item?: IBargain | IManufacturer | IModel | ICategory;
};

interface ILabelArr {
  bargainType: string;
  manufacturer: string;
  category: string;
  [key: string]: string;
}

interface IFilterState {
  id: Array<string | number | undefined>;
  name: Array<string | undefined>;
}

const initialFilterState: IFilterState = {
  id: [],
  name: [],
};

const labelArr: ILabelArr = {
  bargainType: "გარიგების ტიპი",
  manufacturer: "მწარმოებელი",
  models: "მოდელი",
  category: "კატეგორია",
};

export default function CustomDropdown({ label, filterData }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterState, setFilterState] =
    useState<IFilterState>(initialFilterState);
  const [filterActive, toggleFilterActive] = useState<boolean>(false);

  useEffect(() => {
    console.log(filterState, "[FS]");
  }, [filterState]);

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

  const returnObjID = (item: Props["item"]) => {
    let propID;

    if (isBargain(item)) propID = item.id;
    if (isManufacturer(item)) propID = item.man_id;
    if (isModel(item)) propID = item.model_id;
    if (isCategory(item)) propID = item.category_id;

    return propID;
  };

  const returnObjName = (item: Props["item"]) => {
    let propName;

    if (isBargain(item)) propName = item.name;
    if (isManufacturer(item)) propName = item.man_name;
    if (isModel(item)) propName = item.model_name;
    if (isCategory(item)) propName = item.title;

    return propName;
  };

  // Filter State Actions
  const handleFilterToggle = () => {
    if (label === "models" && filterData.length === 0) return;
    toggleFilterActive(!filterActive);
  };

  const handleResetFilter = () => {};

  const handleSetFilter = (item: Props["item"]) => {
    // Using {...filterState} will Share State Between Reusable Components
    let state: IFilterState = {
      id: [...filterState.id],
      name: [...filterState.name],
    };

    state.id.push(returnObjID(item));
    state.name.push(returnObjName(item));

    setFilterState(state);
  };

  const handleSaveParams = () => {
    console.log(filterState, "[FILTER STATE]");
  };

  const handleRenderPlaceholder = () => {
    if (filterState.name.length === 0) {
      return false;
    }

    if (filterState.name.length === 1) {
      return filterState.name.map((namespace) => `${namespace} `);
    }

    return filterState.name.map((namespace) => `${namespace}, `);
  };

  return (
    <div className="relative">
      <span className="text-xs">{labelArr[label]}</span>

      <div
        onClick={handleFilterToggle}
        className="flex flex-row justify-between items-center cursor-pointer w-full mt-2 mb-5 border border-[#C2C9D8] hover:border-[#6F7383] rounded-lg text-[13px] py-[13.5px] px-3"
      >
        <span className="text-main-gray truncate">
          {handleRenderPlaceholder() || `ყველა ${labelArr[label]}`}
        </span>

        <div
          className={`transition duration-300 ${filterActive && "rotate-180"}`}
        >
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

            {filterData.map((item: Props["item"]) => (
              <div
                key={returnObjID(item)}
                onClick={() => handleSetFilter(item)}
                className="flex flex-row cursor-pointer items-center px-4 py-2 text-main-gray hover:text-secondary-black"
              >
                <div className="w-[14px] h-[14px] border border-[#a4aec1] bg-white mr-3 rounded"></div>
                <span>{returnObjName(item)}</span>
              </div>
            ))}

            <div>
              <CustomButton onClick={handleSaveParams} text="არჩევა" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
