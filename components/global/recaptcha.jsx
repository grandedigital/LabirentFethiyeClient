import ReCAPTCHA from "react-google-recaptcha";

export default function Recaptcha({ style = {}, setCaptchaIsDone }) {
  function onChange() {
    setCaptchaIsDone(true);
  }

  return (
    <ReCAPTCHA
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHAKEY}
      onChange={onChange}
      onExpired={() => setCaptchaIsDone(false)}
      style={style}
    />
  );
}
