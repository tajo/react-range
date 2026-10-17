import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import Range from "./Range";
import { IThumbProps } from "./types";

describe("thumb accessibility bounds", () => {
  function renderBounds(allowOverlap = false) {
    const thumbs: IThumbProps[] = [];
    renderToStaticMarkup(
      <Range
        min={-10}
        max={10}
        values={[-5, 0, 5]}
        allowOverlap={allowOverlap}
        onChange={() => {}}
        renderTrack={({ props, children }) => <div {...props}>{children}</div>}
        renderThumb={({ props }) => {
          thumbs.push(props);
          return <div {...props} />;
        }}
      />,
    );
    return thumbs;
  }

  test("uses a zero-valued neighbor as the maximum", () => {
    expect(renderBounds()[0]["aria-valuemax"]).toBe(0);
  });

  test("uses a zero-valued neighbor as the minimum", () => {
    expect(renderBounds()[2]["aria-valuemin"]).toBe(0);
  });

  test("retains global bounds at the ends and when overlap is allowed", () => {
    const thumbs = renderBounds();
    expect(thumbs[0]["aria-valuemin"]).toBe(-10);
    expect(thumbs[2]["aria-valuemax"]).toBe(10);
    for (const thumb of renderBounds(true)) {
      expect(thumb["aria-valuemin"]).toBe(-10);
      expect(thumb["aria-valuemax"]).toBe(10);
    }
  });
});
