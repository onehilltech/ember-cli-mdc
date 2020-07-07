import Component from '@ember/component';

import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Component.extend({
  classNames: ['mdc-card__media'],
  classNameBindings: ['scaleClassName'],

  /// The scale for the media. Either 'square' or '16-9'.
  scale: null,

  scaleClassName: computed ('scale', function () {
    const scale = this.scale;
    return isPresent ('scale') ? `mdc-card__media--${scale}` : null;
  })
});
