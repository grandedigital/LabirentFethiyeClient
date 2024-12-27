import styles from "./dynamicPriceTable.module.css"

export default function PriceTableSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#f2f2f2",
        borderRadius: "8px",
        margin: "10px 0",
        padding: 30,
      }}
    >
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{width: "100%", display: "flex", justifyContent: "space-between"}}>
            <span className={`${styles["priceTitle"]} ${styles["animation"]}`}></span>
            <div style={{gap: 20, display: "flex"}}>
                <span className={`${styles["cureButtons"]} ${styles["animation"]}`}></span>
                <span className={`${styles["cureButtons"]} ${styles["animation"]}`}></span>
                <span className={`${styles["cureButtons"]} ${styles["animation"]}`}></span>
                <span className={`${styles["cureButtons"]} ${styles["animation"]}`}></span>
            </div>
        </div>
        <div className={styles.priceMonthsContainer}>
            <div style={{width: "100%", height: "100%", display: "flex", flexWrap: "wrap"}}>
                <div className={styles.priceMonthItemContainer}>
                    <span className={`${styles["priceMonthItem"]} ${styles["animation"]}`}></span>
                </div>
                <div className={styles.priceMonthItemContainer}>
                    <span className={`${styles["priceMonthItem"]} ${styles["animation"]}`}></span>
                </div>
                <div className={styles.priceMonthItemContainer}>
                    <span className={`${styles["priceMonthItem"]} ${styles["animation"]}`}></span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
