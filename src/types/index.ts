/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MissionLog {
  id: string;
  name: string;
  callsign: string;
  altitudeMeters: number;
  status: 'active' | 'completed' | 'scheduled';
  launchDate: string;
  payload: string;
  primaryObjective: string;
  durationHours: number;
  telemetrySummary: {
    solarFluxPeak: number;
    minTempC: number;
    minPressureHpa: number;
  };
}

export interface ResearchAccessTicket {
  ticketId: string;
  investigator: string;
  institution: string;
  email: string;
  dataset: string;
  grantedAt: string;
  clearanceLevel: string;
  accessKey: string;
}
