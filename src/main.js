/* global
  include
  WebsyPopupDialog 
  WebsyLoadingDialog 
  WebsyNavigationMenu 
  WebsyPubSub
  WebsyForm
  WebsyDatePicker
  WebsyDropdown
  WebsyResultList
  WebsyTable
  WebsyChart
  WebsyMap
  WebsyKPI
  WebsyPDFButton
  APIService
*/ 

include('./components/popup-dialog/index.js')
include('./components/loading-dialog/index.js')
include('./components/menu/index.js')
include('./components/form/index.js')
include('./components/date-picker/index.js')
include('./components/dropdown/index.js')
include('./components/result-list/index.js')
include('./components/pubsub/index.js')
include('./components/api-service/index.js')
include('./components/pdf-button/index.js')
include('./components/visualizations/table/index.js')
include('./components/visualizations/chart/index.js')
include('./components/visualizations/kpi/index.js')
include('./components/visualizations/map/index.js')

const WebsyDesigns = {
  WebsyPopupDialog,
  WebsyLoadingDialog,
  WebsyNavigationMenu,
  WebsyForm,
  WebsyDatePicker,
  WebsyDropdown,
  WebsyResultList,
  WebsyPubSub,
  WebsyTable,
  WebsyChart,
  WebsyMap,
  WebsyKPI,
  WebsyPDFButton,
  PDFButton: WebsyPDFButton,
  APIService
}

const GlobalPubSub = new WebsyPubSub('empty', {})

function recaptchaReadyCallBack () {
  GlobalPubSub.publish('recaptchaready')
}

// need a way of initializing these based on environment variables
const rcs = document.createElement('script')
rcs.src = '//www.google.com/recaptcha/api.js?onload=recaptchaReadyCallBack'
document.getElementsByTagName('body')[0].appendChild(rcs)

const pps = document.createElement('script')
rcs.src = '//www.paypal.com/sdk/js'
document.getElementsByTagName('body')[0].appendChild(pps)
