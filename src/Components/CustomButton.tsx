import React from "react";

type Props = {
  onClick: VoidFunction;
  text: string;
  className?: string;
  wrapperClassName?: string;
};

export default function CustomButton({
  onClick,
  text,
  className,
  wrapperClassName,
}: Props) {
  return (
    <div className={`w-fit bg-main-orange rounded-md ${wrapperClassName}`}>
      <button
        onClick={onClick}
        className={`text-white ${className}`}
      >
        {text}
      </button>
    </div>
  );
}
