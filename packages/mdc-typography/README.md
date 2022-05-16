ember-cli-mdc-typography
=========================

ember-cli addon for [`@material/typography`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-typography).

Installation
------------

    ember install ember-cli-mdc-typography


Compatibility
--------------

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


Components & Modifiers
-----------------------

* [`{{mdc-typography}}`](#mdc-typography)

### mdc-typography

The `{{mdc-typography}}` modifier, when applied to an element, adds a `typography` attribute
to the component. The typography attribute allows you to programmatically customize
the typography of the component.

```handlebars
<div {{mdc-typography typography}}></div>
```

The `typography` value must be one of the following values:

* `headline1`
* `headline2`
* `headline3`
* `headline4`
* `headline5`
* `headline6`
* `subtitle1`
* `subtitle2`
* `body1`
* `body2`
* `caption`
* `button`
* `overline`

Other Topics
-------------------
 
* [Configuring automatic integration](#configuring-automatic-integration)
* [Roboto Font](#roboto-font)

Configuring Automatic Integration
------------------------------------

The typography package automatically adds the `mdc-typography` class to the 
[root of the ember application](https://guides.emberjs.com/release/configuring-ember/embedding-applications/#toc_changing-the-root-element).
By default, this is the `body` HTML element. You an change the root element 
by changing the `rootElement` property in `config/environment.js`.

### Disable integration

You can disable automatic typography integration by setting the `ember-cli-mdc.typography.disabled`
property in `config/environment.js`.

```javascript
let ENV = {
  // ...
  
  'ember-cli-mdc': {
    typography: {
      disabled: true,          // disable adding .mdc-typography class to root element
      autoLinkFont: false      // disable adding <link> tag for Roboto font
    }
  }
};
```

Roboto Font
----------------

The typography package automatically includes links to the Roboto fonts in your
application.

### Corber integration.

When building a Corber application, the Roboto fonts are bundled with the application. This
prevents the application from needing to download the fonts.

