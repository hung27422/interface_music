function useFormatTime(time: number) {
  let totalSeconds = time;
  // Chuyển đổi từ giây sang phút
  let totalMinutes = Math.floor(totalSeconds / 60);

  // Tính số giờ
  let hours = Math.floor(totalMinutes / 60);

  // Tính số phút
  let minutes = totalMinutes % 60;
  return `${hours} giờ ${minutes} phút`;
}

export default useFormatTime;
