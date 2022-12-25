import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CurrencySwitcher from "./CurrencySwitcher";

type Props = {
  label: string;
  hasSwitcher?: boolean;
  fromName: string;
  toName: string;
  // onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function RangePicker({
  label,
  hasSwitcher,
  fromName,
  toName,
}: // onPriceChange,
Props) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [valueObj, setValueObj] = useState({
    [fromName]: "",
    [toName]: "",
  });

  let searchObj = Object.fromEntries(searchParams);

  useEffect(() => {
    handleSetInitValues();
  }, [])

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if(value.length === 0) {
      delete searchObj[name];
    } else {
      searchObj[name] = value;
    }

    setValueObj({
      ...valueObj,
      [name]: value
    })
    setSearchParams(searchObj);
  };

  const handleSetInitValues = () => {
    let initState = {
      [fromName]: searchObj[fromName] || "",
      [toName]: searchObj[toName] || "",
    }

    console.log(initState, '[INIT VALUES]');
    setValueObj(initState);
  }

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <span className="font-medium text-[13px]">{label}</span>
        {hasSwitcher && <CurrencySwitcher />}
      </div>

      <div className="flex flex-row items-center justify-between mt-3 text-[13px]">
        <input
          className="w-[94px] h-10 border rounded-lg pl-[10px] outline-none"
          onChange={handlePriceChange}
          placeholder="დან"
          name={fromName}
          type="text"
          value={valueObj[fromName]}
        />
        <div className="w-[6px] h-[2px] bg-secondary-gray rounded-full"></div>
        <input
          className="w-[94px] h-10 border rounded-lg pl-[10px] outline-none"
          onChange={handlePriceChange}
          placeholder="მდე"
          name={toName}
          type="text"
          value={valueObj[toName]}
        />
      </div>
    </div>
  );
}
