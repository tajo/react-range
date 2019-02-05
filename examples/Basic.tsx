import * as React from 'react';
import { Range } from '../src/index';

const thumbStyle = {
  border: '1px solid black',
  height: '30px',
  width: '30px',
  borderRadius: '20px'
};

const trackStyle = {
  height: '3px',
  width: '900px',
  margin: '40px',
  padding: '2px',
  backgroundColor: '#ccc'
};

const verticalTrackStyle = {
  height: '300px',
  width: '3px',
  margin: '40px',
  padding: '3px',
  backgroundColor: '#ccc'
};

class Basic extends React.Component {
  state = {
    values: [5, 40]
  };
  render() {
    return (
      <React.Fragment>
        <p>Test</p>
        <p>Test</p>
        <Range
          values={this.state.values}
          step={0.1}
          max={100}
          onChange={values => {
            console.log(values);
            this.setState({ values });
          }}
          renderTrack={({ props }) => (
            <div {...props} style={{ ...props.style, ...trackStyle }} />
          )}
          renderThumb={({ props }) => (
            <div {...props} style={{ ...props.style, ...thumbStyle }} />
          )}
        />
        <Range
          isVertical
          values={this.state.values}
          onChange={values => this.setState({ values })}
          renderTrack={({ props }) => (
            <div {...props} style={{ ...props.style, ...verticalTrackStyle }} />
          )}
          renderThumb={({ props }) => (
            <div {...props} style={{ ...props.style, ...thumbStyle }} />
          )}
        />
      </React.Fragment>
    );
  }
}

export default Basic;
