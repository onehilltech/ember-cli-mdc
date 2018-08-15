/* global mdc */

import Component from '@ember/component';
import Object from '@ember/object';

import layout from '../templates/components/mdc-select';

import { isNone, isPresent, isEmpty } from '@ember/utils';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';

import { assert } from '@ember/debug';

const STYLES = ['box', 'outlined'];

export default Component.extend({
  layout,

  classNames: ['mdc-select'],

  classNameBindings: ['disabled:mdc-select--disabled', 'styleClassName'],

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

  didInsertElement () {
    this._super (...arguments);

    this._select = new mdc.select.MDCSelect (this.element);
    this._select.listen ('change', this.didChange.bind (this));
  },

  willDestroyElement () {
    this._super (...arguments);

    this._select.unlisten ('change', this.didChange.bind (this));
    this._select.destroy ();
  },

  displayOptions: computed ('{value,options}', function () {
    const {value, options} = this.getProperties (['value', 'options']);

    return options.map (option => {
      const copy = Object.create (option);
      copy.selected = option.value === value;

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
