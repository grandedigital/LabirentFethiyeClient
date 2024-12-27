import Link from "next/link";
import Image from "next/image";
import styles from "./footerTop.module.css";
import { useTranslation } from "react-i18next";
import { capitalizeWords } from "@/utils/globalUtils";

export default function FooterTop({ regions }) {
  const { t } = useTranslation("common");
  return (
    <div className={styles.top}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.left}>
            <div className={styles.footerLogo}>
              <Link href="/" title="Labirent Fethiye">
                <Image
                  src="/images/labirent.png"
                  priority
                  alt=""
                  width={142}
                  height={56}
                />
              </Link>
            </div>
            <div className={styles.footerContact}>
              <ul>
                <li>
                  <div className={styles.footerTitle}>{t("address")}</div>
                  <div className={styles.footerDecs}>
                    Ölüdeniz, Atatürk Cd. No:83, 48340 Fethiye/Muğla
                  </div>
                </li>
                <li>
                  <div className={styles.footerTitle}>{t("resevation")}</div>
                  <div className={styles.footerDecs}>
                    <Link rel="nofollow" href="tel:+902526166648">
                      +90 252 616 66 48
                    </Link>
                  </div>
                </li>
                <li>
                  <div className={styles.footerTitle}>
                    {t("ourWorkingHours")}
                  </div>
                  <div className={styles.footerDecs}>
                    {t("weekday")} 09:00 - 18:00 <br />
                    {t("weekend")} 09:00 - 18:00
                  </div>
                </li>
                <li>
                  <div className={styles.footerTitle}>{t("eMail")}</div>
                  <div className={styles.footerDecs}>
                    <Link rel="nofollow" href="mailto:info@labirentfethiye.com">
                      info@labirentfethiye.com
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
            <div className={styles.socialMedia}>
              <div className={styles.socialText}>{t("followUs")}</div>
              <ul>
                <li>
                  <Link
                    href="https://www.facebook.com/Labirentfethiye/"
                    target="_blank"
                    rel="nofollow"
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
                                    <Link href="https://g.page/labirentfethiye?share" target="_blank" className={styles.google} title="">
                                        <i></i>
                                    </Link>
                                </li> */}
              </ul>
            </div>
            <div className={styles.tursabBox}>
              <Link href="https://www.tursab.org.tr/tr/ddsv" target="_blank">
                <Image
                  src="/images/tursab-dds-1210.png"
                  alt=""
                  width={290}
                  height={132}
                />
              </Link>
            </div>
          </div>
          <div className={styles.right}>
            {/* <div className={styles.bulletionBox}>
                            <form action="" className={styles.formBulletion}>
                                <div className={styles.formTitle}>E-Posta`nızı Kayıt Edin</div>
                                <div className={styles.inputBox}>
                                    <input type="text" className={styles.inputText} placeholder="Email Adresiniz." />
                                    <input type="submit" className={styles.bulletionButton} value="" />
                                </div>
                            </form>
                        </div> */}
            <div className={styles.footerMenu}>
              <div className={styles.colon}>
                <div className={styles.colonTitle}>{t("usefulLinks")}</div>
                <ul className={styles.footerMenu}>
                  <li>
                    <Link href="/kiralama-sartlari" rel="nofollow" title="">
                      <span>{capitalizeWords(t("rentalConditions"))}</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/yemek-servisi" rel="nofollow" title="">
                      <span>{capitalizeWords(t("foodService"))}</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/sikayet-bildirimi" rel="nofollow" title="">
                      <span>{capitalizeWords(t("complaintNotification"))}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dolandiricilara-dikkat"
                      rel="nofollow"
                      title=""
                    >
                      <span>{capitalizeWords(t("bewareOfScammers"))}</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/neden-labirent" rel="nofollow" title="">
                      <span>{capitalizeWords(t("whyLabyrinth"))}</span>
                    </Link>
                  </li>
                  <li>
                    <Link rel="nofollow" href="/hakkimizda" title="">
                      <span>{capitalizeWords(t("headerAboutUs"))}</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/sss" rel="nofollow" title="">
                      <span>{capitalizeWords(t("faq"))}</span>
                    </Link>
                  </li>
                  {/* <li>
                                        <Link href="#" title="">
                                            <span>Soru Cevap</span>
                                        </Link>
                                    </li> */}
                  <li>
                    <Link
                      onClick={(e) => e.preventDefault()}
                      href="#"
                      rel="nofollow"
                      title=""
                    >
                      <span>{capitalizeWords(t("opportunities"))}</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className={styles.colon}>
                <div className={styles.colonTitle}>{t("regions")}</div>
                <ul className={styles.footerMenu}>
                  {regions?.map((item, index) => (
                    <li key={item?.id || "regionItem" + index}>
                      <Link href={`/bolgeler/${item?.slug || "yok"}`}>
                        <span>
                          {item?.webPageDetails
                            ? item?.webPageDetails[0]?.title
                            : undefined}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
