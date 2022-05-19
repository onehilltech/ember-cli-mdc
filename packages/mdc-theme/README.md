ember-cli-mdc-theme
==============================================================================

ember-cli addon for [`@material/theme`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-theme).


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


Installation
------------

    ember install ember-cli-mdc-theme
    
Usage
---------------

Prior to the release of Ember Octane, themes had to be integrated at the component-level
using an Ember Mixin. Although this worked, it meant you always had to create a component
to make your themes dynamic. With the release of Ember Octane, we have migrated to using
Ember modifiers to set themes dynamically.

We use the `{{mdc-theme}}` modifier to change the theme of an element, and all its child
elements.

```handlebars
<div 
  {{mdc-theme "primary" "red"}}
  {{mdc-theme "textPrimaryOnLight" textPrimaryOnLight}}>
This is a div illustrates how to use the theme modifier.
</div>
```

As shown in the example above, you use the `{{mdc-theme}}` modifier for a single theme you
want to change dynamically. You can also have more than one `{{mdc-theme}}` modifier attached
to an element. 

The `{{mdc-theme}}` modifier alone will not change the theme of the element. You still need
to apply the appropriate class name to the element, or child elements. For example, you 
still need to add the `mdc-theme--primary` class name to an element if you want to apply 
the theme modifier in the example above.

The following is a list of supported theme property names:

* `primary`
* `secondary`
* `background`
* `surface`
* `onPrimary`
* `onSecondary`
* `onSurface`
* `text[STYLE]OnLight`, e.g., `textPrimaryOnLight`
* `text[STYLE]OnDark`, e.g., `textPrimaryOnDark`

The following a list of support text styles for dark and light properties:

* `primary`
* `secondary`
* `hint`
* `disabled`
* `icon`
