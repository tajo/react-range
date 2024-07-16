import { test, expect } from "@playwright/test";
import { Examples, getTestUrl, addFontStyles } from "./utils";

test.beforeEach(async ({ page }) => {
  await page.goto(getTestUrl(Examples.BASIC));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
});

test("move by four-three steps to the right", async ({ page }) => {
  await page.keyboard.press("Tab");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowRight");
  await page.keyboard.press("k");
  await page.keyboard.press("PageUp");
  await page.keyboard.press("PageUp");
  await page.keyboard.press("PageUp");
  await page.keyboard.press("PageUp");
  const output = await page.$("#output");
  expect(await page.evaluate((e) => e!.textContent, output)).toBe("54.3");
  await page.mouse.click(1, 1);
  await expect(page).toHaveScreenshot();
});

test("move by four-three steps to the left", async ({ page }) => {
  await page.keyboard.press("Tab");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("j");
  await page.keyboard.press("PageDown");
  await page.keyboard.press("PageDown");
  await page.keyboard.press("PageDown");
  await page.keyboard.press("PageDown");
  const output = await page.$("#output");
  expect(await page.evaluate((e) => e!.textContent, output)).toBe("45.7");
  await page.mouse.click(1, 1);
  await expect(page).toHaveScreenshot();
});
