
import TextField from '@ember/component/text-field';
import TextSupport from '../mixins/text-support';

import $ from 'jquery';

import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { isPresent, isNone } from '@ember/utils';

export default TextField.extend (TextSupport, {
  $lineRipple: null,

  $outline: null,

  /**
   * Insert either a ripple or an outline depending on the selected style.
   *
   * @private
   */
  _applyStyling () {
    const isOutlined = this.get ('isOutlined');

    if (isOutlined) {
      if (isPresent (this.$lineRipple)) {
        // The outline cannot be present if we are using the ripple style.
        this.$lineRipple.remove ();
        this.$lineRipple = null;

        this.set ('_invalidated', true);
      }

      if (isNone (this.$outline)) {
        this.$outline = $('<div class="mdc-notched-outline"><svg><path class="mdc-notched-outline__path"/></svg></div><div class="mdc-notched-outline__idle"></div>');
        this.$outline.insertAfter (this.$label || this.$ ());

        this.set ('_invalidated', true);
      }
    }
    else {
      if (isPresent (this.$outline)) {
        this.$outline.remove ();
        this.$outline = null;

        this.set ('_invalidated', true);
      }

      if (isNone (this.$lineRipple)) {
        this.$lineRipple = $('<div class="mdc-line-ripple"></div>');
        this.$wrapper.append (this.$label || this.$ ());

        this.set ('_invalidated', true);
      }
    }
  },
});
