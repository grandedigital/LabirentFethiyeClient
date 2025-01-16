import { parseCookies, setCookie } from "nookies";
import styles from "./villaCard.module.css";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { priceTypes } from "@/data/data";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import {
  calculatePricetoTargetPriceType,
  calculatePriceType,
  convertToTurkishLira,
  moneyFormat,
} from "@/utils/globalUtils";
import { getPricesBySelectedDate } from "@/services/reservation";

export default function VillaCard({
  data,
  type,
  from,
  listPage,
  photos,
  salePage,
  activeCategoryId,
  categories,
  nightLength,
  activeTabIndex,
  priceType,
  checkIn,
  checkOut,
  isMoving,
}) {
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  const currentPriceTypeText = calculatePriceType(i18n.language);

  // const a = Math.max(...data.attributes.price_tables.data.map(o => o.attributes.price))
  const [activeImage, setActiveImage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currencies, setCurrencies] = useState(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const getPriceByDate = async () => {
      const price = await getPricesBySelectedDate(data.slug, checkIn, checkOut);
      setPrice(price.data.price);
    };
    if (nightLength != undefined) {
      getPriceByDate();
    }
  });

  useEffect(() => {
    const cookies = parseCookies();
    setCurrencies(JSON.parse(cookies.currencies));

    const timeout = setTimeout(() => setIsLoaded(true), 100); // 100ms gecikme
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setActiveImage(0);
  }, [activeTabIndex]);

  function checkVillaCategory() {
    const found = categories?.data?.find(
      (element) => element?.id == activeCategoryId
    );
    if (found) {
      return true;
    } else {
      return false;
    }
  }

  const imageHandler = (e, operation) => {
    e.preventDefault();

    if (operation == "next") {
      if (activeImage == 2) {
        setActiveImage(0);
      } else {
        setActiveImage(activeImage + 1);
      }
    } else {
      if (activeImage == 0) {
        setActiveImage(2);
      } else {
        setActiveImage(activeImage - 1);
      }
    }
  };

  const getPrice = () => {
    return moneyFormat(
      calculatePricetoTargetPriceType(
        price,
        priceType,
        currencies,
        i18n.language
      )
    );
  };

  const returnMinPrice = () => {
    let min = data?.minPrice;

    if (data?.priceType != 1 && currencies) {
      //minDeğer tl değil ise tl ye çevirildi
      min = convertToTurkishLira(
        min,
        currencies?.[
          priceTypes?.find((item) => item?.type == data?.priceType)?.key
        ]
      );
    }

    //tl ücreti ilgili kura çevir
    if (i18n.language != "tr") {
      min =
        min /
        currencies?.[
          priceTypes.find((item) => item.lang == i18n.language)?.key
        ];
    }

    return moneyFormat(min, false);
  };

  const returnMaxPrice = () => {
    let max = data?.maxPrice;

    if (data?.priceType != 1 && currencies) {
      //maxDeğer tl değil ise tl ye çevirildi
      max = convertToTurkishLira(
        max,
        currencies?.[
          priceTypes?.find((item) => item?.type == data?.priceType)?.key
        ]
      );
    }

    //tl ücreti ilgili kura çevir
    if (i18n.language != "tr") {
      max =
        max /
        currencies?.[
          priceTypes.find((item) => item.lang == i18n.language)?.key
        ];
    }

    return moneyFormat(max, false);
  };

  const setCookieData = () => {
    if (checkIn != null && checkOut != null) {
      setCookie(null, "selectedDates", JSON.stringify({ checkIn, checkOut }), {
        maxAge: 1 * 24 * 60 * 60,
        path: "/",
      });
    }
  };

  if (from == "newest" && !listPage) {
    if (data) {
      return (
        <div className={styles.testimonialItemContainer}>
          <div className={styles.column}>
            <Link
              draggable={false}
              onClick={(e) => {
                if (isMoving) {
                  e.preventDefault();
                }
              }}
              href={`/villalar/${data?.slug || "yok"}`}
              rel="nofollow"
            >
              <div className={styles.imgBox}>
                <div className={styles.carouselBox}>
                  {photos?.map((photo, index) => (
                    <Image
                      draggable={false}
                      key={"photo" + index + 1}
                      src={
                        process.env.NEXT_PUBLIC_APIPHOTOS_URL +
                        "k_" +
                        photo.image
                      }
                      alt={data?.name}
                      className={`${
                        activeImage === index ? styles.active : ""
                      }`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy" // Lazy loading aktif
                    />
                  ))}
                </div>
                <div className={styles.imgNav}>
                  <button onClick={(e) => imageHandler(e, "prev")}></button>
                  <button
                    style={{ transform: "rotate(180deg)" }}
                    onClick={(e) => imageHandler(e, "next")}
                  ></button>
                </div>
                {data?.villaNumber && (
                  <div className={styles.cardFeatures}>{data?.villaNumber}</div>
                )}
                {data?.onlineReservation == true && (
                  <div className={styles.cardFeatures2}>
                    {"Anında Rezervasyon"}
                  </div>
                )}
                {data?.featureTextWhite != null && (
                  <div className={styles.cardFeatures3}>
                    {data?.featureTextWhite}
                  </div>
                )}
              </div>
              <div className={styles.textBox}>
                <div className={styles.title}>{data.name}</div>
                {data?.town ? (
                  <div className={styles.location}>{data?.town}</div>
                ) : (
                  <></>
                )}
                <div className={styles.priceTitle}>{t("dailyPriceRange")}</div>
                <div className={styles.price}>
                  {currentPriceTypeText}
                  {returnMinPrice()} - {currentPriceTypeText}
                  {returnMaxPrice()}
                </div>
                <div className={styles.features}>
                  <div className={styles.colon}>
                    <i className={styles.person_icon}></i>
                    <span>
                      {data.person} {t("people")}
                    </span>
                  </div>
                  <div className={styles.colon}>
                    <i className={styles.room_icon}></i>
                    <span>
                      {data.room} {t("room")}
                    </span>
                  </div>
                  <div className={styles.colon}>
                    <i className={styles.bath_icon}></i>
                    <span>
                      {data.bath} {t("bath")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      );
    } else {
      return <div>loading</div>;
    }
  } else if ((listPage && from == "hotels") || (listPage && type == "apart")) {
    //kiralık apartlar sayfası
    if (data) {
      return (
        <li id={styles.cardContainer}>
          <div className={styles.column}>
            <Link href={`/apartlar/${data?.slug || "yok"}`} rel="nofollow">
              <div className={styles.imgBox}>
                <div className={styles.carouselBox}>
                  {photos?.map((photo, index) => (
                    <Image
                      key={"photo" + index + 1}
                      src={
                        process.env.NEXT_PUBLIC_APIHOTELPHOTOS_URL +
                        "k_" +
                        photo.image
                      }
                      alt={data?.name}
                      className={`${
                        activeImage === index ? styles.active : ""
                      }`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy" // Lazy loading aktif
                    />
                  ))}
                </div>
                <div className={styles.imgNav}>
                  <button onClick={(e) => imageHandler(e, "prev")}></button>
                  <button
                    style={{ transform: "rotate(180deg)" }}
                    onClick={(e) => imageHandler(e, "next")}
                  ></button>
                </div>
                {data?.featureTextWhite && (
                  <div className={styles.cardFeatures}>
                    {data?.featureTextWhite}
                  </div>
                )}
                {data?.featureTextRed && (
                  <div className={styles.cardFeatures2}>
                    {data?.hotelDetails?.[0]?.featureTextRed}
                  </div>
                )}
                {data?.featureTextWhite != null && (
                  <div className={styles.cardFeatures3}>
                    {data?.featureTextWhite}
                  </div>
                )}
              </div>
              <div className={styles.textBox}>
                <div className={styles.title}>{data?.name}</div>
                {data?.town ? (
                  <div className={styles.location}>
                    {data?.district} / {data?.town}
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles.priceTitle}>{t("dailyPriceRange")}</div>
                <div className={styles.price}>
                  {currentPriceTypeText}
                  {returnMinPrice()} - {currentPriceTypeText}
                  {returnMaxPrice()}
                </div>
                {data?.price != "-" && data?.price ? (
                  <div className={styles.price}>
                    {Math.floor(data?.price?.replace(",", "."))}₺
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles.features}>
                  <div className={styles.colon}>
                    <i className={styles.person_icon}></i>
                    <span>
                      {data.person} {t("people")}
                    </span>
                  </div>
                  <div className={styles.colon}>
                    <i className={styles.room_icon}></i>
                    <span>
                      {data.room} {t("room")}
                    </span>
                  </div>
                  <div className={styles.colon}>
                    <i className={styles.bath_icon}></i>
                    <span>
                      {data.bath} {t("bath")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </li>
      );
    }
  } else if (listPage && from == "room") {
    //apart detay room list
    if (data) {
      return (
        <li id={styles.cardContainer}>
          <div className={styles.column}>
            <Link href={`/odalar/${data?.slug || "yok"}`} rel="nofollow">
              <div className={styles.imgBox}>
                <div className={styles.carouselBox}>
                  {photos?.map((photo, index) => (
                    <Image
                      key={"photo" + index + 1}
                      src={
                        process.env.NEXT_PUBLIC_APIROOMPHOTOS_URL +
                        "k_" +
                        photo.image
                      }
                      alt={data?.name}
                      className={`${
                        activeImage === index ? styles.active : ""
                      }`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy" // Lazy loading aktif
                    />
                  ))}
                </div>
                <div className={styles.imgNav}>
                  <button onClick={(e) => imageHandler(e, "prev")}></button>
                  <button
                    style={{ transform: "rotate(180deg)" }}
                    onClick={(e) => imageHandler(e, "next")}
                  ></button>
                </div>
                {data?.villaNumber && (
                  <div className={styles.cardFeatures}>{data?.villaNumber}</div>
                )}
                {data?.onlineReservation == true && (
                  <div className={styles.cardFeatures2}>
                    {"Anında Rezervasyon"}
                  </div>
                )}
                {data?.featureTextWhite != null && (
                  <div className={styles.cardFeatures3}>
                    {data?.featureTextWhite}
                  </div>
                )}
              </div>
              <div className={styles.textBox}>
                <div className={styles.title}>{data?.name}</div>
                {data?.town ? (
                  <div className={styles.location}>
                    {data?.district} / {data?.town}
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles.priceTitle}>{t("dailyPriceRange")}</div>
                <div className={styles.price}>
                  {currentPriceTypeText}
                  {returnMinPrice()} - {currentPriceTypeText}
                  {returnMaxPrice()}
                </div>
                {data?.price != "-" && data?.price ? (
                  <div className={styles.price}>
                    {Math.floor(data?.price?.replace(",", "."))}₺
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles.features}>
                  <div className={styles.colon}>
                    <i className={styles.person_icon}></i>
                    <span>
                      {data.person} {t("people")}
                    </span>
                  </div>
                  <div className={styles.colon}>
                    <i className={styles.room_icon}></i>
                    <span>
                      {data.room} {t("room")}
                    </span>
                  </div>
                  <div className={styles.colon}>
                    <i className={styles.bath_icon}></i>
                    <span>
                      {data.bath} {t("bath")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </li>
      );
    }
  } else if (from == "search") {
    //search sayfası

    if (data) {
      return (
        <li id={styles.cardContainer}>
          <div className={styles.column}>
            <Link
              onClick={setCookieData}
              href={`/villalar/${data?.slug || "yok"}`}
              rel="nofollow"
            >
              <div className={styles.imgBox}>
                <div className={styles.carouselBox}>
                  {photos?.map((photo, index) => (
                    <Image
                      key={"photo" + index + 1}
                      src={
                        process.env.NEXT_PUBLIC_APIPHOTOS_URL +
                        "k_" +
                        photo.image
                      }
                      alt={data?.name}
                      className={`${
                        activeImage === index ? styles.active : ""
                      }`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy" // Lazy loading aktif
                    />
                  ))}
                </div>
                <div className={styles.imgNav}>
                  <button onClick={(e) => imageHandler(e, "prev")}></button>
                  <button
                    style={{ transform: "rotate(180deg)" }}
                    onClick={(e) => imageHandler(e, "next")}
                  ></button>
                </div>
                {data?.villaNumber && (
                  <div className={styles.cardFeatures}>{data?.villaNumber}</div>
                )}
                {data?.onlineReservation == true && (
                  <div className={styles.cardFeatures2}>
                    {"Anında Rezervasyon"}
                  </div>
                )}
                {data?.featureTextWhite != null && (
                  <div className={styles.cardFeatures3}>
                    {data?.featureTextWhite}
                  </div>
                )}
              </div>
              <div className={styles.textBox}>
                <div className={styles.title}>{data?.name}</div>
                {data?.town ? (
                  <div className={styles.location}>
                    {data?.district} / {data?.town}
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles.priceTitle}>
                  {nightLength != undefined
                    ? nightLength
                      ? `${t("totalCount")} (${nightLength}) ${t("night")}`
                      : t("totalCount")
                    : t("dailyPriceRange")}
                </div>

                {nightLength != undefined ? (
                  <div className={styles.price}>
                    {currentPriceTypeText}
                    {getPrice()}
                  </div>
                ) : data?.priceTables?.length > 0 ? (
                  <div className={styles.price}>
                    {currentPriceTypeText}
                    {returnMinPrice()} - {currentPriceTypeText}
                    {returnMaxPrice()}
                  </div>
                ) : (
                  <div className={styles.price}>{currentPriceTypeText}0</div>
                )}

                {/* {data?.priceTables?.length > 0 &&
                (data?.price == "-" || data?.price == null) ? (
                  <div className={styles.price}>
                    {currentPriceTypeText}
                    {Math.min(...data.priceTables.map((o) => o.price))
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                    - {currentPriceTypeText}
                    {Math.max(...data.priceTables.map((o) => o.price))
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </div>
                ) : (
                  <div className={styles.price}>{currentPriceTypeText}0</div>
                )}
                {data?.price != "-" && data?.price ? (
                  <div className={styles.price}>
                    {Math.floor(data?.price?.replace(",", "."))}₺
                  </div>
                ) : (
                  <></>
                )} */}

                <div className={styles.features}>
                  <div className={styles.colon}>
                    <i className={styles.person_icon}></i>
                    <span>
                      {data.person} {t("people")}
                    </span>
                  </div>
                  <div className={styles.colon}>
                    <i className={styles.room_icon}></i>
                    <span>
                      {data.room} {t("room")}
                    </span>
                  </div>
                  <div className={styles.colon}>
                    <i className={styles.bath_icon}></i>
                    <span>
                      {data.bath} {t("bath")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </li>
      );
    }
  } else if (listPage) {
    //kiralık villalar sayfası ve önerilen villalar
    if (data) {
      return (
        <li id={styles.cardContainer}>
          <div className={styles.column}>
            <Link href={`/villalar/${data?.slug || "yok"}`} rel="nofollow">
              <div className={styles.imgBox}>
                <div className={styles.carouselBox}>
                  {photos?.map((photo, index) => (
                    <Image
                      key={"photo" + index + 1}
                      src={
                        process.env.NEXT_PUBLIC_APIPHOTOS_URL +
                        "k_" +
                        photo.image
                      }
                      alt={data?.name}
                      className={`${
                        activeImage === index ? styles.active : ""
                      }`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy" // Lazy loading aktif
                    />
                  ))}
                </div>
                <div className={styles.imgNav}>
                  <button onClick={(e) => imageHandler(e, "prev")}></button>
                  <button
                    style={{ transform: "rotate(180deg)" }}
                    onClick={(e) => imageHandler(e, "next")}
                  ></button>
                </div>
                {data?.villaNumber && (
                  <div className={styles.cardFeatures}>{data?.villaNumber}</div>
                )}
                {data?.onlineReservation == true && (
                  <div className={styles.cardFeatures2}>
                    {"Anında Rezervasyon"}
                  </div>
                )}
                {data?.featureTextWhite != null && (
                  <div className={styles.cardFeatures3}>
                    {data?.featureTextWhite}
                  </div>
                )}
              </div>
              <div className={styles.textBox}>
                <div className={styles.title}>{data?.name}</div>
                {data?.town ? (
                  <div className={styles.location}>
                    {data?.district} / {data?.town}
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles.priceTitle}>{t("dailyPriceRange")}</div>
                <div className={styles.price}>
                  {currentPriceTypeText}
                  {returnMinPrice()} - {currentPriceTypeText}
                  {returnMaxPrice()}
                </div>
                {data?.price != "-" && data?.price ? (
                  <div className={styles.price}>
                    {Math.floor(data?.price?.replace(",", "."))}₺
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles.features}>
                  <div className={styles.colon}>
                    <i className={styles.person_icon}></i>
                    <span>
                      {data.person} {t("people")}
                    </span>
                  </div>
                  <div className={styles.colon}>
                    <i className={styles.room_icon}></i>
                    <span>
                      {data.room} {t("room")}
                    </span>
                  </div>
                  <div className={styles.colon}>
                    <i className={styles.bath_icon}></i>
                    <span>
                      {data.bath} {t("bath")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </li>
      );
    }
  } else if (salePage) {
    if (data) {
      return (
        <li id={styles.cardContainer}>
          <div className={styles.column}>
            <Link
              href={`/satilik-villalar/${data?.slug || "yok"}`}
              rel="nofollow"
            >
              <div className={styles.imgBox}>
                <div className={styles.carouselBox}>
                  {photos?.map((photo, index) => (
                    <Image
                      key={"photo" + index + 1}
                      src={
                        process.env.NEXT_PUBLIC_APIPHOTOS_URL +
                        "k_" +
                        photo.image
                      }
                      alt={data?.name}
                      className={`${
                        activeImage === index ? styles.active : ""
                      }`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy" // Lazy loading aktif
                    />
                  ))}
                </div>
                <div className={styles.imgNav}>
                  <button onClick={(e) => imageHandler(e, "prev")}></button>
                  <button
                    style={{ transform: "rotate(180deg)" }}
                    onClick={(e) => imageHandler(e, "next")}
                  ></button>
                </div>
                {data?.villaNumber && (
                  <div className={styles.cardFeatures}>{data?.villaNumber}</div>
                )}
                {data?.onlineReservation == true && (
                  <div className={styles.cardFeatures2}>
                    {"Anında Rezervasyon"}
                  </div>
                )}
                {data?.featureTextWhite != null && (
                  <div className={styles.cardFeatures3}>
                    {data?.featureTextWhite}
                  </div>
                )}
              </div>
              <div className={styles.textBox}>
                <div className={styles.title}>{data?.name}</div>
                {data?.town ? (
                  <div className={styles.location}>
                    {data?.district} / {data?.town}
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles.shortDesc}>
                  <p style={{ color: "#02044A" }}>{t("description")}</p>
                  <p style={{ color: "#525265" }}>{data?.descriptionShort}</p>
                </div>
                <div className={styles.features}>
                  <div className={styles.colon}>
                    <i className={styles.person_icon}></i>
                    <span>
                      {data?.person} {t("people")}
                    </span>
                  </div>
                  <div className={styles.colon}>
                    <i className={styles.room_icon}></i>
                    <span>
                      {data?.room} {t("room")}
                    </span>
                  </div>
                  <div className={styles.colon}>
                    <i className={styles.bath_icon}></i>
                    <span>
                      {data?.bath} {t("bath")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </li>
      );
    }
  } else {
    //anasayfadaki liste
    if (data && !listPage) {
      return (
        <li
          style={{
            display: checkVillaCategory() ? "block" : "none",
            opacity: isLoaded ? 1 : 0,
          }}
          id={styles.cardContainer}
        >
          <div className={styles.column}>
            <Link href={`/villalar/${data?.slug || "yok"}`} rel="nofollow">
              <div className={styles.imgBox}>
                <div className={styles.carouselBox}>
                  {photos?.map((photo, index) => (
                    <Image
                      key={"photo" + index + 1}
                      src={
                        process.env.NEXT_PUBLIC_APIPHOTOS_URL +
                        "k_" +
                        photo.image
                      }
                      alt={data?.name}
                      className={`${
                        activeImage === index ? styles.active : ""
                      }`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading="lazy" // Lazy loading aktif
                    />
                  ))}
                </div>
                <div className={styles.imgNav}>
                  <button onClick={(e) => imageHandler(e, "prev")}></button>
                  <button
                    style={{ transform: "rotate(180deg)" }}
                    onClick={(e) => imageHandler(e, "next")}
                  ></button>
                </div>
                {data?.villaNumber && (
                  <div className={styles.cardFeatures}>{data?.villaNumber}</div>
                )}
                {data?.onlineReservation == true && (
                  <div className={styles.cardFeatures2}>
                    {"Anında Rezervasyon"}
                  </div>
                )}
                {data?.featureTextWhite != null && (
                  <div className={styles.cardFeatures3}>
                    {data?.featureTextWhite}
                  </div>
                )}
              </div>
              <div className={styles.textBox}>
                <div className={styles.title}>{data?.name}</div>
                {true ? (
                  <div className={styles.location}>
                    {data?.district} / {data?.town}
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles.priceTitle}>{t("dailyPriceRange")}</div>
                {/* {data.attributes.price_tables.data ? <div className={styles.price}>{data.attributes.price_tables?.data[0]?.attributes?.price} TL - {data.attributes.price_tables?.data[(data.attributes.price_tables.data.length - 1)]?.attributes?.price} TL</div> : <></>} */}
                <div className={styles.price}>
                  {currentPriceTypeText}
                  {returnMinPrice()} - {currentPriceTypeText}
                  {returnMaxPrice()}
                </div>
                <div className={styles.features}>
                  <div className={styles.colon}>
                    <i className={styles.person_icon}></i>
                    <span>
                      {data.person} {t("people")}
                    </span>
                  </div>
                  <div className={styles.colon}>
                    <i className={styles.room_icon}></i>
                    <span>
                      {data.room} {t("room")}
                    </span>
                  </div>
                  <div className={styles.colon}>
                    <i className={styles.bath_icon}></i>
                    <span>
                      {data.bath} {t("bath")}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </li>
      );
    } else {
      return <div>loading...</div>;
    }
  }
}
