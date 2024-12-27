import styles from "./distanceRuler.module.css";
import Link from "next/link";

export default function DistanceRuler({ data, t }) {
  if (data?.data?.length == 0) return null;
  return (
    <>
      <div className={styles.villaDetailTitle}>{t("distanceRuler")}</div>
      <div className={styles.services}>
        <div className={styles.box}>
          <div className={styles.bottom}>
            <div className={styles.row}>
              <ul>
                {data?.data?.map((data, index) => (
                  <li key={index}>
                    <div className={styles.column}>
                      <Link onClick={(e) => e.preventDefault()} href="#">
                        <div className={styles.iconBox}>
                          <i
                            style={{
                              backgroundImage: `url(/images/${data?.icon}.png)`,
                            }}
                          ></i>
                          <i
                            className={styles.two_i}
                            style={{
                              backgroundImage: `url(/images/${data?.icon}-hover.png)`,
                            }}
                          ></i>
                        </div>
                        <div className={styles.title}>
                          {data?.name}
                        </div>
                        <div className={styles.distance}>
                          {data?.value}
                        </div>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
