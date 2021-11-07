/* global WebsyDesigns */
const router = new WebsyDesigns.WebsyRouter({
  defaultView: '/'
})
const sideBar = new WebsyDesigns.WebsyNavigationMenu('sideBar', {
  orientation: 'vertical',
  logo: {
    url: '/public/logo.svg'
  },
  classes: ['fixed', 'dpg-side-menu'],
  navigator: router,  
  items: [
    {
      text: 'Introduction',
      classes: ['trigger-item'],
      attributes: ['data-view="introduction"']
    },
    {
      text: 'Server',
      classes: ['trigger-item'],
      attributes: ['data-view="server"']
    },
    {
      text: 'UI Components',
      classes: ['trigger-item'],
      attributes: ['data-view="components"'],
      items: [
        {
          text: 'Date Picker',
          classes: ['trigger-item'],
          attributes: ['data-view="date-picker"']
        },
        {
          text: 'Dropdown',
          classes: ['trigger-item'],
          attributes: ['data-view="dropdown"']
        },
        {
          text: 'Form',
          classes: ['trigger-item'],
          attributes: ['data-view="form"']
        },
        {
          text: 'Loading Dialog',
          classes: ['trigger-item'],
          attributes: ['data-view="loading"']
        },
        {
          text: 'Login / Signup',
          classes: ['trigger-item'],
          attributes: ['data-view="loginsignup"']
        },
        {
          text: 'Menu',
          classes: ['trigger-item'],
          attributes: ['data-view="menu"']
        },
        {
          text: 'PayPal Payment',
          classes: ['trigger-item'],
          attributes: ['data-view="pdfbutton"']
        },
        {
          text: 'PDF Button',
          classes: ['trigger-item'],
          attributes: ['data-view="pdfbutton"']
        },
        {
          text: 'Popup Dialog',
          classes: ['trigger-item'],
          attributes: ['data-view="popup"']
        },
        {
          text: 'Result List',
          classes: ['trigger-item'],
          attributes: ['data-view="result-list"']
        },
        {
          text: 'Search',
          classes: ['trigger-item'],
          attributes: ['data-view="search"']
        },
        {
          text: 'Tooltip',
          classes: ['trigger-item'],
          attributes: ['data-view="tooltip"']
        }
      ]
    },
    {
      text: 'Visualizations',
      classes: ['trigger-item'],
      attributes: ['data-view="visualizations"'],
      items: [
        {
          text: 'Chart',
          classes: ['trigger-item'],
          attributes: ['data-view="chart"']
        },
        {
          text: 'KPI',
          classes: ['trigger-item'],
          attributes: ['data-view="kpi"']
        },
        {
          text: 'Map',
          classes: ['trigger-item'],
          attributes: ['data-view="map"']
        },
        {
          text: 'Pie',
          classes: ['trigger-item'],
          attributes: ['data-view="pie"']
        },
        {
          text: 'Table',
          classes: ['trigger-item'],
          attributes: ['data-view="table"']
        }
      ]
    },
    {
      text: 'UI Helpers',
      classes: ['trigger-item'],
      attributes: ['data-view="helpers"'],
      items: [
        {
          text: 'API Service',
          classes: ['trigger-item'],
          attributes: ['data-view="api-service"']
        },
        {
          text: 'PubSub',
          classes: ['trigger-item'],
          attributes: ['data-view="pubsub"']
        },
        {
          text: 'Router',
          classes: ['trigger-item'],
          attributes: ['data-view="router"']
        }
      ]
    }
  ]
})
