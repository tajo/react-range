import * as React from "react";
import { Range } from "../src/index";

const SuperSimple: React.FC<{ rtl: boolean }> = ({ rtl }) => {
  const [values, setValues] = React.useState([50]);
  return (
    <Range
      step={0.1}
      min={0}
      max={100}
      rtl={rtl}
      values={values}
      onChange={(values) => setValues(values)}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "6px",
            width: "100%",
            backgroundColor: "#ccc",
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          key={props.key}
          style={{
            ...props.style,
            height: "42px",
            width: "42px",
            backgroundColor: "#999",
          }}
        />
      )}
    />
  );
};

export default SuperSimple;
