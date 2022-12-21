import React from "react";
import ClickSelector from "./ClickSelector";
import CustomButton from "./CustomButton";
import CustomDropdown from "./CustomDropdown";
import RangePicker from "./RangePicker";

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <div className="max-w-[250px] bg-white rounded-[11px] box-border border border-[#E2E5EB]">
      <ClickSelector />

      <div className="p-6">
        {/* გარიგების ტიპი */}
        <CustomDropdown />

        {/* მწარმოებელი */}
        <CustomDropdown />

        {/* კატეგორია */}
        <CustomDropdown />
      </div>
        <hr />
      <RangePicker />

      <div>
        <CustomButton />
      </div>
    </div>
  );
}
