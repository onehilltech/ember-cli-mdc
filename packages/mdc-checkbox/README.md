ember-cli-mdc-checkbox
======================

ember-cli addon for [`@material/checkbox`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-checkbox).

Installation
------------

    ember install ember-cli-mdc-checkbox

Components
-----------

This package contains the following top-level components.

* [`<MdcCheckbox>`](#mdc-checkbox)

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

Labels using Form Fields
------------------------------

Use the `<MdcFormField>` component when you want to add a label to the checkbox
component. You can use the `@label` attribute, or the `<:label>` named template.

> We recommend you use `@label` for simple labels, and `<:label>` for complex labels.

```handlebars
<!-- This example use the @label attribute -->
<MdcFormField @label="This is an example checkbox with label">
  <MdcCheckbox />
</MdcFormField>

<!-- This example use the <:label> named block -->
<MdcFormField @label="This is an example checkbox with label">
    <:label>"This is an example checkbox with label"</:label>
    <:default><MdcCheckbox /></:default>
</MdcFormField>
```
