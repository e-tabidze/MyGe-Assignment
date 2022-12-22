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
    <div className={`w-fit ${wrapperClassName}`}>
      <button
        onClick={onClick}
        className={`bg-main-orange text-white rounded-[6px] ${className}`}
      >
        {text}
      </button>
    </div>
  );
}
