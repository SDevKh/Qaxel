import "./Contact.module.css"
import Header from "@/reusable_sections/Header"
import WhereStoriesComeAlive from "./sections/WhereStoriesComeAlive"
import ElateSeEpafi from "./sections/ElateSeEpafi"
import StepsFromTheSacred from "./sections/StepsFromTheSacred"
import Footer from "@/reusable_sections/Footer"

export default function ContactPage() {

  return (
    <div>
      <Header />
      <WhereStoriesComeAlive />
      <ElateSeEpafi />
      <StepsFromTheSacred />
      <Footer />
    </div>
  )
}
