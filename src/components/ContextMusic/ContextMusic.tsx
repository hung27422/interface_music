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
}

// Provide a default value for the context
const defaultValue: MusicContextType = {
  typeWeekly: "",
  setTypeWeekly: () => {},
  encodeIdPlaylist: "",
  setEncodeIdPlaylist: () => {},
};
export const MusicContext = createContext<MusicContextType>(defaultValue);
function ContextMusic({ children }: Props) {
  const [typeWeekly, setTypeWeekly] = useState<string>("");
  const [encodeIdPlaylist, setEncodeIdPlaylist] = useState<string>("");
  const contextValue = {
    typeWeekly,
    setTypeWeekly,
    encodeIdPlaylist,
    setEncodeIdPlaylist,
  };
  return (
    <MusicContext.Provider value={contextValue}>
      {children}
    </MusicContext.Provider>
  );
}

export default ContextMusic;
