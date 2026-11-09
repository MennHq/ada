/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Sun, Gauge, Thermometer, Wind, Eye, Compass, Activity, Play, RotateCcw } from 'lucide-react';
import { calculateTelemetry } from '../utils/telemetryMath';

export const TelemetryLab: React.FC = () => {
  const [altitude, setAltitude] = useState<number>(38.4);
  const [elevation, setElevation] = useState<number>(45);
  const [spectralBand, setSpectralBand] = useState<'euv' | 'broadband' | 'infrared'>('broadband');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const telemetry = calculateTelemetry(altitude, elevation);

  // Canvas animation for live spectral telemetry waveforms
  useEffect(() => {
    let animId: number;
    let phase = 0;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // Clear with deep dark slate
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;

      // Horizontal grid lines
      for (let y = 30; y < height; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical grid lines
      for (let x = 40; x < width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Calculate wavelength / flux envelope based on altitude & band
      // Altitude increases signal amplitude and reduces absorption dips
      const fluxRatio = telemetry.solarIrradianceWPerM2 / 1361.2;
      const absorptionDips = Math.max(0.05, 1 - altitude / 45);

      // Primary Spectrum curve
      ctx.beginPath();
      ctx.lineWidth = 2.5;

      if (spectralBand === 'euv') {
        ctx.strokeStyle = '#38bdf8'; // Cyan/sky for EUV
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 8;
      } else if (spectralBand === 'broadband') {
        ctx.strokeStyle = '#f59e0b'; // Amber for broadband
        ctx.shadowColor = '#fbbf24';
        ctx.shadowBlur = 8;
      } else {
        ctx.strokeStyle = '#ec4899'; // Pink/Rose for Far-IR
        ctx.shadowColor = '#f43f5e';
        ctx.shadowBlur = 8;
      }

      for (let x = 0; x < width; x++) {
        const normX = x / width;
        // Base Planck radiation shape simulation
        const planckPeak = Math.sin(normX * Math.PI) * Math.exp(-normX * 1.5) * 1.8;
        
        // Atmospheric absorption notches (Ozone Chappuis / Hartley bands, Water vapor, CO2)
        const ozoneNotch = Math.exp(-Math.pow((normX - 0.35) * 15, 2)) * absorptionDips * 0.6;
        const oxygenNotch = Math.exp(-Math.pow((normX - 0.7) * 20, 2)) * absorptionDips * 0.4;
        
        // Dynamic ripple
        const ripple = Math.sin(normX * 24 + phase) * 0.04 * (isSimulating ? 1 : 0);

        const curveY = planckPeak - ozoneNotch - oxygenNotch + ripple;
        const pixelY = height - 25 - curveY * (height * 0.7) * fluxRatio;

        if (x === 0) {
          ctx.moveTo(x, pixelY);
        } else {
          ctx.lineTo(x, pixelY);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw secondary reference curve (Sea level comparison)
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#475569';
      ctx.setLineDash([4, 4]);

      for (let x = 0; x < width; x++) {
        const normX = x / width;
        const planckPeak = Math.sin(normX * Math.PI) * Math.exp(-normX * 1.5) * 1.8;
        const heavyAbsorption = (Math.exp(-Math.pow((normX - 0.35) * 12, 2)) * 0.7 +
                                 Math.exp(-Math.pow((normX - 0.7) * 15, 2)) * 0.6 +
                                 Math.exp(-Math.pow((normX - 0.85) * 18, 2)) * 0.5);
        const curveY = (planckPeak - heavyAbsorption) * 0.68;
        const pixelY = height - 25 - curveY * (height * 0.7);

        if (x === 0) {
          ctx.moveTo(x, pixelY);
        } else {
          ctx.lineTo(x, pixelY);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Annotations on canvas
      ctx.font = '10px monospace';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`SOLAR CONSTANT: 1361.2 W/m²`, 12, 20);
      ctx.fillText(`AETHERIA FLUX: ${telemetry.solarIrradianceWPerM2} W/m²`, 12, 36);
      ctx.fillText(`WAVELENGTH: 200nm — 1200nm`, width - 170, 20);

      phase += 0.05;
      if (isSimulating) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [altitude, elevation, spectralBand, isSimulating, telemetry.solarIrradianceWPerM2]);

  return (
    <section id="telemetry-lab" className="py-16 lg:py-24 bg-slate-950/60 border-b border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-cyan-950/80 px-3 py-0.5 text-xs font-mono text-cyan-400 border border-cyan-800/60 mb-2">
              <Activity className="h-3.5 w-3.5 text-cyan-400" />
              INTERACTIVE SCIENTIFIC WORKBENCH
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Stratospheric Telemetry Simulator
            </h2>
            <p className="mt-1 text-slate-400 text-sm sm:text-base max-w-2xl">
              Simulate atmospheric physics across stratospheric layers. Adjust flight altitude,
              solar angle, and sensor bands to inspect real-time solar irradiance, pressure, and
              attenuation profiles.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => { setAltitude(12); setElevation(35); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                altitude === 12
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Tropopause (12 km)
            </button>
            <button
              onClick={() => { setAltitude(25); setElevation(50); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                altitude === 25
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Ozone Peak (25 km)
            </button>
            <button
              onClick={() => { setAltitude(38.4); setElevation(60); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                altitude === 38.4
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Station Aetheria (38.4 km)
            </button>
            <button
              onClick={() => { setAltitude(45); setElevation(75); }}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                altitude === 45
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              Stratopause (45 km)
            </button>
          </div>
        </div>

        {/* Workbench Layout: Controls on left, Live Canvas + Readout on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6 bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80">
            {/* Control 1: Flight Altitude */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Sliders className="h-4 w-4 text-cyan-400" />
                  Observatory Altitude:
                </span>
                <span className="font-mono text-cyan-300 font-bold text-base bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {altitude.toFixed(1)} km ({Math.round(altitude * 1000).toLocaleString()} m)
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                step="0.5"
                value={altitude}
                onChange={e => setAltitude(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                aria-label="Observatory altitude in kilometers"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>10 km (Commercial Flight)</span>
                <span>25 km (Ozone)</span>
                <span>45 km (Space Edge)</span>
              </div>
            </div>

            {/* Control 2: Solar Elevation Angle */}
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Sun className="h-4 w-4 text-amber-400" />
                  Solar Elevation Angle:
                </span>
                <span className="font-mono text-amber-300 font-bold text-base bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {elevation}°
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="1"
                value={elevation}
                onChange={e => setElevation(parseInt(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                aria-label="Solar elevation angle in degrees"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                <span>10° (Arctic Dawn)</span>
                <span>45° (Midday Equinox)</span>
                <span>90° (Solar Zenith)</span>
              </div>
            </div>

            {/* Control 3: Spectral Instrument Band */}
            <div>
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                Spectral Sensor Band:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSpectralBand('euv')}
                  className={`py-2 px-2 rounded-xl text-xs font-medium text-center transition-all cursor-pointer ${
                    spectralBand === 'euv'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-400 font-bold shadow-sm'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  Extreme UV
                  <span className="block text-[10px] font-mono text-slate-500">100-280 nm</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSpectralBand('broadband')}
                  className={`py-2 px-2 rounded-xl text-xs font-medium text-center transition-all cursor-pointer ${
                    spectralBand === 'broadband'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400 font-bold shadow-sm'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  Broadband
                  <span className="block text-[10px] font-mono text-slate-500">280-1100 nm</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSpectralBand('infrared')}
                  className={`py-2 px-2 rounded-xl text-xs font-medium text-center transition-all cursor-pointer ${
                    spectralBand === 'infrared'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-400 font-bold shadow-sm'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  Far-IR Lidar
                  <span className="block text-[10px] font-mono text-slate-500">1.5-12 µm</span>
                </button>
              </div>
            </div>

            {/* Simulation Toggle & Reset */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsSimulating(!isSimulating)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-400 cursor-pointer"
              >
                <Play className={`h-3.5 w-3.5 ${isSimulating ? 'text-emerald-400' : 'text-slate-500'}`} />
                {isSimulating ? 'Simulating Live Oscillation' : 'Simulation Paused'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setAltitude(38.4);
                  setElevation(45);
                  setSpectralBand('broadband');
                }}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                Reset Defaults
              </button>
            </div>
          </div>

          {/* Canvas & Live Computed Telemetry (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Live Canvas Waveform */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2 py-1 mb-1 border-b border-slate-900">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  SPECTRAL FLUX IRRADIANCE SPECTRUM (W/m²/nm)
                </span>
                <span className="text-slate-500">Dashed = Sea Level Baseline</span>
              </div>
              <div className="w-full h-48 sm:h-56 relative rounded-xl overflow-hidden bg-slate-950">
                <canvas
                  ref={canvasRef}
                  width={640}
                  height={224}
                  className="w-full h-full block"
                />
              </div>
            </div>

            {/* Computed Parameters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>SOLAR FLUX</span>
                  <Sun className="h-3.5 w-3.5 text-amber-400" />
                </div>
                <div className="mt-1 text-lg font-bold font-mono text-white">
                  {telemetry.solarIrradianceWPerM2}{' '}
                  <span className="text-xs font-normal text-slate-400">W/m²</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                  {((telemetry.solarIrradianceWPerM2 / 1361.2) * 100).toFixed(1)}% of Space Constant
                </div>
              </div>

              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>BAROMETRIC P</span>
                  <Gauge className="h-3.5 w-3.5 text-cyan-400" />
                </div>
                <div className="mt-1 text-lg font-bold font-mono text-white">
                  {telemetry.pressureHpa}{' '}
                  <span className="text-xs font-normal text-slate-400">hPa</span>
                </div>
                <div className="text-[10px] text-cyan-300 font-mono mt-0.5">
                  {((telemetry.pressureHpa / 1013.25) * 100).toFixed(2)}% Sea Level
                </div>
              </div>

              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>TEMPERATURE</span>
                  <Thermometer className="h-3.5 w-3.5 text-sky-400" />
                </div>
                <div className="mt-1 text-lg font-bold font-mono text-white">
                  {telemetry.temperatureC}{' '}
                  <span className="text-xs font-normal text-slate-400">°C</span>
                </div>
                <div className="text-[10px] text-sky-300 font-mono mt-0.5">
                  Inversion Lapserate
                </div>
              </div>

              <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-3.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>HORIZON REACH</span>
                  <Eye className="h-3.5 w-3.5 text-teal-400" />
                </div>
                <div className="mt-1 text-lg font-bold font-mono text-white">
                  {telemetry.horizonDistanceKm}{' '}
                  <span className="text-xs font-normal text-slate-400">km</span>
                </div>
                <div className="text-[10px] text-teal-300 font-mono mt-0.5">
                  Sub-Orbital Horizon
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
