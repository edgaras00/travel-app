const slugify = (string) => {
  return string
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
};

export default slugify;
