import Image from "next/image";
import styles from "./top.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function HeaderTop() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const { pathname, query, asPath } = router;

  const otherLocales = (locales || []).filter(
    (locale) => locale !== activeLocale && locale !== "default"
  );

  const returnLanguageFlag = (language) => {
    if (language == "tr") {
      return (
        <Image
          className={styles.langFlag}
          alt="trLang"
          src="/images/tr.jpg"
          width={16}
          height={16}
        />
      );
    } else if (language == "en") {
      return (
        <Image
          className={styles.langFlag}
          alt="enLang"
          src="/images/en.png"
          width={16}
          height={16}
        />
      );
    } else return <></>;
  };

  return (
    <div className={styles.top}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.left}>
            <div className={styles.colon}>
              <i style={{ backgroundImage: `url(/images/call.png)` }}></i>
              <span>
                {t("contactUs")} <a href="tel:02428443988">+90 252 616 66 48</a>
              </span>
            </div>
            <div className={styles.colon}>
              <i style={{ backgroundImage: `url(/images/clock.png)` }}></i>
              <span>{t("workingHours")} : 09:00 - 18:00</span>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.socialMedia}>
              <div className={styles.socialText}>{t("followUs")}</div>
              <ul>
                <li>
                  <Link
                    target="_blank"
                    rel="nofollow"
                    href="https://www.facebook.com/Labirentfethiye/"
                    className={styles.facebook}
                  >
                    <i></i>
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    rel="nofollow"
                    href="https://www.youtube.com/channel/UCHSwoqGIPpT6rqP2fsA9TwA"
                    className={styles.youtube}
                  >
                    <i></i>
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    rel="nofollow"
                    href="https://www.instagram.com/labirentfethiye/"
                    className={styles.instagram}
                  >
                    <i></i>
                  </Link>
                </li>
                {/* <li>
                                    <Link target="_blank" href='https://g.page/labirentfethiye?share' className={styles.google}>
                                        <i></i>
                                    </Link>
                                </li> */}
              </ul>
            </div>
            <div className={styles.lang}>
              <ul>
                {otherLocales.map((localeItem) => {
                  return (
                    <li key={localeItem}>
                      <Link
                        href={{ pathname, query }}
                        hrefLang={localeItem}
                        as={asPath}
                        locale={localeItem}
                        legacyBehavior
                      >
                        {returnLanguageFlag(localeItem)}
                        {/* {localeItem} */}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
