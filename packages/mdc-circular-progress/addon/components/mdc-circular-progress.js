/* globals mdc */

import MdcProgressIndicatorComponent from 'ember-cli-mdc-progress-indicator';

import { assert } from '@ember/debug';
import { MDCCircularProgress } from '@material/circular-progress';

const SIZE_ATTRIBUTES = {
  small: {
    width: '24px',
    height: '24px',
    cx: 12,
    cy: 12,
    r: 8.75,
    dasharray: 54.978,
    dashoffset: 27.489,
    viewBox: '0 0 24 24',
    strokeWidth: 2.5
  },

  medium: {
    width: '36px',
    height: '36px',
    cx: 16,
    cy: 16,
    r: 12.5,
    dasharray: 78.54,
    dashoffset: 39.27,
    viewBox: '0 0 32 32',
    strokeWidth: 3
  },

  large: {
    width: '48px',
    height: '48px',
    cx: 24,
    cy: 24,
    r: 18,
    dasharray: 113.097,
    dashoffset: 56.549,
    viewBox: '0 0 48 48',
    strokeWidth: 4
  }
};

const SIZES = Object.keys (SIZE_ATTRIBUTES);


export default class MdcCircularProgressComponent extends MdcProgressIndicatorComponent {
  doCreateComponent (element) {
    return new MDCCircularProgress (element);
  }

  get size () {
    return this.args.size  || 'large';
  }

  get sizeClassName () {
    let size = this.size;

    assert (`The @size attribute must be one of the following: ${SIZES}`, SIZES.includes (size));

    return `mdc-circular-progress--${size}`;
  }

  get cx () {
    return SIZE_ATTRIBUTES[this.size].cx;
  }

  get cy () {
    return SIZE_ATTRIBUTES[this.size].cy;
  }

  get r () {
    return SIZE_ATTRIBUTES[this.size].r;
  }

  get viewBox () {
    return SIZE_ATTRIBUTES[this.size].viewBox;
  }

  get dasharray () {
    return SIZE_ATTRIBUTES[this.size].dasharray;
  }

  get dashoffset () {
    return SIZE_ATTRIBUTES[this.size].dashoffset;
  }

  get width () {
    return SIZE_ATTRIBUTES[this.size].width;
  }

  get height () {
    return SIZE_ATTRIBUTES[this.size].height;
  }

  get strokeWidth () {
    return SIZE_ATTRIBUTES[this.size].strokeWidth;
  }
}
