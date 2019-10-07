import * as puppeteer from 'puppeteer';

export enum Examples {
  BASIC,
  TWO_THUMBS,
  UP_DIRECTION,
  LEFT_DIRECTION,
  DOWN_DIRECTION,
  MERGING_LABELS,
  SKINNY_MERGING_LABELS,
  RTL,
  FINAL_CHANGE_EVENT,
  ADJUSTED_STEP,
}

export const getTestUrl = (example: Examples): string => {
  const PORT = process.env.E2E === 'dev' ? 9010 : 9011;
  switch (example) {
    case Examples.BASIC:
      return `http://localhost:${PORT}/iframe.html?path=/story/range--basic`;
    case Examples.TWO_THUMBS:
      return `http://localhost:${PORT}/iframe.html?path=/story/range--two-thumbs`;
    case Examples.UP_DIRECTION:
      return `http://localhost:${PORT}/iframe.html?path=/story/range--up-direction`;
    case Examples.LEFT_DIRECTION:
      return `http://localhost:${PORT}/iframe.html?path=/story/range--left-direction`;
    case Examples.DOWN_DIRECTION:
      return `http://localhost:${PORT}/iframe.html?path=/story/range--down-direction`;
    case Examples.MERGING_LABELS:
      return `http://localhost:${PORT}/iframe.html?path=/story/range--merging-labels`;
    case Examples.SKINNY_MERGING_LABELS:
      return `http://localhost:${PORT}/iframe.html?path=/story/range--merging-labels-skinny`;
    case Examples.RTL:
      return `http://localhost:${PORT}/iframe.html?path=/story/range--rtl`;
    case Examples.FINAL_CHANGE_EVENT:
      return `http://localhost:${PORT}/iframe.html?path=/story/range--onfinalchange-event`;
    case Examples.ADJUSTED_STEP:
      return `http://localhost:${PORT}/iframe.html?path=/story/range--adjusted-step`;
  }
};

export const trackMouse = async (page: puppeteer.Page) => {
  await page.evaluate(showCursor);
};

export const untrackMouse = async (page: puppeteer.Page) => {
  await page.evaluate(hideCursor);
  await page.waitForSelector('.mouse-helper', { hidden: true });
};

export const addFontStyles = async (page: puppeteer.Page) => {
  await page.evaluate(fontStyles);
};

// This injects a box into the page that moves with the mouse;
// Useful for debugging
const showCursor = () => {
  const box = document.createElement('div');
  box.classList.add('mouse-helper');
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
  .mouse-helper {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background: rgba(0,0,0,.4);
    border: 1px solid white;
    border-radius: 10px;
    margin-left: -10px;
    margin-top: -10px;
    transition: background .2s, border-radius .2s, border-color .2s;
    z-index: 5000;
  }
  .mouse-helper.button-1 {
    transition: none;
    background: rgba(0,0,0,0.9);
  }
  .mouse-helper.button-2 {
    transition: none;
    border-color: rgba(0,0,255,0.9);
  }
  .mouse-helper.button-3 {
    transition: none;
    border-radius: 4px;
  }
  .mouse-helper.button-4 {
    transition: none;
    border-color: rgba(255,0,0,0.9);
  }
  .mouse-helper.button-5 {
    transition: none;
    border-color: rgba(0,255,0,0.9);
  }
  `;

  const onMouseMove = (event: MouseEvent) => {
    box.style.left = event.pageX + 'px';
    box.style.top = event.pageY + 'px';
    updateButtons(event.buttons);
  };

  const onMouseDown = (event: MouseEvent) => {
    updateButtons(event.buttons);
    box.classList.add('button-' + event.which);
  };

  const onMouseUp = (event: MouseEvent) => {
    updateButtons(event.buttons);
    box.classList.remove('button-' + event.which);
  };

  document.head.appendChild(styleElement);
  document.body.appendChild(box);
  document.addEventListener('mousemove', onMouseMove, true);
  document.addEventListener('mousedown', onMouseDown, true);
  document.addEventListener('mouseup', onMouseUp, true);
  function updateButtons(buttons: any) {
    for (let i = 0; i < 5; i++)
      // @ts-ignore
      box.classList.toggle('button-' + i, buttons & (1 << i));
  }
};

// make the cursor invisble, good for visual snaps
const hideCursor = () => {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
  .mouse-helper {
    display: none;
  }
  `;
  document.head.appendChild(styleElement);
};

// This injects a box into the page that moves with the mouse;
// Useful for debugging
const fontStyles = () => {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
  body {
    color: #fff;
    font-weight: normal;
    font-style: normal;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  `;
  document.head.appendChild(styleElement);
};
