import Head from "next/head";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Seo = ({ pageTitle, pageDesc }) => {
  const router = useRouter();
  const { i18n } = useTranslation();

  return (
    <>
      <Head>
        <title>{pageTitle ? pageTitle : "Labirent Fethiye"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={pageDesc ? pageDesc : "Labirent Fethiye içerik yok"}
        />

        {router?.asPath === "/" ? (
          <>
            <link
              rel="canonical"
              href={`https://labirentfethiye.com/${
                router?.defaultLocale === router?.locale
                  ? ""
                  : router?.locale + "/"
              }`}
            />
            <link
              rel="alternate"
              hrefLang="tr"
              href="https://labirentfethiye.com/"
            />
            <link
              rel="alternate"
              hrefLang="en"
              href="https://labirentfethiye.com/en/"
            />
          </>
        ) : (
          <>
            <link
              rel="canonical"
              href={`https://labirentfethiye.com${
                router?.defaultLocale === router?.locale
                  ? ""
                  : "/" + router?.locale
              }${router?.asPath}/`}
            />
            <link
              rel="alternate"
              hrefLang="tr"
              href={`https://labirentfethiye.com${router?.asPath}/`}
            />
            <link
              rel="alternate"
              hrefLang="en"
              href={`https://labirentfethiye.com/en${router?.asPath}/`}
            />
          </>
        )}
      </Head>
    </>
  );
};

export default Seo;
