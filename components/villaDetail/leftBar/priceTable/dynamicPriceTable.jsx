import { useState, useEffect, useRef } from "react";
import PriceTableSkeleton from "./PriceTableSkeleton";
import PriceTable from "./priceTable";

const DynamicPriceTableComponent = ({
  villaSlug,
  roomSlug,
  t,
  priceTypeNumber,
  currencies,
  selectedLanguage,
}) => {
  const [data, setData] = useState(null); // Veriyi tutar
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumu
  const ref = useRef(null); // Intersection Observer için ref

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Bileşen göründüğünde veriyi çek
          fetchData();
          observer.disconnect(); // Tekrar tekrar tetiklenmesini önler
        }
      },
      { threshold: 0.1 } // Bileşenin %50'si görünür olduğunda tetiklenir
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  const apiName = () => {
    if (roomSlug) {
      return "GetAllPriceTableByRoomSlug";
    } else if (villaSlug) {
      return "GetAllPriceTableByVillaSlug";
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Clients/${apiName()}?Slug=${
          villaSlug || roomSlug
        }&Language=tr`
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={ref} style={{ minHeight: "200px", display: data?.data?.length == 0 ? "none" : "block" }}>
      {isLoading ? (
        <PriceTableSkeleton />
      ) : (
        <PriceTable
          t={t}
          data={data?.data}
          priceTypeNumber={priceTypeNumber}
          currencies={currencies}
          selectedLanguage={selectedLanguage}
        />
      )}
    </div>
  );
};

export default DynamicPriceTableComponent;
