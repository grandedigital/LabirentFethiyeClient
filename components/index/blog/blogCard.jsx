import styles from "./blogCard.module.css";
import Link from "next/link";

export default function BlogCard({ data, t }) {
  // const generateBlogLink = (title) => {
  //     let url = title
  //         .toLowerCase()
  //         .replaceAll(" ", "-")
  //         .replaceAll("?", "")
  //         .replaceAll(":", "")
  //         .replaceAll("ı", "i")
  //         .replaceAll("ç", "c")
  //         .replaceAll("ş", "s")
  //         .replaceAll("ö", "o")
  //         .replaceAll("ü", "u")
  //         .replaceAll("ğ", "g")
  //         .replaceAll("ı", "i")
  //     return url
  // }

  const formatDate = (newDateString) => {
    var originalDateString = newDateString;

    var parts = originalDateString.split(".");
    var day = parseInt(parts[0], 10).toString();
    var month = parseInt(parts[1], 10).toString();
    var year = parts[2];

    // Gün ve ayı kontrol edip başındaki sıfırları kaldırın
    day = day.replace(/^0+/, "");
    month = month.replace(/^0+/, "");

    var newDateString = day + "." + month + "." + year;

    return newDateString;
  };

  const formatTime = (hour) => {
    var timeString = hour;

    // Bugünün tarihini alın
    var today = new Date();

    // Saati, dakikayı ve saniyeyi alın
    var hours = today.getUTCHours();
    var minutes = today.getUTCMinutes();
    var seconds = today.getUTCSeconds();

    // Saati, dakikayı ve saniyeyi 'timeString' tarih dizgisinden alın
    var timeParts = timeString.split(/[:.Z]/);
    hours = parseInt(timeParts[0], 10);
    minutes = parseInt(timeParts[1], 10);
    seconds = parseInt(timeParts[2], 10);

    // Yeni Date objesini oluşturun ve saat, dakika ve saniyeyi ayarlayın
    var newDate = new Date();
    newDate.setUTCHours(hours);
    newDate.setUTCMinutes(minutes);
    newDate.setUTCSeconds(seconds);

    // Yeni saat dizgisini oluşturun
    var newTimeString = newDate.toISOString().substr(11, 8);

    return newTimeString; // Çıktı: "12:03:22"
  };

  const formatDateAndTime = () => {
    const _data = data?.attributes?.createdAt?.split("T");
    const _date = _data[0];
    const _hour = _data[1];

    var originalDateString = _date;
    var originalDate = new Date(originalDateString);
    var newDateString = originalDate.toLocaleDateString("tr-TR"); // day.month.year 13.01.2024

    const formatedData = formatDate(newDateString) + " " + formatTime(_hour);

    return formatedData;
  };

  return (
    <li className={styles.blogCardContainer}>
      <Link rel="nofollow" href={`bloglar/${data?.slug || "yok"}`}>
        <div className={styles.imgBox}>
          <div
            className={styles.bgImage}
            style={{
              backgroundImage: `url(${process.env.NEXT_PUBLIC_WEBHOTOS_URL}k_${data?.photos[0]?.image})`,
            }}
          ></div>
          <div className={styles.cardFeatures}>{t("travelExpert")}</div>
        </div>
        <div className={styles.textBox}>
          <div className={styles.features}>
            <div className={styles.colon}>
              <i className={styles.person_icon}></i>
              <span>{t("travelExpert")}</span>
            </div>
            <div className={styles.colon}>
              <i className={styles.date_icon}></i>
              <span>1</span>
            </div>
          </div>
          <div className={styles.title}>{data?.webPageDetails[0]?.title}</div>
          <div className={styles.desc}>
            {data?.webPageDetails[0]?.descriptionShort}
          </div>
          <div className={styles.detailButton}>{t("continued")}...</div>
        </div>
      </Link>
    </li>
  );
}
