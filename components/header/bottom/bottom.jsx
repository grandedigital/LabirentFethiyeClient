import styles from "./bottom.module.css";
import Image from "next/image";
import Link from "next/link";
import { changeHamburgerMenuState } from "@/store/globalState";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/category";
import { useTranslation } from "react-i18next";

export default function HeaderBottom({ from }) {
  const { i18n } = useTranslation();
  const { t } = useTranslation("common");
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  function menuHandle() {
    dispatch(changeHamburgerMenuState());
  }
  useEffect(() => {
    getCategories(i18n.language).then((res) => {
      setCategory(res?.data);
    });
  }, []);

  useEffect(() => {
    // Sayfa dil değiştiğinde yenilenmesini sağlar
    const handleLanguageChange = () => {
      //window.location.reload();
      getCategories(i18n.language).then((res) => {
        setCategory(res?.data);
      });
    };

    if (i18n.isInitialized) {
      i18n.on("languageChanged", handleLanguageChange);
    }

    return () => {
      if (i18n.isInitialized) {
        i18n.off("languageChanged", handleLanguageChange);
      }
    };
  }, [i18n]);

  return (
    <div className={styles.bottom}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.left}>
            <div className={styles.logoBox}>
              <Link href="/">
                <Image
                  src="/images/labirent.png"
                  alt="call"
                  width={142}
                  height={56}
                  priority={true}
                />
              </Link>
            </div>
            <nav>
              <ul className={styles.menu_ul}>
                <li className={styles.menu_li}>
                  <Link href="/" className={styles.menuLink}>
                    <span>{t("headerHomePage")}</span>
                  </Link>
                </li>
                <li className={`${styles["menu_li"]} ${styles["li_open"]}`}>
                  <Link href="/villalar" className={styles.menuLink}>
                    <span>{t("headerVillasForRent")}</span>
                    <i></i>
                  </Link>
                  <div className={styles.openMenu}>
                    <ul className={styles.openMenu_ul}>
                      {/* <li className={styles.openMenu_li}>
                                                <Link href="/villalar/balayi-villalari-1" className={styles.openMenu_Link}>
                                                    <span>Balayı Villaları</span>
                                                </Link>
                                            </li>
                                            <li className={styles.openMenu_li}>
                                                <Link href="/villalar/populer-villalar-5" className={styles.openMenu_Link}>
                                                    <span>Popüler Villalar</span>
                                                </Link>
                                            </li>
                                            <li className={styles.openMenu_li}>
                                                <Link href="/villalar/cocuk-havuzlu-villalar-2" className={styles.openMenu_Link}>
                                                    <span>Çocuk Havuzlu Villalar</span>
                                                </Link>
                                            </li>
                                            <li className={styles.openMenu_li}>
                                                <Link href="/villalar/ekonomik-villalar-4" className={styles.openMenu_Link}>
                                                    <span>Ekonomik Villalar</span>
                                                </Link>
                                            </li>
                                            <li className={styles.openMenu_li}>
                                                <Link href="/villalar/korunakli-villalar-6" className={styles.openMenu_Link}>
                                                    <span>Korunaklı Villalar</span>
                                                </Link>
                                            </li>
                                            <li className={styles.openMenu_li}>
                                                <Link href="/villalar/kis-aylarina-uygun-villalar-7" className={styles.openMenu_Link}>
                                                    <span>Kış Aylarına Uygun Villalar</span>
                                                </Link>
                                            </li> */}
                      {category.map((item, i) => {
                        return (
                          <li key={i} className={styles.openMenu_li}>
                            <Link
                              href={`/villalar/${item?.slug || "yok"}`}
                              className={styles.openMenu_Link}
                            >
                              <span>{item?.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
                <li className={styles.menu_li}>
                  <Link href="/apartlar" className={styles.menuLink}>
                    <span>{t("headerApartmentsForRent")}</span>
                  </Link>
                </li>
                {/* <li className={styles.menu_li}>
                  <Link href="/arac-kiralama" className={styles.menuLink}>
                    <span>{t("headerCarRental")}</span>
                  </Link>
                </li> */}
                <li className={styles.menu_li}>
                  <Link href="/aktiviteler" className={styles.menuLink}>
                    <span>{t("headerActivates")}</span>
                  </Link>
                </li>
                <li className={styles.menu_li}>
                  <Link
                    rel="nofollow"
                    href="/bloglar"
                    className={styles.menuLink}
                  >
                    <span>{t("headerBlog")}</span>
                  </Link>
                </li>
                <li className={styles.menu_li}>
                  <Link
                    rel="nofollow"
                    href="/hakkimizda"
                    className={styles.menuLink}
                  >
                    <span>{t("headerAboutUs")}</span>
                  </Link>
                </li>
                {/* <li className={`${styles["menu_li"]} ${styles["li_open"]}`}>
                                    <Link href="#" onClick={e=> e.preventDefault()} className={styles.menuLink}>
                                        <span>KURUMSAL</span>
                                        <i></i>
                                    </Link>
                                    <div className={styles.openMenu}>
                                        <ul className={styles.openMenu_ul}>
                                            <li className={styles.openMenu_li}>
                                                <Link href="/hakkimizda" className={styles.openMenu_Link}>
                                                    <span>Hakkımızda</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li> */}
                <li className={styles.menu_li}>
                  <Link
                    href="/iletisim"
                    rel="nofollow"
                    className={styles.menuLink}
                  >
                    <span>{t("headerContact")}</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.right}>
            {/* <div className={styles.basketBox}>
                            <Link href="/">
                                <i></i>
                                <span>SEPETİM</span>
                            </Link>
                        </div>
                        <div className={styles.loginBox}>
                            <div className={`${styles["linkBox"]} ${from ? styles["linkBoxDetailed"] : ""}`}>
                                <Link href="#">
                                    <span>GİRİŞ YAPIN</span>
                                </Link>
                            </div>
                        </div> */}
            <div
              className={`${styles["linkBox"]} ${
                from ? styles["linkBoxDetailed"] : ""
              }`}
            >
              <Link href="/rezervasyon-takip">
                <span>{t("reservationInquiry")}</span>
              </Link>
            </div>
            <div onClick={() => menuHandle()} className={styles.menuIcon}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
