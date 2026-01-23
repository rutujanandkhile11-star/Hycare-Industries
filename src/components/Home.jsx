import { useEffect } from "react";
import "./Home.css";

// Sections
import About from "./About";
import Stats from "./Stats";
import Services from "./Services";
import Partners from "./Partners";
import PartnershipSection from "./Partnership/PartnershipSection";
import HomePhotoSection from "./HomePhotoSection";
import FAQComponent from "./FAQComponent";

// Store (CASE SENSITIVE ✔️)
import photoStore from "../photoStore";


// Assets
import homeVideo from "../assets/video/homevideo.mp4";

const Home = () => {

  // Load localStorage data only in browser
  useEffect(() => {
    photoStore.load();
  }, []);

  return (
    <>
      {/* HERO VIDEO SECTION */}
      <section className="hero-video-section">
        <div className="hero-overlay"></div>

        <h1 className="hero-title">
          HYCARE <span>INDUSTRIES</span>
        </h1>

        <div className="full-video-box">
          <video
            className="full-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={homeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* OTHER SECTIONS */}
      <About />
      <Stats />
      <Services />
      <Partners />
      <HomePhotoSection photos={photoStore.photos} />
      <PartnershipSection />
      <FAQComponent />
    </>
  );
};

export default Home;
