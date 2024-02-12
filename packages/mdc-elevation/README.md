ember-cli-mdc-elevation
======================

ember-cli addon for [`@material/elevation`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-elevation)

Installation
------------

    ember install ember-cli-mdc-elevation

Components and Mixins
-----------------------

### Modifiers

* [mdc-elevation](#mdc-elevation)

mdc-elevation
-----------

### Description

The elevation mixin allows you to programmatically change the elevation of a 
component by adding the elevation class to the HTML element.

### Usage

```handlebars
<div {{mdc-elevation elevation=4}}>
    
</div>
```

### Attributes

* `elevation` - Sets the elevation for the component. Acceptable values are 1 - 12.
* `transition` - Show transition between elevations