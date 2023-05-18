ember-cli-mdc-select
==========================

ember-cli addon for [`@material/select`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-select).

Installation
------------

    ember install ember-cli-mdc-select
    
Components
-----------

This package contains the following top-level components.

* [`<MdcSelect>`](#MdcSelect)

MdcSelect
---------------------

### Description

Add a select component to your page.

### Usage

```handlebars
<MdcSelect @style="[outlined|filled]"
           @label={{this.label}}
           @leadingIcon={{this.leadingIcon}}
           @options={{this.options}}
           @firstOptionIsEmpty={{[true|false]}}
           @required={{[true|false]}}
           @change={{this.change}}
           @disabled={{[true|false]}} />
```

### Attributes

* `style` - Style of the component. Must either be one of the following string values: `filled`, `outlined`.
* `label` - Label for the component.
* `leadingIcon` - Leading icon displayed in the component.
* `options` - The options for the select
* `firstOptionIsEmpty` - The first option in the select is empty (or null)
* `required` - The select is required.
* `disabled` - The select is disabled.
* `change` - Action called when the select value changes.

### Options and the selected value

The `@options` attribute is an array of options displayed in the select component. Each
option is expected to have the following properties:

* `value` - The value of the option
* `text` - The text displayed for the option
* `disabled` - The option is disabled

The selected option (or value) is passed to the `change(option)` action. The action takes
one parameter, the selected option from the array of `@options`. This allows you
to work directly with the option instead of having to write code to locate the object 
for the corresponding selected value.

### Adapting options

The select component allows you to adapt any array of values to options using the provided 
attributes:

* `@valueKey` - The property to use for value
* `@textKey` - The property to use for text
* `@disabledKey` - The property to use for disabled state

```handlebars
<MdcSelect @label="Select an actor"
           @options={{this.actors}}
           @firstOptionIsEmpty={{true}}
           @change={{this.change}}
           @valueKey="id"
           @textKey="name" />
```
