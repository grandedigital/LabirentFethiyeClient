import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import React, { useState } from "react";
import styles from "./page.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import Seo from "@/components/seo";
import { searchReservation } from "@/services/reservation";
import { timeStringToDate } from "@/utils/date";
import moment from "moment";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function RezervasyonTakip() {
  const { t } = useTranslation("common");
  const [step, setStep] = useState(0);
  const [villaCoverPhoto, setVillaCoverPhoto] = useState("");
  const [reservationDetail, setReservationDetail] = useState({
    checkIn: "",
    checkOut: "",
    reservationNumber: "",
  });
  const [ownerInfo, setOwnerInfo] = useState({
    email: "",
    phone: "",
    name: "",
    surname: "",
  });
  const [villaDetail, setVillaDetail] = useState({
    name: "",
    region: "",
    url: null,
  });

  //Sayfa açıldığında inputa kayması
  // useEffect(()=> {
  //   scrolltoHash("reservationNoArea")
  // }, [])

  function searchHandle(values) {
    searchReservation({ reservationNumber: values?.reservationNumber }).then(
      (res) => {
        if (res?.data != null) {
          setStep(1);
          res?.data?.reservationInfos?.map((reservationInfo) => {
            if (reservationInfo?.owner) {
              setOwnerInfo({
                email: reservationInfo?.email,
                phone: reservationInfo?.phone,
                name: reservationInfo?.name,
                surname: reservationInfo?.surname,
              });
            }
          });
          setVillaDetail({
            name: res?.data?.villa?.name,
            region: res?.data?.villa?.district + " / " + res?.data?.villa?.town,
            url: res?.data?.villa?.id,
          });
          setReservationDetail({
            checkIn: timeStringToDate(res?.data?.checkIn),
            checkOut: timeStringToDate(res?.data?.checkOut),
            reservationNumber: res?.data?.reservationNumber || 1223,
          });
          setVillaCoverPhoto(
            process.env.NEXT_PUBLIC_APIPHOTOS_URL +
              "k_" +
              res?.data?.villa?.photo
          );
        } else {
          alert("Rezervasyon numarası hatalı !");
        }
      }
    );
  }

  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye | Rezervasyon Takip"}
        pageDesc={"Labirent Feyhiye Rezervasyon Takip"}
      />
      <BreadCrumb link={"rezervasyon-takip"} />
      {step === 0 ? (
        <div className={styles.container}>
          <div className={styles.content}>
            <h1>
              {t("reservationTrackingSection")} - {t("customerLogin")}
            </h1>
            <div id="reservationNoArea" className={styles.formContent}>
              <Formik
                initialValues={{
                  reservationNumber: "",
                }}
                validationSchema={Yup.object({
                  reservationNumber: Yup.string().required(
                    "Bu alan boş bırakılamaz"
                  ),
                })}
                onSubmit={(values) => {
                  searchHandle(values);
                }}
              >
                {({
                  values,
                  errors,
                  handleChange,
                  handleSubmit,
                  handleReset,
                  dirty,
                  isSubmitting,
                  touched,
                  setFieldValue,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <ul>
                      <li>
                        <div className={styles.inputBox}>
                          <div className={styles.inputName}>
                            {t("reservationNumber")}
                          </div>
                          <input
                            autoFocus
                            name="reservationNumber"
                            value={values.reservationNumber}
                            onChange={handleChange}
                            type="text"
                            placeholder="43530537205723057"
                            minLength="2"
                            maxLength="30"
                          />
                          {errors.reservationNumber &&
                            touched.reservationNumber && (
                              <div className={styles.inputFeedback}>
                                {errors.reservationNumber}
                              </div>
                            )}
                        </div>
                      </li>
                    </ul>
                    <div className={styles.linkBox}>
                      <button type="submit" className={styles.blueButton2}>
                        <span>{t("login")}</span>
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.successMessage}>
              <div className={styles.iconBox} style={{ margin: 0 }}>
                <div
                  style={{ backgroundImage: `url(${villaCoverPhoto})` }}
                ></div>
              </div>
              <div className={styles.linkBox}>
                <Link
                  className={styles.blueButton2}
                  href={`/villalar/${villaDetail?.url}`}
                >
                  <span>{t("facilityDetails")}</span>
                </Link>
              </div>
              <div className={styles.textBox}>
                <div className={styles.title}>
                  {reservationDetail?.reservationNumber}{" "}
                  {t("numberedReservationInformation")}
                </div>
                <div className={styles.desc}>
                  {t("entryDate")} : {reservationDetail?.checkIn}
                </div>
                <div className={styles.desc}>
                  {t("releaseDate")} : {reservationDetail?.checkOut}
                </div>
                <div className={styles.desc}>
                  {t("nightLength")} :{" "}
                  {moment
                    .duration(
                      moment(reservationDetail?.checkOut, "YYYY-MM-DD").diff(
                        moment(reservationDetail?.checkIn, "YYYY-MM-DD")
                      )
                    )
                    .asDays()}
                </div>
                <div className={styles.desc}>
                  {t("facilityName")} : {villaDetail?.name}
                </div>
                <div className={styles.desc}>
                  {t("facilityArea")} : {villaDetail?.region}
                </div>
                <div className={styles.desc}>
                  {t("bookingOwner")} : {ownerInfo?.name} {ownerInfo?.surname}
                </div>
                <div className={styles.desc}>
                  {t("phoneNumber")} : {ownerInfo?.phone}
                </div>
                <div className={styles.desc}>
                  {t("eMail")} : {ownerInfo?.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}
