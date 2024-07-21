import { test, expect } from "@playwright/test";
import { Examples, getTestUrl, addFontStyles } from "./utils";

test.beforeEach(async ({ page }) => {
  await page.goto(getTestUrl(Examples.MARKS));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
});

test("marks are placed", async ({ page }) => {
  await expect(page).toHaveScreenshot();
});
