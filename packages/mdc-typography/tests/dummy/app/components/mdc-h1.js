import Component from '@ember/component';
import layout from '../templates/components/mdc-h1';

import { Typography } from 'ember-cli-mdc-typography';

export default Component.extend (Typography, {
  layout,

  tagName: 'h1'
});
