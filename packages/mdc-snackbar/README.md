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

Application-wide Snackbar
----------------------------

It is possible to use the snackbar component in-place where you expect it be used, such as within a child
or component template. Doing so can give you greater control, but could present some challenges. The most 
obvious challenge is having multiple snackbar components compete for the same layout space. In this scenario,
one snackbar components will appear over the other snackbar component. The second challenge is having multiple
unused snackbar elements dispersed throughout the HTML code, which can degrade performance depending on the
number of unused snackbar components.

Because of these challenges, we recommend always using an application-wide snackbar component. This is
not hard to do, and just requires a little configuration. Once you create an application-wide snackbar
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

In this example, we are binding each attribute in the `mdc-snackbar` component. This will provide 
callers with access to each attribute.

### Connect the application snackbar

We now need to connect to the application `mdc-snackbar`. We do this by defining an **action** in
the application router. This action will be responsible for handling snackbar events that bubble
up to the application router because the action is either not handled anywhere else downstream,
or permitted to continue bubbling upstream.

> The application snackbar only works if the snackbar event (or action) is allowed to bubble
> up to the application router.

```javascript
import Route from '@ember/routing/route';

export default Route.extend ({
  actions: {
    snackbar (opts) {
      this.controller.set ('snackbar', opts);
    }
  }
});
```

Instead of having to manually define the action above, we provide a `Snackbar` mixin, which
can be applied to the application route. 

```javascript
import Route from '@ember/routing/route';
import Snackbar from 'ember-cli-mdc-snackbar/mixins/snackbar';

export default Route.extend (Snackbar, {

});
```

The `Snackbar` mixin defines the `snackbar` action, and allows you to customize what property you 
set on the controller to configure the application `mdc-snackbar` component. The default configuration
is to set the `snackbar` property on the application controller.

### Displaying a snackbar message

Now that we have configured our application to support an application-wide snackbar, we can 
display a message on this snackbar by using the `send()` method. The `send()` method is available 
on a `Route`, `Controller`, and `Component`.

```javascript
this.send ('snackbar', {
  message: 'Hello, World!',

  // optional properties
  dismissible: true,

  action: {
    label: 'Undo',
    handler () {
    
    }
  } 
})
```

This example will send the `snackbar` event/action, which will eventually bubble to the
application route where it will be handled. In the end, the message `Hello, World!` will
display in the application-wide snackbar.