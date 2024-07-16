import { test, expect } from "@playwright/test";
import {
  Examples,
  getTestUrl,
  addFontStyles,
  trackMouse,
  untrackMouse,
} from "./utils";

test.beforeEach(async ({ page }) => {
  await page.goto(getTestUrl(Examples.BASIC));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
});

test("dnd the thumb, then use arrows", async ({ page }) => {
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(460, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const outputBeforeArrowInput = await page.$("#output");
  expect(
    await page.evaluate((e) => e!.textContent, outputBeforeArrowInput),
  ).toBe("79.6");

  await page.keyboard.press("ArrowLeft");

  const outputAfterArrowInput = await page.$("#output");
  expect(
    await page.evaluate((e) => e!.textContent, outputAfterArrowInput),
  ).toBe("79.5");
  await page.mouse.click(1, 1);
  await expect(page).toHaveScreenshot();
});
