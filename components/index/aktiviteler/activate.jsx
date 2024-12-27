import styles from "./page.module.css";
import { default as ActivateCard } from "../region/card/regionCard";
import { useTranslation } from "react-i18next";

export default function Activates({ activates, homePage }) {
  const { t } = useTranslation("common");
  if (activates?.totalCount == 0) return null;

  return (
    <div className={styles.regions}>
      <div className={styles.box}>
        <div className={styles.container}>
          <div className={styles.titleBox}>
            <div className={styles.title}>{t("activites")}</div>
            {/* <div className={styles.subTitle}>{t("ourPopularRegions")}</div> */}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.container}>
            {homePage ? (
              <ul>
                {activates.data.slice(0, 4).map((region, index) => (
                  <ActivateCard key={index} data={region} />
                ))}
              </ul>
            ) : (
              <ul>
                {activates.data.map((region, index) => (
                  <ActivateCard key={index} data={region} />
                ))}
              </ul>
            )}
            <div className="arrow">
              <div className={`${styles.arrowButton} ${styles.prev}`}></div>
              <div className={`${styles.arrowButton} ${styles.next}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
