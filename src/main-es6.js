/* global
  include
  WebsyPopupDialog 
  WebsyLoadingDialog 
  WebsyNavigationMenu 
  WebsyPubSub
  WebsyForm
  WebsyDatePicker
  WebsyDragDrop
  WebsyDropdown
  WebsyRouter
  WebsyResultList
  WebsyTable
  WebsyTable2
  WebsyTable3
  WebsyChart
  WebsyChartTooltip
  WebsyLegend
  WebsyMap
  WebsyKPI
  WebsyIcons
  WebsyPDFButton
  Switch
  WebsyTemplate
  APIService
  ButtonGroup
  WebsyUtils
  Pager
  ResponsiveText
*/ 
import WebsyDesignsQlikPlugins from '@websy/websy-designs-qlik-plugin/dist/websy-designs-qlik-plugin-es6'
include('./components/api-service/index.js')
include('./components/button-group/index.js')
include('./components/date-picker/index.js')
include('./components/drag-drop/index.js')
include('./components/dropdown/index.js')
include('./components/form/index.js')
include('./components/icons/index.js')
include('./components/loading-dialog/index.js')
include('./components/menu/index.js')
include('./components/pager/index.js')
include('./components/pdf-button/index.js')
include('./components/popup-dialog/index.js')
include('./components/pubsub/index.js')
include('./components/responsive-text/index.js')
include('./components/result-list/index.js')
include('./components/router/index.js')
include('./components/switch/index.js')
include('./components/template/index.js')
include('./components/utils/index.js')
include('./components/visualizations/table/index.js')
include('./components/visualizations/table2/index.js')
include('./components/visualizations/table3/index.js')
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
  WebsyDragDrop,
  DragDrop: WebsyDragDrop,
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
  WebsyTable3,
  Table: WebsyTable,
  Table2: WebsyTable2,
  Table3: WebsyTable3,
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
  Switch,
  ResponsiveText,
  WebsyResponsiveText: ResponsiveText,
  QlikPlugin: WebsyDesignsQlikPlugins,
  Icons: WebsyIcons,
  WebsyIcons
}

WebsyDesigns.service = new WebsyDesigns.APIService('')
window.GlobalPubSub = new WebsyPubSub('empty', {})

export default WebsyDesigns
