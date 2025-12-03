import { Book, Eye, Database, Shield, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300">
              <Book className="w-4 h-4 mr-2" />
              Back to Documentation
            </Link>

            {/* Legal Link */}
            <div className="flex items-center space-x-4 text-sm">
              <Link to="/api-setup" className="text-gray-400 hover:text-white transition-colors">
                API
              </Link>
              <Link to="/dashboard-setup" className="text-gray-400 hover:text-white transition-colors">
                Setup
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
            </div>

            {/* Legal Link */}
            <Link to="/terms-of-service" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
          <h1 className="text-white">Privacy Policy</h1>
          <p className="text-gray-400">Last Updated: December 3, 2025</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Transparency Notice */}
        <div className="bg-green-900/20 border border-green-700 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-3">
            <Eye className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-white mb-2">Fully Transparent & Open Source</h2>
              <p className="text-green-200 text-sm">
                Xdopay is committed to complete transparency. Our entire codebase is open source, auditable, and available for public review. We believe privacy starts with transparency about what data we collect and why.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 space-y-8">
          <section>
            <h2 className="text-white mb-3">1. Introduction</h2>
            <p className="text-gray-300 mb-3">
              This Privacy Policy explains how Xdopay ("we," "us," or "our") collects, uses, and protects information when you use our non-custodial payment protocol and API services.
            </p>
            <p className="text-gray-300">
              As an open-source, non-custodial protocol, we are committed to minimizing data collection and maximizing user privacy.
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">2. Data We Do NOT Collect</h2>
            <div className="bg-gray-750 border border-gray-600 rounded-lg p-4 mb-3">
              <p className="text-gray-300 mb-2">
                <strong className="text-white">🔐 Zero Financial Data Custody:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Private keys or wallet seed phrases</li>
                <li>Cryptocurrency balances or holdings</li>
                <li>Payment card information</li>
                <li>Bank account details</li>
                <li>Transaction history (stored only on blockchain)</li>
                <li>Personally Identifiable Financial Information (PIFI)</li>
              </ul>
            </div>
            <p className="text-gray-300 mb-3">
              All transaction data exists solely on public blockchains. We do not custody or control your funds at any time.
            </p>
            <div className="bg-indigo-900/20 border border-indigo-700 rounded-lg p-4">
              <p className="text-indigo-200 text-sm">
                <strong className="text-indigo-300">Why this matters:</strong> Xdotpay does not intercept, hold, or control the movement of funds. All payments go directly from the payer to the merchant's wallet. This direct peer-to-peer transfer model is why we are not classified as a Virtual Asset Service Provider (VASP) and why we collect minimal financial data.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-white mb-3">3. Data We Collect</h2>

            <div className="space-y-4">
              <div className="bg-gray-750 border border-gray-600 rounded-lg p-4">
                <h3 className="text-white mb-2">3.1 Account Information</h3>
                <p className="text-gray-300 mb-2">When you create an account, we collect:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Email address (for authentication and notifications)</li>
                  <li>Username (for identification)</li>
                  <li>Ethereum wallet address (public, for receiving payments)</li>
                  <li>Hashed password (never stored in plain text)</li>
                </ul>
              </div>

              <div className="bg-gray-750 border border-gray-600 rounded-lg p-4">
                <h3 className="text-white mb-2">3.2 API Usage Data</h3>
                <p className="text-gray-300 mb-2">To provide and improve our service, we collect:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>API request timestamps and endpoints accessed</li>
                  <li>IP addresses (for security and rate limiting)</li>
                  <li>User agent and device information</li>
                  <li>Error logs and debugging information</li>
                </ul>
              </div>

              <div className="bg-gray-750 border border-gray-600 rounded-lg p-4">
                <h3 className="text-white mb-2">3.3 Invoice Metadata</h3>
                <p className="text-gray-300 mb-2">When you create invoices, we store:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Invoice amounts and creation timestamps</li>
                  <li>Payment status (pending, completed, failed)</li>
                  <li>Optional metadata provided by merchants</li>
                  <li>Blockchain transaction hashes (public data)</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-white mb-3">4. How We Use Your Data</h2>
            <p className="text-gray-300 mb-3">We use collected data solely for:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong className="text-white">Service Provision:</strong> Authenticating users, processing API requests, and managing invoices</li>
              <li><strong className="text-white">Security:</strong> Preventing fraud, abuse, and unauthorized access</li>
              <li><strong className="text-white">Communication:</strong> Sending important service updates and security notifications</li>
              <li><strong className="text-white">Analytics:</strong> Understanding usage patterns to improve the service</li>
              <li><strong className="text-white">Legal Compliance:</strong> Meeting legal obligations and responding to valid legal requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white mb-3">5. Data Sharing and Disclosure</h2>
            <p className="text-gray-300 mb-3">
              We do not sell, rent, or trade your personal information. We may share data only in these limited circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong className="text-white">Public Blockchain:</strong> Transaction data is inherently public on blockchain networks</li>
              <li><strong className="text-white">Service Providers:</strong> Third-party infrastructure providers (hosting, email) under strict confidentiality agreements</li>
              <li><strong className="text-white">Legal Requirements:</strong> When required by law or to protect our legal rights</li>
              <li><strong className="text-white">Business Transfers:</strong> In the event of a merger or acquisition (with notice to users)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white mb-3">6. Open Source Transparency</h2>
            <div className="flex items-start space-x-3 bg-gray-750 border border-gray-600 rounded-lg p-4">
              <Code className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-gray-300 mb-2">
                  <strong className="text-white">Our commitment to transparency includes:</strong>
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Open-source codebase available for audit</li>
                  <li>Public smart contract addresses</li>
                  <li>Transparent data handling practices</li>
                  <li>Community-driven development</li>
                  <li>Regular security audits</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-white mb-3">7. Data Security</h2>
            <p className="text-gray-300 mb-3">
              We implement industry-standard security measures to protect your data:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Encryption in transit (TLS/SSL) and at rest</li>
              <li>Secure password hashing (bcrypt/Argon2)</li>
              <li>API key authentication and rate limiting</li>
              <li>Regular security audits and updates</li>
              <li>Access controls and monitoring</li>
            </ul>
            <p className="text-gray-300 mt-3">
              However, no system is 100% secure. You are responsible for maintaining the security of your API keys and wallet access.
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">8. Data Retention</h2>
            <p className="text-gray-300 mb-3">
              We retain data for as long as necessary to provide services:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong className="text-white">Account Data:</strong> Until account deletion</li>
              <li><strong className="text-white">Invoice Data:</strong> Retained for accounting and dispute resolution</li>
              <li><strong className="text-white">API Logs:</strong> Typically 90 days for operational purposes</li>
              <li><strong className="text-white">Blockchain Data:</strong> Permanently stored on public blockchains (outside our control)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white mb-3">9. Your Privacy Rights</h2>
            <p className="text-gray-300 mb-3">
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
              <li><strong className="text-white">Correction:</strong> Update inaccurate information</li>
              <li><strong className="text-white">Deletion:</strong> Request deletion of your account and data</li>
              <li><strong className="text-white">Portability:</strong> Receive your data in a machine-readable format</li>
              <li><strong className="text-white">Objection:</strong> Object to certain data processing activities</li>
            </ul>
            <p className="text-gray-300 mt-3">
              To exercise these rights, contact us through our official channels.
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">10. Cookies and Tracking</h2>
            <p className="text-gray-300 mb-3">
              We use minimal cookies and tracking technologies:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li><strong className="text-white">Essential Cookies:</strong> Authentication and session management</li>
              <li><strong className="text-white">Analytics:</strong> Anonymous usage statistics (if implemented)</li>
            </ul>
            <p className="text-gray-300 mt-3">
              We do not use third-party advertising cookies or trackers.
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">11. International Data Transfers</h2>
            <p className="text-gray-300">
              Our services may be accessed globally. By using Xdopay, you consent to the transfer of data to our hosting locations. We ensure appropriate safeguards are in place for international transfers.
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">12. Children's Privacy</h2>
            <p className="text-gray-300">
              Xdopay is not intended for users under 18 years of age. We do not knowingly collect data from minors. If you believe a minor has provided data to us, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">13. Changes to This Policy</h2>
            <p className="text-gray-300">
              We may update this Privacy Policy from time to time. Material changes will be communicated via email or prominent notice on our platform. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">14. Contact Us</h2>
            <p className="text-gray-300 mb-3">
              For privacy-related questions or to exercise your rights, contact us at:
            </p>
            <div className="bg-gray-750 border border-gray-600 rounded-lg p-4">
              <p className="text-gray-300 mt-2">
                <strong className="text-white">GitHub:</strong> github.com/24greyhat/xdotpay.com
              </p>
            </div>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex justify-center space-x-6 text-sm">
          <Link to="/" className="text-indigo-400 hover:text-indigo-300">
            Documentation
          </Link>
          <span className="text-gray-600">•</span>
          <Link to="/terms-of-service" className="text-indigo-400 hover:text-indigo-300">
            Terms of Service
          </Link>
        </div>
      </main>
    </div>
  );
}
