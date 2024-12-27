import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "react-datepicker/dist/react-datepicker.css"; // datepicker css
import "@/styles/styles.css";
import store from "@/store"
import { Providers } from "@/store/provider"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import HamburgerMenu from "@/components/hamburger/hamburgerMenu"
import { useEffect, useState } from "react";
import { getRegions } from "@/services/region"
import { appWithTranslation } from "next-i18next"
import { useTranslation } from "next-i18next"

//import { usePageLoading } from "@/hooks/usePageLoading"
import Loading from "@/app/loading"

function myApp({ Component, pageProps }) {
    //const { isPageLoading } = usePageLoading();
    const { i18n } = useTranslation();
    const [footerData, setFooterData] = useState([]);

    useEffect(() => {

        const script = document.createElement('script');
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtag/js?id=G-X1BE592FGZ";
        document.head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-X1BE592FGZ');
    `;
        document.head.appendChild(inlineScript);

        async function fetchData() {
            const data = await getRegions(i18n.language)
            setFooterData(data?.data);
        }
        fetchData();
    }, []);

    useEffect(() => {
        // Sayfa dil değiştiğinde yenilenmesini sağlar
        const handleLanguageChange = async () => {
            //window.location.reload();
            const data = await getRegions(i18n.language)
            setFooterData(data?.data);
        };

        if (i18n.isInitialized) {
            i18n.on('languageChanged', handleLanguageChange);
        }

        return () => {
            if (i18n.isInitialized) {
                i18n.off('languageChanged', handleLanguageChange);
            }
        };
    }, [i18n]);

    return (
        <Providers store={store}>
            <Header />
            {/* {isPageLoading ? <Loading /> :
                <Component {...pageProps} />
            } */}
            <Component {...pageProps} />
            <Footer regions={footerData} />
            <HamburgerMenu />
        </Providers>
    )
}

export default appWithTranslation(myApp)

