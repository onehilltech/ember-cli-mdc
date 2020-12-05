ember-cli-mdc-chips
======================

ember-cli addon for [`@material/chips`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-chips).

Installation
------------

    ember install ember-cli-mdc-chips
    
Components
-----------

This package contains the following top-level components.

* [`<MdcChipSet>`](#MdcChipSet)
* [`<MdcChoiceChipSet>`](#MdcChoiceChipSet)
* [`<MdcFilterChipSet>`](#MdcFilterChipSet)

MdcChipSet
-----------------

### Description

Add a chip set (a list of chips) to the page.

### Usage

The inline (and recommended) version:

```handlebars
<MdcChipSet @label={{label}} @chips={{chips}} />
```

### Attributes

* `@chips` - an array of objects that defines the chips in the chip set
* `@label` - a label that is covered to the class name `mdc-chip-set--${label}`

or the block version:

```handlebars
<MdcChipSet @interaction={{this.interaction}} 
            @selection={{this.selection}}
            @removal={{this.removal}}>
  <MdcChip @text='John' @leadingIcon="person" @trailingIcon="cancel" />
</MdcChipSet>
```

#### Manually manage chips

