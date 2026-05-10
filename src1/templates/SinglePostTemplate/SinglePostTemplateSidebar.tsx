import "./SinglePostTemplate.module.css"
import Header from "@/reusable_sections/Header"
import SinglePostTemplateSection from "./sections/SinglePostTemplateSection"
import Footer from "@/reusable_sections/Footer"

export default function SinglePostTemplatePage() {

    return (
        <div>
            <Header />
            <SinglePostTemplateSection />
            <Footer />
        </div>
    )
}
