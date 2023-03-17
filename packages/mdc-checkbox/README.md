ember-cli-mdc-checkbox
======================

ember-cli addon for [`@material/checkbox`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-checkbox).


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


Installation
------------

    ember install ember-cli-mdc-checkbox

Components
-----------

This package contains the following top-level components.

* [`<MdcCheckbox>`](#mdc-checkbox)
* [`<MdcCheckboxWithLabel>`](#mdc-checkbox-with-label)

MdcCheckbox
---------------------

### Description

A standalone checkbox input element that does not contain a label.

### Usage

```handlebars
<MdcCheckbox @checked=checked @disabled=disabled />
```

### Attributes

* **`checked`** - The checkbox is checked.
* **`disabled`** - The checkbox is disabled.

MdcCheckboxWithLabel
------------------------------

### Description

A checkbox input element that contains a label.

### Usage

```handlebars
<MdcCheckboxWithLabel checked=checked disabled=disabled alignEnd=true
  This is a checkbox that contains a label. You can add HTML styling 
  tags here to make a more complex label.
</MdcCheckboxWithLabel>
```

### Attributes

* **`checked`** - The checkbox is checked.
* **`disabled`** - The checkbox is disabled.
* **`alignEnd`** - Align the checkbox after the label.
