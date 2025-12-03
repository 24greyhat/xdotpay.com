import { Book, Shield, Lock, Code, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsOfService() {
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
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
            </div>
          </div>
          <h1 className="text-white">Terms of Service</h1>
          <p className="text-gray-400">Last Updated: December 3, 2025</p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Compliance Notice */}
        <div className="bg-indigo-900/20 border border-indigo-700 rounded-xl p-6 mb-8">
          <h2 className="text-white mb-4">Xdopay — Non-Custodial • Open Source • Not a VASP</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Code className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-indigo-300 font-medium">💡 Open-Source Software</p>
                <p className="text-indigo-200 text-sm mt-1">
                  Xdopay is an open-source, non-custodial payment protocol. Anyone can run the code — we do not operate a custodial service.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Lock className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-indigo-300 font-medium">🔐 Zero Custody</p>
                <p className="text-indigo-200 text-sm mt-1">
                  We never hold or control private keys, wallets, or user funds. Payments occur directly between payer and merchant wallets.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <ExternalLink className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-indigo-300 font-medium">🔗 Smart-Contract Fee Splits</p>
                <p className="text-indigo-200 text-sm mt-1">
                  Protocol fees are collected automatically by an auditable on-chain fee-split smart contract, routing a predefined merchant-approved fee directly to the protocol address.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" />
              <div>
                <p className="text-indigo-300 font-medium">🛡️ Not a Virtual Asset Service Provider</p>
                <p className="text-indigo-200 text-sm mt-1">
                  Xdopay provides software, not financial services. We do not provide custody, exchange, remittance, settlement, or any regulated Virtual Asset Service under UAE frameworks.
                </p>
                <p className="text-indigo-200 text-sm mt-2 font-medium">
                  Why we're not a VASP: Xdotpay does not intercept, hold, or control the movement of funds. All payments go directly from the payer to the merchant's wallet.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Sections */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 space-y-8">
          <section>
            <h2 className="text-white mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-3">
              By accessing or using Xdopay's API, software, or services (collectively, the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the Service.
            </p>
            <p className="text-gray-300">
              Xdopay is an open-source payment protocol that facilitates peer-to-peer cryptocurrency transactions. We are not a financial institution, payment processor, or Virtual Asset Service Provider (VASP).
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">2. Service Description</h2>
            <p className="text-gray-300 mb-3">
              Xdopay provides open-source software that enables:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Invoice generation and management</li>
              <li>Payment tracking and verification</li>
              <li>API access for merchant integration</li>
              <li>Smart contract interaction for fee distribution</li>
            </ul>
            <p className="text-gray-300 mt-3">
              All payments are executed directly between wallets on blockchain networks. Xdopay does not custody, control, or have access to user funds at any time.
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">3. Non-Custodial Nature</h2>
            <p className="text-gray-300 mb-3">
              <strong className="text-white">Important:</strong> Xdopay is a non-custodial protocol:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>We never hold, store, or control your private keys or funds</li>
              <li>You maintain full custody and control of your cryptocurrency at all times</li>
              <li>Transactions occur directly between payer and merchant blockchain addresses</li>
              <li>We cannot reverse, cancel, or modify blockchain transactions</li>
              <li>Loss of your private keys or wallet access is irreversible and not our responsibility</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white mb-3">4. Open Source Commitment</h2>
            <p className="text-gray-300 mb-3">
              Xdopay is fully open-source software. Our commitment includes:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Complete transparency of our codebase</li>
              <li>Public access to smart contract code</li>
              <li>Community-driven development and audits</li>
              <li>No proprietary black-box systems</li>
            </ul>
            <p className="text-gray-300 mt-3">
              Anyone can review, audit, fork, or run our software independently.
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">5. Fee Structure</h2>
            <p className="text-gray-300 mb-3">
              Protocol fees are collected via transparent, auditable smart contracts:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Fees are automatically split on-chain per merchant agreement</li>
              <li>Fee percentages are predetermined and disclosed before transaction</li>
              <li>Smart contract fee logic is publicly verifiable</li>
              <li>No hidden fees or undisclosed charges</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white mb-3">6. User Responsibilities</h2>
            <p className="text-gray-300 mb-3">
              As a user of Xdopay, you are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Securing your API keys and authentication credentials</li>
              <li>Maintaining control of your cryptocurrency wallets</li>
              <li>Verifying transaction details before execution</li>
              <li>Complying with applicable laws in your jurisdiction</li>
              <li>Understanding blockchain transaction finality</li>
              <li>Paying network gas fees for blockchain transactions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white mb-3">7. Prohibited Activities</h2>
            <p className="text-gray-300 mb-3">
              You may not use Xdopay to:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
              <li>Engage in illegal activities or money laundering</li>
              <li>Violate sanctions or embargoes</li>
              <li>Defraud or deceive other users</li>
              <li>Abuse or overload our API infrastructure</li>
              <li>Reverse engineer or exploit vulnerabilities</li>
              <li>Impersonate others or misrepresent your identity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white mb-3">8. No Financial Services</h2>
            <p className="text-gray-300">
              Xdopay explicitly does not provide:
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mt-2">
              <li>Custody services</li>
              <li>Exchange or conversion services</li>
              <li>Remittance or money transmission</li>
              <li>Settlement services</li>
              <li>Financial advice or recommendations</li>
              <li>Insurance or fraud protection</li>
            </ul>
            <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mt-4">
              <p className="text-yellow-200 text-sm">
                <strong className="text-yellow-300">Important:</strong> Xdotpay does not intercept, hold, or control the movement of funds at any point in the transaction process. All payments flow directly from the payer's wallet to the merchant's wallet on the blockchain. We merely provide the software infrastructure to facilitate this peer-to-peer transfer. This is why Xdotpay is not classified as a Virtual Asset Service Provider (VASP) under UAE or international regulatory frameworks.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-white mb-3">9. Disclaimer of Warranties</h2>
            <p className="text-gray-300">
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE UPTIME, ACCURACY, OR FITNESS FOR A PARTICULAR PURPOSE. BLOCKCHAIN NETWORKS ARE OUTSIDE OUR CONTROL AND MAY EXPERIENCE DELAYS OR FAILURES.
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">10. Limitation of Liability</h2>
            <p className="text-gray-300">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, XDOPAY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF FUNDS, DATA, OR PROFITS ARISING FROM YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">11. Regulatory Compliance</h2>
            <p className="text-gray-300 mb-3">
              You are solely responsible for determining and complying with all applicable laws, regulations, and tax obligations in your jurisdiction regarding cryptocurrency use.
            </p>
            <p className="text-gray-300">
              Xdopay does not provide legal or tax advice. Consult qualified professionals for guidance specific to your situation.
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">12. Modifications to Service</h2>
            <p className="text-gray-300">
              We reserve the right to modify, suspend, or discontinue the Service at any time. As open-source software, you may continue to run your own instance of the protocol independently.
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">13. Termination</h2>
            <p className="text-gray-300">
              We may terminate or suspend your access to the Service at our discretion for violations of these Terms. You may stop using the Service at any time.
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">14. Governing Law</h2>
            <p className="text-gray-300">
              These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-white mb-3">15. Contact Information</h2>
            <p className="text-gray-300">
              For questions about these Terms of Service, please contact us through our GitHub repository or official communication channels.
            </p>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex justify-center space-x-6 text-sm">
          <Link to="/" className="text-indigo-400 hover:text-indigo-300">
            Documentation
          </Link>
          <span className="text-gray-600">•</span>
          <Link to="/privacy-policy" className="text-indigo-400 hover:text-indigo-300">
            Privacy Policy
          </Link>
        </div>
      </main>
    </div>
  );
}