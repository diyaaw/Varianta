const footerLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Shipping", href: "#" },
  { label: "Contact", href: "#" },
];

export default function ConfiguratorFooter() {
  return (
    <footer className="bg-white border-t border-gray-100 py-6 px-6 sm:px-8">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-extrabold text-base text-gray-900 tracking-tight">
          Varianta
        </span>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <span className="text-xs text-gray-400 text-center sm:text-right">
          © 2024 Varianta Design Systems.
        </span>
      </div>
    </footer>
  );
}
