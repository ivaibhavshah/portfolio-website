import portfolio from "../../data/portfolio";
import ScrollReveal from "../../components/ScrollReveal";
import Link from "next/link";

export const metadata = {
  title: `Privacy Policy | ${portfolio.personal.name}`,
  description: `Privacy Policy for applications developed by ${portfolio.personal.name}.`,
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <AnimatedBackdrop />
      <nav className="fixed top-0 inset-x-0 z-50">
        <div className="flex h-12 w-full items-center justify-between border-b border-slate-800/60 bg-slate-950/70 px-4 shadow-lg backdrop-blur sm:px-6">
          <Link href="/" className="text-sm font-semibold tracking-wide text-cyan-200 flex items-center gap-2">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 10H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 15L5 10L10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Portfolio
          </Link>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Legal Document</div>
        </div>
      </nav>

      <main className="relative mx-auto max-w-4xl px-6 pb-24 pt-32 sm:px-10">
        <ScrollReveal variant="up" className="space-y-12">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">Trust & Transparency</span>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">Privacy Policy</h1>
            <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="prose prose-invert prose-slate max-w-none space-y-10">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-100">1. Introduction</h2>
              <p className="text-slate-300 leading-relaxed">
                This Privacy Policy describes how your personal information is collected, used, and shared when you use applications developed by <strong>{portfolio.personal.name}</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). We are committed to protecting your privacy and ensuring a secure experience.
              </p>
            </section>

            <section className="space-y-4 border-l-2 border-cyan-500/30 pl-6">
              <h2 className="text-2xl font-semibold text-slate-100">2. Information We Collect</h2>
              <p className="text-slate-300 leading-relaxed">
                Most of our applications are designed to respect your privacy and typically do not collect personally identifiable information (PII) unless explicitly stated. However, depending on the application, we may collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li><strong>Usage Data:</strong> Information about how you interact with our apps (e.g., features used, time spent).</li>
                <li><strong>Device Information:</strong> Model, OS version, and unique device identifiers for crash reporting and performance monitoring.</li>
                <li><strong>User-provided Data:</strong> Information you voluntarily provide (e.g., feedback, account registration details).</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-100">3. How We Use Your Information</h2>
              <p className="text-slate-300 leading-relaxed">
                The information we collect is used solely to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-300">
                <li>Provide, operate, and maintain our applications.</li>
                <li>Improve and personalize your experience.</li>
                <li>Understand and analyze how you use our apps.</li>
                <li>Develop new products, services, features, and functionality.</li>
                <li>Communicate with you for customer support or updates.</li>
              </ul>
            </section>

            <section className="space-y-4 border-l-2 border-emerald-500/30 pl-6">
              <h2 className="text-2xl font-semibold text-slate-100">4. Third-Party Services</h2>
              <p className="text-slate-300 leading-relaxed">
                We may use third-party services that collect information used to identify you. These may include:
              </p>
              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                {[
                  { name: "Google Play Services", purpose: "App distribution & Analytics" },
                  { name: "Firebase", purpose: "Analytics, Crashlytics & Hosting" },
                  { name: "Expo", purpose: "Application Framework" },
                  { name: "Sentry", purpose: "Error Monitoring" }
                ].map((service) => (
                  <div key={service.name} className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                    <div className="font-semibold text-cyan-100">{service.name}</div>
                    <div className="text-xs text-slate-400 mt-1">{service.purpose}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-100">5. Data Retention</h2>
              <p className="text-slate-300 leading-relaxed">
                We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-100">6. Security</h2>
              <p className="text-slate-300 leading-relaxed">
                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>
            </section>

            <section className="rounded-3xl border border-cyan-400/40 bg-slate-900/40 p-8 shadow-2xl">
              <h2 className="text-2xl font-semibold text-slate-100">7. Contact Us</h2>
              <p className="text-slate-300 leading-relaxed">
                If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at:
              </p>
              <div className="mt-6">
                <a href={`mailto:${portfolio.personal.email}`} className="inline-flex items-center gap-3 rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  {portfolio.personal.email}
                </a>
              </div>
            </section>
          </div>
        </ScrollReveal>
      </main>

      <footer className="border-t border-slate-800/60 bg-slate-950/80 py-12 backdrop-blur">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {portfolio.personal.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function AnimatedBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.1),transparent_70%)]" />
      <div className="absolute top-0 right-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] translate-y-1/2 -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />
    </div>
  );
}
