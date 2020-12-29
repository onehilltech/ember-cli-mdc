import Service from '@ember/service';
import { tracked } from "@glimmer/tracking";

import { gte, lt, and } from '@ember/object/computed';
import { isPresent } from '@ember/utils';

const BREAKPOINT_PHONE = 0;
const BREAKPOINT_TABLET = 480;
const BREAKPOINT_DESKTOP = 840;

export default class LayoutService extends Service {
  @tracked
  width = null;

  /// The layout is for a phone.
  @and ('_minWidthPhone', '_maxWidthPhone')
  isPhone;

  /// The layout is for a tablet.
  @and ('_minWidthTablet', '_maxWidthTablet')
  isTablet;

  /// The layout is for a desktop.
  @gte ('width', BREAKPOINT_DESKTOP)
  isDesktop;

  _resizeEventListener = null;

  _currentClassName = null;

  constructor () {
    super (...arguments);

    this._resizeEventListener = this.didResize.bind (this);

    if (window) {
      window.addEventListener ('resize', this._resizeEventListener);

      this.didResize ();
    }
  }

  willDestroy () {
    super.willDestroy ();

    if (window) {
      window.removeEventListener ('resize', this._resizeEventListener);
    }
  }

  didResize () {
    let { _currentClassName } = this;
    this.width = window.innerWidth;
    let { currentClassName } = this;

    // Replace the layout class name if the layout form factor has changed.

    if (_currentClassName !== currentClassName) {
      if (isPresent (_currentClassName)) {
        document.body.classList.remove (_currentClassName);
      }

      document.body.classList.add (currentClassName)
      this._currentClassName = currentClassName;
    }
  }

  get currentClassName () {
    return this.isPhone ? 'mdc-layout--phone' : (this.isTablet ? 'mdc-layout--tablet' : 'mdc-layout--desktop');
  }

  @gte ('width', BREAKPOINT_PHONE)
  _minWidthPhone;

  @lt ('width', BREAKPOINT_TABLET)
  _maxWidthPhone;

  @gte ('width', BREAKPOINT_TABLET)
  _minWidthTablet;

  @lt ('width', BREAKPOINT_DESKTOP)
  _maxWidthTablet;
}
