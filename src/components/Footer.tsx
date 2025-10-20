import { useState, useEffect } from "react";
import { getSiteSettings, urlFor, type SiteSettings } from "../sanity.io";

export default function Footer({ isDark = false }: { isDark?: boolean }) {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const data = await getSiteSettings();
        setSiteSettings(data);
      } catch (error) {
        console.error("Error fetching site settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteSettings();
  }, []);

  if (loading) return null;

  const theme = isDark ? "dark" : "light";

  return (
    <footer id="contact">
      <h1 className="text-center">contact</h1>
      <a
        href={`mailto:${
          siteSettings?.email ||
          "&#105;&#98;&#116;&#105;&#104;&#101;&#108;&#46;&#98;&#101;&#110;&#115;&#97;&#108;&#97;&#104;&#64;&#111;&#117;&#116;&#108;&#111;&#111;&#107;&#46;&#102;&#114;"
        }`}
      >
        click to email me
      </a>
      <div className="social-links ">
        {siteSettings?.socialLinks?.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label={link.altText || link.platform}
          >
            {link[`${theme}Icon`] ? (
              <img
                src={urlFor(link[`${theme}Icon`]).url()}
                alt={link.altText || link.platform}
                className="social-icon"
              />
            ) : (
              <span>{link.platform}</span>
            )}
          </a>
        ))}
      </div>
    </footer>
  );
}
