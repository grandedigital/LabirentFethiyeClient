import styles from "./foodPackage.module.css";

export default function FoodPackage() {
  return (
    <div className={styles.bottom}>
      <div className={styles.box}>
        <div className={styles.title}>{t("ourFoodPackages")}</div>
        <ul>
          <li>
            <div className={styles.imageBox}>
              <i></i>
            </div>
            <div className={styles.textBox}>
              <div className={styles.title}>{t("foodPackage")} 1</div>
              <div className={styles.desc}>{t("foodPackage1Message")}</div>
            </div>
          </li>
          <li>
            <div className={styles.imageBox}>
              <i></i>
            </div>
            <div className={styles.textBox}>
              <div className={styles.title}>{t("foodPackage")} 2</div>
              <div className={styles.desc}>{t("foodPackage1Message")}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
