import { ArrowUpRight, Github, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#about-section" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "Email", href: "mailto:findmydevice1731@gmail.com", icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "Instagram", href: "https://www.instagram.com", icon: Instagram },
];

const scrollToSection = (href: string) => {
  const section = document.querySelector(href);

  if (section instanceof HTMLElement) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030712] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(195,228,29,0.10),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.10),transparent_28%)]" />
      <div className="absolute left-10 top-12 h-32 w-32 rounded-full bg-[#C7A872]/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="space-y-4">
              <p
                className="text-sm uppercase tracking-[0.35em] text-[#C3E41D]"
                style={{ fontFamily: "'Fira Code', monospace" }}
              >
                CJ Devs
              </p>
              <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-white md:text-5xl">
                Building polished interfaces that feel fast, clear, and human.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                Frontend-focused portfolio work, modern UI craft, and responsive
                web experiences designed to leave a strong first impression.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/919027344392"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#C3E41D] px-5 py-3 text-sm font-semibold text-[#08101d] transition-transform hover:scale-[1.02]"
              >
                Start a Conversation
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+919027344392"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-[#C7A872]/40 hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-[#C7A872]" />
                +91 9027344392
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                Explore
              </h3>
              <div className="space-y-3">
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-lg text-slate-200 transition-colors hover:text-[#C3E41D]"
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">
                Connect
              </h3>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-center gap-3 text-lg text-slate-200 transition-colors hover:text-[#C3E41D]"
                  >
                    <link.icon className="h-4 w-4 text-[#C7A872]" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} CJ Devs. Crafted with code and intention.</p>
          <button
            type="button"
            className="w-fit text-left text-slate-300 transition-colors hover:text-[#C3E41D]"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
