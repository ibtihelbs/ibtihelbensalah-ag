import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Work from "./components/Work";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";

export default function App() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const body = document.querySelector("body");
    if (isDark) {
      body?.classList.remove("light");
    } else {
      body?.classList.add("light");
    }
  }, [isDark]);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <Header isDark={isDark} setIsDark={setIsDark} />
        <main>
          <Hero />
          <Services />
          <Work isDark={isDark} />
          <Pricing />
        </main>
        <Footer isDark={isDark} />
      </div>
    </div>
  );
}
