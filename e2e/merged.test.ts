import { test, expect } from "@playwright/test";
import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles,
  waitDropFinished,
} from "./utils";

test.beforeEach(async ({ page }) => {
  await page.goto(getTestUrl(Examples.MERGING_LABELS));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
});

test("Overlap thumbs 1 and 2", async ({ page }) => {
  await trackMouse(page);
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(270, 80);
  await page.mouse.up();
  await untrackMouse(page);
  await page.waitForSelector('[data-label="1"]', { state: "hidden" });
  const output = await page.$('[data-label="0"]');
  expect(await page.evaluate((e) => e!.textContent, output)).toBe(
    "44.4 - 50.0",
  );
  await expect(page).toHaveScreenshot();
});

test("Overlap thumbs 1, 2 and 3", async ({ page }) => {
  await trackMouse(page);
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(270, 80);
  await page.mouse.up();
  await waitDropFinished(page);
  await page.mouse.move(450, 80);
  await page.mouse.down();
  await page.mouse.move(330, 80);
  await page.mouse.up();
  await untrackMouse(page);
  await page.waitForSelector('[data-label="1"]', { state: "hidden" });
  await page.waitForSelector('[data-label="2"]', { state: "hidden" });
  const output = await page.$('[data-label="0"]');
  expect(await page.evaluate((e) => e!.textContent, output)).toBe(
    "44.4 - 50.0 - 55.6",
  );
  await expect(page).toHaveScreenshot();
});

test("Overlap thumbs 1, 2 and 3 in a different order", async ({ page }) => {
  await trackMouse(page);
  await page.mouse.move(450, 80);
  await page.mouse.down();
  await page.mouse.move(270, 80);
  await page.mouse.up();
  await waitDropFinished(page);
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(330, 80);
  await page.mouse.up();
  await untrackMouse(page);
  await page.waitForSelector('[data-label="0"]', { state: "hidden" });
  await page.waitForSelector('[data-label="1"]', { state: "hidden" });
  const output = await page.$('[data-label="2"]');
  expect(await page.evaluate((e) => e!.textContent, output)).toBe(
    "44.4 - 50.0 - 55.6",
  );
  await expect(page).toHaveScreenshot();
});
