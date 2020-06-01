ember-cli-mdc-button
======================

ember-cli addon for [`@material/button`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-button)

Installation
------------

    ember install ember-cli-mdc-button

Components
-----------

This package contains the following top-level components.

* [`{{mdc-button}}`](#mdc-button)
* [`{{mdc-button-linkto}}`](#mdc-button-linkto)

mdc-button
---------------------

### Description

Add a button element to the parent.

### Usage

The inline version:

```handlebars
{{mdc-button style=[raised|unelevated|outlined]
             dense=[true|false]
             disabled=[true|false]
             type=type
             label=label
             leadingIcon=icon
             trailingIcon=icon}}
```

or the block version:

```handlebars
{{#mdc-button style=[raised|unelevated|outlined]
              dense=[true|false]
              disabled=[true|false]
              type=type}}
  {{!-- leading icon (optional) --}}
  {{mdc-button-icon icon}}
  
  {{#mdc-button-label}}Label{{/mdc-button-label}}
  
  {{!-- trailing icon (optional) --}}
  {{mdc-button-icon icon}}
{{/mdc-button}}
```

### Attributes

* `style` - The button style. Must either be one of the following string values: `raised`, `unelevated`, or `outlined`
* `dense` - The button is dense
* `disabled` - The button is in a disabled state
* `type` - The type of button (*e.g.*, submit or reset)
* `label` - The button label
* `leadingIcon` - Icon displayed before the label
* `trailingIcon` - Icon displayed after the label

### Examples

```handlebars
{{mdc-button style="raised" label="Button"}}
{{mdc-button style="outlined" label="Button"}}
```

### Listening for Button Clicks

Use the `click` attribute and the `action` helper to listen for button clicks.

```handlebars
{{mdc-button style="raised" label="Button" click=(action "clicked")}}
```

mdc-button-linkto
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

