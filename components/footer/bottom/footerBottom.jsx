import Image from "next/image";
import styles from "./footerBottom.module.css";

export default function FooterBottom() {
  return (
    <div className={styles.bottom}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.left}>
            © Copyright {new Date().getFullYear()} Labirent Fethiye
          </div>
          <div className={styles.right}>
            <Image
              src="/images/card.png"
              alt="Card Image"
              width={140}
              height={27}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
