import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import TreeStep from "@/components/index/treestep/treestep";
import Seo from "@/components/seo";
import styles from "./page.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { capitalizeWords } from "@/utils/globalUtils";
import { useTranslation } from "react-i18next";

export default function RentCar() {
  const { t } = useTranslation("common");
  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye | Araç Kiralama"}
        pageDesc={"Labirent Fethiye Araç Kiralama"}
      />
      <BreadCrumb link="arac-kiralama" />
      <section className={`${styles["contentDetail"]} ${styles["corporate"]}`}>
        <div className={styles.titleBox}>
          <div className={styles.container}>
            <h1 className={styles.title}>{capitalizeWords(t("headerCarRental"))}</h1>
          </div>
        </div>
        <div className={styles.textBox}>
          <div className={styles.container}>
            <div className={styles.text}>
              <h2>Araç Kiralama</h2>
              <p>
                Muğla, Fethiye ve çevresi Türkiye’nin en güzel tatil yerleridir.
                Doğası, denizi, kumsalları, tarihi yapıları ve çok daha
                fazlasıyla burada kaliteli zaman geçirebilirsiniz. Üstelik{" "}
                <b>Fethiye araç kiralama</b> hizmetlerimizden yararlanarak
                bölgede kalacağınız süre boyunca şahsi araca sahip olmanın
                avantajlarından da istifade edebilirsiniz.
              </p>
              <p>
                Fethiye araç kiralama hizmetlerinin detaylarını tamamen
                ihtiyaçlarınıza göre seçebilirsiniz. Yenilikçi ve gelişime açık
                yapımızla her zaman geniş bir araç filosuyla hizmet veriyoruz.
                Araçlarımızın tamamının modelli ve bakımlı olmasını sağlamanın
                yanında farklı segmentlerde, çeşitli klasmanlarda araçları
                tercihe açarak kullanım alışkanlıklarınıza, kişi sayınıza,
                katılacağınız aktivitelere, gideceğiniz yerlere vs. göre en
                ideal aracı kiralayabilmenizi sağlıyoruz. Güçlü altyapımız,
                profesyonel kadromuz, çağrı merkezimiz ve yabancı dil bilen
                personellerimizle hem bireysel hem kurumsal taleplerinizi
                karşılıyoruz.
              </p>
              <h2>İhtiyaca En Uygun Araç Kiralama</h2>
              <p>
                Araç kiralama uygulamalarımızda genç araç filomuzla öne
                çıkıyoruz. Günlük, haftalık, aylık gibi periyotlarla kiralama
                hizmeti sağlayarak tatiliniz ya da seyahatinizin ne kadar
                süreceğine göre kiralama yapmanızı sağlıyoruz. Araçlarımızı
                başlıca şu gruplarda tercihe açıyoruz:
              </p>
              <p>
                Ekonomik, <br />
                Orta Sınıf, <br />
                Lüks, <br />
                SUV, <br />
                Minibüs
              </p>
              <p>
                Bütün bu gruplardaki çok sayıda araç içinde otomatik şanzıman,
                manuel şanzıman, dizel, benzin, sedan, hatchback gibi
                özelliklerde çözüm üretiyoruz.
              </p>
              <p>
                Araç kiralama uygulamalarımızda olabildiğince kolaylık sağlıyor,
                tatillerinizin en iyi şekilde geçmesine yardımcı oluyoruz. Bu
                kapsamda dilediğiniz yerde araçlarımızı teslim alıp teslim
                edebilme avantajı sunuyoruz. Mesela Dalaman Havalimanı’nda
                kiralayacağınız aracınız iniş saatinizde hazır bekleyebilir.
                Böylece kiralık villanıza ya da konaklayacağınız yere kolayca
                geçebilirsiniz. Aynı şekilde kiralama süresi sonunda
                havalimanında araç teslimi yapabilirsiniz.
              </p>
              <h2>Uygun Fiyatlı Araç Kiralama</h2>
              <p>
                Muğla, Fethiye ve bütün bölge gezilecek görülecek yerleri
                açısından son derece zengindir. Antik kentler, tarihi yapılar,
                doğal güzellikler, koylar, plajlar ve çok daha fazlası sizleri
                beklemektedir. Fakat bütün bunları yorulmadan dolaşabilmek için
                mutlaka kişisel araca ihtiyacınız vardır.
              </p>
              <p>
                <b>Fethiye kiralık araç </b>
                çözümlerimiz sayesinde dilediğiniz aracı önceden rezerve
                edebilir, bölgemize geleceğinizde aracınızın hazır olmasını
                sağlayabilirsiniz. Sevdiklerinizle birlikte konaklayacağınız
                yere güvenle ulaşabilir, gezilecek görülecek yerleri gezip
                dolaşabilirsiniz. Üstelik bütün bu ayrıcalıklara birbirinden
                uygun araç kiralama fiyatlarıyla sahip olabilirsiz.
              </p>
            </div>
          </div>
        </div>
        <TreeStep from="rentCar" />
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}
