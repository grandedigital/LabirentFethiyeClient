import React, { useEffect } from "react";
import styles from "./hakkimizda/page.module.css";

import Link from "next/link";
import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const DortYuzDort = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== "/404") {
      router.replace("/404");
    }
  }, []);
  return (
    <>
      <BreadCrumb link="404" />
      <section className={`${styles["contentDetail"]} ${styles["corporate"]}`}>
        <div className={styles.titleBox}>
          <div className={styles.container}>
            <h1 className={styles.title}>The page cannot be found</h1>
          </div>
        </div>
        <div className={styles.textBox}>
          <div className={styles.container}>
            <div className={styles.text}>
              <p>
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
              </p>

              <p>
                Please try the following: Make sure that the Web site address
                displayed in the address bar of your browser is spelled and
                formatted correctly. If you reached this page by clicking a
                link, contact the Web site administrator to alert them that the
                link is incorrectly formatted. Click the Back button to try
                another link. HTTP Error 404 - File or directory not found.
                Internet Information Services (IIS)
              </p>
            </div>
            <div className={styles.linkBox}>
              <Link className={styles.blueButton2} href={`/`}>
                <span>Anasayfa</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DortYuzDort;

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}
