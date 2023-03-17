ember-cli-mdc-form-field
======================

ember-cli addon for [`@material/form-field`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-form-field).


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


Installation
------------

    ember install ember-cli-mdc-form-field

Components & Mixins
-------------------

This package contains the following top-level components.

* [`{{mdc-form-field}}`](#mdc-form-field)

This package contains the following mixins:

* `FormFieldMixin`

mdc-form-field
---------------------

### Description

Aligns a web form field with its label and makes it RTL-aware. It also activates a ripple effect
upon interacting with the label.

### Usage

```handlebars
{{#mdc-form-field alignEnd=true}}
  {{!-- add input here --}}
{{/mdc-form-field}}
```

### Attributes

* **`alignEnd`** - Position the input after the label. (optional)
