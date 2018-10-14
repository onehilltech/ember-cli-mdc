ember-cli-mdc-menu
===========================

ember-cli addon for [`@material/menu`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-menu).

Installation
------------

    ember install ember-cli-mdc-menu

Components and Mixins
-----------------------

### Components

* [`{{mdc-menu}}`](#mdc-menu)


{{mdc-menu}}
---------------

### Description

Add a menu component to the page.

### Usage

```handlebars
{{#mdc-menu open=[true|false]
            anchor=["parent"|"body"]
            quickOpen=[true|false]
            position=[null|"fixed"|"absolute"]
            positionLeft=number
            positionTop=number}}

  <!-- menu items -->
            
{{/mdc-menu}}
```

### Attributes

* `open` - Trigger the surface to open.
* `anchor` - Optional anchor point for the menu surface. Default is `"parent"`, but can also be `"body"`.
* `quickOpen` - Enable quick open.
* `position` - Optional position of the menu surface.
* `positionLeft` - Left position of the menu (works only in absolute mode).
* `positionTop` - Top position of the menu (works only in absolute mode).

### Menu Items

Use the `{{mdc-menu-list}}` to add items to the menu.

```handlebars
{{#mdc-menu-list}}
  <!-- example of an inline menu item -->
  {{mdc-menu-item "Add space before paragraph"}}
  
  <!-- example of a block menu item -->
  {{#mdc-menu-item}}{{#mdc-menu-item-text}}Add space after paragraph{{/mdc-menu-item-text}}{{/mdc-menu-item}}
{{/mdc-menu-list}}
```

### Dividers

The `{{mdc-list-divider}}` component is used to a divider between menu items.

```handlebars
{{#mdc-menu-list}}
  {{mdc-menu-item "Add space before paragraph"}}

  {{mdc-list-divider}}

  {{mdc-menu-item "Add space after paragraph"}}
{{/mdc-menu-list}}
```
