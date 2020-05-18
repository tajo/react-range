import {
  Examples,
  getTestUrl,
  addFontStyles
} from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.ANIMATING_CONTAINER));
  await page.setViewport({ width: 600, height: 200 });
  await addFontStyles(page);
});

test('update thumb when animating container', async () => {
  expect(await page.screenshot()).toMatchImageSnapshot();
  await new Promise(resolve => setTimeout(resolve, 2000));
  expect(await page.screenshot()).toMatchImageSnapshot();
});
