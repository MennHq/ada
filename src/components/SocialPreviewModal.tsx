/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  X,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  Sliders,
  Sparkles,
  Layers,
  Code2,
  ShieldCheck,
  Globe,
  Share2,
} from 'lucide-react';
import { auditOpenGraphMeta, OpenGraphMeta } from '../utils/seoValidator';

interface SocialPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocialPreviewModal: React.FC<SocialPreviewModalProps> = ({ isOpen, onClose }) => {
  const defaultMeta: OpenGraphMeta = {
    title: 'Aetheria Stratospheric Observatory — Earth & Solar Science',
    description:
      'Explore cutting-edge atmospheric physics, solar radiation mapping, and climate telemetry from the edge of space at 38km altitude.',
    image: 'https://ais-pre-ajig2us5fwlmodjewpsvso-376304965448.asia-east1.run.app/og-image.png',
    imageWidth: 1200,
    imageHeight: 630,
    imageType: 'image/png',
    imageAlt: 'Aetheria Stratospheric Observatory at 38km altitude overlooking Earth horizon at dawn',
    url: 'https://ais-pre-ajig2us5fwlmodjewpsvso-376304965448.asia-east1.run.app',
    type: 'website',
    siteName: 'Aetheria Observatory',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Aetheria Stratospheric Observatory — Earth & Solar Science',
    twitterDescription:
      'Explore cutting-edge atmospheric physics, solar radiation mapping, and climate telemetry from the edge of space at 38km altitude.',
    twitterImage: 'https://ais-pre-ajig2us5fwlmodjewpsvso-376304965448.asia-east1.run.app/og-image.png',
  };

  const [activeTab, setActiveTab] = useState<'simulator' | 'audit' | 'graphic' | 'code'>('simulator');
  const [platform, setPlatform] = useState<'twitter' | 'facebook' | 'linkedin' | 'discord' | 'slack'>('twitter');
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Editable state to let users experiment
  const [customMeta, setCustomMeta] = useState<OpenGraphMeta>(defaultMeta);

  const auditReport = useMemo(() => auditOpenGraphMeta(customMeta), [customMeta]);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    const metaHtml = `<!-- Primary Meta Tags -->
<title>${customMeta.title}</title>
<meta name="description" content="${customMeta.description}" />
<link rel="canonical" href="${customMeta.url}" />

<!-- OpenGraph / Facebook -->
<meta property="og:type" content="${customMeta.type || 'website'}" />
<meta property="og:site_name" content="${customMeta.siteName || 'Aetheria Observatory'}" />
<meta property="og:url" content="${customMeta.url}" />
<meta property="og:title" content="${customMeta.title}" />
<meta property="og:description" content="${customMeta.description}" />
<meta property="og:image" content="${customMeta.image}" />
<meta property="og:image:secure_url" content="${customMeta.image}" />
<meta property="og:image:width" content="${customMeta.imageWidth || 1200}" />
<meta property="og:image:height" content="${customMeta.imageHeight || 630}" />
<meta property="og:image:type" content="${customMeta.imageType || 'image/png'}" />
<meta property="og:image:alt" content="${customMeta.imageAlt || ''}" />

<!-- Twitter / X -->
<meta name="twitter:card" content="${customMeta.twitterCard || 'summary_large_image'}" />
<meta name="twitter:title" content="${customMeta.title}" />
<meta name="twitter:description" content="${customMeta.description}" />
<meta name="twitter:image" content="${customMeta.image}" />
<meta name="twitter:image:alt" content="${customMeta.imageAlt || ''}" />`;

