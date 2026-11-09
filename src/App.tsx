/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TelemetryLab } from './components/TelemetryLab';
import { SciencePillars } from './components/SciencePillars';
import { FlightLog } from './components/FlightLog';
import { Footer } from './components/Footer';
import { SocialPreviewModal } from './components/SocialPreviewModal';
import { AccessRequestModal } from './components/AccessRequestModal';

export default function App() {
  const [socialModalOpen, setSocialModalOpen] = useState(false);
  const [accessModalOpen, setAccessModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar
        onOpenSocialModal={() => setSocialModalOpen(true)}
        onOpenAccessModal={() => setAccessModalOpen(true)}
      />

      <main className="flex-1">
        <Hero
          onOpenSocialModal={() => setSocialModalOpen(true)}
          onOpenAccessModal={() => setAccessModalOpen(true)}
        />

        <TelemetryLab />

        <SciencePillars />

        <FlightLog />
      </main>

      <Footer onOpenSocialModal={() => setSocialModalOpen(true)} />

      {/* Interactive Modals */}
      <SocialPreviewModal
        isOpen={socialModalOpen}
        onClose={() => setSocialModalOpen(false)}
      />

      <AccessRequestModal
        isOpen={accessModalOpen}
        onClose={() => setAccessModalOpen(false)}
      />
    </div>
  );
}
