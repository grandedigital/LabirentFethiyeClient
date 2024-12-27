import Head from "next/head";

const Seo = ({ pageTitle, pageDesc }) => (
  <>
    <Head>
      <title>{pageTitle ? `${pageTitle}` : "Labirent Fethiye"}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content={pageDesc ? `${pageDesc}` : "Labirent Fethiye içerik yok"}
      />
    </Head>
  </>
);

export default Seo;
