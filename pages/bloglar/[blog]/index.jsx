import styles from "./page.module.css";
import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import Image from "next/image";
import Seo from "@/components/seo";
import { getBlog } from "@/services/blog";
import { useRouter } from "next/router";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const DynamicHtmlRenderer = dynamic(
  () => import("../../../components/blog/blogDetail/DynamicHtmlRenderer"),
  {
    ssr: true, // SSR olmadan yüklenmesi yeterli
  }
);

const TreeStep = dynamic(
  () => import("../../../components/index/treestep/treestep"),
  {
    ssr: false, // SSR olmadan yüklenmesi yeterli
  }
);

export default function Blog({ blog }) {
  const router = useRouter();
  const renderHtmlContent = () => {
    const description = blog?.data?.webPageDetails[0]?.descriptionLong;

    const strongContent = description?.replace(
      /\*\*(.*?)\*\*/g,
      "<strong>$1</strong>"
    );

    const headerContent = strongContent?.replace(
      /(#+)\s*(.*?)\s*(?=(?:\r\n|\r|\n|$))/g,
      (_, hashes, content) =>
        `<h${hashes.length}>${content}</h${hashes.length}>`
    );
    const finalContent =
      headerContent?.length > 0 ? headerContent : `<p>${strongContent}</p>`;
    return { __html: finalContent };
  };

  if (blog.data) {
    return (
      <>
        <Seo
          pageTitle={blog?.data?.metaTitle}
          pageDesc={blog?.data?.metaDescription}
        />
        <BreadCrumb />
        <section
          className={`${styles["contentDetail"]} ${styles["corporate"]}`}
        >
          <div className={styles.titleBox}>
            <div className={styles.container}>
              <h1 className={styles.title}>
                {blog?.data?.webPageDetails[0]?.title}
              </h1>
            </div>
          </div>
          <div className={styles.textBox}>
            <div className={styles.container}>
              <div className={styles.text}>
                {/* <img
                  src={`${process.env.NEXT_PUBLIC_WEBHOTOS_URL}/k_${blog?.data?.photos[0]?.image}`}
                /> */}
                <div className={styles.imageBox}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_WEBHOTOS_URL}k_${blog?.data?.photos[0]?.image}`}
                    alt={"Blog Detail Image"}
                    style={{ objectFit: "cover" }}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy" // Lazy loading aktif
                  />
                </div>
                <DynamicHtmlRenderer htmlContent={renderHtmlContent().__html} />
              </div>
            </div>
          </div>
          <TreeStep from="blogDetail" />
        </section>
      </>
    );
  } else {
    useEffect(() => {
      router.replace("/404");
    }, []);
  }
}

export async function getServerSideProps({ query, locale }) {
  const slug = query.blog;
  const blog = await getBlog({ slug: slug, language: locale });
  return {
    props: { blog, ...(await serverSideTranslations(locale, ["common"])) },
  };
}
