import styles from "./bottomMenu.module.css";
import Image from "next/image";
import { scrolltoHash, capitalizeWords } from "@/utils/globalUtils";
import { useEffect, useState } from "react";
import { getVillasByName } from "@/services/villa";
import { useRouter } from "next/navigation";
import ModalComponent from "../other/modalComponent";

export default function Page({ t }) {
  const router = useRouter();
  const [filterVillas, setFilterVillas] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (filterText.length >= 3) {
        getVillasByName({ villaSearchText: filterText }).then((res) => {
          setFilterVillas(res.data);
        });
      }
    }, 300); // 300 ms debounce süresi

    // Önceki zamanlayıcıyı temizle
    return () => clearTimeout(handler);
  }, [filterText]);

  const navigateVilla = (slug) => {
    router.push(`/villalar/${slug}`);
    document.body.style.overflow = "";
    closeModal();
    setFilterText("");
    setFilterVillas([]);
  };

  return (
    <>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={closeModal}
        height="50vh"
        title="Tesis Ara"
      >
        <div
          className={styles.mobilSearchModal}
          style={{ display: isModalOpen ? "block" : "none" }}
        >
          <div className={styles.searchInputContainer}>
            <input
              autoFocus
              value={filterText}
              className={styles.searchInput}
              type="text"
              placeholder="Tesis Ara"
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <div className={styles.searchListContainer}>
            <div className={styles.searchListItems}>
              {filterText.length >= 3 &&
                filterVillas?.map((item) => (
                  <div
                    onClick={() => navigateVilla(item?.slug)}
                    className={styles.villaItem}
                  >
                    {item?.name}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </ModalComponent>
      <div className={styles.makeAReservation}>
        <div style={{ height: 70, display: "flex", width: "100%"}}>
          <div className={styles.section1}>
            <div
              onClick={() => router.push("/")}
              className={styles.iconAndText}
              style={{marginLeft: 10}}
            >
              <Image
                src="/images/bottomHome.png"
                alt="bottomHomeIcon"
                width={22}
                height={22}
              />
              <Image
                src="/images/bottomHomeHover.png"
                alt="bottomHomeHoverIcon"
                width={22}
                height={22}
                className={styles.hoverIcon}
              />
              <span className={styles.iconText}>
                {capitalizeWords(t("headerHomePage"))}
              </span>
            </div>
            <div onClick={openModal} className={styles.iconAndText}>
              <Image
                src="/images/bottomSearch.png"
                alt="bottomSearchIcon"
                width={22}
                height={22}
              />
              <Image
                src="/images/bottomSearchHover.png"
                alt="bottomSearchHoverIcon"
                width={22}
                height={22}
                className={styles.hoverIcon}
              />
              <span className={styles.iconText}>
                {t("searchForaFacilityForBottomMenu")}
              </span>
            </div>
          </div>
          <div className={styles.section2}>
            <div
              onClick={() => scrolltoHash("makeReservation")}
              className={styles.reservationIcon}
            >
              <div className={styles.reservationIconSubContainer}>
                <div className={styles.iconAndText}>
                  <Image
                    src="/images/bottomCalendar.png"
                    alt="bottomCalendar"
                    width={26}
                    height={26}
                  />
                  {/* <span
                className={styles.iconText}
                style={{ color: "#fff", fontSize: "12px", marginTop: 3 }}
              >
                {t("resevation")}
              </span> */}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.section3}>
            <div
              onClick={() =>
                window.open(
                  `https://wa.me/${t(
                    "whatsappNumber"
                  )}/?text=Merhaba, yardımcı olur musunuz ?`,
                  "_blank"
                )
              }
              className={styles.iconAndText}
            >
              <Image
                src="/images/bottomWhatsapp.png"
                alt="bottomWhatsappIcon"
                width={22}
                height={22}
              />
              <Image
                src="/images/bottomWhatsappHover.png"
                alt="bottomWhatsappHoverIcon"
                width={22}
                height={22}
                className={styles.hoverIcon}
              />
              <span className={styles.iconText}>Whatsapp</span>
            </div>
            <div
              onClick={() => window.open(`tel:${t("callNumber")}`, "_blank")}
              className={styles.iconAndText}
              style={{marginRight: 10}}
            >
              <Image
                src="/images/bottomCall.png"
                alt="bottomCallIcon"
                width={22}
                height={22}
              />
              <Image
                src="/images/bottomCallHover.png"
                alt="bottomCallIconHoverIcon"
                width={22}
                height={22}
                className={styles.hoverIcon}
              />
              <span className={styles.iconText}>{t("call")}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
