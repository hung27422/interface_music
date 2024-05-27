"use client";
import { InfoSong } from "@/Interfaces/Interface";
import { createContext, useState, ReactNode } from "react";
interface Props {
  children: ReactNode;
}
interface MusicContextType {
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
  indexSong: number;
  setIndexSong: React.Dispatch<React.SetStateAction<number>>;
  playlistContext: InfoSong[];
  setPlaylistContext: React.Dispatch<React.SetStateAction<any[]>>;
}

// Provide a default value for the context
const defaultValue: MusicContextType = {
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
};
export const MusicContext = createContext<MusicContextType>(defaultValue);
function ContextMusic({ children }: Props) {
  const [typeWeekly, setTypeWeekly] = useState<string>("");
  const [encodeIdPlaylist, setEncodeIdPlaylist] = useState<string>("");
  const [aliasArtist, setAliasArtist] = useState<string>("");
  const [resultSearch, setResultSearch] = useState<string>("");
  const [encodeIdSong, setEncodeIdSong] = useState<string>("");
  const [activePlay, setActivePlay] = useState<boolean>(false);
  const [indexSong, setIndexSong] = useState<number>(undefined ?? 0);
  const [playlistContext, setPlaylistContext] = useState<any>([]);

  const contextValue = {
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
  };
  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
}

export default ContextMusic;
