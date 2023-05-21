ember-cli-mdc-icon-button
===========================

ember-cli addon for [`@material/icon-button`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-icon-button).

Installation
------------

    ember install ember-cli-mdc-icon-button

Components
-----------

This package contains the following top-level components.
* 
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

### Events

* `MdcIconButtonToggle:change` - Toggle button has changed state.
  * `detail.isOn` - State of the toggle button

### Examples

```handlebars
<MdcIconButtonToggle @on={{this.on}}
                     @on={{hash icon="favorite"}}
                     @off={{hash icon="favorite_border"}}
                     @label={{"Add to favorites"}}
        {{on "MdcIconButtonToggle:change" this.change}} />
```
