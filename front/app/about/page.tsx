"use client";
import Header from "../_featured/header";
import Footer from "../_featured/footer";
import AboutUs from "../_components/AboutUs";
import ScrollAnimatedSection from "../_components/ScrollAnimatedSection";
import TeamSectionPage from "../_components/TeamSectionPage";
import Newsletter from "../_components/Newsletter";
import InstagramSlider from "../_components/InstagramSlider";
export default function AboutPage() {
  return (
    <div>
      <Header />
      <AboutUs/>
      < ScrollAnimatedSection/>
      <TeamSectionPage/>
      <Newsletter/>
      <InstagramSlider/>
      <Footer />
    </div>
  );
}
