/* global mdc */

import Drawer from './drawer';

export default Drawer.extend ({
  style: 'temporary',
  Component: mdc.drawer.MDCTemporaryDrawer,
  openEventName: 'MDCTemporaryDrawer:open',
  closeEventName: 'MDCTemporaryDrawer:close',
});

