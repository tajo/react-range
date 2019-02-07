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
});

test('dnd the first thumb to right', async () => {
  await trackMouse(page);
  await page.mouse.move(165, 80);
  await page.mouse.down();
  await page.mouse.move(270, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('44.4 - 75.0');
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
  expect(await page.evaluate(e => e.textContent, output)).toBe('75.0 - 75.0');
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
  expect(await page.evaluate(e => e.textContent, output)).toBe('25.0 - 58.7');
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
  expect(await page.evaluate(e => e.textContent, output)).toBe('25.0 - 25.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});
