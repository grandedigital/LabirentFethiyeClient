import Seo from "@/components/seo";
import Gallery from "@/components/villaDetail/leftBar/gallery/gallery";
import { getNearVillas, getVillaBySlug } from "@/services/villa";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./page.module.css";
import DistanceRuler from "@/components/villaDetail/leftBar/distanceRuler/distanceRuler";
import VillaCard from "@/components/index/villa/card/villaCard";
import { useRouter } from "next/router";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { capitalizeWords } from "@/utils/globalUtils";
import DetailTitleBox from "@/components/villaDetail/detailTitleBox/detailTitleBox";
import ProductImageBox from "@/components/villaDetail/productImageBox/productImageBox";
import DynamicDistanceRulerComponent from "@/components/villaDetail/leftBar/distanceRuler/dynamicDistanceRuler";

export default function SaleDetail({
  villaDetail,
  nearVillas,
  imgs,
  villaSlug,
}) {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();
  const [isDescOpen, setIsDescOpen] = useState(false);
  if (villaDetail?.data != null) {
    return (
      <>
        <Seo
          pageTitle={villaDetail?.data?.metaTitle + " | Labirent Fethiye"}
          pageDesc={villaDetail?.data?.metaDescription}
        />
        <section className={styles.breadCrumb}>
          <div className={styles.container}>
            <div className={styles.breadCrumbBox}>
              <ul className={styles.breadCrumbList}>
                <li className={styles.breadCrumbItem}>
                  <Link href="/">{capitalizeWords(t("headerHomePage"))}</Link>
                </li>
                <li className={styles.breadCrumbItem}>
                  <Link href={`/satilik-villalar`}>{t("villasForSale")}</Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section
          className={`${styles["contentDetail"]} ${styles["villaDetail"]}`}
        >
          {/* <div className={styles.detailTitleBox}>
            <div className={styles.container}>
              <div className={styles.box}>
                <div className={styles.left}>
                  <div className={styles.detailTitle}>
                    {villaDetail?.data?.name}
                  </div>
                  <div className={styles.villaInformation}>
                    <div className={styles.features}>
                      <div className={styles.colon}>
                        <i className={styles.pin_icon}></i>
                        <span>
                          {villaDetail?.data?.district} /{" "}
                          {villaDetail?.data?.town}
                        </span>
                      </div>
                      <div className={styles.colon}>
                        <i className={styles.person_icon}></i>
                        <span>
                          {villaDetail?.data?.person} {t("people")}
                        </span>
                      </div>
                      <div className={styles.colon}>
                        <i className={styles.room_icon}></i>
                        <span>
                          {villaDetail?.data?.room} {t("rooms")}
                        </span>
                      </div>
                      <div className={styles.colon}>
                        <i className={styles.bath_icon}></i>
                        <span>
                          {villaDetail?.data?.bath} {t("bath")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.price}>{t("forSale")}</div>
                </div>
              </div>
            </div>
          </div> */}
          <DetailTitleBox
            i18n={i18n}
            t={t}
            villaDetail={villaDetail}
            from="saleVillas"
          />
          {/* <div className={styles.productImagesBox}>
            <div className={styles.container}>
              <div className={styles.productImages}>
                <div className={styles.row}>
                  <Gallery photos={imgs} />
                </div>
              </div>
            </div>
          </div> */}
          <ProductImageBox imgs={imgs} />
          <div className={styles.villaDetailContentBox}>
            <div className={styles.container}>
              <div className={styles.villaDetailContent}>
                <div className={styles.left}>
                  <div className={styles.villaDetailTitle}>
                    {t("facilityDetails")}
                  </div>
                  <div className={styles.villaDetailDesc}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: villaDetail?.data?.descriptionLong,
                      }}
                      style={{ whiteSpace: "pre-line" }}
                      className={`${styles["desc"]} ${
                        isDescOpen && styles["active"]
                      }`}
                    ></div>
                    <div
                      className={`${styles["readMore"]} ${
                        isDescOpen && styles["active"]
                      }`}
                    >
                      <div className={styles.allButton}>
                        <span
                          onClick={() => setIsDescOpen(true)}
                          className={styles.first}
                        >
                          {capitalizeWords(t("continued"))}...
                        </span>
                        <span
                          onClick={() => setIsDescOpen(false)}
                          className={styles.last}
                        >
                          {capitalizeWords(t("close"))}...
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <DistanceRuler
                    data={villaDetail?.data?.distanceRulers}
                    t={t}
                  /> */}
                  <DynamicDistanceRulerComponent villaSlug={villaSlug} t={t} language={i18n.language} />
                  {/* <PriceTable
                                    data={villaDetail?.data[0]?.attributes?.price_tables?.data} t={t}
                                />
                                <Calendar
                                    ready={ready}
                                    dates={villaDetail?.data[0]?.attributes?.reservations?.data}
                                /> */}
                </div>
                <div className={styles.right}>
                  <div className={styles.general}>
                    {/* <Reservation villaId={villaDetail?.data[0]?.id} /> */}
                    {/* <FoodPackage /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.dualBoxes}>
            <div className={styles.container}>
              <div className={styles.row}>
                <ul>
                  {/* <li>
                                          <div className={styles.title}>Konum</div>
                                          <div className={styles.box} style={{ backgroundImage: `url(http://3.127.136.179:1337${villa?.attributes?.locationImage?.data?.attributes?.formats?.medium?.url})`, backgroundPosition: "center", backgroundSize: "100% 100%" }}>
                                              <div className={styles.linkBox} style={{ position: "relative", width: "50px", height: "50px", left: "15px", top: "15px" }}>
                                                  <Link className={styles.blueButton} href={villa?.attributes?.locationLink ? villa?.attributes?.locationLink : '#'} target="_blank">
                                                      <span>Konum</span>
                                                  </Link>
                                              </div>
                                          </div>
                                      </li> */}
                  {villaDetail?.data[0]?.attributes?.video && (
                    <li className={styles.popupImage}>
                      <div className={styles.title}>
                        {t("promotionalVideo")}
                      </div>
                      <div className={styles.box}>
                        <LightGallery
                          plugins={[lgZoom, lgVideo]}
                          elementClassNames={styles.videoContainer}
                        >
                          <a data-src={villaDetail?.data[0]?.attributes?.video}>
                            <div className={styles.imageBox}>
                              <div
                                className={styles.img}
                                style={{
                                  backgroundImage: `url(${imgs?.data[0]?.attributes?.photo?.data?.attributes?.url})`,
                                }}
                              ></div>
                            </div>
                          </a>
                        </LightGallery>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          {/* <div className={styles.customerCommentsBox}>
            <div className={styles.container}>
              <div className={styles.customerComments}>
                <Comments commentData={villaDetail?.data?.comments} t={t} />
                <CommentForm t={t} />
              </div>
            </div>
          </div> */}
          {nearVillas?.data?.length > 0 && (
            <div className={styles.apartments}>
              <div className={styles.container}>
                <div className={styles.box}>
                  <div className={styles.titleBox}>
                    <div className={styles.title}>{t("nearbyVillas")}</div>
                    <div className={styles.subTitle}>{t("ourVillasText")}</div>
                  </div>
                  <ul>
                    {nearVillas.data.map((data, index) => (
                      <VillaCard
                        listPage={true}
                        key={index}
                        data={data}
                        photos={data?.photos}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>
      </>
    );
  } else {
    if (typeof window !== "undefined") {
      router.replace("/404");
    }
    return null; // UI render edilmesin
  }
}
export async function getServerSideProps({ params, locale }) {
  const slug = params?.slug;
  const villaDetail = await getVillaBySlug(slug, locale);
  //const nearVillas = await getNearVillas(villaDetail?.data?.town?.id);
  const nearVillas = [];
  const imgs = villaDetail?.data?.photos;
  return {
    props: {
      villaDetail,
      nearVillas,
      imgs,
      villaSlug: slug,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
