import styles from "./calendar.module.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { tr, enUS } from "date-fns/locale";
import { format, isWithinInterval, eachDayOfInterval } from "date-fns";
import DatePicker from "react-datepicker";

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

  // Rezervasyonlar
  const rezervasyonlar = [
    { start: new Date("2025-02-02"), end: new Date("2025-02-09") },
    { start: new Date("2025-02-10"), end: new Date("2025-02-15") },
    { start: new Date("2025-03-01"), end: new Date("2025-03-05") },
  ];

  // Fiyatlar
  const ranges = [
    { startDate: "2025-02-01", endDate: "2025-02-28", price: 100 },
    { startDate: "2025-03-01", endDate: "2025-03-31", price: 150 },
  ];

  // Rezervasyon kontrol fonksiyonu
  const checkReservation = (start, end) => {
    const selectedDates = eachDayOfInterval({ start, end }); // Giriş ve çıkış arası günleri al

    const index1 = rezervasyonlar.some(
      (item, index) =>
        format(item.end, "yyyy-MM-dd") == format(start, "yyyy-MM-dd")
    );

    //çıkış tarihinden itibaren bir rezervasyon seçileceği zaman patlıyordu burada o çözüldü
    if (index1) {
      selectedDates.shift();
    }
    console.log(selectedDates);

    const reserved = selectedDates.some((date) =>
      rezervasyonlar.some(({ start: rStart, end: rEnd }) =>
        isWithinInterval(date, { start: rStart, end: rEnd })
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

      while (currentDate <= end) {
        const dateKey = currentDate.toISOString().split("T")[0];
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

    //giriş ve çıkış tarihleri seçilince çalışacak kod bloğu
    if (!dates.includes(null)) {
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
          format(date, "yyyy-MM-dd") == format(range.start, "yyyy-MM-dd")
      ) ||
      rezervasyonlar.some(
        (range) => format(date, "yyyy-MM-dd") == format(range.end, "yyyy-MM-dd")
      )
    )
      return true;

    var result = !rezervasyonlar.some(
      (range) => date >= range.start && date <= range.end
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
          format(item.start, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      )
    ) {
      string == "" ? (string += "start-date") : (string += " start-date");
    }

    //çıkış tarihi class name ekle
    if (
      rezervasyonlar.find(
        (item) => format(item.end, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
      )
    ) {
      string == "" ? (string += "end-date") : (string += " end-date");
    }
    return string;
  };

  const dayContentRenderer = (date) => {
    const formattedDate = formatDate(date);
    const price = dailyPrices[formattedDate];
    return (
      <div className="custom-day">
        <span className="day-number">{date.getDate()}</span>
        {price !== undefined && <span className="day-price">${price}</span>}
      </div>
    );
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Ekran boyutunu takip etmek için useEffect
  useEffect(() => {
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
  }, []);

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
            onChange={(dates) => popop(dates)}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            filterDate={isDateSelectable}
            dayClassName={(date) => checkDateType(date)}
            renderDayContents={(day, date) => dayContentRenderer(date)}
          />
        </div>
      </div>
    </>
  );
};

export default Calendar;
