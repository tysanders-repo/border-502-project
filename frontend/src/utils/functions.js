export const capitalizeAndReplace = (str) => {
  if (!str) return "hello";
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
