import styles from "./blogCard.module.css";
import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ item }) {
  return (
    <li className={styles.blogItem}>
      <div className={styles.column}>
        <Link rel="nofollow" href={`/bloglar/${item?.slug}`}>
          <div className={styles.imgBox}>
            <div className={styles.carouselBox}>
              {/* <div
                className={styles.bgImage}
                style={{
                  backgroundImage: `url(${process.env.NEXT_PUBLIC_WEBHOTOS_URL}/k_${item?.photos[0]?.image})`,
                }}
              ></div> */}
              <Image
                src={`${process.env.NEXT_PUBLIC_WEBHOTOS_URL}k_${item?.photos[0]?.image}`}
                alt={item?.webPageDetails[0]?.title || "Blog Image"}
                style={{ objectFit: "cover" }}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy" // Lazy loading aktif
              />
              {/* <div className={styles.navButtons}>
                                                                         <button onClick={(e) => handleImageButton(e)}></button>
                                                                         <button onClick={(e) => handleImageButton(e)} className={styles.next}></button>
                                                                     </div> */}
            </div>
          </div>
          <div className={styles.textBox}>
            <div className={styles.title}>{item?.webPageDetails[0]?.title}</div>
            <div className={styles.desc}>
              {item?.webPageDetails[0]?.descriptionShort}
            </div>
          </div>
        </Link>
      </div>
    </li>
  );
}
