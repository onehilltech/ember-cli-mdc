import Component from '@ember/component';
import layout from '../templates/components/mdc-card-media';

import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Component.extend({
  layout,

  classNames: ['mdc-card__media'],
  classNameBindings: ['scaleClassName'],

  /// The scale for the media. Either 'square' or '16-9'.
  scale: null,

  scaleClassName: computed ('scale', function () {
    const scale = this.get ('scale');
    return isPresent ('scale') ? `mdc-card__media--${scale}` : null;
  })
});
