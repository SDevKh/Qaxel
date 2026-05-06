import "./Portfolio.module.css"
import Header from "@/reusable_sections/Header"
import InstantsDException from "./sections/InstantsDException"
import CuratedMasterpieces from "./sections/CuratedMasterpieces"
import Footer from "@/reusable_sections/Footer"

export default function PortfolioPage() {

  return (
    <div>
      <Header />
      <InstantsDException />
      <CuratedMasterpieces />
      <Footer />
    </div>
  )
}
