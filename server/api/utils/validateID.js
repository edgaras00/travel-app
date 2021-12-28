module.exports = (string) => {
  if (string.toString().match(/^[0-9a-fA-F]{24}$/)) {
    return true;
  }
  return false;
};
