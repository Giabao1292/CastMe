import {
  Apple,
  Check,
  Facebook,
  Instagram,
  Linkedin,
  Smartphone,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router";
import { Container } from "react-bootstrap";
import "../../../styles/footer.css";

const footerColumns = [
  ["About us", "Feedback", "Trust, safety & security"],
  ["Help & support", "Membership plans", "Buy Hearts", "Terms of service"],
  [
    "Privacy policy",
    "CA notice at collection",
    "Your privacy choices",
    "Accessibility",
  ],
  ["Desktop app", "Cookie policy", "Enterprise solutions", "Release notes"],
] as const;

const socialItems = [
  { label: "Facebook", Icon: Facebook },
  { label: "LinkedIn", Icon: Linkedin },
  { label: "X", Icon: Twitter },
  { label: "YouTube", Icon: Youtube },
  { label: "Instagram", Icon: Instagram },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerPathMap: Record<string, string> = {
    "Membership plans": "/membership-plans",
    "Buy Hearts": "/buy-hearts",
  };

  return (
    <div className="castme-footer-wrap">
      <footer className="castme-footer" aria-label="Site footer">
        <Container fluid className="castme-footer-inner">
          <section className="castme-footer-columns" aria-label="Footer links">
            {footerColumns.map((column, index) => (
              <ul key={index} className="castme-footer-column">
                {column.map((item) => (
                  <li key={item}>
                    {footerPathMap[item] ? (
                      <Link to={footerPathMap[item]}>
                        {item}
                        {item === "Your privacy choices" && (
                          <span
                            className="castme-privacy-badge"
                            aria-label="Privacy choices enabled"
                          >
                            <Check size={10} />
                          </span>
                        )}
                      </Link>
                    ) : (
                      <a href="#" onClick={(event) => event.preventDefault()}>
                        {item}
                        {item === "Your privacy choices" && (
                          <span
                            className="castme-privacy-badge"
                            aria-label="Privacy choices enabled"
                          >
                            <Check size={10} />
                          </span>
                        )}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ))}
          </section>

          <section
            className="castme-footer-social-row"
            aria-label="Social and app links"
          >
            <div className="castme-footer-social-group">
              <span>Follow us</span>
              <div className="castme-footer-social-icons">
                {socialItems.map((item) => (
                  <a
                    key={item.label}
                    href="#"
                    aria-label={item.label}
                    onClick={(event) => event.preventDefault()}
                  >
                    <item.Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="castme-footer-mobile-group">
              <span>Mobile app</span>
              <a
                href="#"
                aria-label="Apple App Store"
                onClick={(event) => event.preventDefault()}
              >
                <Apple size={18} />
              </a>
              <a
                href="#"
                aria-label="Android app"
                onClick={(event) => event.preventDefault()}
              >
                <Smartphone size={18} />
              </a>
            </div>
          </section>

          <section
            className="castme-footer-legal"
            aria-label="Legal information"
          >
            <span>© 2015 - {currentYear} CastMe Global LLC</span>
          </section>
        </Container>
      </footer>
    </div>
  );
}
