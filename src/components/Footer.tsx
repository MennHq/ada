/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Radio, Share2, ShieldCheck, Globe, Code2, Heart } from 'lucide-react';

interface FooterProps {
  onOpenSocialModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSocialModal }) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & mission */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Radio className="h-4 w-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                AETHERIA OBSERVATORY
              </span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Permanent high-altitude atmospheric physics, solar radiation mapping, and climate
              telemetry station stationed at 38,400 meters in the polar stratosphere.
            </p>
            <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500">
              <span>LAT: 67°53′N</span>
              <span>LON: 21°04′E</span>
              <span>ALT: 38.4 KM</span>
            </div>
          </div>

          {/* Standards & OpenGraph Compliance */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-semibold text-white uppercase font-mono text-xs tracking-wider">
              Web Standards &amp; SEO
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>OpenGraph 1200×630 Compliant</span>
              </li>
              <li className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>twitter:card summary_large_image</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>Schema.org JSON-LD Structured Data</span>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-semibold text-white uppercase font-mono text-xs tracking-wider">
              Diagnostic Tools
            </h4>
            <div className="space-y-2">
              <button
                type="button"
                onClick={onOpenSocialModal}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-cyan-300 hover:bg-slate-800 transition-colors cursor-pointer text-xs font-semibold"
              >
                <Share2 className="h-3.5 w-3.5 text-cyan-400" />
                Open Share Preview Studio
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Aetheria Stratospheric Observatory Consortium. Public domain scientific data under CC0.
          </div>
          <div className="flex items-center gap-1 font-mono">
            <span>OG:IMAGE RESOLUTION: 1200 × 630 PIXELS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
