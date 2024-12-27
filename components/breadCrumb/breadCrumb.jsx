"use client";
import styles from "./breadCrumb.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { capitalizeWords } from "@/utils/globalUtils";

export default function BreadCrumb({ link }) {
  const { t } = useTranslation("common");

  const getName = () => {
    if (link == "sss") {
      return t("faq");
    } else if (link == "contact") {
      return capitalizeWords(t("headerContact"));
    } else if (link == "about") {
      return capitalizeWords(t("headerAboutUs"));
    } else if (link == "yemek-servisi") {
      return t("foodService");
    } else if (link == "kiralama-sartlari") {
      return t("rentalConditions");
    } else if (link == "rezervasyon-takip") {
      return t("reservationTracking");
    } else if (link == "sikayet-bildirimi") {
      return t("complaintNotification");
    } else if (link == "dolandiricilara-dikkat") {
      return t("bewareOfScammers");
    } else if (link == "neden-labirent") {
      return t("whyLabyrinth");
    } else if (link == "arac-kiralama") {
      return capitalizeWords(t("headerCarRental"));
    } else if (link == "kiraya-ver") {
      return t("rentItOut");
    } else {
      return link;
    }
  };
  return (
    <section className={styles.breadCrumb}>
      <div className={styles.container}>
        <div className={styles.breadCrumbBox}>
          <ul className={styles.breadCrumbList}>
            <li className={styles.breadCrumbItem}>
              <Link href="/">{capitalizeWords(t("headerHomePage"))}</Link>
            </li>
            {link && (
              <li className={styles.breadCrumbItem}>
                <Link href="" onClick={(e) => e.preventDefault()}>
                  {getName()}
                </Link>
              </li>
            )}
          </ul>
          <div className={styles.shareBox}>
            {/* <div className={styles.shareItem}>
                            <Link href="" onClick={(e) => e.preventDefault()} className={styles.share}>Paylaş</Link>
                        </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
