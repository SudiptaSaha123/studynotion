import React, { useEffect, useState } from "react";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

const RatingStars = ({ reviewCount, starSize }) => {
  const [starCount, setStarCount] = useState({ full: 0, half: 0, empty: 0 });

  useEffect(() => {
    const wholeStar = Math.floor(reviewCount) || 0;

    setStarCount({
      full: wholeStar,
      half: Number.isInteger(reviewCount) ? 0 : 1,
      empty: Number.isInteger(reviewCount) ? 5 - wholeStar : 4 - wholeStar,
    });
  }, [reviewCount]);
  return (
    <div className="flex gap-1 text-yellow-100">
      {[...new Array(starCount.full)].map((_, i) => (
        <TiStarFullOutline key={i} size={starSize || 20}></TiStarFullOutline>
      ))}

      {[...new Array(starCount.half)].map((_, i) => (
        <TiStarHalfOutline key={i} size={starSize || 20}></TiStarHalfOutline>
      ))}

      {[...new Array(starCount.empty)].map((_, i) => (
        <TiStarOutline key={i} size={starSize || 20}></TiStarOutline>
      ))}
    </div>
  );
};

export default RatingStars;
