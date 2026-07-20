import { Download } from "./components/Download";
import { Ecosystem } from "./components/Ecosystem";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Principles } from "./components/Principles";

export function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Principles />
        <Download />
        <Ecosystem />
      </main>
      <Footer />
    </>
  );
}

