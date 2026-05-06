import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from "./pages/Home/Home"
import PortfolioPage from "./pages/Portfolio/Portfolio"
import ExpertisePage from "./pages/Expertise/Expertise"
import ContactPage from "./pages/Contact/Contact"
import SinglePostTemplatePage from "./templates/SinglePostTemplate/SinglePostTemplate"
import { TooltipProvider } from "@/components/ui/tooltip"
import WhatsAppButton from "@/components/common/WhatsAppButton"

function AppRoutes() {
    const location = useLocation();

    return (

        <Routes key={location.pathname} >
            <Route path="/" element={<HomePage />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/PortfolioPage" element={<PortfolioPage />} />
            <Route path="/ExpertisePage" element={<ExpertisePage />} />
            <Route path="/ContactPage" element={<ContactPage />} />
            <Route path="/post/post/:post_id" element={<SinglePostTemplatePage />} />
        </Routes>

    );
}

function App() {
    return (
        <TooltipProvider>
            <Router>
                <div className="app">
                    <AppRoutes />
                    <WhatsAppButton />
                </div>
            </Router>
        </TooltipProvider>
    );
}

export default App;