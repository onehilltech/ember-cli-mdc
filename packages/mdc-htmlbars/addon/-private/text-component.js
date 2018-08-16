import Component from '@ember/component';
import layout from '../templates/components/text-component';

import { Theme } from 'ember-cli-mdc-theme';
import { Typography } from 'ember-cli-mdc-typography';

export default Component.extend (Theme, Typography, {
  layout
});
