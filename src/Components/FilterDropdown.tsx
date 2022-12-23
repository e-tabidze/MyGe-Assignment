import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ArrowBottom from "../Assets/Icons/ArrowBottom";
import CheckSVG from "../Assets/Icons/CheckMark";
import DeleteSVG from "../Assets/Icons/DeleteCross";
import {
  ICategory,
  IBargain,
  IManufacturer,
  IModelData,
} from "../Types/general";

import { returnObjID, returnObjName } from "../Helper/TypeGuards";

import CustomButton from "./CustomButton";

type Props = {
  label: string;
  filterData: IBargain[] | IManufacturer[] | IModelData[] | ICategory[];
  item?: IBargain | IManufacturer | IModelData | ICategory;
};

interface ILabelArr {
  ForRent: string;
  Mans: string;
  Mods: string;
  Cats: string;
  [key: string]: string;
}

interface IFilterState {
  id: Array<string | number | undefined>;
  name: Array<string | undefined>;
}

const labelArr: ILabelArr = {
  ForRent: "გარიგების ტიპი",
  Mans: "მწარმოებელი",
  Mods: "მოდელი",
  Cats: "კატეგორია",
};

const joinArr: ILabelArr = {
  ForRent: "",
  Mans: "-",
  Mods: ".",
  Cats: ".",
};

export default function CustomDropdown({ label, filterData }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const componentRef = useRef<any>(null);

  const [filterState, setFilterState] = useState<IFilterState>({
    id: [],
    name: [],
  });
  const [filterActive, toggleFilterActive] = useState<boolean>(false);

  useEffect(() => {
    if (!filterActive) handleSaveParams(false);
  }, [filterActive]);

  useEffect(() => {
    // Functionality for Closing Current Filter on Mouse Outside Click Event
    function handleClickListener(event: MouseEvent) {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        toggleFilterActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [componentRef]);

  // Filter State Actions
  const handleFilterToggle = () => {
    if (label === "Mods" && filterData.length === 0) return;
    toggleFilterActive(!filterActive);
  };

  const handleResetFilter = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setFilterState({ id: [], name: [] });
    handleSaveParams(true);
  };

  const handleSetFilter = (item: Props["item"]) => {
    let state: IFilterState = { ...filterState };

    if (label === "ForRent" && !state.id.includes(returnObjID(item))) {
      state = { id: [], name: [] };
    }

    if (state.id.includes(returnObjID(item))) {
      handleRemoveItem(state, item);
    } else {
      state.id.push(returnObjID(item));
      state.name.push(returnObjName(item));
    }

    setFilterState(state);
  };

  const handleRemoveItem = (state: IFilterState, item: Props["item"]) => {
    let indexOfID = filterState.id.indexOf(returnObjID(item));
    let indexOfName = filterState.name.indexOf(returnObjName(item));

    state.id.splice(indexOfID, 1);
    state.name.splice(indexOfName, 1);
  };

  const handleSaveParams = (reset: boolean) => {
    if (label === "Mods") {
      generateModelQuery(reset);
    } else {
      let queryObj = Object.fromEntries(searchParams);
      if (filterState.id.length === 0 || reset) {
        delete queryObj[label];
      } else {
        queryObj[`${label}`] = filterState.id.join(joinArr[label]);
      }

      setSearchParams(queryObj);
    }

    toggleFilterActive(false);
  };

  const generateModelQuery = (reset: boolean) => {
    let queryObj = Object.fromEntries(searchParams);
    let qString: string[] = [];

    let mansObj = queryObj.Mans?.split("-").map((obj) =>
      obj.includes(".") ? obj.split(".")[0] : obj
    );

    if (reset) {
      qString = mansObj;
    } else {
      let modelsArr = filterState.id.map((item) =>
        typeof item === "string" ? item?.split("-") : ""
      );

      qString = mansObj?.map((item) => {
        let innerStr = item;

        modelsArr.forEach((model) => {
          if (model.length > 0) {
            if (item === model[0]) {
              innerStr += `.${model[1]}`;
            }
          }
        });

        return innerStr;
      });
    }
    queryObj.Mans = qString?.join("-");

    setSearchParams(queryObj);
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
    <div className="relative" ref={componentRef}>
      <span className="text-xs">{labelArr[label]}</span>

      <div
        onClick={handleFilterToggle}
        className="flex flex-row justify-between items-center cursor-pointer w-full mt-2 mb-5 border border-[#C2C9D8] hover:border-[#6F7383] rounded-lg text-[13px] py-[13.5px] px-3 z-10"
      >
        <span className="text-main-gray truncate pr-1 max-w-[150px]">
          {handleRenderPlaceholder() || `ყველა ${labelArr[label]}`}
        </span>

        <div
          className={`flex justify-center items-center w-6 h-6 transition duration-300 rounded-full ${
            filterState.id.length > 0 ? "hover:bg-custom-gray" : ""
          }`}
        >
          {filterState.id.length > 0 ? (
            <span onClick={handleResetFilter}>
              <DeleteSVG />
            </span>
          ) : (
            <ArrowBottom
              className={`transition duration-300 ${
                filterActive && "rotate-180 "
              }`}
            />
          )}
        </div>
      </div>

      {filterActive && (
        <div className="absolute top-[90px] w-full border rounded-xl bg-white box-border z-10">
          <div className="w-full py-2 max-h-[300px] overflow-x-scroll">
            {(label === "Mans" || label === "Mods") && (
              <div className="flex flex-row justify-between items-center text-sm px-4 py-2">
                <span>{label === "Mans" ? "პოპულარული" : "BMW"}</span>
                <div className="h-[1px] w-14 bg-[#e9e9f0] text-[#454857]"></div>
              </div>
            )}

            {filterData.map((item: Props["item"]) => (
              <div
                key={returnObjID(item)}
                onClick={() => handleSetFilter(item)}
                className="flex flex-row cursor-pointer items-center px-4 py-2 text-main-gray hover:text-secondary-black"
              >
                <div
                  className={`flex justify-center items-center w-[14px] h-[14px] border  ${
                    filterState.id.includes(returnObjID(item))
                      ? "bg-main-orange border-main-orange"
                      : "bg-white border-[#a4aec1]"
                  } mr-3 rounded`}
                >
                  <CheckSVG />
                </div>
                <span>{returnObjName(item)}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-row justify-between items-center w-full p-2 border-t">
            <span
              onClick={handleResetFilter}
              className="w-fit bg-transparent border-none text-xs text-main-gray px-2 cursor-pointer"
            >
              ფილტრის გასუფთავება
            </span>
            <CustomButton
              onClick={() => handleSaveParams(false)}
              text="არჩევა"
              wrapperClassName="px-2 py-1 text-xs"
            />
          </div>
        </div>
      )}
    </div>
  );
}
