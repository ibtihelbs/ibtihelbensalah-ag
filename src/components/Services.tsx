import { useState, useEffect } from "react";
import { getServices, type Service, urlFor } from "../sanity.io";
import { useTheme } from "../context";
export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        const data = await getServices();
        // Sort services by order if needed
        const sortedServices = data.sort(
          (a, b) => (a.order || 0) - (b.order || 0)
        );
        setServices(sortedServices);
      } catch (err) {
        setError("Failed to load services");
        console.error("Error loading services:", err);
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  if (loading) {
    return (
      <section id="services-section" className="services-section">
        <h1 className="text-center">What do I provide</h1>
        <p className="text-center">Loading services...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section id="services-section" className="services-section">
        <h1 className="text-center">What do I provide</h1>
        <p className="text-center error">{error}</p>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section id="services-section" className="services-section">
        <h1 className="text-center">What do I provide</h1>
        <p className="text-center">No services available at the moment.</p>
      </section>
    );
  }

  return (
    <section id="services-section" className="services-section">
      <h1 className="text-center">What do I provide</h1>

      <ul className="services-list">
        {services.map((service: Service, index: number) => (
          <li
            key={service._id}
            className={`service-item ${
              hoveredIndex === index ? "hovered" : ""
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="service-content">
              {/* Icon Container */}
              <div className="service-icon">
                {service.iconLight && (
                  <img
                    src={
                      isDark
                        ? urlFor(service.iconLight).url()
                        : urlFor(service.iconDark).url()
                    }
                    alt={service.iconDescription || service.title}
                    className="icon-image"
                  />
                )}
              </div>

              {/* Text Content */}
              <div className="service-text">
                {hoveredIndex === index ? (
                  <div className="service-description">
                    {service.description}
                  </div>
                ) : (
                  <div className="service-title">{service.title}</div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
