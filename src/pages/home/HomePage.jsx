
import { useSelector } from "react-redux";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import CTASection from "../../components/home/CTASection";
import FeaturesShowcase from "../../components/home/FeaturesShowcase";
import HeroSection from "../../components/home/HeroSection";
import HowItWorks from "../../components/home/HowItWorks";
import PricingAccess from "../../components/home/PricingAccess";
import StatsSection from "../../components/home/StatsSection";
import Testimonials from "../../components/home/Testimonials";
import WhyChooseUs from "../../components/home/WhyChooseUs";

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
      className={`min-h-screen w-full transition-colors duration-500 relative bg-(--primary-bg) text-(--primary-text)`}
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