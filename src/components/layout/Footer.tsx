import { Link } from "react-router-dom";
import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img src="/full logo.png" alt="INVIQ" className="h-14 w-auto logo-adaptive" />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              INVIQ. Building transformative software products that drive sustainable growth and a smarter world.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/share/1DbzAbHH8u/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="INVIQ on Facebook"
                className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300"
              >
                <Facebook size={16} className="text-primary" aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/inviq-private-limited/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="INVIQ on LinkedIn"
                className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors duration-300"
              >
                <Linkedin size={16} className="text-primary" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Showcases", path: "/showcases" },
                { name: "Our Team", path: "/team" },
                { name: "Contact Us", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground">Services</h4>
            <ul className="space-y-3">
              {["Custom Software", "Web Development", "Mobile Apps", "AI Automations", "Game Development", "Showcases"].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={16} className="text-primary" />
                <span>inviqprivatelimited@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={16} className="text-primary" />
                <span>+94 76 050 3617</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={16} className="text-primary mt-0.5" />
                <span>Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} INVIQ. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/share/1DbzAbHH8u/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Facebook size={14} />
              Facebook
            </a>
            <a
              href="https://www.linkedin.com/company/inviq-private-limited/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
