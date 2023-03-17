ember-cli-mdc-menu-surface
===========================

ember-cli addon for [`@material/menu-surface`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-menu-surface).

Installation
------------

    ember install ember-cli-mdc-menu-surface

<<<<<<< HEAD
Components and Mixins
-----------------------
=======
* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above
>>>>>>> 8809389f (v3.18.0...v3.28.6)

### Components

* [`MdcMenuSurface`](#MdcMenuSurface)

### Modifiers

* [`mdc-menu-surface-anchor`](#mdc-menu-surface-anchor)

MdcMenuSurface
---------------

### Description

Add a menu surface component to the page.

### Usage

```handlebars
<MdcMenuSurface @open=[true|false]
                @quickOpen=[true|false]
                @anchor=[HTMLElement|string]
                @anchorMargin=[number]
                @anchorCorner=[string] 
                @position=["fixed"|"absolute"]
                @left=number
                @top=number />
```

### Attributes

* `open` - Trigger the surface to open
* `quickOpen` - Enable quick open
* `anchor` - Optional anchor point for the menu surface
* `anchorMargin` - Margin between the menu surface and anchor
* `anchorCorner` - Corner of achor element to affix menu surface
* `position` - Either "fixed" or "absolute"
* `left` - Left position of the menu (works only in absolute mode)
* `top` - Top position of the menu (works only in absolute mode)

mdc-menu-surface-anchor
-------------------------

### Description

The `{{mdc-menu-surface-anchor}}` modifier defines the anchor element for a menu.

### Usage

```javascript
<div class="toolbar" {{mdc-menu-surface-anchor}}>
  <button {{on "click" this.toggleMenu}}>Open Menu</button>
 
  <MdcMenuSurface @open={{this.openMenu}}>
    <!-- -->
  </MdcMenuSurface>
</div>
```