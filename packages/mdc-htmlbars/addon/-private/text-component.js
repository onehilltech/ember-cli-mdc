import Component from '@ember/component';
import layout from '../templates/components/text-component';

import Theme from 'ember-cli-mdc-theme/mixins/theme';
import Typography from 'ember-cli-mdc-typography/mixins/typography';
import Rtl from 'ember-cli-mdc-rtl/mixins/rtl';

export default Component.extend (Theme, Typography, Rtl, {
  layout
});
