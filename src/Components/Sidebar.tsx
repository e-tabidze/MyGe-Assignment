import { useEffect, useState } from "react";
import { bargainType } from "../Helper/Contsants";
import {
  getCategories,
  getManufacturers,
  getModels,
} from "../Services/filter.service";
import { ICategory, IManufacturer } from "../Types/general";

import ClickSelector from "./ClickSelector";
import CustomButton from "./CustomButton";
import FilterDropdown from "./FilterDropdown";
import RangePicker from "./RangePicker";

type Props = {};

export default function Sidebar({}: Props) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [manufacturers, setManufacturers] = useState<IManufacturer[]>([]);
  const [models, setModels] = useState([]);

  const [chosenMan, setChosenMan] = useState<number | null>(null);

  useEffect(() => {
    handleGetManufacturers();
    handleGetCategories();
    handleGetModels();
  }, []);

  const handleGetManufacturers = async () => {
    const result = await getManufacturers();
    setManufacturers(result);
  };

  const handleGetCategories = async () => {
    const result = await getCategories();
    setCategories(result);
  };

  const handleGetModels = async () => {
    const result = await getModels(chosenMan || 3);
    setModels(result);
  };

  return (
    <div className="max-w-[250px] bg-white rounded-[11px] box-border border border-[#E2E5EB]">
      <ClickSelector />

      <div className="p-6 pb-1">
        {/* გარიგების ტიპი */}
        <FilterDropdown label="bargainType" filterData={bargainType} />

        {/* მწარმოებელი */}
        <FilterDropdown label="manufacturer" filterData={manufacturers} />

        {/* მოდელები */}
        <FilterDropdown label="models" filterData={models} />

        {/* კატეგორია */}
        <FilterDropdown label="category" filterData={categories} />
      </div>
      <hr />
      <div className="pt-[18px] pb-11 px-6">
        <RangePicker label="ფასი" hasSwitcher={true} />
      </div>

      <div className="w-full pt-4 pb-5 shadow-lg shadow-upper z-10">
        <CustomButton
          onClick={() => console.log("I'm Searching!")}
          text="ძებნა"
          wrapperClassName="mx-auto"
          className="text-sm font-bold py-2 w-[202px]"
        />
      </div>
    </div>
  );
}
