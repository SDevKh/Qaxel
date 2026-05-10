import "./Home.module.css"
import Header from "@/reusable_sections/Header"
import TheAtlantasVision from "./sections/TheAtlantasVision"
import CapturingTheMoment from "./sections/CapturingTheMoment"
import ScenariosOfSuccess from "./sections/ScenariosOfSuccess"
import ThePerfectProtocol from "./sections/ThePerfectProtocol"
import VoicesOfTheElite from "./sections/VoicesOfTheElite"
import TrustedByResearchers from "./sections/TrustedByResearchers"
import Footer from "@/reusable_sections/Footer"

export default function HomePage() {

    return (
        <div>
            <Header />
            <TheAtlantasVision />
            <CapturingTheMoment />
            <ScenariosOfSuccess />
            <ThePerfectProtocol />
            <VoicesOfTheElite />
            <TrustedByResearchers />
            <Footer />
        </div>
    )
}
