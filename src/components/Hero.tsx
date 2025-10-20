import { useEffect, useState } from "react";
import { getSiteSettings, urlFor } from "../sanity.io";

interface SiteSettings {
  heroHeadline: string;
  heroImage?: any;
  email?: string;
  about?: {
    heading?: string;
    description?: string;
    image?: any;
    features?: Array<{ text: string }>;
  };
}

export default function HeroAndAbout() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSiteSettings();
        setSiteSettings(data);
      } catch (error) {
        console.error("Error fetching site settings:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const parseHeadline = (text: string) => {
    if (!text) return null;

    const parts = text.split(/(\*[^*]+\*)/);

    return parts.map((part, index) => {
      if (part.startsWith("*") && part.endsWith("*")) {
        const styledText = part.slice(1, -1);
        return (
          <span key={index} style={{ fontStyle: "italic" }}>
            {styledText}
          </span>
        );
      }
      return part || null;
    });
  };

  if (loading) return <div>Loading...</div>;

  const heroHeadline = siteSettings?.heroHeadline;
  const heroImage = siteSettings?.heroImage
    ? urlFor(siteSettings.heroImage).url()
    : null;
  const email = siteSettings?.email;
  const about = siteSettings?.about;

  return (
    <>
      <section id="hero-section">
        <h1 className="text-center">
          {heroHeadline ? parseHeadline(heroHeadline) : "Loading..."}
        </h1>
        <a className="pill cta" href={`mailto:${email}`}>
          let's talk
        </a>
        {heroImage && (
          <img
            src={urlFor(heroImage)
              .width(window.innerWidth > 768 ? 800 : 500)
              .format("webp")
              .url()}
            alt="Agency hero illustration"
            width={window.innerWidth > 768 ? 800 : 500}
            height={window.innerWidth > 768 ? 662 : 414}
          />
        )}
      </section>

      <section id="about-section">
        <h1 className="text-center">
          {about?.heading ? parseHeadline(about.heading) : "Loading..."}
        </h1>
        <h3 className="text-center">
          {about?.features && about.features.length > 0 ? (
            about.features.map((feature, index) => (
              <span key={index}>
                {feature.text}
                {index < about?.features!.length - 1 ? " · " : ""}
              </span>
            ))
          ) : (
            <>high performance · responsive · SEO friendly</>
          )}
        </h3>
        {about?.description && (
          <p className="text-center">{about.description}</p>
        )}
        {about?.image && (
          <img
            loading="lazy"
            src={urlFor(about.image).url()}
            alt="About section illustration"
          />
        )}
      </section>
    </>
  );
}
