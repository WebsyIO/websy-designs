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


``` javascript
const carousel = new WebsyCarousel('websy-carousel', options)
```
