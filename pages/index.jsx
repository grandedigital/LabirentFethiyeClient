import Slider from "@/components/index/slider/slider";
import TreeStep from "@/components/index/treestep/treestep";
import Villa from "@/components/index/villa/villa";
import Activates from "@/components/index/aktiviteler/activate";
// import Regions from "@/components/index/region/region";
import Apart from "@/components/index/apart/apart";
import Service from "@/components/index/service/service";
import Blog from "@/components/index/blog/blog";
import VillaRent from "@/components/index/villaRentInfo/villaRentInfo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NewVillas from "@/components/index/newest/newest";
import nookies from "nookies";

//const Slider = lazy(() => import('@/components/index/slider/slider'));
//const TreeStep = lazy(() => import("@/components/index/treestep/treestep"));
//const Villa = lazy(() => import("@/components/index/villa/villa"));
//const Regions = lazy(() => import("@/components/index/region/region"));
//const Activates = lazy(() => import("@/components/index/aktiviteler/activate"));
//const Apart = lazy(() => import("@/components/index/apart/apart"));
//const Service = lazy(() => import("@/components/index/service/service"));
//const Blog = lazy(() => import("@/components/index/blog/blog"));
//const VillaRent = lazy(() => import("@/components/index/villaRentInfo/villaRentInfo"));

import {
  getVillasHome,
  getHotels,
  getAllVillaByCategorySlug,
} from "@/services/villa";
import { getCategories } from "@/services/category";
import Seo from "@/components/seo";
//import { getRegions } from "@/services/region";
import { getBlogs } from "@/services/blog";
//import { lazy, Suspense } from "react";
import { getActivates } from "@/services/activite";
import { getCurrencies } from "@/services";
import Comments from "@/components/other/comment/Comments";
import { useTranslation } from "react-i18next";
import Activate2 from "@/components/index/aktiviteler/activate2/activate2";

export default function Home({
  villa,
  categories,
  regions,
  blogs,
  testimonials,
  aparts,
  activates,
  newVillasData,
}) {
  console.log(newVillasData);
  
  const { i18n } = useTranslation();
  const { t } = useTranslation("common");

  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye"}
        pageDesc={"Labirent Fethiye Villalar"}
      />

      <Slider />
      <section id="contentContainer">
        <TreeStep />
        <Villa category={categories} villas={villa} />
        {/* <Regions homePage={true} regions={regions} /> */}
        {/* <Activates homePage={true} activates={activates} /> */}
        <Activate2 t={t} activates={activates} />
        <Apart aparts={aparts} />
        <Service />
        <NewVillas villas={newVillasData} />
        {/* <Testimonial testimonials={testimonials} /> */}
        <Blog blog={blogs} />
        <Comments
          className={"homeComment"}
          t={t}
          i18n={i18n}
          commentData={[
            {
              video: null,
              name: "Ahmet",
              surName: "YILMAZ",
              createdAt: "2024-09-01T12:20:45.1234567",
              rating: 3,
              commentText: "İyi, ama biraz daha geliştirilmesi gerek.",
            },
            {
              video: null,
              name: "Elif",
              surName: "ŞEN",
              createdAt: "2024-07-15T14:10:25.9876543",
              rating: 5,
              commentText: "Mükemmel bir deneyimdi!",
            },
            {
              video: null,
              name: "Burak",
              surName: "KARA",
              createdAt: "2024-11-25T16:55:10.5432109",
              rating: 4,
              commentText: "Gayet güzel, beğendim.",
            },
            {
              video: null,
              name: "Seda",
              surName: "ÇELİK",
              createdAt: "2024-08-30T19:25:30.1237894",
              rating: 1,
              commentText: "Hiç beğenmedim, çok kötü.",
            },
            {
              video: null,
              name: "Murat",
              surName: "KÖSE",
              createdAt: "2024-10-10T11:05:40.6789102",
              rating: 4,
              commentText:
                "İyi bir içerik, ancak biraz daha detaylı olabilirdi.",
            },
          ]}
        />
        <VillaRent />
      </section>
    </>
  );
}

export async function getServerSideProps(context) {
  // Get cookie
  let currenciesResponse;
  const cookies = nookies.get(context);

  if (!cookies.currencies) {
    const currenciesResponse = await getCurrencies();

    if (currenciesResponse.statusCode == 200) {
      // Set cookie
      nookies.set(
        context,
        "currencies",
        JSON.stringify(currenciesResponse.data),
        {
          maxAge: 1 * 24 * 60 * 60,
          path: "/",
        }
      );
    }
  }

  // API çağrılarını paralel olarak başlat
  const categories = await getCategories(context.locale);

  const [villa, aparts, activates, blogs, newVillasData] = await Promise.all([
    getVillasHome(8, 0, categories?.data[0]?.slug, context.locale),
    getHotels(0, 4, context.locale),
    getActivates(context.locale),
    getBlogs(context.locale),
    getAllVillaByCategorySlug(context.locale, "populer-villalar", 0, 8),
  ]);

  return {
    props: {
      villa,
      categories,
      blogs,
      aparts,
      activates,
      newVillasData,
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
}
