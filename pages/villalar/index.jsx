import dynamic from "next/dynamic";
import Seo from "@/components/seo";
import { getVillas } from "@/services/villa";
import Pagination from "@/components/pagination/Pagination";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { capitalizeWords } from "@/utils/globalUtils";
import nookies from "nookies";
import { getCurrencies } from "@/services";
import FilterDropdown from "@/components/customDropdown/filterDropdown";

const VillaCard = dynamic(
  () => import("../../components/index/villa/card/villaCard"),
  {
    ssr: true, // SSR olmadan yüklenmesi yeterli
  }
);

export default function List({ villas }) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const activePage = parseInt(router?.query?.p) || 1;

  return (
    <>
      <Seo
        pageTitle={"Kiralık Villalar | Labirent Fethiye"}
        pageDesc={"Labirent Fethiye Kiralık Villalar"}
      />
      <section className="listPage_contentDetail listPage_villasDetail">
        <div className="villas">
          <div className="listPage_container">
            <div className="box">
              <div className="top">
                <div className="titleBox">
                  <div className="title">
                    {capitalizeWords(t("headerVillasForRent"))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="subTitle">
                      {t("thereAreFacilities", {
                        facilityCount: villas?.pageInfo?.totalRow,
                      })}
                    </div>
                    <div style={{display: "flex", gap: 10}}>
                      <FilterDropdown
                        label="Villa Özellikleri"
                        options={[
                          { id: 1, option: "Merhaba" },
                          { id: 2, option: "Selam" },
                          { id: 3, option: "Nasılsın" },
                        ]}
                      />
                      <FilterDropdown
                        label="Sıralama şeklini seçiniz"
                        width={220}
                        options={[
                          { id: 1, option: "Merhaba" },
                          { id: 2, option: "Selam" },
                          { id: 3, option: "Nasılsın" },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="row">
                  <ul>
                    {villas?.data.map((villa, index) => (
                      <VillaCard
                        listPage={true}
                        key={index}
                        data={villa}
                        photos={villa?.photos}
                      />
                    ))}
                  </ul>
                </div>
              </div>
              <Pagination
                //setNewActivePage={setNewActivePage}
                newActivePage={activePage}
                pageCount={Math.ceil(villas?.pageInfo?.totalRow / 20)}
              />
            </div>
          </div>
        </div>
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

  const villas = await getVillas(context.query?.p ? context.query?.p - 1 : 0);
  return {
    props: {
      villas,
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
}
