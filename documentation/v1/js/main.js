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
    images: [{ url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvd2Vyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60', 
      style: '' }],
    text: [{ html: '' }, { style: '' }, {}]
  },
  {
    images: [{ url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZsb3dlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60' }],
    text: []
  },
  {
    images: [{ url: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZsb3dlcnN8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60' }],
    text: []
  }]
})
