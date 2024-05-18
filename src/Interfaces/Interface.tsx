export interface IHome {
  sectionType: string;
}
export interface InfoSong {
  encodeId: string;
  title: string;
  artistsNames: string;
  thumbnail: string;
  sortDescription: string;
  thumbnailM: string;
}
export interface ITypeNewRelease {
  all?: InfoSong[];
  vPop?: InfoSong[];
  others?: InfoSong[];
  dataAll?: InfoSong[];
  dataVietnamese?: InfoSong[];
  dataOthers?: InfoSong[];
}
export interface ISectionPlaylist {
  sectionType: string;
  encodeId: string;
  title: string;
  artistsNames: string;
  thumbnail: string;
  sortDescription: string;
  dataSectionPlaylist?: object;
  items?: [];
}
export interface ITrending {
  map(
    arg0: (item: ITrending, index: number) => import("react").JSX.Element
  ): import("react").ReactNode;
  sectionType: string;
  encodeId: string;
  title: string;
  artistsNames: string;
  thumbnail: string;
  sortDescription: string;
  thumbnailM: string;
  items?: [];
  promotes?: [];
  releaseDate: number;
}
export interface IChartHome {
  hour: number;
  counter: number;
  time: number;
}
