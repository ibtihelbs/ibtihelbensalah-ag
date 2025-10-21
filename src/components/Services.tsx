import { useState, useEffect } from "react";
import { getServices, type Service } from "../sanity.io";

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  useEffect(() => {
    async function loadPricingPlans() {
      const data = await getServices();
      setServices(data);
      setLoading(false);
    }
    loadPricingPlans();
  }, []);
  if (loading) {
    return (
      <section id="services-section">
        <h1 className="text-center">What do i provide</h1>

        <p className="text-center">Loading services...</p>
      </section>
    );
  }
  return (
    <section id="services-section">
      <h1 className="text-center">What do i provide</h1>
      <ul>
        {services.map((service: Service, index: any) => (
          <li
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index ? service.description : service.title}
          </li>
        ))}
      </ul>
    </section>
  );
}
