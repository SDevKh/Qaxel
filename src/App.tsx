import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Orders from "./pages/Orders";
import About from "./pages/About";
import AccountSettings from "./pages/AccountSettings";
import Checkout from "./pages/Checkout";
import Terms from "./pages/Terms";
import Shipping from "./pages/Shipping";
import Return from "./pages/Return";
import Privacypolicy from "./pages/Privacypolicy";
import Cancellation from "./pages/Cancellation";
import FAQ from "./pages/FAQ";
import Discalimer from "./pages/Discalimer";
import ProductDetails from "./pages/ProductDetails";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/return" element={<Return />} />
            <Route path="/privacypolicy" element={<Privacypolicy />} />
            <Route path="/cancellation" element={<Cancellation />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/discalimer" element={<Discalimer />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
