import Component from '@ember/component';
import layout from '../templates/components/mdc-top-app-bar-section';

import { computed } from '@ember/object';
import { isNone, isPresent } from '@ember/utils';
import { assert } from '@ember/debug';
import { dasherize } from '@ember/string';

const POSITIONS = ['alignStart', 'alignEnd'];

export default Component.extend({
  layout,

  tagName: 'section',

  classNames: ['mdc-top-app-bar__section'],
  classNameBindings: ['positionClassName'],

  attributeBindings: ['role'],

  position: null,
  positionClassName: computed ('position', function () {
    const position = this.get ('position');

    if (isNone (position)) {
      return null;
    }

    assert ('The position property must be one of the following values: alignStart, alignEnd.', POSITIONS.includes (position));
    return `mdc-top-app-bar__section--${dasherize (position)}`;
  })
});
