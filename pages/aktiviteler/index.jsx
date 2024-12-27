import { default as ActivateCard } from "@/components/index/region/card/regionCard";
import Seo from "@/components/seo";
import { getActivates } from "@/services/activite";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

export default function index({ activates }) {
  const { t } = useTranslation("common");
  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye | Aktiviteler"}
        pageDesc={"Labirent Fethiye Aktiviteler"}
      />
      <section className="listPage_contentDetail listPage_villasDetail">
        <div className="villas">
          <div className="listPage_container">
            <div className="box">
              <div className="top">
                <div className="titleBox">
                  <div className="title">{t("activites")}</div>
                  <div className="subTitle">
                    {t("activitesListed", {
                      activiteCount: activates?.data?.length,
                    })}
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="row">
                  <ul>
                    {activates.data.map((activate, index) => (
                      <ActivateCard key={index} data={activate} />
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
  const activates = await getActivates(locale);
  return {
    props: { activates, ...(await serverSideTranslations(locale, ["common"])) },
  };
}
