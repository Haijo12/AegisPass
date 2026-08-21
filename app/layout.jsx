import './globals.css';

export const metadata = {
  title: 'AegisPass | Compliance & Security Intelligence Suite',
  description: 'Automated compliance logging, zero-knowledge key generation, and accredited auditor network.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body class="min-h-screen bg-brand-bg text-slate-100 antialiased">
        <nav class="border-b border-brand-border bg-brand-card/50 backdrop-blur-md sticky top-0 z-50">
          <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <span class="text-xl font-bold tracking-tight text-white">AEGIS<span class="text-brand-cyan">PASS</span></span>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 font-mono">v2.0 Enterprise</span>
            </div>
            <div class="flex space-x-6 text-sm font-medium text-slate-400">
              <a href="/" class="hover:text-brand-cyan transition-colors">Audit Console</a>
              <a href="/compliance/hipaa" class="hover:text-brand-cyan transition-colors">HIPAA</a>
              <a href="/compliance/soc2" class="hover:text-brand-cyan transition-colors">SOC2</a>
              <a href="/compliance/gdpr" class="hover:text-brand-cyan transition-colors">GDPR</a>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
