import styles from "./page.module.css";
import styles2 from "./page2.module.css";
import React, { useEffect } from "react";
import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import TreeStep from "@/components/index/treestep/treestep";
import { getActivate } from "@/services/activite";
import Seo from "@/components/seo";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import Link from "next/link";
import Image from "next/image";
import { memo } from "react";

// const Gallery = memo(function Gallery({ photos, from }) {
//   const videoObject = photos?.find((item) => item?.videoLink != null);
//   // 1. videoLink'i null olmayan kaydı bul ve diziden çıkar
//   const kayitIndex = photos.findIndex((item) => item.videoLink !== null);
//   //video var ise
//   if (kayitIndex !== -1) {
//     const [kayit] = photos.splice(kayitIndex, 1); // Kayıt çıkarıldı
//     // 2. Kayıtı ilk elemandan sonra dizinin 1. indexine ekle
//     photos.splice(1, 0, kayit);
//   }
// });

export default function Aktivite({ activate }) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const renderHtmlContent = () => {
    const description =
      activate?.data?.webPageDetails?.[0]?.descriptionLong ||
      "Default Description";
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
  if (activate?.data) {
    return (
      <>
        <Seo
          pageTitle={activate?.data?.metaTitle}
          pageDesc={activate?.data?.metaDescription}
        />
        <BreadCrumb />
        <section
          className={`${styles["contentDetail"]} ${styles["corporate"]}`}
        >
          <div className={styles.titleBox}>
            <div className={styles.container}>
              <h1 className={styles.title}>
                {activate?.data?.webPageDetails?.[0]?.title}
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
          <div className={styles.container}>
            <LightGallery
              elementClassNames="activatesGallery"
              speed={500}
              plugins={[lgThumbnail, lgZoom, lgVideo]}
            >
              {activate?.data?.photos?.map((data, index) => (
                <Link
                  key={index}
                  className={styles2.lightBoxItem}
                  href={
                    process.env.NEXT_PUBLIC_WEBHOTOS_URL + "b_" + data?.image
                  }
                >
                  <div className={styles2.lightBoxItemChild}>
                    <div className={styles2.imageBox}>
                      <div
                        className={styles2.img}
                        style={{
                          backgroundImage: `url(${
                            process.env.NEXT_PUBLIC_WEBHOTOS_URL +
                            "k_" +
                            data?.image
                          })`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <Image
                    alt=""
                    src={
                      process.env.NEXT_PUBLIC_WEBHOTOS_URL + "b_" + data?.image
                    }
                    width={96}
                    height={76}
                    style={{ display: "none" }}
                  />
                </Link>
              ))}
            </LightGallery>
          </div>
          <TreeStep from="activateDetail" />
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
  const activate = await getActivate({ slug: slug, language: locale });
  return {
    props: { activate, ...(await serverSideTranslations(locale, ["common"])) },
  };
}
