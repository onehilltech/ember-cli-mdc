ember-cli-mdc-bottom-navigation
================================

Polyfill ember-cli addon for [`@material/bottom-navigation`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-bottom-navigation).

> `ember-cli-mdc-bottom-navigation` package is meant to be a placeholder until the 
> [bottom navigation component from material components web](https://github.com/material-components/material-components-web/tree/master/packages/mdc-bottom-navigation) 
> is complete. It is implemented to serve our needs on existing projects, and does 
> not implement all features of the [bottom navigation component](https://material.io/design/components/bottom-navigation.html).

Installation
------------

    ember install ember-cli-mdc-bottom-navigation

Components
-----------

This package contains the following top-level components.

* [`MdcBottomNavigation`](#MdcBottomNavigation)
* [`MdcBottomNavigationLinkTo`](#MdcBottomNavigationLinkTo)

MdcBottomNavigation
---------------------

### Description

Adds a bottom navigation component to a page

### Usage

```handlebars
<MdcBottomNavigation @spaceEvenly=[false|true]}}>
  <!-- links go here -->
</MdcBottomNavigation>
```

#### Attributes

* `@spaceEvenly` - Space the buttons evenly as opposed to centered. Default is `false`.

### MdcBottomNavigationLinkTo

Use the `MdcBottomNavigationLinkTo`, which extends the `LinkComponent`, component to add 
links to the bottom navigation component.

```handlebars
<MdcBottomNavigation @spaceEvenly=[false|true]>
  <MdcBottomNavigationLinkTo @label="Favorites" @icon="favorites" @route={{this.routeName}}  />
</MdcBottomNavigation>
```
