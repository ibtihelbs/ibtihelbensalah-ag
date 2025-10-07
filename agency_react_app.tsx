import { useState } from "react";

// Project data
const projects = [
  {
    title: "Bakery Shop",
    image: "https://placehold.co/300x200?text=Bakery+Shop",
    description:
      "A playful bakery website featuring rotating product images, smooth animations, and a sweet shopping experience.",
    link: "https://bakeryshop-peach.vercel.app",
    tags: ["react", "redux", "tailwind", "framer motion"],
  },
  {
    title: "Polarized E-Shop",
    image: "https://placehold.co/300x200?text=E-Shop",
    description:
      "An ecommerce platform blending playful and classic vibes, selling unique, high-quality items.",
    link: "https://polarized.vercel.app",
    tags: ["next.js", "tailwind", "ecommerce"],
  },
  {
    title: "Portfolio Website",
    image: "https://placehold.co/300x200?text=Portfolio",
    description:
      "A sleek, SEO-friendly portfolio with a minimalist design and smooth navigation.",
    link: "https://ibtihelbensalah.vercel.app",
    tags: ["next.js", "seo", "minimal"],
  },
  {
    title: "Country Explorer",
    image: "https://placehold.co/300x200?text=Country+Explorer",
    description:
      "An app to explore countries with search, filters, infinite scroll, and dark mode support.",
    link: "https://countries-explorer.vercel.app",
    tags: ["rest api", "infinite scroll", "dark mode"],
  },
  {
    title: "Wedding Invitations",
    image: "https://placehold.co/300x200?text=Invitations",
    description:
      "Custom watercolor wedding invitations combining illustration and modern design.",
    link: "#",
    tags: ["illustration", "watercolor", "custom design"],
  },
];

const services = [
  {
    title: "Design to Website",
    hover: "Pixel-perfect interface conversion from Figma/Sketch.",
  },
  {
    title: "Web Design & Development",
    hover: "Responsive, modern, and fast websites.",
  },
  {
    title: "Performance Optimization",
    hover: "Boost loading speed and SEO rankings.",
  },
  { title: "CMS Integration", hover: "Easy content management with Sanity." },
  {
    title: "MVP Development",
    hover: "Build your startup idea quickly and effectively.",
  },
];

function Hero() {
  return (
    <section id="hero-section" className="pt-32 pb-20 px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-8">
        i create effective <span className="text-blue-500">yet</span> engaging
        websites
      </h1>
      <button className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition mb-12">
        contact
      </button>
      <img
        src="https://placehold.co/800x400?text=Hero+Illustration"
        alt="Agency hero illustration"
        className="mx-auto max-w-2xl w-full rounded-lg shadow-lg"
      />
    </section>
  );
}

function About() {
  return (
    <section
      id="about-section"
      className="py-20 px-6 text-center bg-gray-50 dark:bg-gray-800"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        grab your people <span className="text-blue-500">and keep</span> them
        around
      </h1>
      <h3 className="text-xl text-gray-600 dark:text-gray-300">
        high performance · responsive · SEO friendly
      </h3>
    </section>
  );
}

function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="services-section" className="py-20 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        What do i provide
      </h1>
      <ul className="max-w-4xl mx-auto space-y-4">
        {services.map((service, index) => (
          <li
            key={index}
            className="text-2xl md:text-3xl font-semibold p-6 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index ? service.hover : service.title}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Work() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <section
      id="work-section"
      className="py-20 px-6 bg-gray-50 dark:bg-gray-800"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
        recent work
      </h1>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {["react", "tailwind", "framer motion", "next.js", "ecommerce"].map(
          (tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
            >
              {tag}
            </span>
          )
        )}
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <img
            src={selectedProject.image}
            alt={selectedProject.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {selectedProject.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ul className="space-y-4">
          {projects.slice(1).map((project, index) => (
            <li
              key={index}
              onClick={() => setSelectedProject(project)}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
            >
              <h4 className="text-xl font-bold mb-3">{project.title}</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(0);

  const plans = [
    {
      name: "Starter",
      price: "$300",
      features: [
        "Up to 3 pages",
        "Responsive design",
        "Basic SEO setup",
        "1 week delivery",
      ],
    },
    {
      name: "Pro",
      price: "$700",
      features: [
        "Up to 7 pages",
        "Custom animations",
        "CMS integration",
        "SEO optimization",
      ],
    },
    {
      name: "Premium",
      price: "$1200",
      features: [
        "Unlimited pages",
        "E-commerce store",
        "Priority support",
        "Advanced performance & SEO",
      ],
    },
  ];

  return (
    <section id="pricing-section" className="py-20 px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
        pricing
      </h1>
      <p className="text-center max-w-3xl mx-auto mb-12 text-lg">
        🎉 Special Offer – Limited until the 1st of each month! 🎉 Book your
        website project before the 1st and enjoy -20% off on any pack. Don't
        miss the chance to launch your modern, responsive site at the best
        price!
      </p>

      <div className="flex justify-center gap-4 mb-8 md:hidden">
        {plans.map((plan, index) => (
          <button
            key={index}
            onClick={() => setSelectedPlan(index)}
            className={`px-6 py-2 rounded-full transition ${
              selectedPlan === index
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            {plan.name}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 ${
              selectedPlan === index ? "block" : "hidden"
            } md:block ${selectedPlan === index ? "ring-4 ring-blue-500" : ""}`}
          >
            <h3 className="text-2xl font-bold mb-6">
              {plan.name} – {plan.price}
            </h3>
            <hr className="mb-6 border-gray-300 dark:border-gray-600" />
            <ul className="space-y-4">
              {plan.features.map((feature, i) => (
                <li key={i}>
                  {feature}
                  {i < plan.features.length - 1 && (
                    <hr className="mt-4 border-gray-300 dark:border-gray-600" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contact"
      className="py-20 px-6 bg-gray-50 dark:bg-gray-800 text-center"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-8">contact</h1>
      <a
        href="mailto:ibtihel.bensalah@outlook.fr"
        className="text-xl text-blue-500 hover:text-blue-600 transition mb-8 inline-block"
      >
        click to email me
      </a>
      <ul className="flex justify-center gap-6">
        <li>
          <a
            href="https://github.com/ibtihelbs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/ibtihel-ben-salah/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/ibtihelfrontend/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors">
        <Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
        <main>
          <Hero />
          <About />
          <Services />
          <Work />
          <Pricing />
        </main>
        <Footer />
      </div>
    </div>
  );
}
