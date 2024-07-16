import { test, expect } from "@playwright/test";
import { Examples, getTestUrl, addFontStyles } from "./utils";

test.beforeEach(async ({ page }) => {
  await page.goto(getTestUrl(Examples.BASIC_WITH_BORDER));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
});

test("aligns thumb as expected with borders", async ({ page }) => {
  await expect(page).toHaveScreenshot();
});
