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
}

// Provide a default value for the context
const defaultValue: MusicContextType = {
  typeWeekly: "",
  setTypeWeekly: () => {},
  encodeIdPlaylist: "",
  setEncodeIdPlaylist: () => {},
  aliasArtist: "",
  setAliasArtist: () => {},
};
export const MusicContext = createContext<MusicContextType>(defaultValue);
function ContextMusic({ children }: Props) {
  const [typeWeekly, setTypeWeekly] = useState<string>("");
  const [encodeIdPlaylist, setEncodeIdPlaylist] = useState<string>("");
  const [aliasArtist, setAliasArtist] = useState<string>("");
  const contextValue = {
    typeWeekly,
    setTypeWeekly,
    encodeIdPlaylist,
    setEncodeIdPlaylist,
    aliasArtist,
    setAliasArtist,
  };
  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
}

export default ContextMusic;
