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
        height="40vh"
        title="Tesis Ara"
      >
        <div
          className={styles.mobilSearchModal}
          style={{ display: isModalOpen ? "block" : "none" }}
        >
          <div className={styles.searchInputContainer}>
            <input
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
        <div className={styles.section1}>
          <div onClick={() => router.push("/")} className={styles.iconAndText}>
            <Image
              src="/images/bottomHome.png"
              alt="bottomHomeIcon"
              width={30}
              height={30}
            />
            <span className={styles.iconText}>
              {capitalizeWords(t("headerHomePage"))}
            </span>
          </div>
          <div onClick={openModal} className={styles.iconAndText}>
            <Image
              src="/images/bottomSearch.png"
              alt="bottomSearchIcon"
              width={30}
              height={30}
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
            <div className={styles.iconAndText}>
              <Image
                src="/images/bottomCalendar.png"
                alt="bottomCalendar"
                width={35}
                height={35}
                style={{ marginBottom: 5 }}
              />
              <span
                className={styles.iconText}
                style={{ color: "#fff", fontSize: "12px" }}
              >
                {t("resevation")}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.section3}>
          <div
            onClick={() =>
              window.open(
                "https://wa.me/+905378800703/?text=Merhaba, yardımcı olur musunuz ?",
                "_blank"
              )
            }
            className={styles.iconAndText}
          >
            <Image
              src="/images/bottomWhatsapp.png"
              alt="bottomWhatsappIcon"
              width={30}
              height={30}
            />
            <span className={styles.iconText}>Whatsapp</span>
          </div>
          <div
            onClick={() => window.open("tel:+902526166648", "_blank")}
            className={styles.iconAndText}
          >
            <Image
              src="/images/bottomCall.png"
              alt="bottomCallIcon"
              width={30}
              height={30}
            />
            <span className={styles.iconText}>{t("call")}</span>
          </div>
        </div>
      </div>
    </>
  );
}
