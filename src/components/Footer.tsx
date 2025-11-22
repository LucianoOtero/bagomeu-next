export default function Footer() {
    return (
        <footer className="footer">
            <p className="footer-text">&copy; 2025 Bagomeu - Todos os direitos reservados</p>

            <style jsx>{`
        .footer {
          text-align: center;
          padding: 3rem 1rem;
          margin-top: 4rem;
          border-top: 1px solid var(--glass-border);
          color: var(--text-dim);
        }
        .footer-text {
          font-size: 0.9rem;
          opacity: 0.8;
        }
      `}</style>
        </footer>
    );
}
