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
{{mdc-menu-surface open=[true|false]
                   anchor=["parent"|"body"]
                   quickOpen=[true|false]
                   position=[null|"fixed"|"absolute"]
                   positionLeft=number
                   positionTop=number
}}
```

### Attributes

* `open` - Trigger the surface to open.
* `anchor` - Optional anchor point for the menu surface. Default is `"parent"`, but can also be `"body"`.
* `quickOpen` - Enable quick open.
* `position` - Optional position of the menu surface.
* `positionLeft` - Left position of the menu (works only in absolute mode).
* `positionTop` - Top position of the menu (works only in absolute mode).

MenuSurface
---------------------

### Description

Convert an existing component into a menu surface.

### Usage

```javascript
import MenuSurface from 'ember-cli-mdc-menu-surface/mixins/menu-surface';
import Component from '@ember/component';

export default Component.extend (MenuSurface, {

});
```

### Methods

The component must implement the following methods:

* `setAbsolutePosition (x, y)`
* `hoistMenuToBody ()`
* `doOpen (open)`
* `doQuickOpen`