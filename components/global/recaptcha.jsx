import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";

export default function Recaptcha({ style = {}, setCaptchaIsDone }) {
  const { i18n } = useTranslation();
  const [recaptchaKey, setRecaptchaKey] = useState(0);

  function onChange() {
    setCaptchaIsDone(true);
  }

  useEffect(() => {
    setRecaptchaKey((prevKey) => prevKey + 1);
  }, [i18n.language]);

  return (
    <ReCAPTCHA
      key={recaptchaKey}
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHAKEY}
      onChange={onChange}
      onExpired={() => setCaptchaIsDone(false)}
      hl={i18n.language}
      style={style}
    />
  );
}
