import { useState } from "react";
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

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="services-section">
      <h1 className="text-center">What do i provide</h1>
      <ul>
        {services.map((service, index) => (
          <li
            key={index}
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
