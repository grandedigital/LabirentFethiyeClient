import {
  getAllVillaByCategorySlug,
  getVillaBySlug,
  getNearVillas,
} from "@/services/villa";
import { getCategories } from "@/services/category";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import nookies, { parseCookies } from "nookies";

// villa detay
import Link from "next/link";
import styles from "./page.module.css";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lg-video.css";
import lgVideo from "lightgallery/plugins/video";
import { useEffect, useRef, useState } from "react";
import Seo from "@/components/seo";
import Pagination from "@/components/pagination/Pagination";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { calculatePriceType, capitalizeWords } from "@/utils/globalUtils";
import BottomMenu from "@/components/bottoMobileMenu";
import Reservation from "@/components/villaDetail/rightBar/reservation/reservation";
import DetailTitleBox from "@/components/villaDetail/detailTitleBox/detailTitleBox";
import ProductImageBox from "@/components/villaDetail/productImageBox/productImageBox";
import CommentForm from "@/components/other/commentForm/CommentForm";
import VillaCard from "@/components/index/villa/card/villaCard";
import DetailDesc from "@/components/villaDetail/detailDesc/detailsDesc";
import { getCurrencies } from "@/services";
import Image from "next/image";
import DynamicPriceTableComponent from "@/components/villaDetail/leftBar/priceTable/dynamicPriceTable";
import DynamicDistanceRulerComponent from "@/components/villaDetail/leftBar/distanceRuler/dynamicDistanceRuler";
import DynamicCalendarComponent from "@/components/villaDetail/leftBar/calendar/dynamicCalendarComponent";
import DynamicCommentsComponent from "@/components/other/comment/dynamicCommentsComponent";
import FilterDropdown from "@/components/customDropdown/filterDropdown";

