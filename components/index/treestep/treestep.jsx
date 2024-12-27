import styles from "./treestep.module.css";
import { useTranslation } from "react-i18next";

export default function TreeStep({ from }) {
  const { t } = useTranslation("common");
  return (
    <div style={from && { display: "inline" }} className={styles.threeSteps}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.titleBox}>
            <div className={styles.title}>3 {t("easyBookingInSteps")}</div>
            <div className={styles.subTitle}>
              {t("thePerfectHolidayStartsHere")}
            </div>
          </div>
          <ul>
            <li>
              <div className={styles.iconBox}>
                <i
                  style={{
                    backgroundImage: `url(/images/search-favorite.png)`,
                  }}
                ></i>
              </div>
              <div className={styles.title}>
                {t("searchAmongHundredsofVillas")}
              </div>
              <div className={styles.desc}>
                {t("searchAmongHundredsofVillasText")}
              </div>
            </li>
            <li>
              <div className={styles.iconBox}>
                <i style={{ backgroundImage: `url(/images/send-2.png)` }}></i>
              </div>
              <div className={styles.title}>{t("sendRequest")}</div>
              <div className={styles.desc}>{t("sendRequestText")}</div>
            </li>
            <li>
              <div className={styles.iconBox}>
                <i style={{ backgroundImage: `url(/images/like-tag.png)` }}></i>
              </div>
              <div className={styles.title}>{t("completeReservation")}</div>
              <div className={styles.desc}>{t("completeReservationText")}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
