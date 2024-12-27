"use client";
import styles from "./apart.module.css";
import Link from "next/link";
import VillaCard from "../villa/card/villaCard";
import { useTranslation } from "react-i18next";

export default function Apart({ aparts }) {
  const { t } = useTranslation("common");
  return (
    <div className={styles.apartments}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.titleBox}>
            <div className={styles.title}>{t("ourApartments")}</div>
            <div className={styles.subTitle}>{t("ourApartmentsText")}</div>
          </div>
          <ul>
            {/* {
                            
                            stockData.map((data, index) =>
                                <VillaCard key={index} data={data} type="apart" />
                            )} */}

            {aparts?.data?.map((apart, index) => (
              <VillaCard
                key={index}
                data={apart}
                type="apart"
                listPage={true}
                photos={apart?.photos}
              />
            ))}
          </ul>
          <div className={styles.linkBox}>
            <Link className={styles.greyButton} href="/apartlar">
              <span>{t("all")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
