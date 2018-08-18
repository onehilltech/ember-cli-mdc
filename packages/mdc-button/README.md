ember-cli-mdc-button
======================

ember-cli addon for [`@material/button`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-button).

Installation
------------

    ember install ember-cli-mdc-button

Components
-----------

This package contains the following top-level components.

* [`{{mdc-button}}`](#mdc-button)

mdc-button
---------------------

### Description

Add a button element to the parent.

### Usage

```handlebars
{{mdc-button style=[raised|unelevated|outlined]
             dense=[true|false]
             disabled=[true|false]
             type=type
}}
```

### Attributes

* `style` - The button style. Must either be one of the following string values: `raised`, `unelevated`, or `outlined`
* `dense` - The button is dense.
* `disabled` - The button is in a disabled state.
* `type` - The type of button (*e.g.*, submit or reset).

### Examples

```handlebars
{{#mdc-button style="raised"}}Button{{/mdc-button}}
{{#mdc-button style="outlined"}}Button{{/mdc-button}}
```

## Adding Button Icons

Use the `{{mdc-button-icon}}`, which extends the `{{mdc-icon}}` component, to add an 
icon to the button.

```handlebars
{{#mdc-button style="raised"}}{{mdc-button-icon "event"}}Button{{/mdc-button}}
```

## Button Clicks

Use the `click` attribute and the `action` helper to listen for button clicks.

```handlebars
{{#mdc-button style="raised" click=(action "clicked")}}Button{{/mdc-button}}
```
