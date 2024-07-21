import type { Page } from "@playwright/test";

export enum Examples {
  BASIC,
  BASIC_WITH_BORDER,
  TWO_THUMBS,
  UP_DIRECTION,
  LEFT_DIRECTION,
  DOWN_DIRECTION,
  MERGING_LABELS,
  SKINNY_MERGING_LABELS,
  CUSTOM_MERGING_LABELS,
  RTL,
  FINAL_CHANGE_EVENT,
  ANIMATING_CONTAINER,
  MARKS,
  DYNAMIC_MARKS,
  DRAGGABLE_TRACK,
  DRAGGABLE_TRACK_DOWN_DIRECTION,
}

export const getTestUrl = (example: Examples): string => {
  switch (example) {
    case Examples.BASIC:
      return `/?story=range--basic&mode=preview`;
    case Examples.BASIC_WITH_BORDER:
      return `/?story=range--basic-with-border&mode=preview`;
    case Examples.TWO_THUMBS:
      return `/?story=range--two-thumbs&mode=preview`;
    case Examples.UP_DIRECTION:
      return `/?story=range--up-direction&mode=preview`;
    case Examples.LEFT_DIRECTION:
      return `/?story=range--left-direction&mode=preview`;
    case Examples.DOWN_DIRECTION:
      return `/?story=range--down-direction&mode=preview`;
    case Examples.MERGING_LABELS:
      return `/?story=range--merging-labels&mode=preview`;
    case Examples.SKINNY_MERGING_LABELS:
      return `/?story=range--merging-labels-skinny&mode=preview`;
    case Examples.CUSTOM_MERGING_LABELS:
      return `/?story=range--merging-labels-custom&mode=preview`;
    case Examples.RTL:
      return `/?story=range--basic&mode=preview&arg-rtl=true`;
    case Examples.FINAL_CHANGE_EVENT:
      return `/?story=range--on-final-change-event&mode=preview`;
    case Examples.ANIMATING_CONTAINER:
      return `/?story=range--animating-container&mode=preview`;
    case Examples.MARKS:
      return `/?story=range--marks&mode=preview`;
    case Examples.DYNAMIC_MARKS:
      return `/?story=range--marks-dynamic&mode=preview`;
    case Examples.DRAGGABLE_TRACK:
      return `/?story=range--two-thumbs-with-draggable-track&mode=preview`;
    case Examples.DRAGGABLE_TRACK_DOWN_DIRECTION:
      return `/?story=range--two-thumbs-with-draggable-track-and-down-direction&mode=preview`;
  }
};

export const trackMouse = async (page: Page) => {
  await page.evaluate(showCursor);
};

export const untrackMouse = async (page: Page) => {
  await page.evaluate(hideCursor);
  await page.waitForSelector(".mouse-helper", { state: "hidden" });
};

export const addFontStyles = async () => {
  //await page.evaluate(fontStyles);
};

// This injects a box into the page that moves with the mouse;
// Useful for debugging
const showCursor = () => {
  const box = document.createElement("div");
  box.classList.add("mouse-helper");
  const styleElement = document.createElement("style");
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
    box.style.left = event.pageX + "px";
    box.style.top = event.pageY + "px";
    updateButtons(event.buttons);
  };

  const onMouseDown = (event: MouseEvent) => {
    updateButtons(event.buttons);
    box.classList.add("button-" + event.which);
  };

  const onMouseUp = (event: MouseEvent) => {
    updateButtons(event.buttons);
    box.classList.remove("button-" + event.which);
  };

  document.head.appendChild(styleElement);
  document.body.appendChild(box);
  document.addEventListener("mousemove", onMouseMove, true);
  document.addEventListener("mousedown", onMouseDown, true);
  document.addEventListener("mouseup", onMouseUp, true);
  function updateButtons(buttons: any) {
    for (let i = 0; i < 5; i++)
      // @ts-ignore
      box.classList.toggle("button-" + i, buttons & (1 << i));
  }
};

// make the cursor invisble, good for visual snaps
const hideCursor = () => {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = `
  .mouse-helper {
    display: none;
  }
  `;
  document.head.appendChild(styleElement);
};

export const waitDropFinished = async (page: Page) => {
  await page.waitForFunction(() => {
    const sliders = document.querySelectorAll('[role="slider"]');
    return Array.from(sliders).every(
      (slider) => window.getComputedStyle(slider).cursor !== "grabbing",
    );
  });
};
