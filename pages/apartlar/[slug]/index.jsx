import VillaCard from "@/components/index/villa/card/villaCard";
import { getHotel } from "@/services/villa";
import { useRouter } from "next/router";

// villa detay
import styles from "./page.module.css";
// import FoodPackage from "@/components/villaDetail/rightBar/foodPackage/foodPackage";
// import Reservation from "@/components/villaDetail/rightBar/reservation/reservation";
// import Calendar from "@/components/villaDetail/leftBar/calendar/calendar";
// import PriceTable from "@/components/villaDetail/leftBar/priceTable/priceTable";
// import LightGallery from "lightgallery/react";
// import lgZoom from "lightgallery/plugins/zoom";
// import lgVideo from "lightgallery/plugins/video";
import { useState } from "react";
import Seo from "@/components/seo";
// import VideoWithComment from "@/components/villaDetail/VideoWithComment";
import Comments from "@/components/other/comment/Comments";
import CommentForm from "@/components/other/commentForm/CommentForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { calculatePriceType } from "@/utils/globalUtils";
import { useTranslation } from "react-i18next";
import BottomMenu from "@/components/bottoMobileMenu";
import DetailTitleBox from "@/components/villaDetail/detailTitleBox/detailTitleBox";
import ProductImageBox from "@/components/villaDetail/productImageBox/productImageBox";
import DetailDesc from "@/components/villaDetail/detailDesc/detailsDesc";

export default function List({ villaDetail, imgs, allCategories }) {
  const { t, i18n } = useTranslation("common");
  const currentPriceTypeText = calculatePriceType(i18n.language);
  const router = useRouter();
  const slug = router?.query?.slug;
  const categorySlug = allCategories?.data?.find(
    (item) =>
      item?.categoryDetails[0]?.name ==
      villaDetail?.data?.categories[0]?.categoryDetails[0]?.name
  )?.slug;
  const [ready, setReady] = useState(true);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const activePage = parseInt(router.query.p) || 1;

  if (villaDetail?.data != null) {
    return (
      <>
        <Seo
          pageTitle={"Labirent Fethiye | " + villaDetail?.data?.metaTitle}
          pageDesc={villaDetail?.data?.metaDescription}
        />
        {/* <section className={styles.breadCrumb}>
          <div className={styles.container}>
            <div className={styles.breadCrumbBox}>
              <ul className={styles.breadCrumbList}>
                <li className={styles.breadCrumbItem}>
                  <Link href="/">Anasayfa</Link>
                </li>
                {villaDetail?.data?.categories[0] && (
                  <li className={styles.breadCrumbItem}>
                    <Link href={`/villalar/${categorySlug}`}>
                      {
                        villaDetail?.data?.categories[0]?.categoryDetails[0]
                          ?.name
                      }
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </section> */}
        <BottomMenu t={t} />
        <section
          className={`${styles["contentDetail"]} ${styles["villaDetail"]}`}
        >
          <DetailTitleBox
            t={t}
            i18n={i18n}
            villaDetail={villaDetail}
            currentPriceTypeText={currentPriceTypeText}
          />
          <ProductImageBox imgs={imgs} from="hotelList" />
          <div className={styles.villaDetailContentBox}>
            <div className={styles.container}>
              <div className={styles.villaDetailContent}>
                <div className={styles.left}>
                  <DetailDesc
                    t={t}
                    villaDetail={villaDetail}
                    isDescOpen={isDescOpen}
                    setIsDescOpen={setIsDescOpen}
                  />
                  {/* <DistanceRuler
                    data={villaDetail?.data?.distanceRulers}
                    t={t}
                  /> */}
                  {villaDetail?.data?.rooms?.length > 0 && (
                    <div className={styles.apartments}>
                      <div className={styles.container}>
                        <div className={styles.box}>
                          <div className={styles.titleBox}>
                            <div className={styles.title}>{t("rooms")}</div>
                            <div className={styles.subTitle}>
                              {t("ourApartmentRooms")}
                            </div>
                          </div>
                          <ul>
                            {villaDetail?.data?.rooms.map((data, index) => (
                              <VillaCard
                                listPage={true}
                                key={"room" + index}
                                data={data}
                                photos={data?.photos}
                                from={"room"}
                              />
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* <PriceTable data={villaDetail?.data?.priceTables} /> */}
                  {/* <Calendar
                    ready={ready}
                    dates={villaDetail?.data?.reservationCalendars || []}
                  /> */}
                </div>
                {/* <div id="makeReservation" style={{ paddingTop: 20 }}>
                  <div className={styles.right}>
                    <div className={styles.general}>
                      <Reservation
                        villaId={villaId}
                        villaName={villaName}
                        prices={villaDetail?.data?.priceTables}
                        villaFirstPhoto={
                          villaDetail?.data?.photos[0]?.image || null
                        }
                        region={
                          villaDetail?.data?.town?.district?.name +
                          " / " +
                          villaDetail?.data?.town?.name
                        }
                      />
                      <FoodPackage />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          {/* <div className={styles.dualBoxes}>
            <div className={styles.container}>
              <div className={styles.row}>
                <ul>
                  <li>
                                        <div className={styles.title}>Konum</div>
                                        <div className={styles.box} style={{ backgroundImage: `url(http://3.127.136.179:1337${villa?.attributes?.locationImage?.data?.attributes?.formats?.medium?.url})`, backgroundPosition: "center", backgroundSize: "100% 100%" }}>
                                            <div className={styles.linkBox} style={{ position: "relative", width: "50px", height: "50px", left: "15px", top: "15px" }}>
                                                <Link className={styles.blueButton} href={villa?.attributes?.locationLink ? villa?.attributes?.locationLink : '#'} target="_blank">
                                                    <span>Konum</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                  {villaDetail?.data[0]?.attributes?.video && (
                    <li className={styles.popupImage}>
                      <div className={styles.title}>Tanıtım Videosu</div>
                      <div className={styles.box}>
                        <LightGallery
                          plugins={[lgZoom, lgVideo]}
                          elementClassNames={styles.videoContainer}
                        >
                          <a data-src="https://www.youtube.com/embed/cFYXWYyYcB0">
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
          </div> */}
          <div className={styles.customerCommentsBox}>
            <div className={styles.container}>
              <div className={styles.customerComments}>
                <Comments commentData={villaDetail?.data?.comments} t={t} />
                <CommentForm t={t} />
              </div>
            </div>
          </div>
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

export async function getServerSideProps({ params, query, locale }) {
  const slug = params?.slug;
  const villaDetail = await getHotel(slug);
  const imgs = villaDetail?.data?.photos || [];
  return {
    props: {
      //villaId: slug,
      //villaName: villaDetail?.data?.hotelDetails[0]?.name || null,
      villaDetail,
      imgs,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
