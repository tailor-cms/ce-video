import type { Page } from '@playwright/test';

import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const VIDEO = path.join(__dirname, 'test.mp4');
export const DOCUMENT = path.join(__dirname, 'test-document.txt');

const EMBED_HOSTS =
  /^https:\/\/([\w-]+\.)*(youtube\.com|youtu\.be|ytimg\.com|googlevideo\.com|vimeo\.com|vimeocdn\.com|google\.com)\//;

// Embed players (YouTube, Vimeo, Drive) keep long-lived connections open, so
// the page never reaches `networkidle` and test teardown can stall. Serve an
// empty page instead; tests only assert the iframe and its src.
export const stubEmbeds = (page: Page) =>
  page.route(EMBED_HOSTS, (route) =>
    route.fulfill({ contentType: 'text/html', body: '<!doctype html>' }),
  );
