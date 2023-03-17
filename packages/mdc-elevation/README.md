ember-cli-mdc-elevation
======================

ember-cli addon for [`@material/elevation`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-elevation)

Installation
------------

    ember install ember-cli-mdc-elevation

<<<<<<< HEAD
Components and Mixins
-----------------------
=======
* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above
>>>>>>> 3fc4d634 (v3.18.0...v3.28.6)

### Components

none

### Mixins

* [Elevation](#elevation)

Elevation
-----------

### Description

The elevation mixin allows you to programmatically change the elevation of a 
component by adding the elevation class to the HTML element.

### Usage

```javascript
import Component from '@ember/component';
import Elevation from 'ember-cli-mdc-elevation/mixins/elevation';

export default Component.extend (Elevation, {
  elevation: 4              // add mdc-elevation--z4 class to element
});

```

### Attributes

* `elevation` - Sets the elevation for the component. Acceptable values are 1 - 12.




