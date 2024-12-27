"use client";
import styles from "./reservation.module.css";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect, forwardRef } from "react";
import Image from "next/image";
import moment from "moment";
import { isVillaAvailable } from "@/services/reservation";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import { priceTypes } from "@/data/data";

import { tr, enUS } from "date-fns/locale";
import { convertToTurkishLira, moneyFormat } from "@/utils/globalUtils";
import { parseCookies, destroyCookie } from "nookies";

const localeMap = {
  tr,
  en: enUS,
};

export default function Reservation({
  villaSlug,
  roomSlug,
  prices,
  villaName,
  villaFirstPhoto,
  region,
  priceTypeText,
  t,
  priceType,
}) {
  const { i18n } = useTranslation();
  const router = useRouter();

  //console.log('villaId: ' + villaId);
  const [availible, setAvailible] = useState(false);
  const inputRefNumberOfPeople = useRef();
  const menuRefNumberOfPeople = useRef();
  const menuRefCalendar = useRef();
  const datepickerRef = useRef();
  const [currencies, setCurrencies] = useState(null);

  const [numberOfAdults1, setNumberOfAdults1] = useState(1);
  const [numberOfChild1, setNumberOfChild1] = useState(0);
  const [numberOfBabies1, setNumberOfBabies1] = useState(0);

  const [dateRange, setDateRange] = useState([]);
  const [minCalendarDate, setMinCalendarDate] = useState(new Date());
  const [startDate, endDate] = dateRange;

  const [isNumberPeopleMenuOpen, setNumberPeople] = useState(false);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const returnMinPrice = () => {
    let min = Math.min(...prices?.map((o) => o.price));

    if (priceType != 1 && currencies) {
      //minDeğer tl değil ise tl ye çevirildi
      min = convertToTurkishLira(
        min,
        currencies?.[priceTypes?.find((item) => item?.type == priceType)?.key]
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

  useEffect(() => {
    const cookies = parseCookies();
    setCurrencies(JSON.parse(cookies.currencies));
    if (cookies.selectedDates) {
      setDateRange([
        new Date(JSON.parse(cookies.selectedDates).checkIn),
        new Date(JSON.parse(cookies.selectedDates).checkOut),
      ]);
      destroyCookie(null, "selectedDates", {
        path: "/",
      });
    }
  }, []);

  useEffect(() => {
    let handler = (e) => {
      //Kişi sayısı menüsü için
      if (!menuRefNumberOfPeople.current.contains(e.target)) {
        setNumberPeople(false);
      }
    };

    document.addEventListener("mouseup", handler);

    if (numberOfAdults1 != 0 || numberOfChild1 != 0 || numberOfBabies1 != 0) {
      inputRefNumberOfPeople.current.value = `${
        numberOfAdults1 + numberOfChild1
      } ${t("guest")}, ${numberOfBabies1} ${t("baby")}`;
    } else {
      inputRefNumberOfPeople.current.value = `2 ${t("guest")}, 1 ${t("baby")}`;
    }

    return () => {
      document.removeEventListener("mouseup", handler);
    };
  });

  useEffect(() => {
    if (dateRange?.includes(null)) {
      setDateRange([]);
    }
  }, [isCalendarOpen]);

  //Change People Number
  const changeNumber = (operation, type) => {
    if (type == "adult") {
      operation == "+"
        ? setNumberOfAdults1(numberOfAdults1 + 1)
        : numberOfAdults1 > 1 && setNumberOfAdults1(numberOfAdults1 - 1);
    } else if (type == "child") {
      operation == "+"
        ? setNumberOfChild1(numberOfChild1 + 1)
        : numberOfChild1 > 0 && setNumberOfChild1(numberOfChild1 - 1);
    } else {
      operation == "+"
        ? setNumberOfBabies1(numberOfBabies1 + 1)
        : numberOfBabies1 > 0 && setNumberOfBabies1(numberOfBabies1 - 1);
    }
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <input
      value={value}
      onClick={onClick}
      ref={ref}
      readOnly // readOnly burada input'u sadece takvim seçimi için yapar
      onFocus={(e) => e.target.blur()} // Odaklanma sırasında klavyeyi engeller
      placeholder={t("chooseDate")}
    />
  ));

  async function handleClick() {
    // const countOfNight = Math.abs(
    //   moment
    //     .duration(
    //       moment(dateRange[0], "YYYY-MM-DD").diff(
    //         moment(dateRange[1], "YYYY-MM-DD")
    //       )
    //     )
    //     .asDays()
    // );

    if (dateRange[1] != null) {
      const isVillaAvailableResponse = await isVillaAvailable(
        villaSlug || roomSlug,
        moment(dateRange[0]).format("YYYY-MM-DD").toString(),
        moment(dateRange[1]).format("YYYY-MM-DD").toString()
      );
      if (isVillaAvailableResponse?.data?.isAvailible) {
        //Villa müsait
        const villaReservationLocalData = {
          checkIn: moment(dateRange[0]).format("YYYY-MM-DD").toString(),
          checkOut: moment(dateRange[1]).format("YYYY-MM-DD").toString(),
          villaSlug,
          roomSlug,
          villaName,
          totalPrice: isVillaAvailableResponse?.data?.totalPrice,
          priceType,
          reservationItems: [],
          adult: numberOfAdults1,
          child: numberOfChild1,
          baby: numberOfBabies1,
          expiryDate: Math.floor(new Date().getTime() / 1000),
          villaFirstPhoto,
          region,
        };
        localStorage.setItem(
          "reservation",
          JSON.stringify(villaReservationLocalData)
        );
        router.push("/rezervasyon");
      } else {
        alert(t("facilityNotAvailableMessage"));
      }
    } else {
      console.log(t("chooseDate"));
    }
  }

  return (
    <div className={styles.top}>
      {availible && (
        <div className={styles.modalWrapper}>
          <div className={`${styles["modal"]}`}>
            <Image
              alt=""
              src="/images/alert.png"
              width={44}
              height={38}
              loading="lazy"
            />
            <span className={styles.modalTitle}>{t("warning")}!</span>
            <p>{t("facilityNotAvailablePleaseCheckCalender")}</p>
            <div
              onClick={() => setAvailible(false)}
              className={styles.modalButton}
            >
              {t("IUnderstand")}
            </div>
          </div>
        </div>
      )}

      <div className={styles.reservationBox}>
        <div className={styles.reservationTitleText}>
          <div className={styles.textTop}>
            <div className={styles.price}>
              {priceTypeText}
              {prices?.length > 0 ? returnMinPrice() : 0}
            </div>
          </div>
          <div className={styles.textBottom}>
            <span>
              {t("pricesStartingFrom")}({t("nighty")})
            </span>
          </div>
        </div>
        <div
          ref={menuRefCalendar}
          style={{ position: "relative" }}
          className={styles.colon}
        >
          <div className={styles.colonTitle}>
            {t("entrance")} / {t("exit")}
          </div>
          <div
            onClick={() => {
              datepickerRef.current.input.blur();
            }}
            className={styles.colonInput}
          >
            <i className={styles.loginDateIcon}></i>
            <div className="date-picker-reservation">
              <DatePicker
                fixedHeight
                ref={datepickerRef}
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                monthsShown={1}
                value={dateRange.length == 0 ? t("chooseDate") : dateRange}
                onChange={(update) => {
                  setMinCalendarDate(
                    new Date(update[0]).setDate(
                      new Date(update[0]).getDate() + 5
                    )
                  );
                  setDateRange(update);
                  setTimeout(() => {
                    datepickerRef.current.input.blur();
                  }, 1);
                }}
                locale={localeMap[i18n.language]}
                minDate={minCalendarDate}
                width="100%"
                customInput={<CustomInput />}
                onCalendarOpen={() => setIsCalendarOpen(true)} // Takvim açıldığında
                onCalendarClose={() => {
                  setIsCalendarOpen(false);
                  setMinCalendarDate(new Date());
                }} // Takvim kapandığında
              />
            </div>
          </div>
        </div>
        <div ref={menuRefNumberOfPeople} className={styles.colon}>
          <div className={styles.colonTitle}>{t("numberOfPeople")}</div>
          <div
            onClick={() => setNumberPeople(!isNumberPeopleMenuOpen)}
            className={styles.colonInput}
          >
            <div className={styles.peopleIcon}></div>
            <input
              style={{ cursor: "pointer" }}
              ref={inputRefNumberOfPeople}
              type="text"
              placeholder={`0 ${t("guest")}, 0 ${t("baby")}`}
              readOnly
            ></input>
          </div>
          <div
            className={`${styles["numberPeopleOpen"]} ${
              isNumberPeopleMenuOpen && styles["active"]
            }`}
          >
            <ul>
              <li>
                <div className={styles.leftPeople}>
                  <div className={styles.title}>{t("adults")}</div>
                  <div className={styles.desc}>
                    {t("andAboveAges", { age: 13 })}
                  </div>
                </div>
                <div className={styles.rightPeople}>
                  <div
                    onClick={() =>
                      numberOfAdults1 != 0 && changeNumber("-", "adult")
                    }
                    className={styles.minus}
                  ></div>
                  <input
                    type={styles.text}
                    disabled
                    value={numberOfAdults1}
                    max={99}
                  />
                  <div
                    onClick={() => changeNumber("+", "adult")}
                    className={styles.plus}
                  ></div>
                </div>
              </li>
              <li>
                <div className={styles.leftPeople}>
                  <div className={styles.title}>{t("childs")}</div>
                  <div className={styles.desc}>
                    {t("andAboveAges", { age: 13 })}
                  </div>
                </div>
                <div className={styles.rightPeople}>
                  <div
                    onClick={() =>
                      numberOfChild1 != 0 && changeNumber("-", "child")
                    }
                    className={styles.minus}
                  ></div>
                  <input
                    type={styles.text}
                    disabled
                    value={numberOfChild1}
                    max={99}
                  />
                  <div
                    onClick={() => changeNumber("+", "child")}
                    className={styles.plus}
                  ></div>
                </div>
              </li>
              <li>
                <div className={styles.leftPeople}>
                  <div className={styles.title}>{t("babies")}</div>
                  <div className={styles.desc}>
                    {t("andAboveAges", { age: 13 })}
                  </div>
                </div>
                <div className={styles.rightPeople}>
                  <div
                    onClick={() =>
                      numberOfBabies1 != 0 && changeNumber("-", "babies")
                    }
                    className={styles.minus}
                  ></div>
                  <input
                    type={styles.text}
                    disabled
                    value={numberOfBabies1}
                    max={99}
                  />
                  <div
                    onClick={() => changeNumber("+", "babies")}
                    className={styles.plus}
                  ></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.linkBox}>
          <button className={styles.blueButtonArrow} onClick={handleClick}>
            <span>{t("checkVillaAvailability")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
