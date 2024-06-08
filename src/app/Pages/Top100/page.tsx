"use client";
import classNames from "classnames/bind";
import styles from "./Top100.module.scss";
import useDataHome from "@/hooks/api/useDataHome";
import { ISectionPlaylist } from "@/Interfaces/Interface";
import MHSectionPlaylist from "@/components/MHSectionPlaylist/MHSectionPlaylist";
import Image from "next/image";
import images from "@/assets/images/images";
import SpinnerLoading from "@/components/SpinnerLoading/SpinnerLoading";
import TitlePage from "@/components/TitlePage/TitlePage";
const cx = classNames.bind(styles);

function Top100() {
  const { data, isLoading } = useDataHome();
  const top100 = data?.data.items.filter(
    (item: ISectionPlaylist) =>
      item.sectionType === "playlist" && item?.title === "Top 100"
  );

  return (
    <div>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <div className={cx("wrapper")}>
          <Image
            className={cx("banner-top100")}
            src={images.bannerTop100}
            alt="bannertop100"
            width={1178}
            height={400}
          ></Image>
          <TitlePage title="Nổi bật" data={top100} />
          <div className={cx("box-top100")}>
            {top100?.map((item: ISectionPlaylist, index: number) => (
              <div key={index} className={cx("mh-section-playlist")}>
                <MHSectionPlaylist
                  hide={true}
                  dataSectionPlaylist={item}
                  top100={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Top100;
