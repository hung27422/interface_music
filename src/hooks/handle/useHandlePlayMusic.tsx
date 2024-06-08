import { InfoSong } from "@/Interfaces/Interface";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import { useContext } from "react";
interface useHandlePlayMusicProps {
  playlist: InfoSong[];
}
function useHandlePlayMusic() {
  const {
    setEncodeIdSong,
    encodeIdSong,
    setActivePlay,
    setActivePlaylist,
    setIndexSong,
    setPlaylistContext,
    activePlay,
  } = useContext(MusicContext);

  const handlePlayMusic = (
    encodeId: string,
    index?: number,
    currentPlaylist?: InfoSong[]
  ) => {
    //Set id khi click vào hàm
    setEncodeIdSong(encodeId);
    // Toggle nút pause and play
    if (encodeId === encodeIdSong) {
      setActivePlay(!activePlay);
    } else {
      setEncodeIdSong(encodeId);
      setActivePlay(true);
    }
    setActivePlaylist(false);
    setIndexSong(index ?? 0);
    setPlaylistContext(currentPlaylist ?? []);
  };

  const handleSaveMusicLocalStorage = (
    currentSong?: InfoSong,
    currentPlaylist?: InfoSong[],
    encodeId?: string,
    index?: number
  ) => {
    localStorage.setItem("currentSong", JSON.stringify(currentSong));
    localStorage.setItem("currentPlaylist", JSON.stringify(currentPlaylist));
    localStorage.setItem("encodeId", JSON.stringify(encodeId));
    localStorage.setItem("indexSong", JSON.stringify(index));
  };

  return { handlePlayMusic, handleSaveMusicLocalStorage };
}

export default useHandlePlayMusic;
