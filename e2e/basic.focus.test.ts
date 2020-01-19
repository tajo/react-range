import {
  Examples,
  getTestUrl,
  addFontStyles,
  trackMouse,
  untrackMouse
} from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.BASIC));
  await page.setViewport({ width: 600, height: 200 });
  await addFontStyles(page);
});

test('dnd the thumb, then use arrows', async () => {
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(460, 80);
  await page.mouse.up();
  await untrackMouse(page);
  await page.keyboard.press('ArrowLeft');

  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('79.5');
  await page.mouse.click(1, 1);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

