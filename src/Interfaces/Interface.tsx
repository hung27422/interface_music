export interface IHome {
  sectionType: string;
}
export interface InfoSong {
  album: any;
  encodeId: string;
  title: string;
  artistsNames: string;
  thumbnail: string;
  sortDescription: string;
  thumbnailM: string;
  duration: number;
  streamingStatus: number;
  releaseDate: number;
  listen: number;
  isWorldWide: boolean;
  downloadPrivileges: number[];
  items?: [];
}
export interface ITypeNewRelease {
  items?: any;
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
  thumbnailM: string;
  sortDescription: string;
  dataSectionPlaylist?: object;
  items?: ISectionPlaylist[];
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
  album: any;
  duration: number;
  streamingStatus: number;
  listen: number;
  isWorldWide: boolean;
  downloadPrivileges: number[];
}
export interface IChartHome {
  hour: number;
  counter: number;
  time: number;
  encodeId: string;
  title: string;
  artistsNames: string;
  thumbnail: string;
  sortDescription: string;
  thumbnailM: string;
  data?: InfoSong;
  type?: string;
  items?: IChartHome;
}
export interface IArtist {
  map(arg0: (result: IArtist) => IArtist): unknown;
  id: string;
  name: string;
  playlistId: string;
  thumbnail: string;
  thumbnailM: string;
  totalFollow: number;
  link: string;
  alias: string;
  title: string;
  sectionType: string;
  items: [];
}
export interface IRadio {
  thumbnailM: string;
  thumbnail: string;
  title: string;
  name: string;
  encodeId: string;
  host?: IRadio;
  program: IRadio;
  activeUsers: number;
  startTime: number;
  endTime: number;
}
export interface ILyric {
  words: [];
  data: string;
  endTime: number;
  startTime: number;
}
interface IPlaylistData {
  song: {
    items: InfoSong[];
    totalDuration: number;
    total: number;
  };
  contentLastUpdate: number;
  artists: IArtist[];
  like?: number;
  title: string;
  artistsNames: string;
  description: string;
  thumbnailM: string;
  encodeId: string;
}
export interface IGetData {
  data: IPlaylistData;
}
