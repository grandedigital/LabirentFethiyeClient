import Link from "next/link";
import styles from "./blog.module.css";
import BlogCard from "./blogCard";
import { useTranslation } from "react-i18next";

export default function Blog({ blog }) {
  
  const { t } = useTranslation("common");
  if (blog?.totalCount == 0) return null;

  return (
    <div className={styles.blog}>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.titleBox}>
            <div className={styles.capitalizeFfirst}>{t("headerBlog")}</div>
            <div className={styles.subTitle}>{t("indexBlogSubText")}</div>
          </div>
          <ul>
            {blog?.data?.map((blog, index) => {
              //Anasayfa Blog başlığının altına 2 tane blog basar
              if (index >= 2) return;
              return <BlogCard t={t} key={index} data={blog} />;
            })}
          </ul>
          <div className={styles.linkBox}>
            <Link href="/bloglar" rel="nofollow" className={styles.greyButton}>
              <span>{t("all")}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
