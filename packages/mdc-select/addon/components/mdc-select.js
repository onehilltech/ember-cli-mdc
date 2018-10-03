/* global mdc */

import Component from '@ember/component';
import EmberObject from '@ember/object';

import layout from '../templates/components/mdc-select';

import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';

import { assert } from '@ember/debug';
import { A } from '@ember/array';

const STYLES = ['box', 'outlined'];

function identity (value) {
  return value;
}

export default Component.extend({
  layout,

  classNames: ['mdc-select'],

  classNameBindings: ['dense:mdc-select--dense', 'disabled:mdc-select--disabled', 'styleClassName'],

  dense: false,

  style: null,

  styleClassName: computed ('style', function () {
    const style = this.get ('style');

    if (isEmpty (style)) {
      return null;
    }

    assert (`The style attribute must be one of the following values: ${STYLES}`, STYLES.includes (style));
    return `mdc-select--${style}`;
  }),

  isOutlined: equal ('style', 'outlined'),

  _select: null,

  _changeEventListener: null,

  init () {
    this._super (...arguments);

    this._changeEventListener = this.didChange.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this._select = new mdc.select.MDCSelect (this.element);
    this._select.listen ('change', this._changeEventListener);
  },

  willDestroyElement () {
    this._super (...arguments);

    this._select.unlisten ('change', this._changeEventListener);
    this._select.destroy ();
  },

  displayOptions: computed ('{value,options}', function () {
    const {value, options} = this.getProperties (['value', 'options']);

    if (isEmpty (options)) {
      return A ();
    }

    const transform = this.getWithDefault ('transform', identity);

    return options.map (option => {
      const copy = EmberObject.create (option);
      copy.selected = transform (option.value) === transform (value);

      return copy;
    });
  }),

  didChange () {
    this.setProperties ({
      index: this._select.selectedIndex,
      value: this._select.value
    });
  }
});
