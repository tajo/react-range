import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles
} from '../e2e/utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.DRAGGABLE_TRACK));
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

test('dnd the track to the right', async () => {
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(405, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate((e) => e.textContent, output)).toBe('44.4 - 94.4');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('dnd the track to the left', async () => {
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(195, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate((e) => e.textContent, output)).toBe('5.6 - 55.6');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('dnd the track to the max value', async () => {
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(460, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate((e) => e.textContent, output)).toBe(
    '50.0 - 100.0'
  );
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('dnd the track to the min value', async () => {
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(140, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate((e) => e.textContent, output)).toBe('0.0 - 50.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});
