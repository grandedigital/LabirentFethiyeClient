import { useEffect, useState } from "react";
import styles from "./mydatepicker.module.css";
import { useTranslation } from "react-i18next";
import {
  calculatePriceType,
  convertToTurkishLira,
  moneyFormat,
} from "@/utils/globalUtils";
import { parseCookies } from "nookies";
import { priceTypes } from "@/data/data";

//reservasyon tarihleri düşük aydan yükselen aya doğru gelmesi lazım
export default function MyDatePicker({
  year = 2023,
  dates,
  nowYear,
  currentMounth,
  calendarPrices,
  priceTypeText,
  priceType,
}) {
  const { i18n, t } = useTranslation();
  const twoDifferentYearsWillBeListed = 0 - (currentMounth + 1);

  dates = dates.map((reservation) => ({
    id: reservation.id,
    checkIn: reservation.checkIn.split("T")[0], // 'T' ifadesinden öncesini al
    checkOut: reservation.checkOut.split("T")[0], // 'T' ifadesinden öncesini al
    reservationStatusType: reservation.reservationStatusType,
  }));

  dates?.sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));

  //reservationDates = ["2022/11/25-2023/0/3", "2023/0/29-2023/1/5", "2023/1/5-2023/1/7", "2023/1/25-2023/5/21", "2023/6/5-2023/6/10", "2023/6/10-2023/6/15", "2023/11/9-2023/11/12"]
  //let datesString = []

  let reservationDates = [];
  let reservationDatesStatus = [];
  dates?.map((date) => {
    reservationDates.push(
      date.checkIn.split("-")[0] +
        "/" +
        (date.checkIn.split("-")[1] - 1) +
        "/" +
        date.checkIn.split("-")[2] +
        "-" +
        date.checkOut.split("-")[0] +
        "/" +
        (date.checkOut.split("-")[1] - 1) +
        "/" +
        date.checkOut.split("-")[2]
    );
    reservationDatesStatus.push(parseInt(date.reservationStatusType));
  });

  const [ready, setReady] = useState(false);
  const [currencies, setCurrencies] = useState(null);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayUtc = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let monthsTurkish = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];
  let isStartResarvation = false;
  let isEndResarvation = false;
  let isReservationContiniung = false;
  let currentDate = new Date(year, currentMounth, 1);
  let reservationIndex = 0;

  //müsaitlik takviminde yıl değiştirildği zaman geçen yıldan devam eden rezervasyon var mı yok mu o belirleniyor
  let reservationContinuingFromBeforeYearDates = dates?.filter(
    (item) =>
      item.checkIn.split("-")[0] == year - 1 &&
      item.checkOut.split("-")[0] == year
  );

  if (reservationContinuingFromBeforeYearDates?.length > 0) {
    reservationIndex =
      dates.findIndex(
        (item) => item.id == reservationContinuingFromBeforeYearDates[0].id
      ) + 1;
  } else if (year - nowYear == 2) {
    reservationIndex = dates.findIndex(
      (item) =>
        item.checkIn.split("-")[0] == year ||
        item.checkOut.split("-")[0] == year
    );
  } else {
    reservationIndex = 0;
  }

  useEffect(() => {
    const cookies = parseCookies();
    setCurrencies(JSON.parse(cookies.currencies));
    setReady(true);
  }, []);

  const stringToDate = (dateString = "2023/0/1") => {
    let year, month, day, dateArray;
    dateArray = dateString.split("/");
    year = dateArray[0];
    month = dateArray[1];
    day = dateArray[2];
    return new Date(year, month, day);
  };

  const stringToDate2 = (dateString = "2023-06-01") => {
    let year, month, day, dateArray;
    dateArray = dateString.split("-");
    year = dateArray[0];
    month = dateArray[1] - 1;
    day = dateArray[2];
    return new Date(year, month, day);
  };

  //belirtilen yıl ve ayın ilk gününü döndürür
  const getFirstDayOfMonth = (year, month) => {
    const date = new Date(year, month, 1);
    return days[date.getDay()];
  };

  //Belirtilen tarihin gün sayısını döndürür
  const getDayCountOfMMonth = (year, month) => {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
  };

  //her ay için çalışacak olan fonksiyon(12 sefer çalışacak)
  const getRows = (month = 0, _getRowsYear = 2024) => {
    let day = 1;
    let rows = [];
    let numberOfMonth = getDayCountOfMMonth(_getRowsYear, month); // Aydaki gün sayısı 2.parametre olan 2 Mart ayına denk gelir fonksiyondan 31 döner
    let firstDay = getFirstDayOfMonth(_getRowsYear, month);
    let isFirstRowInEnded = false;
    let reservationDateStrings;

    if (reservationDates[reservationIndex]) {
      reservationDateStrings = reservationDates[reservationIndex].split("-");
    }

    let reservationDates2 = []; // reservasyon tarihi buraya alındı(sadece 1 reservasyon başlangıç ve bitiş tarihi)
    if (reservationDateStrings) {
      reservationDateStrings.map((item, index) => {
        reservationDates2[index] = stringToDate(item);
      });
    }

    //start-end-continue background stillerini koşullara göre döndüren fonksiyon
    const backgroundColor = () => {
      if (reservationContinuingFromBeforeYearDates?.length >= 1) {
        if (
          stringToDate2(
            reservationContinuingFromBeforeYearDates[0].checkOut
          ).getTime() == currentDate.getTime()
        ) {
          isEndResarvation = true;

          if (
            reservationContinuingFromBeforeYearDates[0].reservationStatusType ==
            1
          ) {
            reservationContinuingFromBeforeYearDates = [];
            if (reservationDatesStatus[reservationIndex] == 1) {
              if (reservationDatesStatus[reservationIndex] == 1) {
                if (
                  stringToDate2(
                    reservationDates[reservationIndex - 1].split("-")[1]
                  ).getTime() ==
                  stringToDate2(
                    reservationDates[reservationIndex].split("-")[0]
                  ).getTime()
                ) {
                  return styles["day-continueOrange"];
                } else {
                  if (reservationDatesStatus[reservationIndex] == 1) {
                    if (
                      reservationDates[reservationIndex - 1].split("-")[1] ==
                      reservationDates[reservationIndex].split("-")[0]
                    ) {
                      return styles["day-continueOrange"];
                    } else {
                      return styles["day-endOrange"];
                    }
                  } else {
                    return styles["day-endOrange"];
                  }
                }
              }
            } else if (
              reservationDatesStatus[reservationIndex - 1] == 1 &&
              (reservationDatesStatus[reservationIndex] == 2 ||
                reservationDatesStatus[reservationIndex] == 2 ||
                reservationDatesStatus[reservationIndex] == 2)
            ) {
              return styles["day-starRedToOrange"];
            } else {
              if (
                reservationDates[reservationIndex - 1]?.split("-")[1] ==
                reservationDates[reservationIndex]?.split("-")[0]
              ) {
                return styles["day-starRedToOrange"];
              } else {
                return styles["day-endOrange"];
              }
            }
          } else if (
            reservationContinuingFromBeforeYearDates[0].reservationStatusType ==
              2 ||
            reservationContinuingFromBeforeYearDates[0].reservationStatusType ==
              2 ||
            reservationContinuingFromBeforeYearDates[0].reservationStatusType ==
              2
          ) {
            //kırmızı
            reservationContinuingFromBeforeYearDates = [];
            if (reservationDatesStatus[reservationIndex] == 1) {
              return styles["day-starOrangeToRed"];
            } else if (
              reservationDatesStatus[reservationIndex] == 2 ||
              reservationDatesStatus[reservationIndex] == 2 ||
              reservationDatesStatus[reservationIndex] == 2
            ) {
              if (
                reservationDates[reservationIndex - 1].split("-")[1] ==
                reservationDates[reservationIndex].split("-")[0]
              ) {
                return styles["day-continueRed"];
              } else {
                return styles["day-endRed"];
              }
            }

            return styles["day-endRed"];
          } else {
            //rezervasyon iptal edilmişse
            reservationContinuingFromBeforeYearDates = [];
            return;
          }
        }

        if (
          reservationContinuingFromBeforeYearDates[0].reservationStatusType == 1
        ) {
          return styles["day-continueOrange"];
        } else if (
          reservationContinuingFromBeforeYearDates[0].reservationStatusType ==
            2 ||
          reservationContinuingFromBeforeYearDates[0].reservationStatusType ==
            2 ||
          reservationContinuingFromBeforeYearDates[0].reservationStatusType == 2
        ) {
          return styles["day-continueRed"];
        } else {
          return "";
        }
      }

      if (reservationDates2?.length == 2) {
        if (currentDate.getTime() == reservationDates2[0].getTime()) {
          isStartResarvation = true;
        } else {
          isStartResarvation = false;
        }
        if (
          currentDate.getTime() > reservationDates2[0].getTime() &&
          currentDate.getTime() < reservationDates2[1].getTime()
        ) {
          isReservationContiniung = true;
        } else {
          isReservationContiniung = false;
        }
        if (currentDate.getTime() == reservationDates2[1].getTime()) {
          isEndResarvation = true;
          reservationIndex++;
          if (
            reservationIndex < reservationDates?.length &&
            reservationIndex != reservationDates?.length
          ) {
            reservationDateStrings =
              reservationDates[reservationIndex].split("-");
            reservationDateStrings.map((item, index) => {
              reservationDates2[index] = stringToDate(item);
            });
          }
        } else {
          isEndResarvation = false;
        }
      } else {
        isStartResarvation = false;
        isReservationContiniung = false;
        isEndResarvation = false;
      }

      if (reservationIndex > 0 && reservationIndex < reservationDates?.length) {
        if (
          reservationDates[reservationIndex - 1].split("-")[1] ==
          reservationDates[reservationIndex].split("-")[0]
        ) {
          // isReservationContiniung = true

          if (
            currentDate.getTime() ==
            stringToDate(
              reservationDates[reservationIndex].split("-")[0]
            ).getTime()
          ) {
            if (
              reservationDatesStatus[reservationIndex - 1] == 1 &&
              (reservationDatesStatus[reservationIndex] == 2 ||
                reservationDatesStatus[reservationIndex] == 2 ||
                reservationDatesStatus[reservationIndex] == 2)
            ) {
              return styles["day-starOrangeToRed"];
            } else if (
              reservationDatesStatus[reservationIndex] == 1 &&
              (reservationDatesStatus[reservationIndex - 1] == 2 ||
                reservationDatesStatus[reservationIndex - 1] == 2 ||
                reservationDatesStatus[reservationIndex - 1] == 2)
            ) {
              return styles["day-starRedToOrange"];
            } else {
              if (
                reservationIndex > 0 &&
                reservationDatesStatus[reservationIndex] == 1
              ) {
                return styles["day-continueRed"];
              }
            }
          }
        }
      }

      if (isStartResarvation) {
        if (
          reservationDatesStatus[reservationIndex] != 1 &&
          (reservationDatesStatus[reservationIndex] == 2 ||
            reservationDatesStatus[reservationIndex] == 2 ||
            reservationDatesStatus[reservationIndex] == 2)
        ) {
          return styles["day-startOrange"];
        } else return styles["day-startRed"];
      } else if (isReservationContiniung) {
        isReservationContiniung = false;
        if (
          reservationDatesStatus[reservationIndex] != 1 &&
          (reservationDatesStatus[reservationIndex] == 2 ||
            reservationDatesStatus[reservationIndex] == 2 ||
            reservationDatesStatus[reservationIndex] == 2)
        ) {
          return styles["day-continueOrange"];
        } else {
          return styles["day-continueRed"];
        }
      } else if (isEndResarvation) {
        if (reservationDatesStatus[reservationIndex - 1] == 1) {
          return styles["day-endRed"];

          // if(reservationDatesStatus[reservationIndex-1] == 120 || reservationDatesStatus[reservationIndex] == 130 || reservationDatesStatus[reservationIndex] == 140){
          //     return styles["day-starRedToOrange"]
          // }
          // else {
          //     return styles["day-endOrange"]
          // }
        } else {
          if (
            reservationDatesStatus[reservationIndex] == 2 ||
            reservationDatesStatus[reservationIndex] == 2 ||
            reservationDatesStatus[reservationIndex] == 2
          ) {
            if (
              stringToDate(
                reservationDates[reservationIndex].split("-")[0]
              ).getTime() ==
              stringToDate(
                reservationDates[reservationIndex - 1].split("-")[1]
              ).getTime()
            ) {
              return styles["day-continueOrange"];
            } else {
              return styles["day-endOrange"];
            }
          } else {
            return styles["day-endOrange"];
          }
        }
      } else {
        return "";
      }
    };

    const addDay = () => {
      currentDate = new Date(_getRowsYear, month, day + 1);
      return day++;
    };

    const getCalendarPriceItem = (price) => {
      let willReturnPrice = price;

      if (priceType != 1 && currencies) {
        //maxDeğer tl değil ise tl ye çevirildi
        willReturnPrice = convertToTurkishLira(
          willReturnPrice,
          currencies?.[priceTypes?.find((item) => item?.type == priceType)?.key]
        );
      }

      //tl ücreti ilgili kura çevir
      if (i18n.language != "tr") {
        willReturnPrice =
          willReturnPrice /
          currencies[
            priceTypes.find((item) => item.lang == i18n.language)?.key
          ];
      }

      return moneyFormat(willReturnPrice, false);
    };

    const getCalendarPrice = () => {
      const willPrintPrice = calendarPrices.findIndex((range) => {
        const start = new Date(range.startDate);
        const end = new Date(range.endDate);
        return currentDate >= start && currentDate <= end;
      });
      return willPrintPrice != -1
        ? calculatePriceType(i18n.language) +
            getCalendarPriceItem(calendarPrices[willPrintPrice].price)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        : "";
    };

    const getRow = () => {
      let row = [];
      if (!isFirstRowInEnded) {
        let dayStartingIndex = dayUtc.indexOf(firstDay);
        for (let index = 0; index <= 6; index++) {
          row.push(
            <div
              key={monthsTurkish[month] + "firshRowItem" + index}
              className={`${styles["day"]} ${
                !(index >= dayStartingIndex) ? styles["old"] : ""
              } ${index >= dayStartingIndex ? backgroundColor() : ""}`}
            >
              {index >= dayStartingIndex ? (
                <div className={`${styles["day-content"]}`}>
                  <span className={styles.dayPrice}>{getCalendarPrice()}</span>
                  <span>{addDay()}</span>
                </div>
              ) : undefined}
            </div>
          );
          if (index == 6) {
            isFirstRowInEnded = true;
            break;
          }
        }
      } else {
        for (let index = 0; index < 7; index++) {
          if (day == numberOfMonth + 1) {
            row.push(
              <div
                key={monthsTurkish[month] + "notFirstRow" + index}
                className={`${styles["day"]}`}
              >
                <div className={`${styles["day-content"]}`}></div>
              </div>
            );
          } else {
            row.push(
              <div
                key={monthsTurkish[month] + "notFirstRow" + index}
                className={`${styles["day"]} ${backgroundColor()}`}
              >
                <div className={`${styles["day-content"]}`}>
                  <span className={styles.dayPrice}>{getCalendarPrice()}</span>
                  <span>{addDay()}</span>
                </div>
              </div>
            );
          }
        }
      }
      return row;
    };

    for (let index = 0; index < 6; index++) {
      rows.push(
        <div
          key={monthsTurkish[month] + "row" + index}
          className={styles.rowContainer}
        >
          {day <= numberOfMonth && getRow()}
        </div>
      );
    }
    return rows;
  };

  if (ready) {
    /*getFirstDayOfMonth(2023, 1)*/
    /*getDayCountOfMMonth(2023, 3)*/
    return (
      <div
        className={`${styles["months-container"]}`}
        style={{ opacity: 1, display: "flex" }}
      >
        {monthsTurkish
          .slice(currentMounth, monthsTurkish?.length)
          .map((item, index) => (
            <div
              key={item + index}
              className={`${styles["month-container"]} ${styles["month-"]}`}
            >
              <div className={styles.month}>
                <div className={styles.mainTitleContainer}>
                  <div className={styles.montTitleContainer}>
                    <div className={`${styles["month-title"]}`} colSpan="7">
                      {new Intl.DateTimeFormat(i18n.language, {
                        month: "long",
                      }).format(currentDate)}{" "}
                      {new Date().getFullYear()}
                    </div>
                  </div>
                  <div className={styles.daysHeaderContainer}>
                    <div className={`${styles["day-header"]}`}>
                      {t("days.1")}
                    </div>
                    <div className={`${styles["day-header"]}`}>
                      {t("days.2")}
                    </div>
                    <div className={`${styles["day-header"]}`}>
                      {t("days.3")}
                    </div>
                    <div className={`${styles["day-header"]}`}>
                      {t("days.4")}
                    </div>
                    <div className={`${styles["day-header"]}`}>
                      {t("days.5")}
                    </div>
                    <div className={`${styles["day-header"]}`}>
                      {t("days.6")}
                    </div>
                    <div className={`${styles["day-header"]}`}>
                      {t("days.7")}
                    </div>
                  </div>
                </div>
                {getRows(index + currentMounth, new Date().getFullYear())}
              </div>
            </div>
          ))}
        {twoDifferentYearsWillBeListed < 0 &&
          monthsTurkish
            .slice(twoDifferentYearsWillBeListed)
            .map((item, index) => (
              <div
                key={item + index}
                className={`${styles["month-container"]} ${styles["month-"]}`}
              >
                <div className={styles.month}>
                  <div className={styles.mainTitleContainer}>
                    <div className={styles.montTitleContainer}>
                      <div className={`${styles["month-title"]}`} colSpan="7">
                        {new Intl.DateTimeFormat(i18n.language, {
                          month: "long",
                        }).format(currentDate)}{" "}
                        {new Date().getFullYear() + 1}
                      </div>
                    </div>
                    <div className={styles.daysHeaderContainer}>
                      <div className={`${styles["day-header"]}`}>
                        {t("days.1")}
                      </div>
                      <div className={`${styles["day-header"]}`}>
                        {t("days.2")}
                      </div>
                      <div className={`${styles["day-header"]}`}>
                        {t("days.3")}
                      </div>
                      <div className={`${styles["day-header"]}`}>
                        {t("days.4")}
                      </div>
                      <div className={`${styles["day-header"]}`}>
                        {t("days.5")}
                      </div>
                      <div className={`${styles["day-header"]}`}>
                        {t("days.6")}
                      </div>
                      <div className={`${styles["day-header"]}`}>
                        {t("days.7")}
                      </div>
                    </div>
                  </div>
                  {getRows(index, new Date().getFullYear() + 1)}
                </div>
              </div>
            ))}
      </div>
    );
    setReady(false);
  }
}
