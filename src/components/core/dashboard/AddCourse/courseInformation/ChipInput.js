import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

const ChipInput = ({
  label,
  name,
  placeHolder,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [chips, setChips] = useState([]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();

      if (chipValue && !chips.includes(chipValue)) {
        const newChips = [...chips, chipValue];
        setChips(newChips);
        event.target.value = "";
      }
    }
  };

  const handleDeleteChip = (index) => {
    const newChips = [...chips];
    newChips.splice(index, 1);
    setChips(newChips);
  };
  useEffect(() => {
    register(name, { required: true });
  });

  useEffect(() => {
    setValue(name, chips);
  }, [chips]);
  return (
    <label>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
        {label}
      </p>
      <div
        className={`${chips.length > 0 && "my-2"} w-full flex flex-wrap gap-2`}
      >
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex gap-1 items-center px-2 py-1 rounded-3xl bg-yellow-400 text-richblack-5"
          >
            <p>{chip}</p>
            <p onClick={() => handleDeleteChip(index)}>
              <MdClose></MdClose>
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        name={name}
        placeholder={placeHolder}
        onKeyDown={handleKeyDown}
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
      ></input>
      {errors[name] && (
        <span className="-mt-1 text-[12px] text-yellow-100">
          Tags are required
        </span>
      )}
    </label>
  );
};

export default ChipInput;
