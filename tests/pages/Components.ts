import { Page, expect } from "@playwright/test";

export class Toast {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async containText(message: string) {
    await expect(this.page.locator(".toast")).toContainText(message);

    await expect(this.page.locator(".toast")).not.toBeVisible({
      timeout: 5000,
    });
  }
}
