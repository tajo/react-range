import * as React from 'react';
import { Range, Direction, getTrackBackground } from '../src/index';

const STEP = 0.1;
const MIN = 0;
const MAX = 100;

class LeftDirection extends React.Component {
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
          direction={Direction.Left}
          values={this.state.values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={values => this.setState({ values })}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                flexGrow: 1,
                width: '100%',
                display: 'flex',
                height: '36px'
              }}
            >
              <div
                ref={props.ref}
                style={{
                  width: '100%',
                  height: '5px',
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: ['#548BF4', '#ccc'],
                    min: MIN,
                    max: MAX,
                    direction: Direction.Left
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
                  width: '5px',
                  height: '16px',
                  backgroundColor: isDragged ? '#548BF4' : '#CCC'
                }}
              />
            </div>
          )}
        />
        {
          <output style={{ marginTop: '30px' }} id="output">
            {this.state.values[0].toFixed(1)}
          </output>
        }
      </div>
    );
  }
}

export default LeftDirection;
