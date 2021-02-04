import { Examples, getTestUrl, addFontStyles } from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.BASIC_WITH_BORDER));
  await page.setViewport({ width: 600, height: 200 });
  await addFontStyles(page);
  await page.waitForSelector('div[role="slider"]');
});

test('aligns thumb as expected with borders', async () => {
  expect(await page.screenshot()).toMatchImageSnapshot();
});
