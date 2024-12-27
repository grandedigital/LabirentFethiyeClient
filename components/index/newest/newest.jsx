"use client";
import VillaCard from "../villa/card/villaCard";
import styles from "./newest.module.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function NewVillas({ villas, t }) {
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

  return (
    <div className={styles.newVillas}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={`${styles.titleBox} ${styles.white}`}>
            <div className={styles.title}>{t("newlyAddedVillas")}</div>
            <div className={styles.subTitle}>{t("ourVillasText")}.</div>
          </div>
          <div className={styles.top}>
            <Carousel
              additionalTransfrom={0}
              arrows={false}
              autoPlaySpeed={3000}
              centerMode={false}
              className={styles.corousel}
              dotListClass=""
              draggable
              focusOnSelect={false}
              infinite
              itemClass=""
              minimumTouchDrag={80}
              pauseOnHover
              renderArrowsWhenDisabled={false}
              renderButtonGroupOutside={true}
              renderDotsOutside={false}
              responsive={{
                desktop: {
                  breakpoint: {
                    max: 3000,
                    min: 1024,
                  },
                  items: 4,
                  partialVisibilityGutter: 40,
                },
                mobile: {
                  breakpoint: {
                    max: 767,
                    min: 0,
                  },
                  items: 1,
                  partialVisibilityGutter: 30,
                },
                tablet: {
                  breakpoint: {
                    max: 1024,
                    min: 768,
                  },
                  items: 2,
                  partialVisibilityGutter: 30,
                },
              }}
              rewind={false}
              rewindWithAnimation={false}
              rtl={false}
              sliderClass=""
              slidesToSlide={1}
              swipeable
              customButtonGroup={<ButtonGroup />}
              removeArrowOnDeviceType={["tablet", "mobile"]}
            >
              {/* {stockData.map((data, index) =>
                                <VillaCard key={index} data={data} type="apart" from="newest" />
                            )} */}
              {villas?.data.map((villa, index) => (
                <VillaCard
                  key={index}
                  data={villa}
                  type="apart"
                  from="newest"
                  photos={villa.attributes.photos.data}
                />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
