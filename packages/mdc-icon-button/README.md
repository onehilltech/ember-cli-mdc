ember-cli-mdc-icon-button
===========================

ember-cli addon for [`@material/icon-button`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-icon-button).

Installation
------------

    ember install ember-cli-mdc-icon-button

<<<<<<< HEAD
Components
-----------
=======
* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above
>>>>>>> 46b0001b (v3.18.0...v3.28.6)

This package contains the following top-level components.

* [`MdcIconButton`](#MdcIconButton)
* [`MdcIconButtonToggle`](#MdcIconButtonToggle)

MdcIconButton
---------------------

### Description

An icon that behaves like a button.

### Usage

```handlebars
<MdcIconButton @icon={{name}} />
```

### Attributes

* `@icon` - Name of an icon.

The component also support the standard HTML attributes allowed on the `<button>` element.

### Examples

```handlebars
<MdcIconButton @icon="favorite" />
<MdcIconButton @icon="favorite" disabled={{this.disabled}} />
```

### Listening for Button Clicks

Use the `{{on "click"}}` modifier to listen for clicks.

```handlebars
<MdcIconButton @icon="favorite" {{on "click" this.click}} />
```

MdcIconButtonToggle
--------------------------

### Description

An icon button with toggle states.

### Usage

```handlebars
<MdcIconButtonToggle @isOn={{this.on}}
                     @on={{hash icon=name label=label}}
                     @off={{hash icon=name label=label}}
                     @label={{label}}
                     @change={{action}} />
```

### Attributes

* `@isOn` - The initial state of the toggle button
* `@on` - Hash of properties for the icon when the button is on.
* `@off` - Hash of properties for the icon when the button is off.
* `@label` - ARIA label for accessibility.
* `@change` - The action `f(isOn)` called when the button is toggled.

### Examples

```handlebars
<MdcIconButtonToggle @on={{this.on}}
                     @on={{hash icon="favorite"}}
                     @off={{hash icon="favorite_border"}}
                     @label={{"Add to favorites"}}
                     @change={{this.change}} />
```
