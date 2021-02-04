import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles
} from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.TWO_THUMBS));
  await page.setViewport({ width: 600, height: 200 });
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
});

test('dnd the first thumb to right', async () => {
  await trackMouse(page);
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(270, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate((e) => e.textContent, output)).toBe('44.4 - 75.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('dnd the first thumb to far right (overlap)', async () => {
  await trackMouse(page);
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(490, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate((e) => e.textContent, output)).toBe('75.0 - 75.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('dnd the second thumb to left', async () => {
  await trackMouse(page);
  await page.mouse.move(435, 80);
  await page.mouse.down();
  await page.mouse.move(347, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate((e) => e.textContent, output)).toBe('25.0 - 58.7');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('dnd the second thumb to far left (overlap)', async () => {
  await trackMouse(page);
  await page.mouse.move(435, 80);
  await page.mouse.down();
  await page.mouse.move(100, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate((e) => e.textContent, output)).toBe('25.0 - 25.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('dnd both thumbs to max value (overlap at right)', async () => {
  await trackMouse(page);
  // move second thumb to far right
  await page.mouse.move(435, 80);
  await page.mouse.down();
  await page.mouse.move(600, 80);
  await page.mouse.up();
  // move first thumb to far right
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(600, 80);
  await page.mouse.up();
  await untrackMouse(page);

  // First, ensure both thumbs are overlapping at max value
  const overlapOutput = await page.$('#output');
  expect(await page.evaluate((e) => e.textContent, overlapOutput)).toBe(
    '100.0 - 100.0'
  );
  expect(await page.screenshot()).toMatchImageSnapshot();

  // Now click around max value and "drag" left
  await trackMouse(page);
  await page.mouse.move(555, 80);
  await page.mouse.down();
  await page.mouse.move(435, 80);
  await page.mouse.up();
  await untrackMouse(page);
  // Finally, ensure the left slider was moved
  const output = await page.$('#output');
  expect(await page.evaluate((e) => e.textContent, output)).toBe(
    '75.0 - 100.0'
  );
  expect(await page.screenshot()).toMatchImageSnapshot();
});
