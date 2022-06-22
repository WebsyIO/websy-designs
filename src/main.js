/* global
  include
  WebsyPopupDialog 
  WebsyLoadingDialog 
  WebsyNavigationMenu 
  WebsyPubSub
  WebsyForm
  WebsyDatePicker
  WebsyDropdown
  WebsyRouter
  WebsyResultList
  WebsyTable
  WebsyTable2
  WebsyChart
  WebsyChartTooltip
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
  Pager
*/ 

include('./components/api-service/index.js')
include('./components/button-group/index.js')
include('./components/carousel/index.js')
include('./components/date-picker/index.js')
include('./components/dropdown/index.js')
include('./components/form/index.js')
include('./components/loading-dialog/index.js')
include('./components/menu/index.js')
include('./components/pager/index.js')
include('./components/pdf-button/index.js')
include('./components/popup-dialog/index.js')
include('./components/pubsub/index.js')
include('./components/result-list/index.js')
include('./components/router/index.js')
include('./components/switch/index.js')
include('./components/template/index.js')
include('./components/utils/index.js')
include('./components/visualizations/table/index.js')
include('./components/visualizations/table2/index.js')
include('./components/visualizations/chart/index.js')
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
  WebsyDatePicker,
  DatePicker: WebsyDatePicker,
  WebsyDropdown,
  Dropdown: WebsyDropdown,
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
  Table: WebsyTable,
  Table2: WebsyTable2,
  WebsyChart,
  Chart: WebsyChart,
  WebsyChartTooltip,
  ChartTooltip: WebsyChartTooltip,
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
  Switch
}

WebsyDesigns.service = new WebsyDesigns.APIService('')

const GlobalPubSub = new WebsyPubSub('empty', {})

function recaptchaReadyCallBack () {
  GlobalPubSub.publish('recaptchaready')
}

// need a way of initializing these based on environment variables
function useGoogleRecaptcha () {
  const rcs = document.createElement('script')
  rcs.src = '//www.google.com/recaptcha/api.js?onload=recaptchaReadyCallBack'
  document.getElementsByTagName('body')[0].appendChild(rcs)
}

function usePayPal () {
  const pps = document.createElement('script')
  pps.src = '//www.paypal.com/sdk/js'
  document.getElementsByTagName('body')[0].appendChild(pps)
}
