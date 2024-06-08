function useFormatNumber(num: number) {
  if (num >= 1000) {
    return Math.floor(num / 1000) + "k";
  }
  return num?.toString();
}

export default useFormatNumber;
