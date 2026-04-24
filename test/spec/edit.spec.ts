import { expect, test } from '@playwright/test';
import { elementClient } from '@tailor-cms/cek-e2e';

import { DOCUMENT, VIDEO } from '../fixtures';
import { Edit } from '../pom';

const ELEMENT_ID = 'test-video-edit';
const VIDEO_URL = 'https://example.com/video.mp4';
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const YOUTUBE_EMBED = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
const VIMEO_URL = 'https://vimeo.com/9011932';
const VIMEO_EMBED = 'https://player.vimeo.com/video/9011932';

test.beforeEach(async ({ page }) => {
  await elementClient.reset(ELEMENT_ID);
  await elementClient.resetState(ELEMENT_ID);
  await page.goto(`/?id=${ELEMENT_ID}`);
  await page.waitForLoadState('networkidle');
});

test.describe('When video is not set', () => {
  test('Shows placeholder', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.placeholder).toBeVisible();
    await expect(edit.videoEl).not.toBeVisible();
    await expect(edit.iframeEl).not.toBeVisible();
  });

  test('Can upload video file', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.open();
    await edit.fileInput.upload(VIDEO);
    await expect(edit.videoEl).toBeVisible();
    await expect(edit.fileInput.removeBtn).toBeVisible();
  });

  test('Rejects non-video file', async ({ page }) => {
    const edit = new Edit(page);
    await edit.focus();
    await edit.fileInput.open();
    await edit.fileInput.upload(DOCUMENT);
    await edit.fileInput.cancel();
    await expect(edit.placeholder).toBeVisible();
    await expect(edit.videoEl).not.toBeVisible();
  });
});

test.describe('When a direct URL is set', () => {
  test.beforeEach(async ({ page }) => {
    await elementClient.update(ELEMENT_ID, { url: VIDEO_URL, assets: {} });
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('Renders native video element', async ({ page }) => {
    const edit = new Edit(page);
    await expect(edit.videoEl).toBeVisible();
    await expect(edit.videoEl).toHaveAttribute('src', VIDEO_URL);
    await expect(edit.iframeEl).not.toBeVisible();
  });
});

test.describe('When YouTube URL is set', () => {
  test('Renders YouTube embed iframe', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, { url: YOUTUBE_URL, assets: {} });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await expect(edit.iframeEl).toBeVisible();
    await expect(edit.iframeEl).toHaveAttribute('src', YOUTUBE_EMBED);
    await expect(edit.videoEl).not.toBeVisible();
  });
});

test.describe('When Vimeo URL is set', () => {
  test('Renders Vimeo embed iframe', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, { url: VIMEO_URL, assets: {} });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await expect(edit.iframeEl).toBeVisible();
    await expect(edit.iframeEl).toHaveAttribute('src', VIMEO_EMBED);
  });
});

test.describe('Readonly mode', () => {
  test('Hides upload prompt when empty', async ({ page }) => {
    const edit = new Edit(page);
    await edit.setReadonly();
    await edit.focus();
    await expect(edit.placeholder).toBeVisible();
    await expect(
      edit.el.getByText('Use toolbar to upload the video'),
    ).not.toBeVisible();
  });

  test('Keeps player visible when set', async ({ page }) => {
    await elementClient.update(ELEMENT_ID, { url: VIDEO_URL, assets: {} });
    await page.reload({ waitUntil: 'networkidle' });
    const edit = new Edit(page);
    await edit.setReadonly();
    await expect(edit.videoEl).toBeVisible();
  });
});
