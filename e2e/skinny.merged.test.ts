import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles
} from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.SKINNY_MERGING_LABELS));
  await page.setViewport({ width: 600, height: 200 });
  await addFontStyles(page);
});

test('Overlap thumbs 1 and 2', async () => {
  await trackMouse(page);
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(265, 80);
  await page.mouse.up();
  await untrackMouse(page);
  await page.waitForSelector('[data-label="1"]', {
    hidden: true
  });
  const output = await page.$('[data-label="0"]');
  expect(await page.evaluate(e => e.textContent, output)).toBe('43.5 - 50.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Overlap thumbs 1, 2 and 3', async () => {
  await trackMouse(page);
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(265, 80);
  await page.mouse.up();
  await page.mouse.move(435, 80);
  await page.mouse.down();
  await page.mouse.move(327, 80);
  await page.mouse.up();
  await untrackMouse(page);
  await page.waitForSelector('[data-label="1"]', {
    hidden: true
  });
  await page.waitForSelector('[data-label="2"]', {
    hidden: true
  });
  const output = await page.$('[data-label="0"]');
  expect(await page.evaluate(e => e.textContent, output)).toBe(
    '43.5 - 50.0 - 55.0'
  );
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('Overlap thumbs 1, 2 and 3 in a different order', async () => {
  await trackMouse(page);
  await page.mouse.move(435, 80);
  await page.mouse.down();
  await page.mouse.move(265, 80);
  await page.mouse.up();
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(327, 80);
  await page.mouse.up();
  await untrackMouse(page);
  await page.waitForSelector('[data-label="0"]', {
    hidden: true
  });
  await page.waitForSelector('[data-label="1"]', {
    hidden: true
  });
  const output = await page.$('[data-label="2"]');
  expect(await page.evaluate(e => e.textContent, output)).toBe(
    '43.5 - 50.0 - 55.0'
  );
  expect(await page.screenshot()).toMatchImageSnapshot();
});
