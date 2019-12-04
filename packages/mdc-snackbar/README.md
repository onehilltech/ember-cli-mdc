ember-cli-mdc-snackbar
======================

ember-cli addon for [`@material/snackbar`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-snackbar).

Installation
------------

    ember install ember-cli-mdc-snackbar

Components and Mixins
-----------------------

### Components

* [`{{mdc-snackbar}}`](#mdc-snackbar)

### Mixins

* `Snackbar`


{{mdc-snackbar}}
---------------------

### Description

Display a snackbar on the page.

### Usage

```handlebars
{{mdc-snackbar message=[string]
               timeout=[number]
               action=(hash text=[string] handler=action)}}
```

### Attributes

* `message` - The message to display in the snackbar. Changing the message automatically shows the snackbar.
* `timeout` - Optional timeout for the snackbar.
* `action` - Hash with the action text and optional callback invoked when the action is clicked.

Recommended: Using an Application Snackbar
-------------------------------------------

It is possible to use the snackbar component in-place where you expect it be used, such as within a child
or component template. Doing so can give you greater control, but could present some challenges. The most 
obvious challenge is having multiple snackbar components compete for the same layout space. In this scenario,
one snackbar component will appear over the other snackbar component. The second challenge is having multiple
unused snackbar elements dispersed throughout the HTML code, which can degrade performance depending on the
number of unused snackbar components.

Because of these challenges, we recommend always using an application snackbar component. This is
not hard to do, and just requires a little configuration. Once you create an application snackbar
component, you can show the snackbar from anywhere in the application. Let's take a look at how to make
this happen.

### Define the application snackbar

First, open the `application.hbs` template, and add a `mdc-snackbar` component.

```handlebars
{{outlet}}

{{mdc-snackbar message=snackbar.message
               action=snackbar.action
               dismissible=snackbar.dismissible}}
```

In this example, we are binding each attribute in the `mdc-snackbar` component to a property from
the `snackbar` variable. This will provides callers with access to each attribute in the `mdc-snackbar`
component. 

### Bootstrap the application snackbar

The `ember-cli-mdc-snackbar` add-on uses initializers and instance initializers to automatically
bootstrap the application snackbar. If you need to bind the application snackbar to a variable
with not named `snackbar`, then you can add a property named `snackbarPropertyName` to the 
application route. 

For example, let's assume we wanted to use a variable named `foo` to bind with the attributes
of the application snackbar. We just update the application route

```javascript
// application.js

import Route from '@ember/routing/route';

export default Route.extend ({
  snackbarPropertyName: 'foo'
});
```

and use the `foo` property in the application template.

```handlebars
{{!-- application.hbs --}}

{{outlet}}

{{mdc-snackbar message=foo.message
               action=foo.action
               dismissible=foo.dismissible}}
```

### Displaying snackbar from a controller

We can display snackbar message from a controller simply by invoking the `snackbar(opts)` 
method. The `ember-cli-mdc-snackbar` add-on injects a `snackbar(opts)` method into controllers. 
This makes it easy for you to use the snackbar from any controller in the application.
Here is an example of showing a snackbar notification, and including an undo action.

```javascript
this.snackbar ({
  message: 'Hello, World!',

  // optional properties

  dismissible: true,
  action: {
    label: 'Undo',
    handler () {
      alert ('We press the undo action!');
    }
  } 
})
```

### Showing snackbar from a component

Displaying the snackbar from a component requires a different approach. If the component
is a top-level component, just bind the `snackbar` attribute to the `snackbar` action.

```handlebars
{{!-- index.hbs --}}
{{some-component snackbar=(action "snackbar")}}
```

If the component is a nested component, then you should must use closure actions to propagate
the snackbar message up to the controller.

```handlebars
{{!-- component-wrapper.hbs --}}
{{another-component snackbar=(action (action snackbar))}}
```

By using closure actions, you have the option of passing in options when binding the
action.

```handlebars
{{!-- component-wrapper.hbs --}}
{{another-component snackbar=(action (action snackbar (hash message="This is a message")))}}
```