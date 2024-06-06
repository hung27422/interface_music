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
                  alias: "Co-Phong-Ho-Quang-Hieu-Huynh-Van",
                  isOffical: true,
                  username: "",
                  artistsNames: "Hồ Quang Hiếu, Huỳnh Văn",
                  artists: [
                    {
                      id: "IWZ968UO",
                      name: "Hồ Quang Hiếu",
                      link: "/Ho-Quang-Hieu",
                      spotlight: false,
                      alias: "Ho-Quang-Hieu",
                      thumbnail:
                        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/8/8/f/5/88f5a28ecd2c02dd98229b5d910c0d0c.jpg",
                      thumbnailM:
                        "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/8/8/f/5/88f5a28ecd2c02dd98229b5d910c0d0c.jpg",
                      isOA: true,
                      isOABrand: false,
                      playlistId: "ZWZ9DAA6",
                      totalFollow: 271158,
                    },
                    {
                      id: "IW6ZA7D9",
                      name: "Huỳnh Văn",
                      link: "/nghe-si/Huynh-Van",
                      spotlight: false,
                      alias: "Huynh-Van",
                      thumbnail:
                        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/4/a/a/4/4aa45e1984de7cc21226ab1603ae3ae0.jpg",
                      thumbnailM:
                        "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/4/a/a/4/4aa45e1984de7cc21226ab1603ae3ae0.jpg",
                      isOA: false,
                      isOABrand: false,
                      playlistId: "6B7WAIC0",
                      totalFollow: 2814,
                    },
                  ],
                  isWorldWide: false,
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
                  genres: [
                    {
                      id: "IWZ9Z08I",
                      name: "Việt Nam",
                      title: "Việt Nam",
                      alias: "viet-nam",
                      link: "/the-loai-album/Viet-Nam/IWZ9Z08I.html",
                    },
                    {
                      id: "IWZ97FCD",
                      name: "V-Pop",
                      title: "V-Pop",
                      alias: "v-pop",
                      link: "/the-loai-album/V-Pop/IWZ97FCD.html",
                    },
                  ],
                  composers: [
                    {
                      id: "IW6ZA7D9",
                      name: "Huỳnh Văn",
                      link: "/nghe-si/Huynh-Van",
                      spotlight: false,
                      alias: "Huynh-Van",
                      playlistId: "6B7WAIC0",
                      cover:
                        "https://zmp3-static.zmdcdn.me/skins/zmp3-v5.2/images/default_cover.png",
                      thumbnail:
                        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/4/a/a/4/4aa45e1984de7cc21226ab1603ae3ae0.jpg",
                      totalFollow: 2814,
                    },
                  ],
                  album: {
                    encodeId: "SC079AD0",
                    title: "Cô Phòng (EP)",
                    thumbnail:
                      "https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/b/9/5/8/b9585640f130b885953eb5a8355697a9.jpg",
                    isoffical: true,
                    link: "/album/Co-Phong-EP-Ho-Quang-Hieu/SC079AD0.html",
                    isIndie: false,
                    releaseDate: "15/04/2024",
                    sortDescription: "",
                    releasedAt: 1713186000000,
                    genreIds: ["IWZ9Z08I", "IWZ97FCD"],
                    PR: false,
                    artists: [
                      {
                        id: "IWZ968UO",
                        name: "Hồ Quang Hiếu",
                        link: "/Ho-Quang-Hieu",
                        spotlight: false,
                        alias: "Ho-Quang-Hieu",
                        thumbnail:
                          "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/8/8/f/5/88f5a28ecd2c02dd98229b5d910c0d0c.jpg",
                        thumbnailM:
                          "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/8/8/f/5/88f5a28ecd2c02dd98229b5d910c0d0c.jpg",
                        isOA: true,
                        isOABrand: false,
                        playlistId: "ZWZ9DAA6",
                        totalFollow: 271158,
                      },
                    ],
                    artistsNames: "Hồ Quang Hiếu",
                  },
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
                  artists: [
                    {
                      id: "IWZAEC86",
                      name: "Tăng Phúc",
                      link: "/Tang-Phuc",
                      spotlight: false,
                      alias: "Tang-Phuc",
                      thumbnail:
                        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/3/6/0/b/360b0bb0cd4ad503e8905109040d4c91.jpg",
                      thumbnailM:
                        "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/3/6/0/b/360b0bb0cd4ad503e8905109040d4c91.jpg",
                      isOA: true,
                      isOABrand: false,
                      playlistId: "ZOEIZOWF",
                      totalFollow: 109255,
                    },
                    {
                      id: "IWZ96EC7",
                      name: "Nguyễn Đình Vũ",
                      link: "/Nguyen-Dinh-Vu",
                      spotlight: false,
                      alias: "Nguyen-Dinh-Vu",
                      thumbnail:
                        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/8/d/a/8/8da8214c11bc0e760a7486dd1d63aa34.jpg",
                      thumbnailM:
                        "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/8/d/a/8/8da8214c11bc0e760a7486dd1d63aa34.jpg",
                      isOA: true,
                      isOABrand: false,
                      playlistId: "ZWZBO006",
                      totalFollow: 133082,
                    },
                  ],
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
                  genres: [
                    {
                      id: "IWZ9Z08I",
                      name: "Việt Nam",
                      title: "Việt Nam",
                      alias: "viet-nam",
                      link: "/the-loai-album/Viet-Nam/IWZ9Z08I.html",
                    },
                    {
                      id: "IWZ97FCD",
                      name: "V-Pop",
                      title: "V-Pop",
                      alias: "v-pop",
                      link: "/the-loai-album/V-Pop/IWZ97FCD.html",
                    },
                  ],
                  composers: [
                    {
                      id: "IWZ96EC7",
                      name: "Nguyễn Đình Vũ",
                      link: "/Nguyen-Dinh-Vu",
                      spotlight: false,
                      alias: "Nguyen-Dinh-Vu",
                      playlistId: "ZWZBO006",
                      cover:
                        "https://zmp3-static.zmdcdn.me/skins/zmp3-v5.2/images/default_cover.png",
                      thumbnail:
                        "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/8/d/a/8/8da8214c11bc0e760a7486dd1d63aa34.jpg",
                      totalFollow: 133082,
                    },
                  ],
                  album: {
                    encodeId: "6CW0A6B8",
                    title: "Hãy Để Anh Yêu Em Lần Nữa (Single)",
                    thumbnail:
                      "https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/e/e/d/b/eedbc98790a536226488f8e378454d98.jpg",
                    isoffical: true,
                    link: "/album/Hay-De-Anh-Yeu-Em-Lan-Nua-Single-Tang-Phuc-Nguyen-Dinh-Vu/6CW0A6B8.html",
                    isIndie: false,
                    releaseDate: "05/06/2024",
                    sortDescription: "",
                    releasedAt: 1717588800000,
                    genreIds: ["IWZ9Z08I", "IWZ97FCD"],
                    PR: false,
                    artists: [
                      {
                        id: "IWZAEC86",
                        name: "Tăng Phúc",
                        link: "/Tang-Phuc",
                        spotlight: false,
                        alias: "Tang-Phuc",
                        thumbnail:
                          "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/3/6/0/b/360b0bb0cd4ad503e8905109040d4c91.jpg",
                        thumbnailM:
                          "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/3/6/0/b/360b0bb0cd4ad503e8905109040d4c91.jpg",
                        isOA: true,
                        isOABrand: false,
                        playlistId: "ZOEIZOWF",
                        totalFollow: 109255,
                      },
                      {
                        id: "IWZ96EC7",
                        name: "Nguyễn Đình Vũ",
                        link: "/Nguyen-Dinh-Vu",
                        spotlight: false,
                        alias: "Nguyen-Dinh-Vu",
                        thumbnail:
                          "https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/8/d/a/8/8da8214c11bc0e760a7486dd1d63aa34.jpg",
                        thumbnailM:
                          "https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/8/d/a/8/8da8214c11bc0e760a7486dd1d63aa34.jpg",
                        isOA: true,
                        isOABrand: false,
                        playlistId: "ZWZBO006",
                        totalFollow: 133082,
                      },
                    ],
                    artistsNames: "Tăng Phúc, Nguyễn Đình Vũ",
                  },
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
