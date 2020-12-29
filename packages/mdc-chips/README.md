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

or the block version:

```handlebars
<MdcChipSet @interaction={{this.interaction}} 
            @selection={{this.selection}}
            @removal={{this.removal}}
            @navigation={{this.navigation}}>
  <MdcChip @text='John' @leadingIcon="person" @trailingIcon="cancel" />
</MdcChipSet>
```

### Attributes

**ChipSet**

* `@chips` - an array of objects that defines the chips in the chip set
* `@label` - a label that is covered to the class name `mdc-chip-set--${label}`
* `@interation` - callback action for the chip interaction event
* `@selection` - callback action for chip selection
* `@removal` - callback action for chip removal
* `@navigation` - callback action for chip navigation

**Chip**

* `@text` - The text displayed in the chip.
* `@leadingIcon` - The leading icon displayed on the chip.
* `@trailingIcon` - The trailing icon displayed on the chip.

#### Using adapter keys to display data as chips

A feature of the inline `MdcChipSet` (and the other chip sets) is the ability to use adapter 
keys to display any array as a chip set without having to convert the items in the array 
to the expected attributes of a chip. The following are the adapter key attributes on 
`MdcChipSet`:

* `@idKey` - The id property name (default is `'id'`)
* `@textKey` - The text property name (default is `'text'`)
* `@leadingIconKey` - The leading icon property name (default is `'leadingIcon'`)
* `@trailingIconKey` - The trailing icon property name (default is `'trailingIcon'`)

Here is an example.

```handlebars
<MdcChipSet @label='names' @chips={{@model}} @textKey='name' />
```

MdcChoiceChipSet
-----------------

### Description

Add a choice (i.e., single select) chip set to the page.

### Usage

```handlebars
<MdcChoiceChipSet @chips={{chips}} @choice={{this.choice}} @change={{this.change}} />
```

### Attributes

**MdcChoiceChipSet**

* `@chips` - an array of objects that defines the chips in the choice chip set
* `@choice` - the initial choice; must be a chip from `@chips`
* `@change` - callback `action(chip)` for when the choice changes; `null` if no choice

MdcFilterChipSet
-----------------

### Description

Add a filter (i.e., multi-select) chip set to the page.

### Usage

```handlebars
<MdcFilterChipSet @chips={{this.chips}} @filtered={{this.filtered}} />
```

### Attributes

**MdcFilterChipSet**

* `@chips` - an array of objects that defines the chips in the filter chip set
* `@filtered` - the array of filtered chips
