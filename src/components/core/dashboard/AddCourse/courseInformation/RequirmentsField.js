import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RequirmentsField = ({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [requirments, setRequirments] = useState("");
  const [requirmentsList, setRequirmentsList] = useState([]);
  const { editCourse, course } = useSelector((state) => state.course);

  useEffect(() => {
    if (editCourse) {
      setRequirmentsList(course?.instructions);
    }
    register(name, { required: true, validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, requirmentsList);
  }, [requirmentsList]);

  const handleAddRequirment = () => {
    if (requirments) {
      setRequirmentsList([...requirmentsList, requirments]);
      setRequirments("");
    }
  };

  const handleRemoveRequirments = (index) => {
    const updatedRequirmentList = [...requirmentsList];
    updatedRequirmentList.splice(index, 1);
    setRequirmentsList(updatedRequirmentList);
  };
  return (
    <label>
      <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
        {label}
      </p>
      <div>
        <input
          type="text"
          name={name}
          value={requirments}
          onChange={(e) => setRequirments(e.target.value)}
          placeholder="Enter Instructions"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
        ></input>
        <button
          type="button"
          onClick={handleAddRequirment}
          className="font-semibold text-yellow-50 mt-1"
        >
          Add
        </button>
      </div>

      {requirmentsList.length > 0 && (
        <ul>
          {requirmentsList.map((requirment, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="text-sm text-richblack-100">{requirment}</span>
              <button
                type="button"
                onClick={() => handleRemoveRequirments(index)}
                className="text-xs text-pure-greys-300"
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="-mt-1 text-[12px] text-yellow-100">
          {label} is required
        </span>
      )}
    </label>
  );
};

export default RequirmentsField;