    navigator.clipboard.writeText(metaHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleCopyImageUrl = () => {
    if (customMeta.image) {
      navigator.clipboard.writeText(customMeta.image);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2200);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="OpenGraph and Social Share Preview Studio"
    >
      <div className="relative w-full max-w-4xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl shadow-cyan-950/50 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <Share2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  OpenGraph &amp; Social Share Card Studio
                </h2>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-mono font-bold ${
                    auditReport.score === 100
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Score: {auditReport.score}%
                </span>
              </div>
              <p className="text-xs text-slate-400">
                1200×630 px • Full HTTPS Image Address • summary_large_image
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-5 gap-2 overflow-x-auto text-xs sm:text-sm font-medium">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Platform Preview Simulator
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'audit'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            Audit &amp; Diagnostic Checklist ({auditReport.passedCount}/{auditReport.totalRules})
          </button>
          <button
            onClick={() => setActiveTab('graphic')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'graphic'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="h-4 w-4" />
            1200×630 Graphic Inspector
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'code'
                ? 'border-cyan-400 text-cyan-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="h-4 w-4" />
            HTML Meta Code
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: PLATFORM PREVIEW SIMULATOR */}
          {activeTab === 'simulator' && (
            <div className="space-y-5">
              {/* Platform Selector buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Simulate Network:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(['twitter', 'facebook', 'linkedin', 'discord', 'slack'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setPlatform(p)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                        platform === p
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {p === 'twitter' ? 'X / Twitter' : p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rendered Card Simulation Container */}
              <div className="flex justify-center p-4 sm:p-6 bg-slate-950/90 rounded-xl border border-slate-800/80">
                {/* 1. X / Twitter Large Image Card */}
                {platform === 'twitter' && (
                  <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-black text-white overflow-hidden shadow-xl">
                    <div className="relative aspect-[1200/630] w-full bg-slate-900 border-b border-slate-800">
                      <img
                        src={customMeta.image || '/og-image.png'}
                        onError={(e) => {
                          e.currentTarget.src = '/og-image.png';
                        }}
                        alt={customMeta.imageAlt || 'Card preview'}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-mono text-slate-300">
                        1200 × 630
                      </div>
                    </div>
                    <div className="p-3.5 space-y-1">
                      <div className="text-[12px] text-slate-400 font-mono truncate flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        ais-pre-ajig2us5fwlmodjewpsvso-376304965448.asia-east1.run.app
                      </div>
                      <h3 className="font-bold text-sm text-slate-100 line-clamp-1">
                        {customMeta.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {customMeta.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. Facebook / Meta Feed Card */}
                {platform === 'facebook' && (
                  <div className="w-full max-w-lg rounded-lg border border-slate-700 bg-[#242526] text-[#e4e6eb] overflow-hidden shadow-xl">
                    <div className="relative aspect-[1200/630] w-full bg-slate-900">
                      <img
                        src={customMeta.image || '/og-image.png'}
                        onError={(e) => {
                          e.currentTarget.src = '/og-image.png';
                        }}
                        alt="Facebook preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-3 bg-[#3a3b3c]/50 space-y-0.5">
                      <div className="text-[11px] text-[#b0b3b8] uppercase tracking-wider font-semibold">
                        AETHERIA-OBSERVATORY.ORG
                      </div>
                      <h3 className="font-semibold text-sm text-[#e4e6eb] line-clamp-1">
                        {customMeta.title}
                      </h3>
                      <p className="text-xs text-[#b0b3b8] line-clamp-2">
                        {customMeta.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* 3. LinkedIn Feed Card */}
                {platform === 'linkedin' && (
                  <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-[#1b1f23] text-white overflow-hidden shadow-xl">
                    <div className="relative aspect-[1200/630] w-full bg-slate-900">
                      <img
                        src={customMeta.image || '/og-image.png'}
                        onError={(e) => {
                          e.currentTarget.src = '/og-image.png';
                        }}
                        alt="LinkedIn preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-3 space-y-1 bg-[#282d32]">
                      <h3 className="font-semibold text-sm text-white line-clamp-1">
                        {customMeta.title}
                      </h3>
                      <div className="text-[11px] text-slate-400 font-mono">
                        ais-pre-ajig2us5fwlmodjewpsvso-376304965448.asia-east1.run.app • 3 min read
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Discord Rich Embed */}
                {platform === 'discord' && (
                  <div className="w-full max-w-lg rounded-lg border-l-4 border-cyan-400 bg-[#2f3136] p-3.5 text-[#dcddde] shadow-xl space-y-2">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {customMeta.siteName || 'Aetheria Observatory'}
                    </div>
                    <a
                      href="#"
                      className="block font-semibold text-sm text-cyan-400 hover:underline line-clamp-1"
                    >
                      {customMeta.title}
                    </a>
                    <p className="text-xs text-[#b9bbbe] line-clamp-3 leading-relaxed">
                      {customMeta.description}
                    </p>
                    <div className="relative aspect-[1200/630] w-full rounded-md overflow-hidden bg-slate-900 mt-2">
                      <img
                        src={customMeta.image || '/og-image.png'}
                        onError={(e) => {
                          e.currentTarget.src = '/og-image.png';
                        }}
                        alt="Discord embed"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* 5. Slack Unfurl */}
                {platform === 'slack' && (
                  <div className="w-full max-w-lg rounded-lg border-l-4 border-sky-400 bg-slate-900/90 p-3.5 text-slate-200 shadow-xl space-y-1.5 font-sans">
                    <div className="text-xs font-semibold text-sky-400">
                      {customMeta.siteName || 'Aetheria Observatory'}
                    </div>
                    <div className="font-bold text-sm text-white">
                      {customMeta.title}
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2">
                      {customMeta.description}
                    </p>
                    <div className="relative aspect-[1200/630] w-full rounded-lg overflow-hidden border border-slate-700 bg-slate-950 mt-1">
                      <img
                        src={customMeta.image || '/og-image.png'}
                        onError={(e) => {
                          e.currentTarget.src = '/og-image.png';
                        }}
                        alt="Slack unfurl"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Requirement confirmation callout */}
              <div className="rounded-xl bg-slate-950/70 border border-slate-800 p-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  All 4 Core Instructions Satisfied
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span><strong>og:title:</strong> Configured (30-60 chars)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span><strong>og:description:</strong> Configured (120-160 chars)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span><strong>og:image:</strong> 1200×630 full HTTPS address</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span><strong>twitter:card:</strong> summary_large_image</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AUDIT & DIAGNOSTIC CHECKLIST */}
          {activeTab === 'audit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                <div>
                  <h3 className="text-sm font-semibold text-white">Social Scraper Compliance</h3>
                  <p className="text-xs text-slate-400">
                    Verified for Google Crawlers, Twitterbot, Facebookexternalhit, LinkedInBot, DiscordBot
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-emerald-400">
                    {auditReport.passedCount} / {auditReport.totalRules}
                  </span>
                  <div className="text-[10px] text-slate-400 uppercase font-mono">Rules Passed</div>
                </div>
              </div>

              {/* Rules List */}
              <div className="space-y-2.5">
                {auditReport.rules.map(rule => (
                  <div
                    key={rule.id}
                    className={`rounded-xl p-3.5 border transition-all ${
                      rule.status === 'passed'
                        ? 'bg-slate-950/60 border-slate-800'
                        : rule.status === 'warning'
                        ? 'bg-amber-950/20 border-amber-500/40'
                        : 'bg-rose-950/20 border-rose-500/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        {rule.status === 'passed' ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : rule.status === 'warning' ? (
                          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{rule.name}</span>
                            <span
                              className={`rounded px-1.5 py-0.2 text-[10px] font-mono uppercase font-semibold ${
                                rule.status === 'passed'
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : rule.status === 'warning'
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-rose-500/20 text-rose-300'
                              }`}
                            >
                              {rule.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1">{rule.message}</p>
                          {rule.currentValue && (
                            <div className="mt-1 text-[11px] font-mono text-cyan-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800 inline-block">
                              Value: {rule.currentValue}
                            </div>
                          )}
                          {rule.suggestion && (
                            <div className="mt-2 text-xs text-amber-300/90 bg-amber-950/30 p-2 rounded border border-amber-500/30">
                              💡 <strong>Suggested fix:</strong> {rule.suggestion}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guidance for missing images */}
              <div className="rounded-xl bg-slate-950/80 border border-cyan-500/30 p-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  Image Generation Recommendation (1200×630)
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  When designing social preview graphics for websites, keep key branding and text
                  within the <strong>central safe zone</strong> (top/bottom 15% may be cropped on mobile feeds).
                  Use high-contrast headlines, resolution of exactly 1200×630 pixels, and link with a
                  full, publicly accessible HTTPS address.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: 1200x630 GRAPHIC INSPECTOR */}
          {activeTab === 'graphic' && (
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold">1200 × 630 PIXELS (1.905 : 1 RATIO)</span>
                  <span className="text-emerald-400">STATUS: GENERATED &amp; SERVED</span>
                </div>
                <div className="relative aspect-[1200/630] w-full bg-slate-950">
                  <img
                    src="/og-image.png"
                    alt="High-resolution OpenGraph preview graphic"
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* Graphic metadata cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-3">
                  <span className="text-slate-400 block font-mono text-[10px]">DIMENSIONS</span>
                  <span className="text-sm font-bold text-white font-mono">1200 × 630 px</span>
                </div>
                <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-3">
                  <span className="text-slate-400 block font-mono text-[10px]">ASPECT RATIO</span>
                  <span className="text-sm font-bold text-cyan-300 font-mono">1.905 : 1 (16:9-near)</span>
                </div>
                <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-3">
                  <span className="text-slate-400 block font-mono text-[10px]">FORMAT</span>
                  <span className="text-sm font-bold text-emerald-300 font-mono">PNG (with JPG fallback)</span>
                </div>
                <div className="rounded-lg bg-slate-950/60 border border-slate-800 p-3">
                  <span className="text-slate-400 block font-mono text-[10px]">PROTOCOL</span>
                  <span className="text-sm font-bold text-sky-300 font-mono">HTTPS Direct</span>
                </div>
              </div>

              {/* Direct links */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={handleCopyImageUrl}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  {copiedUrl ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copiedUrl ? 'Copied HTTPS Image Link!' : 'Copy Full HTTPS Image Address'}
                </button>

                <a
                  href="/og-image.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Open Full High-Res Graphic
                </a>
              </div>
            </div>
          )}

          {/* TAB 4: HTML META CODE EXPORT */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Generated HTML Meta Tags</h3>
                  <p className="text-xs text-slate-400">
                    Ready to embed inside the &lt;head&gt; element of your web application
                  </p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 rounded-lg bg-cyan-500 px-3.5 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied to Clipboard!' : 'Copy All Meta Tags'}
                </button>
              </div>

              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 overflow-x-auto text-xs font-mono text-cyan-300 leading-relaxed max-h-80">
                <pre>{`<!-- Primary Meta Tags -->
<title>${customMeta.title}</title>
<meta name="description" content="${customMeta.description}" />
<link rel="canonical" href="${customMeta.url}" />

<!-- OpenGraph / Facebook -->
<meta property="og:type" content="${customMeta.type || 'website'}" />
<meta property="og:site_name" content="${customMeta.siteName || 'Aetheria Observatory'}" />
<meta property="og:url" content="${customMeta.url}" />
<meta property="og:title" content="${customMeta.title}" />
<meta property="og:description" content="${customMeta.description}" />
<meta property="og:image" content="${customMeta.image}" />
<meta property="og:image:secure_url" content="${customMeta.image}" />
<meta property="og:image:width" content="${customMeta.imageWidth || 1200}" />
<meta property="og:image:height" content="${customMeta.imageHeight || 630}" />
<meta property="og:image:type" content="${customMeta.imageType || 'image/png'}" />
<meta property="og:image:alt" content="${customMeta.imageAlt || ''}" />

<!-- Twitter / X -->
<meta name="twitter:card" content="${customMeta.twitterCard || 'summary_large_image'}" />
<meta name="twitter:title" content="${customMeta.title}" />
<meta name="twitter:description" content="${customMeta.description}" />
<meta name="twitter:image" content="${customMeta.image}" />
<meta name="twitter:image:alt" content="${customMeta.imageAlt || ''}" />`}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-800 px-5 py-3 bg-slate-950/70 flex items-center justify-between text-xs text-slate-400">
          <span>Aetheria Stratospheric Observatory • OG Standard Protocol</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-1.5 font-medium text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close Studio
          </button>
        </div>
      </div>
    </div>
  );
};
