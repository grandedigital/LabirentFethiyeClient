import styles from "./dynamicCalendar.module.css"

export default function CalendarSkeleton() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#f2f2f2",
        borderRadius: "8px",
        padding: "20px 0"
      }}
    >
        <div style={{width: "100%", display:"flex", justifyContent: "space-between", padding: "0 10px", alignItems: "center"}}>
            <span className={`${styles["mainTitle"]} ${styles["animation"]}`}></span>
            <div style={{height: 30, display: "flex", justifyContent:"space-between", gap: 10}}>
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                    <span className={`${styles["roundedItem"]} ${styles["animation"]}`}></span>
                    <span className={`${styles["roundedItemTitle"]} ${styles["animation"]}`}></span>
                </div>
                <div style={{display: "flex", alignItems: "center", gap: 10}}>
                    <span className={`${styles["roundedItem"]} ${styles["animation"]}`}></span>
                    <span className={`${styles["roundedItemTitle"]} ${styles["animation"]}`}></span>
                </div>
            </div>
        </div>
        <div style={{width: "100%", display: "flex", marginTop: 30, flexWrap: "wrap"}}>
            <div className={styles.calendarItem}>
                <div style={{ width: "100%", height: "100%", backgroundColor: "#cfcfcf", animation: 'pulse 1.5s infinite'}}></div>
            </div>
            <div className={styles.calendarItem}>
                <div style={{ width: "100%", height: "100%", backgroundColor: "#cfcfcf", animation: 'pulse 1.5s infinite'}}></div>
            </div>
            <div className={styles.calendarItem}>
                <div style={{ width: "100%", height: "100%", backgroundColor: "#cfcfcf", animation: 'pulse 1.5s infinite'}}></div>
            </div>
        </div>
    </div>
  );
}
