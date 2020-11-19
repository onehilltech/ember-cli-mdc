import Service from '@ember/service';

import { gte, lt, and } from '@ember/object/computed';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

const BREAKPOINT_PHONE = 0;
const BREAKPOINT_TABLET = 480;
const BREAKPOINT_DESKTOP = 840;

export default Service.extend ({
  width: null,

  /// The layout is for a phone.
  isPhone: and ('_minWidthPhone', '_maxWidthPhone'),

  /// The layout is for a tablet.
  isTablet: and ('_minWidthTablet', '_maxWidthTablet'),

  /// The layout is for a desktop.
  isDesktop: gte ('width', BREAKPOINT_DESKTOP),

  _resizeEventListener: null,

  _currentClassName: null,

  init () {
    this._super (...arguments);

    this._resizeEventListener = this.didResize.bind (this);

    if (window) {
      window.addEventListener ('resize', this._resizeEventListener);

      this.didResize ();
    }
  },

  destroy () {
    this._super (...arguments);

    if (window) {
      window.removeEventListener ('resize', this._resizeEventListener);
    }
  },

  didResize () {
    let { _currentClassName } = this;
    this.set ('width', window.innerWidth);
    let { currentClassName } = this;

    // Replace the layout class name if the layout form factor has changed.

    if (_currentClassName !== currentClassName) {
      if (isPresent (_currentClassName)) {
        document.body.classList.remove (_currentClassName);
      }

      document.body.classList.add (currentClassName)
      this._currentClassName = currentClassName;
    }
  },

  currentClassName: computed ('width', function () {
    return this.isPhone ? 'mdc-layout--phone' : (this.isTablet ? 'mdc-layout--tablet' : 'mdc-layout--desktop');
  }),

  _minWidthPhone: gte ('width', BREAKPOINT_PHONE),
  _maxWidthPhone: lt ('width', BREAKPOINT_TABLET),

  _minWidthTablet: gte ('width', BREAKPOINT_TABLET),
  _maxWidthTablet: lt ('width', BREAKPOINT_DESKTOP)
});
