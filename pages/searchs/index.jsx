import { getVillasByFilter } from "@/services/villa";
import VillaCard from "@/components/index/villa/card/villaCard";
import Seo from "@/components/seo";
import Pagination from "@/components/pagination/Pagination";
import { useRouter } from "next/router";
import moment from "moment";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import FilterDropdown from "@/components/customDropdown/filterDropdown";

export default function Searchs({
  getFilterVillas,
  totalPage,
  checkIn,
  checkOut,
}) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const activePage = parseInt(router?.query?.p) || 1;
  const startDate = moment(router?.query?.from, "DD-MM-YYYY");
  const endDate = moment(router?.query?.to, "DD-MM-YYYY");
  const nightLength =
    moment.duration(endDate.diff(startDate)).asDays() || undefined;

  return (
    <>
      <Seo
        pageTitle={"Arama Sonuçları | Labirent Fethiye"}
        pageDesc={"Labirent Fethiye Arama Sonuçları"}
      />
      <section className="listPage_contentDetail listPage_villasDetail">
        <div className="villas">
          <div className="listPage_container">
            <div className="box">
              <div className="top">
                <div className="titleBox">
                  <div className="title">{t("searchResults")}</div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="subTitle">
                      {t("thereAreFacilities", {
                        facilityCount: getFilterVillas?.pageInfo?.totalRow,
                      })}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
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
                    {getFilterVillas?.data?.map((villa, index) => (
                      <VillaCard
                        nightLength={nightLength}
                        priceType={villa?.priceType}
                        checkIn={checkIn}
                        checkOut={checkOut}
                        from={"search"}
                        key={index}
                        data={villa}
                        photos={villa?.photos}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination newActivePage={activePage} pageCount={totalPage} />
      </section>
    </>
  );
}

export async function getServerSideProps({ query, locale }) {
  const name = query?.name || "";
  const checkIn = query?.from || "";
  const checkOut = query?.to || "";
  const person = query?.person || "0";

  const sliceCheckInDate = checkIn.split("-");
  const sliceCheckOutDate = checkOut.split("-");

  const checkInFormat = `${sliceCheckInDate[2]}-${
    parseInt(sliceCheckInDate[1]) >= 10
      ? sliceCheckInDate[1]
      : 0 + sliceCheckInDate[1]
  }-${sliceCheckInDate[0]}`;
  const checkOutFormat = `${sliceCheckOutDate[2]}-${
    parseInt(sliceCheckOutDate[1]) >= 10
      ? sliceCheckOutDate[1]
      : 0 + sliceCheckOutDate[1]
  }-${sliceCheckOutDate[0]}`;

  const getFilterVillas = await getVillasByFilter({
    checkIn: checkIn != "" ? checkInFormat : "",
    checkOut: checkOut != "" ? checkOutFormat : "",
    villaSearchText: name,
    person: person,
    size: 20,
    page: parseInt(query?.p - 1) || 0,
  });

  const totalPage = getFilterVillas?.pageInfo?.totalPage || 0;

  return {
    props: {
      getFilterVillas,
      name,
      person,
      totalPage,
      checkIn: checkIn != "" ? checkInFormat : null,
      checkOut: checkOut != "" ? checkOutFormat : null,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
