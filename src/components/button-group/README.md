## Websy ButtonGroup
This component creates a group of related elements that can be used to build basic menus, tab menus, radio button toggles etc.

#### Initializing a ButtonGroup
To instantiate a new instance of a ButtonGroup, you can do the following.
``` javascript
const myGroup = new WebsyDesigns.ButtonGroup({options})
```

#### Options
The following options can be provided -
* **style** - Determines the style of the buttons. Accepts one of `button`, `radio` or `tab` and will add default styling to the button group. Defaults to `button`.
* **activeItem** - The index of the current active item in the group. Defaults to -1
* **tag** - Allows you to specify which HTML element tag should be used for each item. Defaults to `div`.
* **allowNone** - If set to true, allows active items to be deactivated when clicked.
* **items** - An array of objects that represent the items in the group. An item can be used to store any properties (all of which will be passed to the onActivate and onDeactivate events) but the following properties are supported by the component -
  * **label** - (required) The text to be shown in the button. An HTML string can be also be provided.
  * **classes** - An array of CSS classes to be added to the item
  * **attributes** - An array of HTML attributes to be added to the item
* **onActivate** - 
* **onDeactivate** -
