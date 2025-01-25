"use client";
import VillaCard from "../villa/card/villaCard";
import styles from "./newest.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function NewVillas({ villas }) {
  const [isCarouselMoving, setCarouselMoving] = useState(false);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1199 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1199, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 767 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
    },
  };

  const { t } = useTranslation("common");
  const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    return (
      <div className={styles.carouselButtonGroup}>
        <div
          className={`${styles["arrowButton"]} ${styles["prev"]}`}
          onClick={() => previous()}
        ></div>
        <div
          className={`${styles["arrowButton"]} ${styles["next"]}`}
          onClick={() => next()}
        ></div>
      </div>
    );
  };

  if (villas?.data?.length > 0) {
    return (
      <div className={styles.newVillas}>
        <div className={styles.container}>
          <div className={styles.box}>
            <div className={`${styles.titleBox} ${styles.white}`}>
              <div className={styles.title}>{t("populerVillas")}</div>
              <div className={styles.subTitle}>{t("ourVillasText")}.</div>
            </div>
            <div className={styles.top}>
              <Carousel
                beforeChange={() => setCarouselMoving(true)}
                afterChange={() => setCarouselMoving(false)}
                additionalTransfrom={0}
                arrows={false}
                autoPlaySpeed={3000}
                centerMode={false}
                className={styles.corousel}
                dotListClass=""
                draggable={true}
                swipeable={true}
                focusOnSelect={false}
                infinite
                itemClass=""
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={true}
                renderDotsOutside={false}
                responsive={responsive}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                sliderClass=""
                slidesToSlide={1}
                customButtonGroup={<ButtonGroup />}
                removeArrowOnDeviceType={["tablet", "mobile"]}
              >
                {/* {stockData.map((data, index) =>
                                  <VillaCard key={index} data={data} type="apart" from="newest" />
                              )} */}
                {villas?.data.map((villa, index) => (
                  <VillaCard
                    isMoving={isCarouselMoving}
                    key={index}
                    data={villa}
                    type="apart"
                    from="newest"
                    photos={villa.photos}
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
