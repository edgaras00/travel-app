const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

const capitalizeAll = (string, separator = " ") => {
  const stringArray = string.split("-");
  const capitalizedArray = stringArray.map((str) => capitalize(str));
  return capitalizedArray.join(separator);
};

export { capitalize, capitalizeAll };
