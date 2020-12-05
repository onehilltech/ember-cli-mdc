ember-cli-mdc-slider
======================

ember-cli addon for [@material/slider](https://github.com/material-components/material-components-web/tree/master/packages/mdc-slider).

Installation
------------

    ember install ember-cli-mdc-slider

Components
-------------

This package contains the following top-level components.

* [`MdcSlider`](#MdcSlider)

MdcSlider
-------------

### Description

Add a [Material Slider](https://material.io/design/components/sliders.html) component to 
the parent element.

### Usage

```handlebars
<MdcSlider @min={{min}}
           @max={{max}}
           @value={{value}}
           @discrete={{true|false}}
           @displayMarkers={{true|false}}
           @change={{this.change}}
           @input={{this.input}} />
```

### Attributes

* `@min` - The minimum value for the slider.
* `@max` - The maximum value for the slider.
* `@value` - The current value of the slider.
* `@label` - The accessibility label for the slider.
* `@discrete` - Make the slider a discrete slider; default is `false`.
* `@displayMarkers` - Show markers on the slider (only applicable if `@discrete=true`)
* `@change` - The action `f(value)` called after slider value is committed.
* `@input` - The action `f(value)` called as the slider is moved

### Examples

```handlebars
<MdcSlider @min=0 
           @max=100 value=value
           @label="Select value"
           @change={{this.setAmount}} />
```

## Input vs. Change

The `@input` action of the `MdcSlider` will change instantaneously as the slider is
moved from side to side. The `@change` action is called only when the slider stops moving.
This means the user has selected a terminal value, and the slider is committing the value.
