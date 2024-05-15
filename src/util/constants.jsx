export const handleChangeFormatDate = () => {
  const today = new Date().toString().split(" ").slice(1, 5);
  const month = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${today[2]}년 0${month.indexOf(today[0])}월 ${today[1]}일`;
};
