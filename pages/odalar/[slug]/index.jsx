import VillaCard from "@/components/index/villa/card/villaCard";
import { getRoom } from "@/services/villa";
import { useRouter } from "next/router";
import styles from "./page.module.css";
import Reservation from "@/components/villaDetail/rightBar/reservation/reservation";
import Calendar from "@/components/villaDetail/leftBar/calendar/calendar";
import DistanceRuler from "@/components/villaDetail/leftBar/distanceRuler/distanceRuler";
import Gallery from "@/components/villaDetail/leftBar/gallery/gallery";
import PriceTable from "@/components/villaDetail/leftBar/priceTable/priceTable";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import { useEffect, useState } from "react";
import Seo from "@/components/seo";
import { priceTypes } from "@/data/data";
import { calculatePriceType, getPriceRange } from "@/utils/globalUtils";
// import Comments from "@/components/other/comment/Comments";
import CommentForm from "@/components/other/commentForm/CommentForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { capitalizeWords } from "@/utils/globalUtils";
import BottomMenu from "@/components/bottoMobileMenu";
import nookies, { parseCookies } from "nookies";
import { getCurrencies } from "@/services";
import DetailTitleBox from "@/components/villaDetail/detailTitleBox/detailTitleBox";
import ProductImageBox from "@/components/villaDetail/productImageBox/productImageBox";
import DetailDesc from "@/components/villaDetail/detailDesc/detailsDesc";
import DynamicDistanceRulerComponent from "@/components/villaDetail/leftBar/distanceRuler/dynamicDistanceRuler";
import DynamicPriceTableComponent from "@/components/villaDetail/leftBar/priceTable/dynamicPriceTable";
import DynamicCalendarComponent from "@/components/villaDetail/leftBar/calendar/dynamicCalendarComponent";

export default function List({
  roomDetail,
  nearVillas,
  imgs,
  totalPage,
  roomSlug,
  villaName,
}) {
  const { t, i18n } = useTranslation("common");
  const currentPriceTypeText = calculatePriceType(i18n.language);
  const router = useRouter();
  const [ready, setReady] = useState(true);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [currencies, setCurrencies] = useState(null);

  useEffect(() => {
    const cookies = parseCookies();
    setCurrencies(JSON.parse(cookies.currencies));
  }, []);

  if (roomDetail?.data != null) {
    return (
      <>
        <Seo
          pageTitle={
            roomDetail?.data?.metaTitle +
            `${
              roomDetail?.data?.town ? " " + roomDetail?.data?.town : ""
            } | Labirent Fethiye`
          }
          pageDesc={roomDetail?.data?.metaDescription}
        />
        {/* <section className={styles.breadCrumb}>
          <div className={styles.container}>
            <div className={styles.breadCrumbBox}>
              <ul className={styles.breadCrumbList}>
                <li className={styles.breadCrumbItem}>
                  <Link href="/">Anasayfa</Link>
                </li>
                {roomDetail?.data?.categories[0] && (
                  <li className={styles.breadCrumbItem}>
                    <Link href={`/villalar/${categorySlug}`}>
                      {
                        roomDetail?.data?.categories[0]?.categoryDetails[0]
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
            villaDetail={roomDetail}
            currentPriceTypeText={currentPriceTypeText}
            i18n={i18n}
            t={t}
          />
          <ProductImageBox from="roomDetail" imgs={roomDetail?.photos} />
          <div className={styles.villaDetailContentBox}>
            <div className={styles.container}>
              <div className={styles.villaDetailContent}>
                <div className={styles.left}>
                  <DetailDesc
                    t={t}
                    villaDetail={roomDetail}
                    isDescOpen={isDescOpen}
                    setIsDescOpen={setIsDescOpen}
                  />
                  <DynamicDistanceRulerComponent
                    t={t}
                    language={i18n.language}
                    roomSlug={"room"}
                  />
                  <DynamicPriceTableComponent
                    roomSlug={roomSlug}
                    t={t}
                    priceTypeNumber={roomDetail?.data?.priceType}
                    currencies={currencies}
                    selectedLanguage={i18n.language}
                  />
                  <DynamicCalendarComponent
                    t={t}
                    ready={ready}
                    priceTypeText={currentPriceTypeText}
                    priceType={roomDetail?.data?.priceType}
                    roomSlug={roomSlug}
                    selectedLanguage={i18n.language}
                  />
                  {/* <Calendar
                    t={t}
                    ready={ready}
                    dates={roomDetail?.data?.reservationCalendars || []}
                    calendarPrices={roomDetail?.data?.prices || []}
                    priceTypeText={currentPriceTypeText}
                    priceType={roomDetail?.data?.priceType}
                  /> */}
                </div>
                <div id="makeReservation" style={{ paddingTop: 20 }}>
                  <div className={styles.right}>
                    <div className={styles.general}>
                      <Reservation
                        t={t}
                        priceType={roomDetail?.data?.priceType}
                        priceTypeText={currentPriceTypeText}
                        roomSlug={roomSlug}
                        villaName={villaName}
                        prices={[
                          { price: roomDetail?.data?.minPrice },
                          { price: roomDetail?.data?.maxPrice },
                        ]}
                        villaFirstPhoto={
                          roomDetail?.data?.photos[0]?.image || null
                        }
                        region={
                          roomDetail?.data?.district +
                          " / " +
                          roomDetail?.data?.town
                        }
                      />
                      {/* <FoodPackage /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {roomDetail?.data[0]?.attributes?.video && (
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
                    {roomDetail?.data[0]?.attributes?.video && (
                      <li className={styles.popupImage}>
                        <div className={styles.title}>
                          {t("promotionalVideo")}
                        </div>
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
            </div>
          )}
          {/* <div className={styles.customerCommentsBox}>
            <div className={styles.container}>
              <div className={styles.customerComments}>
                <Comments />
                <CommentForm t={t} />
              </div>
            </div>
          </div> */}
          {/* {nearVillas?.data?.length > 0 && (
            <div className={styles.apartments}>
              <div className={styles.container}>
                <div className={styles.box}>
                  <div className={styles.titleBox}>
                    <div className={styles.title}>Yakınındaki Villalar</div>
                    <div className={styles.subTitle}>
                      Villalarımız arasından en seçkinlerini sizler için
                      derledik.
                    </div>
                  </div>
                  <ul>
                    {nearVillas?.data?.map((data, index) => (
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
          )} */}
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

export async function getServerSideProps(context) {
  // Get cookie
  let currenciesResponse;
  const cookies = nookies.get(context);

  if (!cookies.currencies) {
    const currenciesResponse = await getCurrencies();

    if (currenciesResponse.statusCode == 200) {
      // Set cookie
      nookies.set(
        context,
        "currencies",
        JSON.stringify(currenciesResponse.data),
        {
          maxAge: 1 * 24 * 60 * 60,
          path: "/",
        }
      );
    }
  }

  const slug = context.params?.slug;
  const totalPage = 1;
  const roomDetail = await getRoom(slug);
  const imgs = roomDetail?.data?.photos || [];
  return {
    props: {
      roomSlug: slug,
      villaName: roomDetail?.data?.name || "",
      roomDetail,
      imgs,
      totalPage,
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
}
