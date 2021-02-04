import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles
} from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.BASIC));
  await page.setViewport({ width: 600, height: 200 });
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
});

test('dnd the thumb to right', async () => {
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(460, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate((e) => e.textContent, output)).toBe('79.6');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('dnd the thumb to left', async () => {
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(140, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate((e) => e.textContent, output)).toBe('20.4');
  expect(await page.screenshot()).toMatchImageSnapshot();
});
