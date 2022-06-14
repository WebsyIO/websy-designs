## Websy Carousel
The Websy Carousel provides a customizable slideshow which cycles through content provided by the developer. You can integrate multiple images per frame, text overlays and custom positioning.

Users also have the option to display previous/next and indicator controls. 

#### Initializing the Carsousel component
To instantiate a new instance of a Carousel, you'll need provide the element id of where it's required. A mandatory 'options' parameter must be added to set the content in which the Carousel will utilise. 

The 'options' required initially is an array of 'frames' which can then accept objects of:
* images: (url:'') 
* text: ''
* html: ``
* style: ''
* class: ''

Any number of these tags to be applied to each frame. 

If no style or classes are passed to the images or text then they will automatically be positioned absolutely in the parent element and have a width and height of 100%. 
Images will be rendered first and then the text to ensure that the text is on top. 
It is up to the developer implementing the component to configure each image/text to get the desired output.

``` javascript
const carousel = new WebsyCarousel('websy-carousel', options)
```
