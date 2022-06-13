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
const options = {
  frames: [
    {
      images: [
        {
          url: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2Fyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60'
        }
      ]
    },
    {
      images: [
        {
          url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60'
        }
      ],
      text: [
        {          
          html: `
            <div style="
              display: flex;
              height: 100%;
              width: 100%;
              align-items: center;
              justify-content: center;
            ">
              <div style="
                display: flex;
                align-items: baseline;
              ">
                <h1 style="font-size: 50px;">ALL ABOARD</h1>
                <h4 style="font-size: 20px;">Next stop Kimball</h4>
              </div>
            </div>
          `          
        }
      ]
    },
    {
      images: [
        {
          style: 'left: 0; top: 0; width: 65%; height: 60%;',
          url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60'
        },
        {
          style: 'left: 65%; top: 60%; width: 35%; height: 40%;',
          url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60'
        }
      ],
      text: [
        {
          style: `
            left: 65%;
            top: 0;
            width: 35%;
            height: 60%;
            background-color: #543628;
            color: #a95439;            
            display: flex;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
          `,
          html: `
            <h1 style="font-size: 50px;">Mmm Chocolate</h1>
          `
        },
        {
          style: `
            left: 0;
            top: 60%;
            width: 65%;
            height: 40%;
            background-color: #4a8182;
            color: #a6d5d7;            
            display: flex;
            align-items: center;
            justify-content: center;
          `,
          html: `
            <h1 style="font-size: 50px;">Blue sky blue</h1>
          `
        }
      ]
    }
  ]
}

const test = new WebsyCarousel('websy-carousel', options)
