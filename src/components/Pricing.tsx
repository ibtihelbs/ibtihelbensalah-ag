import { useState } from "react";

export default function Pricing() {
  const [currentPricingIndex, setCurrentPricingIndex] = useState(0);

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
    <section id="pricing-section">
      <h1 className="text-center">pricing</h1>
      <p className="text-center">
        🎉 Special Offer – Limited until the 1st of each month! 🎉 Book your
        website project before the 1st and enjoy -20% off on any pack. Don't
        miss the chance to launch your modern, responsive site at the best
        price!
      </p>
      <div className="mobile-pricing text-center">
        {plans.map((plan, index) => (
          <button
            key={index}
            className={`pill ${
              currentPricingIndex === index ? "current-offer" : ""
            }`}
            onClick={() => setCurrentPricingIndex(index)}
          >
            {plan.name}
          </button>
        ))}
      </div>
      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-card ${
              currentPricingIndex === index ? "current" : ""
            }`}
          >
            <h3>
              {plan.name} – {plan.price}
            </h3>
            <hr />
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>
                  {feature}
                  {i < plan.features.length - 1 && <hr />}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
