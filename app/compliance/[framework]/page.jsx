import { ShieldCheck, Check } from 'lucide-react';

const frameworkData = {
  hipaa: {
    title: 'HIPAA Regulatory Compliance Matrix',
    desc: 'Automated administrative and technical safeguard audits for healthcare entities.',
    checklist: [
      'AES-256 Data Encryption at Rest',
      'Audit Logging & Access Review Control',
      'Automatic Session Lock & Logout Rules',
      'Third-Party BAA Credential Verification',
    ],
    vendors: [
      { name: 'MedGuard Cyber Security', location: 'Austin, TX', rating: '4.9/5 Verified' },
      { name: 'Aegis Health Compliance', location: 'Boston, MA', rating: '5.0/5 Verified' },
    ],
  },
  soc2: {
    title: 'SOC2 Type II Certification Hub',
    desc: 'Trust services criteria checklist and verified audit firm procurement.',
    checklist: [
      'Continuous Threat Monitoring Logs',
      'Role-Based Access Control (RBAC)',
      'Disaster Recovery Test Validation',
      'Incident Response Plan Automation',
    ],
    vendors: [
      { name: 'CloudTrust Audit Group', location: 'San Francisco, CA', rating: '4.8/5 Verified' },
      { name: 'Apex Security Partners', location: 'New York, NY', rating: '4.9/5 Verified' },
    ],
  },
  gdpr: {
    title: 'GDPR Privacy & Protection Framework',
    desc: 'Data subject access request pipelines and cross-border transfer logs.',
    checklist: [
      'Right-to-be-Forgotten Data Erasure',
      'Consent Logging & Cookie Governance',
      'Data Protection Impact Assessment (DPIA)',
      'Breach Notification Automation',
    ],
    vendors: [
      { name: 'EuroLegal Tech Advisory', location: 'London, UK', rating: '4.9/5 Verified' },
      { name: 'Global Cyber Legal', location: 'Chicago, IL', rating: '4.7/5 Verified' },
    ],
  },
};

export function generateStaticParams() {
  return [{ framework: 'hipaa' }, { framework: 'soc2' }, { framework: 'gdpr' }];
}

export default function FrameworkPage({ params }) {
  const data = frameworkData[params.framework] || frameworkData.hipaa;

  return (
    <main class="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <div class="space-y-3">
        <span class="text-xs uppercase tracking-widest font-bold text-brand-cyan">Programmatic Audit Directory</span>
        <h1 class="text-3xl font-extrabold">{data.title}</h1>
        <p class="text-slate-400">{data.desc}</p>
      </div>

      {/* Standard Checklist */}
      <div class="bg-brand-card border border-brand-border rounded-xl p-6 space-y-4">
        <h2 class="font-bold text-lg text-white">Required Technical Controls</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.checklist.map((item, idx) => (
            <div key={idx} class="flex items-center space-x-3 bg-slate-900 p-3 rounded-lg border border-slate-800">
              <Check class="w-4 h-4 text-brand-emerald shrink-0" />
              <span class="text-sm text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* B2B Marketplace Vendor Section */}
      <div class="space-y-4">
        <h2 class="font-bold text-lg text-white">Accredited Regional Auditors & Vendors</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.vendors.map((vendor, idx) => (
            <div key={idx} class="bg-brand-card border border-brand-border rounded-xl p-5 space-y-3">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-bold text-white">{vendor.name}</h3>
                  <p class="text-xs text-slate-400">{vendor.location}</p>
                </div>
                <span class="text-xs bg-brand-cyan/10 text-brand-cyan px-2 py-1 rounded font-semibold border border-brand-cyan/20">
                  {vendor.rating}
                </span>
              </div>
              <button class="w-full text-center py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg transition-colors">
                Request Audit Proposal
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
