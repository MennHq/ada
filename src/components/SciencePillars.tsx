/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sun, Wind, Compass, Sparkles, ChevronRight, CheckCircle2, Shield, Layers } from 'lucide-react';

interface Pillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  icon: React.ReactNode;
  accent: string;
  sensors: string[];
  findings: string;
  specs: {
    resolution: string;
    cadence: string;
    precision: string;
  };
}

export const SciencePillars: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<string>('ozone');

  const pillars: Pillar[] = [
    {
      id: 'ozone',
      number: '01',
      title: 'Ozone Layer Dynamics & Radical Chemistry',
      tagline: 'Continuous catalytic tracking of ozone column recovery and chlorine/bromine radical depletion mechanisms.',
      icon: <Wind className="h-6 w-6 text-cyan-400" />,
      accent: 'cyan',
      sensors: [
        'Brewster UV Spectrometer (Hartley Band 200-300nm)',
        'Cryogenic Microwave Limb Sounder',
        'In-situ Ozone Electrochemical Cell'
      ],
      findings: 'Documenting seasonal ozone hole recovery velocity and polar vortex chemical boundary integrity at 38 km.',
      specs: {
        resolution: '0.1 Dobson Units',
        cadence: '1 Hz continuous',
        precision: '±0.4% baseline',
      },
    },
    {
      id: 'solar',
      number: '02',
      title: 'Heliophysics & Solar Constant Precision',
      tagline: 'Absolute measurement of the total solar irradiance without tropospheric haze or water vapor distortion.',
      icon: <Sun className="h-6 w-6 text-amber-400" />,
      accent: 'amber',
      sensors: [
        'Active Cavity Radiometer Irradiance Monitor (ACRIM-X)',
        'Extreme UV Photometer Array',
        'Precision Sun-Tracking Heliostat'
      ],
      findings: 'Resolving sub-annual solar flare cycles and spectral irradiance variations that drive terrestrial climate models.',
      specs: {
        resolution: '0.01 W/m²',
        cadence: '10 Hz sampling',
        precision: '0.03% absolute',
      },
    },
    {
      id: 'lidar',
      number: '03',
      title: 'Stratospheric Aerosol & Cryosphere Lidar',
      tagline: 'High-power green/UV pulsed lidar mapping volcanic aerosol plumes, polar stratospheric clouds, and geoengineering precursors.',
      icon: <Layers className="h-6 w-6 text-emerald-400" />,
      accent: 'emerald',
      sensors: [
        '532nm / 355nm Nd:YAG Polarized Lidar',
        'Backscatter Extinction Photomultiplier',
        'Wide-Angle Aerosol Nephelometer'
      ],
      findings: 'Real-time 3D vertical profiling of sub-micron sulfate aerosols and ice crystal nucleation in the polar vortex.',
      specs: {
        resolution: '7.5 m vertical',
        cadence: '50 shots/sec',
        precision: '0.05 km⁻¹ extinction',
      },
    },
    {
      id: 'cosmic',
      number: '04',
      title: 'Magnetosphere & Cosmic Ray Cascades',
      tagline: 'Direct sampling of galactic cosmic rays and geomagnetic storm cascades before secondary atmospheric particle generation.',
      icon: <Sparkles className="h-6 w-6 text-indigo-400" />,
      accent: 'indigo',
      sensors: [
        'Silicon Strip Particle Tracker',
        'Cesium Iodide Scintillation Calorimeter',
        'Tri-Axial Fluxgate Magnetometer'
      ],
      findings: 'Quantifying ionospheric ionization rates and cloud condensation nucleus creation triggered by galactic cosmic rays.',
      specs: {
        resolution: '10 MeV – 100 GeV',
        cadence: 'Microsecond burst',
        precision: '99.9% ion identification',
      },
    },
  ];

  const active = pillars.find(p => p.id === selectedPillar) || pillars[0];

  return (
    <section id="science-pillars" className="py-16 lg:py-24 border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-0.5 text-xs font-mono text-slate-400 border border-slate-800 mb-2">
            RESEARCH DOMAINS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Scientific Pillars &amp; Payloads
          </h2>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            Hover or select a pillar to inspect primary sensory arrays, mission findings, and
            calibration telemetry.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {pillars.map(pillar => {
            const isSelected = selectedPillar === pillar.id;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                className={`text-left p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                    : 'bg-slate-950/70 border-slate-800/80 hover:bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-105 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500">
                    {pillar.number}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5 leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {pillar.tagline}
                </p>

                <div className="mt-4 flex items-center text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Inspect Sensors</span>
                  <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Detailed Payload Inspection */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
                  PILLAR {active.number} SPECIFICATION
                </span>
                <span className="text-xs font-mono text-slate-400">STATUS: CALIBRATED</span>
              </div>

              <h3 className="text-2xl font-bold text-white">{active.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{active.findings}</p>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                  Active Sensor Arrays:
                </h4>
                <div className="space-y-1.5">
                  {active.sensors.map((sensor, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span>{sensor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-950/80 rounded-xl p-5 border border-slate-800/80 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                Instrument Specifications
              </h4>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 block">RESOLUTION</span>
                  <span className="text-xs font-bold font-mono text-white mt-1 block">
                    {active.specs.resolution}
                  </span>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 block">CADENCE</span>
                  <span className="text-xs font-bold font-mono text-cyan-300 mt-1 block">
                    {active.specs.cadence}
                  </span>
                </div>
                <div className="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 block">PRECISION</span>
                  <span className="text-xs font-bold font-mono text-emerald-300 mt-1 block">
                    {active.specs.precision}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80">
                <span className="flex items-center gap-1 font-mono">
                  <Shield className="h-3 w-3 text-cyan-400" /> WMO / NASA Tier-1 Standard
                </span>
                <span className="font-mono text-emerald-400">NetCDF-4 Export</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
