/* 
  global 
  WebsyDesigns 
  MenuConfig
  include
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
