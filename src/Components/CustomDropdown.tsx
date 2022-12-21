import { SetStateAction, useState } from "react";
import ArrowBottom from "../Assets/Icons/ArrowBottom";
import { ICategory, IDealType, IManufacturer } from "../Types/general";

type Props = {
  label: string;
  filterData: IDealType | IManufacturer[] | ICategory[];
};

type SelectorProps = {
  setFilter: SetStateAction<string>;
  setFilterID: SetStateAction<number>;
  data: IDealType | IManufacturer[] | ICategory[];
}

interface ILabelArr {
  bargainType: string;
  manufacturer: string;
  category: string;
  [key: string]: string;
}

const labelArr: ILabelArr = {
  bargainType: "გარიგების ტიპი",
  manufacturer: "მწარმოებელი",
  category: "კატეგორია",
};

export default function CustomDropdown({ label, filterData }: Props) {
  const [filterState, setFilterState] = useState<string>("");
  const [filterID, setFilterID] = useState<number | null>(null);

  const [filterActive, toggleFilterActive] = useState<boolean>(false);

  const handleFilterToggle = () => {
    toggleFilterActive(!filterActive);
  };

  return (
    <div className="relative">
      <span className="text-xs">{labelArr[label]}</span>

      <div
        onClick={handleFilterToggle}
        className="flex flex-row justify-between items-center cursor-pointer w-full mt-2 mb-5 border border-[#C2C9D8] hover:border-[#6F7383] rounded-lg text-[13px] py-[13.5px] px-3"
      >
        <span>{filterState || `ყველა ${labelArr[label]}`}</span>

        <ArrowBottom />
      </div>

      {filterActive && (
        <div className="absolute w-full border rounded-xl bg-white box-border max-h-[300px] overflow-y">
          <span></span>
        </div>
      )}
    </div>
  );
}

const ManufacturerSelect = (props: SelectorProps) => (
  <div className="w-full bg-transparent">
    <div className="flex flex-row text-sm">პოპულარული <hr /></div>
    {Array.isArray(props.data) && props.data.map(item => (
      <div></div>
    ))}
  </div>
)