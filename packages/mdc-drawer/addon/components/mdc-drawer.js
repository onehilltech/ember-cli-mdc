import Component from '@ember/component';
import layout from '../templates/components/mdc-drawer';

import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { assert } from '@ember/debug';

import PersistentDrawer from '../-private/persistent-drawer';
import PermanentDrawer from '../-private/permanent-drawer';
import TemporaryDrawer from '../-private/temporary-drawer';

const STYLES = [
  'permanent',
  'persistent',
  'temporary'
];

const DrawerClasses = {
  persistent: PersistentDrawer,
  permanent: PermanentDrawer,
  temporary: TemporaryDrawer
};

export default Component.extend({
  layout,

  tagName: 'aside',
  classNames: ['mdc-drawer', 'mdc-typography'],
  classNameBindings: ['styleClassName'],

  /// The drawer is open.
  open: false,

  style: null,
  styleClassName: computed ('style', function () {
    const style = this.get ('style');

    assert ('The drawer must define the style attribute.', isPresent (style));
    assert (`The style attribute must be one of the following values: ${STYLES}`, STYLES.includes (style));

    return `mdc-drawer--${style}`;
  }),

  _drawer: null,

  didInsertElement () {
    this._super (...arguments);

    // Initialize the open state of the drawer.
    this.get ('drawer').set ('open', this.get ('open'));
  },

  didUpdate () {
    this._super (...arguments);

    this.get ('drawer').set ('open', this.get ('open'));
  },

  didOpen () {
    this.set ('open', true);
  },

  didClose () {
    this.set ('open', false);
  },

  DrawerClass: computed ('style', function () {
    const style = this.get ('style');
    return isPresent (style) ? DrawerClasses[style] : null;
  }),

  drawer: computed ('DrawerClass', function () {
    if (isPresent (this._drawer)) {
      this._drawer.willDestroyElement (this);
      this._drawer = null;
    }

    const DrawerClass = this.get ('DrawerClass');
    this._drawer = DrawerClass.create ();
    this._drawer.didInsertElement (this);

    return this._drawer;
  }),
});
