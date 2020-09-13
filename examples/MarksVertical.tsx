import * as React from 'react';
import { Range, Direction, getTrackBackground } from '../src/index';

const STEP = 10;
const MIN = 0;
const MAX = 100;

class UpDirection extends React.Component {
  state = {
    values: [50]
  };
  render() {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          flexDirection: 'column'
        }}
      >
        <Range
          direction={Direction.Up}
          values={this.state.values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => this.setState({ values })}
          renderMark={({ props, index }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: index % 2 ? '3px' : '4px',
                width: index % 2 ? '11px' : '16px',
                backgroundColor: '#548BF4'
              }}
            />
          )}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                flexGrow: 1,
                width: '36px',
                display: 'flex',
                height: '600px'
              }}
            >
              <div
                ref={props.ref}
                style={{
                  width: '5px',
                  height: '100%',
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: ['#548BF4', '#ccc'],
                    min: MIN,
                    max: MAX,
                    direction: Direction.Up
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
                height: '42px',
                width: '42px',
                borderRadius: '4px',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA'
              }}
            >
              <div
                style={{
                  width: '16px',
                  height: '5px',
                  backgroundColor: isDragged ? '#548BF4' : '#CCC'
                }}
              />
            </div>
          )}
        />
        {
          <output style={{ marginTop: '50px', width: '56px' }} id="output">
            {this.state.values[0].toFixed(1)}
          </output>
        }
      </div>
    );
  }
}

export default UpDirection;
