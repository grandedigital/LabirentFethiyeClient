import VillaCard from "@/components/index/villa/card/villaCard";
import Seo from "@/components/seo";
import { getHotels } from "@/services/villa";
import Pagination from "@/components/pagination/Pagination";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { capitalizeWords } from "@/utils/globalUtils";
import FilterDropdown from "@/components/customDropdown/filterDropdown";

export default function List({ hotels }) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const activePage = parseInt(router?.query?.p) || 1;

  return (
    <>
      <Seo
        pageTitle={"Kiralık Apartlar | Labirent Fethiye"}
        pageDesc={"Labirent Fethiye Kiralık Apartlar"}
      />
      <section className="listPage_contentDetail listPage_villasDetail">
        <div className="villas">
          <div className="listPage_container">
            <div className="box">
              <div className="top">
                <div className="titleBox">
                  <div className="title">
                    {capitalizeWords(t("headerApartmentsForRent"))}
                  </div>
                  <div className="facilityListTitleAndDropdownContainer">
                    <div className="subTitle">
                      {t("thereAreFacilities", {
                        facilityCount: hotels?.pageInfo?.totalRow,
                      })}
                    </div>
                    {/* <div className="dropdownsContainer">
                      <FilterDropdown
                        customClassName="filter1"
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
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="bottom">
                <div className="row">
                  <ul>
                    {hotels?.data.map((hotel, index) => (
                      <VillaCard
                        listPage={true}
                        key={index}
                        data={hotel}
                        photos={hotel?.photos}
                        from={"hotels"}
                      />
                    ))}
                  </ul>
                </div>
              </div>
              <Pagination
                newActivePage={activePage}
                pageCount={Math.ceil(hotels?.pageInfo?.totalRow / 20)}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps({ query, locale }) {
  const hotels = await getHotels(query?.p ? query?.p - 1 : 0, 20, locale);
  return {
    props: { hotels, ...(await serverSideTranslations(locale, ["common"])) },
  };
}
