import { test, expect } from "@playwright/test";
import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles,
} from "./utils";

test.beforeEach(async ({ page }) => {
  await page.goto(getTestUrl(Examples.RTL));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
});

test("dnd the thumb to right", async ({ page }) => {
  await trackMouse(page);
  await expect(page).toHaveScreenshot();
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(460, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$("#output");
  expect(await page.evaluate((e) => e!.textContent, output)).toBe("20.4");
  await expect(page).toHaveScreenshot();
});
