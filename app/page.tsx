import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Process from "./components/Process";
import WhyChooseUs from "./components/WhyChooseUs";
import FAQ from "./components/Faq";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="process">
        <Process />
      </div>
      <div id="why-choose-us">
        <WhyChooseUs />
      </div>
      <div id="faq">
        <FAQ />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      {/* <Testimonials /> */}
      <div id="contact">
        <Footer />
      </div>
    </>
  );
}
