"use client";
import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import { useEffect, useRef, useState } from "react";
import Seo from "@/components/seo";
import styles from "./page.module.css";
import { getFrequentlyAskedQuestions } from "@/services/webpage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

export default function SSS({ sss }) {
  const { t } = useTranslation("common");
  const fieldRef = useRef();
  const [accordionIndex, setIndex] = useState(0);

  const scroolBottom = () => {
    fieldRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (fieldRef.current && accordionIndex != 0) {
      const timer = setTimeout(() => scroolBottom(), 600);
      return () => clearTimeout(timer);
    }
  }, [accordionIndex]);

  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye | Sıkça Sorulan Sorular"}
        pageDesc={"Labirent Fethiye Sıkça Sorulan Sorular"}
      />
      <BreadCrumb link="sss" />
      <section className={`${styles["contentDetail"]} faq`}>
        <div className="accordionBox">
          <div className={styles.container}>
            <div className={styles.titleBox}>
              <h1 className={styles.title}>{t("questionAndAnswer")}</h1>
            </div>
            <div className={styles.accordion}>
              <div
                ref={accordionIndex == 0 ? fieldRef : null}
                onClick={
                  accordionIndex == 0 ? () => setIndex(-1) : () => setIndex(0)
                }
                className={`${styles["accordionColumn"]} ${
                  accordionIndex == 0 ? styles["open"] : ""
                }`}
                style={{ height: "70px" }}
              >
                <div className={styles.title}>{t("faq")}</div>
                <div className={styles.desc}>{t("faqFırstItemDesc")}</div>
              </div>
              {sss?.data?.map((item, index) => (
                <div
                  key={"faq" + index + 1}
                  ref={accordionIndex == index + 1 ? fieldRef : null}
                  onClick={
                    accordionIndex == index + 1
                      ? () => setIndex(-1)
                      : () => setIndex(index + 1)
                  }
                  className={`${styles["accordionColumn"]} ${
                    accordionIndex == index + 1 ? styles["open"] : ""
                  }`}
                  style={{ height: "70px" }}
                >
                  <div className={styles.title}>
                    {item?.webPageDetails[0]?.title}
                  </div>
                  <div className={styles.desc}>
                    {item?.webPageDetails[0]?.descriptionShort}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  const sss = await getFrequentlyAskedQuestions();
  return {
    props: { sss, ...(await serverSideTranslations(locale, ["common"])) },
  };
}
