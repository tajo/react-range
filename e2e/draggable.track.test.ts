import { test, expect } from "@playwright/test";
import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles,
} from "../e2e/utils";

test.beforeEach(async ({ page }) => {
  await page.goto(getTestUrl(Examples.DRAGGABLE_TRACK));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
});

test("dnd the first thumb to right", async ({ page }) => {
  await trackMouse(page);
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(270, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$("#output");
  expect(await page.evaluate((e) => e!.textContent, output)).toBe(
    "44.4 - 75.0",
  );
  await expect(page).toHaveScreenshot();
});

test("dnd the second thumb to left", async ({ page }) => {
  await trackMouse(page);
  await page.mouse.move(435, 80);
  await page.mouse.down();
  await page.mouse.move(347, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$("#output");
  expect(await page.evaluate((e) => e!.textContent, output)).toBe(
    "25.0 - 58.7",
  );
  await expect(page).toHaveScreenshot();
});

test("dnd the track to the right", async ({ page }) => {
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(405, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$("#output");
  expect(await page.evaluate((e) => e!.textContent, output)).toBe(
    "44.4 - 94.4",
  );
  await expect(page).toHaveScreenshot();
});

test("dnd the track to the left", async ({ page }) => {
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(195, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$("#output");
  expect(await page.evaluate((e) => e!.textContent, output)).toBe("5.6 - 55.6");
  await expect(page).toHaveScreenshot();
});

test("dnd the track to the max value", async ({ page }) => {
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(460, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$("#output");
  expect(await page.evaluate((e) => e!.textContent, output)).toBe(
    "50.0 - 100.0",
  );
  await expect(page).toHaveScreenshot();
});

test("dnd the track to the min value", async ({ page }) => {
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(140, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$("#output");
  expect(await page.evaluate((e) => e!.textContent, output)).toBe("0.0 - 50.0");
  await expect(page).toHaveScreenshot();
});
