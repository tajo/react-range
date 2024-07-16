import { test, expect } from "@playwright/test";
import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles,
} from "./utils";

test("up direction: dnd the thumb up", async ({ page }) => {
  await page.goto(getTestUrl(Examples.UP_DIRECTION));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
  await trackMouse(page);
  await page.mouse.move(283, 211);
  await page.mouse.down();
  await page.mouse.move(290, 123);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$("#output");
  expect(await page.evaluate((e) => e!.textContent, output)).toBe("79.0");
  await expect(page).toHaveScreenshot();
});

test("up direction: dnd the thumb down", async ({ page }) => {
  await page.goto(getTestUrl(Examples.UP_DIRECTION));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
  await trackMouse(page);
  await page.mouse.move(283, 211);
  await page.mouse.down();
  await page.mouse.move(277, 285);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$("#output");
  expect(await page.evaluate((e) => e!.textContent, output)).toBe("25.0");
  await expect(page).toHaveScreenshot();
});

test("down direction: dnd the thumb up", async ({ page }) => {
  await page.goto(getTestUrl(Examples.DOWN_DIRECTION));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
  await trackMouse(page);
  await page.mouse.move(283, 211);
  await page.mouse.down();
  await page.mouse.move(290, 123);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$("#output");
  expect(await page.evaluate((e) => e!.textContent, output)).toBe("21.0");
  await expect(page).toHaveScreenshot();
});

test("down direction: dnd the thumb down", async ({ page }) => {
  await page.goto(getTestUrl(Examples.DOWN_DIRECTION));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
  await trackMouse(page);
  await page.mouse.move(283, 211);
  await page.mouse.down();
  await page.mouse.move(277, 285);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$("#output");
  expect(await page.evaluate((e) => e!.textContent, output)).toBe("75.0");
  await expect(page).toHaveScreenshot();
});

test("left direction: dnd the thumb right", async ({ page }) => {
  await page.goto(getTestUrl(Examples.LEFT_DIRECTION));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(412, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$("#output");
  expect(await page.evaluate((e) => e!.textContent, output)).toBe("29.3");
  await expect(page).toHaveScreenshot();
});

test("left direction: dnd the thumb left", async ({ page }) => {
  await page.goto(getTestUrl(Examples.LEFT_DIRECTION));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(159, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$("#output");
  expect(await page.evaluate((e) => e!.textContent, output)).toBe("76.1");
  await expect(page).toHaveScreenshot();
});
