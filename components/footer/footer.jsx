import FooterTop from "./top/footerTop";
import FooterBottom from "./bottom/footerBottom";
import styles from "./footer.module.css";
import React from "react";

const Footer = ({ activates }) => {
  return (
    <footer className={styles.footer}>
      <FooterTop activates={activates} />
      <FooterBottom />
    </footer>
  );
};

export default React.memo(Footer);
