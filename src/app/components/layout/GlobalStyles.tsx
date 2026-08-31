export default function GlobalStyles() {
  return (
    <style>{`
  * { cursor: none !important; }
  ::-webkit-scrollbar { display: none; }
  html, body { scrollbar-width: none; overflow: hidden; }

  .hero-section,
  .hero-photo-clip {
    height: 100vh;
    height: 100dvh;
  }

  .hero-photo {
    height: min(820px, 96vh);
    height: min(820px, 96dvh);
  }

  .h-viewport {
    height: 100vh;
    height: 100dvh;
  }

  @media (max-width: 768px) {
  .mobile-hidden {
    display: none !important;
  }

  .fixed.top-0.left-0.z-\\[9999\\] {
    display: none !important;
  }

  * {
    cursor: auto !important;
  }

  .hero-container {
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    border-radius: 0 !important;
  }

  .hero-container canvas {
    height: 54% !important;
    bottom: -4% !important;
  }

  .hero-content {
    left: 8% !important;
    bottom: 60% !important;
  }

  .hero-photo {
    right: -12% !important;
    width: min(440px, 85vw) !important;
    height: min(500px, 96vh) !important;
    height: min(500px, 96dvh) !important;
    bottom: -9px !important;
  }

  .hero-photo div {
    background-position: 55% center !important;
  }

  .hero-info-box {
    right: 0 !important;
    bottom: 0 !important;
    width: min(210px, 52vw) !important;
    padding: 16px !important;
  }

  .hero-title {
    font-size: clamp(40px, 12vw, 80px) !important;
  }

  .hero-subtitle {
    font-size: clamp(16px, 3vw, 30px) !important;
    margin-bottom: clamp(10px, 3vh, 40px) !important;
    margin-left: 5px !important;
  }

  .logo-text {
    font-size: 22px !important;
    letter-spacing: 0.2em !important;
  }

  .menu-button {
    top: 20px !important;
    right: 20px !important;
    gap: 8px !important;
    padding: 4px !important;
  }

  .menu-line {
    height: 2.5px !important;
  }

  .menu-line:first-child,
  .menu-line:last-child {
    width: 32px !important;
  }

  .menu-line:nth-child(2) {
    width: 24px !important;
  }
}
`}</style>
  );
}