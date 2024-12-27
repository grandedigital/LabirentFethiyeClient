"use client";
import styles from "./slider.module.css";
import ReservationBox from "./reservation/reservation";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Slider() {
  const { t } = useTranslation("common");
  return (
    <section className={styles.slider}>
      <div className={styles.sliderBox}>
        {/* <div className={styles.bgImage}>
                </div> */}
        <Image
          width={0}
          height={0}
          alt="bgImage"
          sizes="100%"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src="/images/slider-1.jpg"
        />

        <div className={styles.sliderText}>
          <ReservationBox />
          <div className={styles.sliderSubTitle}>{t("sliderText1")}</div>
          <div className={styles.sliderTitle}>
            <strong>{t("sliderText2")}</strong>
            <p>{t("sliderText3")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
