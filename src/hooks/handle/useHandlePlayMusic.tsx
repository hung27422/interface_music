import { ISectionPlaylist, InfoSong } from "@/Interfaces/Interface";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import { useCallback, useContext } from "react";
import useGetDetailPlaylist from "../api/useGetDetailPlaylist";
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
    setEncodeIdPlaylist,
    activePlaylist,
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
    // Khi click nhạc ở Media thì actions ở MHPlaylist sẽ ẩn
    setActivePlaylist(false);
    //Set index để next song
    setIndexSong(index ?? 0);
    // Set playlist để next song
    setPlaylistContext(currentPlaylist ?? []);
  };

  const handlePlayMusicPlaylist = (
    encodeIdPlaylist: string,
    encodeIdPlaylistData: string,
    encodeIdSong: string,
    currentIndex: number,
    playlistCurrent?: ISectionPlaylist[]
  ) => {
    // Truyền encodeIdSong để audio lấy được link phát nhạc
    setEncodeIdSong(encodeIdSong);
    // Ẩn action ở media
    setActivePlay(false);
    // Truyền idPlaylist lấy data từ hook useGetDetailPlaylist
    setEncodeIdPlaylist(encodeIdPlaylist);
    // Toggle pause and play nhạc ở playlist
    if (encodeIdPlaylistData === encodeIdPlaylist) {
      setActivePlaylist(!activePlaylist);
    } else {
      setActivePlaylist(true);
    }
    // Set index song để next song
    setIndexSong(currentIndex ?? 0);
    // Set playlist để next song
    setPlaylistContext(playlistCurrent ?? []);
  };
  const handleSaveMusicLocalStorage = useCallback(
    (
      currentSong?: InfoSong,
      currentPlaylist?: InfoSong[],
      encodeId?: string,
      index?: number
    ) => {
      localStorage.setItem("currentSong", JSON.stringify(currentSong));
      localStorage.setItem("currentPlaylist", JSON.stringify(currentPlaylist));
      localStorage.setItem("encodeId", JSON.stringify(encodeId));
      localStorage.setItem("indexSong", JSON.stringify(index));
    },
    []
  );

  return {
    handlePlayMusic,
    handleSaveMusicLocalStorage,
    handlePlayMusicPlaylist,
  };
}

export default useHandlePlayMusic;
