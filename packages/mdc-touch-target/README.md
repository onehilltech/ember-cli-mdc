ember-cli-mdc-touch-target
======================

ember-cli addon for [`@material/touch-target`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-touch-target)

Installation
------------

    ember install ember-cli-mdc-touch-target

Modifiers
-----------

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

