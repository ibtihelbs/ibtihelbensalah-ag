// pages/Root.tsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ThemeProvider, useTheme } from "../context";

// Inner component that uses the theme
function RootContent() {
  const { isDark } = useTheme();

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

// Main Root component with ThemeProvider
export default function Root() {
  return (
    <ThemeProvider>
      <RootContent />
    </ThemeProvider>
  );
}
