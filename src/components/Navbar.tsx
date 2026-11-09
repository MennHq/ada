/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Radio, Share2, ShieldCheck, Compass, Sparkles, Activity } from 'lucide-react';

interface NavbarProps {
  onOpenSocialModal: () => void;
  onOpenAccessModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSocialModal, onOpenAccessModal }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-indigo-500/20 border border-cyan-500/40 shadow-sm shadow-cyan-500/10 group-hover:border-cyan-400 transition-colors">
              <Radio className="h-5 w-5 text-cyan-400 animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  AETHERIA
                </span>
                <span className="rounded bg-cyan-950/80 px-1.5 py-0.5 text-[10px] font-mono font-semibold tracking-wider text-cyan-400 border border-cyan-800/60">
                  OBS-38
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide">
                Stratospheric Solar &amp; Earth Observatory
              </p>
            </div>
          </a>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#telemetry-lab" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Activity className="h-4 w-4 text-cyan-500" />
            Live Telemetry
          </a>
          <a href="#science-pillars" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Compass className="h-4 w-4 text-sky-500" />
            Research Pillars
          </a>
          <a href="#flight-logs" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            Flight Missions
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Share Preview / OG Inspector Button */}
          <button
            onClick={onOpenSocialModal}
            type="button"
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs sm:text-sm font-medium text-cyan-300 border border-cyan-500/40 hover:bg-cyan-950/40 hover:border-cyan-400 hover:text-cyan-200 transition-all shadow-sm shadow-cyan-500/5 cursor-pointer"
            aria-label="Inspect OpenGraph and Social Share Preview"
          >
            <Share2 className="h-4 w-4 text-cyan-400" />
            <span className="hidden sm:inline">Share Preview &amp; OG</span>
            <span className="sm:hidden">Share &amp; OG</span>
            <span className="flex items-center gap-1 rounded bg-emerald-500/20 px-1.5 py-0.2 text-[10px] font-mono font-bold text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="h-3 w-3" />
              1200×630
            </span>
          </button>

          {/* Research Access Ticket */}
          <button
            onClick={onOpenAccessModal}
            type="button"
            className="hidden sm:flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-600 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-950 hover:from-cyan-400 hover:to-sky-500 transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
          >
            Request Data Access
          </button>
        </div>
      </div>
    </header>
  );
};
