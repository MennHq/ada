/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { auditOpenGraphMeta } from './seoValidator';

test('auditOpenGraphMeta marks complete 1200x630 https configuration as 100% score', () => {
  const result = auditOpenGraphMeta({
    title: 'Aetheria Stratospheric Observatory — Earth & Solar Science',
    description: 'Explore cutting-edge atmospheric physics, solar radiation mapping, and climate telemetry from the edge of space at 38km altitude.',
    image: 'https://i.postimg.cc/rynCf9Fv/image.png',
    imageWidth: 1200,
    imageHeight: 630,
    twitterCard: 'summary_large_image',
  });

  assert.equal(result.score, 100);
  assert.equal(result.allPassed, true);
  assert.equal(result.shareCards.hasSummaryLargeImage, true);
  assert.equal(result.shareCards.hasFullHttpsImage, true);
  assert.equal(result.shareCards.hasOptimalDimensions, true);
  assert.equal(result.shareCards.readyForTwitter, true);
  assert.equal(result.shareCards.readyForFacebook, true);
});

test('auditOpenGraphMeta detects relative image path and fails https check', () => {
  const result = auditOpenGraphMeta({
    title: 'Aetheria Stratospheric Observatory',
    description: 'Explore cutting-edge atmospheric physics, solar radiation mapping, and climate telemetry.',
    image: '/og-image.png',
    imageWidth: 1200,
    imageHeight: 630,
    twitterCard: 'summary_large_image',
  });

  assert.equal(result.allPassed, false);
  const httpsRule = result.rules.find(r => r.id === 'og-image-not-https');
  assert.ok(httpsRule, 'Should have flagged relative image URL');
  assert.equal(httpsRule?.status, 'failed');
  assert.equal(result.shareCards.hasFullHttpsImage, false);
});

test('auditOpenGraphMeta detects missing twitter:card summary_large_image', () => {
  const result = auditOpenGraphMeta({
    title: 'Aetheria Stratospheric Observatory',
    description: 'Explore cutting-edge atmospheric physics, solar radiation mapping, and climate telemetry.',
    image: 'https://example.com/og.png',
    imageWidth: 1200,
    imageHeight: 630,
    twitterCard: 'summary',
  });

  const twitterRule = result.rules.find(r => r.id === 'twitter-card-not-large');
  assert.ok(twitterRule, 'Should have warned about twitter card not being summary_large_image');
  assert.equal(result.shareCards.hasSummaryLargeImage, false);
});

test('auditOpenGraphMeta flags non-1200x630 dimensions', () => {
  const result = auditOpenGraphMeta({
    title: 'Aetheria Stratospheric Observatory',
    description: 'Explore cutting-edge atmospheric physics, solar radiation mapping, and climate telemetry.',
    image: 'https://example.com/og.png',
    imageWidth: 400,
    imageHeight: 400,
    twitterCard: 'summary_large_image',
  });

  const dimRule = result.rules.find(r => r.id === 'og-image-dimensions-wrong');
  assert.ok(dimRule, 'Should flag non-1.91:1 aspect ratio');
  assert.equal(result.shareCards.hasOptimalDimensions, false);
});
