import Link from "next/link";
import styles from "./page.module.css";
import Image from "next/image";
import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import emailjs from "@emailjs/browser";
import Seo from "@/components/seo";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { capitalizeWords } from "@/utils/globalUtils";

export default function Iletisim() {
  const { t } = useTranslation("common");
  const [captchaIsDone, setCaptchaIsDone] = useState(false);
  const [isMailSended, setMailSended] = useState(false);
  const [isMailSending, setMailSending] = useState(false);
  const [isMailSendError, setMailSendError] = useState(false);

  const ContactFormSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, t("pleaseEnterALongerName"))
      .max(30, t("pleaseEnterAShorterName"))
      .required(t("pleaseEnterName")),
    surname: Yup.string()
      .min(3, t("pleaseEnterALongerSurname"))
      .max(30, t("pleaseEnterAShorterSurname"))
      .required(t("plaseEnterSurname")),
    phone: Yup.string()
      .min(15, t("pleaseEnterAValidPhoneNumber"))
      .max(15, t("pleaseEnterAValidPhoneNumber"))
      .required(t("pleaseEnterPhoneNumber")),
    message: Yup.string().required(t("pleaseEnterYourMessage")),
  });

  function onChange() {
    setCaptchaIsDone(true);
  }

  const phoneFormat = (string) => {
    // Rakam dışındaki karakterleri temizle
    let cleaned = ("" + string).replace(/\D/g, "").replace(/^0+/, "");

    // Format: (•••) ••• •• ••
    let formattedNumber = "";

    if (cleaned.length > 0) {
      formattedNumber += "(" + cleaned.substring(0, 3);
    }

    if (cleaned.length >= 4) {
      formattedNumber += ") " + cleaned.substring(3, 6);
    }

    if (cleaned.length >= 7) {
      formattedNumber += " " + cleaned.substring(6, 8);
    }

    if (cleaned.length >= 9) {
      formattedNumber += " " + cleaned.substring(8, 10);
    }

    return formattedNumber;
  };

  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye | İletişim"}
        pageDesc={"Labirent Fethiye İletişim"}
      />
      <BreadCrumb link="contact" />
      <section className={`${styles["contentDetail"]} ${styles["contact"]}`}>
        <div className={styles.titleBox}>
          <div className={styles.container}>
            <h1 className={styles.title}>
              {capitalizeWords(t("headerContact"))}
            </h1>
          </div>
        </div>
        <div className={styles.infoBox}>
          <div className={styles.container}>
            <ul className={styles.box}>
              <li className={styles.item}>
                <div className={styles.imageBox}>
                  <i className={styles.address}></i>
                </div>
                <div className={styles.nameBox}>{t("address")}</div>
                <div className={styles.descBox}>
                  Ölüdeniz, Atatürk Cd. No:83, 48300 Fethiye/Muğla
                </div>
                <div className={styles.mapLinkBox}>
                  <Link
                    target="_blank"
                    href="https://www.google.com/maps?ll=36.575887,29.150176&z=19&t=m&hl=tr&gl=TR&mapclient=embed&cid=1633145916469788623"
                  >
                    {t("viewOnMap")}
                  </Link>
                </div>
              </li>
              <li className={styles.item}>
                <div className={styles.imageBox}>
                  <i className={styles.phone}></i>
                </div>
                <div className={styles.nameBox}>{t("contactUs")}</div>
                <div className={styles.descBox}>
                  +90 252 616 66 48
                  <br />
                  info@labirentfethiye.com
                </div>
              </li>
              <li className={styles.item}>
                <div className={styles.imageBox}>
                  <i className={styles.clock}></i>
                </div>
                <div className={styles.nameBox}>{t("ourWorkingHours")}</div>
                <div className={styles.descBox}>
                  Pzt - Cum: 09:00 - 18:00
                  <br />
                  Cmt - Pz: 09:00 - 18:00
                </div>
              </li>
              <li className={styles.item}>
                <div className={styles.imageBox}>
                  <i className={styles.like}></i>
                </div>
                <div className={styles.nameBox}>{t("followUs")}</div>
                <div className={styles.socialMedia}>
                  <ul>
                    <li>
                      {/* <a href="https://www.facebook.com/Labirentfethiye/" target="_blank" className={styles.facebook}><i></i></a> */}
                    </li>
                    <li>
                      {/* <a href="https://www.youtube.com/channel/UCHSwoqGIPpT6rqP2fsA9TwA" target="_blank" className={styles.youtube}><i></i></a> */}
                    </li>
                    <li>
                      {/* <a href="https://www.instagram.com/labirentfethiye/" target="_blank" className={styles.instagram}><i></i></a> */}
                    </li>
                    <li>
                      {/* <a href="https://g.page/labirentfethiye?share" target="_blank" className={styles.google}><i></i></a> */}
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.mapBox}>
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d952.5870093077987!2d29.150164384399808!3d36.57561502461795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c043f1e85cb76b%3A0x16aa198ee98fbfcf!2sLabirent%20Fethiye!5e0!3m2!1str!2str!4v1646905878663!5m2!1str!2str"
              allowFullScreen
              loading="lazy"
              style={{ border: 0, width: "100%", height: 700 }}
            ></iframe>
          </div>
          <div className={styles.contactFormBox}>
            <div className={styles.container}>
              <div className={styles.contactForm}>
                <div className={styles.formTitleBox}>{t("sendMessage")}</div>

                <Formik
                  initialValues={{
                    name: "",
                    surname: "",
                    phone: "",
                    email: "",
                    message: "",
                  }}
                  validationSchema={ContactFormSchema}
                  onSubmit={(values, actions) => {
                    if (captchaIsDone) {
                      setMailSending(true);
                      const templateParams = {
                        message: values.message,
                        from_name: values.name,
                        from_surname: values.surname,
                        to_email: "bbarisguness@gmail.com", //mailin gideceği adress
                        from_email: values.email,
                        phone: values.phone,
                      };
                      emailjs
                        .send(
                          "service_hoy1hhc",
                          "template_sq5bi78",
                          templateParams,
                          "kmsc6KUwfTD0e3ajH"
                        )
                        .then(
                          (response) => {
                            //console.log("SUCCESS!", response.status, response.text);
                            setMailSended(true);
                            setMailSending(false);
                          },
                          (err) => {
                            console.log("FAILED...", err);
                            setMailSending(false);
                            setMailSendError(true);
                          }
                        );
                    } else {
                      alert("Lütfen robot olmadığınızı kanıtlayın");
                    }

                    //showContactFormSuccesMessage()
                    //actions.resetForm();
                    //document.getElementsByName("firstName")[0].blur();
                    //router.push("/congratulation");
                  }}
                >
                  {({ errors, touched, values, setFieldValue }) => (
                    <Form id={styles.contactForm}>
                      <ul>
                        <li>
                          <div className={styles.inputBox}>
                            <div className={styles.inputName}>{t("name")}</div>
                            <Field
                              autoComplete="off"
                              name="name"
                              type="text"
                              id="form_name"
                              placeholder="•••••"
                            />
                            {errors.name && touched.name ? (
                              <label className={styles.error}>
                                {errors.name}
                              </label>
                            ) : null}
                          </div>
                        </li>

                        <li>
                          <div className={styles.inputBox}>
                            <div className={styles.inputName}>
                              {t("surname")}
                            </div>
                            <Field
                              autoComplete="off"
                              name="surname"
                              type="text"
                              id="form_surname"
                              placeholder="•••••"
                            />
                            {errors.surname && touched.surname ? (
                              <label className={styles.error}>
                                {errors.surname}
                              </label>
                            ) : null}
                          </div>
                        </li>

                        <li>
                          <div className={styles.inputBox}>
                            <div className={styles.inputName}>
                              {t("yourPhoneNumber")}
                            </div>
                            <Field
                              autoComplete="off"
                              onChange={(e) =>
                                setFieldValue(
                                  "phone",
                                  phoneFormat(e.target.value)
                                )
                              }
                              name="phone"
                              type="text"
                              id="form_phone"
                              placeholder="(•••) ••• •• ••"
                            />
                            {errors.phone && touched.phone ? (
                              <label className={styles.error}>
                                {errors.phone}
                              </label>
                            ) : null}
                          </div>
                        </li>

                        <li>
                          <div className={styles.inputBox}>
                            <div className={styles.inputName}>
                              {t("yourEmailAddress")}
                            </div>
                            <Field
                              autoComplete="off"
                              name="email"
                              type="text"
                              id="form_email"
                              placeholder="•••••••••"
                            />
                          </div>
                        </li>

                        <li className={styles.full}>
                          <div className={styles.inputBox}>
                            <div className={styles.inputName}>
                              {t("yourMessage")}
                            </div>
                            <Field
                              autoComplete="off"
                              as="textarea"
                              row="4"
                              cols="50"
                              name="message"
                              id="form_message"
                              placeholder="•••"
                            />
                            {errors.message && touched.message ? (
                              <label className={styles.error}>
                                {errors.message}
                              </label>
                            ) : null}
                          </div>
                        </li>
                        <li className={styles.full}>
                          <div className={styles.inputBox}>
                            <ReCAPTCHA
                              sitekey="6LcAW8MpAAAAAKYC7E-Ozne_W61-fmMVlyDvgXmG"
                              onChange={onChange}
                              onExpired={() => setCaptchaIsDone(false)}
                            />
                          </div>
                        </li>
                      </ul>

                      {!isMailSending && (
                        <div className={`${styles["linkBox"]}`}>
                          <button
                            type="submit"
                            className={styles.blueButtonArrow}
                          >
                            <span>{t("sendMessage")}</span>
                          </button>
                        </div>
                      )}
                    </Form>
                  )}
                </Formik>

                <div
                  className={`${styles["mask"]} ${
                    isMailSended && styles["active"]
                  }`}
                >
                  <div className={styles.iconBox}>
                    <Image
                      src="/images/success.png"
                      alt="Succes"
                      width={102}
                      height={101}
                    />
                  </div>
                  <div className={styles.title}>{t("thanks")}!</div>
                  <div className={styles.desc}>
                    {t("contactSendResponseMessage")}
                  </div>
                </div>
                <div
                  className={`${styles["mask"]} ${
                    isMailSendError && styles["active"]
                  }`}
                >
                  <div className={styles.iconBox}>
                    <Image
                      src="/images/error.png"
                      alt="Error"
                      width={102}
                      height={101}
                    />
                  </div>
                  <div className={styles.title}>{t("contactError")}</div>
                  <div className={styles.desc}>{t("contactErrorMessage")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}
