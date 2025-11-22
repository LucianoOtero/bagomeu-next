"use client";

import { useEffect } from "react";
import AOS from "aos";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WeatherWidget from "@/components/WeatherWidget";
import VideoPlayer from "@/components/VideoPlayer";
import { FaCloudSun, FaVideo, FaInfoCircle } from "react-icons/fa";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      <Header />

      <main className="main-content">
        {/* Weather Widget Section */}
        <section className="content-section" data-aos="fade-up">
          <h2 className="section-title">
            <FaCloudSun className="icon" /> Condições Atuais - São Vicente
          </h2>
          <WeatherWidget />
        </section>

        {/* Video Section */}
        <section className="content-section" data-aos="fade-up" data-aos-delay="100">
          <h2 className="section-title">
            <FaVideo className="icon" /> Transmissão ao Vivo
          </h2>
          <div className="video-container">
            <VideoPlayer src="https://camera.clubecvllp.com.br/cam1/index.m3u8" />
          </div>
          <p className="video-caption">
            * Transmissão ao vivo da rampa de voo livre.
          </p>
        </section>

        {/* About Section */}
        <section id="sobre" className="content-section" data-aos="fade-up" data-aos-delay="200">
          <h2 className="section-title">
            <FaInfoCircle className="icon" /> Sobre o Bagomeu
          </h2>
          <p className="about-text">
            Ao invés de só quererem ficar voando, vão trabalhar, <span className="golden-accent">cambada de vagabundos</span>,
            <span className="brown-accent">desocupados</span> e <span className="golden-accent">ordinários</span>!
          </p>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .main-content {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        .content-section {
            margin-bottom: 3rem;
        }
        .section-title {
            font-size: 2rem;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            color: var(--accent-gold);
        }
        /* Target the icon specifically if needed, or use global class */
        :global(.icon) {
            margin-right: 0.5rem;
        }
        
        .video-caption {
            font-size: 0.875rem;
            color: #9ca3af; /* text-gray-400 */
            margin-top: 0.5rem;
            text-align: center;
        }

        .about-text {
            text-align: center;
            font-size: 1.125rem;
            line-height: 1.625;
            color: var(--text-dim);
        }

        .golden-accent {
            color: var(--accent-gold);
            font-weight: bold;
        }
        
        .brown-accent {
            color: #d59563;
            font-weight: bold;
        }

        @media (max-width: 768px) {
            .section-title {
                font-size: 1.5rem;
                justify-content: center;
                text-align: center;
                flex-direction: column;
                gap: 0.5rem;
            }
            
            :global(.icon) {
                margin-right: 0;
                margin-bottom: 0.25rem;
            }
        }
      `}</style>
    </>
  );
}
