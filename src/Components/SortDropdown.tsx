import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { periodsArr, sortsArr } from "../Helper/Contsants";

import ArrowBottom from "../Assets/Icons/ArrowBottom";

type Props = {
  label: string;
};

interface ISortObj {
  title: string;
  id: string;
  [key: string]: string;
}

export default function SortDropdown({ label }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

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

  const setInitialValues = () => {
    if (searchObj[label]) {
      let sortName = mappableData.find(
        (item: ISortObj) => item.id === searchObj[label]
      );
      setSortID(searchObj[label]);
      setSortValue(sortName?.title || "");
      console.log(sortName);
    }
  };

  const handleSetSortValue = (item: ISortObj) => {
    setSortValue(item.title);
    setSortID(item.id);
    handleSortToggle();

    searchObj[label] = item.id;

    setSearchParams(searchObj);
  };

  const handleSortToggle = () => {
    toggleSortActive(!sortActive);
  };

  return (
    <div
      onClick={handleSortToggle}
      className="px-3 py-2 bg-white relative border rounded-md"
    >
      <div className="cursor-pointer flex flex-row justify-between items-center">
        <span className="text-sm text-main-gray mr-3">{sortValue}</span>

        <div>
          <ArrowBottom
            className={`transition duration-300 ${sortActive && "rotate-180 "}`}
          />
        </div>
      </div>

      {sortActive && (
        <div className="w-[180px] absolute left-0 top-10 bg-white w-fit py-1 rounded-md z-20">
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
