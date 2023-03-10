import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import { periodsArr, sortsArr } from "../Helper/Contsants";

import ArrowBottom from "../Assets/Icons/ArrowBottom";

type Props = {
  label: string;
  handleSearch: VoidFunction
};

interface ISortObj {
  title: string;
  id: string;
  [key: string]: string;
}

export default function SortDropdown({ label, handleSearch }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const divRef = useRef<any>(null);

  const [sortActive, toggleSortActive] = useState(false);
  const [sortID, setSortID] = useState(
    label === "Period" ? "" : sortsArr[0].id
  );
  const [sortValue, setSortValue] = useState(
    label === "Period" ? "პერიოდი" : sortsArr[0].title
  );

  let searchObj = Object.fromEntries(searchParams);

  const mappableData = label === "Period" ? periodsArr : sortsArr;

  useEffect(() => {
    setInitialValues();
  }, []);

  useEffect(() => {
    // Functionality for Closing Current Filter on Mouse Outside Click Event
    function handleClickListener(event: MouseEvent) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        toggleSortActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, [divRef]);

  const setInitialValues = () => {
    if (searchObj[label]) {
      let sortName = mappableData.find(
        (item: ISortObj) => item.id === searchObj[label]
      );
      setSortID(searchObj[label]);
      setSortValue(sortName?.title || "");
    }
  };

  const handleSetSortValue = (item: ISortObj) => {
    setSortValue(item.title);
    setSortID(item.id);
    handleSortToggle();

    searchObj[label] = item.id;

    setSearchParams(searchObj);
    handleSearch();
  };

  const handleSortToggle = () => {
    toggleSortActive(!sortActive);
  };

  return (
    <div
      onClick={handleSortToggle}
      ref={divRef}
      className="px-1 sm:px-3 py-2 bg-white relative border rounded-md"
    >
      <div className="cursor-pointer flex flex-row justify-between items-center">
        <span className="text-xs sm:text-sm text-main-gray mr-3">{sortValue}</span>

        <div>
          <ArrowBottom
            className={`transition duration-300 ${sortActive && "rotate-180 "}`}
          />
        </div>
      </div>

      {sortActive && (
        <div className="w-[180px] absolute right-0 top-10 bg-white w-fit py-1 rounded-md z-20">
          {mappableData.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSetSortValue(item)}
              className="text-sm transition duration-100 max-h-8 px-4 py-1 text-main-gray cursor-pointer hover:bg-custom-gray hover:text-main-black"
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
