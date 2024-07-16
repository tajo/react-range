import { test, expect } from "@playwright/test";
import { Examples, getTestUrl, addFontStyles } from "./utils";

test.beforeEach(async ({ page }) => {
  await page.goto(getTestUrl(Examples.ANIMATING_CONTAINER));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
});

test("update thumb when animating container", async ({ page }) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  await expect(page).toHaveScreenshot();
});
