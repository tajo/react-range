import * as React from "react";
import { Range, getTrackBackground } from "../src/index";
import { useThumbOverlap } from "../src/utils";

const STEP = 0.1;
const MIN = 0;
const MAX = 100;
const COLORS = ["#0C2960", "#276EF1", "#9CBCF8", "#ccc"];
const THUMB_SIZE = 42;

const ThumbLabel = ({
  rangeRef,
  values,
  index,
}: {
  rangeRef: Range | null;
  values: number[];
  index: number;
}) => {
  const [labelValue, style] = useThumbOverlap(rangeRef, values, index);
  return (
    <div
      data-label={index}
      style={{
        display: "block",
        position: "absolute",
        top: "-28px",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "14px",
        fontFamily: "Arial,Helvetica Neue,Helvetica,sans-serif",
        padding: "4px",
        borderRadius: "4px",
        backgroundColor: "#548BF4",
        whiteSpace: "nowrap",
        ...(style as React.CSSProperties),
      }}
    >
      {labelValue as string}
    </div>
  );
};

const LabeledMerge: React.FC<{ rtl: boolean }> = ({ rtl }) => {
  const [values, setValues] = React.useState([25, 50, 75]);
  const rangeRef: any = React.useRef<Range>();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Range
        allowOverlap
        values={values}
        ref={rangeRef}
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
        renderThumb={({ props, index, isDragged }) => {
          return (
            <div
              {...props}
              key={props.key}
              style={{
                ...props.style,
                height: `${THUMB_SIZE}px`,
                width: `${THUMB_SIZE}px`,
                borderRadius: "4px",
                backgroundColor: "#FFF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 2px 6px #AAA",
              }}
            >
              <ThumbLabel
                rangeRef={rangeRef.current}
                values={values}
                index={index}
              />
              <div
                style={{
                  height: "16px",
                  width: "5px",
                  backgroundColor: isDragged ? "#548BF4" : "#CCC",
                }}
              />
            </div>
          );
        }}
      />
    </div>
  );
};

export default LabeledMerge;
