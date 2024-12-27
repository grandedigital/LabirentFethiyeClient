import styles from "./tab.module.css";
import { useState } from "react";

export default function VillaTab({
  categories,
  setActiveCategorySlug,
  activeCategorySlug,
  setTabIsChanged,
}) {
  const [error, setError] = useState(null);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (false) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {categories.data.map((item, i) => (
          <li
            id={styles.villaTabLi}
            className={activeCategorySlug == item.slug ? styles.active : null}
            key={i}
          >
            <span
              onClick={() => {
                setTabIsChanged(true);
                setActiveCategorySlug(item?.slug);
              }}
            >
              <div className={styles.iconBox}>
                <i
                  style={{ backgroundImage: `url(/images/${item?.icon})` }}
                ></i>
              </div>
              <div className={styles.title}>{item?.name}</div>
            </span>
          </li>
        ))}
      </ul>
    );
  }
}
