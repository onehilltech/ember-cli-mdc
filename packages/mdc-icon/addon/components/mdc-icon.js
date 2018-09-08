import Component from '@ember/component';
import layout from '../templates/components/mdc-icon';

import { computed } from '@ember/object';

import TextTheme from 'ember-cli-mdc-theme/mixins/text-theme';

export default Component.extend (TextTheme, {
  layout,

  tagName: 'i',

  classNames: ['material-icons'],

  icon: computed ('params.[]', function () {
    return this.get ('params')[0];
  })
}).reopenClass ({
  positionalParams: 'params'
});
