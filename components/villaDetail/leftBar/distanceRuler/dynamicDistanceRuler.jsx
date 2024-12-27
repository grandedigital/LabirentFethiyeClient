import { useState, useEffect, useRef } from "react";
import DistanceRulerSkeleton from "./distanceRulerSkeleton";
import DistanceRuler from "./distanceRuler";

const DynamicDistanceRulerComponent = ({ t, villaSlug, roomSlug }) => {
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
      return "GetAllDistanceRulerByHotelSlug";
    } else if (villaSlug) {
      return "GetAllDistanceRulerByVillaSlug";
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
    <div
      ref={ref}
      style={{
        minHeight: "200px",
        display: data?.data?.length == 0 ? "none" : "block",
      }}
    >
      {isLoading ? (
        <DistanceRulerSkeleton />
      ) : (
        <DistanceRuler data={data} t={t} />
      )}
    </div>
  );
};

export default DynamicDistanceRulerComponent;
