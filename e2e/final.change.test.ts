import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles
} from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.FINAL_CHANGE_EVENT));
  await page.setViewport({ width: 600, height: 200 });
  await addFontStyles(page);
});

test('dnd the thumb final change event', async () => {
  const output = await page.$('#output');
  const finalOutput = await page.$('#final-output');
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(460, 80);
  expect(await page.evaluate(e => e.textContent, finalOutput)).toBe('50.0');
  expect(await page.evaluate(e => e.textContent, output)).toBe('79.6');
  await page.mouse.up();
  await untrackMouse(page);
  await page.waitFor(100);
  expect(await page.evaluate(e => e.textContent, finalOutput)).toBe('79.6');
});

test('keyboard the thumb final change event', async () => {
  const output = await page.$('#output');
  const finalOutput = await page.$('#final-output');
  await trackMouse(page);
  await page.mouse.click(10, 10);
  await page.keyboard.press("Tab");
  await page.keyboard.down('ArrowRight');
  await page.keyboard.down('ArrowRight');
  expect(await page.evaluate(e => e.textContent, finalOutput)).toBe('50.0');
  expect(await page.evaluate(e => e.textContent, output)).toBe('50.2');
  await page.keyboard.up('ArrowRight');
  await untrackMouse(page);
  expect(await page.evaluate(e => e.textContent, finalOutput)).toBe('50.2');
});

test('keyboard the thumb and press another key final change event', async () => {
  const output = await page.$('#output');
  const finalOutput = await page.$('#final-output');
  await trackMouse(page);
  await page.mouse.click(10, 10);
  await page.keyboard.press("Tab");
  await page.keyboard.down('ArrowRight');
  await page.keyboard.down('ArrowRight');
  expect(await page.evaluate(e => e.textContent, finalOutput)).toBe('50.0');
  expect(await page.evaluate(e => e.textContent, output)).toBe('50.2');
  await page.keyboard.press('Tab');
  await page.keyboard.up('Tab');
  await untrackMouse(page);
  expect(await page.evaluate(e => e.textContent, finalOutput)).toBe('50.2');
});
