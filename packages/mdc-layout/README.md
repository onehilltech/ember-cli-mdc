ember-cli-mdc-layout
======================

ember-cli support addon for layout-based logic

Installation
------------

    ember install ember-cli-mdc-layout
    
Services
-------------

This package contains the following services.

* [`layout`](#layout-service)


Layout Service
------------------

The `layout` service is used to query information about the current device layout. Its 
primary purpose is to support device-specific layouts in template definitions. The `layout` 
service has the following properties:

* `isPhone` - Test if the current layout is for a phone
* `isTablet` - Test if current layout is for a tablet
* `isDesktop` - Test if the current layout is for a desktop

### Usage

You use the `layout` service by injecting it into either a controller or component. Here
is a controller were we inject the `layout` service.

```javascript
// controllers/index.js

import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend ({
  layout: service ()
});
```

We can then use the layout service to add conditional blocks based on different 
device layouts.

```handlebars
// templates/index.js
<div>We are now viewing this applicaiton on a 
  {{#if layout.isPhone}}
  phone.
  {{else if layout.isTablet}}
  tablet.
  {{else if layout.isDesktop}}
  desktop.
  {{/if}}
</div>
```

