<<<<<<< HEAD
ember-cli-mdc-ripple
======================
=======
ember-cli-mdc-line-ripple
==============================================================================

[Short description of the addon.]


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above
>>>>>>> 79f8b1fe (v3.18.0...v3.28.6)

ember-cli addon for [`@material/line-ripple`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-line-ripple).

Installation
------------

    ember install ember-cli-mdc-ripple
 
Components & Modifiers
---------------------------

This add-on defines the following modifiers:

* [`{{mdc-line-ripple}}`](#mdc-line-ripple)

### mdc-line-ripple

The `{{mdc-line-ripple}}` modifier adds a line ripple effect to the parent container element.

```handlebars
<div class="container">
<div {{mdc-line-ripple active=[true|false]
                       rippleCenter=[number]}} />
</div>

```

The `active` named argument on the modifier is used to activate and deactivate the line ripple.
    
Example Code
---------------

Please see `tests/dummy/app/templates` for code examples.

