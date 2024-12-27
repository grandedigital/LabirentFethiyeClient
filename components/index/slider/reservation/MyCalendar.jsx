import styles from "./MyCalendar.module.css";

export default function MyCalendar({
  month,
  type,
  setActiveMonth,
  activeMonth,
  min,
  datesOrSetters,
  setDateClickCount1,
  dateClickCount1,
}) {
  const constantDate = new Date();
  let firstRowIsEnded = false;
  const date = new Date(constantDate.getFullYear(), month, 1);
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  // useEffect(() => {
  //   if (dateClickCount1 == 1) {
  //     console.log("setterEntry");
  //   }
  //   else if (dateClickCount1 == 2) {
  //     console.log("setterRelşease");
  //   }
  // }, [dateClickCount1])

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

  const addDayToDate = (_date, day) => {
    _date.setDate(date.getDate() + day);
  };

  const isItPastHistory = () => {
    if (date < constantDate) {
      return false;
    } else {
      return true;
    }
  };

  const getDay = (index = -1, firstDay = -1) => {
    const startingRenderingIndex = firstDay - 1 < 0 ? 6 : firstDay - 1;
    const day = date.getDate();
    let isDaysFinished = false;

    if (index >= startingRenderingIndex) {
      addDayToDate(date, 1);
    }

    if (!firstRowIsEnded) {
      if (index == 6) firstRowIsEnded = true;
      return (
        <span
          onClick={(e) => clickDayItem(e)}
          className={
            !(index >= startingRenderingIndex)
              ? [styles.passive]
              : isItPastHistory()
              ? [styles.active]
              : [styles.disabled]
          }
        >
          {day}
        </span>
      );
    } else {
      if (date.getDate() != 1) {
        addDayToDate(date, 1);
      } else {
        isDaysFinished = true;
        return;
      }
      return (
        <span
          onClick={(e) => clickDayItem(e)}
          className={
            isDaysFinished
              ? [styles.passive]
              : isItPastHistory()
              ? [styles.active]
              : [styles.disabled]
          }
        >
          {day}
        </span>
      );
    }
  };

  const getRow = (firstDay = -1) => {
    if (!firstRowIsEnded) {
      return (
        <div className={styles.daysRow}>
          {["1", "2", "3", "4", "5", "6", "7"].map((item, index) => {
            return (
              <div
                key={"month" + month + "" + index}
                className={styles.daysRowItem}
              >
                {getDay(index, firstDay)}
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className={styles.daysRow}>
          {["1", "2", "3", "4", "5", "6", "7"].map((item, index) => {
            return (
              <div
                key={"month" + month + "" + index}
                className={styles.daysRowItem}
              >
                {getDay()}
              </div>
            );
          })}
        </div>
      );
    }
  };

  const whatDayDoesTheMonthStart = (date) => {
    return date.getDay(); // Sunday - Saturday : 0 - 6
  };

  const getRows = () => {
    if (!firstRowIsEnded) {
      return getRow(whatDayDoesTheMonthStart(date));
    } else {
      return getRow();
    }
  };

  const clickArrow = (e) => {
    const id = parseInt(e.target.id); // 0 = left arrow, 1 = right arrow

    if (id == 0) {
      if (activeMonth > min) {
        setActiveMonth(activeMonth - 1);
      }
    } else {
      setActiveMonth(activeMonth + 1);
    }
  };

  const calculateYear = () => {
    if (month == 11 || month == 23 || month == 35) {
      return date.getFullYear() - 1;
    }
    return date.getFullYear();
  };

  const calcualteMonth = () => {
    if (month >= 12 && month < 24) {
      return month - 12;
    } else if (month >= 24) {
      return month - 24;
    }
    return month;
  };

  const clickDayItem = (e) => {
    const className = e.target.className;
    const isPastDate = className.includes("disabled");
    if (!isPastDate) {
      const date =
        e.target.innerText +
        "-" +
        parseInt(calcualteMonth() + 1) +
        "-" +
        calculateYear();

      setDateClickCount1(dateClickCount1 + 1);
      if (dateClickCount1 == 0) {
        datesOrSetters.setDateOfEntry(date);
      } else {
        datesOrSetters.setReleaseDate(date);
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.monthTitle}>
        <span
          style={{ display: min == activeMonth ? "none" : "block" }}
          id={type}
          onClick={(e) => clickArrow(e)}
          className={type == 0 ? styles.leftArrow : styles.rightArrow}
        ></span>
        {monthsTurkish[date.getMonth()]} {date.getFullYear()}
      </div>
      <div className={styles.daysTitle}>
        <div className={styles.daysTitleItem}>
          <span>Pt</span>
        </div>
        <div className={styles.daysTitleItem}>
          <span>Sl</span>
        </div>
        <div className={styles.daysTitleItem}>
          <span>Ça</span>
        </div>
        <div className={styles.daysTitleItem}>
          <span>Pe</span>
        </div>
        <div className={styles.daysTitleItem}>
          <span>Cu</span>
        </div>
        <div className={styles.daysTitleItem}>
          <span>Ct</span>
        </div>
        <div className={styles.daysTitleItem}>
          <span>Pa</span>
        </div>
      </div>
      <div className={styles.days}>
        {["1", "2", "3", "4", "5", "6"].map((item, index) => {
          if (!(lastDay + 1 == date.getDate())) {
            return getRows();
          }
        })}
      </div>
    </div>
  );
}
