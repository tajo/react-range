import * as React from 'react';
import { Range } from '../src/index';

const thumbStyle = {
  borderWidth: '4px',
  borderStyle: 'solid',
  height: '28px',
  width: '28px',
  borderRadius: '6px',
  backgroundColor: '#FFF'
};

const BLUE = '#276EF1';

class Basic extends React.Component {
  state = {
    valuesOne: [20],
    valuesTwo: [30, 60],
    valuesThree: [20, 60]
  };
  render() {
    return (
      <React.Fragment>
        <Range
          values={this.state.valuesOne}
          step={10}
          min={0}
          max={100}
          onChange={valuesOne => {
            console.log('valuesOne', valuesOne);
            this.setState({ valuesOne });
          }}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: '36px',
                display: 'flex',
                width: '900px',
                margin: '30px'
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '5px',
                  width: '100%',
                  backgroundColor: '#ccc',
                  alignSelf: 'center'
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                ...thumbStyle,
                borderColor: isDragged ? BLUE : '#CCC'
              }}
            />
          )}
        />
        <Range
          values={this.state.valuesTwo}
          step={1}
          min={0}
          max={100}
          onChange={valuesTwo => {
            console.log('valuesTwo', valuesTwo);
            this.setState({ valuesTwo });
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: '36px',
                width: '900px',
                margin: '30px',
                backgroundColor: '#ccc'
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                ...thumbStyle,
                borderColor: isDragged ? BLUE : '#ccc'
              }}
            />
          )}
        />
        <Range
          isVertical
          values={this.state.valuesThree}
          onChange={valuesThree => this.setState({ valuesThree })}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                width: '36px',
                display: 'flex',
                height: '300px',
                margin: '30px'
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '100%',
                  width: '5px',
                  justifySelf: 'center',
                  backgroundColor: '#ccc'
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                ...thumbStyle,
                borderColor: isDragged ? BLUE : '#ccc'
              }}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default Basic;
