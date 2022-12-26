import { useState } from "react";
import ArrowRight from "../Assets/Icons/ArrowRight";
import FilterSVG from "../Assets/Icons/Filter";
import { bargainType } from "../Helper/Contsants";
import { ICategory, IManufacturer, IModelData } from "../Types/general";

import ClickSelector from "./ClickSelector";
import CustomButton from "./CustomButton";
import FilterDropdown from "./FilterDropdown";
import RangePicker from "./RangePicker";

type Props = {
  manufacturers: IManufacturer[];
  handleSearch: VoidFunction;
  models: IModelData[];
  categories: ICategory[];
};

export default function Sidebar({
  manufacturers,
  models,
  categories,
  handleSearch,
}: Props) {
  const [sidebarActive, toggleSidebarActive] = useState(false);

  const handleSearchClick = () => {
    handleSearch();
    toggleSidebarActive(false);
  };

  return (
    <>
      <div
        onClick={() => toggleSidebarActive(!sidebarActive)}
        className="flex flex-row items-center sm:hidden w-fit text-xs text-[#454857] px-3 py-2 bg-white rounded-full mb-2 ml-1"
      >
        <FilterSVG />
        <span className="ml-1">ფილტრი</span>
      </div>
      <div
        onClick={() => toggleSidebarActive(false)}
        className={`fixed top-0 w-full bg-white z-50 flex-row items-center pl-2 h-12 ${
          sidebarActive ? "flex " : "hidden"
        }`}
      >
        <div className="rotate-180">
          <ArrowRight width={8} height={14} />
        </div>
        <span className="ml-4 text-sm">უკან</span>
      </div>
      <div
        className={`fixed ${
          sidebarActive ? "!left-0" : ""
        } w-screen h-screen overflow-y-scroll sm:overflow-none pb-12 sm:pb-0 z-40 top-12 sm:top-0 -left-full sm:left-0 transition-all duration-300 sm:relative sm:block sm:max-w-[250px] sm:h-fit bg-white rounded-[11px] box-border border border-[#E2E5EB]`}
      >
        <ClickSelector />

        <div className="p-6 pb-1">
          {/* გარიგების ტიპი */}
          <FilterDropdown label="ForRent" filterData={bargainType} />

          {/* მწარმოებელი */}
          <FilterDropdown label="Mans" filterData={manufacturers} />

          {/* მოდელები */}
          <FilterDropdown label="Mods" filterData={models} />

          {/* კატეგორია */}
          <FilterDropdown label="Cats" filterData={categories} />
        </div>
        <hr />
        <div className="pt-[18px] pb-11 px-6">
          <RangePicker
            label="ფასი"
            hasSwitcher={true}
            fromName="PriceFrom"
            toName="PriceTo"
          />
        </div>

        <div className="w-full pt-4 pb-5 shadow-lg shadow-upper">
          <CustomButton
            onClick={handleSearchClick}
            text="ძებნა"
            wrapperClassName="mx-auto"
            className="text-sm font-bold py-2 w-[202px]"
          />
        </div>
      </div>
    </>
  );
}
