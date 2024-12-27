import styles from "./testimonialcard.module.css";
import { useEffect, useState } from "react";

export default function TestimonialCard({ data }) {
  const [coverPhotoUrl, setCoverPhotoUrl] = useState("");
  useEffect(() => {
    data?.attributes?.villa?.data?.attributes?.photos?.data.map((item) => {
      if (item.attributes.line === 0) {
        setCoverPhotoUrl(item.attributes.photo.data.attributes.url);
      }
    });
  }, []);

  const date = new Date(data?.attributes?.createdAt);
  return (
    <div className={styles.cardContainer}>
      <div className={styles.ulTop}>
        <div className={styles.imgBox}>
          {coverPhotoUrl !== "" ? (
            <div
              className={styles.bgImage}
              style={{ backgroundImage: `url(${coverPhotoUrl})` }}
            ></div>
          ) : (
            <div
              className={styles.bgImage}
              style={{
                backgroundImage: `url(/gifs/loading.gif)`,
                backgroundSize: "50%",
              }}
            ></div>
          )}
        </div>
        <div className={styles.textBox}>
          <div className={styles.title}>
            {data?.attributes?.villa?.data?.attributes?.name}
          </div>
          <div className={styles.location}>
            {data?.attributes?.villa?.data?.attributes?.region}
          </div>
        </div>
      </div>
      <div className={styles.ulCenter}>“ {data?.attributes?.comment} “</div>
      <div className={styles.ulBottom}>
        <div className={styles.name}>{data?.attributes?.name}</div>
        <div className={styles.date}>{date?.toLocaleDateString()}</div>
      </div>
    </div>
  );
}
