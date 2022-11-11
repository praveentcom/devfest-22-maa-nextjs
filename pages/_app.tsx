import { NextPage } from "next"
import HeaderSection from "@/components/sections/header"
import FooterSection from "@/components/sections/footer"
import "../styles/globals.scss"

const AvgeekPassportApp: NextPage = ({ Component, pageProps }: any) => {
    return (
        <>
            <HeaderSection />
            <Component {...pageProps} />
            <FooterSection />
        </>
    )
}

export default AvgeekPassportApp
