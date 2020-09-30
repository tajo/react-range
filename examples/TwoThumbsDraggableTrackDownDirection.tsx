import * as React from 'react';
import { Range, Direction, getTrackBackground } from '../src/index';

const STEP = 0.1;
const MIN = 0;
const MAX = 100;

class TwoThumbsDraggableTrackDownDirection extends React.Component {
  state = {
    values: [25, 75]
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
          draggableTrack
          direction={Direction.Down}
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
                width: '36px',
                display: 'flex',
                height: '300px'
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
                    colors: ['#ccc', '#548BF4', '#ccc'],
                    min: MIN,
                    max: MAX,
                    direction: Direction.Down
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
        <output style={{ marginTop: '50px' }} id="output">
          {this.state.values[0].toFixed(1)} - {this.state.values[1].toFixed(1)}
        </output>
        }
      </div>
    );
  }
}

export default TwoThumbsDraggableTrackDownDirection;
