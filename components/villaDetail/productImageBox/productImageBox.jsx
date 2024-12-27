import styles from "./productImageBox.module.css";
import dynamic from "next/dynamic";

const Gallery = dynamic(
  () => import("../../villaDetail/leftBar/gallery/gallery"),
  {
    ssr: true,
  }
);

export default function ProductImageBox({ imgs, from = "" }) {
  return (
    <div className={styles.productImagesBox}>
      <div className={styles.container}>
        <div className={styles.productImages}>
          <div className={styles.row}>
            <Gallery photos={imgs} from={from} />
          </div>
        </div>
      </div>
    </div>
  );
}
