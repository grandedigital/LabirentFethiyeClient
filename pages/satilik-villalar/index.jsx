import Seo from "@/components/seo";
import { getVillasForSale } from "@/services/villa";
import VillaCard from "@/components/index/villa/card/villaCard";
import Pagination from "@/components/pagination/Pagination";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

export default function SalesList({ villasForSale, totalPage }) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const activePage = parseInt(router?.query?.p) || 1;
  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye | Satılık Villalar"}
        pageDesc={"Labirent Fethiye Satılık Villalar"}
      />
      <section className="listPage_contentDetail listPage_villasDetail">
        <div className="villas">
          <div className="listPage_container">
            <div className="box">
              <div className="top">
                <div className="titleBox">
                  <div className="title">{t("villasForSale")}</div>
                  <div className="subTitle">
                    {t("thereAreFacilities", { facilityCount: villasForSale?.pageInfo?.totalRow })}
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="row">
                  <ul>
                    {villasForSale?.data?.map((villa, index) => (
                      <VillaCard
                        salePage={true}
                        key={index}
                        data={villa}
                        photos={villa?.photos || []}
                      />
                    ))}
                  </ul>
                </div>
              </div>
              <Pagination
                newActivePage={activePage}
                pageCount={villasForSale?.pageInfo?.totalPage}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export async function getServerSideProps({ query, locale }) {
  const page = query?.p ? query?.p - 1 : 0;
  const villasForSale = await getVillasForSale(page);
  const totalPage = villasForSale?.totalCount || 0;
  return {
    props: {
      villasForSale,
      totalPage,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
