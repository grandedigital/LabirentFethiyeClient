import RegionCard from "@/components/index/region/card/regionCard";
import Seo from "@/components/seo";
import { getRegions } from "@/services/region";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

export default function index({ regions }) {
  const { t } = useTranslation("common");
  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye | Bölgeler"}
        pageDesc={"Labirent Fethiye Bölgeler"}
      />
      <section className="listPage_contentDetail listPage_villasDetail">
        <div className="villas">
          <div className="listPage_container">
            <div className="box">
              <div className="top">
                <div className="titleBox">
                  <div className="title">{t("regions")}</div>
                  <div className="subTitle">
                    {t("regionsListed", { regionCount: regions?.data?.length })}
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="row">
                  <ul>
                    {regions.data.map((region, index) => (
                      <RegionCard key={index} data={region} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export async function getServerSideProps({ locale }) {
  const regions = await getRegions(locale);
  return {
    props: { regions, ...(await serverSideTranslations(locale, ["common"])) },
  };
}
