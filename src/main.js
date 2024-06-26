/* global
  include
  WebsyPopupDialog 
  WebsyLoadingDialog 
  WebsyNavigationMenu 
  WebsyPubSub
  WebsyForm
  MultiForm
  MediaUpload
  WebsyDatePicker
  WebsyDropdown
  WebsyRouter
  WebsyResultList
  WebsyTable
  WebsyTable2
  WebsyTable3
  WebsyIcons
  WebsyChart
  WebsyChartTooltip
  WebsyPie
  WebsyLegend
  WebsyMap
  WebsyKPI
  WebsyPDFButton
  Switch
  WebsyTemplate
  APIService
  ButtonGroup
  WebsyUtils
  WebsyCarousel
  WebsyLogin
  WebsySignup
  ResponsiveText
  WebsyDragDrop
  WebsySearch
  Pager
*/ 

include('./components/api-service/index.js')
include('./components/button-group/index.js')
include('./components/carousel/index.js')
include('./components/date-picker/index.js')
include('./components/dropdown/index.js')
include('./components/drag-drop/index.js')
include('./components/form/index.js')
include('./components/multi-form/index.js')
include('./components/icons/index.js')
include('./components/loading-dialog/index.js')
include('./components/login/index.js')
include('./components/menu/index.js')
include('./components/media-upload/index.js')
include('./components/pager/index.js')
include('./components/pdf-button/index.js')
include('./components/popup-dialog/index.js')
include('./components/pubsub/index.js')
include('./components/responsive-text/index.js')
include('./components/result-list/index.js')
include('./components/router/index.js')
include('./components/search/index.js')
include('./components/signup/index.js')
include('./components/switch/index.js')
include('./components/template/index.js')
include('./components/utils/index.js')
include('./components/visualizations/table/index.js')
include('./components/visualizations/table2/index.js')
include('./components/visualizations/table3/index.js')
include('./components/visualizations/chart/index.js')
include('./components/visualizations/pie/index.js')
include('./components/visualizations/legend/index.js')
include('./components/visualizations/kpi/index.js')
include('./components/visualizations/map/index.js')
include('./components/visualizations/tooltip/index.js')

const WebsyDesigns = {
  WebsyPopupDialog,
  PopupDialog: WebsyPopupDialog,
  WebsyLoadingDialog,
  LoadingDialog: WebsyLoadingDialog,
  WebsyNavigationMenu,
  NavigationMenu: WebsyNavigationMenu,
  WebsyForm,
  Form: WebsyForm,
  MultiForm,
  WebsyDatePicker,
  DatePicker: WebsyDatePicker,
  WebsyDropdown,
  Dropdown: WebsyDropdown,
  MediaUpload: MediaUpload,
  WebsyResultList,
  ResultList: WebsyResultList,
  WebsyTemplate,
  Template: WebsyTemplate,
  WebsyPubSub,
  PubSub: WebsyPubSub,
  WebsyRouter,
  Router: WebsyRouter,
  WebsyTable,
  WebsyTable2,
  WebsyTable3,
  Table: WebsyTable,
  Table2: WebsyTable2,
  Table3: WebsyTable3,
  WebsyChart,
  Chart: WebsyChart,
  WebsyChartTooltip,
  ChartTooltip: WebsyChartTooltip,
  Pie: WebsyPie,
  WebsyPie,
  Legend: WebsyLegend,
  WebsyMap,
  Map: WebsyMap,
  WebsyKPI,
  KPI: WebsyKPI,
  WebsyPDFButton,  
  PDFButton: WebsyPDFButton,
  APIService,
  WebsyUtils,
  Utils: WebsyUtils,
  ButtonGroup,
  WebsySwitch: Switch,
  Pager,
  Switch,
  Carousel: WebsyCarousel,
  WebsyIcons,
  Icons: WebsyIcons,
  WebsyLogin,
  Login: WebsyLogin,
  WebsySignup,
  Signup: WebsySignup,
  ResponsiveText,
  WebsyResponsiveText: ResponsiveText,
  WebsyDragDrop,
  DragDrop: WebsyDragDrop,
  WebsySearch,
  Search: WebsySearch  
}

WebsyDesigns.service = new WebsyDesigns.APIService('')

const GlobalPubSub = new WebsyPubSub('empty', {})

function recaptchaReadyCallBack () {
  console.log('recaptchaready')
  GlobalPubSub.publish('recaptchaready')
}

// need a way of initializing these based on environment variables
function useGoogleRecaptcha (key) {
  const rcs = document.createElement('script')
  rcs.src = `//www.google.com/recaptcha/api.js`
  document.body.appendChild(rcs)
}

function usePayPal () {
  const pps = document.createElement('script')
  pps.src = '//www.paypal.com/sdk/js'
  document.getElementsByTagName('body')[0].appendChild(pps)
}

String.prototype.toInitialCaps = function () {
  let letters = this.split('')
  let initial = letters.shift().toUpperCase()
  return initial + letters.join('')
}
