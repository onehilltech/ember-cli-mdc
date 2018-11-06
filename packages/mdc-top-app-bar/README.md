ember-cli-mdc-top-app-bar
==========================

ember-cli addon for [`@material/top-app-bar`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-top-app-bar).

Installation
------------

    ember install ember-cli-mdc-top-app-bar

Components and Mixins
-----------------------

### Components

* [`{{mdc-top-app-bar}}`](#mdc-top-app-bar)
* [`{{mdc-content}}`](#mdc-content)


{{mdc-top-app-bar}}
---------------------

### Description

The top application (app) bar component on a single page. The top app bar usually contains
the menu icon or the navigate up icon aligned to the start. Aligned to end are usually action
icons and the overflow menu for the page.

### Usage

```handlebars
{{#mdc-top-app-bar style=["fixed"|"dense"|"prominent"|"short"]
                   alwaysClosed=[true|false]
                   navigation=navigation}}
  {{#mdc-top-app-bar-row}}
  
  {{/mdc-top-app-bar-row}}
{{/mdc-top-app-bar}}
```

### Attributes

* `style` - The top app bar style.
* `alwaysClosed` - The top app bar is always closed. This only applies for short top app bars.
* `navigation` - The action invoked when the navigation icon is clicked.

### Adding sections to a row

The `{{mdc-top-app-bar}}` component can contain sections. The sections can either be aligned
to the start or end of the `{{mdc-top-app-bar-row}}`. The default position is `alignStart`.

```handlebars
{{#mdc-top-app-bar style=["fixed"|"dense"|"prominent"|"short"]
                   alwaysClosed=[true|false]
                   navigation=navigation}}
  {{#mdc-top-app-bar-row}}
    {{#mdc-top-app-bar-section}}
    
    {{/mdc-top-app-bar-section}}
  
    {{#mdc-top-app-bar-section position="alignEnd"}}
    
    {{/mdc-top-app-bar-section}}
  {{/mdc-top-app-bar-row}}
{{/mdc-top-app-bar}}
```

### Adding a title to the app bar

Use the `{{mdc-top-app-bar-title}}` component to add a title to the top app bar.

```handlebars
{{#mdc-top-app-bar style=["fixed"|"dense"|"prominent"|"short"]
                   alwaysClosed=[true|false]
                   navigation=navigation}}
  {{#mdc-top-app-bar-row}}
    {{#mdc-top-app-bar-section}}
      {{#mdc-top-app-bar-title}}Ember Material{{/mdc-top-app-bar-title}}
    {{/mdc-top-app-bar-section}}
  
    {{#mdc-top-app-bar-section position="alignEnd"}}
    
    {{/mdc-top-app-bar-section}}
  {{/mdc-top-app-bar-row}}
{{/mdc-top-app-bar}}
```

### Navigation Icon

The `{{mdc-top-app-bar-navigation-icon}}` is used to add a navigation icon to 
the top app bar.

```handlebars
{{#mdc-top-app-bar style=["fixed"|"dense"|"prominent"|"short"]
                   alwaysClosed=[true|false]
                   navigation=navigation}}
  {{#mdc-top-app-bar-row}}
    {{#mdc-top-app-bar-section}}
      {{mdc-top-app-bar-navigation-icon}}
      {{#mdc-top-app-bar-title}}Ember Material{{/mdc-top-app-bar-title}}
    {{/mdc-top-app-bar-section}}
  
    {{#mdc-top-app-bar-section position="alignEnd"}}
    
    {{/mdc-top-app-bar-section}}
  {{/mdc-top-app-bar-row}}
{{/mdc-top-app-bar}}
```

The default icon is the `menu` icon. You can use the `icon` attribute to change
the navigation icon.

```handlebars
{{#mdc-top-app-bar style=["fixed"|"dense"|"prominent"|"short"]
                   alwaysClosed=[true|false]
                   navigation=navigation}}
  {{#mdc-top-app-bar-row}}
    {{#mdc-top-app-bar-section}}
      {{mdc-top-app-bar-navigation-icon icon="search"}}
      {{#mdc-top-app-bar-title}}Ember Material{{/mdc-top-app-bar-title}}
    {{/mdc-top-app-bar-section}}
  
    {{#mdc-top-app-bar-section position="alignEnd"}}
    
    {{/mdc-top-app-bar-section}}
  {{/mdc-top-app-bar-row}}
{{/mdc-top-app-bar}}
```

The `{{mdc-top-app-bar-navigate-up-to}}` component is a design to add the navigate
up to icon to the top app bar. It also allows you to link to a page in the application.

```handlebars
{{#mdc-top-app-bar style=["fixed"|"dense"|"prominent"|"short"]
                   alwaysClosed=[true|false]
                   navigation=navigation}}
  {{#mdc-top-app-bar-row}}
    {{#mdc-top-app-bar-section}}
      {{mdc-top-app-bar-navigate-up-to "index"}}
      {{#mdc-top-app-bar-title}}Ember Material{{/mdc-top-app-bar-title}}
    {{/mdc-top-app-bar-section}}
  
    {{#mdc-top-app-bar-section position="alignEnd"}}
    
    {{/mdc-top-app-bar-section}}
  {{/mdc-top-app-bar-row}}
{{/mdc-top-app-bar}}
```

{{mdc-content}}
---------------------

### Description

The `{{mdc-content}}` block component contains the content for a page that contains a
`{{mdc-top-app-bar}}` component. The `{{mdc-content}}` components ensure the content
has the correct padding so the page's content is not covered by the `{{mdc-top-app-bar}}`.

### Usage

```handlebars
{{#mdc-content topAppBarStyle=["fixed"|"dense"|"prominent"|"short"]}}

{{/mdc-content}}
```

### Attributes

* `topAppBarStyle` - The top app bar style.
