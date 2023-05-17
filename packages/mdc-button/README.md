ember-cli-mdc-button
======================

ember-cli addon for [`@material/button`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-button)

Installation
------------

    ember install ember-cli-mdc-button

Styles
-------


```sass
@use "@material/button/mixins" as button;
```


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

### Listening for button clicks

Use the `on` modifier to listen for button clicks.

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

The `MdcButtonLinkTo` components will bind the button to a route, which means you
do not have to create an action that routes to a new location when clicked. The 
does this by extending the [`LinkComponent`](https://emberjs.com/api/ember/3.18/classes/LinkComponent) 
component, and applying the [`Button`](https://github.com/onehilltech/ember-cli-mdc/blob/master/packages/mdc-button/addon/mixins/button.js) mixin
exported from this module.

> Because `MdcButtonLinkTo` extends [`LinkComponent`](https://emberjs.com/api/ember/3.18/classes/LinkComponent),
> all properties and methods available on [`LinkComponent`](https://emberjs.com/api/ember/3.18/classes/LinkComponent)
> are available on `MdcButtonLinkTo`.

```handlebars
{{!-- The button label is the first parameter for inline links. --}}
<MdcButtonLinkTo @route="contact" @label="Contact Us" @style="unelevated" />

<MdcButtonLinkTo @route="user" @model={{this.user.id}} @style="raised">
  <MdcButtonLabel>Contact Us</MdcButtonLabel>
</MdcButtonLinkTo>
```

