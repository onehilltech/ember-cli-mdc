/* global mdc */

import Drawer from './drawer';

export default Drawer.extend ({
  style: 'persistent',
  Component: mdc.drawer.MDCPersistentDrawer,
  openEventName: 'MDCPersistentDrawer:open',
  closeEventName: 'MDCPersistentDrawer:close',
});

