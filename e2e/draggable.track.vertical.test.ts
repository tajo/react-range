import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles
} from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.DRAGGABLE_TRACK_DOWN_DIRECTION));
  await page.setViewport({ width: 600, height: 460 });
  await addFontStyles(page);
});

test('dnd the top thumb down', async () => {
  await trackMouse(page);
  await page.mouse.move(283, 140);
  await page.mouse.down();
  await page.mouse.move(283, 165);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('35.0 - 75.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('dnd the bottom thumb up', async () => {
  await trackMouse(page);
  await page.mouse.move(283, 280);
  await page.mouse.down();
  await page.mouse.move(283, 255);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('25.0 - 65.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('dnd the track down', async () => {
  await trackMouse(page);
  await page.mouse.move(283, 240);
  await page.mouse.down();
  await page.mouse.move(283, 300);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('45.0 - 95.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('dnd the track up', async () => {
  await trackMouse(page);
  await page.mouse.move(283, 240);
  await page.mouse.down();
  await page.mouse.move(283, 180);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('5.0 - 55.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('dnd the track to the max value', async () => {
  await trackMouse(page);
  await page.mouse.move(283, 240);
  await page.mouse.down();
  await page.mouse.move(283, 340);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('50.0 - 100.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('dnd the track to the min value', async () => {
  await trackMouse(page);
  await page.mouse.move(283, 240);
  await page.mouse.down();
  await page.mouse.move(283, 140);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('0.0 - 50.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});
