"use client";
import styles from "./priceTable.module.css";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getPriceTypeDetail } from "@/data/data";
import { moneyFormat, replaceLastDotWithComma } from "@/utils/globalUtils";
import { priceTypes } from "@/data/data";

export default function PriceTable({
  data,
  priceTypeNumber,
  currencies,
  t,
  selectedLanguage,
}) {
  const [priceTableActiveIndex, setPriceTableActiveIndex] = useState(
    priceTypes.find((item) => item.lang == selectedLanguage).type
  );

  useEffect(() => {
    setPriceTableActiveIndex(
      priceTypes.find((item) => item.lang == selectedLanguage).type
    );
  }, [selectedLanguage]);

  const handlePriceTable = (index) => {
    setPriceTableActiveIndex(index);
  };

  // exchange
  const currenciesData = [
    {
      priceTypeNumber: 1,
      value: 1,
    },
    {
      priceTypeNumber: 2,
      value: currencies?.usd,
    },
    {
      priceTypeNumber: 3,
      value: currencies?.eur,
    },
    {
      priceTypeNumber: 4,
      value: currencies?.gbp,
    },
  ];

  if (data?.length == 0) return null;

  const getPrice = (price) => {
    // Aktif kur değerini al
    const selectedCurrency = currenciesData.find(
      (item) => item.priceTypeNumber === priceTableActiveIndex
    )?.value;

    const baseCurrency = currenciesData.find(
      (item) => item.priceTypeNumber === priceTypeNumber
    )?.value;

    // Eğer seçilen kur TL değilse, fiyatı TL'ye dönüştürüp hedef kura çevir
    const convertedPrice = (price * baseCurrency) / selectedCurrency;

    return (
      moneyFormat(convertedPrice, false) +
      " " +
      getPriceTypeDetail(priceTableActiveIndex)?.text
    );
  };

  return (
    <div className={styles.priceTable}>
      <div className={styles.top}>
        <div className={styles.title}>{t("priceTable")}</div>
        <div className={styles.exchangeRateMenu}>
          <ul>
            <li
              onClick={() => handlePriceTable(1)}
              className={`${
                priceTableActiveIndex == 1 ? styles["active"] : ""
              }`}
            >
              <Link onClick={(e) => e.preventDefault()} href="#">
                TL
              </Link>
            </li>
            <li
              onClick={() => handlePriceTable(2)}
              className={`${
                priceTableActiveIndex == 2 ? styles["active"] : ""
              }`}
            >
              <Link onClick={(e) => e.preventDefault()} href="#">
                DOLAR
              </Link>
            </li>
            <li
              onClick={() => handlePriceTable(3)}
              className={`${
                priceTableActiveIndex == 3 ? styles["active"] : ""
              }`}
            >
              <Link onClick={(e) => e.preventDefault()} href="#">
                EURO
              </Link>
            </li>
            <li
              onClick={() => handlePriceTable(4)}
              className={`${
                priceTableActiveIndex == 4 ? styles["active"] : ""
              }`}
            >
              <Link onClick={(e) => e.preventDefault()} href="#">
                POUND
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <ul>
          {data?.map((data, index) => (
            <li key={index}>
              <div className={styles.box}>
                <div className={styles.leftBox}>
                  <div className={styles.imageBox}>
                    <i className={styles.cloud_icon}></i>
                  </div>
                </div>
                <div className={styles.rightBox}>
                  <div className={styles.name}>
                    {data?.title}
                  </div>
                  <div className={styles.desc}>
                    {data?.description}
                  </div>
                  <div className={styles.price}>
                    {getPrice(data?.price)}
                    {/* {priceTableActiveIndex === 2
                      ? (data?.price).toFixed(2) +
                        " " +
                        getPriceTypeDetail(2)?.text
                      : priceTableActiveIndex === 3
                      ? (data?.price).toFixed(2) +
                        " " +
                        getPriceTypeDetail(3)?.text
                      : priceTableActiveIndex === 4
                      ? (data?.price).toFixed(2) +
                        " " +
                        getPriceTypeDetail(4)?.text
                      : data?.price.toFixed(2) +
                        " " +
                        getPriceTypeDetail(1)?.text} */}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className={styles.notice}>{t("pricesMayVaryOnSpecialDays")}</p>
      </div>
    </div>
  );
}
