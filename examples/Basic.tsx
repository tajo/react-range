import * as React from 'react';
import { Range, getTrackBackground } from '../src/index';

const thumbStyle = {
  height: '42px',
  width: '42px',
  borderRadius: '4px',
  backgroundColor: '#FFF',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0px 2px 6px #AAA'
};
const BLUE = '#548BF4';
const ThumbCenter = ({ isDragged }: { isDragged: boolean }) => (
  <div
    style={{
      height: '16px',
      width: '5px',
      backgroundColor: isDragged ? BLUE : '#CCC'
    }}
  />
);

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
          step={1}
          min={10}
          max={110}
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
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values: this.state.valuesOne,
                    colors: [BLUE, '#ccc'],
                    min: 10,
                    max: 110
                  }),
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
                ...thumbStyle
              }}
            >
              <ThumbCenter isDragged={isDragged} />
            </div>
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
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values: this.state.valuesTwo,
                    colors: ['#ccc', BLUE, '#ccc'],
                    min: 0,
                    max: 100
                  }),
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
                ...thumbStyle
              }}
            >
              <ThumbCenter isDragged={isDragged} />
            </div>
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

                  borderRadius: '4px',
                  background: getTrackBackground({
                    values: this.state.valuesThree,
                    colors: ['#ccc', BLUE, '#ccc'],
                    min: 0,
                    max: 100,
                    direction: 'to bottom'
                  })
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
                ...thumbStyle
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '5px',
                  backgroundColor: isDragged ? BLUE : '#CCC'
                }}
              />
            </div>
          )}
        />
      </React.Fragment>
    );
  }
}

export default Basic;
