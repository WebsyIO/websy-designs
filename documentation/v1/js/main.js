/* 
  global 
  WebsyDesigns 
  MenuConfig
  include
  WebsyCarousel
*/
// Load the JS components/resources
include('./menu-config.js')
const router = new WebsyDesigns.WebsyRouter({
  defaultView: '/'
})
const sideBar = new WebsyDesigns.WebsyNavigationMenu('sideBar', {
  orientation: 'vertical',
  align: 'right',
  classes: ['fixed'],
  navigator: router,
  items: MenuConfig
})

const test = new WebsyCarousel('websy-carousel', {
  frames: 
  [{
    images: [{ url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60', 
      style: 'width: 300px' }],
    text: [{ html: '' }, { style: '' }, {}]
  },
  {
    images: [{ url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60' }],
    text: []
  },
  {
    images: [{ url: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60' }],
    text: []
  }]
})
