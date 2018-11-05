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


{{mdc-snackbar}}
---------------------

### Description

Display a snackbar on the page.

### Usage

```handlebars
{{mdc-snackbar message=[string]
               timeout=[number]
               actionHandler=action
               actionText=[string]
               multiline=[true|false]
               actionOnBottom=[true|false]
               dismissesOnAction=[true|false]}}
```

### Attributes

* `message` - The message to display in the snackbar. Changing the message automatically shows the snackbar.
* `timeout` - Optional timeout for the snackbar.
* `actionHandler` - Callback invoked when the action is clicked.
* `actionText` - The text to display for the action.
* `multiline` - The snackbar is multiple lines.
* `actionOnBottom` - Align the action to the bottom of a multi-line message.
* `dismissesOnAction`  Dismiss in the snackbar after the action is clicked.
