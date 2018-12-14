import Service from '@ember/service';

import { gte, lt, and } from '@ember/object/computed';
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

  init () {
    this._super (...arguments);

    this._resizeEventListener = this.didResize.bind (this);

    if (window) {
      window.addEventListener ('resize', this._resizeEventListener);
    }

    this.set ('width', window.outerWidth);
  },

  destroy () {
    this._super (...arguments);

    if (window) {
      window.removeEventListener ('resize', this._resizeEventListener);
    }
  },

  didResize () {
    this.set ('width', window.outerWidth);
  },

  _minWidthPhone: gte ('width', BREAKPOINT_PHONE),
  _maxWidthPhone: lt ('width', BREAKPOINT_TABLET),

  _minWidthTablet: gte ('width', BREAKPOINT_TABLET),
  _maxWidthTablet: lt ('width', BREAKPOINT_DESKTOP)
});
