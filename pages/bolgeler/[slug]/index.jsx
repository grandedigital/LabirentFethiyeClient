import styles from "./page.module.css";
import React, { useEffect } from "react";
import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import TreeStep from "@/components/index/treestep/treestep";
import { getRegion } from "@/services/region";
import Seo from "@/components/seo";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
export default function Bolge({ region }) {
  const { t } = useTranslation("common")
  const router = useRouter();
  const renderHtmlContent = () => {
    const description = region?.data.webPageDetails[0].descriptionLong;
    const strongContent = description?.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );
    const headerContent = strongContent?.replace(
      /(#+)\s*(.*?)\s*(?=(?:\r\n|\r|\n|$))/g,
      (_, hashes, content) =>
        `<h${hashes.length}>${content}</h${hashes.length}>`
    );
    const finalContent =
      headerContent?.length > 0 ? headerContent : `<p>${strongContent}</p>`;
    return { __html: finalContent };
  };
  if (region?.data) {
    return (
      <>
        <Seo
          pageTitle={region?.data?.metaTitle}
          pageDesc={region?.data?.metaDescription}
        />
        <BreadCrumb />
        <section
          className={`${styles["contentDetail"]} ${styles["corporate"]}`}
        >
          <div className={styles.titleBox}>
            <div className={styles.container}>
              <h1 className={styles.title}>
                {region?.data?.webPageDetails[0]?.title} {t("villaForRent")}
              </h1>
            </div>
          </div>
          <div className={styles.textBox}>
            <div className={styles.container}>
              <div className={styles.text}>
                <div
                  dangerouslySetInnerHTML={renderHtmlContent()}
                  style={{ whiteSpace: "pre-line" }}
                />
              </div>
            </div>
          </div>
          <TreeStep from="blogDetail" />
        </section>
      </>
    );
  } else {
    useEffect(() => {
      router.replace("/404");
    }, []);
  }
}
export async function getServerSideProps({ query, locale }) {
  const slug = query?.slug;
  const region = await getRegion({ slug: slug, language: locale });
  return {
    props: { region, ...(await serverSideTranslations(locale, ["common"])) },
  };
}
