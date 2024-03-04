export const formateDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };

  const date = new Date(dateString);
  console.log("Date: ", date);
  const formatedDate = date.toLocaleDateString("en-US", options);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";

  const formatedTime = `${hours % 12}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;

  return `${formatedDate} | ${formatedTime}`;
};
