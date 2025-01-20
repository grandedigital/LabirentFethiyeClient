import styles from "./page.module.css";
import Carousel from "react-multi-carousel";
import ActivateCard from "./activateCard/activateCard";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";

export default function Activate2({ activates }) {
  const [isCarouselMoving, setCarouselMoving] = useState(false);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1499 },
      items: 4,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 1499, min: 1199 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1199, min: 767 },
      items: 2,
      partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      partialVisibilityGutter: 80,
    },
  };

  //   const responsive2 = {
  //     desktop: {
  //       breakpoint: {
  //         max: 3000,
  //         min: 1024,
  //       },
  //       items: 4,
  //       partialVisibilityGutter: 40,
  //     },
  //     mobile: {
  //       breakpoint: {
  //         max: 464,
  //         min: 0,
  //       },
  //       items: 1,
  //       partialVisibilityGutter: 30,
  //     },
  //     tablet: {
  //       breakpoint: {
  //         max: 1024,
  //         min: 464,
  //       },
  //       items: 2,
  //       partialVisibilityGutter: 30,
  //     },
  //   };

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
    <div className={styles.activates}>
      <div className={styles.container}>
        <div className={styles.titleAndTabsContainer}>
          <div className={styles.titleAndSubtitleContainer}>
            <span className={styles.title}>Aktivitelerimiz</span>
            <span className={styles.subTitle}>Popüler Aktivitelerimiz</span>
          </div>
          {/* <div className={styles.tabContainer}>
            <span className={`${styles["tabItem"]} ${styles["active"]}`}>
              Tümü
            </span>
            <span className={`${styles["tabItem"]}`}>Muğla</span>
            <span className={`${styles["tabItem"]}`}>Antalya</span>
            <span className={`${styles["tabItem"]}`}>Aydın</span>
            <span className={`${styles["tabItem"]}`}>İzmir</span>
          </div> */}
        </div>
        <div className={styles.carouselContainer}>
          <Carousel
            beforeChange={() => setCarouselMoving(true)}
            afterChange={() => setCarouselMoving(false)}
            additionalTransfrom={0}
            arrows={false}
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            partialVisible
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={true}
            renderDotsOutside={false}
            responsive={responsive}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
            customButtonGroup={<ButtonGroup />}
          >
            {activates?.data?.map((item, index) => (
              <ActivateCard
                isCarouselMoving={isCarouselMoving}
                data={item}
                key={index}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
