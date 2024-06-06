export const convertToGif = (str) => {
  const parts = str.split("/");
  let n = parts.length;

  if (parts[n - 1]?.endsWith(".mp4")) {
    parts[n - 1] = parts[n - 1].slice(0, -4) + ".gif";
  }

  parts.splice(-2, 0, "e_loop");

  const modifiedStr = parts.join("/");
  return modifiedStr;
};
