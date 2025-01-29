import styles from "./calendar.module.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { tr, enUS } from "date-fns/locale";
import {
  format,
  isWithinInterval,
  eachDayOfInterval,
  addYears,
} from "date-fns";
import DatePicker from "react-datepicker";
import moment from "moment";
import { parseCookies } from "nookies";

const ModalComponent = dynamic(() => import("../../../other/modalComponent"), {
  ssr: true,
});

const MyDatePicker = dynamic(() => import("./mydatepicker"), {
  ssr: true,
});

const Calendar = function Calendar({
  ready,
  dates,
  calendarPrices,
  priceTypeText,
  priceType,
  t,
}) {
  const todayDate = new Date();
  const [yearTab, setYearTab] = useState(todayDate.getFullYear());
  const [month, setMonth] = useState(todayDate.getMonth());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState([null, null]); // Tarih aralığı
  const [startDate, endDate] = selectedDates; // startDate ve endDate'i buradan çıkarıyoruz
  const [monthsShown, setMonthsShown] = useState(2); // Başlangıçta 2 ay göster
  const [currencies, setCurrencies] = useState(null);

  // Rezervasyonlar
  // const rezervasyonlar = [
  //   {
  //     start: new Date("2025-02-02"),
  //     end: new Date("2025-02-09"),
  //     reservationStatusType: 1,
  //   },
  //   {
  //     start: new Date("2025-02-10"),
  //     end: new Date("2025-02-15"),
  //     reservationStatusType: 2,
  //   },
  //   {
  //     start: new Date("2025-02-15"),
  //     end: new Date("2025-02-20"),
  //     reservationStatusType: 1,
  //   },
  //   {
  //     start: new Date("2025-03-01"),
  //     end: new Date("2025-03-05"),
  //     reservationStatusType: 1,
  //   },
  // ];

  const rezervasyonlar = dates;

  // Fiyatlar
  // const ranges = [
  //   { startDate: "2025-02-01", endDate: "2025-02-28", price: 100 },
  //   { startDate: "2025-03-01", endDate: "2025-03-31", price: 150 },
  // ];

  const ranges = calendarPrices;

  // Rezervasyon kontrol fonksiyonu
  const checkReservation = (start, end) => {
    const selectedDates = eachDayOfInterval({ start, end }); // Giriş ve çıkış arası günleri al

    const index1 = rezervasyonlar.some(
      (item) =>
        format(new Date(item.checkOut), "yyyy-MM-dd") ==
        format(start, "yyyy-MM-dd")
    );

    //test edilecek yapılacak iş bekleyen
    const index2 = rezervasyonlar.some(
      (item) =>
        format(new Date(item.checkIn), "yyyy-MM-dd") ==
        format(end, "yyyy-MM-dd")
    );

    //çıkış tarihinden itibaren bir rezervasyon seçileceği zaman patlıyordu burada o çözüldü
    if (index1) {
      selectedDates.shift();
    }

    //seçilen yeni rezervasyonun çıkış tarihi bir rezervasyon başlangıcı ise patlıyor burada o düzeltiliyor
    if (index2) {
      selectedDates.pop();
    }

    const reserved = selectedDates.some((date) =>
      rezervasyonlar.some(({ checkIn: rStart, checkOut: rEnd }) =>
        isWithinInterval(date, { start: new Date(rStart), end: new Date(rEnd) })
      )
    );
    return reserved;
  };

  function createPriceObjectFromArray(ranges) {
    const result = {};

    ranges.forEach((range) => {
      const { startDate, endDate, price } = range;
      const start = new Date(startDate);
      const end = new Date(endDate);

      let currentDate = new Date(start);

      // format(todayDate, "yyyy-MM-dd")
      while (format(currentDate, "yyyy-MM-dd") <= format(end, "yyyy-MM-dd")) {
        const dateKey = format(currentDate, "yyyy-MM-dd");
        result[dateKey] = price;
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return result;
  }

  const dailyPrices = createPriceObjectFromArray(ranges);

  const handleYearTab = (operation) => {
    if (operation == "next" && yearTab - todayDate.getFullYear() < 2) {
      setYearTab(yearTab + 1);
    }

    if (
      operation == "back" &&
      yearTab - todayDate.getFullYear() > 0 &&
      yearTab - todayDate.getFullYear() <= 2
    ) {
      setYearTab(yearTab - 1);
    }
  };

  const displayLessIcon = (operation) => {
    if (operation == "back") {
      if (!(yearTab == todayDate.getFullYear())) {
        return "‹";
      } else {
        return "";
      }
    } else {
      if (yearTab - todayDate.getFullYear() < 2) {
        return "›";
      } else {
        return "";
      }
    }
  };

  const displayYearTab = (year) => {
    if (year == todayDate.getFullYear()) {
      return "";
    } else if (year - 1 == todayDate.getFullYear()) {
      return "";
    } else if (year - 2 == todayDate.getFullYear()) {
      return "";
    } else {
      return styles["disabled"];
    }
  };

  function popop(dates) {
    //geçmiş tarih seçmeyi engelle
    if (format(dates[0], "yyyy-MM-dd") < format(todayDate, "yyyy-MM-dd")) {
      setSelectedDates([null, null]);
      return;
    }
    setSelectedDates(dates);

    //hem giriş hem çıkış tarihini seçmeyi engelle (seçilen ilk tarih hem giriş hem çıkış ise true döner)
    if (
      rezervasyonlar.some(
        (item) =>
          format(new Date(item.checkIn), "yyyy-MM-dd") ==
          format(dates[0], "yyyy-MM-dd")
      ) &&
      rezervasyonlar.some(
        (item) =>
          format(new Date(item.checkOut), "yyyy-MM-dd") ==
          format(dates[0], "yyyy-MM-dd")
      )
    ) {
      setSelectedDates([null, null]);
    }

    //giriş ve çıkış tarihleri seçilince çalışacak kod bloğu (iki tarih de seçilince)
    if (!dates.includes(null)) {
      //minimum 5 gece seçmeye izin ver
      if (
        moment
          .duration(
            moment(dates[1], "YYYY-MM-DD").diff(moment(dates[0], "YYYY-MM-DD"))
          )
          .asDays() < 5
      ) {
        setSelectedDates([null, null]);
        alert("Minimum 5 gece rezervasyon yapılabilir");
      }

      if (checkReservation(dates[0], dates[1])) {
        setSelectedDates([null, null]);
        alert(
          "Seçilen tarihler arasında rezervasyon mevcut. Lütfen farklı tarihler seçin"
        );
      }
      // alert(dates);
    }
  }

  // Tarihlerin seçilebilirliğini kontrol et
  const isDateSelectable = (date) => {
    if (
      rezervasyonlar.some(
        (range) =>
          format(date, "yyyy-MM-dd") ==
          format(new Date(range.checkIn), "yyyy-MM-dd")
      ) ||
      rezervasyonlar.some(
        (range) =>
          format(date, "yyyy-MM-dd") ==
          format(new Date(range.checkOut), "yyyy-MM-dd")
      )
    )
      return true;

    var result = !rezervasyonlar.some(
      (range) =>
        date >= new Date(range.checkIn) && date <= new Date(range.checkOut)
    );
    return result;
  };

  // Tarih formatlama (Yıl-Ay-Gün)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //bu fonksiyonun içinde keşişen rezervasyonlar için de hangi renkler olacağı yapılacak
  const reservationStatus = (date) => {
    //status 1 ise onaylanmış, 2 ise opsiyonlu
    const status =
      rezervasyonlar.find((item) => {
        const entryDate = format(new Date(item.checkIn), "yyyy-MM-dd");
        const exitDate = format(new Date(item.checkOut), "yyyy-MM-dd");
        return (
          entryDate === format(date, "yyyy-MM-dd") ||
          exitDate === format(date, "yyyy-MM-dd")
        );
      }).reservationStatusType || null;

    if (status == 1) {
      return "onaylanmis";
    } else if (status == 2) {
      return "opsiyonlu";
    }
  };

  const checkDateType = (date) => {
    let string = "";

    //geçmiş gün sınıfı verilecek
    if (format(date, "yyyy-MM-dd") < format(todayDate, "yyyy-MM-dd")) {
      string += "old-day";
    }

    // giriş tarihi class name ekle
    if (
      rezervasyonlar.find(
        (item) =>
          format(new Date(item.checkIn), "yyyy-MM-dd") ===
          format(date, "yyyy-MM-dd")
      )
    ) {
      string == ""
        ? (string += `start-date ${reservationStatus(date)}`)
        : (string += ` start-date ${reservationStatus(date)}`);
    }

    //çıkış tarihi class name ekle
    if (
      rezervasyonlar.find(
        (item) =>
          format(new Date(item.checkOut), "yyyy-MM-dd") ===
          format(date, "yyyy-MM-dd")
      )
    ) {
      string == ""
        ? (string += `end-date ${reservationStatus(date)}`)
        : (string += ` end-date ${reservationStatus(date)}`);
    }

    const normalDayStatus =
      rezervasyonlar.find((item) => {
        const entryDate = format(new Date(item.checkIn), "yyyy-MM-dd");
        const exitDate = format(new Date(item.checkOut), "yyyy-MM-dd");

        return (
          format(new Date(date), "yyyy-MM-dd") > entryDate &&
          format(new Date(date), "yyyy-MM-dd") < exitDate
        ); // Tarih aralığında mı kontrol et
      })?.reservationStatusType || null;

    if (normalDayStatus == 1) {
      string == "" ? (string += "onaylanmis") : (string += " onaylanmis");
    } else if (normalDayStatus == 2) {
      string == "" ? (string += "opsiyonlu") : (string += " opsiyonlu");
    }

    //eğer bir günde start-date ve end-date sınıfları aynı anda var ise opsiyonludan onaylanmışa mı yoksa onaylanmıştan
    // opsiyonluya doğru mu olduğunu tespit et ve ona göre sınıf ekle
    if (string.includes("start-date") && string.includes("end-date")) {
      function getStatusMapping(status1, status2) {
        const statusMap = {
          "1-1": "onaydanOnaya",
          "1-2": "onaydanOpsiyona",
          "2-1": "opsiyondanOnaya",
          "2-2": "opsiyondanOpsiyona",
        };

        return statusMap[`${status1}-${status2}`] || null; // Varsayılan olarak `null`
      }

      function removeMultipleWords(text, words) {
        const regex = new RegExp(words.join("|"), "gi"); // '|' ile alternatifleri belirler
        return text.replace(regex, "");
      }

      const index = rezervasyonlar.findIndex((item) => {
        const entryDate = format(new Date(item.checkIn), "yyyy-MM-dd");
        const exitDate = format(new Date(item.checkOut), "yyyy-MM-dd");

        return (
          format(new Date(date), "yyyy-MM-dd") >= entryDate &&
          format(new Date(date), "yyyy-MM-dd") <= exitDate
        );
      });

      const status1 = rezervasyonlar[index]?.reservationStatusType;
      const status2 = rezervasyonlar[index + 1]?.reservationStatusType;

      string = removeMultipleWords(string, [
        "start-date",
        "end-date",
        "opsiyonlu",
      ]);

      string == ""
        ? (string = getStatusMapping(status1, status2))
        : (string += ` ${getStatusMapping(status1, status2)}`);
    }

    return string;
  };

  const dayContentRenderer = (date) => {
    const formattedDate = formatDate(date);
    const price = dailyPrices[formattedDate];
    return (
      <div className="custom-day">
        <span className="day-number">{date.getDate()}</span>
        {price !== undefined && (
          <span className="day-price">
            {priceTypeText}
            {price}
          </span>
        )}
      </div>
    );
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Ekran boyutunu takip etmek için useEffect
  useEffect(() => {
    const cookies = parseCookies();
    setCurrencies(JSON.parse(cookies.currencies));

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMonthsShown(1); // Ekran boyutu 768px'den küçükse sadece 1 ay göster
      } else {
        setMonthsShown(2); // Ekran boyutu büyükse 2 ay göster
      }
    };

    // Ekran boyutunu kontrol et
    handleResize(); // ilk başta hemen çalıştır

    // Pencere boyutu değiştiğinde handleResize fonksiyonunu çağır
    window.addEventListener("resize", handleResize);

    // Temizleme işlemi
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [startDate, endDate]);

  return (
    <>
      {/* <div>
        <button
          className={styles.mobileAvailabilityCalendarButton}
          onClick={openModal}
        >
          {t("openAvailabilityCalendar")}
        </button>

        <ModalComponent isOpen={isModalOpen} onClose={closeModal}>
          <div className={`${styles.fullDatepicker} ${styles.modal}`}>
            <div className={styles.datepickerBox}>
              <MyDatePicker
                calendarPrices={calendarPrices}
                nowYear={yearTab}
                year={yearTab}
                dates={dates}
                currentMounth={month}
                priceTypeText={priceTypeText}
                priceType={priceType}
              />
            </div>
          </div>
        </ModalComponent>
      </div> */}
      <div className={styles.fullDatepicker}>
        <div className={styles.title}>
          {t("availabilityCalendar")}
          <div className={styles.options}>
            <span className={styles.orange}>{t("optional")}</span>
            <span className={styles.red}>{t("full")}</span>
          </div>
        </div>
        {/* {ready &&
                <div className={`${styles['calendar-header']}`}>
                    <div>
                        <div onClick={() => handleYearTab('back')} className={styles.prev}><span>{displayLessIcon('back')}</span></div>
                        <div onClick={() => setYearTab(yearTab - 2)} className={`${styles['year-title']} ${styles['year-neighbor2']} ${displayYearTab(yearTab - 2)}`}>{yearTab - 2}</div>
                        <div onClick={() => setYearTab(yearTab - 1)} className={`${styles['year-title']} ${styles['year-neighbor']} ${displayYearTab(yearTab - 1)}`}>{yearTab - 1}</div>
                        <div className={`${styles['year-title']}`}>{yearTab}</div>
                        <div onClick={() => setYearTab(yearTab + 1)} className={`${styles['year-title']} ${styles['year-neighbor']} ${displayYearTab(yearTab + 1)}`}>{yearTab + 1}</div>
                        <div onClick={() => setYearTab(yearTab + 2)} className={`${styles['year-title']} ${styles['year-neighbor2']} ${displayYearTab(yearTab + 2)}`}>{yearTab + 2}</div>
                        <div onClick={() => handleYearTab('next')} className={`${styles['next']}`}><span>{displayLessIcon('next')}</span></div>
                    </div>
                </div>
            } */}
        <div className={styles.datepickerBox}>
          {/* <MyDatePicker
            calendarPrices={calendarPrices}
            nowYear={yearTab}
            year={yearTab}
            dates={dates}
            currentMounth={month}
            priceTypeText={priceTypeText}
            priceType={priceType}
          /> */}
          <DatePicker
            calendarClassName="detailAvailabilityCalendar"
            locale={tr}
            inline
            monthsShown={monthsShown}
            selected={startDate}
            onChange={popop}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            filterDate={isDateSelectable}
            dayClassName={(date) => checkDateType(date)}
            renderDayContents={(day, date) => dayContentRenderer(date)}
            minDate={todayDate}
            maxDate={addYears(todayDate, 1)}
          />
        </div>
      </div>
    </>
  );
};

export default Calendar;
