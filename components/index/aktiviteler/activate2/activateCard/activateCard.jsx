import Link from "next/link";
import styles from "./activateCard.module.css";

export default function ActivateCard({ data, isCarouselMoving }) {
  console.log(data);

  return (
    <div className={styles.cardContainer}>
      <Link
        draggable={false}
        onClick={(e) => {
          if (isCarouselMoving) {
            e.preventDefault();
          }
        }}
        href={"#"}
        className={styles.card}
      >
        <div
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_WEBHOTOS_URL}k_${data?.photos[0]?.image})`,
          }}
          className={`${styles.imgBox}`}
        ></div>
        <div className={styles.cardBackgroundContainer}>
          <div className={styles.cardBackground}></div>
        </div>
        <div className={styles.cardContentContainer}>
          <div className={styles.cardContent}>
            <div className={styles.nameAndTempatureContainer}>
              <span className={styles.nameText}>680 VİLLA</span>
              <div className={styles.temperatureIconAndTextContainer}>
                <img
                  className={styles.temperatureIcon}
                  src="/images/sun.svg"
                  alt=""
                />
                <span className={styles.temperatureText}>22 °C </span>
              </div>
            </div>
            <span className={styles.cardName}>Fethiye Bölgesi</span>
            <span className={styles.cardDesc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
              rhoncus lacus.
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}