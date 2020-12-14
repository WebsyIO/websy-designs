/* global
  include
  WebsyPopupDialog 
  WebsyLoadingDialog 
  WebsyNavigationMenu 
  WebsyPubSub
  WebsyForm
  WebsyResultList
  APIService
*/ 

include('./components/popup-dialog/index.js')
include('./components/loading-dialog/index.js')
include('./components/menu/index.js')
include('./components/form/index.js')
include('./components/result-list/index.js')
include('./components/pubsub/index.js')
include('./components/api-service/index.js')

const WebsyDesigns = {
  WebsyPopupDialog,
  WebsyLoadingDialog,
  WebsyNavigationMenu,
  WebsyForm,
  WebsyResultList,
  WebsyPubSub,
  APIService
}

const GlobalPubSub = new WebsyPubSub('empty', {})

function recaptchaReadyCallBack () {
  GlobalPubSub.publish('recaptchaready')
}

const rcs = document.createElement('script')
rcs.src = '//www.google.com/recaptcha/api.js?onload=recaptchaReadyCallBack'
document.getElementsByTagName('body')[0].appendChild(rcs)
