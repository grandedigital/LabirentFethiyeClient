import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import Link from "next/link";
import styles from "./gallery.module.css";
import Image from "next/image";
import { memo } from "react";

const Gallery = memo(function Gallery({ photos, from }) {
  const videoObject = photos?.find((item) => item?.videoLink != null);
  // 1. videoLink'i null olmayan kaydı bul ve diziden çıkar
  const kayitIndex = photos?.length > 0 ? photos.findIndex(
    (item) => item?.videoLink && item?.videoLink !== null
  ) : -1;
  //video var ise
  if (kayitIndex !== -1) {
    const [kayit] = photos.splice(kayitIndex, 1); // Kayıt çıkarıldı
    // 2. Kayıtı ilk elemandan sonra dizinin 1. indexine ekle
    photos.splice(1, 0, kayit);
  }

  if (photos != null) {
    if (from == "hotelList") {
      return (
        <LightGallery speed={500} plugins={[lgThumbnail, lgZoom, lgVideo]}>
          {photos.map((data, index) =>
            index < 10 ? (
              index === 0 ? (
                <Link
                  key={index}
                  className={styles.lightBoxItem}
                  href={`${
                    process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                    "b_" +
                    data?.image
                  }`}
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                            "b_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                      "k_" +
                      data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ) : index === 9 ? (
                <Link
                  key={index}
                  className={`${styles["lightBoxItem"]} ${styles["lastLi"]}`}
                  href={
                    process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                    "b_" +
                    data?.image
                  }
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                            "k_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                    <span>
                      {photos.length - 10 > 0 ? `+${photos.length - 10}` : "+"}
                    </span>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                      "k_" +
                      data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ) : index === 1 && kayitIndex != -1 ? (
                <Link
                  key={index}
                  className={styles.lightBoxItem}
                  href={videoObject?.videoLink}
                >
                  <div
                    className={`${styles["lightBoxItemChild"]} ${styles["video-icon"]}`}
                  >
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                            "k_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                      "k_" +
                      data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ) : (
                <Link
                  key={index}
                  className={styles.lightBoxItem}
                  href={
                    process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                    "b_" +
                    data?.image
                  }
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                            "k_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                      "k_" +
                      data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              )
            ) : (
              <Link
                key={index}
                style={{ display: "none" }}
                href={
                  process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                  "b_" +
                  data?.image
                }
              >
                <Image
                  alt=""
                  src={
                    process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                    "k_" +
                    data?.image
                  }
                  width={96}
                  height={76}
                  style={{ display: "none" }}
                />
              </Link>
            )
          )}
        </LightGallery>
      );
    } else if (from == "roomDetail") {
      return (
        <LightGallery speed={500} plugins={[lgThumbnail, lgZoom, lgVideo]}>
          {photos.map((data, index) =>
            index < 10 ? (
              index === 0 ? (
                <Link
                  key={index}
                  className={styles.lightBoxItem}
                  href={`${
                    process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL +
                    "b_" +
                    data?.image
                  }`}
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL +
                            "b_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL +
                      "k_" +
                      data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ) : index === 9 ? (
                <Link
                  key={index}
                  className={`${styles["lightBoxItem"]} ${styles["lastLi"]}`}
                  href={
                    process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL +
                    "b_" +
                    data?.image
                  }
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL +
                            "k_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                    <span>
                      {photos.length - 10 > 0 ? `+${photos.length - 10}` : "+"}
                    </span>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL +
                      "k_" +
                      data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ) : index == 1 && kayitIndex != -1 ? (
                <Link
                  key={index}
                  className={styles.lightBoxItem}
                  href={videoObject?.videoLink}
                >
                  <div
                    className={`${styles["lightBoxItemChild"]} ${styles["video-icon"]}`}
                  >
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL +
                            "k_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL +
                      "k_" +
                      data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ) : (
                <Link
                  key={index}
                  className={styles.lightBoxItem}
                  href={
                    process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL +
                    "b_" +
                    data?.image
                  }
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL +
                            "k_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL +
                      "k_" +
                      data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              )
            ) : (
              <Link
                key={index}
                style={{ display: "none" }}
                href={
                  process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL + "b_" + data?.image
                }
              >
                <Image
                  alt=""
                  src={
                    process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL +
                    "k_" +
                    data?.image
                  }
                  width={96}
                  height={76}
                  style={{ display: "none" }}
                />
              </Link>
            )
          )}
        </LightGallery>
      );
    } else {
      //villa detay
      return (
        <LightGallery speed={500} plugins={[lgThumbnail, lgZoom, lgVideo]}>
          {photos.map((data, index) =>
            index < 10 ? (
              index === 0 ? (
                <Link
                  key={index}
                  className={styles.lightBoxItem}
                  href={`${
                    process.env.NEXT_PUBLIC_APIPHOTOS_URL + "b_" + data?.image
                  }`}
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIPHOTOS_URL +
                            "b_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIPHOTOS_URL + "k_" + data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ) : index === 9 ? (
                <Link
                  key={index}
                  className={`${styles["lightBoxItem"]} ${styles["lastLi"]}`}
                  href={
                    process.env.NEXT_PUBLIC_APIPHOTOS_URL + "b_" + data?.image
                  }
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIPHOTOS_URL +
                            "k_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                    <span>
                      {photos.length - 10 > 0 ? `+${photos.length - 10}` : "+"}
                    </span>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIPHOTOS_URL + "k_" + data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ) : index == 1 && kayitIndex != -1 ? (
                <Link
                  key={index}
                  className={styles.lightBoxItem}
                  href={videoObject?.videoLink}
                >
                  <div
                    className={`${styles["lightBoxItemChild"]} ${styles["video-icon"]}`}
                  >
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIPHOTOS_URL +
                            "k_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIPHOTOS_URL + "k_" + data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ) : (
                <Link
                  key={index}
                  className={styles.lightBoxItem}
                  href={
                    process.env.NEXT_PUBLIC_APIPHOTOS_URL + "b_" + data?.image
                  }
                >
                  <div className={styles.lightBoxItemChild}>
                    <div className={styles.imageBox}>
                      <div
                        className={styles.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_APIPHOTOS_URL +
                            "k_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_APIPHOTOS_URL + "k_" + data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              )
            ) : (
              <Link
                key={index}
                style={{ display: "none" }}
                href={
                  process.env.NEXT_PUBLIC_APIPHOTOS_URL + "b_" + data?.image
                }
              >
                <Image
                  alt=""
                  src={
                    process.env.NEXT_PUBLIC_APIPHOTOS_URL + "k_" + data?.image
                  }
                  width={96}
                  height={76}
                  style={{ display: "none" }}
                />
              </Link>
            )
          )}
        </LightGallery>
      );
    }
  } else {
    return;
  }
});

export default Gallery;
