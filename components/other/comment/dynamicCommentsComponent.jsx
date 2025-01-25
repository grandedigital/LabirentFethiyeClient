import { useState, useEffect, useRef } from "react";
import CommentsSkeleton from "./commentsSkeleton";
import Comments from "./Comments";

const DynamicCommentsComponent = ({ t, villaSlug, i18n }) => {
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

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/Clients/GetAllCommentByVillaSlug?Slug=${villaSlug}`
      );
      const result = await response.json();
      //console.log(result);
      
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
        <CommentsSkeleton />
      ) : (
        <Comments commentData={data?.data} t={t} i18n={i18n} />
      )}
    </div>
  );
};

export default DynamicCommentsComponent;
