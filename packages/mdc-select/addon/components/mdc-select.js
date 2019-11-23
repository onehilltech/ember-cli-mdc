/* global mdc */

import Component from '@ember/component';

import layout from '../templates/components/mdc-select';

import { isEmpty, isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';

import { assert } from '@ember/debug';

import { A } from '@ember/array';

const STYLES = ['box', 'outlined'];

export default Component.extend({
  layout,

  classNames: ['mdc-select'],

  classNameBindings: ['disabled:mdc-select--disabled', 'styleClassName', 'isOutlined:mdc-select--outlined'],

  style: null,

  styleClassName: computed ('style', function () {
    const style = this.get ('style');

    if (isEmpty (style)) {
      return null;
    }

    assert (`The style attribute must be one of the following values: ${STYLES}`, STYLES.includes (style));
    return `mdc-select--${style}`;
  }),

  firstOptionIsEmpty: false,

  isOutlined: equal ('style', 'outlined'),

  _select: null,

  _changeEventListener: null,

  _lastState: null,

  init () {
    this._super (...arguments);

    this._changeEventListener = this.didChange.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    this._select = new mdc.select.MDCSelect (this.element);
    this._select.listen ('change', this._changeEventListener);

    let { value, selectedIndex, options } = this.getProperties (['value', 'selectedIndex', 'options']);

    if (isPresent (value)) {
      this._select.value = value;
    }
    else if (isPresent (selectedIndex)) {
      this._select.selectedIndex = selectedIndex;
    }
    else {
      // Check if any of the options is initially selected. This method of selecting
      // has lower precedence than the other methods for selecting the initial value.

      function findSelection (result, option) {
        return !!result ? result : (option.selected ? option.value : (option.group ? option.options.reduce (findSelection, result) : null));
      }

      const selection = options.reduce (findSelection, undefined);

      if (isPresent (selection)) {
        this._select.value = selection;
        this.set ('value', selection);
      }
    }

    // Save the value and selected index as our last state.
    this._lastState = { value, selectedIndex };
  },

  didUpdateAttrs () {
    this._super (...arguments);

    let { value, selectedIndex } = this.getProperties (['value', 'selectedIndex']);

    if (value !== this._lastState.value) {
      this._select.value = value;
      this._lastState.value = value;
    }

    if (selectedIndex !== this._lastState.selectedIndex) {
      this._select.selectedIndex = selectedIndex;
      this._lastState.selectedIndex = selectedIndex;
    }
  },

  willDestroyElement () {
    this._super (...arguments);

    this._select.unlisten ('change', this._changeEventListener);
    this._select.destroy ();
  },

  didChange ({ target: { value, selectedIndex }}) {
    this.setProperties ({value, selectedIndex});
  },

  options: computed ('params.[]', function () {
    let params = this.get ('params');
    return isPresent (params) ? params[0] : A ();
  })
}).reopenClass ({
  positionalParams: 'params'
});
