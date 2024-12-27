import styles from "./villaRentInfo.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function VillaRent() {
  const { t } = useTranslation("common");
  return (
    <div className={styles.villaRent}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.colon}>
            <div className={styles.rentTitle}>{t("rentOutYourVilla")}</div>
            <div className={styles.rentDesc}>{t("rentOutYourVillaText")}</div>
            <div className={styles.linkBox}>
              <Link href="/kiraya-ver" className={styles.pinkButton}>
                <span>{t("rentItOut")}</span>
              </Link>
            </div>
          </div>
          <div className={styles.colon}>
            <div className={styles.rentTitle}>
              {t("specialFoodBasketForYou")}
            </div>
            <div className={styles.rentDesc}>
              {t("specialFoodBasketForYouText")}
            </div>
            <div className={styles.linkBox}>
              <Link
                onClick={(e) => e.preventDefault()}
                href="#"
                className={styles.blueButton}
              >
                <span>{t("seeBaskets")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.leftAbs}></div>
      <div className={styles.rightAbs}></div>
    </div>
  );
}
