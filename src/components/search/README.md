## Websy Search
A simple but flexible search box component

#### Initializing a Search component
To instantiate a new instance of a Search, you can do the following, specifying the `elementId` of HTML element where you want to place the Search and any additional options.
``` javascript
const mySearch = new WebsyDesigns.Search(elementId, {options})
```

#### Options
The following options can be provided -
* **placeholder** - Sets the placeholder text in the search input box. Defaults to `Search`.
* **searchTimeout** - The number of milliseconds to wait between each keystroke before calling the `onSearch` method.
* **minLength** - The minimum number of characters required before calling the `onSearch` method.
* **onSearch** - An event listener for when typing in the search box. The provided function receives a single parameter, `text`, which represents the value in the search input.
* **onSubmit** - An event listener for when the user confirms the search by pressing the `Enter` key. The provided function receives a single parameter, `text`, which represents the value in the search input.
* **onClear** - An event listener for when the search is cleared by using the `x` icon.
