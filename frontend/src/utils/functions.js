export const capitalizeAndReplace = (str) => {
  if (!str) return "hello";
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const handleCopyClick = async (
  textToCopy,
  setCopyStatus,
  setSnackbarOpen,
) => {
  console.log(textToCopy);
  try {
    await navigator.clipboard.writeText(textToCopy);
    setCopyStatus("Copied Successfully!");
    setSnackbarOpen(true);
  } catch (err) {
    console.error("Failed to copy: ", err);
    setCopyStatus("Failed to copy");
    setSnackbarOpen(true);
  }
};
