import {
    Examples,
    getTestUrl,
    trackMouse,
    untrackMouse,
    addFontStyles
  } from './utils';
  
  jest.setTimeout(10000);
  
  beforeEach(async () => {
    await page.goto(getTestUrl(Examples.RTL));
    await page.setViewport({ width: 600, height: 200 });
    await addFontStyles(page);
    await page.evaluate(() => {
      document.dir = 'rtl';
    });
  });
  
  test('dnd the thumb to right', async () => {
    await trackMouse(page);
    expect(await page.screenshot()).toMatchImageSnapshot();
    await page.mouse.move(572, 80);
    await page.mouse.down();
    await page.mouse.move(460, 80);
    await page.mouse.up();
    await untrackMouse(page);
    const output = await page.$('#output');
    expect(await page.evaluate(e => e.textContent, output)).toBe('60.2');
    expect(await page.screenshot()).toMatchImageSnapshot();
  });
