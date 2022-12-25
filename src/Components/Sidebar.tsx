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
  categories: ICategory[]
};

export default function Sidebar({ manufacturers, models, categories, handleSearch }: Props) {

  return (
    <div className="max-w-[250px] h-fit bg-white rounded-[11px] box-border border border-[#E2E5EB]">
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
        <RangePicker label="ფასი" hasSwitcher={true} fromName="PriceFrom" toName="PriceTo" />
      </div>

      <div className="w-full pt-4 pb-5 shadow-lg shadow-upper z-10">
        <CustomButton
          onClick={handleSearch}
          text="ძებნა"
          wrapperClassName="mx-auto"
          className="text-sm font-bold py-2 w-[202px]"
        />
      </div>
    </div>
  );
}
