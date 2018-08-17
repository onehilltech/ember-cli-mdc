ember-cli-mdc-checkbox
======================

ember-cli addon that contains helper components and installs `ember-cli-mdc` 
packages related to HTML forms.

Installation
------------

    ember install ember-cli-mdc-form

Installed Packages
------------------

This package installs the following packages:

* [`ember-cli-mdc-textfield`](https://github.com/onehilltech/ember-cli-mdc/tree/master/packages/mdc-textfield)
* [`ember-cli-mdc-button`](https://github.com/onehilltech/ember-cli-mdc/tree/master/packages/mdc-button)
* [`ember-cli-mdc-select`](https://github.com/onehilltech/ember-cli-mdc/tree/master/packages/mdc-select)
* [`ember-cli-mdc-switch`](https://github.com/onehilltech/ember-cli-mdc/tree/master/packages/mdc-switch)
* [`ember-cli-mdc-checkbox`](https://github.com/onehilltech/ember-cli-mdc/tree/master/packages/mdc-checkbox)

Components
-------------

This package contains the following top-level components.

* [`mdc-form`](#mdc-form)


mdc-form
-------------

### Description

A component version of the HTML `<form>` element. The `mdc-form` component allows its 
parent to react to changes to the form, such as disabling the submit button when an 
input is invalid.

The `mdc-form` element will gather all child input elements and listen to changes
in its [validity state](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState).
When the validity state of the inputs change, the `mdc-form` component will call the 
`invalid` action.


### Usage

```handlebars
{{#mdc-form submit=(action "submit") invalid=(action (mut invalid))}}
  {{!-- add input components here --}}
  
  {{#mdc-button type="submit" disabled=invalid}}Submit{{/mdc-button}}
{{/mdc-form}}
```

### Attributes

* **`submit`** - The action `f()` called when a button with `type=submit` is clicked and all inputs are valid.
* **`invalid`** - The action `f(invalid)` called when the invalid state of the any `input` element changes.
