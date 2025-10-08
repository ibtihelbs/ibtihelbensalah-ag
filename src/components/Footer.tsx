export default function Footer({ isDark }: { isDark: boolean }) {
  const getIconSrc = (icon: string) => {
    return isDark
      ? `./images/icons/${icon}.svg`
      : `./images/icons/${icon}-dark.svg`;
  };

  return (
    <footer id="contact">
      <h1 className="text-center">contact</h1>
      <a href="mailto:&#105;&#98;&#116;&#105;&#104;&#101;&#108;&#46;&#98;&#101;&#110;&#115;&#97;&#108;&#97;&#104;&#64;&#111;&#117;&#116;&#108;&#111;&#111;&#107;&#46;&#102;&#114;">
        click to email me
      </a>

      <ul>
        <li>
          <a
            href="https://github.com/ibtihelbs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={getIconSrc("brand-github")} alt="GitHub" />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/ibtihel-ben-salah/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={getIconSrc("brand-linkedin")} alt="LinkedIn" />
          </a>
        </li>
        <li>
          <a
            href="https://www.instagram.com/ibtihelfrontend/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={getIconSrc("brand-instagram")} alt="Instagram" />
          </a>
        </li>
      </ul>
    </footer>
  );
}
