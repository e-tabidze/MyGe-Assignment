import React from "react";
import CurrencySwitcher from "./CurrencySwitcher";

type Props = {
  label: string;
  hasSwitcher?: boolean;
  onChangeFrom?: VoidFunction;
  onChangeTo?: VoidFunction;
};

export default function RangePicker({
  label,
  hasSwitcher,
  onChangeFrom,
  onChangeTo,
}: Props) {
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <span className="font-medium text-[13px]">{label}</span>
        {hasSwitcher && <CurrencySwitcher />}
      </div>

      <div className="flex flex-row items-center justify-between mt-3 text-[13px]">
        <input
          className="w-[94px] h-10 border rounded-lg pl-[10px] outline-none"
          placeholder="დან"
          name="rangeFrom"
          type="text"
        />
        <div className="w-[6px] h-[2px] bg-secondary-gray rounded-full"></div>
          <input
            className="w-[94px] h-10 border rounded-lg pl-[10px] outline-none"
            placeholder="მდე"
            name="rangeTo"
            type="text"
          />
      </div>
    </div>
  );
}
