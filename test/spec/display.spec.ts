import { expect, test } from '@playwright/test';
import { elementClient } from '@tailor-cms/cek-e2e';

import { Display } from '../pom';

const ELEMENT_ID = 'test-video-display';
const VIDEO_URL = 'https://example.com/video.mp4';
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const YOUTUBE_EMBED = 'https://www.youtube.com/embed/dQw4w9WgXcQ';

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID);
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('Empty state', () => {
  test('Renders placeholder when content is empty', async ({ page }) => {
    const display = new Display(page);
    await expect(display.placeholder).toBeVisible();
    await expect(display.root).not.toBeVisible();
  });
});

test.describe('Direct URL', () => {
  test('Renders native video element', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, { url: VIDEO_URL, assets: {} });
    await page.reload({ waitUntil: 'networkidle' });
    const display = new Display(page);
    await expect(display.videoEl).toBeVisible();
    await expect(display.videoEl).toHaveAttribute('src', VIDEO_URL);
    await expect(display.iframeEl).not.toBeVisible();
  });
});

test.describe('YouTube URL', () => {
  test('Renders embed iframe', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, { url: YOUTUBE_URL, assets: {} });
    await page.reload({ waitUntil: 'networkidle' });
    const display = new Display(page);
    await expect(display.iframeEl).toBeVisible();
    await expect(display.iframeEl).toHaveAttribute('src', YOUTUBE_EMBED);
  });
});
