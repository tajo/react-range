import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles
} from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.MARKS));
  await page.setViewport({ width: 600, height: 200 });
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
});

test('marks are placed', async () => {
  expect(await page.screenshot()).toMatchImageSnapshot();
});
