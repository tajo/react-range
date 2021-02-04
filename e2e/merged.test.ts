import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles
} from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.MERGING_LABELS));
  await page.setViewport({ width: 600, height: 200 });
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
});

test('Overlap thumbs 1 and 2', async () => {
  await trackMouse(page);
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(270, 80);
  await page.mouse.up();
  await untrackMouse(page);
  await page.waitForSelector('[data-label="1"]', {
    hidden: true
  });
  const output = await page.$('[data-label="0"]');
  expect(await page.evaluate((e) => e.textContent, output)).toBe('44.4 - 50.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Overlap thumbs 1, 2 and 3', async () => {
  await trackMouse(page);
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(270, 80);
  await page.mouse.up();
  await page.mouse.move(450, 80);
  await page.mouse.down();
  await page.mouse.move(330, 80);
  await page.mouse.up();
  await untrackMouse(page);
  await page.waitForSelector('[data-label="1"]', {
    hidden: true
  });
  await page.waitForSelector('[data-label="2"]', {
    hidden: true
  });
  const output = await page.$('[data-label="0"]');
  expect(await page.evaluate((e) => e.textContent, output)).toBe(
    '44.4 - 50.0 - 55.6'
  );
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Overlap thumbs 1, 2 and 3 in a different order', async () => {
  await trackMouse(page);
  await page.mouse.move(450, 80);
  await page.mouse.down();
  await page.mouse.move(270, 80);
  await page.mouse.up();
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(330, 80);
  await page.mouse.up();
  await untrackMouse(page);
  await page.waitForSelector('[data-label="0"]', {
    hidden: true
  });
  await page.waitForSelector('[data-label="1"]', {
    hidden: true
  });
  const output = await page.$('[data-label="2"]');
  expect(await page.evaluate((e) => e.textContent, output)).toBe(
    '44.4 - 50.0 - 55.6'
  );
  expect(await page.screenshot()).toMatchImageSnapshot();
});
