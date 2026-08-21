'use client';
import { useState, useEffect } from 'react';
import { ShieldCheck, Key, Building2, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const [passLength, setPassLength] = useState(16);
  const [generatedKey, setGeneratedKey] = useState('');
  const [auditScore, setAuditScore] = useState(85);

  const generateCryptoKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|';
    const array = new Uint32Array(passLength);
    window.crypto.getRandomValues(array);
    let key = '';
    for (let i = 0; i < passLength; i++) {
      key += chars[array[i] % chars.length];
    }
    setGeneratedKey(key);
  };

  useEffect(() => {
    generateCryptoKey();
  }, [passLength]);

  return (
    <main class="max-w-7xl mx-auto px-6 py-10 space-y-10">
      <header class="space-y-2">
        <h1 class="text-3xl font-extrabold tracking-tight">Compliance & Security Operations</h1>
        <p class="text-slate-400 text-sm">Real-time organizational compliance status and client-side encryption controls.</p>
      </header>

      {/* Metrics Row */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-brand-card border border-brand-border rounded-xl p-6 space-y-2">
          <div class="flex justify-between items-center text-slate-400 text-sm font-medium">
            <span>Overall Readiness Score</span>
            <ShieldCheck class="w-5 h-5 text-brand-emerald" />
          </div>
          <div class="text-3xl font-bold text-white">{auditScore}%</div>
          <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div class="bg-brand-emerald h-full" style={{ width: `${auditScore}%` }}></div>
          </div>
        </div>

        <div class="bg-brand-card border border-brand-border rounded-xl p-6 space-y-2">
          <div class="flex justify-between items-center text-slate-400 text-sm font-medium">
            <span>Pending Control Audits</span>
            <AlertTriangle class="w-5 h-5 text-brand-amber" />
          </div>
          <div class="text-3xl font-bold text-white">3 Action Items</div>
          <p class="text-xs text-slate-500">Requires accredited vendor review</p>
        </div>

        <div class="bg-brand-card border border-brand-border rounded-xl p-6 space-y-2">
          <div class="flex justify-between items-center text-slate-400 text-sm font-medium">
            <span>Verified Partners</span>
            <Building2 class="w-5 h-5 text-brand-cyan" />
          </div>
          <div class="text-3xl font-bold text-white">12 Available</div>
          <p class="text-xs text-slate-500">Regional auditing & legal support</p>
        </div>
      </div>

      {/* Main Dual Console Layout */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Micro-SaaS Engine */}
        <section class="bg-brand-card border border-brand-border rounded-xl p-6 space-y-6">
          <div class="flex items-center space-x-3 border-b border-slate-800 pb-4">
            <Key class="w-5 h-5 text-brand-cyan" />
            <h2 class="font-bold text-lg">Zero-Knowledge Key Generator</h2>
          </div>

          <div class="space-y-4">
            <div>
              <label class="text-xs font-semibold uppercase tracking-wider text-slate-400">Master Cryptographic Key</label>
              <div class="flex mt-2 gap-2">
                <input
                  type="text"
                  readOnly
                  value={generatedKey}
                  class="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 font-mono text-brand-cyan text-sm focus:outline-none"
                />
                <button
                  onClick={generateCryptoKey}
                  class="bg-brand-cyan text-black font-bold px-4 py-2.5 rounded-lg text-sm hover:opacity-90 transition-opacity"
                >
                  Generate
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-slate-400">Length</span>
                <span class="font-mono text-brand-cyan">{passLength} bits</span>
              </div>
              <input
                type="range"
                min="12"
                max="64"
                value={passLength}
                onChange={(e) => setPassLength(Number(e.target.value))}
                class="w-full accent-brand-cyan cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* Audit Directory Preview */}
        <section class="bg-brand-card border border-brand-border rounded-xl p-6 space-y-6">
          <div class="flex items-center space-x-3 border-b border-slate-800 pb-4">
            <CheckCircle2 class="w-5 h-5 text-brand-emerald" />
            <h2 class="font-bold text-lg">Active Compliance Frameworks</h2>
          </div>

          <div class="space-y-3">
            {[
              { name: 'HIPAA Health Security', path: '/compliance/hipaa', status: 'Compliant', color: 'text-brand-emerald' },
              { name: 'SOC2 Type II Controls', path: '/compliance/soc2', status: 'Audit Pending', color: 'text-brand-amber' },
              { name: 'GDPR Data Protection', path: '/compliance/gdpr', status: 'Compliant', color: 'text-brand-emerald' },
            ].map((item, idx) => (
              <a
                key={idx}
                href={item.path}
                class="flex items-center justify-between p-3.5 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-brand-cyan/40 transition-colors"
              >
                <span class="font-medium text-sm">{item.name}</span>
                <span class={`text-xs font-bold ${item.color}`}>{item.status} →</span>
              </a>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
