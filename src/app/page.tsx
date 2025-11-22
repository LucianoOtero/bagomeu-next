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
            <FaCloudSun className="mr-2" /> Condições Atuais - São Vicente
          </h2>
          <WeatherWidget />
        </section>

        {/* Video Section */}
        <section className="content-section" data-aos="fade-up" data-aos-delay="100">
          <h2 className="section-title">
            <FaVideo className="mr-2" /> Transmissão ao Vivo
          </h2>
          <div className="video-container">
            <VideoPlayer src="https://camera.clubecvllp.com.br/cam1/index.m3u8" />
          </div>
          <p className="text-sm text-gray-400 mt-2 text-center">
            * Transmissão ao vivo da rampa de voo livre.
          </p>
        </section>

        {/* About Section */}
        <section id="sobre" className="content-section" data-aos="fade-up" data-aos-delay="200">
          <h2 className="section-title">
            <FaInfoCircle className="mr-2" /> Sobre o Bagomeu
          </h2>
          <p className="text-center text-lg leading-relaxed text-[var(--text-dim)]">
            Ao invés de só quererem ficar voando, vão trabalhar, <span className="golden-accent">cambada de vagabundos</span>,
            <span className="brown-accent">desocupados</span> e <span className="golden-accent">ordinários</span>!
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
