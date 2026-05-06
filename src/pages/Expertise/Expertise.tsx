import "./Expertise.module.css"
import Header from "@/reusable_sections/Header"
import TheBlueprintForOrder from "./sections/TheBlueprintForOrder"
import PricingPlans from "./sections/PricingPlans"
import DropCalendarFaq from "./sections/DropCalendarFaq"
import Footer from "@/reusable_sections/Footer"

export default function ExpertisePage() {

  return (
    <div>
      <Header />
      <TheBlueprintForOrder />
      <PricingPlans />
      <DropCalendarFaq />
      <Footer />
    </div>
  )
}
