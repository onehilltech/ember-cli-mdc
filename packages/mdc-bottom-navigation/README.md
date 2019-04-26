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

* [`{{mdc-bottom-navigation}}`](#mdc-bottom-navigation)

mdc-bottom-navigation
---------------------

### Description

Adds a bottom navigation component to a page

### Usage

```handlebars
{{#mdc-bottom-navigation spaceEvenly=[false|true]}}
  <!-- links go here -->
{{/mdc-bottom-navigation}}
```

### Attributes

* `spaceEvenly` - Space the buttons evenly as opposed to centered. Default is `false`.

### Adding links to the bottom navigation

Use the `{{mdc-bottom-navigation-link-to}}` component to add links to the bottom 
navigation component.

```handlebars
{{#mdc-bottom-navigation spaceEvenly=[false|true]}}
  {{mdc-bottom-navigation-link-to "Favorites" routeName icon="favorites" label="Favorites"}}
{{/mdc-bottom-navigation}}
```

The `mdc-bottom-navigation-link-to` extends the `LinkComponent`. When using the `mdc-bottom-navigation-link-to`
in inline form, the first parameter is the link title and the second parameter is the target route. The
`label` attribute is optional.
