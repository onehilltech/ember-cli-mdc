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
* [`{{mdc-button-linkto}}`](#mdc-button-linkto)

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

### Listening for Button Clicks

Use the `click` attribute and the `action` helper to listen for button clicks.

```handlebars
{{#mdc-button style="raised" click=(action "clicked")}}Button{{/mdc-button}}
```

### Adding Icons to Buttons

Use `{{mdc-button-icon}}`, which extends the 
[`{{mdc-icon}}`](https://github.com/onehilltech/ember-cli-mdc/tree/master/packages/mdc-icon) 
component, to add an icon to the button.

```handlebars
{{#mdc-button style="raised"}}{{mdc-button-icon "event"}}Button{{/mdc-button}}
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
{{#mdc-button-linkto "contact" style="unelevated"}}Contact Us{{/mdc-button-linkto}}
{{#mdc-button-linkto "user" user.id style="raised"}}Contact Us{{/mdc-button-linkto}}
```    

