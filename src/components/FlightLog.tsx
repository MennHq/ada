/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Compass, Gauge, Sun, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { MissionLog } from '../types';

export const FlightLog: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'scheduled'>('all');

  const missions: MissionLog[] = [
    {
      id: 'aet-84',
      name: 'Helios Prime Aerostat Array',
      callsign: 'AET-84',
      altitudeMeters: 38400,
      status: 'active',
      launchDate: '2026-10-18',
      payload: 'ACRIM-X Solar Radiometer + EUV Photometer',
      primaryObjective: 'Continuous 120-day unfiltered solar irradiance recording at 38.4km.',
      durationHours: 540,
      telemetrySummary: {
        solarFluxPeak: 1361.8,
        minTempC: -56.2,
        minPressureHpa: 3.8,
      },
    },
    {
      id: 'aet-83',
      name: 'CryoVortex Lidar Campaign',
      callsign: 'AET-83',
      altitudeMeters: 34100,
      status: 'completed',
      launchDate: '2026-08-04',
      payload: '532nm Polarized Aerosol Lidar',
      primaryObjective: 'High-latitude polar stratospheric cloud mapping and vortex edge stability.',
      durationHours: 320,
      telemetrySummary: {
        solarFluxPeak: 1358.4,
        minTempC: -62.1,
        minPressureHpa: 6.2,
      },
    },
    {
      id: 'aet-82',
      name: 'Ozone Sentinel IX Campaign',
      callsign: 'AET-82',
      altitudeMeters: 39800,
      status: 'completed',
      launchDate: '2026-05-12',
      payload: 'Hartley UV Spectrometer + In-Situ Ozone Sondes',
      primaryObjective: 'Mid-stratospheric ozone catalytic reaction rate verification.',
      durationHours: 240,
      telemetrySummary: {
        solarFluxPeak: 1361.5,
        minTempC: -51.4,
        minPressureHpa: 2.9,
      },
    },
    {
      id: 'aet-85',
      name: 'Aurora Corona Lidar & Magneto Array',
      callsign: 'AET-85',
      altitudeMeters: 41500,
      status: 'scheduled',
      launchDate: '2026-12-01',
      payload: 'Tri-axial Magnetometer + Cosmic Ray Scintillator',
      primaryObjective: 'Arctic winter geomagnetic storm cascade and solar proton event detection.',
      durationHours: 400,
      telemetrySummary: {
        solarFluxPeak: 1362.0,
        minTempC: -47.8,
        minPressureHpa: 2.1,
      },
    },
  ];

  const filtered = missions.filter(m => filter === 'all' || m.status === filter);

  return (
    <section id="flight-logs" className="py-16 lg:py-24 border-b border-slate-800/80 bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-0.5 text-xs font-mono text-cyan-400 border border-slate-800 mb-2">
              <Compass className="h-3.5 w-3.5 text-cyan-400" />
              FLIGHT &amp; PAYLOAD ARCHIVE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Stratospheric Mission Flights
            </h2>
            <p className="mt-1 text-slate-400 text-sm sm:text-base">
              Verified flight logs, payload telemetries, and edge-of-space duration records.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            {(['all', 'active', 'completed', 'scheduled'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                  filter === f
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(mission => (
            <div
              key={mission.id}
              className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/60">
                      {mission.callsign}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                        mission.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : mission.status === 'completed'
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}
                    >
                      {mission.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1.5">{mission.name}</h3>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xl font-extrabold text-cyan-300">
                    {(mission.altitudeMeters / 1000).toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-400 ml-1">km</span>
                  <div className="text-[10px] text-slate-500">APOGEE</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {mission.primaryObjective}
              </p>

              <div className="text-xs text-slate-400 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/60">
                <span className="font-mono text-[10px] text-slate-500 block uppercase">Payload Package:</span>
                <span className="text-slate-200 font-medium">{mission.payload}</span>
              </div>

              {/* Telemetry Summary Stats */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">PEAK FLUX</span>
                  <span className="text-white font-bold">{mission.telemetrySummary.solarFluxPeak} W/m²</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">MIN TEMP</span>
                  <span className="text-sky-300 font-bold">{mission.telemetrySummary.minTempC} °C</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">DURATION</span>
                  <span className="text-emerald-300 font-bold">{mission.durationHours} hrs</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
