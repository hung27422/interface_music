import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function useGetDataPlaylist() {
  const notify = () => toast("Bạn đã thêm bài này vào playlist rồi ^.^");
  // localStorage.removeItem("playlist1");
  const [dataPlaylist, setDataPlaylist] = useState(() => {
    const localData =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("playlist1")
        : null;
    return localData
      ? JSON.parse(localData)
      : {
          data: [
            {
              name: "LoneLy",
              id: "1",
              songs: [
                {
                  encodeId: "Z76O07CO",
                  title: "Cô Phòng",
                  alias: "Co-Phong-Ho-Quang-Hieu-Huynh-Van",
                  isOffical: true,
                  username: "",
                  artistsNames: "Hồ Quang Hiếu, Huỳnh Văn",

                  thumbnailM:
                    "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/b/9/5/8/b9585640f130b885953eb5a8355697a9.jpg",
                  link: "/bai-hat/Co-Phong-Ho-Quang-Hieu-Huynh-Van/Z76O07CO.html",
                  thumbnail:
                    "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/b/9/5/8/b9585640f130b885953eb5a8355697a9.jpg",
                  duration: 272,
                  zingChoice: false,
                  isPrivate: false,
                  preRelease: false,
                  releaseDate: 1713186000,
                  genreIds: ["IWZ9Z08I", "IWZ97FCD"],
                  distributor: "TECHBEAT Music",
                  indicators: [],
                  isIndie: false,
                  streamingStatus: 1,
                  allowAudioAds: true,
                  hasLyric: true,
                  userid: 456,
                  isRBT: true,
                  like: 388237,
                  listen: 12114637,
                  liked: false,
                  comment: 369,
                  timestamp: 1717702302566,
                },
                {
                  encodeId: "Z779OW9F",
                  title: "Hãy Để Anh Yêu Em Lần Nữa",
                  alias: "Hay-De-Anh-Yeu-Em-Lan-Nua-Tang-Phuc-Nguyen-Dinh-Vu",
                  isOffical: true,
                  username: "",
                  artistsNames: "Tăng Phúc, Nguyễn Đình Vũ",

                  isWorldWide: true,
                  thumbnailM:
                    "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/e/e/d/b/eedbc98790a536226488f8e378454d98.jpg",
                  link: "/bai-hat/Hay-De-Anh-Yeu-Em-Lan-Nua-Tang-Phuc-Nguyen-Dinh-Vu/Z779OW9F.html",
                  thumbnail:
                    "https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/e/e/d/b/eedbc98790a536226488f8e378454d98.jpg",
                  duration: 208,
                  zingChoice: false,
                  isPrivate: false,
                  preRelease: false,
                  releaseDate: 1717588800,
                  genreIds: ["IWZ9Z08I", "IWZ97FCD"],
                  distributor: "Yin Yang Media",
                  indicators: [],
                  isIndie: false,
                  streamingStatus: 1,
                  allowAudioAds: true,
                  hasLyric: true,
                  userid: 456,
                  isRBT: false,
                  like: 2540,
                  listen: 48246,
                  liked: false,
                  comment: 22,
                  timestamp: 1717702175226,
                },
              ],
            },
          ],
        };
  });
  const addPlaylist = (name: string) => {
    const newId = (dataPlaylist.data.length + 1).toString();
    const newPlaylist = {
      name: name,
      id: newId,
      songs: [],
    };

    // Cập nhật state và local storage
    setDataPlaylist((prevData: { data: any }) => {
      const updatedData = { data: [...prevData.data, newPlaylist] };
      localStorage.setItem("playlist1", JSON.stringify(updatedData));
      return updatedData;
    });
  };
  const addSongToPlaylist = (playlistId: string, song: any) => {
    // Kiểm tra xem encodeId đã tồn tại trong bất kỳ bài hát nào trong playlist chưa
    const isDuplicate = dataPlaylist.data.some((playlist: any) =>
      playlist.songs.some(
        (existingSong: any) => existingSong.encodeId === song.encodeId
      )
    );

    // Nếu không phát hiện bài hát trùng lặp, thêm bài hát mới vào playlist
    if (!isDuplicate) {
      setDataPlaylist((prevData: { data: any }) => {
        const updatedData = {
          data: prevData.data.map((playlist: any) =>
            playlist.id === playlistId
              ? { ...playlist, songs: [...playlist.songs, song] }
              : playlist
          ),
        };

        // Lưu dữ liệu mới vào localStorage
        localStorage.setItem("playlist1", JSON.stringify(updatedData));
        return updatedData;
      });
    } else {
      notify();
    }
  };
  const removeSongFromPlaylist = (playlistId: string, encodeId: string) => {
    setDataPlaylist((prevData: { data: any }) => {
      const updatedData = {
        data: prevData.data.map((playlist: any) =>
          playlist.id === playlistId
            ? {
                ...playlist,
                songs: playlist.songs.filter(
                  (song: any) => song.encodeId !== encodeId
                ),
              }
            : playlist
        ),
      };
      localStorage.setItem("playlist1", JSON.stringify(updatedData));
      return updatedData;
    });
  };
  useEffect(() => {
    localStorage.setItem("playlist1", JSON.stringify(dataPlaylist));
  }, [dataPlaylist]);

  return {
    dataPlaylist,
    addPlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
  };
}

export default useGetDataPlaylist;
