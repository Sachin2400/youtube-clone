export const convertRawtoString = (labelValue, isSub = false) => {
  if (!labelValue && labelValue !== 0) return "0";
  const num = Math.abs(Number(labelValue));
  if (isNaN(num)) return "0";

  if (num >= 1.0e9) {
    return (num / 1.0e9).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1.0e6) {
    return (num / 1.0e6).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1.0e3) {
    return (num / 1.0e3).toFixed(isSub ? 2 : 1).replace(/\.0$/, "") + "K";
  }

  return num.toLocaleString();
};

