import { useState, useEffect } from "react";
import { useTheme } from "../context";
import {
  getSocialLinks,
  getSiteSettings,
  urlFor,
  type SiteSettings,
  type SocialLink,
} from "../sanity.io";
export default function Footer() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]); // Changed to array
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both site settings and social links in parallel
        const [settingsData, socialData] = await Promise.all([
          getSiteSettings(),
          getSocialLinks(),
        ]);

        setSiteSettings(settingsData);
        setSocialLinks(socialData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) return null;

  const theme = isDark ? "dark" : "light";

  return (
    <footer id="contact">
      <h2 className="text-center">contact</h2>
      <a
        href={`mailto:${
          siteSettings?.email ||
          "&#105;&#98;&#116;&#105;&#104;&#101;&#108;&#46;&#98;&#101;&#110;&#115;&#97;&#108;&#97;&#104;&#64;&#111;&#117;&#116;&#108;&#111;&#111;&#107;&#46;&#102;&#114;"
        }`}
      >
        click to email me
      </a>
      <div className="social-links">
        {socialLinks.map((link: SocialLink, index: number) => (
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
