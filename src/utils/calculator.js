export const calculateUnit = (locations) => {
  let calTotalUnits = 0;
  locations.forEach((e) => {
    calTotalUnits = Number(calTotalUnits) + Number(e.unit);
  });
  return calTotalUnits;
};

export const calculateCost = (locations) => {
  let calTotalCost = 0;
  locations.forEach((e) => {
    calTotalCost = Number(calTotalCost) + Number(e.price);
  });
  return calTotalCost.toFixed(2);
};
