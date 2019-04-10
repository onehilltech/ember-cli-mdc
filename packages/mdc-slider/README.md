ember-cli-mdc-form
======================

ember-cli addon for [@material/slider](https://github.com/material-components/material-components-web/tree/master/packages/mdc-slider).

Installation
------------

    ember install ember-cli-mdc-slider

Components
-------------

This package contains the following top-level components.

* [`mdc-slider`](#mdc-slider)

mdc-slider
-------------

### Description

Add a [Material Slider](https://material.io/design/components/sliders.html) component to 
the parent element.

### Usage

```handlebars
{{mdc-slider min=min
             max=max
             value=value
             discrete=[true|false]
             displayMarkers=[true|false]
             change=(action "change")
}}
```

### Attributes

* `min` - The minimum value for the slider.
* `max` - The maximum value for the slider.
* `value` - The current value of the slider.
* `label` - The accessibility label for the slider.
* `discrete` - Make the slider a discrete slider; default is `false`.
* `displayMarkers` - Show markers on the slider (only if `discrete=true`)
* `change` - The action `f(value)` called after slider value is committed.

### Examples

```handlebars
{{mdc-slider min=0 max=100 value=value
             label="Select value"
             change=(action (mut selected))}}
```

## Value vs. Change

The `value` attribute of the `mdc-slider` will change instantaneously as the slider is
moved from side to side. The `change` action is called only when the slider stops moving.
This means the user has selected a terminal value, and the slider is committing the value.

## Layout Requests

There are cases when you will need to manually request the slider to update its layout in
order for the component to function correctly. For example, if the slider is initially rendered
of screen, say in a menu, and the menu is transitioned onscreen, the slider will not slide.
This is because the layout of the slider is based on its initial location, and not its new
location on the screen. This is a [known issue](https://github.com/material-components/material-components-web/issues/4365) 
with the `material-components-web` slider component. 

To address this concern/issue, the `mdc-slider` component has a `requestLayout` attribute
that can be set to signal the component to update its layout. To use this attribute, its
best to

1. Have the `mdc-slider` component be a child of a Ember component (let's call it `ParentComponent`).
2. Make the `ParentComponent` aware of when its layout has changed, such as listening for `transitionend` 
events and updating its internal state (e.g., `openComplete`).
3. Share the  `ParentComponent` data with its wrapped content 
(see [Sharing Component Data with its Wrapped Content](https://guides.emberjs.com/release/components/wrapping-content-in-a-component/#toc_sharing-component-data-with-its-wrapped-content)) 
4. Bind the `requestLayout` with the parent component `openComplete` state.

Here is an example illustrating this approach. Let's assume we have a menu that initially
starts offscreen and then slides on screen.

```handlebars
{{#m-menu open=open as |m|}}
  {{mdc-slider min=0 max=100 value=50 requestLayout=m.isOpenComplete}}
{{/m-menu}}

{{#unless open}}
  <button {{action (mut open) true}}>open</button>
{{else}}
  <button {{action (mut open) false}}>close</button>
{{/unless}}
```

As shown in the example above, we have `m-menu` component. The `m-menu` component is sharing 
its data (i.e., state) with `mdc-slider` component. As the menu state changes (i.e., the open
variable changes causing the menu location to transition), the slider will make a layout request
at the end of the transition.

For completeness, here is the `m-menu` component implementation:

```javascript
import Component from '@ember/component';
import layout from '../templates/components/issue7-menu';

export default Component.extend({
  layout,

  classNames: ['m-menu'],

  classNameBindings: ['open:m-menu-open'],

  open: false,

  isOpenComplete: false,

  _transitionEndListener: null,

  init () {
    this._super (...arguments);

    this._transitionEndListener = this._transitionEnd.bind (this);
  },

  didInsertElement () {
    this._super (...arguments);

    // Listen for the transition end event.
    this.element.addEventListener ('transitionend', this._transitionEndListener);
  },

  _transitionEnd () {
    // Update the open complete state.
    const isOpenComplete = this.element.classList.contains ('m-menu-open');
    this.set ('isOpenComplete', isOpenComplete);
  }
});
```

and here is the SASS for the component.

```scss
.m-menu {
  border: solid 1px;
  transform: translateX(-100%);
  transition: all .5s;
  
  &-open {
    transform: translateX(0);
  }
}
```
