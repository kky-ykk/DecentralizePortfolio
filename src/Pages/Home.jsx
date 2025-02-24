import React from "react";
import Navbar from "../components/Navbar";
import PortfolioDetails from "../components/PortfolioDetails";
import Projects from "../components/Projects";
import Education from "../components/Education";
import Footer from "../components/footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <section id="about" className="section">
          <div className="container">
            <PortfolioDetails />
          </div>
        </section>
        
        <section id="projects" className="section" style={{backgroundColor: "#f0f4f8"}}>
          <div className="container">
            <h2 className="section-title">My Projects</h2>
            <Projects />
          </div>
        </section>
        
        <section id="education" className="section">
          <div className="container">
            <h2 className="section-title">Education & Qualifications</h2>
            <Education />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
