import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ArrowBottom from "../Assets/Icons/ArrowBottom";
import CheckSVG from "../Assets/Icons/CheckMark";
import DeleteSVG from "../Assets/Icons/DeleteCross";
import {
  ICategory,
  IBargain,
  IManufacturer,
  IModelData,
  IModel,
} from "../Types/general";

import {
  returnModelData,
  returnModelID,
  returnObjID,
  returnObjName,
} from "../Helper/TypeGuards";

import CustomButton from "./CustomButton";

type Props = {
  label: string;
  filterData:
    | IBargain[]
    | IManufacturer[]
    | IModelData[]
    | ICategory[]
    | IModel[];
  item?: IBargain | IManufacturer | IModelData | ICategory | IModel;
};

interface ILabelArr {
  ForRent: string;
  Mans: string;
  Mods: string;
  Cats: string;
  [key: string]: string;
}

interface IFilterState {
  id: Array<string>;
  name: Array<string>;
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

export default function FilterDropdown({ label, filterData }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const divRef = useRef<any>(null);
  const componentRef = useRef<any>({ isFirstRender: true });

  const [filterState, setFilterState] = useState<IFilterState>({
    id: [],
    name: [],
  });
  const [filterActive, toggleFilterActive] = useState<boolean>(false);

  useEffect(() => {
    if (!filterActive && !componentRef.current.isFirstRender)
      handleSaveParams(false);
  }, [filterActive]);

  useEffect(() => {
    // Functionality for Closing Current Filter on Mouse Outside Click Event
    function handleClickListener(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        toggleFilterActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [divRef]);

  useEffect(() => {
    let searchObj = Object.fromEntries(searchParams);
    
    if (searchObj[label] && filterData.length > 0) {
      handleSetData();
    }
  }, [searchParams, filterData]);

  const handleSetData = () => {
    let existingData: string | null = searchParams.get(
      label === "Mods" ? "Mans" : label
    );
    let stateObj: IFilterState = {
      id: [],
      name: [],
    };
    switch (label) {
      case "ForRent":
        filterData.forEach((item: Props["item"]) => {
          if (existingData && returnObjID(item) === existingData) {
            stateObj.id.push(returnObjID(item));
            stateObj.name.push(returnObjName(item));
          }
        });
        break;
      case "Mans":
        let mansArr =
          existingData
            ?.split("-")
            .map((str) => (str.includes(".") ? str.split(".")[0] : str)) || [];

        filterData.forEach((item: Props["item"]) => {
          if (existingData && mansArr.includes(returnObjID(item))) {
            stateObj.id.push(returnObjID(item));
            stateObj.name.push(returnObjName(item));
          }
        });
        break;
      case "Mods":
        existingData?.split("-").forEach((str) => {
          if (str.includes(".")) {
            let innerModsArr = str.split(".");
            let manID = innerModsArr.shift();
            filterData.forEach((data: Props["item"]) => {
              if (returnObjID(data) === manID) {
                returnModelData(data).forEach((modelItem: IModel) => {
                  if (innerModsArr?.includes(returnObjID(modelItem))) {
                    stateObj.id.push(`${manID}-${returnObjID(modelItem)}`);
                    stateObj.name.push(returnObjName(modelItem));
                  }
                });
              }
            });
          }
        });
        break;
      case "Cats":
        let catArr = existingData?.split(".");
        filterData.forEach((item) => {
          if (catArr?.includes(returnObjID(item))) {
            stateObj.id.push(returnObjID(item));
            stateObj.name.push(returnObjName(item));
          }
        });
        break;
      default:
        break;
    }
    setFilterState(stateObj);
  };

  // Filter State Actions
  const handleFilterToggle = () => {
    if (label === "Mods" && filterData.length === 0) return;
    if (componentRef.current.isFirstRender)
      componentRef.current.isFirstRender = false;
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

    if (
      state.id.includes(
        label === "Mods" ? returnModelID(item) : returnObjID(item)
      )
    ) {
      handleRemoveItem(state, item);
    } else {
      state.id.push(label === "Mods" ? returnModelID(item) : returnObjID(item));
      state.name.push(returnObjName(item));
    }

    setFilterState(state);
  };

  const handleRemoveItem = (state: IFilterState, item: Props["item"]) => {
    let indexOfID = filterState.id.indexOf(
      label === "Mods" ? returnModelID(item) : returnObjID(item)
    );
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
      } else if (label === "Mans" && queryObj[label]) {
        let activeMansArr = [...filterState.id];

        queryObj[label].split(joinArr[label]).forEach((str: string) => {
          if (str.includes(".") && activeMansArr.includes(str.split(".")[0])) {
            let index = activeMansArr.indexOf(str.split(".")[0]);

            activeMansArr.splice(index, 1, str);
          }
        });

        queryObj[label] = activeMansArr.join(joinArr[label]);
      } else {
        queryObj[label] = filterState.id.join(joinArr[label]);
      }

      setSearchParams(queryObj);
    }

    toggleFilterActive(false);
  };

  const generateModelQuery = (reset: boolean) => {
    let queryObj = Object.fromEntries(searchParams);
    let qString: string[] = [];

    let mansArr = queryObj.Mans?.split("-").map((obj) =>
      obj.includes(".") ? obj.split(".")[0] : obj
    );

    if (reset) {
      qString = mansArr;
    } else {
      let modelsArr: string[][] = [];
      filterState.id.forEach((item) => {
        if (typeof item === "string") modelsArr.push(item?.split("-"));
      });

      qString = mansArr?.map((item) => {
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
    <div className="relative" ref={divRef}>
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
            {label === "Mods" ? (
              filterData.map((item) => (
                <Scrollable
                  key={`man-key-${returnObjName(item)}`}
                  label={label}
                  manName={returnObjName(item)}
                  filterData={returnModelData(item)}
                  filterState={filterState}
                  handleSetFilter={handleSetFilter}
                />
              ))
            ) : (
              <Scrollable
                label={label}
                filterData={filterData}
                filterState={filterState}
                handleSetFilter={handleSetFilter}
              />
            )}
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

type ScrollableTypes = {
  key?: string;
  label: string;
  manName?: string;
  filterData: Props["filterData"];
  filterState: IFilterState;
  handleSetFilter: (item: Props["item"]) => void;
};

const Scrollable = ({
  label,
  manName,
  filterData,
  handleSetFilter,
  filterState,
}: ScrollableTypes) => {
  return (
    <React.Fragment>
      {(label === "Mans" || label === "Mods") && (
        <div className="flex flex-row justify-between items-center text-sm px-4 py-2">
          <span>{label === "Mans" ? "პოპულარული" : manName}</span>
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
              filterState.id.includes(
                label === "Mods" ? returnModelID(item) : returnObjID(item)
              )
                ? "bg-main-orange border-main-orange"
                : "bg-white border-[#a4aec1]"
            } mr-3 rounded`}
          >
            <CheckSVG />
          </div>
          <span>{returnObjName(item)}</span>
        </div>
      ))}
    </React.Fragment>
  );
};
