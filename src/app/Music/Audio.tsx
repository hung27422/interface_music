"use client";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import useGetDataInfoSong from "@/hooks/useGetDataInfoSong";
import useGetDataSong from "@/hooks/useGetDataSong";
import { useCallback, useContext, useEffect, useRef } from "react";

function Audio() {
  const { data } = useGetDataSong();
  const audioPlay = data?.data?.["128"];
  const {
    activePlay,
    setActivePlay,
    audioCurrentTime,
    setAudioCurrentTime,
    audioDuration,
    setAudioDuration,
    setAudioSeek,
    audioRef,
    audioRepeatSong,
    autoClick,
    audioVolume,
    setAudioVolume,
    audioMute,
    activePlaylist,
    setActivePlaylist,
  } = useContext(MusicContext);
  //Handle Play, Pause Song
  useEffect(() => {
    if (audioRef.current && audioPlay) {
      if (activePlay || activePlaylist) {
        audioRef.current.play().catch((error) => {
          console.error("Error attempting to play audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [activePlay, activePlaylist, audioPlay, audioRef, setActivePlaylist]);
  // Handle Change Volume
  useEffect(() => {
    if (audioRef.current) {
      if (!audioMute) {
        audioRef.current.volume = audioVolume;
      } else {
        audioRef.current.volume = 0;
      }
    }
  }, [audioMute, audioRef, audioVolume, setAudioVolume]);
  // Handle Repeat Song
  const handleEnded = () => {
    if (audioRepeatSong) {
      if (audioRef.current) {
        audioRef.current.play();
      }
    } else {
      autoClick.current?.click();
    }
  };
  const handleTimeUpdate = () => {
    setAudioCurrentTime(audioRef.current?.currentTime ?? 0);
    const percent = Math.floor((audioCurrentTime / audioDuration) * 100);
    setAudioSeek(percent);
  };
  return (
    <div>
      <audio
        ref={audioRef}
        src={audioPlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={(e) => {
          setAudioDuration(parseFloat(e.currentTarget.duration.toFixed(2)));
        }}
        onEnded={handleEnded}
      ></audio>
    </div>
  );
}

export default Audio;
