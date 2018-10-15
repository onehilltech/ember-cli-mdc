import Mixin from '@ember/object/mixin';

import SurfaceTheme from './surface-theme';
import BackgroundTheme from './background-theme';
import TextTheme from './text-theme';

export default Mixin.create (TextTheme, BackgroundTheme, SurfaceTheme, {
  customPropertyBindings: [
    'themePrimaryColor:--mdc-theme-primary',
    'themeSecondaryColor:--mdc-theme-secondary'
  ]
});
