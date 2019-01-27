export const daysDifference = (date1, date2) => {
  const str1 = date1.split("-");
  const str2 = date2.split("-");
  let differenceInDays;
  const startDate = new Date(str1[0], str1[1] - 1, str1[2]);
  const endDate = new Date(str2[0], str2[1] - 1, str2[2]);

  if (date1 === "" || date2 === "") return;

  if (startDate > endDate) {
    differenceInDays = false;
    return differenceInDays;
  } else if (startDate < endDate) {
    const diffMS = endDate - startDate; // milliseconds
    const diffS = diffMS / 1000; // seconds
    const diffM = diffS / 60; // minutes
    const diffH = diffM / 60; // hours
    const diffD = diffH / 24; // days
    if (diffD <= 7) {
      differenceInDays = true;
      return differenceInDays;
    }
    differenceInDays = false;
    return false;
  } else {
    differenceInDays = true;
    return differenceInDays;
  }
};
