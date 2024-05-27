"use client";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import useGetDataInfoSong from "@/components/hooks/useGetDataInfoSong";
import useGetDataSong from "@/components/hooks/useGetDataSong";
import { useContext, useEffect, useRef } from "react";

function Audio() {
  const { data } = useGetDataSong();
  const { data: dataInfoSong } = useGetDataInfoSong();
  const refAudio = useRef<HTMLAudioElement>(null);
  const audioPlay = data?.data?.["128"];

  const { activePlay } = useContext(MusicContext);
  useEffect(() => {
    if (refAudio.current && audioPlay) {
      if (activePlay) {
        refAudio.current.play().catch((error) => {
          console.error("Error attempting to play audio:", error);
        });
      } else {
        refAudio.current.pause();
      }
    }
  }, [activePlay, audioPlay]);

  return (
    <div>
      <audio ref={refAudio} src={audioPlay}></audio>
    </div>
  );
}

export default Audio;
