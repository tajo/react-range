import * as React from "react";
import { Range, getTrackBackground } from "../src/index";

const STEP = 0.1;
const MIN = 0;
const MAX = 100;
const COLORS = ["#0C2960", "#276EF1", "#9CBCF8", "#ccc"];

// Copy of MultipleThumbs with `draggableTrack` prop added
const MultipleThumbsDraggableTrack: React.FC<{ rtl: boolean }> = ({ rtl }) => {
  const [values, setValues] = React.useState([25, 50, 75]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Range
        draggableTrack
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "36px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: COLORS,
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged, index }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: "42px",
              width: "42px",
              borderRadius: "4px",
              backgroundColor: "#FFF",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 2px 6px #AAA",
            }}
          >
            <div
              style={{
                height: "16px",
                width: "5px",
                backgroundColor: isDragged ? COLORS[index] : "#CCC",
              }}
            />
          </div>
        )}
      />
      <output style={{ marginTop: "30px" }}>
        {values[0].toFixed(1)} - {values[1].toFixed(1)} - {values[2].toFixed(1)}
      </output>
    </div>
  );
};

export default MultipleThumbsDraggableTrack;
