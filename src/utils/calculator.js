export const calculateUnit = (locations) => {
  let calTotalUnits = 0;
  locations.map((e) => {
    calTotalUnits = Number(calTotalUnits) + Number(e.unit);
  });
  return calTotalUnits;
};

export const calculateCost = (locations) => {
  let calTotalCost = 0;
  locations.map((e) => {
    calTotalCost = Number(calTotalCost) + Number(e.price);
  });
  return calTotalCost;
};
