import styles from "./detailDesc.module.css";
import { capitalizeWords } from "@/utils/globalUtils";

export default function DetailDesc({
  isDescOpen,
  setIsDescOpen,
  villaDetail,
  t,
}) {
  return (
    <>
      <div className={styles.villaDetailTitle}>{t("facilityDetails")}</div>
      <div className={styles.villaDetailDesc}>
        <div
          dangerouslySetInnerHTML={{
            __html: villaDetail?.data?.descriptionLong,
          }}
          style={{ whiteSpace: "pre-line" }}
          className={`${styles["desc"]} ${isDescOpen && styles["active"]}`}
        ></div>
        <div
          className={`${styles["readMore"]} ${isDescOpen && styles["active"]}`}
        >
          <div className={styles.allButton}>
            <span onClick={() => setIsDescOpen(true)} className={styles.first}>
              {capitalizeWords(t("continued"))}...
            </span>
            <span onClick={() => setIsDescOpen(false)} className={styles.last}>
              {capitalizeWords(t("close"))}...
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
