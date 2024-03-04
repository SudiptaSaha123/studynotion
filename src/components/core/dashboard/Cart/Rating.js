import React, { useEffect, useState } from "react";
import getAvgRating from "../../../../utils/avgRating";

const Rating = ({ rating }) => {
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const count = getAvgRating(rating);
    setAvgRating(count);
  });
  return <p>{avgRating}</p>;
};

export default Rating;
