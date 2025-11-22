"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="new-header" data-aos="fade-down">
      <nav className="header-navbar">
        <div className="nav-logo">
          <Link href="/">
            <Image
              src="/Flying Donkeys.png"
              alt="Flying Donkeys Logo"
              width={50}
              height={50}
              className="nav-logo-img"
            />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li className="dropdown">
            <div
              className="dropdown-toggle flex items-center gap-1 cursor-pointer"
              onClick={toggleDropdown}
            >
              Viagens <FaChevronDown size={12} />
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

        <div className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </nav>

      <div className="header-content">
        <div className="header-text">
          <h1 className="header-title">Bagomeu</h1>
          <p className="header-subtitle">Vai dar vôo em São Vicente hoje?</p>
        </div>
      </div>

      <style jsx>{`
        .header-navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: rgba(18, 18, 18, 0.8);
          backdrop-filter: blur(10px);
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid var(--glass-border);
        }

        .nav-logo-img {
          border-radius: 8px;
          transition: var(--transition);
        }

        .nav-logo-img:hover {
          transform: scale(1.05);
          filter: brightness(1.2);
        }

        .nav-menu {
          display: flex;
          list-style: none;
          gap: 2rem;
          align-items: center;
        }

        .nav-menu a, .dropdown-toggle {
          color: var(--text-dim);
          font-size: 1rem;
          font-weight: 500;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: var(--transition);
        }

        .nav-menu a:hover, .dropdown-toggle:hover {
          color: var(--accent-gold);
          background: rgba(212, 175, 55, 0.05);
        }

        .dropdown {
          position: relative;
        }

        .dropdown-menu {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background: var(--secondary-dark);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          min-width: 200px;
          box-shadow: var(--shadow-lg);
          padding: 0.5rem;
          margin-top: 0.5rem;
        }

        /* Bridge the gap for hover stability */
        .dropdown-menu::before {
          content: '';
          position: absolute;
          top: -0.5rem;
          left: 0;
          width: 100%;
          height: 0.5rem;
          background: transparent;
        }

        .dropdown:hover .dropdown-menu {
          display: block;
        }

        .menu-toggle {
          display: none;
          font-size: 1.5rem;
          color: var(--accent-gold);
          cursor: pointer;
        }

        .new-header {
          text-align: center;
          padding-bottom: 2rem;
          background: radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
        }

        .header-title {
          font-size: 4rem;
          background: linear-gradient(to right, #f4e4c1, #d4af37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
          letter-spacing: -1px;
          margin-top: 2rem;
        }

        .header-subtitle {
          font-size: 1.25rem;
          color: var(--text-dim);
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .header-navbar { padding: 1rem; }
          .menu-toggle { display: block; }
          
          .nav-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            flex-direction: column;
            background: var(--secondary-dark);
            padding: 1rem;
            gap: 0.5rem;
            border-bottom: 1px solid var(--glass-border);
          }

          .nav-menu.active { display: flex; }
          
          .dropdown-menu {
            position: static;
            display: none;
            width: 100%;
            background: rgba(0,0,0,0.2);
            box-shadow: none;
            margin-top: 0;
          }
          
          /* Remove bridge on mobile as it's not needed and might cause issues */
          .dropdown-menu::before {
            display: none;
          }
          
          .dropdown-menu.block { display: block; }
          
          .header-title { font-size: 2.5rem; }
        }
      `}</style>
    </header>
  );
}
