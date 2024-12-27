import dynamic from "next/dynamic";
import styles from "./page.module.css";
import { getBlogs } from "@/services/blog";
import Seo from "@/components/seo";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import BlogCard from "@/components/blog/blogCard";

export default function Blog({ blogs }) {
  const { t } = useTranslation("common");
  return (
    <>
      <Seo pageTitle={"Labirent Fethiye | Bloglar"} pageDesc={"Bloglar"} />
      <section
        className={`${styles["contentDetail"]} ${styles["villasDetail"]} ${styles["blogList"]}`}
      >
        <div className={styles.villas}>
          <div className={styles.container}>
            <div className={styles.box}>
              <div className={styles.top}>
                <div className={styles.titleBox}>
                  <div className={styles.title}>{t("allBlogs")}</div>
                  <div className={styles.subTitle}>
                    {t("blogsListed", { blogCount: blogs?.data?.length })}
                  </div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.row}>
                  <ul>
                    {blogs?.data.map((item) => (
                      <BlogCard key={item.slug} item={item} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps({ locale }) {
  const blogs = await getBlogs(locale);
  return {
    props: { blogs, ...(await serverSideTranslations(locale, ["common"])) },
  };
}
