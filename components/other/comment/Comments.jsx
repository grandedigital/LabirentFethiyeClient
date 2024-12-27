import { useState } from "react";
import styles from "./comments.module.css";
import { formatDate } from "@/utils/date";
import dynamic from "next/dynamic";

const VideoWithComment = dynamic(
  () => import("../../../components/villaDetail/VideoWithComment"),
  {
    ssr: true,
  }
);

export default function Comments({ commentData, t }) {
  const [numberOfCommentsShown, setNumberOfCommentsShown] = useState(3);
  const [isShowingAllComments, setShowingAllComments] = useState(
    commentData?.length < 3 ? true : false
  );
  const Star = ({ rating }) => {
    return (
      <>
        {Array.from({ length: Math.round(rating) }, (_, index) => (
          <div
            key={index}
            className={`${styles["starItem"]} ${styles["active"]}`}
          >
            <div className={styles.star}></div>
          </div>
        ))}
      </>
    );
  };

  if (commentData?.length > 0) {
    return (
      <>
        {/* <div className={styles.title}>4,91 · {commentData?.length} değerlendirme</div>
        <div className={styles.commentRating}>
          <ul>
            <li>
              <div className={styles.name}>Temizlik</div>
              <div className={styles.rating}>
                <div className={styles.graphic}>
                  <span></span>
                </div>
                <div className={styles.rate}>1.8</div>
              </div>
            </li>
            <li>
              <div className={styles.name}>İletişim</div>
              <div className={styles.rating}>
                <div className={styles.graphic}>
                  <span></span>
                </div>
                <div className={styles.rate}>2.5</div>
              </div>
            </li>
            <li>
              <div className={styles.name}>Giriş</div>
              <div className={styles.rating}>
                <div className={styles.graphic}>
                  <span></span>
                </div>
                <div className={styles.rate}>5.0</div>
              </div>
            </li>
            <li>
              <div className={styles.name}>Doğruluk</div>
              <div className={styles.rating}>
                <div className={styles.graphic}>
                  <span></span>
                </div>
                <div className={styles.rate}>4.7</div>
              </div>
            </li>
            <li>
              <div className={styles.name}>Konum</div>
              <div className={styles.rating}>
                <div className={styles.graphic}>
                  <span></span>
                </div>
                <div className={styles.rate}>3.9</div>
              </div>
            </li>
            <li>
              <div className={styles.name}>Kalite/fiyat oranı</div>
              <div className={styles.rating}>
                <div className={styles.graphic}>
                  <span></span>
                </div>
                <div className={styles.rate}>4.7</div>
              </div>
            </li>
          </ul>
        </div> */}
        <div className={styles.comments}>
          <div
            className={styles.title}
            style={{ textAlign: "center", fontSize: 26 }}
          >
            Yorumlar
          </div>
          <ul>
            {commentData?.slice(0, numberOfCommentsShown).map((item, index) => {
              return (
                <li key={"customerComment" + index + 1}>
                  <div className={styles.imageBox}>
                    <div className={styles.img}>
                      <img src="/images/person-3.png" alt="" />
                    </div>
                    {item?.video != null ? <VideoWithComment t={t} /> : null}
                  </div>
                  <div className={styles.name}>
                    {item.name} {item.surName}
                  </div>
                  <div className={styles.dateandRating}>
                    <div className={styles.date}>
                      {formatDate(item?.createdAt)}
                    </div>
                    <div className={styles.stars}>
                      <div className={styles.starItems}>
                        <Star rating={item?.rating} />
                      </div>
                      <div className={styles.text}>
                        ({Math.round(item?.rating)} reviews)
                      </div>
                    </div>
                  </div>
                  <div className={styles.descBox}>{item?.commentText}</div>
                </li>
              );
            })}
          </ul>
          {!isShowingAllComments && (
            <div className={styles.linkBox}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowingAllComments(true);
                  setNumberOfCommentsShown(commentData?.length);
                }}
                className={styles.blueButtonArrowOpa}
              >
                <span>
                  {t("commentLinkText", { commentCount: commentData?.length })}
                </span>
              </a>
            </div>
          )}
        </div>
      </>
    );
  } else {
    return null;
  }
}
