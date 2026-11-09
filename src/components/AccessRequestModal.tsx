/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ShieldCheck, Key, Copy, Check, Download, Send, Sparkles } from 'lucide-react';
import { ResearchAccessTicket } from '../types';

interface AccessRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessRequestModal: React.FC<AccessRequestModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [email, setEmail] = useState('');
  const [dataset, setDataset] = useState('solar-euv');
  const [ticket, setTicket] = useState<ResearchAccessTicket | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !institution.trim() || !email.trim()) return;

    // Generate simulated high-altitude data access credentials
    const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase();
    const newTicket: ResearchAccessTicket = {
      ticketId: `AET-SCI-${randomHex}`,
      investigator: name.trim(),
      institution: institution.trim(),
      email: email.trim(),
      dataset: dataset === 'solar-euv'
        ? 'Solar EUV Irradiance 10Hz NetCDF-4'
        : dataset === 'ozone'
        ? 'Mid-Stratosphere Catalytic Ozone Sondes'
        : 'Cryosphere 532nm Lidar Pointcloud',
      grantedAt: new Date().toISOString().split('T')[0],
      clearanceLevel: 'TIER-1 OPEN SCIENCE',
      accessKey: `ak_live_${Math.random().toString(36).substring(2, 18)}_${randomHex.toLowerCase()}`,
    };

    setTicket(newTicket);
  };

  const handleCopyKey = () => {
    if (ticket) {
      navigator.clipboard.writeText(ticket.accessKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Research Data Access Request"
    >
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Stratospheric Research Access</h3>
              <p className="text-xs text-slate-400">Open Science Telemetry API &amp; NetCDF Streams</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!ticket ? (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Principal Investigator / Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Dr. Elena Vance"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                University or Research Institution
              </label>
              <input
                type="text"
                required
                value={institution}
                onChange={e => setInstitution(e.target.value)}
                placeholder="Atmospheric Physics Institute / CERN / NOAA"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Academic or Institutional Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="elena.vance@physics.edu"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Primary Scientific Stream
              </label>
              <select
                value={dataset}
                onChange={e => setDataset(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="solar-euv">Solar EUV &amp; Total Irradiance (10Hz, NetCDF-4)</option>
                <option value="ozone">Mid-Stratosphere Catalytic Ozone Profiling</option>
                <option value="lidar">Polar Vortex Cryospheric 532nm Lidar Pointcloud</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 py-2.5 font-bold text-slate-950 hover:from-cyan-300 hover:to-sky-400 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer text-sm"
              >
                <Send className="h-4 w-4" />
                Issue Research Access Token
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-emerald-950/40 border border-emerald-500/40 p-4">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm mb-1">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Scientific Clearance Granted
              </div>
              <p className="text-xs text-slate-300">
                Token generated and verified for open academic access.
              </p>
            </div>

            {/* Simulated Certificate */}
            <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">CREDENTIAL ID:</span>
                <span className="text-cyan-400 font-bold">{ticket.ticketId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">INVESTIGATOR:</span>
                <span className="text-white">{ticket.investigator}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">INSTITUTION:</span>
                <span className="text-slate-300">{ticket.institution}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">DATA STREAM:</span>
                <span className="text-cyan-300">{ticket.dataset}</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-2">
                <span className="text-slate-400">API KEY:</span>
                <span className="text-amber-400 font-bold truncate max-w-[200px]">{ticket.accessKey}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopyKey}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                {copiedKey ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                {copiedKey ? 'API Key Copied!' : 'Copy API Key'}
              </button>
              <button
                type="button"
                onClick={() => setTicket(null)}
                className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                New Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
