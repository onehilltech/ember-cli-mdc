ember-cli-mdc-touch-target
======================

ember-cli addon for [`@material/touch-target`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-touch-target)

Installation
------------

    ember install ember-cli-mdc-touch-target

<<<<<<< HEAD
Modifiers
-----------
=======
* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above
>>>>>>> 996f5a08 (v3.16.2...v3.28.6)

This package contains the following modifiers.

* [`mdc-touch-target`](#mdc-touch-target)

mdc-touch-target
---------------------

### Description

Increase the touch target of the associated component.

### Usage

```handlebars
<MdcButton {{mdc-touch-target hint="button" wrap=true}} /> 
```

### Attributes

* `hint` - Optional component type hint. If not provided, then modifier deduce component type. 
* `wrap` - Wrap the element in a touch target wrapper

