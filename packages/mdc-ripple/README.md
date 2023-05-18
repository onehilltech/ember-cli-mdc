ember-cli-mdc-ripple
==========================

ember-cli addon for [`@material/ripple`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-ripple).

Installation
------------

    ember install ember-cli-mdc-ripple
    
Components & Modifiers
------------------------

This add-on contains the following components and modifiers:

* [{{mdc-ripple}}](#mdc-ripple)

### mdc-ripple

The `{{mdc-ripple}}` modifier adds a ripple effect to any html element.

```handlebars
<div {{mdc-ripple unbounded=[true|false]
                  surfaceColor=[primary|accent]}} />
```
    
Example Code
---------------

Please see `tests/dummy/app/templates` for example code.
