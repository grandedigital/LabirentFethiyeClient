import styles from "./page.module.css";
import TreeStep from "@/components/index/treestep/treestep";
import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import Seo from "@/components/seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

export default function WhyLabirent() {
  const { t } = useTranslation("common");
  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye | Neden Labirent"}
        pageDesc={"Labirent Fethiye Neden Labirent"}
      />
      <BreadCrumb link="neden-labirent" />
      <section className={`${styles["contentDetail"]} ${styles["corporate"]}`}>
        <div className={styles.titleBox}>
          <div className={styles.container}>
            <h1 className={styles.title}>{t("whyLabyrinth")}</h1>
          </div>
        </div>
        <div className={styles.textBox}>
          <div className={styles.container}>
            <div className={styles.text}>
              <h2>Neden Labirent</h2>
              <p>
                Güzel bir tatil herkesin hakkıdır. Ülkemiz, özellikle de Ege ve
                Akdeniz kıyıları, bu alanda benzersiz bir zenginliğe sahiptir.
                Turizm sektöründeki bütün değişim ve gelişimler öncelikle
                buralarda başlamaktadır.
              </p>
              <p>
                Geleneksel otel tatillerinin aksine son yıllarda villa tatilleri
                öne çıkmaya başlamıştır. Bunda özel donanımlı ve tasarımlı
                villaların sayısının artması son derece etkili olduğu gibi
                sosyal mesafe, hijyen gibi alanlardaki farkındalığın da etkisi
                vardır. Labirent Turizm olarak bölgemizin en güzel ve en özel
                villalarını sizler için bir araya getirmeye çalışıyoruz. Bu
                alanda başka firmalar da olduğu için <b>neden Labirent</b>{" "}
                sorusunu cevaplamak gerektiğini düşünüyoruz.
              </p>
              <p>
                <b>Labirent Turizm</b> olarak sizlere sunmuş olduğumuz başlıca
                ayrıcalıkları şöyle sıralayabiliriz:
                <br />
                <br />
                - Tatil eğlenmek, hoş zaman geçirmek için yapılan bir
                aktivitedir. Bunun için sizler hem zaman hem bütçe ayırırsınız
                ve doğal olarak her şeyin yolunda gitmesini istersiniz. Bizler
                bunun farkında olarak önceliği her zaman koşulsuz misafir
                memnuniyetine veriyoruz. Alacağınız hizmetin öncesinde, anında
                ve sonrasında yanınızda oluyor, merak ettiğiniz soruları
                cevaplandırıyor, karşılaştığınız sorunlarda çözüm üretiyoruz.
                <br />
                <br />
                - Kalitenin tesadüf olmadığını biliyor ve kalite
                standartlarımızı her zaman en üst seviyede tutmaya çalışıyoruz.
                Bu kapsamda kiralık villa, satılık villa ve diğer
                hizmetlerimizde seçici davranıyoruz. Bölgemizin en iyi
                villalarını sayfamıza taşıyor, konakladığınız ve kullandığınız
                her aşamada konforunuzun üst düzeyde olmasını sağlıyoruz.
                <br />
                <br />- <b>Labirent Turizm </b>
                olarak sadece online ortamda bulunmuyoruz. Bizler
                misafirlerimizi ofisimizde ağırlıyor, kiraladıkları tesise
                doğrudan kendimiz yerleştiriyoruz. Oysa rakiplerimiz kiralamayı
                yaptıktan sonra tesis sahibinin numarasını verip konumunu
                atmakta ve aradan çekilmektedirler. Bu da çoğu zaman farklı
                aksaklıklara sebebiyet vermektedir. Bizler tatilinizin kusursuz
                geçmesi adına her aşamada doğrudan bulunuyoruz.
                <br />
                <br />
                - Kurumsallık kaliteyle ve güvenilirlikle doğrudan alakalıdır.
                Firmamız Türkiye Cumhuriyeti Ticaret bakanlığından almış olduğu
                4801064 numaralı Emlak yetki Belgesi ve Taşınmaz Ticareti Yetki
                Belgesine sahip, resmi bir kurum olarak hizmet vermektedir.
                <br />
                <br />
                - Sektörde son yıllarda dolandırıcılık vakaları artmıştır ve
                tatil hayalleri kuran birçok kişi dolandırılmaktadır. Bu nedenle
                kişilerin konut kiralama ya da satın alımı yaparken dikkatli
                olmaları, güvenilir, kurumsal yerleri tercih etmeleri
                gerekmektedir. Bu kapsamda kiralama hizmeti veren yerin mutlaka
                yetki belgesinin, TÜRSAB Acentesi belgesinin olmalıdır. Labirent
                Turizm olarak Türkiye Seyahat Acenteleri Birliği’nden aldığımız
                1210 numaralı TÜRSAB Acentesi Belgesi ile hizmet veriyor, yasal,
                resmi bir firma olarak sektörde yolumuza devam ediyoruz.
                <br />
                <br />
                - Firma olarak sadece kiralama ve satış aşamalarında değil,
                tatiliniz boyunca her probleminizde yanınızda bulunuyoruz. 7/24
                bizi arayabiliyor, aklınıza takılan soruları sorabiliyor,
                problemlerinizi aktarabiliyorsunuz ve çözüm üretiyoruz.
                <br />
                <br />
                - Kaliteli bir tatil için tek gereken konaklama değildir. Daha
                başka ihtiyaçlar ve tatilinizi iyileştirecek aktiviteler
                mevcuttur. Firma olarak araç kiralama hizmeti de veriyor,
                bölgemize geldiğiniz andan ayrılacağınız ana kadar
                kiralayacağınız araçla kişisel araç ihtiyacınızı karşılıyoruz.
                Farklı segmentlerde ve fiyatlarda kiralık araçlarla tatil
                boyunca dilediğiniz yeri dolaşabilir, farklı aktivitelere
                katılabilirsiniz.
                <br />
                <br />
                - Sadece araç kiralama değil, daha başka hizmetlerimiz de
                mevcuttur. Paraşüt, jeep safari, ATV safari, atlı geziler,
                rafting, dalış gibi farklı aktiviteler de düzenliyor, bunlar
                hakkında gerekli danışmanlık hizmetleri veriyor, mükemmel bir
                tatil deneyimi yaşamanız adına imkanlarımızı seferber ediyoruz.
                <br />
                <br />
                - Bütün bu olanaklar yanında Labirent Turizm olarak kendimize
                ait gece clubu, terrace bar, pub bar ile de hizmet veriyoruz.
                Böylece bölgemize gelen misafirlerimizin doyasıya eğlenmesi,
                zengin yiyecek, içecekler eşliğinde sevdikleriyle birlikte hoş
                zaman geçirmesi için de çalışıyoruz. Böylece gece eğlencesi için
                de başka bir yer aramanıza gerek kalmadan tatilinizi
                renklendirebiliyorsunuz.
                <br />
                <br />
                - Firma olarak konaklama ve eğlence yanında yeme, içeme
                ihtiyaçlarınıza da karşılık veriyoruz. Kendi bünyemizde bulunan
                Binnaz Restaurant işletmemizde birbirinden güzel lezzetleri
                sizler için hazırlıyor, aynı zamanda paket servisi yapıyoruz.
                Dolayısıyla eşsiz bir tatil için gereken bütün olanakları
                sağlıyor, başka hiçbir yerle muhatap olmanıza gerek kalmadan
                ihtiyaçlarınızı gideriyoruz.
                <br />
              </p>
            </div>
          </div>
        </div>
        <TreeStep from="whylabirent" />
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}
