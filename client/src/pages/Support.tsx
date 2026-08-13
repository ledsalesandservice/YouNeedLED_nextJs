import React, { useState } from "react";

const DRIVE_LINK = "https://drive.google.com/open?id=1_DyrN7NXqP_OGoPkJoou3DV0B-NwIs8r";

export default function Support() {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(DRIVE_LINK);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-white">
      {/* Hero */}
      <section className="bg-[#0e319a] text-white py-14">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Remote Support</h1>
          <p className="text-lg text-blue-100">
            Need help from our technicians? Download the support tool below and
            we'll connect to your system remotely.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-12">
        {/* Download card */}
        <div className="border-2 border-[#0e319a] rounded-2xl p-8 mb-10 text-center">
          <div className="text-5xl mb-4">🖥️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            YNLED Support Tool
          </h2>
          <p className="text-gray-600 mb-2">
            Windows desktop app · ~24 MB · No install required
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Runs directly from the downloaded file — nothing is installed on
            your computer.
          </p>

          <a
            href={DRIVE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#0e319a] text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors mb-4"
          >
            ⬇️ Download YNLED Support
          </a>

          <div className="text-sm text-gray-500">
            <button
              onClick={copyLink}
              className="text-[#0e319a] underline hover:text-blue-800"
            >
              {copied ? "✓ Link copied!" : "Copy download link"}
            </button>
          </div>
        </div>

        {/* How it works */}
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          How it works
        </h3>
        <ol className="space-y-3 text-gray-700">
          {[
            ["Download & run", "Click the download button, then double-click the file to open it."],
            ["Find your code", "The app shows a 9-digit ID and a password on screen."],
            ["Call us", "Give that code to your technician by phone or text."],
            ["We connect", "We'll securely take control, fix the issue, and disconnect."],
          ].map(([title, desc], i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-8 h-8 rounded-full bg-[#0e319a] text-white flex items-center justify-center font-bold">
                {i + 1}
              </span>
              <div>
                <span className="font-semibold text-gray-900">{title} — </span>
                {desc}
              </div>
            </li>
          ))}
        </ol>

        {/* Contact */}
        <div className="mt-10 bg-gray-50 rounded-xl p-6 text-center text-gray-700">
          <p className="mb-2">
            Questions? Call us at{" "}
            <a href="tel:6093350123" className="text-[#0e319a] font-semibold">
              (609) 335-0123
            </a>{" "}
            or email{" "}
            <a
              href="mailto:youneedled@gmail.com"
              className="text-[#0e319a] font-semibold"
            >
              youneedled@gmail.com
            </a>
          </p>
          <p className="text-sm text-gray-500">
            You Need L.E.D. · NJ DCA Licensed 34BF00056900 · www.youneedled.com
          </p>
        </div>
      </section>
    </div>
  );
}
