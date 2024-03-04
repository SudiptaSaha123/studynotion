import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { BuyCourse } from "../../../../services/operations/studentsFeaturesAPI";

const RanderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    BuyCourse(token, courses, user, navigate, dispatch);
  };
  return (
    <div className="flex flex-col p-6 bg-richblack-800 h-[200px] min-w-[250px] justify-between rounded-md">
      <p className="text-sm font-medium text-richblack-300">Total: </p>
      <p className=" text-3xl text-yellow-50 font-semibold">₹ {total}</p>

      <button
        className="bg-yellow-50 rounded-md py-2 px-3 font-semibold text-richblack-900"
        onClick={handleBuyCourse}
      >
        Buy Now
      </button>
    </div>
  );
};

export default RanderTotalAmount;
