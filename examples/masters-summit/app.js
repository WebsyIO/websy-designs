/* global WebsyNavigator WebsyDesigns */ 
const navConfig = {
  defaultView: 'home'
}
const navController = new WebsyNavigator(navConfig)
navController.init()
const menuConfig = {
  // orientation: 'vertical',
  classes: ['fixed'],
  navigator: navController,
  logo: {
    url: 'https://masterssummit.com/wp-content/uploads/2016/01/masters-summit-logo-green.png'    
  },
  items: [    
    {
      text: 'Home',
      default: true,
      classes: ['trigger-item'],
      attributes: ['data-view="home"']
    },
    {
      text: 'About',
      classes: ['trigger-item'],
      attributes: ['data-view="about"']
    },
    {
      text: 'Team',
      classes: ['trigger-item'],
      attributes: ['data-view="team"']
    },
    {
      text: 'FAQ',
      classes: ['trigger-item'],
      attributes: ['data-view="faq"']
    },
    {
      text: 'Gallery',
      classes: ['trigger-item'],
      attributes: ['data-view="gallery"']
    }
  ]
}
const mainMenu = new WebsyDesigns.WebsyNavigationMenu('menu', menuConfig)
