"use client";
import HeaderTop from "./top/top";
import HeaderBottom from "./bottom/bottom";
import styles from "./header.module.css";

import { usePathname } from "next/navigation";

export default function Header({ from }) {
  const pathname = usePathname();

  var stylesofDetailHeader = {
    position: "relative",
    backgroundColor: "#3E2093",
  };

  if (pathname != "/") {
    return (
      <header className={styles.header} style={stylesofDetailHeader}>
        <HeaderTop />
        <HeaderBottom from={from} />
      </header>
    );
  } else {
    return (
      <header className={styles.header}>
        <HeaderTop />
        <HeaderBottom />
      </header>
    );
  }
}
