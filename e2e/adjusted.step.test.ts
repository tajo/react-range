import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles
} from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.ADJUSTED_STEP));
  await page.setViewport({ width: 600, height: 200 });
  await addFontStyles(page);
});

test('dnd the thumb to right', async () => {
  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('53.0');
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(460, 80);
  await page.mouse.up();
  await untrackMouse(page);
  expect(await page.evaluate(e => e.textContent, output)).toBe('83.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('dnd the thumb to left', async () => {
  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('53.0');
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(140, 80);
  await page.mouse.up();
  await untrackMouse(page);
  expect(await page.evaluate(e => e.textContent, output)).toBe('23.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});
