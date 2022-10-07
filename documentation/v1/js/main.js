/* 
  global 
  WebsyDesigns 
  MenuConfig
  include
  WebsyCarousel
  Button
  Slider
*/
// Load the JS components/resources
include('./menu-config.js')
const router = new WebsyDesigns.WebsyRouter({
  defaultView: '/'
})
// const sideBar = new WebsyDesigns.WebsyNavigationMenu('sideBar', {
//   orientation: 'vertical',
//   align: 'right',
//   classes: ['fixed'],
//   navigator: router,
//   items: MenuConfig
// })
// const options = {
//   onClick: () => {}
// }
// const btnTest = new Button('websy-btn', options)

const options = {
  secondHandle: false,
  currentValueDisplay: true,
  value: 50
}
const sliderTest = new Slider('websy-slider', options)
const sliderTest2 = new Slider('websy-slider2', options)

/*
const options = {
  frames: [
    {
      images: [
        {
          url: 'https://via.placeholder.com/600x400/000/fff?text=1'
        }
      ]
    },
    {
      images: [
        {
          url: '//via.placeholder.com/600x400?text=2'
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
          url: '//via.placeholder.com/600x400?text=3'
        },
        {
          style: 'left: 65%; top: 60%; width: 35%; height: 40%;',
          url: '//via.placeholder.com/600x400?text=4'
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
        },
        {
          style: `
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.4);
          `,
          html: '<div></div>'
        }
      ]
    }
  ]
}
const test = new WebsyCarousel('websy-carousel', options)
*/
