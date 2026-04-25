import type { Locator, Page } from '@playwright/test';
import { pom } from '@tailor-cms/cek-e2e';

export class Edit extends pom.EditPanel {
  readonly placeholder: Locator;
  readonly videoEl: Locator;
  readonly iframeEl: Locator;
  readonly fileInput: pom.FileInput;

  constructor(page: Page) {
    super(page);
    this.placeholder = this.editor.getByText('Video component');
    this.videoEl = this.editor.locator('video');
    this.iframeEl = this.editor.locator('iframe[title="Video Preview"]');
    this.fileInput = new pom.FileInput(this.el);
  }

  async focus() {
    await this.editor.click({ position: { x: 0, y: 0 } });
  }
}
