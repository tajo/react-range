import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles
} from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.DYNAMIC_MARKS));
  await page.setViewport({ width: 600, height: 600 });
  await addFontStyles(page);
});

test('updates range max from 100 to 150', async () => {
  const example = await page.$('#_1-150');
  const bounding_box = await example!.boundingBox();
  await trackMouse(page);
  await page.mouse.click(bounding_box!.x + bounding_box!.width / 2, bounding_box!.y + bounding_box!.height / 2);
  await untrackMouse(page);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('updates range max from 100 to 200', async () => {
  const example = await page.$('#_2-200');
  const bounding_box = await example!.boundingBox();
  await trackMouse(page);
  await page.mouse.click(bounding_box!.x + bounding_box!.width / 2, bounding_box!.y + bounding_box!.height / 2);
  await untrackMouse(page);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('updates range max from 100 to 250', async () => {
  const example = await page.$('#_3-250');
  const bounding_box = await example!.boundingBox();
  await trackMouse(page);
  await page.mouse.click(bounding_box!.x + bounding_box!.width / 2, bounding_box!.y + bounding_box!.height / 2);
  await untrackMouse(page);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('updates range max from 100 to 300', async () => {
  const example = await page.$('#_4-300');
  const bounding_box = await example!.boundingBox();
  await trackMouse(page);
  await page.mouse.click(bounding_box!.x + bounding_box!.width / 2, bounding_box!.y + bounding_box!.height / 2);
  await untrackMouse(page);
  expect(await page.screenshot()).toMatchImageSnapshot();
});


// const [minOptions] = useState([0, 15, 20, 25, 30]);
test('updates range min from 0 to 15', async () => {
  const example = await page.$('#_1-15');
  const bounding_box = await example!.boundingBox();
  await trackMouse(page);
  await page.mouse.click(bounding_box!.x + bounding_box!.width / 2, bounding_box!.y + bounding_box!.height / 2);
  await untrackMouse(page);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('updates range min from 0 to 20', async () => {
  const example = await page.$('#_2-20');
  const bounding_box = await example!.boundingBox();
  await trackMouse(page);
  await page.mouse.click(bounding_box!.x + bounding_box!.width / 2, bounding_box!.y + bounding_box!.height / 2);
  await untrackMouse(page);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('updates range min from 0 to 25', async () => {
  const example = await page.$('#_3-25');
  const bounding_box = await example!.boundingBox();
  await trackMouse(page);
  await page.mouse.click(bounding_box!.x + bounding_box!.width / 2, bounding_box!.y + bounding_box!.height / 2);
  await untrackMouse(page);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('updates range min from 0 to 30', async () => {
  const example = await page.$('#_4-30');
  const bounding_box = await example!.boundingBox();
  await trackMouse(page);
  await page.mouse.click(bounding_box!.x + bounding_box!.width / 2, bounding_box!.y + bounding_box!.height / 2);
  await untrackMouse(page);
  expect(await page.screenshot()).toMatchImageSnapshot();
});


// const [stepOptions] = useState([0.5, 1, 5, 10, 20]);

test('updates step from 1 to 5', async () => {
  const example = await page.$('#_2-5');
  const bounding_box = await example!.boundingBox();
  await trackMouse(page);
  await page.mouse.click(bounding_box!.x + bounding_box!.width / 2, bounding_box!.y + bounding_box!.height / 2);
  await untrackMouse(page);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('updates step from 1 to 10', async () => {
  const example = await page.$('#_3-10');
  const bounding_box = await example!.boundingBox();
  await trackMouse(page);
  await page.mouse.click(bounding_box!.x + bounding_box!.width / 2, bounding_box!.y + bounding_box!.height / 2);
  await untrackMouse(page);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('updates step from 1 to 20', async () => {
  const example = await page.$('#_4-20');
  const bounding_box = await example!.boundingBox();
  await trackMouse(page);
  await page.mouse.click(bounding_box!.x + bounding_box!.width / 2, bounding_box!.y + bounding_box!.height / 2);
  await untrackMouse(page);
  expect(await page.screenshot()).toMatchImageSnapshot();
});
