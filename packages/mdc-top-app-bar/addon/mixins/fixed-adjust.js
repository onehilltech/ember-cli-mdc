import Mixin from '@ember/object/mixin';

import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

import { assert } from '@ember/debug';

const STYLES = ['fixed','dense','prominent','short'];

export default Mixin.create ({
  topAppBarStyle: null,

  classNameBindings: ['fixedAdjustClassName'],

  fixedAdjustClassName: computed ('topAppBarStyle', function () {
    const topAppBarStyle = this.get ('topAppBarStyle');

    if (isEmpty (topAppBarStyle)) {
      return 'mdc-top-app-bar--fixed-adjust';
    }

    assert (`The topAppBarStyle attribute must be one of the following values: ${STYLES}`, STYLES.includes (topAppBarStyle));
    return topAppBarStyle === 'fixed' ? 'mdc-top-app-bar--fixed-adjust' : `mdc-top-app-bar--${topAppBarStyle}-fixed-adjust`;
  }),
});
