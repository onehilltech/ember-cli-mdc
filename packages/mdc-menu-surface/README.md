ember-cli-mdc-menu-surface
===========================

ember-cli addon for [`@material/menu-surface`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-menu-surface).

Installation
------------

    ember install ember-cli-mdc-menu-surface

Components and Mixins
-----------------------

### Components

* [`{{mdc-menu-surface}}`](#mdc-menu-surface)

### Mixins

* [`MenuSurface`](#menusurface)

{{mdc-menu-surface}}
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
