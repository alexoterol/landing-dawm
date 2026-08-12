import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import MenuSection from "./components/MenuSection.jsx";
import ProcessSection from "./components/ProcessSection.jsx";
import LocationsSection from "./components/LocationsSection.jsx";
import AboutSection from "./components/AboutSection.jsx";
import ReviewsSection from "./components/ReviewsSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";
import ReservationWidget from "./components/ReservationWidget.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <MenuSection />
      <ProcessSection />
      <LocationsSection />
      <AboutSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
      <ReservationWidget />
    </div>
  );
}
