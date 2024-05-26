"use client";
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
};
export const MusicContext = createContext<MusicContextType>(defaultValue);
function ContextMusic({ children }: Props) {
  const [typeWeekly, setTypeWeekly] = useState<string>("");
  const [encodeIdPlaylist, setEncodeIdPlaylist] = useState<string>("");
  const [aliasArtist, setAliasArtist] = useState<string>("");
  const [resultSearch, setResultSearch] = useState<string>("");
  const contextValue = {
    typeWeekly,
    setTypeWeekly,
    encodeIdPlaylist,
    setEncodeIdPlaylist,
    aliasArtist,
    setAliasArtist,
    resultSearch,
    setResultSearch,
  };
  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
}

export default ContextMusic;
