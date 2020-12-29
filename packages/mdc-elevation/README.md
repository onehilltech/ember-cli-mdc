ember-cli-mdc-elevation
======================

ember-cli addon for [`@material/elevation`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-elevation)

Installation
------------

    ember install ember-cli-mdc-elevation

Components and Mixins
-----------------------

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




