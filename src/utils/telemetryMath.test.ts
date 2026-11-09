/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTelemetry } from './telemetryMath';

test('calculateTelemetry at 38km produces accurate edge-of-space values', () => {
  const telemetry = calculateTelemetry(38, 45);

  assert.equal(telemetry.altitudeKm, 38);
  // Pressure at 38km should be around ~3 to 8 hPa (extremely low, < 1% of sea level)
  assert.ok(telemetry.pressureHpa > 2 && telemetry.pressureHpa < 15, `Pressure was ${telemetry.pressureHpa}`);
  
  // Horizon distance at 38km should be roughly 690-710 km
  assert.ok(telemetry.horizonDistanceKm > 650 && telemetry.horizonDistanceKm < 750, `Horizon was ${telemetry.horizonDistanceKm}`);
  
  // Solar irradiance should approach solar constant ~1350-1361 W/m²
  assert.ok(telemetry.solarIrradianceWPerM2 > 1300, `Solar irradiance was ${telemetry.solarIrradianceWPerM2}`);
  
  // Temperature inversion in upper stratosphere should be warmer than tropopause (-56°C)
  assert.ok(telemetry.temperatureC > -50, `Temperature was ${telemetry.temperatureC}`);
});

test('calculateTelemetry clamps out-of-range altitudes safely', () => {
  const low = calculateTelemetry(2);
  assert.equal(low.altitudeKm, 10);

  const high = calculateTelemetry(90);
  assert.equal(high.altitudeKm, 50);
});
