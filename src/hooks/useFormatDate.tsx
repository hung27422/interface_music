function useFormatDate(releaseDate: number) {
  if (releaseDate === undefined) {
    return ""; // Or any other default value or behavior
  }
  var releaseDateInSeconds = releaseDate * 1000;
  var releaseDateObj = new Date(releaseDateInSeconds);
  var day = releaseDateObj.getDate();
  var month = releaseDateObj.getMonth() + 1;
  var year = releaseDateObj.getFullYear();
  var formattedDate = day + "/" + month + "/" + year;
  return formattedDate;
}

export default useFormatDate;
