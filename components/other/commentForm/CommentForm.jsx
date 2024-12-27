import styles from "./page.module.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Rating } from "react-simple-star-rating";
import { useRef } from "react";

export default function CommentForm({ t }) {
  const mailRef = useRef(null);

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
    <div className={styles.commentForm}>
      <div className={styles.title}>{t("weAreWaitingForYourComment")}</div>
      {/* <div className={styles.row}>
        <ul className={styles.commentUl}>
          <li className={styles.commentLi}>
            <div className={styles.textandRating}>
              <div className={styles.text}>Temizlik</div>
              <div className={`${styles["stars"]} ${styles["active"]}`}>
                <div className={styles.starItems} rating="5">
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={styles.commentLi}>
            <div className={styles.textandRating}>
              <div className={styles.text}>Doğruluk</div>
              <div className={`${styles["stars"]} ${styles["active"]}`}>
                <div className={styles.starItems} rating="5">
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={styles.commentLi}>
            <div className={styles.textandRating}>
              <div className={styles.text}>İletişim</div>
              <div className={`${styles["stars"]} ${styles["active"]}`}>
                <div className={styles.starItems} rating="5">
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={styles.commentLi}>
            <div className={styles.textandRating}>
              <div className={styles.text}>Konum</div>
              <div className={`${styles["stars"]} ${styles["active"]}`}>
                <div className={styles.starItems} rating="5">
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={styles.commentLi}>
            <div className={styles.textandRating}>
              <div className={styles.text}>Giriş</div>
              <div className={`${styles["stars"]} ${styles["active"]}`}>
                <div className={styles.starItems} rating="5">
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={styles.commentLi}>
            <div className={styles.textandRating}>
              <div className={styles.text}>Kalite/fiyat oranı</div>
              <div className={`${styles["stars"]} ${styles["active"]}`}>
                <div className={styles.starItems} rating="5">
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                  <div className={`${styles["starItem"]} ${styles["active"]}`}>
                    <div className={styles.star}></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div> */}
      <Formik
        initialValues={{
          form_email: "",
          form_name: "",
          form_surname: "",
          form_phone: "",
          form_message: "",
          form_rating: 0,
        }}
        validationSchema={Yup.object({
          form_email: Yup.string().required("Bu alan boş bırakılamaz"),
          form_name: Yup.string().required("Bu alan boş bırakılamaz"),
          form_surname: Yup.string().required("Bu alan boş bırakılamaz"),
          form_phone: Yup.string()
            .length(15, "Geçerli bir telefon numarası girin")
            .required("Bu alan boş bırakılamaz"),
          form_message: Yup.string().required("Bu alan boş bırakılamaz"),
          form_rating: Yup.number()
            .transform((value, originalValue) =>
              originalValue === "" ? null : value
            )
            .required("Puan verin")
            .min(0.5, "Lütfen puan verin"),
        })}
        onSubmit={async (values, { resetForm }) => {
          const response = await createComment(0, {
            ...values,
            id: villaId,
          });
          if (response.statusCode == 200) {
            alert("Yorum gönderildi");
            resetForm();
          }
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
          <form id={styles.commentForm} onSubmit={handleSubmit}>
            <ul>
              <li className={styles.full}>
                <div className={styles.inputBox}>
                  <div className={styles.inputName}>{t("yourComment")}</div>
                  <textarea
                    name="form_message"
                    rows="4"
                    cols="50"
                    placeholder="•••"
                    value={values.form_message}
                    onChange={handleChange}
                  ></textarea>
                  {errors.form_message && touched.form_message && (
                    <div className={styles.inputFeedback}>
                      {errors.form_message}
                    </div>
                  )}
                </div>
              </li>
              <li
                className={styles.full}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600 }}>
                  {t("yourScore")}
                </span>
                <Rating
                  size={30}
                  transition
                  onClick={(value) => {
                    setFieldValue("form_rating", value);
                  }}
                  allowFraction
                />
                {errors.form_rating && touched.form_rating && (
                  <div className={styles.inputFeedback}>
                    {errors.form_rating}
                  </div>
                )}
              </li>
              <li>
                <div className={styles.inputBox}>
                  <div className={styles.inputName}>{t("name")}</div>
                  <input
                    name="form_name"
                    value={values.form_name}
                    onChange={handleChange}
                    type="text"
                    className={styles.form_name}
                    placeholder="•••••"
                  />
                  {errors.form_name && touched.form_name && (
                    <div className={styles.inputFeedback}>
                      {errors.form_name}
                    </div>
                  )}
                </div>
              </li>
              <li>
                <div className={styles.inputBox}>
                  <div className={styles.inputName}>{t("surname")}</div>
                  <input
                    type="text"
                    className={styles.form_surname}
                    name="form_surname"
                    placeholder="•••••"
                    onChange={handleChange}
                    value={values.form_surname}
                  />
                  {errors.form_surname && touched.form_surname && (
                    <div className={styles.inputFeedback}>
                      {errors.form_surname}
                    </div>
                  )}
                </div>
              </li>
              <li>
                <div className={styles.inputBox}>
                  <div className={styles.inputName}>{t("yourPhoneNumber")}</div>
                  <input
                    type="text"
                    className={styles.form_phone}
                    name="form_phone"
                    placeholder="(•••) ••• •• ••"
                    inputMode="numeric"
                    onChange={(e) => {
                      setFieldValue("form_phone", phoneFormat(e.target.value));
                      if (e?.target?.value?.length >= 15) {
                        mailRef.current.focus();
                        return;
                      }
                    }}
                    value={values.form_phone}
                  />
                  {errors.form_phone && touched.form_phone && (
                    <div className={styles.inputFeedback}>
                      {errors.form_phone}
                    </div>
                  )}
                </div>
              </li>
              <li>
                <div className={styles.inputBox}>
                  <div className={styles.inputName}>
                    {t("yourEmailAddress")}
                  </div>
                  <input
                    ref={mailRef}
                    type="text"
                    className={styles.form_email}
                    name="form_email"
                    placeholder="•••••••••"
                    onChange={handleChange}
                    value={values.form_email}
                  />
                  {errors.form_email && touched.form_email && (
                    <div className={styles.inputFeedback}>
                      {errors.form_email}
                    </div>
                  )}
                </div>
              </li>
            </ul>
            <div className={styles.linkBox}>
              <button
                type={"submit"}
                className={`${styles["blueButtonArrow"]} ${styles["sendCommentForm"]}`}
              >
                <span>{t("sendComment")}</span>
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
