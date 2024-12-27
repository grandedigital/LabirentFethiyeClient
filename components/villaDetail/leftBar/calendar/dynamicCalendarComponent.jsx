import { useState, useEffect, useRef } from "react";
import CalendarSkeleton from "./calendarSkeleton";
import Calendar from "./calendar";
import styles from "./dynamicCalendar.module.css";

const DynamicCalendarComponent = ({
  t,
  ready,
  priceTypeText,
  priceType,
  villaSlug,
  roomSlug,
  selectedLanguage,
}) => {
  const [calendarReservations, setCalendarReservationsData] = useState(null);
  const [calendarPrices, setCalendarPrices] = useState(null);
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

  const getReservationCalendarApiName = () => {
    if (villaSlug) {
      return "GetReservationCalendarByVillaSlug";
    } else if (roomSlug) {
      return "GetReservationCalendarByRoomSlug";
    }
  };

  const getReservationPriceApiName = () => {
    if (villaSlug) {
      return "GetAllPriceDateByVillaSlug";
    } else if (roomSlug) {
      return "GetAllPriceDateByRoomSlug";
    }
  };

  const fetchData = async () => {
    try {
      const [reservationResponse, pricesResponse] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/Clients/${getReservationCalendarApiName()}?Slug=${
            villaSlug || roomSlug
          }&Language=${selectedLanguage}`
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/Clients/${getReservationPriceApiName()}?Slug=${
            villaSlug || roomSlug
          }`
        ),
      ]);

      const [reservationsResult, pricesResult] = await Promise.all([
        reservationResponse.json(),
        pricesResponse.json(),
      ]);
      
      setCalendarReservationsData(reservationsResult);
      setCalendarPrices(pricesResult);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={ref} className={styles.dynamicCalendarGlobalContainer}>
      {isLoading ? (
        <CalendarSkeleton />
      ) : (
        <Calendar
          t={t}
          ready={ready}
          dates={calendarReservations?.data || []}
          calendarPrices={calendarPrices?.data || []}
          priceTypeText={priceTypeText}
          priceType={priceType}
        />
      )}
    </div>
  );
};

export default DynamicCalendarComponent;
