import BreadCrumb from "@/components/breadCrumb/breadCrumb";
import React from "react";
import styles from "./page.module.css";
import Seo from "@/components/seo";
import Form from "./form";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

export default function KirayaVer() {
  const { t } = useTranslation("common");
  return (
    <>
      <Seo
        pageTitle={"Labirent Fethiye | Villanızı Kiraya Verin"}
        pageDesc={"Labirent Fethiye Villanızı Kiraya Verin"}
      />
      <BreadCrumb link={"kiraya-ver"} />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.titleBox}>
            <div className={styles.titleBoxContainer}>
              <h1 className={styles.title}>{t("rentOutYourVilla")}</h1>
              <div className={styles.subTitle}>
                Konaklamak için pek çok yapı türü tercih edilmektedir ve Muğla
                ilimiz çevresinde özellikle villaların sayısı her geçen gün
                artmaktadır. Müstakil yaşam alanları sunan villalar kendilerine
                ait geniş bahçeleri, özel havuzları, çocuk havuzları, mangal,
                barbekü alanları, terasları, jakuzileri ve daha pek çok detayı
                ile öne çıkmaktadır.
                <br />
                <br />
                Lüks yaşam alanları olarak öne çıkan villaların mimarileri ve
                dekorasyonları tamamen kişinin zevkine ve bütçesine göre
                değişmektedir. Bu nedenle de kişilere özgürce hareket alanı
                sağlamaktadır. Bölgemizde geleneksel tatil mekanları aksine
                villalar her geçen gün öne çıkmakta, kiralık villa seçerek
                tatilini ev rahatlığında, sessiz, sakin, güvenli, huzurlu bir
                ortamda geçirmek isteyenler yılın her dönemi bölgemizi ziyaret
                etmektedirler.
                <br />
                <br />
                <b>Villanızdan Gelir Elde Etmenin Yolu</b>
                <br />
                <b>Villa tatili</b>
                rağbet kazandıkça bölgemizde villası olanlar için alternatif bir
                gelir kaynağı oluşmaktadır. Dilerseniz Muğla, Fethiye, Ölüdeniz
                gibi bölgelerde yer alan villalarınızı sizler de kiraya
                verebilirsiniz. Bunun için firmamızı tercih edebilirsiniz.
                Bizler müşterilerimizin villalarının işletmesini alıyor ve %20
                komisyon karşılığında villanızı profesyonelce işletiyoruz.
                <br />
                Sektörde sahip olduğumuz deneyim, kurumsallık, uzman kadro ve
                müşteri memnuniyeti odaklı hizmet anlayışı ile villalarınızdan
                yüksek kazançlar elde etmeyi vaat ediyoruz. Villalarınızın
                pazarlamasını ve müşterilerimize takdimini, işletmesini tamamen
                biz yürütüyoruz.
                <br />
                <br />
                <b>En Çok Tercih Edilen Villa Çeşitleri</b>
                <br />
                <br />
                Villalarınızın özellikleri her ne olursa olsun kiraya
                verebilirsiniz. Ancak rakiplerinizle rekabet edebilmek
                istiyorsanız bakımlı, donanımlı, modern, konforlu, güvenli
                villalara sahip olmanız avantajınıza olacaktır. Yeni yakın inşa
                edilmiş ya da tadilattan geçirilmiş, mobilyaları, beyaz eşyaları
                temin edilmiş, havuzu, bahçesi, terası vs. olan villalar çok
                daha fazla rağbet görmektedir.
                <br />
                Tatilini kiralık villalardan yana kullananlar balayı villası,{" "}
                <b>özel villa</b>
                , çocuk havuzlu villa, deniz manzaralı villa, korunaklı villa ve
                kış aylarına uygun villa çeşitlerine yönelmektedir. Bizler de
                villalarınızın sahip olduğu özelliklere göre en uygun gruba
                dahil ediyor, müşterilerimize kiralıyor ve kazanç elde etmenizi
                sağlıyoruz.
                <br />
              </div>
            </div>
          </div>
          <Form />
        </div>
      </div>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return { props: { ...(await serverSideTranslations(locale, ["common"])) } };
}
