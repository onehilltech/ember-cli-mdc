ember-cli-mdc-button
======================

ember-cli addon for [`@material/button`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-button)

Installation
------------

    ember install ember-cli-mdc-button

Components
-----------

This package contains the following top-level components.

* [`<MdcButton>`](#MdcButton)
* [`<MdcButtonLinkTo>`](#MdcButtonLinkTo)

MdcButton
---------------------

### Description

Add a button element to the page.

### Usage

The inline version:

```handlebars
<MdcButton @style=[raised|unelevated|outlined]
           @label=label
           @leadingIcon=icon
           @trailingIcon=icon />
```

or the block version:

```handlebars
<MdcButton @style=[raised|unelevated|outlined]>
  <!-- optional leading icon -->
  <MdcButtonIcon @icon=icon />

  <MdcButtonLabel>Button Label</MdcButtonLabel>

  <!-- optional trailing icon -->
  <MdcButtonIcon @icon=icon />
</MdcButton>
```

### Attributes

* `style` - The button style. Must either be one of the following string values: `raised`, `unelevated`, or `outlined`
* `label` - The button label
* `leadingIcon` - Icon displayed before the label
* `trailingIcon` - Icon displayed after the label

### Examples

```handlebars
<MdcButton @style="raised" @label="Button" />
<MdcButton @style="outlined" @label="Button" />
```

### Listening for Button Clicks

Use the `click` attribute and the `action` helper to listen for button clicks.

```handlebars
<MdcButtton @style="raised" @label="Button" {{on "click" this.clicked}} />
```

### HTML attributes

The button also supports the standard HTML attributes of a button:

```handlebars
<MdcButtton @style="raised" @label="Button" {{on "click" this.clicked}} disabled={{this.disabled}} />
```

MdcButtonLinkTo
---------------------

The `{{mdc-button-linkto}}` components will bind the button to a route, which means you
do not have to create an action that routes to a new location when clicked. The 
does this by extending the [`LinkComponent`](https://emberjs.com/api/ember/3.3/classes/LinkComponent) 
component, and applying the [`Button`](https://github.com/onehilltech/ember-cli-mdc/blob/master/packages/mdc-button/addon/mixins/button.js) mixin
exported from this module.

> Because `{{mdc-button-linkto}}` extends [`LinkComponent`](https://emberjs.com/api/ember/3.3/classes/LinkComponent),
> all properties and methods available on [`LinkComponent`](https://emberjs.com/api/ember/3.3/classes/LinkComponent)
> are available on `{{mdc-button-linkto}}`.

```handlebars
{{!-- The button label is the first parameter for inline links. --}}
{{mdc-button-linkto "Contact Us" "contact" style="unelevated"}}

{{#mdc-button-linkto "user" user.id style="raised"}}
  {{#mdc-button-label}}Contact Us{{/mdc-button-label}}
{{/mdc-button-linkto}}
```    

