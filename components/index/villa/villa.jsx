import VillaTab from "./tab/tab";
import styles from "./villa.module.css";
import VillaCard from "./card/villaCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getVillasHome } from "@/services/villa";
import { useTranslation } from "react-i18next";

export default function Villa({ villas, category }) {
  const { t, i18n } = useTranslation("common");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeCategoryId, setActiveCategoryId] = useState(
    category?.data[0]?.id
  );
  const [activeCategorySlug, setActiveCategorySlug] = useState(
    category?.data[0]?.slug || "balayi-villalari"
  );
  const [villasData, setVillasData] = useState(villas);
  const [isTabChanged, setTabIsChanged] = useState(false);

  useEffect(() => {
    async function getHomeVillas() {
      const data = await getVillasHome(8, 0, activeCategorySlug, i18n.language);
      setVillasData(data);
    }
    if (isTabChanged) {
      getHomeVillas();
    }
  }, [activeCategorySlug]);

  return (
    <div className={styles.villas}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.titleBox}>
            <div className={styles.title}>{t("ourVillas")}</div>
            <div className={styles.subTitle}>{t("ourVillasText")}</div>
          </div>
          <div className={styles.top}>
            <ul>
              <VillaTab
                activeCategorySlug={activeCategorySlug}
                setActiveCategorySlug={setActiveCategorySlug}
                categories={category}
                setTabIsChanged={setTabIsChanged}
              />
            </ul>
          </div>
          <div className={styles.bottom}>
            <div className={styles.row}>
              <ul>
                {villasData?.data?.map((villa, index) => (
                  <VillaCard
                    activeTabIndex={activeTabIndex}
                    categories={category}
                    activeCategorySlug={activeCategorySlug}
                    activeCategoryId={activeCategoryId}
                    key={index}
                    data={villa}
                    type="villa"
                    photos={villa?.photos}
                  />
                ))}
                <div className={styles.linkBox}>
                  <Link
                    className={styles.blueButton2}
                    href={`/villalar/${activeCategorySlug || "yok"}`}
                  >
                    <span>{t("viewAll")}</span>
                  </Link>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
