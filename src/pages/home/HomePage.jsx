
import { useSelector } from "react-redux";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import HeroSection from "../../components/home/HeroSection";
import StatsSection from "../../components/home/StatsSection";
import HowItWorks from "../../components/home/HowItWorks";
import WhyChooseUs from "../../components/home/WhyChooseUs";
import PricingAccess from "../../components/home/PricingAccess";
import Testimonials from "../../components/home/Testimonials";
import CTASection from "../../components/home/CTASection";
import FeaturesShowcase from "../../components/home/FeaturesShowcase";

/**
 * HomePage
 * --------
 * This is the landing / summary page of "ReactAllCodeAndFeatures".
 * It introduces the project and previews every feature page that lives
 * elsewhere in the app (carousel, breadcrumb, infinite scroll, etc.)
 *
 * Theme:
 * `isGray` is read directly from the Redux "user" slice. Your store would
 * look something like:
 *   { user: { isGray: false, ...otherUserFields } }
 * Toggling it (see Navbar.jsx) flips the whole site between:
 *   - isGray = true  -> Graphite / Dark theme (slate + cyan + violet)
 *   - isGray = false -> Vibrant / Colorful theme (indigo + fuchsia gradients)
 *
 * `isGray` is read once here and passed down as a prop to every section,
 * so each section component stays simple and doesn't need its own
 * Redux connection.
 */
const HomePage = () => {
  const isGray = useSelector((state) => state.user.isGray);

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-500 ${
        isGray
          ? "bg-slate-950 text-slate-100"
          : "bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900"
      }`}
    >
      <Navbar isGray={isGray} />
     <HeroSection isGray={isGray} />
        <StatsSection isGray={isGray} />
      <FeaturesShowcase isGray={isGray} />
      <HowItWorks isGray={isGray} />
    <WhyChooseUs isGray={isGray} />
      <PricingAccess isGray={isGray} />
      <Testimonials isGray={isGray} />
      <CTASection isGray={isGray} /> 
      <Footer isGray={isGray} />
    </div>
  );
};

export default HomePage;