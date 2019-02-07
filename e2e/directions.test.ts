import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles
} from './utils';

jest.setTimeout(10000);

test('up direction: dnd the thumb up', async () => {
  await page.goto(getTestUrl(Examples.UP_DIRECTION));
  await page.setViewport({ width: 600, height: 460 });
  await addFontStyles(page);
  await trackMouse(page);
  await page.mouse.move(283, 211);
  await page.mouse.down();
  await page.mouse.move(290, 123);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('79.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('up direction: dnd the thumb down', async () => {
  await page.goto(getTestUrl(Examples.UP_DIRECTION));
  await page.setViewport({ width: 600, height: 460 });
  await addFontStyles(page);
  await trackMouse(page);
  await page.mouse.move(283, 211);
  await page.mouse.down();
  await page.mouse.move(277, 285);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('25.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('down direction: dnd the thumb up', async () => {
  await page.goto(getTestUrl(Examples.DOWN_DIRECTION));
  await page.setViewport({ width: 600, height: 460 });
  await addFontStyles(page);
  await trackMouse(page);
  await page.mouse.move(283, 211);
  await page.mouse.down();
  await page.mouse.move(290, 123);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('21.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('down direction: dnd the thumb down', async () => {
  await page.goto(getTestUrl(Examples.DOWN_DIRECTION));
  await page.setViewport({ width: 600, height: 460 });
  await addFontStyles(page);
  await trackMouse(page);
  await page.mouse.move(283, 211);
  await page.mouse.down();
  await page.mouse.move(277, 285);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('75.0');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('left direction: dnd the thumb right', async () => {
  await page.goto(getTestUrl(Examples.LEFT_DIRECTION));
  await page.setViewport({ width: 600, height: 200 });
  await addFontStyles(page);
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(412, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('29.3');
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('left direction: dnd the thumb left', async () => {
  await page.goto(getTestUrl(Examples.LEFT_DIRECTION));
  await page.setViewport({ width: 600, height: 200 });
  await addFontStyles(page);
  await trackMouse(page);
  await page.mouse.move(300, 80);
  await page.mouse.down();
  await page.mouse.move(159, 80);
  await page.mouse.up();
  await untrackMouse(page);
  const output = await page.$('#output');
  expect(await page.evaluate(e => e.textContent, output)).toBe('76.1');
  expect(await page.screenshot()).toMatchImageSnapshot();
});
