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
});

test('marks are placed', async () => {
  expect(await page.screenshot()).toMatchImageSnapshot();
});
