"use client";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import useGetDataInfoSong from "@/components/hooks/useGetDataInfoSong";
import useGetDataSong from "@/components/hooks/useGetDataSong";
import { useContext, useEffect, useRef } from "react";

function Audio() {
  const { data } = useGetDataSong();
  const audioPlay = data?.data?.["128"];
  const {
    audioCurrentTime,
    setAudioCurrentTime,
    audioDuration,
    setAudioDuration,
    setAudioSeek,
    audioRef,
  } = useContext(MusicContext);

  const { activePlay } = useContext(MusicContext);
  useEffect(() => {
    if (audioRef.current && audioPlay) {
      if (activePlay) {
        audioRef.current.play().catch((error) => {
          console.error("Error attempting to play audio:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [activePlay, audioPlay, audioRef]);
  const handleTimeUpdate = () => {
    setAudioCurrentTime(audioRef.current?.currentTime ?? 0);
    const percent = Math.floor((audioCurrentTime / audioDuration) * 100);
    setAudioSeek(percent);
  };
  return (
    <div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={(e) => {
          setAudioDuration(parseFloat(e.currentTarget.duration.toFixed(2)));
        }}
        src={audioPlay}
      ></audio>
    </div>
  );
}

export default Audio;
