import { test, expect } from "@playwright/test";
import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles,
} from "./utils";

test.beforeEach(async ({ page }) => {
  await page.goto(getTestUrl(Examples.CUSTOM_MERGING_LABELS));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
});

test("merge custom labels", async ({ page }) => {
  await trackMouse(page);
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(375, 80);
  await page.mouse.up();
  await untrackMouse(page);
  await page.waitForSelector('[data-label="1"]', { state: "hidden" });
  const output = await page.$('[data-label="0"]');
  expect(await page.evaluate((e) => e!.textContent, output)).toBe(
    "64:00 AM - 75:00 AM",
  );
  await expect(page).toHaveScreenshot();
});
