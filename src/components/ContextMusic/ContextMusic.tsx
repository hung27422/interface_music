"use client";
import { ISectionPlaylist, InfoSong, IGetData } from "@/Interfaces/Interface";
import React, {
  createContext,
  useState,
  ReactNode,
  useRef,
  useContext,
} from "react";
interface Props {
  children: ReactNode;
}
interface MusicContextType {
  audioRef: React.RefObject<HTMLAudioElement>;
  autoClick: React.RefObject<HTMLButtonElement>;
  typeWeekly: string;
  setTypeWeekly: React.Dispatch<React.SetStateAction<string>>;
  encodeIdPlaylist: string;
  setEncodeIdPlaylist: React.Dispatch<React.SetStateAction<string>>;
  aliasArtist: string;
  setAliasArtist: React.Dispatch<React.SetStateAction<string>>;
  resultSearch: string;
  setResultSearch: React.Dispatch<React.SetStateAction<string>>;
  encodeIdSong: string;
  setEncodeIdSong: React.Dispatch<React.SetStateAction<string>>;
  activePlay: boolean;
  setActivePlay: React.Dispatch<React.SetStateAction<boolean>>;
  indexSong: number | undefined;
  setIndexSong: React.Dispatch<React.SetStateAction<number | undefined>>;
  playlistContext: InfoSong[];
  setPlaylistContext: React.Dispatch<React.SetStateAction<any[]>>;
  audioCurrentTime: number;
  setAudioCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  audioDuration: number;
  setAudioDuration: React.Dispatch<React.SetStateAction<number>>;
  audioSeek: number;
  setAudioSeek: React.Dispatch<React.SetStateAction<number>>;
  audioRepeatSong: boolean;
  setAudioRepeatSong: React.Dispatch<React.SetStateAction<boolean>>;
  audioRandomSong: boolean;
  setAudioRandomSong: React.Dispatch<React.SetStateAction<boolean>>;
  audioVolume: number;
  setAudioVolume: React.Dispatch<React.SetStateAction<number>>;
  audioMute: boolean;
  setAudioMute: React.Dispatch<React.SetStateAction<boolean>>;
  dataStorage: {};
  setDataStorage: React.Dispatch<React.SetStateAction<{}>>;
  playlistItemStoredLocal: ISectionPlaylist[];
  setPlaylistStoredLocal: React.Dispatch<React.SetStateAction<any[]>>;
  activePlaylist: boolean;
  setActivePlaylist: React.Dispatch<React.SetStateAction<any>>;
  playlistHub: string;
  setPlaylistHub: React.Dispatch<React.SetStateAction<any>>;
  idPlaylistLocal: string;
  setIdPlaylistLocal: React.Dispatch<React.SetStateAction<string>>;
}

// Provide a default value for the context
const defaultValue: MusicContextType = {
  // State
  audioRef: { current: null } as React.RefObject<HTMLAudioElement>,
  autoClick: { current: null },
  typeWeekly: "",
  setTypeWeekly: () => {},
  encodeIdPlaylist: "",
  setEncodeIdPlaylist: () => {},
  aliasArtist: "",
  setAliasArtist: () => {},
  resultSearch: "",
  setResultSearch: () => {},
  encodeIdSong: "",
  setEncodeIdSong: () => {},
  activePlay: false,
  setActivePlay: () => {},
  indexSong: 0,
  setIndexSong: () => {},
  playlistContext: [],
  setPlaylistContext: () => {},
  audioCurrentTime: 0,
  setAudioCurrentTime: () => {},
  audioDuration: 0,
  setAudioDuration: () => {},
  audioSeek: 0,
  setAudioSeek: () => {},
  audioRepeatSong: false,
  setAudioRepeatSong: () => {},
  audioRandomSong: false,
  setAudioRandomSong: () => {},
  audioVolume: 1,
  setAudioVolume: () => {},
  audioMute: false,
  setAudioMute: () => {},
  dataStorage: {},
  setDataStorage: () => {},
  playlistItemStoredLocal: [] as ISectionPlaylist[],
  setPlaylistStoredLocal: () => {},
  activePlaylist: false,
  setActivePlaylist: () => {},
  playlistHub: "",
  setPlaylistHub: () => {},
  idPlaylistLocal: "1",
  setIdPlaylistLocal: () => {},
};
export const MusicContext = createContext<MusicContextType>(defaultValue);
function ContextMusic({ children }: Props) {
  // State
  const audioRef = useRef<HTMLAudioElement>(null);
  const autoClick = useRef<HTMLButtonElement>(null);
  const [typeWeekly, setTypeWeekly] = useState<string>("");
  const [encodeIdPlaylist, setEncodeIdPlaylist] = useState<string>("");
  const [aliasArtist, setAliasArtist] = useState<string>("");
  const [resultSearch, setResultSearch] = useState<string>("");
  const [encodeIdSong, setEncodeIdSong] = useState<string>("");
  const [activePlay, setActivePlay] = useState<boolean>(false);
  const [indexSong, setIndexSong] = useState<number | undefined>(undefined);
  const [playlistContext, setPlaylistContext] = useState<any>([]);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioSeek, setAudioSeek] = useState<number>(0);
  const [audioRepeatSong, setAudioRepeatSong] = useState<boolean>(false);
  const [audioRandomSong, setAudioRandomSong] = useState<boolean>(false);
  const [audioVolume, setAudioVolume] = useState<number>(1);
  const [audioMute, setAudioMute] = useState<boolean>(false);
  const [dataStorage, setDataStorage] = useState<{}>({});
  const [playlistItemStoredLocal, setPlaylistStoredLocal] = useState<
    any | undefined
  >([]);
  const [activePlaylist, setActivePlaylist] = useState<boolean>(false);
  const [playlistHub, setPlaylistHub] = useState<string>("");
  const [idPlaylistLocal, setIdPlaylistLocal] = useState<string>("1");

  const contextValue = {
    audioRef,
    autoClick,
    typeWeekly,
    setTypeWeekly,
    encodeIdPlaylist,
    setEncodeIdPlaylist,
    aliasArtist,
    setAliasArtist,
    resultSearch,
    setResultSearch,
    encodeIdSong,
    setEncodeIdSong,
    activePlay,
    setActivePlay,
    indexSong,
    setIndexSong,
    playlistContext,
    setPlaylistContext,
    audioCurrentTime,
    setAudioCurrentTime,
    audioDuration,
    setAudioDuration,
    audioSeek,
    setAudioSeek,
    audioRepeatSong,
    setAudioRepeatSong,
    audioRandomSong,
    setAudioRandomSong,
    audioVolume,
    setAudioVolume,
    audioMute,
    setAudioMute,
    dataStorage,
    setDataStorage,
    playlistItemStoredLocal,
    setPlaylistStoredLocal,
    activePlaylist,
    setActivePlaylist,
    playlistHub,
    setPlaylistHub,
    idPlaylistLocal,
    setIdPlaylistLocal,
  };
  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
}

export default ContextMusic;
