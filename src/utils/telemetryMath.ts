/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Atmospheric & Solar Telemetry Physics calculations for high-altitude stratosphere (10 km to 45 km).
 */

export interface StratosphericTelemetry {
  altitudeKm: number;
  pressureHpa: number;
  temperatureC: number;
  solarIrradianceWPerM2: number;
  ozoneDensityDobson: number;
  horizonDistanceKm: number;
  uvIndex: number;
  atmosphericDensityKgM3: number;
}

/**
 * Standard atmospheric model approximations for Stratosphere.
 * Earth mean radius R = 6371 km.
 * Sea level solar constant S0 = 1361.2 W/m².
 */
export function calculateTelemetry(altitudeKm: number, solarElevationDeg = 45): StratosphericTelemetry {
  const alt = Math.max(10, Math.min(50, altitudeKm));
  const elevationRad = (Math.max(5, Math.min(90, solarElevationDeg)) * Math.PI) / 180;

  // Barometric formula for lower/mid stratosphere:
  // p(h) = 226.32 * exp(-0.1577 * (h - 11)) hPa for h between 11km and 25km
  // Higher up: exponential decay with scale height ~7.2 km
  const pressureHpa = Number((1013.25 * Math.exp(-alt / 7.2)).toFixed(2));

  // Temperature in stratosphere increases with altitude due to ozone UV absorption!
  // From -56.5°C at 11-20 km up to ~ -2.5°C at 47 km stratopause.
  let tempC = -56.5;
  if (alt > 20) {
    tempC = -56.5 + (alt - 20) * 1.95;
  }
  const temperatureC = Number(tempC.toFixed(1));

  // Solar constant in space = 1361.2 W/m²
  // At sea level direct beam ~1000 W/m² at zenith
  // Transmittance increases exponentially with altitude
  const airMass = 1 / Math.sin(elevationRad);
  const opticalDepth = 0.28 * Math.exp(-alt / 8.0);
  const directTransmittance = Math.exp(-opticalDepth * airMass);
  const solarIrradianceWPerM2 = Number((1361.2 * directTransmittance).toFixed(1));

  // Stratospheric Ozone peak is typically between 20 km and 30 km (Ozone layer).
  // Total column density integrated up to that altitude
  // Lower down you see the full 300-340 DU column. At 38 km you are above 85% of ozone.
  const ozoneFractionRemaining = Math.max(0.04, 1 - 1 / (1 + Math.exp(-(alt - 25) / 3.8)));
  const totalColumnDU = 320;
  const ozoneDensityDobson = Number((totalColumnDU * ozoneFractionRemaining).toFixed(0));

  // Visual horizon distance in km: d = sqrt(2 * R * h + h^2)
  const earthRadiusKm = 6371;
  const horizonDistanceKm = Number(Math.sqrt(2 * earthRadiusKm * alt + alt * alt).toFixed(0));

  // UV Index scales with solar elevation and inverse of ozone shielding
  const rawUv = (12 * Math.sin(elevationRad) * (1 + (alt / 30) * 1.8));
  const uvIndex = Number(Math.min(25, Math.max(1, rawUv)).toFixed(1));

  // Density using ideal gas law rho = P / (R_specific * T_kelvin)
  const tKelvin = temperatureC + 273.15;
  const density = (pressureHpa * 100) / (287.05 * tKelvin);
  const atmosphericDensityKgM3 = Number(density.toFixed(4));

  return {
    altitudeKm: alt,
    pressureHpa,
    temperatureC,
    solarIrradianceWPerM2,
    ozoneDensityDobson,
    horizonDistanceKm,
    uvIndex,
    atmosphericDensityKgM3,
  };
}
