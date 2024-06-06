import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function useGetDataPlaylist() {
  const notify = () => toast("Bạn đã thêm bài này vào playlist rồi ^.^");
  // localStorage.removeItem("playlist1");
  const [dataPlaylist, setDataPlaylist] = useState(() => {
    const localData = localStorage.getItem("playlist1");
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
                  artistsNames: "Hồ Quang Hiếu, Huỳnh Văn",
                  thumbnailM:
                    "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/b/9/5/8/b9585640f130b885953eb5a8355697a9.jpg",
                  duration: 272,
                },
                {
                  encodeId: "Z779OW9F",
                  title: "Hãy Để Anh Yêu Em Lần Nữa",
                  artistsNames: "Tăng Phúc, Nguyễn Đình Vũ",
                  thumbnailM:
                    "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/e/e/d/b/eedbc98790a536226488f8e378454d98.jpg",
                  duration: 208,
                },
              ],
            },
            {
              name: "Happy",
              id: "2",
              songs: [
                {
                  encodeId: "Z6DI0O8D",
                  title: "Ngõ Chạm",
                  artistsNames: "BigDaddy, Emily",
                  thumbnailM:
                    "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/a/5/1/e/a51eccf0d34d67155eb9ba4989ac5861.jpg",
                  duration: 232,
                },
                {
                  encodeId: "Z6EE9ZZD",
                  title: "Có Chắc Yêu Là Đây",
                  artistsNames: "Sơn Tùng M-TP",
                  thumbnailM:
                    "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/9/d/7/9/9d79ebd03bbb6482bab748d67bbe0afb.jpg",
                  duration: 215,
                },
                {
                  encodeId: "Z6FE8WOF",
                  title: "NOLOVENOLIFE",
                  artistsNames: "HIEUTHUHAI",
                  thumbnailM:
                    "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/4/a/c/d4acc6335d41bd7164173312c6123706.jpg",
                  duration: 171,
                },
                {
                  encodeId: "ZWAEB7DW",
                  title: "Yêu Như Trẻ Con",
                  artistsNames: "B Ray",
                  thumbnailM:
                    "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/2/3/9/9/2399b3be0fff70dd1e3c51812f93a0c0.jpg",
                  duration: 206,
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
    // Lưu dữ liệu mới vào local storage
    setDataPlaylist((prevData: { data: any }) => ({
      data: [...prevData.data, newPlaylist],
    }));
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
      setDataPlaylist((prevData: { data: any }) => ({
        data: prevData.data.map((playlist: any) =>
          playlist.id === playlistId
            ? { ...playlist, songs: [...playlist.songs, song] }
            : playlist
        ),
      }));
    } else {
      notify();
    }
  };
  useEffect(() => {
    localStorage.setItem("playlist1", JSON.stringify(dataPlaylist));
    // const test = JSON.parse(localStorage.getItem("playlist1") || "");
  }, [dataPlaylist]);

  return { dataPlaylist, addPlaylist, addSongToPlaylist };
}

export default useGetDataPlaylist;
