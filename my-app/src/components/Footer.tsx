const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "Contact", href: "#" },
];

interface FooterProps {
  tagline?: string;
}

export default function Footer({
  tagline = "© 2024 Varianta Technologies. All rights reserved.",
}: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-6 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-extrabold text-lg text-gray-900 tracking-tight">
            Varianta
          </span>
          <span className="text-xs text-gray-400">{tagline}</span>
        </div>

        {/* Links */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
