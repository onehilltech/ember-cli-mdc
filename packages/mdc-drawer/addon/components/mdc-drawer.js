import Component from '@ember/component';
import layout from '../templates/components/mdc-drawer';

import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';

const STYLES = [
  'dismissible',
  'modal'
];

export default Component.extend ({
  layout,

  tagName: 'aside',

  classNames: ['mdc-drawer', 'mdc-typography'],

  classNameBindings: ['styleClassName'],

  styleClassName: computed ('style', function () {
    const style = this.get ('style');

    assert (`The style must be one of the following: ${STYLES}`, STYLES.includes (style));

    return `mdc-drawer--${style}`;
  }),

  didInsertElement () {
    this._super (...arguments);

    this._drawer = new mdc.drawer.MDCDrawer (this.element);
    this._drawer.listen ('MDCDrawer:opened', this.didOpen.bind (this));
    this._drawer.listen ('MDCDrawer:closed', this.didClose.bind (this));

    this._drawer.open = this.get ('open');
  },

  didUpdate () {
    this._super (...arguments);

    this._drawer.open = this.get ('open');
  },

  willDestroyElement () {
    this._super (...arguments);

    this._drawer.unlisten ('MDCDrawer:opened', this.didOpen.bind (this));
    this._drawer.unlisten ('MDCDrawer:closed', this.didClose.bind (this));
  },

  didOpen () {
    this.set ('open', true);
  },

  didClose () {
    this.set ('open', false);
  }
});
