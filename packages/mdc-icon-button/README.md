ember-cli-mdc-icon-button
===========================

ember-cli addon for [`@material/icon-button`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-icon-button).

Installation
------------

    ember install ember-cli-mdc-icon-button

Components
-----------

This package contains the following top-level components.

* [`MdcIconButton`](#MdcIconButton)
* [`MdcIconButtonToggle`](#MdcIconButtonToggle)

MdcIconButton
---------------------

### Description

An icon that behaves like a button.

### Usage

```handlebars
{{mdc-icon-button name disabled=[true|false]}}
```

### Attributes

* `@inon` - Name of an icon.

The component also support the standard HTML attributes allowed on the `<button>` element.

### Examples

```handlebars
<MdcIconButton @icon="favorite" />
<MdcIconButton @icon="favorite" disabled={{this.disabled}} />
```

### Listening for Button Clicks

Use the `@onClick` argument to listen for button clicks.

```handlebars
<MdcIconButton @icon="favorite" @onClick={{this.onClick}} />
```

MdcIconButtonToggle
--------------------------

### Description

An icon button with toggle states.

### Usage

```handlebars
  <MdcIconButtonToggle @on={{this.on}}
                       @iconOn={{hash icon=icon}}
                       @iconOff={{hash icon=icon}}
                       @label={{label}}
                       @onChange={{action}} />
```

### Attributes

* `@iconOn` - Hash of properties for the icon when the button is on.
* `@iconOff` - Hash of properties for the icon when the button is off.
* `@on` - The initial state of the toggle button.
* `label` - ARIA label for accessibility.
* `@onChange` - Action called when the button is toggled.

### Examples

```handlebars
  <MdcIconButtonToggle @on={{this.on}}
                       @iconOn={{hash icon="favorite"}}
                       @iconOff={{hash icon="favorite_border"}}
                       @label="Add to favorites"
                       @onChange={{this.onChange}} />
```
