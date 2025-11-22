"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`hero-header ${scrolled ? "scrolled" : ""}`} data-aos="fade-down">
      <div className="hero-content">
        {/* Logo Section */}
        <div className="logo-container">
          <Link href="/">
            <Image
              src="/Flying Donkeys.png"
              alt="Flying Donkeys Logo"
              width={150}
              height={150}
              className="hero-logo"
              priority
            />
          </Link>
        </div>

        {/* Title Section */}
        <div className="title-container">
          <h1 className="hero-title">Bagomeu</h1>
          <p className="hero-subtitle">Vai dar vôo em São Vicente hoje?</p>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className={`hero-navbar ${scrolled ? "sticky-nav" : ""}`}>
        <div className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="dropdown">
            <div
              className="dropdown-toggle"
              onClick={toggleDropdown}
            >
              Viagens <FaChevronDown size={12} style={{ marginLeft: '4px' }} />
            </div>
            <ul className={`dropdown-menu ${isDropdownOpen ? "block" : ""}`}>
              <li>
                <Link href="/alpes2026" onClick={() => setIsMenuOpen(false)}>
                  Alpes 2026
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/#sobre" onClick={() => setIsMenuOpen(false)}>
              Sobre
            </Link>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        .hero-header {
          background: radial-gradient(circle at top center, rgba(20, 20, 20, 1) 0%, rgba(10, 10, 10, 1) 100%);
          padding-top: 2rem;
          border-bottom: 1px solid var(--glass-border);
          position: relative;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-bottom: 1.5rem;
          text-align: center;
        }

        .logo-container {
          margin-bottom: 1rem;
          transition: transform 0.3s ease;
        }

        .logo-container:hover {
          transform: scale(1.05);
        }

        .hero-logo {
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.2); /* Golden glow */
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(to right, #f4e4c1, #d4af37, #f4e4c1);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          letter-spacing: -2px;
          animation: shine 3s linear infinite;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: var(--text-dim);
          font-weight: 300;
          margin-top: 0.5rem;
          letter-spacing: 1px;
        }

        /* Navigation */
        .hero-navbar {
          display: flex;
          justify-content: center;
          padding: 1rem 0;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .hero-navbar.sticky-nav {
          position: sticky;
          top: 0;
          background: rgba(10, 10, 10, 0.95);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
          padding: 0.8rem 0;
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: 3rem;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .nav-menu a, .dropdown-toggle {
          color: var(--text-dim);
          font-size: 1.1rem;
          font-weight: 500;
          text-decoration: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .nav-menu a:hover, .dropdown-toggle:hover {
          color: var(--accent-gold);
          background: rgba(212, 175, 55, 0.1);
          transform: translateY(-2px);
        }

        /* Dropdown */
        .dropdown {
          position: relative;
        }

        .dropdown-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: #1a1a1a;
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          min-width: 220px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          padding: 0.5rem;
          margin-top: 1rem;
          z-index: 1001;
        }

        .dropdown-menu::before {
          content: '';
          position: absolute;
          top: -0.5rem;
          left: 0;
          width: 100%;
          height: 1rem; /* Bridge gap */
          background: transparent;
        }
        
        /* Triangle pointer for dropdown */
        .dropdown-menu::after {
            content: '';
            position: absolute;
            top: -6px;
            left: 50%;
            transform: translateX(-50%);
            width: 0; 
            height: 0; 
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 6px solid var(--glass-border);
        }

        .dropdown:hover .dropdown-menu {
          display: block;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        .menu-toggle {
          display: none;
          font-size: 1.8rem;
          color: var(--accent-gold);
          cursor: pointer;
          position: absolute;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem; }
          .hero-logo { width: 100px; height: 100px; }
          
          .hero-navbar {
            justify-content: flex-end; /* Align hamburger to right */
            padding: 1rem;
          }

          .menu-toggle { display: block; position: static; transform: none; }

          .nav-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            flex-direction: column;
            background: rgba(15, 15, 15, 0.98);
            padding: 2rem;
            gap: 1.5rem;
            border-bottom: 1px solid var(--glass-border);
            backdrop-filter: blur(20px);
          }

          .nav-menu.active { display: flex; }

          .dropdown-menu {
            position: static;
            transform: none;
            background: rgba(255, 255, 255, 0.03);
            margin-top: 0.5rem;
            width: 100%;
            box-shadow: none;
          }
          
          .dropdown-menu::after { display: none; }
          .dropdown-menu::before { display: none; }
          
          .dropdown-menu.block { display: block; }
        }
      `}</style>
    </header>
  );
}
