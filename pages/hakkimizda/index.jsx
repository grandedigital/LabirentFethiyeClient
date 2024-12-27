import styles from "./page.module.css";
import Link from "next/link";
import TreeStep from "@/components/index/treestep/treestep";
import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import Seo from "@/components/seo";
import { useTranslation } from "react-i18next";
import { capitalizeWords } from "@/utils/globalUtils";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Hakkimizda() {
  const { t } = useTranslation("common");
  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye | Hakkımızda"}
        pageDesc={"Labirent Fethiye Hakkımızda"}
      />
      <BreadCrumb link="about" />
      <section className={`${styles["contentDetail"]} ${styles["corporate"]}`}>
        <div className={styles.titleBox}>
          <div className={styles.container}>
            <h1 className={styles.title}>
              {capitalizeWords(t("headerAboutUs"))}
            </h1>
          </div>
        </div>
        <div className={styles.isotopImage}>
          <div className={styles.container}>
            <ul>
              <li className={styles.single}>
                <Link onClick={(e) => e.preventDefault()} href="#">
                  <div
                    className={styles.img}
                    style={{
                      backgroundImage: "url(/images/about-image-1.png)",
                    }}
                  ></div>
                </Link>
              </li>
              <li className={styles.double}>
                <Link onClick={(e) => e.preventDefault()} href="#">
                  <div
                    className={styles.img}
                    style={{
                      backgroundImage: "url(/images/about-image-5.png)",
                    }}
                  ></div>
                </Link>
                <Link onClick={(e) => e.preventDefault()} href="#">
                  <div
                    className={styles.img}
                    style={{
                      backgroundImage: "url(/images/about-image-3.png)",
                    }}
                  ></div>
                </Link>
              </li>
              <li className={`${styles["double"]} ${styles["reverse"]}`}>
                <Link onClick={(e) => e.preventDefault()} href="#">
                  <div
                    className={styles.img}
                    style={{
                      backgroundImage: "url(/images/about-image-6.png)",
                    }}
                  ></div>
                </Link>
                <Link onClick={(e) => e.preventDefault()} href="#">
                  <div
                    className={styles.img}
                    style={{
                      backgroundImage: "url(/images/about-image-4.png)",
                    }}
                  ></div>
                </Link>
              </li>
              <li className={styles.single}>
                <Link onClick={(e) => e.preventDefault()} href="#">
                  <div
                    className={styles.img}
                    style={{
                      backgroundImage: "url(/images/about-image-2.png)",
                    }}
                  ></div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.textBox}>
          <div className={styles.container}>
            <div className={styles.text}>
              <p>
                Labirent Fethiye olarak yılların bilgi, birikim ve deneyimiyle
                hem misafirlerimize hem de mülk sahiplerine profesyonel çözümler
                sunuyoruz. Ülkemizin en özel yerlerinden birisi olan Fethiye’nin
                güzelliklerinden, doğasından, dinginliğinden istifade etmek
                isteyenlerin yardımcısı oluyoruz. 2018 yılından bu yana aktif
                olduğumuz sektörde 2021 yılı itibariyle online ortama da
                kendimizi taşıyor, dünyanın ve ülkemizin her yerinden rahatlıkla
                bize ulaşabilmenizi sağlıyoruz.
              </p>
              <p>
                İşletme olarak emlak sektöründe bütün müşterilerimizin huzur
                bulacağı çalışmalara imza atmak adına yola çıktık. Kısa sürede{" "}
                <strong>Fethiye kiralık villa</strong>, kiralık apart ve diğer
                bütün uygulamalarımızla fark yaratmayı başardık. Bu da bizim
                bölgemizin en çok tercih edilen emlak işlemesi haline gelmemizi
                sağladı. Fakat sektörümüzün sürekli gelişmesini göz önünde
                bulunduruyor ve sizlerin daima daha iyiyi hak ettiğinizi
                düşünüyoruz. Bu nedenle da başarılarımızı hep daha ileriye
                taşımak adına çaba sarf ediyoruz.
              </p>
              <p>
                <strong>
                  Fethiye Emlak Piyasasında Kaliteli Hizmet, Uygun Fiyat
                </strong>
              </p>
              <p>
                <strong>Fethiye kiralık apart</strong>, kiralık villa, satılık
                apart, satılık villa gibi her türlü ihtiyacı karşımayı
                başarıyoruz. Gerek bölgemizde eşsiz bir tatil geçirmek için
                geçici süreli konaklama mekanları arayanların gerekse yeni
                konutlar sahip olma ya da elindeki konutunu değerinde satmak
                isteyenlerin yardımcısı oluyoruz.
              </p>
              <p>
                Hizmetlerimizi sadece Fethiye ile sınırlı tutmuyor, aynı zamanda{" "}
                <strong>Ölüdeniz kiralık apart</strong>, Ölüdeniz kiralık villa
                gibi çözümlerimizle Ölüdeniz çevresinde de aktif bulunuyoruz. Bu
                noktada firmamızı tercih etmenizi sağlayacak başlıca etmenler
                şunlardır:
              </p>
              <p>
                <strong>Uzman kadro</strong>: Labirent Fethiye olarak her biri
                alanında eğitimli, deneyimli, gelişime açık, güler yüzlü ve
                özverili bir ekibe sahibiz. Sizlerin ihtiyaçlarınızı tespit
                ediyor, tercihleriniz doğrultusunda en uygun çözümleri hayata
                geçiriyoruz.
              </p>
              <p>
                <strong>Koşulsuz müşteri memnuniyeti</strong>: Temel hedefimiz
                bütün müşterilerimizin aldıkları hizmetten memnuniyet
                duymalarıdır. Bundan kesinlikle taviz vermiyor, en değerli
                parçalarımızın sizler olduğunuzu biliyoruz.
              </p>
              <p>
                <strong>Esnek çözümler</strong>: Firma olarak gerek satılık
                gerekse kiralık ürünlerimiz konusunda geniş bir seçenek
                sunuyoruz. Müşterilerimizin ihtiyaçlarını en iyi şekilde
                karşılamak adına kişiselleştirilmiş yönetim hizmetleri
                sağlıyoruz.
              </p>
              <p>
                <strong>Kalite</strong>: Firma olarak bütün müşterilerimizin
                ihtiyaçlarını karşılamaya çalışırken kaliteyi kesinlikle göz
                ardı etmiyoruz. Bölgemizin en iyi konutlarını buluyor, her
                detayıyla ilgileniyor gerek daimî gerekse geçici süreli en iyi
                apartlara, villalara sahip olmanızı sağlıyoruz. Böylece yaşam
                kalitenizi ve konforunuzu yükseltiyoruz.
              </p>
              <p>
                <strong>Uygun fiyat</strong>: Gerek tatil amaçlı gerekse mülk
                sahibi olma amaçlı ihtiyaçlarınızda bütçe dostu hizmetler
                sunuyoruz. Fethiye satılık apart veya kiralık apart, villa gibi
                ihtiyaçlarınızı piyasa koşullarında en uygun şartlara
                karşılıyoruz.
              </p>
              <h2>İhtiyaçlarınıza Yenilikçi Çözümler</h2>
              <p>
                Bölgemizin ve ülkemizin en seçkin emlak firmalarından birisi
                olmak adına kendimizi sürekli yeniliyor, çağın olanaklarını
                takip ediyoruz. <strong>Fethiye satılık villa</strong>{" "}
                arayışındaysanız en güzellerini sizlere sunuyoruz. Tercihiniz{" "}
                <strong>Ölüdeniz satılık villa</strong> ise aradığınıza en kolay
                şekilde sahip olma fırsatı veriyoruz. Üstelik kiralık villa,
                kiralık apart gibi seçeneklerimizi online ortamda karşınıza
                çıkarıyor, dilediğiniz yerden tatilinizi ayarlamanıza yardımcı
                oluyoruz.
              </p>
            </div>
            <div className={styles.fancyboxImages}>
              <ul>
                <li>
                  <Link onClick={(e) => e.preventDefault()} href="#">
                    <div className={styles.imageBox}>
                      <div
                        className={styles.image}
                        style={{
                          backgroundImage: "url(/images/fancyBox-img-1.png)",
                        }}
                      ></div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link onClick={(e) => e.preventDefault()} href="#">
                    <div className={styles.imageBox}>
                      <div
                        className={styles.image}
                        style={{
                          backgroundImage: "url(/images/fancyBox-img-2.png)",
                        }}
                      ></div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.ourTeam}>
          <div className={styles.container}>
            <div className={styles.titleBox}>
              <h2 className={styles.title}>{t("ourTeam")}</h2>
            </div>
            <ul>
              <li>
                <div className={styles.imageBox}>
                  <div
                    className={styles.img}
                    style={{ backgroundImage: "url(/images/person-1.png)" }}
                  ></div>
                </div>
                <div className={styles.name}>Albert Flores</div>
                <div className={styles.title}>President of Sales</div>
              </li>
              <li>
                <div className={styles.imageBox}>
                  <div
                    className={styles.img}
                    style={{ backgroundImage: "url(/images/person-2.png)" }}
                  ></div>
                </div>
                <div className={styles.name}>Albert Flores</div>
                <div className={styles.title}>President of Sales</div>
              </li>
              <li>
                <div className={styles.imageBox}>
                  <div
                    className={styles.img}
                    style={{ backgroundImage: "url(/images/person-3.png)" }}
                  ></div>
                </div>
                <div className={styles.name}>Albert Flores</div>
                <div className={styles.title}>President of Sales</div>
              </li>
              <li>
                <div className={styles.imageBox}>
                  <div
                    className={styles.img}
                    style={{ backgroundImage: "url(/images/person-4.png)" }}
                  ></div>
                </div>
                <div className={styles.name}>Albert Flores</div>
                <div className={styles.title}>President of Sales</div>
              </li>
              <li>
                <div className={styles.imageBox}>
                  <div
                    className={styles.img}
                    style={{ backgroundImage: "url(/images/person-5.png)" }}
                  ></div>
                </div>
                <div className={styles.name}>Albert Flores</div>
                <div className={styles.title}>President of Sales</div>
              </li>
              <li>
                <div className={styles.imageBox}>
                  <div
                    className={styles.img}
                    style={{ backgroundImage: "url(/images/person-6.png)" }}
                  ></div>
                </div>
                <div className={styles.name}>Albert Flores</div>
                <div className={styles.title}>President of Sales</div>
              </li>
            </ul>
          </div>
        </div>
        <TreeStep from="about" />
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}
