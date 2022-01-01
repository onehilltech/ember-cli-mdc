ember-cli-mdc-form
======================

ember-cli addon that is a polyfill for &lt;form&gt; elements


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


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

A component version of the HTML `<form>` element. The `<MdcForm>` element allows
its parent to react to changes to the form, such as disabling the submit button when an
input is invalid.

The `<MdcForm>` element will gather all child input elements and listen to changes
in its [validity state](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState).
When the validity state of an input changes, the `<MdcForm>` component will call the
`invalid` action. The `invalid` action can then mutate a variable that enables/disables
the submit button. The `<MdcForm>` does not automatically enable/disable the submit button,
if present, because the parent may have other criteria outside of the `<MdcForm>` knowledge
that determines if the submit button should be enabled/disabled.

### Usage

```handlebars
<MdcForm @validity={{this.validity}} submit={{this.submit}} reset={{this.reset}} >

  {{!-- add input components here --}}
  <MdcButton @type="submit" @label="Submit" />

</MdcForm>
```

### Attributes

* **`validity`** - The action `f(state)` when the form's validity changes.

### Form Validity

The `<MdcForm>` element will yield the form's state (`{isValid, isInvalid}`). The
yielded values can then be used to modify elements inside the form. For example,
it can be use to enable/disable a button.

```handlebars
<MdcForm @validity={{this.validity}} submit={{this.submit}} reset={{this.reset}} as |form|>

  {{!-- add input components here --}}

  <MdcButton @type="submit" @label="Submit" disabled={{form.isInvalid}} />
</MdcForm>
```