export default function List({
  villa,
  villaDetail,
  nearVillas,
  imgs,
  villaSlug,
  villaName,
  category,
}) {
  const { t, i18n } = useTranslation("common");
  const currentPriceTypeText = calculatePriceType(i18n.language);
  const router = useRouter();
  const slug = router?.query?.slug;
  const [ready, setReady] = useState(true);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const activePage = parseInt(router.query.p) || 1;
  const [currencies, setCurrencies] = useState(null);
  const [
    selectedAvailabilityCalendarDates,
    setSelectedAvailabilityCalendarDates,
  ] = useState([null, null]);

  //sağdaki reservationun fixedlenmesi için
  const generalRef = useRef(null);
  const topRef = useRef(null);
  const facilitiesRef = useRef(null);
  const [scrollStart, setScrollStart] = useState(0);
  const [firstScrollFinish, setFirstScrollFinish] = useState(0);
  const [position, setPosition] = useState("");

  function getVideoUrlIndex(data) {
    // Verilen diziyi döngü ile kontrol et
    for (let i = 0; i < data.length; i++) {
      // Eğer videoUrl değeri null değilse, index döndür
      if (data[i].videoUrl !== null) {
        return i;
      }
    }
    // Eğer hiç bir objede videoUrl null değilse, -1 döndür
    return -1;
  }

  function hasVideoUrl(data) {
    // Verilen diziyi döngü ile kontrol et
    for (let i = 0; i < data.length; i++) {
      // Eğer videoUrl değeri null değilse, true döndür
      if (data[i].videoUrl !== null) {
        return true;
      }
    }
    // Eğer hiç bir objede videoUrl null değilse, false döndür
    return false;
  }

  useEffect(() => {
    if (window.innerWidth > 1199 && topRef.current && facilitiesRef.current) {
      setScrollStart(
        topRef.current.getBoundingClientRect().top + window.scrollY
      );
      setFirstScrollFinish(
        facilitiesRef.current.getBoundingClientRect().top +
          window.scrollY -
          generalRef.current.getBoundingClientRect().height
      );
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (
        facilitiesRef.current.getBoundingClientRect().top +
          window.scrollY -
          generalRef.current.getBoundingClientRect().height !=
        firstScrollFinish
      ) {
        setFirstScrollFinish(
          facilitiesRef.current.getBoundingClientRect().top +
            window.scrollY -
            generalRef.current.getBoundingClientRect().height
        );
      }
      if (window.innerWidth > 1199) {
        if (scrollPosition > firstScrollFinish) {
          setPosition("fixedBottom");
          return;
        }

        if (
          scrollPosition > scrollStart &&
          scrollPosition < firstScrollFinish
        ) {
          setPosition("fixed");
        } else if (scrollPosition > firstScrollFinish) {
          setPosition("absolute");
        } else {
          setPosition("");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollStart, firstScrollFinish]);

  useEffect(() => {
    const cookies = parseCookies();
    setCurrencies(JSON.parse(cookies.currencies));

    //Genişlik  1199dan küçük olunca reservation bileşeninin css ini sabitleme
    const updateReservationCss = () => {
      if (window.innerWidth <= 1199) {
        setPosition("");
      }
    };
    window.addEventListener("resize", updateReservationCss);

    return () => {
      window.removeEventListener("resize", updateReservationCss);
    };
  }, []);

  if (villa && slug.length == 1 && villa?.data?.length > 0) {
    //kategori /villalar/balayi-villalari
    return (
      <>
        <Seo
          pageTitle={villa?.data[0]?.categoryMetaTitle + " | Labirent Fethiye"}
          pageDesc={
            "Labirent Fethiye Kiralık " +
            villa?.data[0]?.categoryMetaDescription
          }
        />
        <section className="listPage_contentDetail listPage_villasDetail">
          <div className="villas">
            <div className="listPage_container">
              <div className="box">
                <div className="top">
                  <div className="titleBox">
                    <div className="title">{category?.name || "Yok"}</div>
                    <div className="facilityListTitleAndDropdownContainer">
                      <div className="subTitle">
                        {t("thereAreFacilities", {
                          facilityCount: villa.pageInfo.totalRow,
                        })}
                      </div>
                      {/* <div className="dropdownsContainer">
                        <FilterDropdown
                          customClassName="filter1"
                          label="Villa Özellikleri"
                          options={[
                            { id: 1, option: "Merhaba" },
                            { id: 2, option: "Selam" },
                            { id: 3, option: "Nasılsın" },
                          ]}
                        />
                        <FilterDropdown
                          label="Sıralama şeklini seçiniz"
                          width={220}
                          options={[
                            { id: 1, option: "Merhaba" },
                            { id: 2, option: "Selam" },
                            { id: 3, option: "Nasılsın" },
                          ]}
                        />
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  <div className="row">
                    <ul>
                      {villa?.data?.map((villa, index) => (
                        <VillaCard
                          listPage={true}
                          key={index}
                          data={villa}
                          photos={villa?.photos}
                        />
                      ))}
                    </ul>
                  </div>
                </div>
                <Pagination
                  newActivePage={activePage}
                  pageCount={Math.ceil(villa.pageInfo.totalRow / 20)}
                />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } else if (slug.length == 1 && villaDetail?.data != null) {
    //villa detay
    return (
      <>
        <Seo
          pageTitle={
            villaDetail?.data?.metaTitle +
            " " +
            villaDetail?.data?.town +
            " | Labirent Fethiye"
          }
          pageDesc={villaDetail?.data?.metaDescription}
        />
        <section className={styles.breadCrumb}>
          <div className={styles.container}>
            <div className={styles.breadCrumbBox}>
              <ul className={styles.breadCrumbList}>
                <li className={styles.breadCrumbItem}>
                  <Link href="/">{capitalizeWords(t("headerHomePage"))}</Link>
                </li>
                {/* {villaDetail?.data?.categories && (
                  <li className={styles.breadCrumbItem}>
                    <Link href={`/villalar/${categorySlug || "yok"}`}>
                      {villaDetail?.data?.categories[0]?.categoryDetails[0]
                        ?.name || "yok"}
                    </Link>
                  </li>
                )} */}
              </ul>
            </div>
          </div>
        </section>
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
          <ProductImageBox imgs={imgs} />
          <div ref={topRef} className={styles.villaDetailContentBox}>
            <div className={styles.container}>
              <div className={styles.villaDetailContent}>
                <div className={styles.left}>
                  <DetailDesc
                    t={t}
                    villaDetail={villaDetail}
                    isDescOpen={isDescOpen}
                    setIsDescOpen={setIsDescOpen}
                  />
                  <DynamicDistanceRulerComponent
                    t={t}
                    language={i18n.language}
                    villaSlug={villaSlug}
                  />
                  <DynamicPriceTableComponent
                    villaSlug={villaSlug}
                    t={t}
                    priceTypeNumber={villaDetail.data.priceType}
                    currencies={currencies}
                    selectedLanguage={i18n.language}
                  />
                  <DynamicCalendarComponent
                    setSelectedAvailabilityCalendarDates={
                      setSelectedAvailabilityCalendarDates
                    }
                    t={t}
                    ready={ready}
                    priceTypeText={currentPriceTypeText}
                    priceType={villaDetail.data.priceType}
                    villaSlug={villaSlug}
                    selectedLanguage={i18n.language}
                  />
                  <div ref={facilitiesRef}></div>
                </div>
                <div id="makeReservation">
                  <div
                    ref={generalRef}
                    className={`${styles["right"]} ${position}`}
                  >
                    <div className={styles.turizmContainer}>
                      <Image
                        src="/images/tcTurizm.png"
                        width={50}
                        height={50}
                        alt="Picture of the author"
                      />
                      <div className={styles.turizmTitleAndNo}>
                        <span className={styles.turizmTitle}>
                          T.C Kültür ve Turizm Bakanlığı
                        </span>
                        <span className={styles.turizmDocumentNo}>
                          Belge No {villaDetail?.data?.villaNumber}
                        </span>
                      </div>
                    </div>
                    <div className={styles.general}>
                      <Reservation
                        selectedAvailabilityCalendarDates={
                          selectedAvailabilityCalendarDates
                        }
                        t={t}
                        priceType={villaDetail?.data?.priceType}
                        priceTypeText={currentPriceTypeText}
                        villaSlug={villaSlug}
                        villaName={villaName}
                        prices={[
                          { price: villaDetail?.data?.minPrice },
                          { price: villaDetail?.data?.maxPrice },
                        ]}
                        villaFirstPhoto={
                          villaDetail?.data?.photos
                            ? villaDetail?.data?.photos[0]?.image
                            : null
                        }
                        region={
                          villaDetail?.data?.district +
                          " / " +
                          villaDetail?.data?.town
                        }
                      />
                      {/* <FoodPackage /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {true && (
            <div className={styles.dualBoxes}>
              <div className={styles.container}>
                <div className={styles.row}>
                  <ul>
                    <li>
                      <div className={styles.title}>{t("location")}</div>
                      <div
                        className={styles.box}
                        style={{
                          backgroundImage: 'url("/images/labirentMap.png")',
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                        }}
                      >
                        <div
                          className={styles.linkBox}
                          style={{
                            position: "relative",
                            width: "50px",
                            height: "50px",
                            left: "15px",
                            top: "15px",
                          }}
                        >
                          <Link
                            className={styles.blueButton2}
                            target="_blank"
                            href="https://www.google.com/maps?ll=36.575887,29.150176&z=19&t=m&hl=tr&gl=TR&mapclient=embed&cid=1633145916469788623"
                          >
                            <span>{t("location")}</span>
                          </Link>
                        </div>
                      </div>
                    </li>
                    {hasVideoUrl(villaDetail?.data?.photos) && (
                      <li className={styles.popupImage}>
                        <div className={styles.title}>
                          {t("promotionalVideo")}
                        </div>
                        <div className={styles.box}>
                          <LightGallery
                            plugins={[lgVideo]}
                            elementClassNames={styles.videoContainer}
                          >
                            <a
                              data-src={
                                villaDetail.data.photos[
                                  getVideoUrlIndex(villaDetail.data.photos)
                                ].videoUrl
                              }
                            >
                              <div className={styles.imageBox}>
                                <div
                                  className={styles.img}
                                  style={{
                                    backgroundImage: `url(${
                                      process.env.NEXT_PUBLIC_APIPHOTOS_URL +
                                      "b_" +
                                      villaDetail.data.photos[
                                        getVideoUrlIndex(
                                          villaDetail.data.photos
                                        )
                                      ].image
                                    })`,
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
          <div className={styles.customerCommentsBox}>
            <div className={styles.container}>
              <div className={styles.customerComments}>
                <DynamicCommentsComponent
                  t={t}
                  villaSlug={villaSlug}
                  i18n={i18n}
                />
                <CommentForm t={t} slug={villaSlug} type={0} />
              </div>
            </div>
          </div>
          {nearVillas?.data?.length > 0 && (
            <div className={styles.apartments}>
              <div className={styles.container}>
                <div className={styles.box}>
                  <div className={styles.titleBox}>
                    <div className={styles.title}>{t("recommendedVillas")}</div>
                    <div className={styles.subTitle}>{t("ourVillasText")}</div>
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
  const allCategories = getCategories(context.locale);

  // İlgili kategori verisini bulmak
  const categoryPromise = allCategories.then(
    (categories) =>
      categories?.data?.find((item) => item?.slug == slug[0]) || true
  );

  const villaPromise = categoryPromise.then((category) =>
    getAllVillaByCategorySlug(
      context.locale,
      category?.slug,
      context.query?.p ? context.query?.p - 1 : 0
    )
  );

  const villaDetailPromise = categoryPromise.then((category) =>
    category == true ? getVillaBySlug(slug[0], context.locale) : null
  );

  // Paralel olarak verileri al
  const [allCategoriesData, villa, villaDetail] = await Promise.all([
    allCategories,
    villaPromise,
    villaDetailPromise,
  ]);
  const imgs = villaDetail?.data?.photos || [];
  const category =
    villaDetail == null
      ? allCategoriesData?.data?.find((item) => item?.slug == slug[0])
      : "yok";

  return {
    props: {
      villaSlug: slug[0],
      villaName: villaDetail?.data?.name || null,
      villa,
      villaDetail,
      imgs,
      category,
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
}
