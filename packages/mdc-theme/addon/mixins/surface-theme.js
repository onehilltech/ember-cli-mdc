import Mixin from '@ember/object/mixin';
import { isPresent } from '@ember/utils';

export default Mixin.create ({
  classNameBindings: [
    'themeSurface:mdc-theme--surface',
  ],

  /// {@ CSS Custom Properties

  /// Sets the --mdc-theme-surface CSS property.
  themeSurfaceColor: null,

  /// @}

  didInsertElement () {
    this._super (...arguments);

    let themeSurfaceColor = this.get ('themeSurfaceColor');

    if (isPresent (themeSurfaceColor)) {
      this.element.style.setProperty ('--mdc-theme-surface', themeSurfaceColor);
    }
    else {
      this.element.style.removeProperty ('--mdc-theme-surface');
    }
  },

  didUpdateAttrs () {
    this._super (...arguments);

    let themeSurfaceColor = this.get ('themeSurfaceColor');

    if (isPresent (themeSurfaceColor)) {
      this.element.style.setProperty ('--mdc-theme-surface', themeSurfaceColor);
    }
    else {
      this.element.style.removeProperty ('--mdc-theme-surface');
    }
  }
});
