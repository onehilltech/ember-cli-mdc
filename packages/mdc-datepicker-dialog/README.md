ember-cli-mdc-datepicker-dialog
==============================================================================

Polyfill implementation of Material Design date picker dialog

Installation
------------------------------------------------------------------------------


    ember install ember-cli-mdc-datepicker-dialog


Components
-----------

This package contains the following top-level components.

* [`{{mdc-datepicker-dialog}}`](#mdc-datepicker-dialog)


mdc-datepicker-dialog
------------------------------

### Description

A dialog for picking a single date.


### Usage

```handlebars
{{mdc-datepicker-dialog value=value 
                        accept=(action "accept")
                        close=(action "close")}}
```

### Attributes

* **`value`** - The value selected when closing the dialog.
* **`accept`** - The action invoked when the accept button is pressed.
* **`close`** - The action invoked when the close button is pressed.
