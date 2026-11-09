/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Share2, ArrowRight, Gauge, Sun, Thermometer, Wind, Eye, Compass, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenSocialModal: () => void;
  onOpenAccessModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSocialModal, onOpenAccessModal }) => {
  // Live subtle fluctuation in live telemetry metrics to simulate real aerostat telemetry
  const [solarFlux, setSolarFlux] = useState(1361.2);
  const [pressure, setPressure] = useState(3.82);

  useEffect(() => {
    const interval = setInterval(() => {
      setSolarFlux(prev => Number((1361.2 + (Math.random() * 0.8 - 0.4)).toFixed(1)));
      setPressure(prev => Number((3.82 + (Math.random() * 0.06 - 0.03)).toFixed(2)));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800/60">
      {/* Background radial atmosphere glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none opacity-40">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-cyan-600/30 rounded-full blur-[120px]" />
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-[140px]" />
        <div className="absolute -top-10 right-10 w-72 h-72 bg-amber-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Pill */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-3.5 py-1 text-xs font-mono text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>ALTITUDE: 38,400 METERS</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400">EDGE-OF-SPACE TELEMETRY ONLINE</span>
          </div>

          <button
            onClick={onOpenSocialModal}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950/60 px-3 py-1 text-xs font-mono text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900/40 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>OG:IMAGE 1200×630 READY</span>
          </button>
        </div>

        {/* Grid: Headline & Observatory Hero Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Atmospheric Science &amp; Solar Telemetry at the{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
                Stratospheric Edge
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-light">
              Stationed 38 kilometers above Earth in the middle stratosphere, Aetheria maps
              unfiltered solar radiation, polar ozone recovery, and climate precursors above 99% of
              atmospheric interference.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#telemetry-lab"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-sky-500 px-5 py-3 text-sm sm:text-base font-semibold text-slate-950 hover:from-cyan-300 hover:to-sky-400 shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
              >
                Launch Telemetry Lab
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={onOpenSocialModal}
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm sm:text-base font-semibold text-slate-200 border border-slate-700/80 hover:bg-slate-850 hover:border-cyan-400 hover:text-cyan-300 shadow-sm transition-all cursor-pointer"
              >
                <Share2 className="h-4 w-4 text-cyan-400" />
                Inspect Social Share Card
              </button>

              <button
                onClick={onOpenAccessModal}
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-transparent px-4 py-3 text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Compass className="h-4 w-4 text-slate-500" />
                Research Access
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                Zero Cloud Interference
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Continuous 24h Solar Exposure
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Calibrated Cryogenic Spectrometry
              </span>
            </div>
          </div>

          {/* Right Column: Visual Preview Card & OG Frame */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 p-2 border border-slate-700/80 shadow-2xl shadow-cyan-950/40">
              {/* Card Header bar with OG metadata indicator */}
              <div className="flex items-center justify-between px-3 py-2 text-xs font-mono text-slate-400 border-b border-slate-800 mb-2">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] text-slate-400 ml-1">preview.og-image.png</span>
                </div>
                <span className="text-cyan-400 font-bold">1200 × 630</span>
              </div>

              {/* Graphic container */}
              <div className="relative aspect-[1200/630] w-full overflow-hidden rounded-xl border border-slate-700/60 bg-slate-950">
                <img
                  src="/og-image.png"
                  alt="Aetheria Stratospheric Observatory at 38km altitude overlooking Earth horizon at dawn"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Live Overlaid Telemetry Pill on Image */}
                <div className="absolute top-3 left-3 rounded-lg bg-slate-950/80 backdrop-blur-md px-2.5 py-1 text-[11px] font-mono text-cyan-300 border border-cyan-500/40">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                  STATION ORBIT: 38.4 KM
                </div>

                {/* Inspect button overlay */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <button
                    onClick={onOpenSocialModal}
                    type="button"
                    className="flex items-center gap-2 rounded-xl bg-cyan-500 text-slate-950 px-4 py-2 font-semibold text-sm shadow-xl hover:bg-cyan-400 transition-all cursor-pointer"
                  >
                    <Share2 className="h-4 w-4" />
                    Open Social Card Inspector
                  </button>
                </div>
              </div>

              {/* Caption under card */}
              <div className="mt-3 px-3 pb-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-slate-300">OpenGraph &amp; Twitter Summary Card</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Full HTTPS Address
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Stratospheric Ticker */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="rounded-xl bg-slate-900/70 border border-slate-800/80 p-3.5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>SOLAR FLUX</span>
              <Sun className="h-3.5 w-3.5 text-amber-400" />
            </div>
            <div className="mt-1.5 text-xl font-bold font-mono text-white">
              {solarFlux}{' '}
              <span className="text-xs font-normal text-slate-400">W/m²</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
              99.8% Solar Constant
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/70 border border-slate-800/80 p-3.5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>ATM. PRESSURE</span>
              <Gauge className="h-3.5 w-3.5 text-cyan-400" />
            </div>
            <div className="mt-1.5 text-xl font-bold font-mono text-white">
              {pressure}{' '}
              <span className="text-xs font-normal text-slate-400">hPa</span>
            </div>
            <div className="text-[10px] text-cyan-300 font-mono mt-0.5">
              0.38% Sea Level (Near Vacuum)
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/70 border border-slate-800/80 p-3.5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>AMBIENT TEMP</span>
              <Thermometer className="h-3.5 w-3.5 text-sky-400" />
            </div>
            <div className="mt-1.5 text-xl font-bold font-mono text-white">
              -54.2{' '}
              <span className="text-xs font-normal text-slate-400">°C</span>
            </div>
            <div className="text-[10px] text-sky-300 font-mono mt-0.5">
              Thermal Inversion Zone
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/70 border border-slate-800/80 p-3.5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>OZONE COLUMN</span>
              <Wind className="h-3.5 w-3.5 text-indigo-400" />
            </div>
            <div className="mt-1.5 text-xl font-bold font-mono text-white">
              318{' '}
              <span className="text-xs font-normal text-slate-400">DU</span>
            </div>
            <div className="text-[10px] text-indigo-300 font-mono mt-0.5">
              Dobson Spectrometer
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/70 border border-slate-800/80 p-3.5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>EARTH HORIZON</span>
              <Eye className="h-3.5 w-3.5 text-teal-400" />
            </div>
            <div className="mt-1.5 text-xl font-bold font-mono text-white">
              701{' '}
              <span className="text-xs font-normal text-slate-400">km</span>
            </div>
            <div className="text-[10px] text-teal-300 font-mono mt-0.5">
              Curvature Radius Field
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/70 border border-slate-800/80 p-3.5 backdrop-blur-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
              <span>UV INDEX</span>
              <Sun className="h-3.5 w-3.5 text-rose-400" />
            </div>
            <div className="mt-1.5 text-xl font-bold font-mono text-white">
              16.4{' '}
              <span className="text-xs font-normal text-slate-400">UVI</span>
            </div>
            <div className="text-[10px] text-rose-300 font-mono mt-0.5">
              Extreme Unfiltered UV-C
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
