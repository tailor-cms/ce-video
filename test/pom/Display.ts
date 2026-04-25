import type { Locator, Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

export class Display extends pom.DisplayPanel {
  readonly root: Locator;
  readonly videoEl: Locator;
  readonly iframeEl: Locator;

  constructor(page: Page) {
    super(page);
    this.root = this.editor.locator('.tce-video-root');
    this.videoEl = this.editor.locator('video');
    this.iframeEl = this.editor.locator('iframe[title="Video Preview"]');
  }
}
