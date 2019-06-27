import * as React from 'react';
import { Range, getTrackBackground } from '../src/index';

const STEP = 0.1;
const MIN = 0;
const MAX = 100;
const COLORS = ['#0C2960', '#276EF1', '#9CBCF8', '#ccc', 'red', 'green'];
const THUMB_SIZE = 42;

class Labeled extends React.Component {
  state: {
    values: number[];
    overlaps: any[];
  } = {
    values: [25, 50, 70, 80, 90],
    overlaps: []
  };
  RANGE: any;
  onChange = (values: number[]) => {
    const overlaps = [];
    const offsets = this.RANGE.getOffsets();
    for (let c = 0; c < values.length; c++) {
      const currentX = offsets[c].x;
      for (let s = 0; s < values.length; s++) {
        const siblingX = offsets[s].x;
        if (
          c !== s &&
          ((currentX >= siblingX && currentX <= siblingX + THUMB_SIZE) ||
            (currentX + THUMB_SIZE >= siblingX &&
              currentX + THUMB_SIZE <= siblingX + THUMB_SIZE))
        ) {
          let overlapIndex;
          for (let o = 0; o < overlaps.length; o++) {
            if (overlaps[o].includes(c)) overlapIndex = o;
          }
          if (overlapIndex !== undefined) {
            overlaps[overlapIndex].push(s);
          } else {
            overlaps.push([c, s]);
          }
        }
      }
    }
    this.setState({
      overlaps: overlaps.map(o => Array.from(new Set(o.sort()))),
      values
    });
  };
  renderLabel = (index: number, overlapIndex: number | undefined) => {
    const offsetsX =
      overlapIndex === undefined
        ? undefined
        : this.state.overlaps[overlapIndex].reduce(
            (a: [], c: number[], i: number) => {
              return a.length
                ? [
                    ...a,
                    this.RANGE.getOffsets()[
                      this.state.overlaps[overlapIndex][i]
                    ].x
                  ]
                : [
                    this.RANGE.getOffsets()[
                      this.state.overlaps[overlapIndex][i]
                    ].x
                  ];
            },
            []
          );
    const pos: { [key: string]: any } = {};
    let labelValue = '';
    if (
      overlapIndex !== undefined &&
      Math.min(...offsetsX) === this.RANGE.getOffsets()[index].x
    ) {
      const values = [];
      const first = Math.min(...offsetsX);
      const last = Math.max(...offsetsX);
      // Calculate the positioning of the label
      pos.left = `${Math.abs(first - (last + THUMB_SIZE)) / 2}px`;
      pos.transform = 'translate(-50%, 0)';
      for (let v = 0; v < this.state.overlaps[overlapIndex].length; v++) {
        values.push(
          this.state.values[this.state.overlaps[overlapIndex][v]].toFixed(1)
        );
      }
      // And the label value
      const set = new Set(values.sort());
      labelValue = Array.from(set).join(' - ');
    } else {
      labelValue = this.state.values[index].toFixed(1);
    }
    const display =
      (overlapIndex !== undefined &&
        Math.min(...offsetsX) === this.RANGE.getOffsets()[index].x) ||
      overlapIndex === undefined
        ? 'block'
        : 'none';
    return (
      <div
        style={{
          display,
          position: 'absolute',
          top: '-28px',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '14px',
          fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
          padding: '4px',
          borderRadius: '4px',
          backgroundColor: '#548BF4',
          whiteSpace: 'nowrap',
          ...pos
        }}
      >
        {labelValue}
      </div>
    );
  };
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        <Range
          allowOverlap
          values={this.state.values}
          ref={r => (this.RANGE = r)}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={this.onChange}
          renderTrack={({ props, children }) => (
            <div
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                height: '36px',
                display: 'flex',
                width: '100%'
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: '5px',
                  width: '100%',
                  borderRadius: '4px',
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: COLORS,
                    min: MIN,
                    max: MAX
                  }),
                  alignSelf: 'center'
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props, index, isDragged }) => {
            let overlapIndex;
            for (let o = 0; o < this.state.overlaps.length; o++) {
              if (this.state.overlaps[o].includes(index)) overlapIndex = o;
            }

            return (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: `${THUMB_SIZE}px`,
                  width: `${THUMB_SIZE}px`,
                  borderRadius: '4px',
                  backgroundColor: '#FFF',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0px 2px 6px #AAA'
                }}
              >
                {this.renderLabel(index, overlapIndex)}
                <div
                  style={{
                    height: '16px',
                    width: '5px',
                    backgroundColor: isDragged ? '#548BF4' : '#CCC'
                  }}
                />
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default Labeled;
