import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles
} from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.CUSTOM_MERGING_LABELS));
  await page.setViewport({ width: 600, height: 200 });
  await addFontStyles(page);
});

test('merge custom labels', async () => {
  await trackMouse(page);
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(375, 80);
  await page.mouse.up();
  await untrackMouse(page);
  await page.waitForSelector('[data-label="1"]', {
    hidden: true
  });
  const output = await page.$('[data-label="0"]');
  expect(await page.evaluate((e) => e.textContent, output)).toBe(
    '64:00 AM - 75:00 AM'
  );
  expect(await page.screenshot()).toMatchImageSnapshot();
});
