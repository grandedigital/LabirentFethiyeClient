"use client";
import styles from "./hamburgerMenu.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeHamburgerMenuState } from "@/store/globalState";
import { getCategories } from "@/services/category";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function HamburgerMenu() {
  const { i18n } = useTranslation();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const isHamburgerMenuActive = useSelector(
    (state) => state.globalState.isHamburgerMenuActive
  );
  const [menu1, setMenu1] = useState(false);
  const [category, setCategory] = useState([]);

  const closeMenu = () => {
    dispatch(changeHamburgerMenuState());
    setMenu1(false);
  };

  useEffect(() => {
    getCategories(i18n.language).then((res) => {
      setCategory(res?.data);
    });
  }, []);
  return (
    <>
      <div className={`${isHamburgerMenuActive && styles.openMenuDark}`}></div>
      <section
        className={`${styles["hamburgerMenu"]} ${
          isHamburgerMenuActive ? styles["active"] : ""
        }`}
      >
        <div className={styles.hamburgerMenuBox}>
          <div className={styles.menuCloseBox}>
            <Image
              src="/images/labirentMorLogo.png"
              alt="hamburgerLogo"
              width={142}
              height={56}
              style={{ objectFit: "contain" }}
            />
            <div onClick={closeMenu} className={styles.menuClose}></div>
          </div>
          <div className={styles.hmMenu}>
            <ul className={styles.hmMenuUl}>
              <li className={styles.hmMenuLi}>
                <Link
                  onClick={closeMenu}
                  href="/"
                  className={styles.hmMenuLink}
                >
                  {t("headerHomePage")}
                </Link>
              </li>
              <li
                onClick={() => setMenu1(!menu1)}
                className={`${styles["hmMenuLi"]} ${styles["menuOpen"]} ${
                  menu1 ? styles["open"] : ""
                }`}
              >
                <Link
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={styles.hmMenuLink}
                >
                  {t("headerVillasForRent")}
                </Link>
                <ul style={{ marginTop: menu1 ? "24px" : 0 }}>
                  {/* <li><Link href="villalar/balayi-villalari">Balayı Villaları</Link></li>
                                <li><Link href="#">Popüler Villalar</Link></li>
                                <li><Link href="#">Çocuk Havuzlu Villalar</Link></li>
                                <li><Link href="#">Ekonomik Manzaralı</Link></li>
                                <li><Link href="#">Korunaklı Villalar</Link></li>
                                <li><Link href="#">Kış Aylarına Uygun</Link></li> */}
                  <li>
                    <Link onClick={closeMenu} href={`/villalar`}>
                      {t("allVillas")}
                    </Link>
                  </li>
                  {category.map((item, i) => {
                    return (
                      <li key={i}>
                        <Link
                          onClick={closeMenu}
                          href={`/villalar/${item?.slug || "yok"}`}
                        >
                          {item?.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li className={styles.hmMenuLi}>
                <Link
                  onClick={closeMenu}
                  href="/apartlar"
                  className={styles.hmMenuLink}
                >
                  {t("headerApartmentsForRent")}
                </Link>
              </li>
              {/* <li className={styles.hmMenuLi}>
                <Link
                  onClick={closeMenu}
                  href="/arac-kiralama"
                  rel="nofollow"
                  className={styles.hmMenuLink}
                >
                  {t("headerCarRental")}
                </Link>
              </li> */}
              <li className={styles.hmMenuLi}>
                <Link
                  onClick={closeMenu}
                  href="/aktiviteler"
                  rel="nofollow"
                  className={styles.hmMenuLink}
                >
                  {t("headerActivates")}
                </Link>
              </li>
              <li className={styles.hmMenuLi}>
                <Link
                  onClick={closeMenu}
                  href="/bloglar"
                  rel="nofollow"
                  className={styles.hmMenuLink}
                >
                  {t("headerBlog")}
                </Link>
              </li>
              <li className={styles.hmMenuLi}>
                <Link
                  onClick={closeMenu}
                  href="/hakkimizda"
                  rel="nofollow"
                  className={styles.hmMenuLink}
                >
                  {t("headerAboutUs")}
                </Link>
              </li>
              <li className={styles.hmMenuLi}>
                <Link
                  onClick={closeMenu}
                  href="/iletisim"
                  rel="nofollow"
                  className={styles.hmMenuLink}
                >
                  {t("headerContact")}
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.bottomSection}>
            <div className={`${styles["linkBox"]}`}>
              <Link onClick={closeMenu} href="/rezervasyon-takip">
                <span>{t("reservationInquiry")}</span>
              </Link>
            </div>
            <div className={styles.container2}>
              <div className={`${styles["linkBox"]}`}>
                <Link
                  style={{ backgroundColor: "#3ac007" }}
                  onClick={closeMenu}
                  href="https://wa.me/+905378800703/?text=Merhaba, yardımcı olur musunuz ?"
                  target="_blank"
                >
                  <span>WhatsApp</span>
                </Link>
              </div>
              <div className={`${styles["linkBox"]}`}>
                <Link
                  href="tel:+902526166648"
                  target="_blank"
                  style={{ backgroundColor: "#c10a0a" }}
                  onClick={closeMenu}
                >
                  <span>{t("callNow")}</span>
                </Link>
              </div>
            </div>
            <div className={styles.socialMedia}>
              {/* <div className={styles.socialText}>Bizi Takip Edin</div> */}
              <ul>
                <li>
                  <Link
                    href="https://www.facebook.com/Labirentfethiye/"
                    rel="nofollow"
                    target="_blank"
                    className={styles.facebook}
                    title=""
                  >
                    <i></i>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/channel/UCHSwoqGIPpT6rqP2fsA9TwA"
                    rel="nofollow"
                    target="_blank"
                    className={styles.youtube}
                    title=""
                  >
                    <i></i>
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.instagram.com/labirentfethiye/"
                    rel="nofollow"
                    target="_blank"
                    className={styles.instagram}
                    title=""
                  >
                    <i></i>
                  </Link>
                </li>
                {/* <li>
                                    <Link href="https://wa.me/5317241934/?text=Merhaba, yardımcı olur musunuz ?" target="_blank" className={styles.whatsapp}
                                        title="">
                                        <i></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="tel:05317241934" target="_blank" className={styles.call}
                                        title="">
                                        <i></i>
                                    </Link>
                                </li> */}
                {/* <li>
                                    <Link href="https://g.page/labirentfethiye?share" target="_blank" className={styles.google} title="">
                                        <i></i>
                                    </Link>
                                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
