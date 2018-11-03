ember-cli-mdc-form
======================

ember-cli addon that is a polyfill for <form> elements

Installation
------------

    ember install ember-cli-mdc-form

Components
-------------

This package contains the following top-level components.

* [`mdc-form`](#mdc-form)


mdc-form
-------------

### Description

A component version of the HTML `<form>` element. The `{{mdc-form}}` component allows 
its parent to react to changes to the form, such as disabling the submit button when an 
input is invalid.

The `{{mdc-form}}` element will gather all child input elements and listen to changes
in its [validity state](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState).
When the validity state of an input changes, the `{{mdc-form}}` component will call the 
`invalid` action. The `invalid` action can then mutate a variable that enables/disables
the submit button. The `{{mdc-form}}` does not automatically enable/disable the submit button,
if present, because the parent may have other criteria outside of the `{{mdc-form}}` knowledge 
that determines if the submit button should be enabled/disabled.

### Usage

```handlebars
{{#mdc-form submit=(action "submit") 
            change=(action (mut valid))}}
  {{!-- add input components here --}}
  
  {{#mdc-button type="submit"}}Submit{{/mdc-button}}
{{/mdc-form}}
```

### Attributes

* **`submit`** - The action `f()` called when a button with `type=submit` is clicked and all inputs are valid.
* **`change`** - The action `f(state)` when the form's validity changes.

### Form Validity

The `{{mdc-form}}` element will yield the `valid` and `invalid`, which is just `not(valid)`, state
of the form. The yielded values can then be used to modify elements inside the form. For example,
it can be use to enable or disable a button.

> The form yields both `valid` and `invalid` because you cannot negate either value
> when setting an attribute value without the use of a helper, such as `not` in
> `ember-truth-helpers`. We prefer not to require you to use an additional add-on if
> it is not necessary.

```handlebars
{{#mdc-form submit=(action "submit") 
            change=(action (mut valid)) as |valid invalid|}}
  {{!-- add input components here --}}
  
  {{#mdc-button type="submit" disabled=invalid}}Submit{{/mdc-button}}
{{/mdc-form}}
```
