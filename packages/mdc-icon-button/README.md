ember-cli-mdc-icon-button
===========================

ember-cli addon for [`@material/icon-button`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-icon-button).

Installation
------------

    ember install ember-cli-mdc-icon-button

Components
-----------

This package contains the following top-level components.

* [`{{mdc-icon-button}}`](#mdc-icon-button)
* [`{{mdc-icon-button-toggle}}`](#mdc-icon-button-toggle)

mdc-icon-button
---------------------

### Description

An icon that behaves like a button.

### Usage

```handlebars
{{mdc-icon-button name disabled=[true|false]}}
```

### Attributes

* `name` - Name of an icon.
* `disabled` - The button is in a disabled state.

### Examples

```handlebars
{{mdc-icon-button "favorite"}}
{{mdc-icon-button "favorite" disabled=true}}
```

### Listening for Button Clicks

Use the `click` attribute and the `action` helper to listen for button clicks.

```handlebars
{{mdc-icon-button "favorite" click=(action "favorited")}}
```

mdc-icon-button-toggle
--------------------------

### Description

An icon button with toggle states.

### Usage

```handlebars
{{mdc-icon-button-toggle iconOn iconOff
                         on=on
                         label=label
                         toggle=toggle}}
```

### Attributes

* `iconOn` - Name of the icon shown when toggle is on.
* `iconOff` - Name of the icon shown when the toggle is off.
* `on` - Attribute the gets/sets the toggle state.
* `label` - ARIA label for accessibility.
* `toggle` - Action called when the button is toggled.

### Examples

```handlebars
{{mdc-icon-button-toggle "favorite" "favorite_border"
                         on=on
                         label="Add to favorites"
                         toggle=(action (mut state))}}
```
