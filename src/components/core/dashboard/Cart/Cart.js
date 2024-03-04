import React from "react";
import { useSelector } from "react-redux";
import RanderCartCourse from "./RanderCartCourse";
import RanderTotalAmount from "./RanderTotalAmount";

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);
  return (
    <div className="w-full pl-0 lg:pl-[222px]">
      <div className="w-11/12 max-w-[900px] flex flex-col items-start mx-auto mt-12 mb-24">
        <h1 className="text-4xl font-semibold mb-4">My Cart</h1>
        <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
          {totalItems} Courses In Cart
        </p>

        {total > 0 ? (
          <div className="mt-8 flex gap-8 sm:gap-2 justify-between w-full flex-col-reverse sm:flex-row">
            <RanderCartCourse></RanderCartCourse>
            <RanderTotalAmount></RanderTotalAmount>
          </div>
        ) : (
          <p className="mt-14 text-center text-3xl text-richblack-100">
            Your cart is empty
          </p>
        )}
      </div>
    </div>
  );
};

export default Cart;
