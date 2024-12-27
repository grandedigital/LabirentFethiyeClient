import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import TreeStep from "@/components/index/treestep/treestep";
import Seo from "@/components/seo";
import styles from "./page.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function FoodServices() {
  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye | Yemek Servisi"}
        pageDesc={"Labirent Fethiye Yemek Servisi"}
      />
      <BreadCrumb link="yemek-servisi" />
      <section className={`${styles["contentDetail"]} ${styles["corporate"]}`}>
        <div className={styles.titleBox}>
          <div className={styles.container}>
            <h1 className={styles.title}>Yemek Servisi</h1>
          </div>
        </div>
        <div className={styles.textBox}>
          <div className={styles.container}>
            <div className={styles.text}>
              <h2>Yemek Servisi</h2>
              <p>
                Tatile çıkmanın en temel amacı gezip eğlenmek, kalabalıktan
                uzaklaşmak, iş stresinden ayrı kalmaktır. Yıl boyunca hep belli
                saatlere uymak, işe, çocuklara, onların okullarına vs. göre
                kendimizi ayarlamaya çalıştığımız ortamın dışına çıkmaktır.
                Bunun için Türkiye’nin tatil cennetinde sizleri bekliyoruz ve
                eşsiz bir konaklama deneyimi vaat ediyoruz.
              </p>
              <p>
                Misafirlerimizin kiralık villalarda en büyük avantajlarından
                birisi yemek konusunda özgür olmalarıdır. Hem zaman olarak hem
                de menü olarak... Villalarımızın hemen tamamının bahçelerinde
                barbekü alanı, mangal alanı yer almakta, buralarda dilediğiniz
                zaman sofranızı kurma imkânınız bulunmaktadır. Mutfaklarımız da
                gerekli bütün beyaz eşyalara, mutfak gereçlerine sahiptir.
                Dilediğiniz menüyü rahatlıkla hazırlayabilirsiniz.
              </p>
              <p>
                Eğer tercihinizi yemek servisinden yana kullanmak isterseniz de
                kendi bünyemizde restoranımız yer almaktadır. Binnaz Restaurant
                adlı işletmemizden paket servisi söyleyebilirsiniz. Saat 10.00 –
                22.00 arasında işletmemiz taleplerinizi karşılamak için hazır ve
                nazır bulunmaktadır.
              </p>
              <p>
                İşletmemize 0 537 880 07 03 iletişim numarasından ulaşabilir,
                dilediğiniz menüyü sipariş verebilirsiniz. Yılların bilgi ve
                birikimiyle hizmet verdiğimiz alanda her biri uzman, tecrübe
                sahibi, saklı tarifleri olan aşçılarımızla hizmet veriyoruz. En
                kaliteli malzemeleri kullanıyor, taze ve lezzetli malzemelerle
                başka hiçbir yerde tadamayacağınız menüleri hazırlıyoruz. Güler
                yüzlü, özverili ve deneyimli servis elemanlarımızla en hızlı
                biçimde adreslerinize siparişlerinizi ulaştırıyoruz.
              </p>
              <p>
                İşletmemiz bütün villalarımızın adres bilgilerine hâkim
                oldukları için siparişleriniz kısa sürede tarafınıza ulaşacak ve
                birbirinden güzel lezzetler en uygun fiyatlarla sizlere
                sunulacaktır.
              </p>
            </div>
          </div>
        </div>
        <TreeStep from="food" />
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}
