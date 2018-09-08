import Mixin from '@ember/object/mixin';
import Ripple from 'ember-cli-mdc-ripple/mixins/ripple';

import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Mixin.create (Ripple, {
  classNames: ['mdc-button'],

  classNameBindings: ['mdcStyleClassName', 'dense:mdc-button--dense'],

  attributeBindings: ['disabled'],

  dense: false,

  mdcStyleClassName: computed ('style', function () {
    const style = this.get ('style');
    return isPresent (style) ? `mdc-button--${style}` : null;
  }),
});
