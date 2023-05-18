ember-cli-mdc-menu
===========================

ember-cli addon for [`@material/menu`](https://github.com/material-components/material-components-web/tree/master/packages/mdc-menu).

Installation
------------

    ember install ember-cli-mdc-menu

Components and Mixins
-----------------------

### Components

* [`<MdcMenu>`](#MdcMenu)


MdcMenu
---------------

### Description

Add a menu component to the page.

### Usage

```handlebars
{{#mdc-menu open=[true|false]
            anchor=["parent"|"body"]
            quickOpen=[true|false]
            position=[null|"fixed"|"absolute"]
            positionLeft=number
            positionTop=number}}

  <!-- menu items -->
            
{{/mdc-menu}}
```

### Attributes

* `open` - Trigger the surface to open; sets to `false` when closed.
* `anchor` - Optional anchor point for the menu surface. Default is `"parent"`, but can also be `"body"`.
* `quickOpen` - Enable quick open.
* `position` - Optional position of the menu surface.
* `positionLeft` - Left position of the menu (works only in absolute mode).
* `positionTop` - Top position of the menu (works only in absolute mode).

### Menu Items

Use the `<MdcMenuList>` to add items to the menu.

<<<<<<< HEAD
```handlebars
<MdcMenu>
    <MdcMenuList>
      <!-- example of an inline menu item -->
      <MdcMenuItem @text="Add space before paragraph" />
      
      <!-- example of a block menu item -->
      <MdcMenuItem>
          <MdcMenuItemText>Add space after paragraph</MdcMenuItemText>
      </MdcMenuItem>
    </MdcMenuList>
</MdcMenu>
```

### Dividers

The `<MdcListDivider>` component is used to a divider between menu items.

```handlebars
<MdcMenu>
    <MdcMenuList>
        <!-- example of an inline menu item -->
        <MdcMenuItem @text="Add space before paragraph" />
        
        <MdcListDivider />
    
        <!-- example of a block menu item -->
        <MdcMenuItem>
            <MdcMenuItemText>Add space after paragraph</MdcMenuItemText>
        </MdcMenuItem>
    </MdcMenuList>
</MdcMenu>
```

### Group Selections

The `{{mdc-menu-selection-group}}` block component is used to select between
a group of menu items.

```handlebars
<MdcMenu @open={{this.open}}>
    <MdcMenuList>
        <li>
            <MdcMenuSelectionGroup>
                <MdcMenuItem>
                    <MdcMenuSelectionGroupIcon @icon={{icon1}} />
                    <MdcMenuItemText>Single</MdcMenuItemText>
                </MdcMenuItem>

                <MdcMenuItem>
                    <MdcMenuSelectionGroupIcon @icon={{icon2}} />
                    <MdcMenuItemText>1.15</MdcMenuItemText>
                </MdcMenuItem>
            </MdcMenuSelectionGroup>
        </li>
    </MdcMenuList>
</MdcMenu>
```
