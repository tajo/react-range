import React, { useState, useEffect } from "react";
import {
  Range,
  getTrackBackground,
  checkValuesAgainstBoundaries,
} from "../src/index";

const UpdatingMarks: React.FC<{ rtl: boolean }> = ({ rtl }) => {
  const [values, setValues] = React.useState([50]);
  const [selectedMax, setSelectedMax] = useState(100);
  const [maxOptions] = useState([100, 150, 200, 250, 300]);

  const [selectedMin, setSelectedMin] = useState(0);
  const [minOptions] = useState([0, 15, 20, 25, 30]);

  const [selectedStep, setSelectedStep] = useState(1);
  const [stepOptions] = useState([0.5, 1, 5, 10, 20]);

  useEffect(() => {
    const valuesCopy = [...values].map((value) =>
      checkValuesAgainstBoundaries(value, selectedMin, selectedMax),
    );
    setValues(valuesCopy);
  }, [selectedMin, selectedMax, selectedStep]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Range
        values={values}
        step={selectedStep}
        min={selectedMin}
        max={selectedMax}
        rtl={rtl}
        onChange={(values) => setValues(values)}
        renderMark={({ props, index }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: "16px",
              width: "2px",
              backgroundColor:
                index * selectedStep + selectedMin < values[0]
                  ? "#548BF4"
                  : "#ccc",
            }}
          />
        )}
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
                height: "3px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#548BF4", "#ccc"],
                  min: selectedMin,
                  max: selectedMax,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            key={props.key}
            style={{
              ...props.style,
              height: "52px",
              width: "22px",
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
                width: "3px",
                backgroundColor: isDragged ? "#548BF4" : "#CCC",
              }}
            />
          </div>
        )}
      />
      <div>
        <output
          style={{
            display: "flex",
            justifyContent: "center",
            top: "30px",
            position: "relative",
          }}
        >
          {values[0].toFixed(1)}
        </output>
        <div
          style={{
            top: "30px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p>Select range max:</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(10px, 1fr))",
                gridGap: "10px",
              }}
            >
              {maxOptions.map((val, idx) => (
                <button
                  key={`${idx}-${val}`}
                  id={`_${idx}-${val}`}
                  data-max={val}
                  style={{
                    backgroundColor: val === selectedMax ? "#548bf4" : "#fff",
                    color: val === selectedMax ? "#fff" : "#000",
                    padding: "5px 10px",
                    border:
                      val === selectedMax
                        ? "1px solid #548bf4"
                        : "1px solid #000",
                    fontSize: "15px",
                    fontWeight: val === selectedMax ? 600 : 400,
                    boxShadow: "0px 2px 8px -3px #4f4f4f",
                  }}
                  onClick={(e: React.MouseEvent) => {
                    const el = e.target as HTMLElement;
                    const newMax = el.dataset;
                    setSelectedMax((prev: number) =>
                      newMax !== undefined && newMax.max !== undefined
                        ? +newMax.max
                        : prev,
                    );
                  }}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p>Select range min:</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(10px, 1fr))",
                gridGap: "10px",
              }}
            >
              {minOptions.map((val, idx) => (
                <button
                  key={`${idx}-${val}`}
                  id={`_${idx}-${val}`}
                  data-min={val}
                  style={{
                    backgroundColor: val === selectedMin ? "#548bf4" : "#fff",
                    color: val === selectedMin ? "#fff" : "#000",
                    padding: "5px 10px",
                    border:
                      val === selectedMin
                        ? "1px solid #548bf4"
                        : "1px solid #000",
                    fontSize: "15px",
                    fontWeight: val === selectedMin ? 600 : 400,
                    boxShadow: "0px 2px 8px -3px #4f4f4f",
                  }}
                  onClick={(e: React.MouseEvent) => {
                    const el = e.target as HTMLElement;
                    const newMin = el.dataset;
                    setSelectedMin((prev: number) =>
                      newMin !== undefined && newMin.min !== undefined
                        ? +newMin.min
                        : prev,
                    );
                  }}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p>Select step:</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(10px, 1fr))",
                gridGap: "10px",
              }}
            >
              {stepOptions.map((val, idx) => (
                <button
                  key={`${idx}-${val}`}
                  id={`_${idx}-${val}`}
                  data-step={val}
                  style={{
                    backgroundColor: val === selectedStep ? "#548bf4" : "#fff",
                    color: val === selectedStep ? "#fff" : "#000",
                    padding: "5px 10px",
                    border:
                      val === selectedStep
                        ? "1px solid #548bf4"
                        : "1px solid #000",
                    fontSize: "15px",
                    fontWeight: val === selectedStep ? 600 : 400,
                    boxShadow: "0px 2px 8px -3px #4f4f4f",
                  }}
                  onClick={(e: React.MouseEvent) => {
                    const el = e.target as HTMLElement;
                    const newStep = el.dataset;
                    setSelectedStep((prev: number) =>
                      newStep !== undefined && newStep.step !== undefined
                        ? +newStep.step
                        : prev,
                    );
                  }}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatingMarks;
