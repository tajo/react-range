import * as React from 'react';
import { Range } from '../src/index';

const thumbStyle = {
  border: '4px solid #CCC',
  height: '28px',
  width: '28px',
  borderRadius: '6px'
};

const trackStyle = {
  height: '5px',
  width: '900px',
  margin: '80px',
  backgroundColor: '#ccc'
};

const verticalTrackStyle = {
  height: '300px',
  width: '5px',
  margin: '80px',
  backgroundColor: '#ccc'
};

class Basic extends React.Component {
  state = {
    values: [20, 60]
  };
  render() {
    return (
      <React.Fragment>
        <Range
          values={this.state.values}
          step={10}
          min={0}
          max={100}
          onChange={values => {
            console.log(values);
            this.setState({ values });
          }}
          renderTrack={({ props }) => (
            <div {...props} style={{ ...props.style, ...trackStyle }} />
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                ...thumbStyle,
                backgroundColor: isDragged ? '#EEE' : '#FFF'
              }}
            />
          )}
        />
        <Range
          isVertical
          values={this.state.values}
          onChange={values => this.setState({ values })}
          renderTrack={({ props }) => (
            <div
              {...props}
              style={{
                ...props.style,
                ...verticalTrackStyle
              }}
            />
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                ...thumbStyle,
                backgroundColor: isDragged ? '#EEE' : '#FFF'
              }}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default Basic;
