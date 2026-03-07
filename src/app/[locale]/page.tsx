import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustIndicators from "@/components/TrustIndicators";
import About from "@/components/About";
import Programs from "@/components/Programs";
import HowItWorks from "@/components/HowItWorks";
import StudentVideos from "@/components/StudentVideos";
import Teachers from "@/components/Teachers";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustIndicators />
        <About />
        <Programs />
        <HowItWorks />
        <StudentVideos />
        <Teachers />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
