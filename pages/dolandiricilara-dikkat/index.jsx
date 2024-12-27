import styles from "./page.module.css";
import TreeStep from "@/components/index/treestep/treestep";
import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import Seo from "@/components/seo";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

export default function Cheat() {
  const { t } = useTranslation("common");
  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye | Dolandırıcılara Dikkat"}
        pageDesc={"Labirent Fethiye Dolandırıcılara Dikkat"}
      />
      <BreadCrumb link="dolandiricilara-dikkat" />
      <section className={`${styles["contentDetail"]} ${styles["corporate"]}`}>
        <div className={styles.titleBox}>
          <div className={styles.container}>
            <h1 className={styles.title}>{t("bewareOfScammers")}</h1>
          </div>
        </div>
        <div className={styles.textBox}>
          <div className={styles.container}>
            <div className={styles.text}>
              <h2>Dolandırıcılara Dikkat</h2>
              <p>
                Yaşam standartları her geçen gün büyük bir hızla değişmektedir.
                Özellikle 2019 yılı sonunda ortaya çıkan Corona Virüs (Covid-19)
                bu alanda çok köklü ve ani değişimlere neden olmuştur. Turizm
                sektörü belki de covid-19’dan en fazla etkilenen alanlardan
                birisidir.
              </p>

              <p>
                Covid-19 ile birlikte hijyenin, sosyal mesafenin önemi çok daha
                artmış, insanlar kalabalık alanlardan, toplu yaşam alanlarından
                gün geçtikçe uzaklaşmaya başlamışlar, daha güvenli, daha
                konforlu ve daha hijyenik olduğu için de villa tatili
                misafirlerimiz için en iyi alternatiflerden birisi olmuştur.
                Villa tatiline rağbet arttıkça bundan istifade etmek isteyen pek
                çok sahte ve dolandırıcı kimse ortaya çıkmıştır.
              </p>
              <p>
                Dolandırıcılar farklı yöntemler kullanmakta, özellikle de
                internet alışverişinin yaygınlaşmasından istifade ederek
                misafirlerimizi kandırmaya ve dolandırmaya çalışmaktadırlar.
                Bunların her birine bizler gerekli önlemleri almaya çalıştığımız
                gibi sizlerin de dikkatli olmanızı öneriyoruz.
              </p>
              <p>
                Öncelikle Labirent Turizm olarak 2018 yılından bu yana sektörde
                aktifiz ve 2021 itibariyle de online ortamda müşterilerimizin
                karşısına çıkmış bulunuyoruz. İlk günden itibaren güvenilir ve
                müşteri memnuniyeti yüksek politikamızla Labirent Turizm ailesi
                olarak öne çıkıyoruz. Başka hiçbir kişi ve kurumlarla bağımız
                olmadığını buradan açıklamak istiyoruz.
              </p>
              <p>
                Online ortam pek çok avantaj sağlasa da art niyetli kişilerin
                işini de kolaylaştırabilmektedir. Kötü niyetli kişi ve firmalar
                hazırlamış oldukları sitelerle ve sahte ilanlara siz değerli
                misafirlerimizin maddi ve manevi zarara uğramanıza neden
                olabilmektedirler. Firmamızın sitemizde yer alan ve TÜRSAB’a
                kayıtlı olduğumuzu belirten belge numaramız haricinde herhangi
                bir platformda faaliyeti yer almamaktadır.
              </p>
              <p>
                Villa ya da apart kiralayacağınız firmanın yetki belgesi olup
                olmadığı dolandırıcılığa karşı en temel kriter olacaktır.
                Firmamız Ticaret Bakanlığından Emlak Yetki Belgesi ve Taşınmaz
                Ticareti Yetki Belgesine sahip olarak hizmet vermektedir.
              </p>
              <p>
                Tercih edeceğiniz firmanın sadece satış öncesi değil, satış anı
                ve sonrasında da her zaman ulaşılabilir olması gerekmektedir.
                Bizler tatil boyunca her probleminizde ve talebinizde 7/24
                yanınızda oluyor, her zaman ulaşabilmenizi sağlıyoruz. Diğer
                hizmetlerimizle tatilinizin en güzel şekilde geçmesini
                hedefliyoruz.
              </p>
              <p>
                Sektörün geneli itibariyle sizlere önerimiz villa ya da apart
                kiralamadan önce kiralama yapmayı düşündüğünüz sitelerin TÜRSAB
                üyesi olduğundan emin olmanızdır. Sorgulama yaparken TÜRSAB
                yetki belgelerini, vergi dairelerini, vergi numaralarını ve
                adreslerine ilişkin ruhsat kontrollerini yapmanızı önemle
                tavsiye ediyoruz.
              </p>
              <p>
                Firmamızın adını, şirket unvanını ve sitemizi kopyalayarak
                kiralama yapmaya çalışan bütün kurum ve kuruluşlar hakkında
                hukuki ve cezai müracaatlar gerekli kuruluşlara yapılmaktadır.
              </p>
            </div>
          </div>
        </div>
        <TreeStep from="cheat" />
      </section>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}
