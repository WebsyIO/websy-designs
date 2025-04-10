"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _websyDesignsQlikPluginEs = _interopRequireDefault(require("@websy/websy-designs-qlik-plugin/dist/websy-designs-qlik-plugin-es6"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /* global
                                                                                                                                                                                                                                                                                                                                                                                                include
                                                                                                                                                                                                                                                                                                                                                                                                WebsyPopupDialog 
                                                                                                                                                                                                                                                                                                                                                                                                WebsyLoadingDialog 
                                                                                                                                                                                                                                                                                                                                                                                                WebsyNavigationMenu 
                                                                                                                                                                                                                                                                                                                                                                                                WebsyPubSub
                                                                                                                                                                                                                                                                                                                                                                                                WebsyForm
                                                                                                                                                                                                                                                                                                                                                                                                MultiForm
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
/* global XMLHttpRequest fetch ENV */
var APIService = /*#__PURE__*/function () {
  function APIService() {
    var baseUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, APIService);
    this.baseUrl = baseUrl;
    this.options = _extends({}, {
      fieldValueSeparator: ':'
    }, options);
  }
  _createClass(APIService, [{
    key: "add",
    value: function add(entity, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var url = this.buildUrl(entity);
      return this.run('POST', url, data, options);
    }
  }, {
    key: "buildUrl",
    value: function buildUrl(entity, id, query) {
      if (typeof query === 'undefined') {
        query = [];
      }
      if (id) {
        query.push("id".concat(this.options.fieldValueSeparator).concat(id));
      }
      return "".concat(this.baseUrl, "/").concat(entity).concat(query.length > 0 ? "".concat(entity.indexOf('?') === -1 ? '?' : '&', "where=").concat(query.join(';')) : '');
    }
  }, {
    key: "delete",
    value: function _delete(entity, id) {
      var url = this.buildUrl(entity, id);
      return this.run('DELETE', url);
    }
  }, {
    key: "deleteMany",
    value: function deleteMany(entity, query) {
      var url = this.buildUrl(entity, null, query);
      return this.run('DELETE', url);
    }
  }, {
    key: "get",
    value: function get(entity, id, query, offset, limit) {
      var url = this.buildUrl(entity, id, query);
      if (offset) {
        if (url.indexOf('?') !== -1) {
          url += "&offset=".concat(offset);
        } else {
          url += "?offset=".concat(offset);
        }
      }
      if (limit || this.options.rowLimit) {
        if (url.indexOf('?') !== -1) {
          url += "&limit=".concat(limit || this.options.rowLimit);
        } else {
          url += "?limit=".concat(limit || this.options.rowLimit);
        }
      }
      return this.run('GET', url);
    }
  }, {
    key: "update",
    value: function update(entity, id, data) {
      var url = this.buildUrl(entity, id);
      return this.run('PUT', url, data);
    }
  }, {
    key: "fetchData",
    value: function fetchData(method, url, data) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return fetch(url, {
        method: method,
        mode: 'cors',
        // no-cors, *cors, same-origin
        cache: 'no-cache',
        // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin',
        // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },

        redirect: 'follow',
        // manual, *follow, error
        referrerPolicy: 'no-referrer',
        // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      }).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "run",
    value: function run(method, url, data) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var returnHeaders = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'text';
        if (options.responseType) {
          xhr.responseType = options.responseType;
        }
        if (options.headers) {
          for (var key in options.headers) {
            xhr.setRequestHeader(key, options.headers[key]);
          }
        }
        xhr.withCredentials = true;
        xhr.onload = function () {
          if (xhr.status === 401) {
            // || xhr.status === 403) {
            if (ENV && ENV.AUTH_REDIRECT) {
              window.location = ENV.AUTH_REDIRECT;
            } else {
              window.location = '/login';
            }
            // reject('401 - Unauthorized')
            return;
          }
          var response = xhr.responseType === 'text' ? xhr.responseText : xhr.response;
          if (response !== '' && response !== 'null') {
            try {
              response = JSON.parse(response);
            } catch (e) {
              // Either a bad Url or a string has been returned
            }
          } else {
            response = [];
          }
          if (response.err) {
            reject(JSON.stringify(response));
          } else {
            if (returnHeaders === true) {
              resolve([response, parseHeaders(xhr.getAllResponseHeaders())]);
            } else {
              resolve(response);
            }
          }
        };
        xhr.onerror = function () {
          return reject(xhr.statusText);
        };
        if (data) {
          xhr.send(JSON.stringify(data));
        } else {
          xhr.send();
        }
      });
      function parseHeaders(headers) {
        headers = headers.split('\r\n');
        var ouput = {};
        headers.forEach(function (h) {
          h = h.split(':');
          if (h.length === 2) {
            ouput[h[0]] = h[1].trim();
          }
        });
        return ouput;
      }
    }
  }]);
  return APIService;
}();
/* global */
var ButtonGroup = /*#__PURE__*/function () {
  function ButtonGroup(elementId, options) {
    _classCallCheck(this, ButtonGroup);
    this.elementId = elementId;
    var DEFAULTS = {
      style: 'button',
      subscribers: {},
      activeItem: -1,
      tag: 'div',
      allowNone: false,
      onActivate: function onActivate() {},
      onDeactivate: function onDeactivate() {}
    };
    this.options = _extends({}, DEFAULTS, options);
    var el = document.getElementById(this.elementId);
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      this.render();
    }
  }
  _createClass(ButtonGroup, [{
    key: "value",
    get: function get() {
      if (this.options.activeItem > -1) {
        return [this.options.items[this.options.activeItem]];
      } else if (this.options.multiSelect === true) {
        return this.options.items.filter(function (d) {
          return d.selected;
        });
      }
      return [];
    },
    set: function set(value) {
      var activeIndex = -1;
      if (this.options.multiSelect === true) {
        if (Array.isArray(value)) {
          this.options.items.forEach(function (d) {
            if (value.indexOf(d.value) !== -1) {
              d.selected = true;
            } else {
              d.selected = false;
            }
          });
        }
      } else {
        for (var i = 0; i < this.options.items.length; i++) {
          if ((this.options.items[i].value || this.options.items[i].label) === value) {
            activeIndex = i;
          }
        }
        this.options.activeItem = activeIndex;
      }
      this.render();
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('websy-button-group-item')) {
        var index = +event.target.getAttribute('data-index');
        if (this.options.multiSelect === true) {
          if (event.target.classList.contains('active')) {
            this.options.items[index].selected = false;
            this.options.onDeactivate(this.options.items[index], index, event);
            event.target.classList.remove('active');
            event.target.classList.add('inactive');
          } else {
            this.options.items[index].selected = true;
            this.options.onActivate(this.options.items[index], index, event);
            event.target.classList.add('active');
            event.target.classList.remove('inactive');
          }
        } else if (this.options.activeItem !== index) {
          var el = document.getElementById(this.elementId);
          var buttons = Array.from(el.querySelectorAll('.websy-button-group-item'));
          buttons.forEach(function (el) {
            var buttonIndex = el.getAttribute('data-index');
            el.classList.add('inactive');
            el.classList.remove('active');
          });
          event.target.classList.remove('inactive');
          event.target.classList.add('active');
          if (this.options.onDeactivate && this.options.activeItem !== -1) {
            this.options.onDeactivate(this.options.items[this.options.activeItem], this.options.activeItem, true);
          }
          this.options.activeItem = index;
          if (this.options.onActivate) {
            this.options.onActivate(this.options.items[index], index, event);
          }
        } else if (this.options.activeItem === index && this.options.allowNone === true) {
          if (this.options.onDeactivate) {
            this.options.onDeactivate(this.options.items[this.options.activeItem], this.options.activeItem);
          }
          this.options.activeItem = -1;
          event.target.classList.remove('active');
        }
        if (this.options.onClick) {
          this.options.onClick(this.options.items[index], index, event, this);
        }
      }
    }
  }, {
    key: "on",
    value: function on(event, fn) {
      if (!this.options.subscribers[event]) {
        this.options.subscribers[event] = [];
      }
      this.options.subscribers[event].push(fn);
    }
  }, {
    key: "publish",
    value: function publish(event, params) {
      this.options.subscribers[event].forEach(function (item) {
        item.apply(null, params);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      var el = document.getElementById(this.elementId);
      if (el && this.options.items) {
        el.innerHTML = this.options.items.map(function (t, i) {
          var activeClass = '';
          if (_this.options.activeItem !== -1) {
            activeClass = i === _this.options.activeItem ? 'active' : 'inactive';
          } else if (_this.options.multiSelect === true) {
            activeClass = t.selected === true ? 'active' : 'inactive';
          }
          return "\n          <".concat(_this.options.tag, " ").concat((t.attributes || []).join(' '), " data-id=\"").concat(t.id || t.label, "\" data-index=\"").concat(i, "\" class=\"websy-button-group-item ").concat((t.classes || []).join(' '), " ").concat(_this.options.style, "-style ").concat(activeClass, "\">").concat(t.label, "</").concat(_this.options.tag, ">\n        ");
        }).join('');
      }
    }
  }]);
  return ButtonGroup;
}();
var WebsyDatePicker = /*#__PURE__*/function () {
  function WebsyDatePicker(elementId, options) {
    _classCallCheck(this, WebsyDatePicker);
    this.oneDay = 1000 * 60 * 60 * 24;
    this.currentselection = [];
    this.validDates = [];
    this.validYears = [];
    this.validHours = [];
    this.customRangeSelected = true;
    this.shiftPressed = false;
    var DEFAULTS = {
      defaultRange: 0,
      dateFormat: '%_m/%_d/%Y',
      allowClear: true,
      hideRanges: false,
      arrowIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z\"/></svg>",
      clearIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><line x1=\"368\" y1=\"368\" x2=\"144\" y2=\"144\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/><line x1=\"368\" y1=\"144\" x2=\"144\" y2=\"368\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/></svg>",
      confirmIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><polyline points=\"416 128 192 384 96 288\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/></svg>",
      minAllowedDate: this.floorDate(new Date(new Date(new Date().setFullYear(new Date().getFullYear() - 1)).setDate(1))),
      maxAllowedDate: this.floorDate(new Date(new Date())),
      minAllowedYear: 1970,
      maxAllowedYear: new Date().getFullYear(),
      daysOfWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      monthsOfYear: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      hours: new Array(24).fill(0).map(function (d, i) {
        return {
          text: (i < 10 ? '0' : '') + i + ':00',
          num: 1 / 24 * i
        };
      }),
      mode: 'date',
      monthMap: {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
      },
      ranges: []
    };
    DEFAULTS.ranges = {
      date: [{
        label: 'All Dates',
        range: [DEFAULTS.minAllowedDate, DEFAULTS.maxAllowedDate]
      }, {
        label: 'Today',
        range: [this.floorDate(new Date())]
      }, {
        label: 'Yesterday',
        range: [this.floorDate(new Date().setDate(new Date().getDate() - 1))]
      }, {
        label: 'Last 7 Days',
        range: [this.floorDate(new Date().setDate(new Date().getDate() - 6)), this.floorDate(new Date())]
      }, {
        label: 'This Month',
        range: [this.floorDate(new Date().setDate(1)), this.floorDate(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() + 1) - this.oneDay)]
      }, {
        label: 'Last Month',
        range: [this.floorDate(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() - 1)), this.floorDate(new Date(new Date().setDate(1)).setMonth(new Date().getMonth()) - this.oneDay)]
      }, {
        label: 'This Year',
        range: [this.floorDate(new Date("1/1/".concat(new Date().getFullYear()))), this.floorDate(new Date("12/31/".concat(new Date().getFullYear())))]
      }, {
        label: 'Last Year',
        range: [this.floorDate(new Date("1/1/".concat(new Date().getFullYear() - 1))), this.floorDate(new Date("12/31/".concat(new Date().getFullYear() - 1)))]
      }],
      year: [{
        label: 'All Years',
        range: [DEFAULTS.minAllowedYear, DEFAULTS.maxAllowedYear]
      }, {
        label: 'Last 5 Years',
        range: [new Date().getFullYear() - 4, DEFAULTS.maxAllowedYear]
      }, {
        label: 'Last 10 Years',
        range: [new Date().getFullYear() - 9, DEFAULTS.maxAllowedYear]
      }],
      monthyear: [{
        label: 'All Month Years',
        range: [DEFAULTS.minAllowedDate, DEFAULTS.maxAllowedDate]
      }, {
        label: 'Last 12 Months',
        range: [this.floorDate(new Date(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() - 12))), this.floorDate(new Date(new Date().setDate(1)))]
      }, {
        label: 'Last 18 Months',
        range: [this.floorDate(new Date(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() - 18))), this.floorDate(new Date(new Date().setDate(1)))]
      }, {
        label: 'Last 24 Months',
        range: [this.floorDate(new Date(new Date(new Date().setDate(1)).setMonth(new Date().getMonth() - 24))), this.floorDate(new Date(new Date().setDate(1)))]
      }],
      hour: [{
        label: 'All Hours',
        range: ['00:00', '23:00']
      }]
    };
    this.options = _extends({}, DEFAULTS, options);
    this.selectedRange = this.options.defaultRange || 0;
    this.selectedRangeDates = _toConsumableArray(this.options.ranges[this.options.mode][this.options.defaultRange || 0].range);
    this.priorSelectedDates = null;
    this.priorselection = null;
    this.priorCustomRangeSelected = null;
    if (!elementId) {
      console.log('No element Id provided');
      return;
    }
    var el = document.getElementById(elementId);
    if (el) {
      this.elementId = elementId;
      el.addEventListener('click', this.handleClick.bind(this));
      el.addEventListener('mousedown', this.handleMouseDown.bind(this));
      el.addEventListener('mouseover', this.handleMouseOver.bind(this));
      el.addEventListener('mouseup', this.handleMouseUp.bind(this));
      document.addEventListener('keydown', this.handleKeyDown.bind(this));
      document.addEventListener('keyup', this.handleKeyUp.bind(this));
      var html = "\n        <div class='websy-date-picker-container ".concat(this.options.mode, "'>\n          <span class='websy-dropdown-header-label'>").concat(this.options.label || 'Date', "</span>\n          <div id=\"").concat(this.elementId, "_header\" class='websy-date-picker-header ").concat(this.options.allowClear === true ? 'allow-clear' : '', "'>\n            <span id='").concat(this.elementId, "_selectedRange'>").concat(this.options.ranges[this.options.mode][this.selectedRange].label, "</span>\n            ").concat(this.options.arrowIcon, "\n      ");
      if (this.options.allowClear === true) {
        html += "<div class='clear-selection'>".concat(this.options.clearIcon, "</div>");
      }
      html += "\n          </div>\n          <div id='".concat(this.elementId, "_mask' class='websy-date-picker-mask'></div>\n          <div id='").concat(this.elementId, "_content' class='websy-date-picker-content ").concat(this.options.hideRanges === true ? 'hide-ranges' : '', "'>\n            <div class='websy-date-picker-ranges' >\n              <ul id='").concat(this.elementId, "_rangelist'>\n                ").concat(this.renderRanges(), "\n              </ul>\n            </div><!--\n            --><div id='").concat(this.elementId, "_datelist' class='websy-date-picker-custom'>").concat(this.renderDates(), "</div>\n            <div class='websy-dp-button-container'>\n              <span class=\"dp-footnote\">Click and drag or hold Shift and click to select a range of values</span>\n              <button class='").concat(this.options.cancelBtnClasses || '', " websy-btn websy-dp-cancel'>\n                ").concat(this.options.clearIcon, "\n              </button>\n              <button class='").concat(this.options.confirmBtnClasses || '', " websy-btn websy-dp-confirm'>\n                ").concat(this.options.confirmIcon, "\n              </button>\n            </div>\n          </div>          \n        </div>\n      ");
      el.innerHTML = html;
      this.render();
    } else {
      console.log('No element found with Id', elementId);
    }
  }
  _createClass(WebsyDatePicker, [{
    key: "close",
    value: function close(confirm) {
      var _this2 = this;
      var isRange = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var maskEl = document.getElementById("".concat(this.elementId, "_mask"));
      var contentEl = document.getElementById("".concat(this.elementId, "_content"));
      var el = document.getElementById(this.elementId);
      if (el) {
        el.style.zIndex = '';
      }
      maskEl.classList.remove('active');
      contentEl.classList.remove('active');
      if (confirm === true) {
        if (this.options.onChange) {
          if (this.customRangeSelected === true) {
            if (this.options.mode === 'hour') {
              var hoursOut = [];
              for (var i = this.selectedRangeDates[0]; i < this.selectedRangeDates[1] + 1; i++) {
                hoursOut.push(this.options.hours[i]);
              }
              this.options.onChange(hoursOut, true, this.selectedRange);
            } else {
              this.options.onChange(this.selectedRangeDates, true, this.selectedRange);
            }
          } else {
            if (this.options.mode === 'hour') {
              var _hoursOut = this.currentselection.map(function (h) {
                return _this2.options.hours[h];
              });
              this.options.onChange(_hoursOut, true, this.selectedRange);
            } else {
              this.options.onChange(this.currentselection, isRange, this.selectedRange);
            }
          }
        }
        this.priorSelectedDates = _toConsumableArray(this.selectedRangeDates);
        this.priorSelectedRange = this.selectedRange;
        this.priorselection = _toConsumableArray(this.currentselection);
        this.priorCustomRangeSelected = this.customRangeSelected;
        this.updateRange();
      } else {
        this.selectedRangeDates = _toConsumableArray(this.priorSelectedDates || []);
        this.selectedRange = this.priorSelectedRange;
        this.customRangeSelected = this.priorCustomRangeSelected;
        this.currentselection = _toConsumableArray(this.priorselection || []);
        this.highlightRange();
      }
    }
  }, {
    key: "floorDate",
    value: function floorDate(d) {
      if (typeof d === 'number') {
        d = new Date(d);
      }
      // d.setTime(d.getTime() + d.getTimezoneOffset() * 60000)
      return new Date(d.setUTCHours(12, 0, 0, 0));
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('websy-date-picker-header')) {
        this.open();
      } else if (event.target.classList.contains('websy-date-picker-mask')) {
        this.close();
      } else if (event.target.classList.contains('websy-date-picker-range')) {
        if (event.target.classList.contains('websy-disabled-range')) {
          return;
        }
        var index = event.target.getAttribute('data-index');
        this.selectRange(index);
        this.updateRange(index);
      } else if (event.target.classList.contains('websy-dp-date')) {
        // 
      } else if (event.target.classList.contains('websy-dp-confirm')) {
        this.close(true);
      } else if (event.target.classList.contains('websy-dp-cancel')) {
        this.close();
      } else if (event.target.classList.contains('clear-selection')) {
        this.currentselection = [];
        this.selectedRangeDates = [];
        this.selectRange(0, false);
        if (this.options.onClear) {
          this.options.onClear();
        }
        // this.updateRange(0)
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (event.key === 'Shift') {
        this.dragging = true;
        this.shiftPressed = true;
      }
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event) {
      this.dragging = false;
      this.shiftPressed = false;
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(event) {
      if (this.shiftPressed === true && this.currentselection.length > 0) {
        this.mouseDownId = this.currentselection[this.currentselection.length - 1];
        var dateId = event.target.getAttribute('data-id');
        this.selectDate(+dateId);
      } else {
        this.mouseDown = true;
        this.dragging = false;
        if (event.target.classList.contains('websy-dp-date')) {
          if (event.target.classList.contains('websy-disabled-date')) {
            return;
          }
          if (this.customRangeSelected === true) {
            this.currentselection = [];
            this.customRangeSelected = false;
          }
          this.mouseDownId = +event.target.getAttribute('data-id');
          this.selectDate(this.mouseDownId);
        }
      }
    }
  }, {
    key: "handleMouseOver",
    value: function handleMouseOver(event) {
      if (this.mouseDown === true) {
        if (event.target.classList.contains('websy-dp-date')) {
          if (event.target.classList.contains('websy-disabled-date')) {
            return;
          }
          var dateId = +event.target.getAttribute('data-id');
          if (dateId !== this.mouseDownId) {
            this.dragging = true;
            this.selectDate(dateId);
          }
        }
      }
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(event) {
      this.mouseDown = false;
      this.dragging = false;
      this.mouseDownId = null;
    }
  }, {
    key: "highlightRange",
    value: function highlightRange() {
      var _this3 = this;
      var el = document.getElementById("".concat(this.elementId, "_dateList"));
      if (el) {
        var dateEls = el.querySelectorAll('.websy-dp-date');
        for (var i = 0; i < dateEls.length; i++) {
          dateEls[i].classList.remove('selected');
          dateEls[i].classList.remove('first');
          dateEls[i].classList.remove('last');
        }
      }
      if (this.selectedRange === 0) {
        return;
      }
      if (this.customRangeSelected === true) {
        if (this.isContinuousRange || this.mouseDown) {
          var diff;
          if (this.options.mode === 'date') {
            diff = Math.floor((this.selectedRangeDates[this.selectedRangeDates.length - 1].getTime() - this.selectedRangeDates[0].getTime()) / this.oneDay);
            // if (this.selectedRangeDates[0].getMonth() !== this.selectedRangeDates[this.selectedRangeDates.length - 1].getMonth()) {
            //   diff += 1
            // }
          } else if (this.options.mode === 'year') {
            diff = this.selectedRangeDates[this.selectedRangeDates.length - 1] - this.selectedRangeDates[0];
            if (this.selectedRangeDates[this.selectedRangeDates.length - 1] !== this.selectedRangeDates[0]) {
              // diff += 1
            }
          } else if (this.options.mode === 'monthyear') {
            var yearDiff = (this.selectedRangeDates[this.selectedRangeDates.length - 1].getFullYear() - this.selectedRangeDates[0].getFullYear()) * 12;
            diff = Math.floor(this.selectedRangeDates[this.selectedRangeDates.length - 1].getMonth() - this.selectedRangeDates[0].getMonth()) + yearDiff;
          } else if (this.options.mode === 'hour') {
            diff = this.selectedRangeDates[this.selectedRangeDates.length - 1] - this.selectedRangeDates[0];
          }
          for (var _i = 0; _i < diff + 1; _i++) {
            var d = void 0;
            var rangeStart = void 0;
            var rangeEnd = void 0;
            if (this.options.mode === 'date') {
              d = this.floorDate(new Date(this.selectedRangeDates[0].getTime() + _i * this.oneDay));
              // d.setUTCHours(12, 0, 0, 0)
              d = d.getTime();
              // console.log('highlighting', this.selectedRangeDates[0].getTime(), d)
              rangeStart = this.selectedRangeDates[0].getTime();
              rangeEnd = this.selectedRangeDates[this.selectedRangeDates.length - 1].getTime();
            } else if (this.options.mode === 'year') {
              d = this.selectedRangeDates[0] + _i;
              rangeStart = this.selectedRangeDates[0];
              rangeEnd = this.selectedRangeDates[this.selectedRangeDates.length - 1];
            } else if (this.options.mode === 'monthyear') {
              d = this.floorDate(new Date(this.selectedRangeDates[0].getTime()).setMonth(this.selectedRangeDates[0].getMonth() + _i));
              d = d.getTime();
              console.log('highlighting', this.selectedRangeDates[0].getTime(), d);
              rangeStart = this.selectedRangeDates[0].getTime();
              rangeEnd = this.selectedRangeDates[this.selectedRangeDates.length - 1].getTime();
            } else if (this.options.mode === 'hour') {
              d = this.selectedRangeDates[0] + _i;
              rangeStart = this.selectedRangeDates[0];
              rangeEnd = this.selectedRangeDates[this.selectedRangeDates.length - 1];
            }
            var dateEl = void 0;
            if (this.options.mode === 'date') {
              dateEl = document.getElementById("".concat(this.elementId, "_").concat(d, "_date"));
            } else if (this.options.mode === 'year') {
              dateEl = document.getElementById("".concat(this.elementId, "_").concat(d, "_year"));
            } else if (this.options.mode === 'monthyear') {
              dateEl = document.getElementById("".concat(this.elementId, "_").concat(d, "_monthyear"));
            } else if (this.options.mode === 'hour') {
              dateEl = document.getElementById("".concat(this.elementId, "_").concat(d, "_hour"));
            }
            if (dateEl) {
              dateEl.classList.add('selected');
              if (d === rangeStart) {
                dateEl.classList.add("".concat(this.options.sortDirection === 'desc' ? 'last' : 'first'));
              }
              if (d === rangeEnd) {
                dateEl.classList.add("".concat(this.options.sortDirection === 'desc' ? 'first' : 'last'));
              }
            }
          }
        } else {
          this.selectedRangeDates.forEach(function (dIn) {
            var d;
            var suffix = '_date';
            if (_this3.options.mode === 'date') {
              d = _this3.floorDate(new Date(dIn.getTime()));
              d = d.getTime();
            } else if (_this3.options.mode === 'year') {
              d = dIn;
              suffix = '_year';
            } else if (_this3.options.mode === 'monthyear') {
              d = _this3.floorDate(new Date(dIn.getTime()).setMonth(dIn.getMonth()));
              d = d.getTime();
              suffix = '_monthyear';
            } else if (_this3.options.mode === 'hour') {
              d = dIn;
              suffix = '_hour';
            }
            var dateEl = document.getElementById("".concat(_this3.elementId, "_").concat(d).concat(suffix));
            if (dateEl) {
              dateEl.classList.add('selected', 'first', 'last');
            }
          });
        }
      } else {
        this.currentselection.forEach(function (d) {
          var dateEl;
          if (_this3.options.mode === 'date') {
            dateEl = document.getElementById("".concat(_this3.elementId, "_").concat(d, "_date"));
          } else if (_this3.options.mode === 'year') {
            dateEl = document.getElementById("".concat(_this3.elementId, "_").concat(d, "_year"));
          } else if (_this3.options.mode === 'monthyear') {
            dateEl = document.getElementById("".concat(_this3.elementId, "_").concat(d, "_monthyear"));
          } else if (_this3.options.mode === 'hour') {
            dateEl = document.getElementById("".concat(_this3.elementId, "_").concat(d, "_hour"));
          }
          if (dateEl) {
            dateEl.classList.add('selected');
            dateEl.classList.add('first');
            dateEl.classList.add('last');
          }
        });
      }
    }
  }, {
    key: "open",
    value: function open(options) {
      var override = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var maskEl = document.getElementById("".concat(this.elementId, "_mask"));
      var contentEl = document.getElementById("".concat(this.elementId, "_content"));
      var el = document.getElementById(this.elementId);
      if (el) {
        el.style.zIndex = 999;
      }
      maskEl.classList.add('active');
      contentEl.classList.add('active');
      this.priorSelectedDates = _toConsumableArray(this.selectedRangeDates);
      this.priorSelectedRange = this.selectedRange;
      this.priorselection = _toConsumableArray(this.currentselection);
      this.priorCustomRangeSelected = this.customRangeSelected;
      this.scrollRangeIntoView();
    }
  }, {
    key: "render",
    value: function render(disabledDates) {
      if (!this.elementId) {
        console.log('No element Id provided for Websy Loading Dialog');
        return;
      }
      var el = document.getElementById("".concat(this.elementId, "_datelist"));
      if (el && disabledDates) {
        el.innerHTML = this.renderDates(disabledDates);
      }
      var rangeEl = document.getElementById("".concat(this.elementId, "_rangelist"));
      if (rangeEl && disabledDates) {
        rangeEl.innerHTML = this.renderRanges();
      }
      this.highlightRange();
    }
  }, {
    key: "renderDates",
    value: function renderDates(disabledDates) {
      var _this4 = this;
      var disabled = [];
      this.validDates = [];
      this.validYears = [];
      this.validHours = [];
      this.monthYears = {};
      this.monthYearMonths = [];
      if (disabledDates) {
        disabled = disabledDates.map(function (d) {
          if (_this4.options.mode === 'date') {
            return d.getTime();
          } else if (_this4.options.mode === 'year') {
            return d;
          } else if (_this4.options.mode === 'monthyear') {
            // 
          } else if (_this4.options.mode === 'hour') {
            return d;
          }
          return d.getTime();
        });
      }
      // first disabled all of the ranges
      this.options.ranges[this.options.mode].forEach(function (r) {
        return r.disabled = true;
      });
      var diff;
      if (this.options.mode === 'date') {
        diff = Math.ceil((this.options.maxAllowedDate.getTime() - this.options.minAllowedDate.getTime()) / this.oneDay) + 1;
      } else if (this.options.mode === 'year') {
        diff = this.options.maxAllowedYear - this.options.minAllowedYear + 1;
      } else if (this.options.mode === 'monthyear') {
        diff = Math.ceil((this.options.maxAllowedDate.getTime() - this.options.minAllowedDate.getTime()) / this.oneDay) + 1;
      } else if (this.options.mode === 'hour') {
        diff = 24;
      }
      var months = {};
      var yearList = [];
      for (var i = 0; i < diff; i++) {
        if (this.options.mode === 'date' || this.options.mode === 'monthyear') {
          var d = this.floorDate(new Date(this.options.minAllowedDate.getTime() + i * this.oneDay));
          var monthYear = "".concat(this.options.monthMap[d.getMonth()], " ").concat(d.getFullYear());
          if (!months[monthYear]) {
            months[monthYear] = [];
          }
          if (!this.monthYears[d.getFullYear()]) {
            this.monthYears[d.getFullYear()] = [];
          }
          if (this.monthYearMonths.indexOf("".concat(d.getMonth(), "-").concat(d.getFullYear())) === -1) {
            this.monthYearMonths.push("".concat(d.getMonth(), "-").concat(d.getFullYear()));
            var firstOfMonth = new Date(new Date(d).setDate(1));
            this.monthYears[d.getFullYear()].push({
              date: firstOfMonth,
              month: this.options.monthMap[d.getMonth()],
              monthNum: d.getMonth(),
              year: d.getFullYear(),
              id: firstOfMonth.getTime()
            });
          }
          if (disabled.indexOf(d.getTime()) === -1) {
            this.validDates.push(d.getTime());
          }
          months[monthYear].push({
            date: d,
            dayOfMonth: d.getDate(),
            dayOfWeek: d.getDay(),
            id: d.getTime(),
            disabled: disabled.indexOf(d.getTime()) !== -1
          });
        } else if (this.options.mode === 'year') {
          var _d = this.options.minAllowedYear + i;
          yearList.push({
            year: _d,
            id: _d,
            disabled: disabled.indexOf(_d) !== -1
          });
          if (disabled.indexOf(_d) === -1) {
            this.validYears.push(_d);
          }
        } else if (this.options.mode === 'hour') {
          //
        }
      }
      if (this.options.mode === 'hour') {
        this.options.hours.forEach(function (h) {
          if (disabled.indexOf(h.text) === -1) {
            _this4.validHours.push(h);
          }
        });
      }
      // check each range to see if it can be enabled
      for (var _i2 = 0; _i2 < this.options.ranges[this.options.mode].length; _i2++) {
        var r = this.options.ranges[this.options.mode][_i2];
        if (this.options.mode === 'date' || this.options.mode === 'monthyear') {
          // check the first date
          if (this.validDates.indexOf(r.range[0].getTime()) !== -1) {
            r.disabled = false;
          } else if (r.range[1]) {
            // check the last date
            if (this.validDates.indexOf(r.range[1].getTime()) !== -1) {
              r.disabled = false;
            } else {
              // check the full range until a match is found
              for (var _i3 = r.range[0].getTime(); _i3 <= r.range[1].getTime(); _i3 += this.oneDay) {
                var testDate = this.floorDate(new Date(_i3));
                if (this.validDates.indexOf(testDate.getTime()) !== -1) {
                  r.disabled = false;
                  break;
                }
              }
            }
          }
        } else if (this.options.mode === 'year') {
          if (this.validYears.indexOf(r.range[0]) !== -1) {
            r.disabled = false;
          } else if (r.range[1]) {
            if (this.validYears.indexOf(r.range[1]) !== -1) {
              r.disabled = false;
            } else {
              // check the full range until a match is found
              for (var _i4 = r.range[0]; _i4 <= r.range[1]; _i4++) {
                if (this.validYears.indexOf(r.range[0] + _i4) !== -1) {
                  r.disabled = false;
                  break;
                }
              }
            }
          }
        } else if (this.options.mode === 'monthyear') {
          // 
        } else if (this.options.mode === 'hour') {
          if (this.validDates.indexOf(r.range[0]) !== -1) {
            r.disabled = false;
          } else if (r.range[1]) {
            if (this.validDates.indexOf(r.range[1]) !== -1) {
              r.disabled = false;
            } else {
              // check the full range until a match is found
              for (var _i5 = r.range[0]; _i5 <= r.range[1]; _i5++) {
                if (this.validDates.indexOf(r.range[0] + _i5) !== -1) {
                  r.disabled = false;
                  break;
                }
              }
            }
          }
        }
      }
      var html = '';
      if (this.options.mode === 'date') {
        html += "\n        <ul class='websy-dp-days-header'>\n      ";
        html += this.options.daysOfWeek.map(function (d) {
          return "<li>".concat(d, "</li>");
        }).join('');
        html += "\n        </ul>         \n        <div id='".concat(this.elementId, "_dateList' class='websy-dp-date-list'>\n      ");
        for (var key in months) {
          html += "\n          <div class='websy-dp-month-container'>\n            <span id='".concat(key.replace(/\s/g, '_'), "'>").concat(key, "</span>\n            <ul>\n        ");
          if (months[key][0].dayOfWeek > 0) {
            var paddedDays = [];
            for (var _i6 = 0; _i6 < months[key][0].dayOfWeek; _i6++) {
              paddedDays.push("<li>&nbsp;</li>");
            }
            html += paddedDays.join('');
          }
          html += months[key].map(function (d) {
            return "<li id='".concat(_this4.elementId, "_").concat(d.id, "_date' data-id='").concat(d.id, "' class='websy-dp-date ").concat(d.disabled === true ? 'websy-disabled-date' : '', "'>").concat(d.dayOfMonth, "</li>");
          }).join('');
          html += "\n            </ul>\n          </div>\n        ";
        }
        html += '</div>';
      } else if (this.options.mode === 'year') {
        if (this.options.sortDirection === 'desc') {
          yearList.reverse();
        }
        html += "<div id='".concat(this.elementId, "_dateList' class='websy-dp-date-list'><ul>");
        html += yearList.map(function (d) {
          return "<li id='".concat(_this4.elementId, "_").concat(d.id, "_year' data-id='").concat(d.id, "' class='websy-dp-date websy-dp-year ").concat(d.disabled === true ? 'websy-disabled-date' : '', "'>").concat(d.year, "</li>");
        }).join('');
        html += "</ul></div>";
      } else if (this.options.mode === 'monthyear') {
        html += "<div id='".concat(this.elementId, "_dateList' class='websy-dp-monthyear-container'>");
        for (var year in this.monthYears) {
          html += "\n          <ul>\n            <li>".concat(year, "</li>\n        ");
          if (this.monthYears[year][0].monthNum > 0) {
            var paddedMonths = [];
            for (var _i7 = 0; _i7 < this.monthYears[year][0].monthNum; _i7++) {
              paddedMonths.push("<li>&nbsp;</li>");
            }
            html += paddedMonths.join('');
          }
          html += this.monthYears[year].map(function (d) {
            return "<li id='".concat(_this4.elementId, "_").concat(d.id, "_monthyear' data-id='").concat(d.id, "' data-year='").concat(d.year, "' class='websy-dp-date websy-dp-monthyear'>").concat(d.month, "</li>");
          }).join('');
          html += "</ul>";
        }
        html += "</div>";
      } else if (this.options.mode === 'hour') {
        html += "<div id='".concat(this.elementId, "_dateList' class='websy-dp-date-list'><ul>");
        html += this.options.hours.map(function (h) {
          return "<li id='".concat(_this4.elementId, "_").concat(+h.text.split(':')[0], "_hour' data-id='").concat(+h.text.split(':')[0], "' data-hour='").concat(h.text, "' class='websy-dp-date websy-dp-hour'>").concat(h.text, "</li>");
        }).join('');
        html += "</ul></div>";
      }
      return html;
    }
  }, {
    key: "renderRanges",
    value: function renderRanges() {
      var _this5 = this;
      return this.options.ranges[this.options.mode].map(function (r, i) {
        return "\n      <li data-index='".concat(i, "' class='websy-date-picker-range ").concat(i === _this5.selectedRange ? 'active' : '', " ").concat(r.disabled === true ? 'websy-disabled-range' : '', "'>").concat(r.label, "</li>\n    ");
      }).join('') + "<li data-index='-1' class='websy-date-picker-range ".concat(this.selectedRange === -1 ? 'active' : '', "'>Custom</li>");
    }
  }, {
    key: "scrollRangeIntoView",
    value: function scrollRangeIntoView() {
      if (this.selectedRangeDates[0]) {
        var el;
        if (this.options.mode === 'date') {
          el = document.getElementById("".concat(this.elementId, "_").concat(this.selectedRangeDates[0].getTime(), "_date"));
        } else if (this.options.mode === 'year') {
          if (this.options.sortDirection === 'desc') {
            el = document.getElementById("".concat(this.elementId, "_").concat(this.selectedRangeDates[this.selectedRangeDates.length - 1], "_year"));
          } else {
            el = document.getElementById("".concat(this.elementId, "_").concat(this.selectedRangeDates[0], "_year"));
          }
        } else if (this.options.mode === 'monthyear') {
          // 
        } else if (this.options.mode === 'hour') {
          // 
        }
        var parentEl = document.getElementById("".concat(this.elementId, "_dateList"));
        if (el && parentEl) {
          parentEl.scrollTo(0, el.offsetTop);
        }
      }
    }
  }, {
    key: "selectDate",
    value: function selectDate(timestamp) {
      if (this.currentselection.length === 0) {
        this.currentselection.push(timestamp);
      } else {
        if (this.dragging === true) {
          this.currentselection = [this.mouseDownId];
          if (timestamp > this.currentselection[0]) {
            this.currentselection.push(timestamp);
          } else {
            this.currentselection.splice(0, 0, timestamp);
          }
          this.customRangeSelected = true;
        } else {
          var index = this.currentselection.indexOf(timestamp);
          if (index !== -1) {
            this.currentselection.splice(index, 1);
          } else {
            this.currentselection.push(timestamp);
          }
          this.currentselection.sort(function (a, b) {
            return a - b;
          });
          this.customRangeSelected = false;
        }
      }
      if (this.options.mode === 'date' || this.options.mode === 'monthyear') {
        this.selectedRangeDates = [new Date(this.currentselection[0]), new Date(this.currentselection[1] || this.currentselection[0])];
      } else if (this.options.mode === 'year') {
        this.selectedRangeDates = [this.currentselection[0], this.currentselection[1] || this.currentselection[0]];
      } else if (this.options.mode === 'monthyear') {
        // 
      } else if (this.options.mode === 'hour') {
        this.selectedRangeDates = [this.currentselection[0], this.currentselection[1] || this.currentselection[0]];
      }
      // if (this.currentselection.length === 2) {
      //   this.currentselection = [] 
      // }    
      this.selectedRange = -1;
      this.highlightRange();
    }
  }, {
    key: "selectRange",
    value: function selectRange(index) {
      var confirm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (this.options.ranges[this.options.mode][index]) {
        this.selectedRangeDates = _toConsumableArray(this.options.ranges[this.options.mode][index].range);
        this.currentselection = [];
        // this.currentselection = this.options.ranges[this.options.mode][index].range.map(d => {
        //   if (this.options.mode === 'date' || this.options.mode === 'monthyear') {
        //     return d.getTime()
        //   }
        //   else {
        //     return d
        //   }
        // })
        this.selectedRange = +index;
        this.highlightRange();
        this.updateRange();
        if (confirm === true) {
          this.close(confirm, true);
        }
      }
    }
  }, {
    key: "selectCustomRange",
    value: function selectCustomRange(rangeInput) {
      var _this6 = this;
      this.selectedRange = -1;
      this.isContinuousRange = true;
      // if (rangeInput.length === 1) {
      //   this.selectedRangeDates = [...rangeInput]
      //   this.customRangeSelected = true
      // }
      // else if (rangeInput.length === 2) {      
      //   this.selectedRangeDates = [...rangeInput]
      //   this.customRangeSelected = true
      // }
      this.selectedRangeDates = _toConsumableArray(rangeInput);
      this.customRangeSelected = true;
      rangeInput.forEach(function (r, i) {
        if (i > 0) {
          if (_this6.options.mode === 'date' || _this6.options.mode === 'monthyear') {
            if (r.getTime() / _this6.oneDay - rangeInput[i - 1] / _this6.oneDay > 1) {
              _this6.isContinuousRange = false;
            }
          } else if (_this6.options.mode === 'hour' || _this6.options.mode === 'year') {
            if (r - rangeInput[i - 1] > 1) {
              _this6.isContinuousRange = false;
            }
          }
        }
      });
      if (rangeInput.length > 2 && this.isContinuousRange === true) {
        this.selectedRangeDates = [rangeInput[0], rangeInput[rangeInput.length - 1]];
        this.customRangeSelected = true;
      }
      if (this.isContinuousRange === false) {
        this.currentselection = [];
      }
      // check if the custom range matches a configured range
      for (var i = 0; i < this.options.ranges[this.options.mode].length; i++) {
        if (this.options.ranges[this.options.mode][i].range.length === 1) {
          var a = this.options.ranges[this.options.mode][i].range[0];
          var b = rangeInput[0];
          if (this.options.mode === 'date') {
            a = a.getTime();
            b = b.getTime();
          }
          if (a === b) {
            this.selectedRange = i;
            this.customRangeSelected = false;
            break;
          }
        } else if (this.options.ranges[this.options.mode][i].range.length === 2) {
          var _a = this.options.ranges[this.options.mode][i].range[0];
          var _b = rangeInput[0];
          var c = this.options.ranges[this.options.mode][i].range[1];
          var d = rangeInput[rangeInput.length - 1];
          if (this.options.mode === 'date') {
            _a = _a.getTime();
            _b = _b.getTime();
            c = c.getTime();
            d = d.getTime();
          }
          if (_a === _b && c === d) {
            this.selectedRange = i;
            this.customRangeSelected = false;
            break;
          }
        }
      }
      this.highlightRange();
      this.updateRange();
    }
  }, {
    key: "setDateBounds",
    value: function setDateBounds(range) {
      if (['All Dates', 'All Years', 'All'].indexOf(this.options.ranges[this.options.mode][0].label) !== -1) {
        this.options.ranges[this.options.mode][0].range = [range[0], range[1] || range[0]];
      }
      if (this.options.mode === 'date') {
        this.options.minAllowedDate = range[0];
        this.options.maxAllowedDate = range[1] || range[0];
      } else if (this.options.mode === 'year') {
        this.options.minAllowedYear = range[0];
        this.options.maxAllowedYear = range[1] || range[0];
      } else if (this.options.mode === 'monthyear') {
        this.options.minAllowedDate = range[0];
        this.options.maxAllowedDate = range[1] || range[0];
      } else if (this.options.mode === 'hour') {
        this.options.minAllowedHour = range[0];
        this.options.maxAllowedHour = range[1] || range[0];
      }
    }
  }, {
    key: "updateRange",
    value: function updateRange() {
      var _this7 = this;
      var range;
      if (this.selectedRange === -1) {
        var list = (this.currentselection.length > 0 ? this.currentselection : this.selectedRangeDates).map(function (d) {
          if (_this7.options.mode === 'date') {
            if (!d.toLocaleDateString) {
              d = new Date(d);
            }
            return d.toLocaleDateString();
          } else if (_this7.options.mode === 'year') {
            return d;
          } else if (_this7.options.mode === 'monthyear') {
            if (!d.getMonth) {
              d = new Date(d);
            }
            return "".concat(_this7.options.monthMap[d.getMonth()], " ").concat(d.getFullYear());
          } else if (_this7.options.mode === 'hour') {
            return d;
          }
        });
        var start = list[0];
        var end = '';
        if (this.customRangeSelected === true && this.isContinuousRange === true) {
          if (list.length > 1) {
            end = " - ".concat(list[list.length - 1]);
          }
          if (this.options.mode === 'hour') {
            start = this.options.hours[start].text;
            if (list.length > 1) {
              end = "".concat(this.customRangeSelected === true ? ' - ' : '').concat(this.options.hours[list[list.length - 1]].text);
            }
          }
        } else {
          if (list.length > 1) {
            start = "".concat(list.length, " selected");
          } else {
            if (this.options.mode === 'hour') {
              start = this.options.hours[start].text;
            }
          }
        }
        range = {
          label: "".concat(start).concat(end)
        };
      } else {
        range = this.options.ranges[this.options.mode][this.selectedRange];
      }
      var el = document.getElementById(this.elementId);
      var labelEl = document.getElementById("".concat(this.elementId, "_selectedRange"));
      if (el) {
        var rangeEls = el.querySelectorAll(".websy-date-picker-range");
        for (var i = 0; i < rangeEls.length; i++) {
          rangeEls[i].classList.remove('active');
          if (i === this.selectedRange) {
            rangeEls[i].classList.add('active');
          }
        }
      }
      if (labelEl) {
        labelEl.innerHTML = range.label;
      }
      var headerEl = document.getElementById("".concat(this.elementId, "_header"));
      if (headerEl) {
        if (this.selectedRange === 0) {
          headerEl.classList.remove('range-selected');
        } else {
          headerEl.classList.add('range-selected');
        }
      }
    }
  }]);
  return WebsyDatePicker;
}();
Date.prototype.floor = function () {
  return new Date("".concat(this.getMonth() + 1, "/").concat(this.getDate(), "/").concat(this.getFullYear()));
};

/* global WebsyDesigns GlobalPubSub */
var WebsyDragDrop = /*#__PURE__*/function () {
  function WebsyDragDrop(elementId, options) {
    _classCallCheck(this, WebsyDragDrop);
    var DEFAULTS = {
      items: [],
      orientation: 'horizontal',
      dropPlaceholder: 'Drop item here',
      accepts: 'application/wd-item'
    };
    this.busy = false;
    this.options = _extends({}, DEFAULTS, options);
    this.elementId = elementId;
    if (!elementId) {
      console.log('No element Id provided for Websy DragDrop');
      return;
    }
    var el = document.getElementById(elementId);
    if (el) {
      el.innerHTML = "\n        <div id='".concat(this.elementId, "_container' class='websy-drag-drop-container ").concat(this.options.orientation, "'>\n          <div>\n        </div>\n      ");
      el.addEventListener('click', this.handleClick.bind(this));
      el.addEventListener('dragstart', this.handleDragStart.bind(this));
      el.addEventListener('dragover', this.handleDragOver.bind(this));
      el.addEventListener('dragleave', this.handleDragLeave.bind(this));
      el.addEventListener('drop', this.handleDrop.bind(this));
      window.addEventListener('dragend', this.handleDragEnd.bind(this));
    } else {
      console.error("No element found with ID ".concat(this.elementId));
    }
    GlobalPubSub.subscribe(this.elementId, 'requestForDDItem', this.handleRequestForItem.bind(this));
    GlobalPubSub.subscribe(this.elementId, 'add', this.addItem.bind(this));
    this.render();
  }
  _createClass(WebsyDragDrop, [{
    key: "addItem",
    value: function addItem(data) {
      if (data.target === this.elementId && this.busy === false) {
        this.busy = true;
        console.log('adding item to dd');
        // check that an item with the same id doesn't already exist
        var index = this.getItemIndex(data.item.id);
        if (index === -1) {
          this.options.items.splice(data.index, 0, data.item);
          var startEl = document.getElementById("".concat(this.elementId, "start_item"));
          if (startEl) {
            if (this.options.items.length === 0) {
              startEl.classList.add('empty');
            } else {
              startEl.classList.remove('empty');
            }
          }
          if (this.options.onItemAdded) {
            this.options.onItemAdded();
          }
        }
        this.busy = false;
      }
    }
  }, {
    key: "createItemHtml",
    value: function createItemHtml(elementId, index, item) {
      if (!item.id) {
        item.id = WebsyDesigns.Utils.createIdentity();
      }
      var html = "\n      <div id='".concat(item.id, "_item' class='websy-dragdrop-item ").concat((item.classes || []).join(' '), "' draggable='true' data-id='").concat(item.id, "'>        \n        <div id='").concat(item.id, "_itemInner' class='websy-dragdrop-item-inner' data-id='").concat(item.id, "'>\n    ");
      if (item.component) {
        html += "<div id='".concat(item.id, "_component'></div>");
      } else {
        html += "".concat(item.html || item.label || '');
      }
      html += "\n        </div>\n        <div id='".concat(item.id, "_dropZone' class='websy-drop-zone droppable' data-index='").concat(item.id, "' data-side='right' data-id='").concat(item.id, "' data-placeholder='").concat(this.options.dropPlaceholder, "'></div>    \n      </div>\n    ");
      return html;
    }
  }, {
    key: "getItemIndex",
    value: function getItemIndex(id) {
      for (var i = 0; i < this.options.items.length; i++) {
        if (this.options.items[i].id === id) {
          return i;
        }
      }
      return -1;
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {}
  }, {
    key: "handleDragStart",
    value: function handleDragStart(event) {
      this.draggedId = event.target.getAttribute('data-id');
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData(this.options.accepts, JSON.stringify({
        el: event.target.id,
        id: this.elementId,
        itemId: this.draggedId
      }));
      event.target.classList.add('dragging');
      // event.target.style.opacity = 0.5
      this.dragging = true;
    }
  }, {
    key: "handleDragOver",
    value: function handleDragOver(event) {
      if (event.preventDefault) {
        event.preventDefault();
      }
      console.log('drag', event.target.classList);
      if (!event.target.classList.contains('droppable')) {
        return;
      }
      if (event.dataTransfer.types.indexOf(this.options.accepts) === -1) {
        return;
      }
      event.target.classList.add('drag-over');
    }
  }, {
    key: "handleDragLeave",
    value: function handleDragLeave(event) {
      // console.log('drag leave', event.target.classList)
      if (!event.target.classList.contains('droppable')) {
        return;
      }
      event.target.classList.remove('drag-over');
      // let side = event.target.getAttribute('data-side')
      // let id = event.target.getAttribute('data-id')    
      // let droppedItem = this.options.items[id]
      // this.removeExpandedDrop(side, id, droppedItem)  
    }
  }, {
    key: "handleDrop",
    value: function handleDrop(event) {
      // console.log('drag drop')
      // console.log(event.dataTransfer.getData('application/wd-item'))    
      var data = JSON.parse(event.dataTransfer.getData(this.options.accepts));
      if (event.preventDefault) {
        event.preventDefault();
      }
      if (!event.target.classList.contains('droppable')) {
        return;
      }
      if (event.dataTransfer.types.indexOf(this.options.accepts) === -1) {
        return;
      }
      var side = event.target.getAttribute('data-side');
      var id = event.target.getAttribute('data-id');
      var index = this.getItemIndex(id);
      var draggedIndex = this.getItemIndex(data.id);
      var droppedItem = this.options.items[index];
      if (side === 'right') {
        index += 1;
      }
      if (draggedIndex === -1) {
        // console.log('requestForDDItem')
        GlobalPubSub.publish(data.id, 'requestForDDItem', {
          group: this.options.group,
          source: data.id,
          target: this.elementId,
          index: index,
          id: data.itemId
        });
      } else if (index > draggedIndex) {
        // insert and then remove     
        this.options.items.splice(index, 0, droppedItem);
        this.options.items.splice(draggedIndex, 1);
        if (this.options.onOrderUpdated) {
          this.options.onOrderUpdated();
        }
      } else {
        // remove and then insert
        this.options.items.splice(draggedIndex, 1);
        this.options.items.splice(index, 0, droppedItem);
        if (this.options.onOrderUpdated) {
          this.options.onOrderUpdated();
        }
      }
      // this.removeExpandedDrop(side, id, droppedItem)
      // const draggedEl = document.getElementById(`${this.elementId}_${this.draggedId}_item`)
      var draggedEl = document.getElementById(data.el);
      var droppedEl = document.getElementById("".concat(id, "_item"));
      if (draggedEl) {
        droppedEl.insertAdjacentElement('afterend', draggedEl);
      }
      var dragOverEl = droppedEl.querySelector('.drag-over');
      if (dragOverEl) {
        dragOverEl.classList.remove('drag-over');
      }
    }
  }, {
    key: "handleDragEnd",
    value: function handleDragEnd(event) {
      // console.log('drag end')
      event.target.style.opacity = 1;
      event.target.classList.remove('dragging');
      this.draggedId = null;
      this.dragging = false;
      var startEl = document.getElementById("".concat(this.elementId, "start_item"));
      if (startEl) {
        if (this.options.items.length === 0) {
          startEl.classList.add('empty');
        } else {
          startEl.classList.remove('empty');
        }
      }
    }
  }, {
    key: "handleRequestForItem",
    value: function handleRequestForItem(data) {
      if (data.group === this.options.group) {
        var index = this.getItemIndex(data.id);
        if (index !== -1) {
          var itemToAdd = this.options.items.splice(index, 1);
          GlobalPubSub.publish(data.target, 'add', {
            target: data.target,
            index: data.index,
            item: itemToAdd[0]
          });
        }
      }
    }
  }, {
    key: "measureItems",
    value: function measureItems() {
      var el = document.getElementById("".concat(this.elementId, "_container"));
      this.options.items.forEach(function (d) {});
    }
    // removeExpandedDrop (side, id, droppedItem) {
    //   let dropEl
    //   const dropImageEl = document.getElementById(`${id}_itemInner`)
    //   // const placeholderEl = document.getElementById(`${this.elementId}_${id}_dropZonePlaceholder`)
    //   if (side === 'left') {
    //     dropEl = document.getElementById(`${this.elementId}_${id}_dropZoneLeft`) 
    //     dropImageEl.style.left = `0px`
    //   }
    //   else if (side === 'right') {
    //     dropEl = document.getElementById(`${this.elementId}_${id}_dropZoneRight`)      
    //   }
    //   else {
    //     dropEl = document.getElementById(`${this.elementId}_${id}_dropZoneEnd`)  
    //   }
    //   if (dropEl) {
    //     const dropElSize = dropEl.getBoundingClientRect()      
    //     dropEl.style.width = `${(dropElSize.width / 2)}px`
    //     dropEl.style.marginLeft = null
    //     dropEl.style.border = null
    //   }
    //   if (placeholderEl) {
    //     placeholderEl.classList.remove('active')
    //     placeholderEl.style.left = null
    //     placeholderEl.style.right = null
    //     placeholderEl.style.width = null
    //     placeholderEl.style.height = null
    //   }
    // }
  }, {
    key: "removeItem",
    value: function removeItem(id) {}
  }, {
    key: "render",
    value: function render() {
      var _this8 = this;
      var el = document.getElementById("".concat(this.elementId, "_container"));
      if (el) {
        this.measureItems();
        var html = "\n        <div id='".concat(this.elementId, "start_item' class='websy-dragdrop-item ").concat(this.options.items.length === 0 ? 'empty' : '', "' data-id='").concat(this.elementId, "start'>\n          <div id='").concat(this.elementId, "start_dropZone' class='websy-drop-zone droppable' data-index='start' data-side='start' data-id='").concat(this.elementId, "start' data-placeholder='").concat(this.options.dropPlaceholder, "'></div>\n        </div>\n      ");
        html += this.options.items.map(function (d, i) {
          return _this8.createItemHtml(_this8.elementId, i, d);
        }).join('');
        el.innerHTML = html;
        this.options.items.forEach(function (item, i) {
          if (item.component) {
            if (item.isQlikPlugin && WebsyDesigns.QlikPlugins[item.component]) {
              item.instance = new WebsyDesigns.QlikPlugins[item.component]("".concat(item.id, "_component"), item.options);
            } else if (WebsyDesigns[item.component]) {
              item.instance = new WebsyDesigns[item.component]("".concat(item.id, "_component"), item.options);
            } else {
              console.error("Component ".concat(item.component, " not found."));
            }
          }
        });
      }
    }
  }]);
  return WebsyDragDrop;
}();
/* global WebsyUtils */
var WebsyDropdown = /*#__PURE__*/function () {
  function WebsyDropdown(elementId, options) {
    var _this9 = this;
    _classCallCheck(this, WebsyDropdown);
    var DEFAULTS = {
      multiSelect: false,
      multiValueDelimiter: ',',
      allowClear: true,
      style: 'plain',
      items: [],
      label: '',
      disabled: false,
      classes: [],
      minSearchCharacters: 2,
      showCompleteSelectedList: false,
      closeAfterSelection: true,
      customActions: [],
      customButtons: [],
      minWidth: 220,
      searchIcon: "<svg width=\"20\" height=\"20\" viewBox=\"0 0 512 512\"><path d=\"M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z\" style=\"fill:none;stroke-miterlimit:10;stroke-width:32px\"/><line x1=\"338.29\" y1=\"338.29\" x2=\"448\" y2=\"448\" style=\"fill:none;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px\"/></svg>",
      clearIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><title>ionicons-v5-l</title><line x1=\"368\" y1=\"368\" x2=\"144\" y2=\"144\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/><line x1=\"368\" y1=\"144\" x2=\"144\" y2=\"368\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/></svg>",
      arrowIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z\"/></svg>",
      actionsIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" viewBox=\"0 0 512 512\">><circle cx=\"256\" cy=\"256\" r=\"32\" style=\"fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px\"/><circle cx=\"416\" cy=\"256\" r=\"32\" style=\"fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px\"/><circle cx=\"96\" cy=\"256\" r=\"32\" style=\"fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px\"/></svg>"
    };
    this.options = _extends({}, DEFAULTS, options);
    if (this.options.items.length > 0) {
      this.options.items = this.options.items.map(function (d, i) {
        d.index = i;
        return d;
      });
    }
    this.searchText = '';
    this.tooltipTimeoutFn = null;
    this._originalData = _toConsumableArray(this.options.items);
    this.selectedItems = this.options.selectedItems || [];
    if (!elementId) {
      console.log('No element Id provided');
      return;
    }
    var el = document.getElementById(elementId);
    if (el) {
      this.elementId = elementId;
      el.addEventListener('click', this.handleClick.bind(this));
      el.addEventListener('keyup', this.handleKeyUp.bind(this));
      el.addEventListener('mouseout', this.handleMouseOut.bind(this));
      el.addEventListener('mousemove', this.handleMouseMove.bind(this));
      var headerLabel = this.selectedItems.map(function (s) {
        return _this9.options.items[s].label || _this9.options.items[s].value;
      }).join(this.options.multiValueDelimiter);
      var headerValue = this.selectedItems.map(function (s) {
        return _this9.options.items[s].value || _this9.options.items[s].label;
      }).join(this.options.multiValueDelimiter);
      var html = "\n        <div id='".concat(this.elementId, "_container' class='websy-dropdown-container ").concat(this.options.classes.join(' '), " ").concat(this.options.disabled ? 'disabled' : '', " ").concat(this.options.disableSearch !== true ? 'with-search' : '', " ").concat(this.options.style, " ").concat(this.options.customActions.length > 0 ? 'with-actions' : '', "'>\n          <div id='").concat(this.elementId, "_header' class='websy-dropdown-header ").concat(this.selectedItems.length === 1 ? 'one-selected' : '', " ").concat(this.options.allowClear === true ? 'allow-clear' : '', "'>\n      ");
      if (this.options.disableSearch !== true) {
        html += "<div class='search'>".concat(this.options.searchIcon, "</div>");
      }
      html += "\n            <div class='header-label'>\n              <span class='websy-dropdown-header-value' data-info='".concat(headerLabel, "' id='").concat(this.elementId, "_selectedItems'>").concat(headerLabel, "</span> \n              <span class='websy-dropdown-header-label' id='").concat(this.elementId, "_headerLabel'>").concat(this.options.label, "</span>\n            </div>\n            <input class='dropdown-input' id='").concat(this.elementId, "_input' name='").concat(this.options.field || this.options.label, "' value='").concat(headerValue, "'>\n            <div class='arrow'>").concat(this.options.arrowIcon, "</div>\n      ");
      if (this.options.allowClear === true) {
        html += "<div class='clear'>".concat(this.options.clearIcon, "</div>");
      }
      html += "          \n          </div>\n          <div id='".concat(this.elementId, "_mask' class='websy-dropdown-mask'></div>\n          <div id='").concat(this.elementId, "_content' class='websy-dropdown-content'>\n      ");
      if (this.options.customActions.length > 0 || this.options.customButtons.length > 0) {
        html += "\n          <div class='websy-dropdown-action-container'>\n        ";
        if (this.options.customActions.length > 0) {
          html += "\n            ".concat(this.options.actionsTitle || '', "\n            <button class='websy-dropdown-action-button'>\n              ").concat(this.options.actionsIcon, "\n            </button>\n          ");
        }
        if (this.options.customButtons.length > 0) {
          html += "\n            <div class='websy-dropdown-additional-buttons'>\n          ";
          this.options.customButtons.forEach(function (b, i) {
            html += "\n              <button class='websy-dropdown-custom-button' data-index='".concat(i, "'>\n                ").concat(b.label, "\n              </button>\n            ");
          });
          html += "\n            </div>\n          ";
        }
        if (this.options.customActions.length > 0) {
          html += "            \n              <ul id='".concat(this.elementId, "_actionContainer'>\n          ");
          this.options.customActions.forEach(function (a, i) {
            html += "\n              <li class='websy-dropdown-custom-action' data-index='".concat(i, "'>").concat(a.label, "</li>\n            ");
          });
          html += "\n              </ul>\n            </div>\n          ";
        }
      }
      if (this.options.disableSearch !== true) {
        html += "\n          <div class='websy-dropdown-search-container'>\n            <input id='".concat(this.elementId, "_search' class='websy-dropdown-search' placeholder='").concat(this.options.searchPlaceholder || 'Search', "'>\n          </div>\n        ");
      }
      html += "\n            <div id='".concat(this.elementId, "_itemsContainer' class='websy-dropdown-items'>\n              <ul id='").concat(this.elementId, "_items'>              \n              </ul>\n            </div><!--\n            --><div class='websy-dropdown-custom'></div>\n          </div>\n        </div>\n      ");
      el.innerHTML = html;
      var maskEl = document.getElementById("".concat(this.elementId, "_mask"));
      if (maskEl) {
        maskEl.addEventListener('mousewheel', function (event) {
          if (event.target.classList.contains('websy-dropdown-mask')) {
            event.preventDefault();
            event.stopPropagation();
          }
        });
      }
      var scrollEl = document.getElementById("".concat(this.elementId, "_itemsContainer"));
      if (scrollEl) {
        scrollEl.addEventListener('scroll', this.handleScroll.bind(this));
      }
      this.render();
    } else {
      console.log('No element found with Id', elementId);
    }
  }
  _createClass(WebsyDropdown, [{
    key: "selections",
    set: function set(d) {
      this.selectedItems = d || [];
    }
  }, {
    key: "data",
    get: function get() {
      return this.options.items;
    },
    set: function set(d) {
      this.options.items = (d || []).map(function (d, i) {
        if (typeof d.index === 'undefined') {
          d.index = i;
        }
        d.currentIndex = i;
        return d;
      });
      var headerEl = document.getElementById("".concat(this.elementId, "_header"));
      if (headerEl) {
        headerEl.classList["".concat(this.options.allowClear === true ? 'add' : 'remove')]('allow-clear');
      }
      var el = document.getElementById("".concat(this.elementId, "_items"));
      if (el) {
        if (el.childElementCount === 0) {
          this.render();
        } else {
          if (this.options.items.length === 0) {
            this.options.items = [{
              label: this.options.noItemsText || 'No Items'
            }];
          }
          this.renderItems();
        }
      }
    }
  }, {
    key: "appendRows",
    value: function appendRows() {}
  }, {
    key: "clearSelected",
    value: function clearSelected() {
      this.selectedItems = [];
      this.updateHeader();
      if (this.options.onClearSelected) {
        this.options.onClearSelected();
      }
    }
  }, {
    key: "close",
    value: function close() {
      this.hide();
      var searchEl = document.getElementById("".concat(this.elementId, "_search"));
      if (searchEl) {
        if (searchEl.value.length > 0 && this.options.onCancelSearch) {
          this.options.onCancelSearch('');
          searchEl.value = '';
        }
      }
      if (this.options.onClose) {
        this.options.onClose(this.elementId);
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      var maskEl = document.getElementById("".concat(this.elementId, "_mask"));
      var contentEl = document.getElementById("".concat(this.elementId, "_content"));
      var scrollEl = document.getElementById("".concat(this.elementId, "_itemsContainer"));
      var actionEl = document.getElementById("".concat(this.elementId, "_actionContainer"));
      var headerEl = document.getElementById("".concat(this.elementId, "_header"));
      var headerPos = WebsyUtils.getElementPos(headerEl);
      var contentPos = WebsyUtils.getElementPos(contentEl);
      if (this.options.style === 'plain' && headerPos.width > 0 && headerPos.height > 0) {
        contentEl.style.right = 'unset';
        if (headerPos.bottom + contentPos.height > window.innerHeight) {
          // contentEl.classList.add('on-top')
          contentEl.style.bottom = 'unset';
        } else {
          contentEl.style.top = 'unset';
        }
      }
      if (actionEl) {
        actionEl.classList.remove('active');
      }
      var el = document.getElementById(this.elementId);
      if (el) {
        el.style.zIndex = '';
      }
      if (scrollEl) {
        scrollEl.scrollTo(0, 0);
      }
      if (maskEl) {
        maskEl.classList.remove('active');
      }
      if (contentEl) {
        contentEl.classList.remove('active');
        contentEl.classList.remove('on-top');
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (this.options.disabled === true) {
        return;
      }
      if (event.target.classList.contains('websy-dropdown-header')) {
        this.open(event);
      } else if (event.target.classList.contains('websy-dropdown-mask')) {
        this.close();
      } else if (event.target.classList.contains('websy-dropdown-item')) {
        var index = event.target.getAttribute('data-index');
        this.updateSelected(+index);
      } else if (event.target.classList.contains('clear')) {
        this.clearSelected();
      } else if (event.target.classList.contains('search')) {
        var el = document.getElementById("".concat(this.elementId, "_container"));
        el.classList.toggle('search-open');
      } else if (event.target.classList.contains('websy-dropdown-custom-action')) {
        var actionIndex = +event.target.getAttribute('data-index');
        if (this.options.customActions[actionIndex] && this.options.customActions[actionIndex].fn) {
          this.options.customActions[actionIndex].fn();
        }
      } else if (event.target.classList.contains('websy-dropdown-custom-button')) {
        var _actionIndex = +event.target.getAttribute('data-index');
        if (this.options.customButtons[_actionIndex] && this.options.customButtons[_actionIndex].fn) {
          this.options.customButtons[_actionIndex].fn();
        }
      } else if (event.target.classList.contains('websy-dropdown-action-button')) {
        var _el = document.getElementById("".concat(this.elementId, "_actionContainer"));
        if (_el) {
          _el.classList.toggle('active');
        }
      }
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event) {
      if (event.target.classList.contains('websy-dropdown-search')) {
        this.searchText = event.target.value;
        if (this._originalData.length === 0) {
          this._originalData = _toConsumableArray(this.options.items);
        }
        if (event.target.value.length >= this.options.minSearchCharacters) {
          if (event.key === 'Enter') {
            if (this.options.onConfirmSearch) {
              this.options.onConfirmSearch(event.target.value);
              event.target.value = '';
            }
          } else if (event.key === 'Escape') {
            if (this.options.onCancelSearch) {
              this.options.onCancelSearch(event.target.value);
              event.target.value = '';
            } else {
              this.data = this._originalData;
              this._originalData = [];
            }
          } else {
            if (this.options.onSearch) {
              this.options.onSearch(event.target.value);
            } else {
              this.data = this._originalData.filter(function (d) {
                return d.label.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
              });
            }
          }
        } else {
          if (this.options.onCancelSearch) {
            this.options.onCancelSearch(event.target.value);
          } else {
            this.data = this._originalData;
            this._originalData = [];
          }
        }
      }
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      if (this.tooltipTimeoutFn) {
        event.target.classList.remove('websy-delayed');
        event.target.classList.remove('websy-delayed-info');
        if (event.target.children[1]) {
          event.target.children[1].classList.remove('websy-delayed-info');
        }
        clearTimeout(this.tooltipTimeoutFn);
      }
      if (event.target.tagName === 'LI') {
        this.tooltipTimeoutFn = setTimeout(function () {
          event.target.classList.add('websy-delayed');
        }, 500);
      }
      if (event.target.classList.contains('websy-dropdown-header') && event.target.children[1]) {
        this.tooltipTimeoutFn = setTimeout(function () {
          event.target.children[1].classList.add('websy-delayed-info');
        }, 500);
      }
    }
  }, {
    key: "handleMouseOut",
    value: function handleMouseOut(event) {
      if (this.tooltipTimeoutFn) {
        event.target.classList.remove('websy-delayed');
        event.target.classList.remove('websy-delayed-info');
        if (event.target.children[1]) {
          event.target.children[1].classList.remove('websy-delayed-info');
        }
        clearTimeout(this.tooltipTimeoutFn);
      }
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(event) {
      if (event.target.classList.contains('websy-dropdown-items')) {
        if (this.options.onScroll) {
          this.options.onScroll(event);
        }
      }
    }
  }, {
    key: "open",
    value: function open(event) {
      var override = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var maskEl = document.getElementById("".concat(this.elementId, "_mask"));
      var contentEl = document.getElementById("".concat(this.elementId, "_content"));
      var headerEl = document.getElementById("".concat(this.elementId, "_header"));
      maskEl.classList.add('active');
      contentEl.classList.add('active');
      var headerPos = WebsyUtils.getElementPos(headerEl);
      var contentPos = WebsyUtils.getElementPos(contentEl);
      if (this.options.style === 'plain' && headerPos.width > 0 && headerPos.height > 0) {
        contentEl.style.left = 'unset';
        contentEl.style.right = "calc(100vw - ".concat(headerPos.right, "px)");
        contentEl.style.width = "".concat(Math.max(this.options.minWidth, headerEl.clientWidth), "px");
        if (headerPos.bottom + contentPos.height > window.innerHeight) {
          // contentEl.classList.add('on-top')
          contentEl.style.bottom = "calc(100vh - ".concat(headerPos.top, "px)");
        } else {
          contentEl.style.top = headerPos.bottom + 'px';
        }
      } else if (this.options.style === 'plain' && headerPos.width === 0 && headerPos.height === 0) {
        var targetPos = WebsyUtils.getElementPos(event.target);
        if (Math.max(this.options.minWidth, targetPos.width) > targetPos.right) {
          contentEl.style.left = "".concat(targetPos.left, "px");
          contentEl.style.right = 'unset';
          contentEl.style.width = "".concat(Math.max(this.options.minWidth, targetPos.width), "px");
        } else {
          contentEl.style.left = 'unset';
          contentEl.style.right = "calc(100vw - ".concat(targetPos.right, "px)");
          contentEl.style.width = "".concat(Math.max(this.options.minWidth, targetPos.width), "px");
        }
      }
      if (this.options.disableSearch !== true) {
        var searchEl = document.getElementById("".concat(this.elementId, "_search"));
        if (searchEl) {
          searchEl.focus();
        }
      }
      if (this.options.onOpen) {
        this.options.onOpen(this.elementId);
      }
    }
  }, {
    key: "items",
    set: function set(items) {
      this.options.items = _toConsumableArray(items);
      if (this.options.items.length > 0) {
        this.options.items = this.options.items.map(function (d, i) {
          if (typeof d.index === 'undefined') {
            d.index = i;
          }
          return d;
        });
      }
      this._originalData = _toConsumableArray(this.options.items);
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.elementId) {
        console.log('No element Id provided for Websy Dropdown');
        return;
      }
      // const el = document.getElementById(this.elementId)
      // const headerLabel = this.selectedItems.map(s => this.options.items[s].label || this.options.items[s].value).join(this.options.multiValueDelimiter)
      // const headerValue = this.selectedItems.map(s => this.options.items[s].value || this.options.items[s].label).join(this.options.multiValueDelimiter)
      // let html = `
      //   <div class='websy-dropdown-container ${this.options.disabled ? 'disabled' : ''} ${this.options.disableSearch !== true ? 'with-search' : ''}'>
      //     <div id='${this.elementId}_header' class='websy-dropdown-header ${this.selectedItems.length === 1 ? 'one-selected' : ''} ${this.options.allowClear === true ? 'allow-clear' : ''}'>
      //       <span id='${this.elementId}_headerLabel' class='websy-dropdown-header-label'>${this.options.label}</span>
      //       <span data-info='${headerLabel}' class='websy-dropdown-header-value' id='${this.elementId}_selectedItems'>${headerLabel}</span>
      //       <input class='dropdown-input' id='${this.elementId}_input' name='${this.options.field || this.options.label}' value='${headerValue}'>
      //       <svg class='arrow' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z"/></svg>
      // `
      // if (this.options.allowClear === true) {
      //   html += `
      //     <svg class='clear' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><title>ionicons-v5-l</title><line x1="368" y1="368" x2="144" y2="144" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><line x1="368" y1="144" x2="144" y2="368" style="fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>
      //   `
      // }
      // html += `          
      //     </div>
      //     <div id='${this.elementId}_mask' class='websy-dropdown-mask'></div>
      //     <div id='${this.elementId}_content' class='websy-dropdown-content'>
      // `
      // if (this.options.disableSearch !== true) {
      //   html += `
      //     <input id='${this.elementId}_search' class='websy-dropdown-search' placeholder='${this.options.searchPlaceholder || 'Search'}'>
      //   `
      // }
      // html += `
      //       <div class='websy-dropdown-items'>
      //         <ul id='${this.elementId}_items'>              
      //         </ul>
      //       </div><!--
      //       --><div class='websy-dropdown-custom'></div>
      //     </div>
      //   </div>
      // `
      // el.innerHTML = html    
      this.renderItems();
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this10 = this;
      var html = this.options.items.map(function (r, i) {
        return "\n      <li data-index='".concat(r.index, "' class='websy-dropdown-item ").concat((r.classes || []).join(' '), " ").concat(_this10.selectedItems.indexOf(r.index) !== -1 ? 'active' : '', "'>").concat(r.label, "</li>\n    ");
      }).join('');
      var el = document.getElementById("".concat(this.elementId, "_items"));
      if (el) {
        el.innerHTML = html;
      }
      var item;
      if (this.selectedItems.length === 1) {
        item = this.options.items[this.selectedItems[0]];
      }
      this.updateHeader(item);
    }
  }, {
    key: "value",
    get: function get() {
      var _this11 = this;
      if (this.selectedItems && this.selectedItems.length > 0) {
        // return this.selectedItems.map((d, i) => this.options.items[+d])
        return this.selectedItems.map(function (d, i) {
          return _this11._originalData[+d];
        });
      }
      return [];
    },
    set: function set(value) {
      var _this12 = this;
      this.selectedItems = [];
      if (Array.isArray(value)) {
        this.options.items.forEach(function (d) {
          if (value.indexOf(d.value) !== -1) {
            _this12.selectedItems.push(d.index);
          }
        });
      } else {
        this.options.items.forEach(function (d) {
          if (d.value === value) {
            _this12.selectedItems.push(d.index);
          }
        });
      }
      this.render();
    }
  }, {
    key: "updateHeader",
    value: function updateHeader(item) {
      var el = document.getElementById(this.elementId);
      var headerEl = document.getElementById("".concat(this.elementId, "_header"));
      var headerLabelEl = document.getElementById("".concat(this.elementId, "_headerLabel"));
      var labelEl = document.getElementById("".concat(this.elementId, "_selectedItems"));
      var inputEl = document.getElementById("".concat(this.elementId, "_input"));
      var itemEls = el.querySelectorAll(".websy-dropdown-item");
      var dataToUse = this._originalData;
      if (this._originalData.length === 0 && this.searchText === '') {
        dataToUse = this.options.items;
      }
      if (this.options.onSearch) {
        dataToUse = this.options.items;
      }
      for (var i = 0; i < itemEls.length; i++) {
        itemEls[i].classList.remove('active');
        var index = itemEls[i].getAttribute('data-index');
        if (this.selectedItems.indexOf(+index) !== -1) {
          itemEls[i].classList.add('active');
        }
      }
      if (headerLabelEl) {
        headerLabelEl.innerHTML = this.options.label;
      }
      if (headerEl) {
        headerEl.classList.remove('one-selected');
        headerEl.classList.remove('multi-selected');
        if (this.selectedItems.length === 1) {
          headerEl.classList.add('one-selected');
        } else if (this.selectedItems.length > 1) {
          if (this.options.showCompleteSelectedList === true) {
            headerEl.classList.add('one-selected');
          } else {
            headerEl.classList.add('multi-selected');
          }
        }
      }
      if (labelEl) {
        if (this.selectedItems.length === 1) {
          if (item) {
            labelEl.innerHTML = item.label;
            labelEl.setAttribute('data-info', item.label);
            inputEl.value = item.value;
          } else if (this.selectedItems[0]) {
            labelEl.innerHTML = dataToUse[this.selectedItems[0]].label;
            labelEl.setAttribute('data-info', dataToUse[this.selectedItems[0]].label);
            inputEl.value = dataToUse[this.selectedItems[0]].value;
          }
        } else if (this.selectedItems.length > 1) {
          if (this.options.showCompleteSelectedList === true) {
            var selectedLabels = this.selectedItems.map(function (s) {
              return dataToUse[s].label || dataToUse[s].value;
            }).join(this.options.multiValueDelimiter);
            var selectedValues = this.selectedItems.map(function (s) {
              return dataToUse[s].value || dataToUse[s].label;
            }).join(this.options.multiValueDelimiter);
            labelEl.innerHTML = selectedLabels;
            labelEl.setAttribute('data-info', selectedLabels);
            inputEl.value = selectedValues;
          } else {
            var _selectedValues = this.selectedItems.map(function (s) {
              return dataToUse[s].value || dataToUse[s].label;
            }).join(this.options.multiValueDelimiter);
            labelEl.innerHTML = "".concat(this.selectedItems.length, " selected");
            labelEl.setAttribute('data-info', '');
            inputEl.value = _selectedValues;
          }
        } else {
          labelEl.innerHTML = '';
          labelEl.setAttribute('data-info', '');
          inputEl.value = '';
        }
      }
    }
  }, {
    key: "updateSelected",
    value: function updateSelected(index) {
      var dataToUse = this._originalData && this._originalData.length > 0 ? this._originalData : this.options.items;
      if (this.options.onSearch) {
        dataToUse = this.options.items;
      }
      var item;
      if (typeof index !== 'undefined' && index !== null) {
        var pos = this.selectedItems.indexOf(index);
        if (this.options.multiSelect === false) {
          this.selectedItems = [index];
          item = dataToUse[index];
        } else {
          if (pos !== -1) {
            this.selectedItems.splice(pos, 1);
          } else {
            this.selectedItems.push(index);
            item = dataToUse[index];
          }
        }
      }
      this.updateHeader(item);
      if (item && this.options.onItemSelected) {
        this.options.onItemSelected(item, this.selectedItems, dataToUse, this.options);
      }
      if (this.options.onChange) {
        this.options.onChange(this);
      }
      if (this.options.closeAfterSelection === true) {
        this.close();
      }
    }
  }]);
  return WebsyDropdown;
}();
/* global WebsyDesigns FormData grecaptcha ENVIRONMENT GlobalPubSub */
var WebsyForm = /*#__PURE__*/function () {
  function WebsyForm(elementId, options) {
    _classCallCheck(this, WebsyForm);
    var defaults = {
      submit: {
        text: 'Save',
        classes: []
      },
      useRecaptcha: false,
      recaptchaAction: 'submit',
      clearAfterSave: false,
      fields: [],
      mode: 'add',
      useLoader: false,
      onSuccess: function onSuccess(data) {},
      onError: function onError(err) {
        console.log('Error submitting form data:', err);
      }
    };
    GlobalPubSub.subscribe('recaptchaready', this.recaptchaReady.bind(this));
    this.recaptchaResult = null;
    this.options = _extends({}, defaults, options);
    if (!elementId) {
      console.log('No element Id provided');
      return;
    }
    this.apiService = new WebsyDesigns.APIService('');
    this.fieldMap = {};
    this.elementId = elementId;
    var el = document.getElementById(elementId);
    if (el) {
      // if (this.options.classes) {
      //   this.options.classes.forEach(c => el.classList.add(c))
      // }
      el.addEventListener('change', this.handleChange.bind(this));
      el.addEventListener('click', this.handleClick.bind(this));
      el.addEventListener('beforeinput', this.handleBeforeInput.bind(this));
      el.addEventListener('input', this.handleInput.bind(this));
      el.addEventListener('focusout', this.handleFocusOut.bind(this));
      el.addEventListener('keyup', this.handleKeyUp.bind(this));
      el.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.render();
    }
  }
  _createClass(WebsyForm, [{
    key: "cancelForm",
    value: function cancelForm() {
      var formEl = document.getElementById("".concat(this.elementId, "Form"));
      formEl.reset();
      if (this.options.cancelFn) {
        this.options.cancelFn(this.elementId);
      }
      this.loader.hide();
    }
  }, {
    key: "checkRecaptcha",
    value: function checkRecaptcha() {
      var _this13 = this;
      return new Promise(function (resolve, reject) {
        if (_this13.options.useRecaptcha === true) {
          if (_this13.recaptchaValue) {
            // grecaptcha.ready(() => {
            // grecaptcha.execute(this.recaptchaValue, { action: 'submit' }).then(token => {
            _this13.apiService.add('google/checkrecaptcha', {
              grecaptcharesponse: _this13.recaptchaValue
            }).then(function (response) {
              if (response.success && response.success === true) {
                resolve(true);
                grecaptcha.reset("".concat(_this13.elementId, "_recaptcha"), {
                  sitekey: ENVIRONMENT.RECAPTCHA_KEY
                });
              } else {
                resolve(false);
              }
            });
            // }, err => {
            //   reject(err)
            // })
            // })
          } else {
            resolve(false);
          }
        } else if (_this13.options.useRecaptchaV3 === true) {
          grecaptcha.ready(function () {
            grecaptcha.execute(ENVIRONMENT.RECAPTCHA_KEY, {
              action: _this13.options.recaptchaAction
            }).then(function (token) {
              _this13.apiService.add('google/checkrecaptcha', {
                grecaptcharesponse: token
              }).then(function (response) {
                if (response.success && response.success === true) {
                  resolve(true);
                  grecaptcha.reset("".concat(_this13.elementId, "_recaptcha"), {
                    sitekey: ENVIRONMENT.RECAPTCHA_KEY
                  });
                } else {
                  resolve(false);
                }
              });
            }, function (err) {
              console.log(err);
            });
          });
        } else {
          resolve(true);
        }
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this14 = this;
      var formEl = document.getElementById("".concat(this.elementId, "Form"));
      formEl.reset();
      if (!this.options.fields) {
        this.options.fields = [];
      }
      this.options.fields.forEach(function (f) {
        _this14.setValue(f.field, '');
      });
      this.loader.hide();
    }
  }, {
    key: "data",
    get: function get() {
      var _this15 = this;
      var formEl = document.getElementById("".concat(this.elementId, "Form"));
      var data = {};
      var temp = new FormData(formEl);
      temp.forEach(function (value, key) {
        if (_this15.fieldMap[key] && _this15.fieldMap[key].type === 'checkbox') {
          data[key] = true;
        }
        if (_this15.fieldMap[key] && _this15.fieldMap[key].instance && _this15.fieldMap[key].instance.value) {
          data[key] = _this15.fieldMap[key].instance.value;
        } else {
          data[key] = value;
        }
      });
      var keys = Object.keys(data);
      for (var key in this.fieldMap) {
        if (keys.indexOf(key) === -1) {
          if (this.fieldMap[key] && this.fieldMap[key].type === 'checkbox') {
            data[key] = false;
          } else if (this.fieldMap[key] && (this.fieldMap[key].component === 'Switch' || this.fieldMap[key].component === 'WebsySwitch')) {
            data[key] = this.fieldMap[key].instance.options.enabled;
          } else if (this.fieldMap[key] && this.fieldMap[key].instance && this.fieldMap[key].instance.value) {
            data[key] = this.fieldMap[key].instance.value;
          }
        }
      }
      return data;
    },
    set: function set(d) {
      var _this16 = this;
      if (!this.options.fields) {
        this.options.fields = [];
      }
      var _loop = function _loop(key) {
        _this16.options.fields.forEach(function (f) {
          if (f.field === key) {
            _this16.setValue(key, d[key]);
            //   f.value = d[key]
            //   const el = document.getElementById(`${this.elementId}_input_${f.field}`)
            //   if (el) {
            //     el.value = f.value 
            //   }          
          }
        });
      };
      for (var key in d) {
        _loop(key);
      }
      // this.render()
    }
  }, {
    key: "confirmValidation",
    value: function confirmValidation() {
      var el = document.getElementById("".concat(this.elementId, "_validationFail"));
      if (el) {
        el.innerHTML = '';
      }
    }
  }, {
    key: "failValidation",
    value: function failValidation(msg) {
      var el = document.getElementById("".concat(this.elementId, "_validationFail"));
      if (el) {
        el.innerHTML = msg;
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      if (event.target.getAttribute('data-user-type') === 'expiry') {
        if (event.target.value.length === 7) {
          var value = event.target.value.split('/');
          event.target.value = "".concat(value[0], "/").concat(value[1].substring(2, 4));
        }
      }
      if (event.target.classList.contains('websy-input')) {
        var index = event.target.getAttribute('data-index');
        if (this.options.fields[index] && (this.options.fields[index].required || this.options.fields[index].validate)) {
          this.validateField(this.options.fields[index], event.target.value);
        }
        if (this.options.fields[index].onChange) {
          this.options.fields[index].onChange({
            value: event.target.value,
            field: this.options.fields[index],
            form: this,
            index: index
          });
        }
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('submit')) {
        event.preventDefault();
        event.stopPropagation();
        this.submitForm();
      } else if (event.target.classList.contains('cancel')) {
        event.preventDefault();
        this.cancelForm();
      }
    }
  }, {
    key: "handleFocusOut",
    value: function handleFocusOut(event) {
      if (event.target.classList.contains('websy-input')) {
        var index = event.target.getAttribute('data-index');
        if (this.options.fields[index] && (this.options.fields[index].required || this.options.fields[index].validate)) {
          this.validateField(this.options.fields[index], event.target.value);
        }
        if (this.options.fields[index].onLeave) {
          this.options.fields[index].onLeave({
            value: event.target.value,
            field: this.options.fields[index],
            form: this,
            index: index
          });
        }
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (event.key === 'enter' && this.options.submitOnEnter === true) {
        this.submitForm();
      }
      // if (event.target.getAttribute('data-user-type') === 'expiry') {
      //   let isNumeric = !isNaN(event.key)
      //   let validKey = false
      //   if (!validKey) {
      //     validKey = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'].indexOf(event.key) !== -1
      //   }
      //   if ((event.target.value.length === 5 && !validKey) || (!validKey && !isNumeric)) {
      //     event.preventDefault()
      //     return false
      //   }
      //   if (event.key === 'Backspace') {
      //     if (event.target.value.indexOf('/') === event.target.selectionStart - 1) {
      //       let chars = event.target.value.split('')
      //       chars.pop()
      //       event.target.value = chars.join('')
      //     }
      //   }
      // }
      // if (event.target.getAttribute('data-user-type') === 'cvv') {
      //   let isNumeric = !isNaN(event.key)
      //   let validKey = false
      //   if (!validKey) {
      //     validKey = ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete', 'Tab'].indexOf(event.key) !== -1
      //   }
      //   if ((event.target.value.length === 3 && !validKey) || (!validKey && !isNumeric)) {
      //     event.preventDefault()
      //     return false
      //   }
      // }
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event) {
      // if (event.target.getAttribute('data-user-type') === 'expiry') {
      //   let chars = event.target.value.split('')
      //   let isNumeric = !isNaN(event.key)
      //   if (event.key === 'Backspace') {
      //     if (chars[chars.length - 1] === '/' && chars.length !== 3) {
      //       chars.pop()
      //       event.target.value = chars.join('')
      //       return 
      //     }    
      //   }
      //   if (event.target.selectionStart === 2) {      
      //     if (chars[2] && ['ArrowLeft', 'ArrowRight', 'Backspace', 'Delete'].indexOf(event.key) === -1) {
      //       event.target.setSelectionRange(3, 3)
      //     }
      //     else if (isNumeric) {
      //       event.target.value += '/'
      //     }
      //   }
      // }
    }
  }, {
    key: "handleBeforeInput",
    value: function handleBeforeInput(event) {
      if (event.target.getAttribute('data-user-type') === 'expiry') {
        var isNumeric = !isNaN(+event.data);
        var validKey = false;
        if (!validKey) {
          validKey = ['deleteContentBackward', 'deleteContentForward'].indexOf(event.inputType) !== -1;
        }
        if (event.target.value.length === 5 && !validKey || !validKey && !isNumeric) {
          event.preventDefault();
          return false;
        }
        if (event.inputType === 'deleteContentBackward') {
          if (event.target.value.indexOf('/') === event.target.selectionStart - 1) {
            var chars = event.target.value.split('');
            chars.pop();
            event.target.value = chars.join('');
          }
        }
      }
      if (event.target.getAttribute('data-user-type') === 'cvv') {
        var _isNumeric = !isNaN(+event.data);
        var _validKey = false;
        if (!_validKey) {
          _validKey = ['deleteContentBackward', 'deleteContentForward'].indexOf(event.inputType) !== -1;
        }
        if (event.target.value.length === 3 && !_validKey || !_validKey && !_isNumeric) {
          event.preventDefault();
          return false;
        }
      }
    }
  }, {
    key: "handleInput",
    value: function handleInput(event) {
      if (event.target.getAttribute('data-user-type') === 'expiry') {
        var chars = event.target.value.split('');
        var isNumeric = !isNaN(+event.data);
        if (event.key === 'Backspace') {
          if (chars[chars.length - 1] === '/' && chars.length !== 3) {
            chars.pop();
            event.target.value = chars.join('');
            return;
          }
        }
        if (event.target.selectionStart === 2) {
          if (chars[2] && ['deleteContentBackward', 'deleteContentForward'].indexOf(event.inputType) === -1) {
            event.target.setSelectionRange(3, 3);
          } else if (isNumeric) {
            event.target.value += '/';
          }
        }
      }
    }
  }, {
    key: "processComponents",
    value: function processComponents(components, callbackFn) {
      var _this17 = this;
      if (components.length === 0) {
        callbackFn();
      } else {
        components.forEach(function (c) {
          if (typeof WebsyDesigns[c.component] !== 'undefined') {
            if (!c.options.onChange) {
              c.options.onChange = function () {
                if (c.required || c.validate) {
                  _this17.validateField(c, c.instance.value);
                }
              };
            }
            c.instance = new WebsyDesigns[c.component]("".concat(_this17.elementId, "_input_").concat(c.field, "_component"), c.options);
          } else {
            // some user feedback here
          }
        });
      }
    }
  }, {
    key: "recaptchaReady",
    value: function recaptchaReady() {
      var _this18 = this;
      var el = document.getElementById("".concat(this.elementId, "_recaptcha"));
      if (el) {
        grecaptcha.ready(function () {
          grecaptcha.render("".concat(_this18.elementId, "_recaptcha"), {
            sitekey: ENVIRONMENT.RECAPTCHA_KEY,
            callback: _this18.validateRecaptcha.bind(_this18)
          });
        });
      }
    }
  }, {
    key: "render",
    value: function render(update, data) {
      var _this19 = this;
      var el = document.getElementById(this.elementId);
      var componentsToProcess = [];
      if (el) {
        var html = "\n        <form id=\"".concat(this.elementId, "Form\" class=\"websy-form ").concat((this.options.classes || []).join(' '), "\">\n      ");
        this.options.fields.forEach(function (f, i) {
          _this19.fieldMap[f.field] = f;
          f.owningElement = _this19.elementId;
          var inputValue = typeof f.value === 'function' ? f.value() : f.value;
          if (f.disabled || f.readOnly || _this19.options.readOnly) {
            if (!f.options) {
              f.options = {};
            }
            f.disabled = true;
            f.options.disabled = true;
            if (!f.classes) {
              f.classes = [];
            }
            if (!f.options.classes) {
              f.options.classes = [];
            }
            f.classes.push('disabled');
            f.options.classes.push('disabled');
            if (f.readOnly || _this19.options.readOnly) {
              f.classes.push('websy-input-readonly');
              f.options.classes.push('websy-input-readonly');
            }
          }
          if (f.component) {
            componentsToProcess.push(f);
            html += "\n            ".concat(i > 0 ? '-->' : '', "<div id='").concat(_this19.elementId, "_").concat(f.field, "_inputContainer' style='").concat(f.style || '', "' class='websy-input-container ").concat(f.classes ? f.classes.join(' ') : '', " ").concat(f.component === 'MediaUpload' ? 'media-upload' : '', "'>\n              ").concat(f.label ? "<label for=\"".concat(f.field, "\">").concat(f.label, "</label>") : '').concat(f.required === true ? '<span class="websy-form-required-value">*</span>' : '', "\n              <div id='").concat(_this19.elementId, "_input_").concat(f.field, "_component' class='form-component'></div>\n              <span id='").concat(_this19.elementId, "_").concat(f.field, "_error' class='websy-form-validation-error'></span>\n            </div><!--\n          ");
          } else if (f.type === 'longtext') {
            html += "\n            ".concat(i > 0 ? '-->' : '', "<div id='").concat(_this19.elementId, "_").concat(f.field, "_inputContainer' style='").concat(f.style || '', "' class='websy-input-container ").concat(f.classes ? f.classes.join(' ') : '', "'>\n              ").concat(f.label ? "<label for=\"".concat(f.field, "\">").concat(f.label, "</label>") : '').concat(f.required === true ? '<span class="websy-form-required-value">*</span>' : '', "\n              <textarea\n                id=\"").concat(_this19.elementId, "_input_").concat(f.field, "\"\n                ").concat(f.required === true ? 'required' : '', " \n                placeholder=\"").concat(f.placeholder || '', "\"\n                data-user-type=\"").concat(f.type, "\"\n                data-index=\"").concat(i, "\"\n                name=\"").concat(f.field, "\" \n                ").concat(f.disabled || f.readOnly || _this19.options.readOnly ? 'disabled' : '', "\n                ").concat((f.attributes || []).join(' '), "\n                class=\"websy-input websy-textarea ").concat(f.readOnly || _this19.options.readOnly ? 'websy-input-readonly' : '', "\"\n              >").concat(inputValue || '', "</textarea>\n              <span id='").concat(_this19.elementId, "_").concat(f.field, "_error' class='websy-form-validation-error'></span>\n            </div><!--\n          ");
          } else {
            html += "\n            ".concat(i > 0 ? '-->' : '', "<div id='").concat(_this19.elementId, "_").concat(f.field, "_inputContainer' style='").concat(f.style || '', "' class='websy-input-container ").concat(f.classes ? f.classes.join(' ') : '', "'>\n              ").concat(f.label ? "<label for=\"".concat(f.field, "\">").concat(f.label, "</label>") : '').concat(f.required === true ? '<span class="websy-form-required-value">*</span>' : '', "\n              <input \n                id=\"").concat(_this19.elementId, "_input_").concat(f.field, "\"\n                ").concat(f.required === true ? 'required' : '', " \n                type=\"").concat((f.type === 'expiry' ? 'text' : f.type === 'cvv' ? 'number' : f.type) || 'text', "\" \n                data-user-type=\"").concat(f.type, "\"\n                data-index=\"").concat(i, "\"\n                class=\"websy-input ").concat(f.readOnly || _this19.options.readOnly ? 'websy-input-readonly' : '', "\" \n                ").concat((f.attributes || []).join(' '), "\n                name=\"").concat(f.field, "\" \n                placeholder=\"").concat(f.placeholder || '', "\"\n                value=\"").concat(f.type === 'date' ? '' : inputValue || '', "\"\n                valueAsDate=\"").concat(f.type === 'date' ? inputValue : '', "\"\n                ").concat(f.disabled || f.readOnly || _this19.options.readOnly ? 'disabled' : '', "\n                oninvalidx=\"this.setCustomValidity('").concat(f.invalidMessage || 'Please fill in this field.', "')\"\n              />\n              <span id='").concat(_this19.elementId, "_").concat(f.field, "_error' class='websy-form-validation-error'></span>\n            </div><!--\n          ");
          }
        });
        if (this.options.useRecaptcha === true) {
          html += "\n          --><div id='".concat(this.elementId, "_recaptcha' data-sitekey='").concat(ENVIRONMENT.RECAPTCHA_KEY, "' class='websy-form-recaptcha'></div>\n          <div id='").concat(this.elementId, "_recaptchaError' class='websy-alert websy-alert-error websy-hidden'>Invalid recaptcha response</div><!--\n        ");
        }
        if (!this.options.readOnly) {
          html += "\n          --><button class=\"websy-btn submit ".concat(this.options.submit.classes ? this.options.submit.classes.join(' ') : '', "\">").concat(this.options.submit.text || 'Save', "</button>").concat(this.options.cancel ? '<!--' : '', "\n        ");
        } else {
          html += "-->";
        }
        if (this.options.cancel) {
          html += "\n          --><button class=\"websy-btn cancel ".concat(this.options.cancel.classes ? this.options.cancel.classes.join(' ') : '', "\">").concat(this.options.cancel.text || 'Cancel', "</button>\n        ");
        }
        html += "          \n        </form>\n        <div id=\"".concat(this.elementId, "_validationFail\" class=\"websy-validation-failure\"></div>\n        <div id=\"").concat(this.elementId, "_loader\" class=\"\"></div>\n      ");
        el.innerHTML = html;
        if (!this.loader) {
          this.loader = new WebsyDesigns.LoadingDialog("".concat(this.elementId, "_loader"), {
            title: '&nbsp;'
          });
        }
        this.processComponents(componentsToProcess, function () {
          if ((_this19.options.useRecaptcha === true || _this19.options.useRecaptchaV3 === true) && typeof grecaptcha !== 'undefined') {
            _this19.recaptchaReady();
          }
        });
      }
    }
  }, {
    key: "setValue",
    value: function setValue(field, value) {
      if (this.fieldMap[field]) {
        if (this.fieldMap[field].instance) {
          this.fieldMap[field].instance.value = value;
        } else {
          var el = document.getElementById("".concat(this.elementId, "_input_").concat(field));
          if (el) {
            el.value = value;
            el.setAttribute('value', value);
            if (this.fieldMap[field].type === 'checkbox') {
              el.checked = value;
            }
            if (this.fieldMap[field].type === 'date') {
              el.valueAsDate = value;
            }
          } else {
            console.error("Input for ".concat(field, " does not exist in form."));
          }
        }
      } else {
        console.error("Field ".concat(field, " does not exist in form."));
      }
    }
  }, {
    key: "submitForm",
    value: function submitForm() {
      var _this20 = this;
      var formEl = document.getElementById("".concat(this.elementId, "Form"));
      var buttonEl = formEl.querySelector('button.websy-btn.submit');
      var recaptchErrEl = document.getElementById("".concat(this.elementId, "_recaptchaError"));
      if (this.options.preSubmitFn && this.options.preSubmitFn() === false) {
        return;
      }
      if (this.validateForm() === true) {
        if (buttonEl) {
          buttonEl.setAttribute('disabled', true);
        }
        this.checkRecaptcha().then(function (result) {
          if (buttonEl) {
            buttonEl.removeAttribute('disabled');
          }
          if (result === true) {
            if (recaptchErrEl) {
              recaptchErrEl.classList.add('websy-hidden');
            }
            if (_this20.options.useLoader) {
              _this20.loader.show();
            }
            var formData = new FormData(formEl);
            var data = {};
            var temp = new FormData(formEl);
            temp.forEach(function (value, key) {
              data[key] = value;
            });
            if (_this20.options.url) {
              var _this20$apiService;
              var params = [_this20.options.url];
              if (_this20.options.mode === 'update') {
                params.push(_this20.options.id);
              }
              params.push(data);
              (_this20$apiService = _this20.apiService)[_this20.options.mode].apply(_this20$apiService, params).then(function (result) {
                if (_this20.options.clearAfterSave === true) {
                  // this.render()
                  formEl.reset();
                }
                buttonEl.removeAttribute('disabled');
                _this20.options.onSuccess.call(_this20, result);
              }, function (err) {
                console.log('Error submitting form data:', err);
                _this20.options.onError.call(_this20, err);
              });
            } else if (_this20.options.submitFn) {
              _this20.options.submitFn(data, function () {
                _this20.loader.hide();
                if (_this20.options.clearAfterSave === true) {
                  // this.render()
                  formEl.reset();
                }
              }, function () {
                _this20.loader.hide();
              });
            }
          } else {
            if (buttonEl) {
              buttonEl.removeAttribute('disabled');
            }
            if (recaptchErrEl) {
              recaptchErrEl.classList.remove('websy-hidden');
            }
            if (_this20.options.submitErr) {
              _this20.options.submitErr();
            }
          }
        });
      }
    }
  }, {
    key: "validateForm",
    value: function validateForm() {
      var valid = true;
      var data = this.data;
      for (var i = 0; i < this.options.fields.length; i++) {
        if (this.options.fields[i].required || this.options.fields[i].validate) {
          if (this.validateField(this.options.fields[i], data[this.options.fields[i].field]) === false) {
            valid = false;
          }
        }
      }
      return valid;
    }
  }, {
    key: "validateField",
    value: function validateField(field, value) {
      var inputContainerEl = document.getElementById("".concat(this.elementId, "_").concat(field.field, "_inputContainer"));
      var errorEl = document.getElementById("".concat(this.elementId, "_").concat(field.field, "_error"));
      if (field.required) {
        var valid = true;
        if (field.component && field.instance && field.instance.value) {
          valid = field.instance.value.length > 0;
        } else {
          valid = !(typeof value === 'undefined' || value === '');
        }
        if (!valid) {
          if (errorEl) {
            errorEl.innerHTML = field.invalidMessage || 'A value is required';
          }
          if (inputContainerEl) {
            inputContainerEl.classList.add('websy-form-input-has-error');
          }
          return false;
        }
      }
      if (field.validate) {
        var _valid = field.validate(field, value);
        if (!_valid) {
          if (errorEl) {
            errorEl.innerHTML = field.invalidMessage || 'A value is required';
          }
          if (inputContainerEl) {
            inputContainerEl.classList.add('websy-form-input-has-error');
          }
          return false;
        }
      }
      if (errorEl) {
        errorEl.innerHTML = '';
      }
      if (inputContainerEl) {
        inputContainerEl.classList.remove('websy-form-input-has-error');
      }
      return true;
    }
  }, {
    key: "validateRecaptcha",
    value: function validateRecaptcha(token) {
      this.recaptchaValue = token;
    }
  }]);
  return WebsyForm;
}();
/*
  global
  WebsyDesigns
*/
var MultiForm = /*#__PURE__*/function () {
  function MultiForm(elementId, options) {
    _classCallCheck(this, MultiForm);
    this.elementId = elementId;
    var DEFAULTS = {
      addIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 512 512\"><line x1=\"256\" y1=\"112\" x2=\"256\" y2=\"400\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/><line x1=\"400\" y1=\"256\" x2=\"112\" y2=\"256\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/></svg>",
      deleteIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 512 512\"><line x1=\"368\" y1=\"368\" x2=\"144\" y2=\"144\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/><line x1=\"368\" y1=\"144\" x2=\"144\" y2=\"368\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/></svg>",
      allowAdd: true,
      allowDelete: true,
      addLabel: '',
      deleteLabel: '',
      emptyMessage: 'No items to display'
    };
    this.options = _extends({}, DEFAULTS, options);
    this.formData = [];
    this.forms = [];
    this.recordsToDelete = [];
    var el = document.getElementById(elementId);
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      el.innerHTML = "\n        <div id='".concat(elementId, "_container' class='websy-multi-form-container' data-empty='").concat(this.options.emptyMessage, "'></div>\n        <button id='").concat(this.elementId, "_addButton' class='websy-multi-form-add'>\n          ").concat(this.options.addIcon).concat(this.options.addLabel, "\n        </button>   \n      ");
    }
    this.render();
  }
  _createClass(MultiForm, [{
    key: "addData",
    value: function addData(data) {
      this.formData = this.formData.concat(data);
      this.render();
    }
  }, {
    key: "addEntry",
    value: function addEntry() {
      var addEl = document.getElementById("".concat(this.elementId, "_addButton"));
      if (typeof this.options.maxRows === 'undefined' || this.forms.length < this.options.maxRows) {
        var el = document.getElementById("".concat(this.elementId, "_container"));
        var newId = WebsyDesigns.Utils.createIdentity();
        var newFormEl = document.createElement('div');
        newFormEl.id = "".concat(this.elementId, "_").concat(newId, "_formContainer");
        newFormEl.classList.add('websy-multi-form-form-container');
        var html = "\n        <div id='".concat(this.elementId, "_").concat(newId, "_form' class='websy-multi-form-form'>\n        </div>\n        <button id='").concat(this.elementId, "_").concat(newId, "_deleteButton' data-formid='").concat(newId, "' class='websy-multi-form-delete'>\n          ").concat(this.options.deleteIcon).concat(this.options.deleteLabel, "\n        </button>\n      ");
        newFormEl.innerHTML = html;
        el.appendChild(newFormEl);
        var formOptions = _extends({}, this.options, {
          fields: _toConsumableArray(this.options.fields.map(function (f) {
            return _extends({}, f);
          }))
        });
        this.forms.push(new WebsyDesigns.Form("".concat(this.elementId, "_").concat(newId, "_form"), formOptions));
        if (addEl) {
          addEl.style.display = this.forms.length < this.options.maxRows ? 'flex' : 'none';
        }
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.formData = [];
      this.forms = [];
      this.recordsToDelete = [];
      var el = document.getElementById("".concat(this.elementId, "_container"));
      if (el) {
        el.innerHTML = '';
      }
    }
  }, {
    key: "data",
    get: function get() {
      var d = this.forms.map(function (f) {
        return f.data;
      });
      return d;
    },
    set: function set(d) {
      this.formData = d;
      this.render();
    }
  }, {
    key: "deleted",
    get: function get() {
      var _this21 = this;
      return this.formData.filter(function (d) {
        return _this21.recordsToDelete.includes("".concat(d.id));
      });
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('websy-multi-form-add')) {
        // add new form
        if (this.options.allowAdd === true) {
          this.addEntry();
        }
      }
      if (event.target.classList.contains('websy-multi-form-delete')) {
        // delete form based on index
        var id = event.target.getAttribute('data-formid');
        var rowId = event.target.getAttribute('data-rowid');
        this.recordsToDelete.push(rowId);
        var indexToDelete = -1;
        for (var i = 0; i < this.forms.length; i++) {
          if (this.forms[i].elementId === "".concat(this.elementId, "_").concat(id, "_form")) {
            indexToDelete = i;
            break;
          }
        }
        if (indexToDelete !== -1) {
          this.forms.splice(indexToDelete, 1);
        }
        var el = document.getElementById("".concat(this.elementId, "_").concat(id, "_formContainer"));
        if (el) {
          el.remove();
        }
        var addEl = document.getElementById("".concat(this.elementId, "_addButton"));
        if (addEl) {
          addEl.style.display = typeof this.options.maxRows === 'undefined' || this.forms.length < this.options.maxRows ? 'flex' : 'none';
        }
        // delete form element based on id
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this22 = this;
      this.forms = [];
      this.recordsToDelete = [];
      var el = document.getElementById("".concat(this.elementId, "_container"));
      if (el) {
        var html = '';
        this.formData.forEach(function (d) {
          d.formId = WebsyDesigns.Utils.createIdentity();
          html += "\n          <div id='".concat(_this22.elementId, "_").concat(d.formId, "_formContainer' class='websy-multi-form-form-container'>\n            <div id='").concat(_this22.elementId, "_").concat(d.formId, "_form' class='websy-multi-form-form'>\n            </div>\n        ");
          if (_this22.options.allowDelete === true && !_this22.options.readOnly) {
            html += "\n            <button id='".concat(_this22.elementId, "_").concat(d.formId, "_deleteButton' data-formid='").concat(d.formId, "' data-rowid='").concat(d.id, "' class='websy-multi-form-delete'>\n              ").concat(_this22.options.deleteIcon).concat(_this22.options.deleteLabel, "\n            </button>\n          ");
          }
          html += "\n          </div>\n        ";
        });
        var id = WebsyDesigns.Utils.createIdentity();
        el.innerHTML = html;
        this.forms = new Array(this.formData.length);
        this.formData.forEach(function (d, i) {
          var formOptions = _extends({}, _this22.options, {
            fields: _toConsumableArray(_this22.options.fields.map(function (f) {
              return _extends({}, f);
            }))
          });
          var formObject = new WebsyDesigns.Form("".concat(_this22.elementId, "_").concat(d.formId, "_form"), formOptions);
          formObject.data = d;
          _this22.forms[i] = formObject;
        });
        var addEl = document.getElementById("".concat(this.elementId, "_addButton"));
        if (addEl) {
          if (this.options.allowAdd === true && !this.options.readOnly) {
            addEl.style.display = typeof this.options.maxRows === 'undefined' || this.forms.length < this.options.maxRows ? 'flex' : 'none';
          } else {
            addEl.style.display = 'none';
          }
        }
      }
    }
  }, {
    key: "validateForm",
    value: function validateForm() {
      // we don't validate the last form
      for (var i = 0; i < this.forms.length - 1; i++) {
        var valid = this.forms[i].validateForm();
        if (!valid) {
          return false;
        }
      }
      return true;
    }
  }]);
  return MultiForm;
}();
/* global include */
var WebsyIcons = {
  'search-icon': "\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 500 500\" xml:space=\"preserve\">\n<path d=\"M481.4,468.6c-17.2-17.2-34.4-34.4-51.6-51.6c-27.4-27.4-54.8-54.8-82.2-82.2c-4.8-4.8-9.5-9.5-14.3-14.3\n\tc29.4-32.5,47.4-75.5,47.4-122.7C380.7,97,298.7,15,197.9,15S15,97,15,197.9s82,182.9,182.9,182.9c47.2,0,90.3-18,122.7-47.4\n\tc15.7,15.7,31.4,31.4,47.1,47.1c27.4,27.4,54.8,54.8,82.2,82.2c6.3,6.3,12.5,12.5,18.8,18.8C476.8,489.6,489.6,476.8,481.4,468.6z\n\t M35,197.9C35,108.1,108.1,35,197.9,35s162.9,73.1,162.9,162.9s-73.1,162.9-162.9,162.9S35,287.7,35,197.9z\"/>\n</svg>\n\n  ",
  'bag-icon': "\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 500 500\">\n<path d=\"M456.6,472.3H43.4c-5.3,0-10.2-2.1-13.7-6c-3.6-3.9-5.2-9.2-4.5-14.4l37-285.4c1.2-9,9-15.9,18.2-15.9h339.2\n\tc9.2,0,17,6.8,18.2,15.8l37,285.4c0.7,5.2-1,10.5-4.5,14.4l0,0C466.8,470.1,461.9,472.3,456.6,472.3z M46.5,451.2h407l-36.3-279.6\n\tH82.8L46.5,451.2z\"/>\n<g>\n\t<path d=\"M361.3,157.1C357.3,94.8,308.4,46,249.9,46c-28,0-54.8,11.1-75.4,31.4c-20.7,20.3-33.5,47.9-35.9,77.8l-21.5-1.6\n\t\tc2.8-34.8,17.7-67.1,42.1-91C183.9,38.3,216.1,25,249.9,25c34.2,0,66.6,13.6,91.5,38.3c24.5,24.3,39.2,57.2,41.5,92.5L361.3,157.1z\n\t\t\"/>\n</g>\n</svg>\n\n  ",
  'user-icon': "\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 500 500\" style=\"enable-background:new 0 0 500 500;\" xml:space=\"preserve\">\n<g>\n\t<path d=\"M248,260.5c-62,0-112.5-52.8-112.5-117.7S186,25,248,25s112.5,52.8,112.5,117.7S310,260.5,248,260.5z M248,45.9\n\t\tc-51,0-92.5,43.4-92.5,96.8s41.5,96.8,92.5,96.8c51,0,92.5-43.4,92.5-96.8S299,45.9,248,45.9z\"/>\n</g>\n<path d=\"M45,475C45,475,45,475,45,475c0-118.3,92-214.5,205-214.5c113,0,205,96.2,205,214.5c0,0,0,0,0,0h20c0,0,0,0,0,0\n\tc0-62.9-23.4-122-65.9-166.5c-42.5-44.5-99-69-159.1-69s-116.6,24.5-159.1,69C48.4,353,25,412.1,25,475c0,0,0,0,0,0H45z\"/>\n</svg>\n\n  ",
  'Search': "\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 500 500\" xml:space=\"preserve\">\n<path d=\"M481.4,468.6c-17.2-17.2-34.4-34.4-51.6-51.6c-27.4-27.4-54.8-54.8-82.2-82.2c-4.8-4.8-9.5-9.5-14.3-14.3\n\tc29.4-32.5,47.4-75.5,47.4-122.7C380.7,97,298.7,15,197.9,15S15,97,15,197.9s82,182.9,182.9,182.9c47.2,0,90.3-18,122.7-47.4\n\tc15.7,15.7,31.4,31.4,47.1,47.1c27.4,27.4,54.8,54.8,82.2,82.2c6.3,6.3,12.5,12.5,18.8,18.8C476.8,489.6,489.6,476.8,481.4,468.6z\n\t M35,197.9C35,108.1,108.1,35,197.9,35s162.9,73.1,162.9,162.9s-73.1,162.9-162.9,162.9S35,287.7,35,197.9z\"/>\n</svg>\n\n  ",
  'Bag': "\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 500 500\">\n<path d=\"M456.6,472.3H43.4c-5.3,0-10.2-2.1-13.7-6c-3.6-3.9-5.2-9.2-4.5-14.4l37-285.4c1.2-9,9-15.9,18.2-15.9h339.2\n\tc9.2,0,17,6.8,18.2,15.8l37,285.4c0.7,5.2-1,10.5-4.5,14.4l0,0C466.8,470.1,461.9,472.3,456.6,472.3z M46.5,451.2h407l-36.3-279.6\n\tH82.8L46.5,451.2z\"/>\n<g>\n\t<path d=\"M361.3,157.1C357.3,94.8,308.4,46,249.9,46c-28,0-54.8,11.1-75.4,31.4c-20.7,20.3-33.5,47.9-35.9,77.8l-21.5-1.6\n\t\tc2.8-34.8,17.7-67.1,42.1-91C183.9,38.3,216.1,25,249.9,25c34.2,0,66.6,13.6,91.5,38.3c24.5,24.3,39.2,57.2,41.5,92.5L361.3,157.1z\n\t\t\"/>\n</g>\n</svg>\n\n  ",
  'User': "\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 500 500\" style=\"enable-background:new 0 0 500 500;\" xml:space=\"preserve\">\n<g>\n\t<path d=\"M248,260.5c-62,0-112.5-52.8-112.5-117.7S186,25,248,25s112.5,52.8,112.5,117.7S310,260.5,248,260.5z M248,45.9\n\t\tc-51,0-92.5,43.4-92.5,96.8s41.5,96.8,92.5,96.8c51,0,92.5-43.4,92.5-96.8S299,45.9,248,45.9z\"/>\n</g>\n<path d=\"M45,475C45,475,45,475,45,475c0-118.3,92-214.5,205-214.5c113,0,205,96.2,205,214.5c0,0,0,0,0,0h20c0,0,0,0,0,0\n\tc0-62.9-23.4-122-65.9-166.5c-42.5-44.5-99-69-159.1-69s-116.6,24.5-159.1,69C48.4,353,25,412.1,25,475c0,0,0,0,0,0H45z\"/>\n</svg>\n\n  ",
  'DockLeft': "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 500 500\" style=\"enable-background:new 0 0 500 500;\" xml:space=\"preserve\">\n\t<g>\n\t\t<path d=\"M419.7,425H80.3C49.8,425,25,400.2,25,369.7V130.3C25,99.8,49.8,75,80.3,75h339.4c30.5,0,55.3,24.8,55.3,55.3v239.4\n\t\t\tC475,400.2,450.2,425,419.7,425z M80.3,95C60.8,95,45,110.8,45,130.3v239.4c0,19.5,15.8,35.3,35.3,35.3h339.4\n\t\t\tc19.5,0,35.3-15.8,35.3-35.3V130.3c0-19.5-15.8-35.3-35.3-35.3H80.3z\"/>\n\t</g>\n\t<path d=\"M92.8,90.1H92h-4.2c-24.8,0-45,20.2-45,45v229.8c0,24.8,20.2,45,45,45H92h0.8h105.4V90.1H92.8z\"/>\n</svg>\n\n  ",
  'DockRight': "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 500 500\" style=\"enable-background:new 0 0 500 500;\" xml:space=\"preserve\">\n\t<g>\n\t\t<path d=\"M25,369.7V130.3C25,99.8,49.8,75,80.3,75h339.4c30.5,0,55.3,24.8,55.3,55.3v239.4c0,30.5-24.8,55.3-55.3,55.3H80.3\n\t\t\tC49.8,425,25,400.2,25,369.7z M80.3,95C60.8,95,45,110.8,45,130.3v239.4c0,19.5,15.8,35.3,35.3,35.3h339.4\n\t\t\tc19.5,0,35.3-15.8,35.3-35.3V130.3c0-19.5-15.8-35.3-35.3-35.3H80.3z\"/>\n\t</g>\n\t<path d=\"M407.2,90.1h0.8h4.2c24.8,0,45,20.2,45,45v229.8c0,24.8-20.2,45-45,45H408h-0.8H301.8V90.1H407.2z\"/>\n</svg>\n\n  ",
  'Pin': "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 500 500\" style=\"enable-background:new 0 0 500 500;\" xml:space=\"preserve\">\n\t<g>\n\t\t<path d=\"M368,312.1H132l-0.6-9.4c-0.1-2.4-0.2-4.8-0.2-7.1c0-40.3,20.7-78.1,54.4-99.9V73.2h-9c-13,0-23.6-10.6-23.6-23.6\n\t\t\tS163.5,26,176.6,26h146.9c13,0,23.6,10.6,23.6,23.6s-10.6,23.6-23.6,23.6h-9v122.5c33.7,21.8,54.4,59.5,54.4,99.9\n\t\t\tc0,2.3-0.1,4.7-0.2,7.1L368,312.1z M151.2,292.1h197.5c-1.2-33.8-19.9-65.1-49.4-82.1l-5-2.9V53.2h29c2,0,3.6-1.6,3.6-3.6\n\t\t\tc0-2-1.6-3.6-3.6-3.6H176.6c-2,0-3.6,1.6-3.6,3.6c0,2,1.6,3.6,3.6,3.6h29v153.9l-5,2.9C171.1,227,152.4,258.3,151.2,292.1z\"/>\n\t</g>\n\t<path d=\"M260.9,403.8V299.9h-21.8v108.8h0c0.1,36.1,4.9,65.3,10.9,65.3c6,0,10.9-29.7,10.9-66.4\n\t\tC260.9,406.4,260.9,405.1,260.9,403.8z\"/>\n</svg>\n\n  ",
  'WindowPopout': "\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 500 500\" style=\"enable-background:new 0 0 500 500;\" xml:space=\"preserve\">\n<style type=\"text/css\">\n\t.st0{fill:none;stroke:#000000;stroke-width:20;stroke-miterlimit:10;}\n</style>\n<path class=\"st0\" d=\"M420.1,359.6h-285c-24.7,0-45-20.2-45-45V124.9c0-24.7,20.2-45,45-45h285c24.7,0,45,20.2,45,45v189.7\n\tC465.1,339.3,444.9,359.6,420.1,359.6z\"/>\n<path class=\"st0\" d=\"M407.3,389.8c-6.3,17.3-22.9,29.7-42.3,29.7H80c-24.7,0-45-20.2-45-45V184.9c0-18.2,10.9-33.9,26.5-41\"/>\n</svg>\n\n  ",
  'Plus': "\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 500 500\">\n<path d=\"M254.7,486h-10.3c-5.5,0-10-4.5-10-10V26c0-5.5,4.5-10,10-10h10.3c5.5,0,10,4.5,10,10v450C264.6,481.5,260.2,486,254.7,486z\"/>\n<path d=\"M15,255.1v-10.3c0-5.5,4.5-10,10-10h450c5.5,0,10,4.5,10,10v10.3c0,5.5-4.5,10-10,10H25C19.5,265.1,15,260.7,15,255.1z\"/>\n</svg>\n\n  ",
  'Minus': "\n    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 500 500\">\n<path d=\"M15,255.1v-10.3c0-5.5,4.5-10,10-10h450c5.5,0,10,4.5,10,10v10.3c0,5.5-4.5,10-10,10H25C19.5,265.1,15,260.7,15,255.1z\"/>\n</svg>\n  ",
  'PlusFilled': "\n    <?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 500 500\" style=\"enable-background:new 0 0 500 500;\" xml:space=\"preserve\">\n<style type=\"text/css\">\n\t.st0{fill:#FFFFFF;}\n</style>\n<circle cx=\"249.6\" cy=\"251\" r=\"235\"/>\n<path class=\"st0\" d=\"M422.3,234.8H264.7V78.7c0-4.2-4.5-7.7-10-7.7h-10.3c-5.5,0-10,3.4-10,7.7v156.1H77.7c-4.2,0-7.7,4.5-7.7,10\n\tv10.3c0,5.6,3.4,10,7.7,10h156.7v158.2c0,4.2,4.5,7.7,10,7.7h10.3c5.5,0,9.9-3.4,10-7.7V265.1h157.6c4.2,0,7.7-4.5,7.7-10v-10.3\n\tC430,239.3,426.6,234.8,422.3,234.8z\"/>\n</svg>\n\n  ",
  'MinusFilled': "\n    <?xml version=\"1.0\" encoding=\"utf-8\"?>\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n\t viewBox=\"0 0 500 500\" style=\"enable-background:new 0 0 500 500;\" xml:space=\"preserve\">\n<style type=\"text/css\">\n\t.st0{fill:#FFFFFF;}\n</style>\n<circle cx=\"250.1\" cy=\"255.4\" r=\"235\"/>\n<path class=\"st0\" d=\"M70,255.1v-10.3c0-5.5,3.4-10,7.7-10h344.7c4.2,0,7.7,4.5,7.7,10v10.3c0,5.5-3.4,10-7.7,10H77.7\n\tC73.4,265.1,70,260.7,70,255.1z\"/>\n</svg>\n\n  "
};
var WebsyLoadingDialog = /*#__PURE__*/function () {
  function WebsyLoadingDialog(elementId, options) {
    _classCallCheck(this, WebsyLoadingDialog);
    this.options = _extends({}, options);
    if (!elementId) {
      console.log('No element Id provided');
      return;
    }
    this.elementId = elementId;
  }
  _createClass(WebsyLoadingDialog, [{
    key: "hide",
    value: function hide() {
      var el = document.getElementById(this.elementId);
      if (el) {
        el.classList.remove('loading');
        el.innerHTML = '';
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.elementId) {
        console.log('No element Id provided for Websy Loading Dialog');
        return;
      }
      var el = document.getElementById(this.elementId);
      if (el) {
        var html = "\n        <div class='websy-loading-container ".concat((this.options.classes || []).join(' '), "'>\n          <div class='websy-ripple'>\n            <div></div>\n            <div></div>\n          </div>\n          <h4>").concat(this.options.title || 'Loading...', "</h4>\n      ");
        if (this.options.messages) {
          for (var i = 0; i < this.options.messages.length; i++) {
            html += "<p>".concat(this.options.messages[i], "</p>");
          }
        }
        html += "\n        </div>\t\n      ";
        el.classList.add('loading');
        el.innerHTML = html;
      }
    }
  }, {
    key: "show",
    value: function show(options) {
      var override = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (options) {
        if (override === true) {
          this.options = _extends({}, options);
        } else {
          this.options = _extends({}, this.options, options);
        }
      }
      this.render();
    }
  }]);
  return WebsyLoadingDialog;
}();
/* global WebsyDesigns */
var WebsyNavigationMenu = /*#__PURE__*/function () {
  function WebsyNavigationMenu(elementId, options) {
    _classCallCheck(this, WebsyNavigationMenu);
    this.options = _extends({}, {
      collapsible: false,
      orientation: 'horizontal',
      parentMap: {},
      childIndentation: 10,
      activeSymbol: 'none',
      enableSearch: false,
      searchProp: 'text',
      indent: 'padding',
      expandIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 512 512\"><polyline points=\"112 184 256 328 400 184\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px\"/></svg>",
      collapseIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 512 512\"><polyline points=\"328 112 184 256 328 400\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:48px\"/></svg>",
      menuIcon: "<svg viewbox=\"0 0 40 40\" width=\"30\" height=\"40\">              \n        <rect x=\"0\" y=\"0\" width=\"30\" height=\"4\" rx=\"2\"></rect>\n        <rect x=\"0\" y=\"12\" width=\"30\" height=\"4\" rx=\"2\"></rect>\n        <rect x=\"0\" y=\"24\" width=\"30\" height=\"4\" rx=\"2\"></rect>\n      </svg>",
      searchOptions: {}
    }, options);
    if (!elementId) {
      console.log('No element Id provided for Websy Menu');
      return;
    }
    this.maxLevel = 0;
    var el = document.getElementById(elementId);
    if (el) {
      this.elementId = elementId;
      this.lowestLevel = 0;
      this.flatItems = [];
      this.itemMap = {};
      this.flattenItems(0, this.options.items);
      el.classList.add("websy-".concat(this.options.orientation, "-list-container"));
      el.classList.add('websy-menu');
      if (this.options.align) {
        el.classList.add("".concat(this.options.align, "-align"));
      }
      if (Array.isArray(this.options.classes)) {
        this.options.classes = this.options.classes.join(' ');
      }
      if (this.options.classes) {
        this.options.classes.split(' ').forEach(function (c) {
          return el.classList.add(c);
        });
      }
      el.addEventListener('click', this.handleClick.bind(this));
      this.render();
    }
  }
  _createClass(WebsyNavigationMenu, [{
    key: "activateItem",
    value: function activateItem(id) {
      var el = document.getElementById(id);
      if (el) {
        el.classList.add('active');
        var parent = el.parentElement;
        while (parent) {
          if (parent.tagName === 'UL') {
            parent.classList.remove('websy-menu-collapsed');
            var pathEnd = parent.getAttribute('data-path').split('::').pop();
            var neighborEl = document.getElementById(pathEnd);
            if (neighborEl && neighborEl.classList.contains('websy-menu-header')) {
              neighborEl.classList.add('menu-open');
            }
            parent = parent.parentElement;
          } else if (parent.tagName === 'LI') {
            parent = parent.parentElement;
          } else {
            parent = null;
          }
        }
      }
    }
  }, {
    key: "collapseAll",
    value: function collapseAll() {
      var el = document.getElementById(this.elementId);
      var menuEls = el.querySelectorAll('.websy-child-list');
      var headerEls = el.querySelectorAll('.websy-menu-header');
      Array.from(menuEls).forEach(function (e) {
        return e.classList.add('websy-menu-collapsed');
      });
      Array.from(headerEls).forEach(function (e) {
        e.classList.remove('active');
        e.classList.remove('menu-open');
      });
    }
  }, {
    key: "flattenItems",
    value: function flattenItems(index, items) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      if (items[index]) {
        this.lowestLevel = Math.max(level, this.lowestLevel);
        items[index].id = items[index].id || "".concat(this.elementId, "_").concat(this.normaliseString(items[index].text));
        items[index].level = level;
        items[index].hasChildren = items[index].items && items[index].items.length > 0;
        items[index].path = path !== '' ? "".concat(path, "::").concat(items[index].id) : items[index].id;
        this.itemMap[items[index].id] = _extends({}, items[index]);
        this.flatItems.push(items[index]);
        if (items[index].items) {
          this.flattenItems(0, items[index].items, level + 1, items[index].path);
        }
        this.flattenItems(++index, items, level, path);
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('websy-menu-icon')) {
        this.toggleMobileMenu();
      }
      if (event.target.classList.contains('websy-menu-header')) {
        var item = this.itemMap[event.target.id];
        if (event.target.classList.contains('trigger-item') && item.level === this.lowestLevel) {
          this.toggleMobileMenu('remove');
        }
        if (item && item.hasChildren === true) {
          event.target.classList.toggle('menu-open');
          this.toggleMenu(item.id);
        } else {
          var el = document.getElementById(this.elementId);
          var allEls = el.querySelectorAll('.websy-menu-header');
          Array.from(allEls).forEach(function (e) {
            return e.classList.remove('active');
          });
          event.target.classList.add('active');
        }
      }
      if (event.target.classList.contains('websy-menu-mask')) {
        this.toggleMobileMenu();
      }
    }
  }, {
    key: "handleSearch",
    value: function handleSearch(searchText) {
      var _this23 = this;
      var el = document.getElementById(this.elementId);
      // let lowestItems = this.flatItems.filter(d => d.level === this.maxLevel)
      var lowestItems = this.flatItems.filter(function (d) {
        return !d.hasChildren;
      });
      var visibleItems = lowestItems;
      var defaultMethod = 'remove';
      if (searchText && searchText.length > 1) {
        defaultMethod = 'add';
        visibleItems = lowestItems.filter(function (d) {
          return d[_this23.options.searchProp].toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
        });
      }
      // hide everything
      var textEls = el.querySelectorAll("div.websy-menu-header");
      for (var t = 0; t < textEls.length; t++) {
        textEls[t].classList[defaultMethod]('websy-hidden');
        textEls[t].classList.remove('menu-open');
      }
      var listEls = el.querySelectorAll("ul.websy-child-list");
      for (var l = 0; l < listEls.length; l++) {
        listEls[l].classList.add('websy-menu-collapsed');
      }
      if (searchText && searchText.length > 1) {
        visibleItems.forEach(function (d) {
          // show the item and open the list
          var pathParts = d.path.split('::');
          pathParts.forEach(function (p) {
            var textEl = document.getElementById(p);
            if (textEl) {
              textEl.classList.remove('websy-hidden');
              textEl.classList.add('menu-open');
            }
            var listEl = document.getElementById("".concat(p, "_list"));
            if (listEl) {
              listEl.classList.remove('websy-menu-collapsed');
            }
          });
        });
      }
    }
  }, {
    key: "normaliseString",
    value: function normaliseString(text) {
      return text.replace(/-/g, '').replace(/\s/g, '_');
    }
  }, {
    key: "render",
    value: function render() {
      var el = document.getElementById(this.elementId);
      if (el) {
        var html = "";
        if (this.options.collapsible === true) {
          html += "\n          <div id='".concat(this.elementId, "_menuIcon' class='websy-menu-icon'>\n            ").concat(this.options.menuIcon, "\n          </div>\n        ");
        }
        if (this.options.logo) {
          if (Array.isArray(this.options.logo.classes)) {
            this.options.logo.classes = this.options.logo.classes.join(' ');
          }
          html += "          \n          <div \n            class='logo ".concat(this.options.logo.classes || '', "'\n            ").concat(this.options.logo.attributes && this.options.logo.attributes.join(' '), "\n          >\n          <img src='").concat(this.options.logo.url, "'></img>\n          </div>\n          <div id='").concat(this.elementId, "_mask' class='websy-menu-mask'></div>\n          <div id=\"").concat(this.elementId, "_menuContainer\" class=\"websy-menu-block-container\">\n        ");
        }
        if (this.options.enableSearch === true) {
          html += "\n          <div id='".concat(this.elementId, "_search' class='websy-menu-search'></div>\n        ");
        }
        html += this.renderBlock(this.elementId, this.elementId, this.options.items, 'main', 0);
        html += "</div>";
        if (this.options.secondaryItems) {
          html += "<div class='websy-menu-secondary' style='height: ".concat(this.options.secondaryHeight || '100%', "; width: ").concat(this.options.secondaryWidth || '100%', "'>");
          html += this.renderBlock(this.elementId, this.elementId, this.options.secondaryItems, 'main', 0);
          html += "</div>";
        }
        el.innerHTML = html;
        // open the menu if an item is set as 'active'
        var activeEl = el.querySelector('.websy-menu-header.active');
        if (activeEl) {
          var parent = activeEl.parentElement;
          while (parent) {
            if (parent.tagName === 'UL') {
              parent.classList.remove('websy-menu-collapsed');
              var pathEnd = parent.getAttribute('data-path').split('::').pop();
              var neighborEl = document.getElementById(pathEnd);
              if (neighborEl && neighborEl.classList.contains('websy-menu-header')) {
                neighborEl.classList.add('menu-open');
              }
              parent = parent.parentElement;
            } else if (parent.tagName === 'LI') {
              parent = parent.parentElement;
            } else {
              parent = null;
            }
          }
        }
        if (this.options.enableSearch === true) {
          this.search = new WebsyDesigns.Search("".concat(this.elementId, "_search"), _extends({}, {
            onSearch: this.handleSearch.bind(this),
            onClear: this.handleSearch.bind(this)
          }, this.options.searchOptions));
        }
      }
    }
  }, {
    key: "renderBlock",
    value: function renderBlock(id, path, items, block) {
      var level = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      this.maxLevel = Math.max(this.maxLevel, level);
      var html = "\n\t\t  <ul class='websy-".concat(this.options.orientation, "-list ").concat(level > 0 ? 'websy-child-list' : '', " ").concat(block !== 'main' ? 'websy-menu-collapsed' : '', "' id='").concat(id, "_list' data-path='").concat(path, "'\n\t  ");
      if (block !== 'main') {
        html += " data-collapsed='".concat(block !== 'main' ? 'true' : 'false', "'");
      }
      html += '>';
      for (var i = 0; i < items.length; i++) {
        // update the block to the current item		
        var selected = ''; // items[i].default === true ? 'selected' : ''
        var active = items[i]["default"] === true ? 'active' : '';
        var currentBlock = this.normaliseString(items[i].text);
        var isLast = items[i].items && items[i].items.length > 0 ? '' : 'websy-menu-last-level';
        var blockId = items[i].id; //  || 	`${this.elementId}_${currentBlock}_label`
        if (Array.isArray(items[i].classes)) {
          items[i].classes = items[i].classes.join(' ');
        }
        html += "\n\t\t\t<li class='websy-".concat(this.options.orientation, "-list-item ").concat(items[i].alwaysOpen === true ? 'always-open' : '', "'>\n\t\t\t\t<div class='websy-menu-header ").concat(isLast, " websy-menu-level-").concat(level, " ").concat(items[i].classes || '', " ").concat(selected, " ").concat(active, "' \n          id='").concat(blockId, "' \n          data-id='").concat(currentBlock, "'\n          data-path='").concat(items[i].path, "'\n          data-menu-id='").concat(this.elementId, "_").concat(currentBlock, "_list'\n          data-popout-id='").concat(level > 1 ? block : currentBlock, "'\n          data-text='").concat(items[i].isLink !== true ? items[i].text : '', "'\n          style='").concat(this.options.indent, "-left: ").concat(level * this.options.childIndentation, "px'\n          ").concat(items[i].attributes && items[i].attributes.join(' ') || '', "\n        >\n      ");
        if (this.options.orientation === 'horizontal') {
          html += items[i].text;
        }
        if (this.options.activeSymbol === 'line') {
          html += "\n          <span class='selected-bar'></span>\n        ";
        }
        if (this.options.orientation === 'vertical') {
          // html += `
          //   &nbsp;
          // `
        }
        if (items[i].isLink === true && items[i].href) {
          html += "<a href='".concat(items[i].href, "' target='").concat(items[i].openInNewTab ? 'blank' : '_self', "'>");
        }
        if (items[i].icon) {
          html += "\n          <div class='websy-menu-item-icon'>".concat(items[i].icon, "</div>\n        ");
        }
        html += "<span>".concat(items[i].text, "</span>");
        if (items[i].isLink === true && items[i].href) {
          html += "</a>";
        }
        if (items[i].items && items[i].items.length > 0) {
          html += "  \n          <div class='websy-menu-expand-collapse-buttons'>".concat(this.options.expandIcon).concat(this.options.collapseIcon, "</div>\n        ");
        }
        if (this.options.activeSymbol === 'triangle') {
          html += "\n          <span class='active-square'></span>\n        ";
        }
        html += "    \n\t\t\t\t</div>\n\t\t  ";
        if (items[i].items) {
          html += this.renderBlock(blockId, items[i].path, items[i].items, currentBlock, items[i].level + 1);
        }
        // map the item to it's parent
        if (block && block !== 'main') {
          if (!this.options.parentMap[currentBlock]) {
            this.options.parentMap[currentBlock] = block;
          }
        }
        html += "\n\t\t\t</li>\n\t\t";
      }
      html += "</ul>";
      return html;
    }
  }, {
    key: "toggleMenu",
    value: function toggleMenu(id) {
      var el = document.getElementById("".concat(id, "_list"));
      // const menuId = el.getAttribute('data-menu-id')
      // const menuEl = document.getElementById(menuId)
      if (el) {
        el.classList.toggle('websy-menu-collapsed');
      }
    }
  }, {
    key: "toggleMobileMenu",
    value: function toggleMobileMenu(method) {
      if (typeof method === 'undefined') {
        method = 'toggle';
      }
      var el = document.getElementById("".concat(this.elementId));
      if (el) {
        el.classList[method]('open');
      }
      if (this.options.onToggle) {
        this.options.onToggle(method);
      }
    }
  }]);
  return WebsyNavigationMenu;
}();
/* global WebsyDesigns */
var Pager = /*#__PURE__*/function () {
  function Pager(elementId, options) {
    var _this24 = this;
    _classCallCheck(this, Pager);
    this.elementId = elementId;
    var DEFAULTS = {
      pageSizePrefix: 'Show',
      pageSizeSuffix: 'rows',
      pageSizeOptions: [{
        label: '10',
        value: 10
      }, {
        label: '20',
        value: 20
      }, {
        label: '50',
        value: 50
      }, {
        label: '100',
        value: 100
      }],
      selectedPageSize: 20,
      pageLabel: 'Page',
      showPageSize: true,
      activePage: 0,
      pages: []
    };
    this.options = _extends({}, DEFAULTS, options);
    var el = document.getElementById(this.elementId);
    if (el) {
      var html = "\n        <div class=\"websy-pager-container\">\n      ";
      if (this.options.showPageSize === true) {
        html += "\n          ".concat(this.options.pageSizePrefix, " <div id=\"").concat(this.elementId, "_pageSizeSelector\" class=\"websy-page-selector\"></div> ").concat(this.options.pageSizeSuffix, "          \n        ");
      }
      html += "\n          <ul id=\"".concat(this.elementId, "_pageList\" class=\"websy-page-list\"></ul>        \n        </div> \n      ");
      el.innerHTML = html;
      el.addEventListener('click', this.handleClick.bind(this));
      if (this.options.showPageSize === true) {
        this.pageSizeSelector = new WebsyDesigns.Dropdown("".concat(this.elementId, "_pageSizeSelector"), {
          selectedItems: [this.options.pageSizeOptions.indexOf(this.options.selectedPageSize)],
          items: this.pageSizeOptions.map(function (p) {
            return {
              label: p.toString(),
              value: p
            };
          }),
          allowClear: false,
          disableSearch: true,
          onItemSelected: function onItemSelected(selectedItem) {
            if (_this24.options.onChangePageSize) {
              _this24.options.onChangePageSize(selectedItem.value);
            }
          }
        });
      }
      this.render();
    }
  }
  _createClass(Pager, [{
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('websy-page-num')) {
        var pageNum = +event.target.getAttribute('data-index');
        if (this.options.onSetPage) {
          this.options.onSetPage(this.options.pages[pageNum]);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this25 = this;
      var el = document.getElementById("".concat(this.elementId, "_pageList"));
      if (el) {
        var pages = this.options.pages.map(function (item, index) {
          return "<li data-index=\"".concat(index, "\" class=\"websy-page-num ").concat(_this25.options.activePage === index ? 'active' : '', "\">").concat(index + 1, "</li>");
        });
        var startIndex = 0;
        if (this.options.pages.length > 8) {
          startIndex = Math.max(0, this.options.activePage - 4);
          pages = pages.splice(startIndex, 10);
          if (startIndex > 0) {
            pages.splice(0, 0, "<li>".concat(this.options.pageLabel, "&nbsp;</li><li data-page=\"0\" class=\"websy-page-num\">First</li><li>...</li>"));
          } else {
            pages.splice(0, 0, "<li>".concat(this.options.pageLabel, "&nbsp;</li>"));
          }
          if (this.options.activePage < this.options.pages.length - 1) {
            pages.push('<li>...</li>');
            pages.push("<li data-page=\"".concat(this.options.pages.length - 1, "\" class=\"websy-page-num\">Last</li>"));
          }
        }
        el.innerHTML = pages.join('');
      }
    }
  }]);
  return Pager;
}();
/* global WebsyDesigns Blob */
var WebsyPDFButton = /*#__PURE__*/function () {
  function WebsyPDFButton(elementId, options) {
    _classCallCheck(this, WebsyPDFButton);
    var DEFAULTS = {
      classes: [],
      wait: 0,
      buttonText: 'Download',
      directDownload: false,
      preProcess: function preProcess(callbackFn) {
        return callbackFn(true);
      },
      onError: function onError() {}
    };
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    this.service = new WebsyDesigns.APIService('/pdf');
    var el = document.getElementById(this.elementId);
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      if (options.html) {
        el.innerHTML = options.html;
      } else {
        el.innerHTML = "\n          <!--<form style='display: none;' id='".concat(this.elementId, "_form' action='/pdf' method='POST'>\n            <input id='").concat(this.elementId, "_pdfHeader' value='' name='header'>\n            <input id='").concat(this.elementId, "_pdfHTML' value='' name='html'>\n            <input id='").concat(this.elementId, "_pdfFooter' value='' name='footer'>\n          </form>-->\n          <button class='websy-btn websy-pdf-button ").concat(this.options.classes.join(' '), "'>\n            Create PDF\n            <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                viewBox=\"0 0 184.153 184.153\" style=\"enable-background:new 0 0 184.153 184.153;\" xml:space=\"preserve\">\n              <g>\n                <g>\n                  <g>\n                    <path d=\"M129.318,0H26.06c-1.919,0-3.475,1.554-3.475,3.475v177.203c0,1.92,1.556,3.475,3.475,3.475h132.034\n                      c1.919,0,3.475-1.554,3.475-3.475V34.131C161.568,22.011,140.771,0,129.318,0z M154.62,177.203H29.535V6.949h99.784\n                      c7.803,0,25.301,18.798,25.301,27.182V177.203z\"/>\n                    <path d=\"M71.23,76.441c15.327,0,27.797-12.47,27.797-27.797c0-15.327-12.47-27.797-27.797-27.797\n                      c-15.327,0-27.797,12.47-27.797,27.797C43.433,63.971,55.902,76.441,71.23,76.441z M71.229,27.797\n                      c11.497,0,20.848,9.351,20.848,20.847c0,0.888-0.074,1.758-0.183,2.617l-18.071-2.708L62.505,29.735\n                      C65.162,28.503,68.112,27.797,71.229,27.797z M56.761,33.668l11.951,19.869c0.534,0.889,1.437,1.49,2.462,1.646l18.669,2.799\n                      c-3.433,6.814-10.477,11.51-18.613,11.51c-11.496,0-20.847-9.351-20.847-20.847C50.381,42.767,52.836,37.461,56.761,33.668z\"/>\n                    <rect x=\"46.907\" y=\"90.339\" width=\"73.058\" height=\"6.949\"/>\n                    <rect x=\"46.907\" y=\"107.712\" width=\"48.644\" height=\"6.949\"/>\n                    <rect x=\"46.907\" y=\"125.085\" width=\"62.542\" height=\"6.949\"/>\n                  </g>\n                </g>\n              </g>              \n            </svg>\n          </button>          \n          <div id='").concat(this.elementId, "_loader'></div>\n          <div id='").concat(this.elementId, "_popup'></div>\n        ");
        this.loader = new WebsyDesigns.WebsyLoadingDialog("".concat(this.elementId, "_loader"), {
          classes: ['global-loader']
        });
        this.popup = new WebsyDesigns.WebsyPopupDialog("".concat(this.elementId, "_popup"));
        // const formEl = document.getElementById(`${this.elementId}_form`)
        // if (formEl) {
        //   formEl.addEventListener('load', () => {
        //     this.loader.hide()
        //   })
        // }        
      }
    }
  }
  _createClass(WebsyPDFButton, [{
    key: "handleClick",
    value: function handleClick(event) {
      var _this26 = this;
      if (event.target.classList.contains('websy-pdf-button')) {
        this.loader.show();
        this.options.preProcess(function (proceed) {
          if (proceed === true) {
            setTimeout(function () {
              if (_this26.options.targetId) {
                var el = document.getElementById(_this26.options.targetId);
                if (el) {
                  var pdfData = {
                    options: {}
                  };
                  if (_this26.options.pdfOptions) {
                    pdfData.options = _extends({}, _this26.options.pdfOptions);
                  }
                  if (_this26.options.header) {
                    if (_this26.options.header.elementId) {
                      var headerEl = document.getElementById(_this26.options.header.elementId);
                      if (headerEl) {
                        pdfData.header = headerEl.outerHTML;
                        if (_this26.options.header.css) {
                          pdfData.options.headerCSS = _this26.options.header.css;
                        }
                      }
                    } else if (_this26.options.header.html) {
                      pdfData.header = _this26.options.header.html;
                      if (_this26.options.header.css) {
                        pdfData.options.headerCSS = _this26.options.header.css;
                      }
                    } else {
                      pdfData.header = _this26.options.header;
                    }
                  }
                  if (_this26.options.footer) {
                    if (_this26.options.footer.elementId) {
                      var footerEl = document.getElementById(_this26.options.footer.elementId);
                      if (footerEl) {
                        pdfData.footer = footerEl.outerHTML;
                        if (_this26.options.footer.css) {
                          pdfData.options.footerCSS = _this26.options.footer.css;
                        }
                      }
                    } else {
                      pdfData.footer = _this26.options.footer;
                    }
                  }
                  pdfData.html = el.outerHTML;
                  // document.getElementById(`${this.elementId}_pdfHeader`).value = pdfData.header
                  // document.getElementById(`${this.elementId}_pdfHTML`).value = pdfData.html
                  // document.getElementById(`${this.elementId}_pdfFooter`).value = pdfData.footer
                  // document.getElementById(`${this.elementId}_form`).submit()
                  _this26.service.add('', pdfData, {
                    responseType: 'blob'
                  }).then(function (response) {
                    _this26.loader.hide();
                    var blob = new Blob([response], {
                      type: 'application/pdf'
                    });
                    var msg = "\n                    <div class='text-center websy-pdf-download'>\n                      <div>Your file is ready to download</div>\n                      <a href='".concat(URL.createObjectURL(blob), "' target='_blank'\n                  ");
                    if (_this26.options.directDownload === true) {
                      var fileName;
                      if (typeof _this26.options.fileName === 'function') {
                        fileName = _this26.options.fileName() || 'Export';
                      } else {
                        fileName = _this26.options.fileName || 'Export';
                      }
                      msg += "download=\"".concat(fileName.replace(/'/g, ''), ".pdf\"");
                    }
                    msg += "\n                      >\n                        <button class='websy-btn download-pdf'>".concat(_this26.options.buttonText, "</button>\n                      </a>\n                    </div>\n                  ");
                    _this26.popup.show({
                      message: msg,
                      mask: true
                    });
                  }, function (err) {
                    console.error(err);
                  });
                }
              }
            }, _this26.options.wait);
          } else {
            _this26.loader.hide();
            _this26.options.onError();
          }
        });
      } else if (event.target.classList.contains('download-pdf')) {
        this.popup.hide();
        if (this.options.onClose) {
          this.options.onClose();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      // 
    }
  }]);
  return WebsyPDFButton;
}();
var WebsyPopupDialog = /*#__PURE__*/function () {
  function WebsyPopupDialog(elementId, options) {
    _classCallCheck(this, WebsyPopupDialog);
    this.DEFAULTS = {
      buttons: [],
      classes: [],
      style: ''
    };
    this.options = _extends({}, this.DEFAULTS, options);
    if (!elementId) {
      console.log('No element Id provided for Websy Popup');
      return;
    }
    this.closeOnOutsideClick = true;
    var el = document.getElementById(elementId);
    this.elementId = elementId;
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
    }
  }
  _createClass(WebsyPopupDialog, [{
    key: "hide",
    value: function hide() {
      var el = document.getElementById(this.elementId);
      if (el) {
        el.innerHTML = '';
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('websy-btn')) {
        var buttonIndex = event.target.getAttribute('data-index');
        var buttonInfo = this.options.buttons[buttonIndex];
        if (buttonInfo && buttonInfo.fn) {
          if (typeof this.options.collectData !== 'undefined') {
            var collectEl = document.getElementById("".concat(this.elementId, "_collect"));
            if (collectEl) {
              buttonInfo.collectedData = collectEl.value;
            }
          }
          if (buttonInfo.preventClose !== true) {
            this.hide();
          }
          buttonInfo.fn(buttonInfo);
        } else if (buttonInfo && buttonInfo.preventClose !== true) {
          this.hide();
        }
      } else if (this.closeOnOutsideClick === true) {
        this.hide();
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.elementId) {
        console.log('No element Id provided for Websy Popup');
        return;
      }
      var el = document.getElementById(this.elementId);
      if (el) {
        var html = '';
        if (this.options.mask === true) {
          html += "<div class='websy-mask'></div>";
        }
        html += "\n        <div class='websy-popup-dialog-container'>\n          <div class='websy-popup-dialog ".concat(this.options.classes.join(' '), "' style='").concat(this.options.style, "'>\n      ");
        if (this.options.title) {
          html += "<h1>".concat(this.options.title, "</h1>");
        }
        if (this.options.message) {
          html += "<p>".concat(this.options.message, "</p>");
        }
        if (typeof this.options.collectData !== 'undefined') {
          html += "\n          <div>\n            <input id=\"".concat(this.elementId, "_collect\" class=\"websy-input\" value=\"").concat(typeof this.options.collectData === 'boolean' ? '' : this.options.collectData, "\" placeholder=\"").concat(this.options.collectPlaceholder || '', "\">\n          </div>\n        ");
        }
        this.closeOnOutsideClick = true;
        if (this.options.buttons) {
          if (this.options.allowCloseOnOutsideClick !== true) {
            this.closeOnOutsideClick = false;
          }
          html += "<div class='websy-popup-button-panel'>";
          for (var i = 0; i < this.options.buttons.length; i++) {
            html += "\n            <button class='websy-btn ".concat((this.options.buttons[i].classes || []).join(' '), "' data-index='").concat(i, "'>\n              ").concat(this.options.buttons[i].label, "\n            </button>\n          ");
          }
          html += "</div>";
        }
        html += "\n          </div>\n        </div>\n      ";
        el.innerHTML = html;
      }
    }
  }, {
    key: "show",
    value: function show(options) {
      if (options) {
        this.options = _extends({}, this.DEFAULTS, options);
      }
      this.render();
    }
  }]);
  return WebsyPopupDialog;
}();
var WebsyPubSub = /*#__PURE__*/function () {
  function WebsyPubSub(elementId, options) {
    _classCallCheck(this, WebsyPubSub);
    this.options = _extends({}, options);
    if (!elementId) {
      console.log('No element Id provided');
      return;
    }
    this.elementId = elementId;
    this.subscriptions = {};
  }
  _createClass(WebsyPubSub, [{
    key: "publish",
    value: function publish(id, method, data) {
      if (!this.subscriptions) {
        return;
      }
      if (arguments.length === 3) {
        if (this.subscriptions[id] && this.subscriptions[id][method]) {
          this.subscriptions[id][method](data);
        }
      } else {
        if (this.subscriptions[id]) {
          this.subscriptions[id].forEach(function (fn) {
            fn(method);
          });
        }
      }
    }
  }, {
    key: "subscribe",
    value: function subscribe(id, method, fn) {
      if (!this.subscriptions) {
        this.subscriptions = {};
      }
      if (arguments.length === 3) {
        if (!this.subscriptions[id]) {
          this.subscriptions[id] = {};
        }
        if (!this.subscriptions[id][method]) {
          this.subscriptions[id][method] = fn;
        }
      } else {
        if (!this.subscriptions[id]) {
          this.subscriptions[id] = [];
        }
        this.subscriptions[id].push(method);
      }
    }
  }]);
  return WebsyPubSub;
}();
var ResponsiveText = /*#__PURE__*/function () {
  function ResponsiveText(elementId, options) {
    var _this27 = this;
    _classCallCheck(this, ResponsiveText);
    var DEFAULTS = {
      textAlign: 'center',
      verticalAlign: 'flex-end',
      wrapText: false
    };
    this.options = _extends({}, DEFAULTS, options);
    this.elementId = elementId;
    this.canvas = document.createElement('canvas');
    window.addEventListener('resize', function () {
      return _this27.render();
    });
    var el = document.getElementById(this.elementId);
    if (el) {
      this.render();
    }
  }
  _createClass(ResponsiveText, [{
    key: "css",
    value: function css(element, property) {
      return window.getComputedStyle(element, null).getPropertyValue(property);
    }
  }, {
    key: "render",
    value: function render(text) {
      if (typeof text !== 'undefined') {
        this.options.text = text;
      }
      if (this.options.text) {
        var wrappingRequired = false;
        var el = document.getElementById(this.elementId);
        var cx = this.canvas.getContext('2d');
        var f = 0;
        var fits = false;
        // let el = document.getElementById(`${layout.qInfo.qId}_responsiveInner`)
        var height = el.clientHeight;
        if (typeof this.options.maxHeight === 'string' && this.options.maxHeight.indexOf('%') !== -1) {
          var p = +this.options.maxHeight.replace('%', '');
          if (!isNaN(p)) {
            this.options.maxHeight = Math.floor(height * (p / 100));
          }
        } else if (typeof this.options.maxHeight === 'string' && this.options.maxHeight.indexOf('px') !== -1) {
          this.options.maxHeight = +this.options.maxHeight.replace('px', '');
        }
        if (typeof this.options.minHeight === 'string' && this.options.minHeight.indexOf('%') !== -1) {
          var _p = +this.options.minHeight.replace('%', '');
          if (!isNaN(_p)) {
            this.options.minHeight = Math.floor(height * (_p / 100));
          }
        } else if (typeof this.options.minHeight === 'string' && this.options.minHeight.indexOf('px') !== -1) {
          this.options.minHeight = +this.options.minHeight.replace('px', '');
        }
        var fontFamily = this.css(el, 'font-family');
        var fontWeight = this.css(el, 'font-weight');
        var allowedWidth = el.clientWidth;
        if (allowedWidth === 0) {
          // check for a max-width property
          if (el.style.maxWidth && el.style.maxWidth !== 'auto') {
            if (el.parentElement.clientWidth > 0) {
              var calc = el.style.maxWidth;
              if (calc.indexOf('calc') !== -1) {
                // this logic currently only handles calc statements using % and px
                // and only + or - formulas
                calc = calc.replace('calc(', '').replace(')', '');
                calc = calc.split(' ');
                if (calc[0].indexOf('px') !== -1) {
                  allowedWidth = calc[0].replace('px', '');
                } else if (calc[0].indexOf('%') !== -1) {
                  allowedWidth = el.parentElement.clientWidth * (+calc[0].replace('%', '') / 100);
                }
                if (calc[2] && calc[4]) {
                  // this means we have an operator and a second value
                  // handle -
                  if (calc[2] === '-') {
                    if (calc[4].indexOf('px') !== -1) {
                      allowedWidth -= +calc[4].replace('px', '');
                    }
                  }
                  if (calc[2] === '+') {
                    if (calc[4].indexOf('px') !== -1) {
                      allowedWidth += +calc[4].replace('px', '');
                    }
                  }
                }
              } else if (calc.indexOf('px') !== -1) {
                allowedWidth = +calc.replace('px', '');
              } else if (calc.indexOf('%') !== -1) {
                allowedWidth = el.parentElement.clientWidth * (+calc.replace('%', '') / 100);
              }
            }
          }
        }
        // console.log('max height', this.options.maxHeight);
        var innerElHeight = el.clientHeight;
        while (fits === false) {
          f++;
          cx.font = "".concat(fontWeight, " ").concat(f, "px ").concat(fontFamily);
          var measurements = cx.measureText(this.options.text);
          // add support for safari where some elements end up with zero height
          if (navigator.userAgent.indexOf('Safari') !== -1) {
            // get the closest parent that has a height
            var heightFound = false;
            var currEl = el;
            while (heightFound === false) {
              if (currEl.clientHeight > 0) {
                innerElHeight = currEl.clientHeight;
                heightFound = true;
              } else if (currEl.parentNode) {
                currEl = currEl.parentNode;
              } else {
                // prevent the loop from running indefinitely
                heightFound = true;
              }
            }
          }
          if (typeof this.options.maxHeight !== 'undefined' && f === this.options.maxHeight) {
            f = this.options.maxHeight;
            height = measurements.actualBoundingBoxAscent;
            fits = true;
          } else if (measurements.width > allowedWidth || measurements.actualBoundingBoxAscent >= innerElHeight) {
            f--;
            height = measurements.actualBoundingBoxAscent;
            fits = true;
          }
        }
        if (this.options.minHeight === '') {
          this.options.minHeight = undefined;
        }
        if (typeof this.options.minHeight !== 'undefined') {
          if (this.options.minHeight > f && this.options.wrapText === true) {
            // we run the process again but this time separating the words onto separate lines
            // this currently only supports wrapping onto 2 lines          
            wrappingRequired = true;
            fits = false;
            f = this.options.minHeight;
            var spaceCount = this.options.text.match(/ /g);
            if (spaceCount && spaceCount.length > 0) {
              spaceCount = spaceCount.length;
              var words = this.options.text.split(' ');
              while (fits === false) {
                f++;
                cx.font = "".concat(fontWeight, " ").concat(f, "px ").concat(fontFamily);
                for (var i = spaceCount; i > 0; i--) {
                  var fitsCount = 0;
                  var lines = [words.slice(0, i).join(' '), words.slice(i, words.length).join(' ')];
                  var longestLine = lines.reduce(function (a, b) {
                    return a.length > b.length ? a : b;
                  }, '');
                  // lines.forEach(l => {
                  var _measurements = cx.measureText(longestLine);
                  // add support for safari where some elements end up with zero height
                  if (navigator.userAgent.indexOf('Safari') !== -1) {
                    // get the closest parent that has a height
                    var _heightFound = false;
                    var _currEl = el;
                    while (_heightFound === false) {
                      if (_currEl.clientHeight > 0) {
                        innerElHeight = _currEl.clientHeight;
                        _heightFound = true;
                      } else if (_currEl.parentNode) {
                        _currEl = _currEl.parentNode;
                      } else {
                        // prevent the loop from running indefinitely
                        _heightFound = true;
                      }
                    }
                  }
                  if (typeof this.options.maxHeight !== 'undefined' && f === this.options.maxHeight) {
                    f = this.options.maxHeight;
                    height = _measurements.actualBoundingBoxAscent;
                    fits = true;
                    break;
                  } else if (_measurements.width > allowedWidth || _measurements.actualBoundingBoxAscent >= innerElHeight / 2 * 0.75) {
                    f--;
                    height = _measurements.actualBoundingBoxAscent;
                    fits = true;
                    break;
                  }
                  // })
                }
              }
            }

            if (typeof this.options.minHeight !== 'undefined' && this.options.minHeight > f) {
              f = this.options.minHeight;
            }
          } else if (this.options.minHeight > f) {
            f = this.options.minHeight;
          }
        }
        var spanHeight = Math.min(innerElHeight, height);
        el.innerHTML = "\n        <div \n          class='websy-responsive-text' \n          style='\n            justify-content: ".concat(this.options.verticalAlign, ";\n            font-size: ").concat(f, "px;\n            font-weight: ").concat(fontWeight || 'normal', ";\n          '\n        >  \n          <span\n            style='\n              white-space: ").concat(this.options.wrapText === true ? 'normal' : 'nowrap', ";\n              height: ").concat(Math.floor(wrappingRequired === true ? spanHeight * (1 * 1 / 3) * 2 : spanHeight), "px;\n              line-height: ").concat(Math.ceil(wrappingRequired === true ? f * 1.2 : spanHeight), "px;\n              justify-content: ").concat(this.options.textAlign, ";\n              text-align: ").concat(this.options.textAlign, ";\n            '\n          >").concat(this.options.text, "</span>\n        </div>\n      ");
      }
    }
  }]);
  return ResponsiveText;
}();
/* global WebsyDesigns */
var WebsyResultList = /*#__PURE__*/function () {
  function WebsyResultList(elementId, options) {
    var _this28 = this;
    _classCallCheck(this, WebsyResultList);
    var DEFAULTS = {
      listeners: {
        click: {}
      }
    };
    this.options = _extends({}, DEFAULTS, options);
    this.elementId = elementId;
    this.rows = this.options.data || [];
    this.apiService = new WebsyDesigns.APIService('/api');
    this.templateService = new WebsyDesigns.APIService('');
    this.activeTemplate = '';
    if (!elementId) {
      console.log('No element Id provided for Websy Search List');
      return;
    }
    var el = document.getElementById(elementId);
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      el.addEventListener('change', this.handleChange.bind(this));
      el.addEventListener('keyup', this.handleKeyUp.bind(this));
      el.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
    if (_typeof(options.template) === 'object' && options.template.url) {
      this.templateService.get(options.template.url).then(function (templateString) {
        _this28.options.template = templateString;
        _this28.render();
      });
    } else {
      this.render();
    }
  }
  _createClass(WebsyResultList, [{
    key: "appendData",
    value: function appendData(d) {
      var startIndex = this.rows.length;
      this.rows = this.rows.concat(d);
      this.activeTemplate = this.options.template;
      var html = this.buildHTML(d, startIndex);
      var el = document.getElementById(this.elementId);
      el.innerHTML += html.replace(/\n/g, '');
      if (this.options.onAppend) {
        this.options.onAppend();
      }
    }
  }, {
    key: "buildHTML",
    value: function buildHTML() {
      var _this29 = this;
      var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var inputTemplate = arguments.length > 2 ? arguments[2] : undefined;
      var locator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var html = "";
      if (this.options.template) {
        if (d.length > 0) {
          d.forEach(function (row, ix) {
            var template = "".concat(ix > 0 ? '-->' : '').concat(inputTemplate || _this29.options.template).concat(ix < d.length - 1 ? '<!--' : '');
            // find conditional elements
            var ifMatches = _toConsumableArray(template.matchAll(/<\s*if[^>]*>([\s\S]*?)<\s*\/\s*if>/g));
            ifMatches.forEach(function (m) {
              // get the condition
              if (m[0] && m.index > -1) {
                var conditionMatch = m[0].match(/(\scondition=["|']\w.+)["|']/g);
                if (conditionMatch && conditionMatch[0]) {
                  var c = conditionMatch[0].trim().replace('condition=', '');
                  if (c.split('')[0] === '"') {
                    c = c.replace(/"/g, '');
                  } else if (c.split('')[0] === '\'') {
                    c = c.replace(/'/g, '');
                  }
                  var parts = [];
                  var polarity = true;
                  if (c.indexOf('===') !== -1) {
                    parts = c.split('===');
                  } else if (c.indexOf('!==') !== -1) {
                    parts = c.split('!==');
                    polarity = false;
                  } else if (c.indexOf('==') !== -1) {
                    parts = c.split('==');
                  } else if (c.indexOf('!=') !== -1) {
                    parts = c.split('!=');
                    polarity = false;
                  }
                  var removeAll = true;
                  if (parts.length === 2) {
                    if (!isNaN(parts[1])) {
                      parts[1] = +parts[1];
                    }
                    if (parts[1] === 'true') {
                      parts[1] = true;
                    }
                    if (parts[1] === 'false') {
                      parts[1] = false;
                    }
                    if (typeof parts[1] === 'string') {
                      if (parts[1].indexOf('"') !== -1) {
                        parts[1] = parts[1].replace(/"/g, '');
                      } else if (parts[1].indexOf('\'') !== -1) {
                        parts[1] = parts[1].replace(/'/g, '');
                      }
                    }
                    if (polarity === true) {
                      if (typeof row[parts[0]] !== 'undefined' && row[parts[0]] === parts[1]) {
                        // remove the <if> tags
                        removeAll = false;
                      } else if (parts[0] === parts[1]) {
                        removeAll = false;
                      }
                    } else if (polarity === false) {
                      if (typeof row[parts[0]] !== 'undefined' && row[parts[0]] !== parts[1]) {
                        // remove the <if> tags
                        removeAll = false;
                      }
                    }
                  }
                  if (removeAll === true) {
                    // remove the whole markup                
                    template = template.replace(m[0], '');
                  } else {
                    // remove the <if> tags
                    var newMarkup = m[0];
                    newMarkup = newMarkup.replace('</if>', '').replace(/<\s*if[^>]*>/g, '');
                    template = template.replace(m[0], newMarkup);
                  }
                }
              }
            });
            var forMatches = _toConsumableArray(template.matchAll(/<\s*for[^>]*>([\s\S]*?)<\s*\/\s*for>/g));
            forMatches.forEach(function (m) {
              var itemsMatch = m[0].match(/(items=["|']\w.+)["|']/g);
              var forMarkup = m[0].match(/<\s*for[^>]*>/);
              var withoutFor = m[0].replace(forMarkup, '').replace('</for>', '').replace(/<\s*for[^>]*>/g, '');
              if (itemsMatch && itemsMatch[0]) {
                var c = itemsMatch[0].trim().replace('items=', '');
                if (c.split('')[0] === '"') {
                  c = c.replace(/"/g, '');
                } else if (c.split('')[0] === '\'') {
                  c = c.replace(/'/g, '');
                }
                var items = row;
                var parts = c.split('.');
                parts.forEach(function (p) {
                  items = items[p];
                });
                template = template.replace(m[0], _this29.buildHTML(items, 0, withoutFor, [].concat(_toConsumableArray(locator), ["".concat(startIndex + ix, ":").concat(c)])));
              }
            });
            var tagMatches = _toConsumableArray(template.matchAll(/(\sdata-event=["|']\w.+)["|']/g));
            tagMatches.forEach(function (m) {
              if (m[0] && m.index > -1) {
                template = template.replace(m[0], "".concat(m[0], " data-id=").concat(startIndex + ix, " data-locator='").concat(locator.join(';'), "'"));
              }
            });
            var flatRow = _this29.flattenObject(row);
            for (var key in flatRow) {
              var rg = new RegExp("{".concat(key, "}"), 'gm');
              template = template.replace(rg, flatRow[key] || '');
            }
            template = template.replace(/\{(.*?)\}/g, '');
            html += template;
          });
        } else if (this.options.noRowsHTML) {
          html += this.options.noRowsHTML;
        }
      }
      return html;
    }
  }, {
    key: "data",
    get: function get() {
      return this.rows;
    },
    set: function set(d) {
      this.rows = d || [];
      this.render();
    }
  }, {
    key: "findById",
    value: function findById(id) {
      for (var i = 0; i < this.rows.length; i++) {
        if (this.rows[i].id === id) {
          return this.rows[i];
        }
      }
      return null;
    }
  }, {
    key: "flattenObject",
    value: function flattenObject(obj) {
      var toReturn = {};
      for (var i in obj) {
        if (!obj.hasOwnProperty(i)) {
          continue;
        }
        if (_typeof(obj[i]) === 'object') {
          var flatObject = this.flattenObject(obj[i]);
          for (var x in flatObject) {
            if (!flatObject.hasOwnProperty(x)) {
              continue;
            }
            toReturn[i + '.' + x] = flatObject[x];
          }
        } else {
          toReturn[i] = obj[i];
        }
      }
      return JSON.parse(JSON.stringify(toReturn));
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('clickable')) {
        this.handleEvent(event, 'clickable', 'click');
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      this.handleEvent(event, 'keyable', 'change');
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event) {
      this.handleEvent(event, 'keyable', 'keyup');
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      this.handleEvent(event, 'keyable', 'keydown');
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event, eventType, action) {
      var l = event.target.getAttribute('data-event');
      if (l) {
        l = l.split('(');
        var params = [];
        var id = event.target.getAttribute('data-id');
        var locator = event.target.getAttribute('data-locator');
        if (l[1]) {
          l[1] = l[1].replace(')', '');
          params = l[1].split(',');
        }
        l = l[0];
        var data = this.rows;
        if (locator !== '') {
          var locatorItems = locator.split(';');
          locatorItems.forEach(function (loc) {
            var locatorParts = loc.split(':');
            if (data[locatorParts[0]]) {
              data = data[locatorParts[0]];
              var parts = locatorParts[1].split('.');
              parts.forEach(function (p) {
                data = data[p];
              });
            }
          });
        }
        params = params.map(function (p) {
          if (typeof p !== 'string' && typeof p !== 'number') {
            if (data[+id]) {
              p = data[+id][p];
            }
          } else if (typeof p === 'string') {
            p = p.replace(/"/g, '').replace(/'/g, '');
          }
          return p;
        });
        if (event.target.classList.contains(eventType) && this.options.listeners[action] && this.options.listeners[action][l]) {
          var _this$options$listene;
          event.stopPropagation();
          (_this$options$listene = this.options.listeners[action][l]).call.apply(_this$options$listene, [this, event, data[+id]].concat(_toConsumableArray(params)));
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this30 = this;
      if (this.options.entity) {
        var url = this.options.entity;
        if (this.options.sortField) {
          url += (url.indexOf('?') === -1 ? '?' : '&') + "by=".concat(this.options.sortField, "&order=").concat(this.options.sortOrder || 'ASC');
        }
        this.apiService.get(url).then(function (results) {
          _this30.rows = results.rows;
          _this30.resize();
        });
      } else {
        this.resize();
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      var html = this.buildHTML(this.rows);
      var el = document.getElementById(this.elementId);
      el.innerHTML = html.replace(/\n/g, '');
      if (this.options.onResize) {
        this.options.onResize();
      }
    }
  }]);
  return WebsyResultList;
}();
/* 
  global
  history
  WebsyDesigns
*/
var WebsyRouter = /*#__PURE__*/function () {
  function WebsyRouter(options) {
    _classCallCheck(this, WebsyRouter);
    var defaults = {
      triggerClass: 'websy-trigger',
      triggerToggleClass: 'websy-trigger-toggle',
      viewClass: 'websy-view',
      activeClass: 'active',
      viewAttribute: 'data-view',
      groupAttribute: 'data-group',
      parentAttribute: 'data-parent',
      defaultView: '',
      defaultGroup: 'main',
      subscribers: {
        show: [],
        hide: []
      },
      persistentParameters: false,
      fieldValueSeparator: ':',
      views: {}
    };
    this.apiService = new WebsyDesigns.APIService('');
    this.triggerIdList = [];
    this.viewIdList = [];
    this.previousPath = '';
    this.previousView = '';
    this.currentView = '';
    this.currentViewMain = '';
    this.currentParams = {
      path: '',
      items: {}
    };
    this.previousParams = {
      path: '',
      items: {}
    };
    this.controlPressed = false;
    this.usesHTMLSuffix = window.location.pathname.indexOf('.htm') !== -1;
    window.addEventListener('popstate', this.onPopState.bind(this));
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
    window.addEventListener('focus', this.handleFocus.bind(this));
    window.addEventListener('click', this.handleClick.bind(this));
    this.options = _extends({}, defaults, options);
    if (this.options.onShow) {
      this.on('show', this.options.onShow);
    }
    if (this.options.onHide) {
      this.on('hide', this.options.onHide);
    }
    // this.init()
  }
  _createClass(WebsyRouter, [{
    key: "addGroup",
    value: function addGroup(group) {
      var _this31 = this;
      if (!this.groups[group]) {
        var els = document.querySelectorAll(".".concat(this.options.viewClass, "[data-group=\"").concat(group, "\"]"));
        if (els) {
          this.getClosestParent(els[0], function (parent) {
            _this31.groups[group] = {
              activeView: '',
              views: [],
              parent: parent.getAttribute('data-view')
            };
          });
        }
      }
    }
  }, {
    key: "getClosestParent",
    value: function getClosestParent(el, callbackFn) {
      if (el && el.parentElement) {
        if (el.parentElement.attributes['data-view'] || el.tagName === 'BODY') {
          callbackFn(el.parentElement);
        } else {
          this.getClosestParent(el.parentElement, callbackFn);
        }
      }
    }
  }, {
    key: "addUrlParams",
    value: function addUrlParams(params) {
      var reloadView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var noHistory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (typeof params === 'undefined') {
        return;
      }
      if (reloadView === false) {
        this.previousParams = _extends({}, this.currentParams);
      }
      var output = {
        path: '',
        items: {}
      };
      var path = '';
      if (this.currentParams && this.currentParams.items) {
        output.items = _extends({}, this.currentParams.items, params);
        path = this.buildUrlPath(output.items);
      } else if (Object.keys(params).length > 0) {
        output.items = _extends({}, params);
        path = this.buildUrlPath(output.items);
      }
      output.path = path;
      if (reloadView === false) {
        this.currentParams = output;
      }
      var inputPath = this.currentView;
      if (this.options.urlPrefix) {
        inputPath = "/".concat(this.options.urlPrefix, "/").concat(inputPath);
      }
      // history.pushState({
      //   inputPath
      // }, 'unused', `${inputPath}?${path}`) 
      if (reloadView === true) {
        // this.showView(this.currentView, this.currentParams, 'main')
        this.navigate("".concat(inputPath, "?").concat(path), 'main', null, noHistory);
      } else {
        this.updateHistory(inputPath, !noHistory, true);
      }
    }
  }, {
    key: "removeUrlParams",
    value: function removeUrlParams() {
      var _this32 = this;
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var reloadView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var noHistory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      this.previousParams = _extends({}, this.currentParams);
      var path = '';
      if (this.currentParams && this.currentParams.items) {
        params.forEach(function (p) {
          delete _this32.currentParams.items[p];
        });
        path = this.buildUrlPath(this.currentParams.items);
      }
      var inputPath = this.currentView;
      if (this.options.urlPrefix) {
        inputPath = "/".concat(this.options.urlPrefix, "/").concat(inputPath);
      }
      if (reloadView === true) {
        // this.showView(this.currentView, this.currentParams, 'main')
        this.navigate("".concat(inputPath, "?").concat(path), 'main', null, noHistory);
      } else if (noHistory === false) {
        this.currentParams = {
          items: this.currentParams.items,
          path: path
        };
        this.updateHistory(inputPath, !noHistory, true);
      }
    }
  }, {
    key: "removeAllUrlParams",
    value: function removeAllUrlParams() {
      var reloadView = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var noHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      // const output = {
      //   path: '',
      //   items: {}
      // }
      // this.currentParams = output
      var inputPath = this.currentView;
      if (this.options.urlPrefix) {
        inputPath = "/".concat(this.options.urlPrefix, "/").concat(inputPath);
      }
      this.currentParams = {
        path: '',
        items: {}
      };
      if (reloadView === true) {
        this.navigate("".concat(inputPath), 'main', null, noHistory);
      } else {
        this.updateHistory(inputPath, !noHistory, true);
      }
    }
  }, {
    key: "buildUrlPath",
    value: function buildUrlPath(params) {
      var path = [];
      for (var key in params) {
        path.push("".concat(key, "=").concat(params[key]));
      }
      return path.join('&');
    }
  }, {
    key: "checkChildGroups",
    value: function checkChildGroups(parent) {
      if (!this.groups) {
        this.groups = {};
      }
      var parentEl = document.querySelector(".".concat(this.options.viewClass, "[data-view=\"").concat(parent, "\"]"));
      if (parentEl) {
        var els = parentEl.querySelectorAll(".".concat(this.options.viewClass, "[data-group]"));
        for (var i = 0; i < els.length; i++) {
          var g = els[i].getAttribute('data-group');
          var v = els[i].getAttribute('data-view');
          if (!this.groups[g]) {
            this.addGroup(g);
          }
          if (els[i].classList.contains(this.options.activeClass)) {
            this.groups[g].activeView = v;
          }
          if (this.groups[g].views.indexOf(v) === -1) {
            this.groups[g].views.push(v);
          }
        }
      }
    }
  }, {
    key: "formatParams",
    value: function formatParams(params) {
      this.previousParams = _extends({}, this.currentParams);
      var output = {
        path: params,
        items: {}
      };
      if (typeof params === 'undefined') {
        return;
      }
      var parts = params.split('&');
      for (var i = 0; i < parts.length; i++) {
        var bits = parts[i].split('=');
        if (bits[0] && bits[0] !== '' && bits[1] && bits[1] !== '') {
          output.items[bits[0]] = bits[1];
        }
      }
      this.currentParams = output;
      return output;
    }
  }, {
    key: "generateId",
    value: function generateId(item) {
      var chars = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
      var value = [];
      var len = chars.length;
      for (var i = 0; i < 6; i++) {
        var rnd = Math.floor(Math.random() * 62);
        value.push(chars[rnd]);
      }
      return "".concat(item, "_").concat(value.join(''));
    }
  }, {
    key: "getActiveViewsFromParent",
    value: function getActiveViewsFromParent(parent) {
      var views = [];
      this.checkChildGroups(parent);
      for (var g in this.groups) {
        if (this.groups[g].parent === parent) {
          if (this.groups[g].activeView) {
            views.push({
              view: this.groups[g].activeView,
              group: g
            });
          }
          // else {
          //   views.push({view: this.groups[g].views[0], group: g})
          // }        
        }
      }

      return views;
    }
  }, {
    key: "getParamValues",
    value: function getParamValues(param) {
      var output = [];
      if (this.currentParams && this.currentParams.items && this.currentParams.items[param] && this.currentParams.items[param] !== '') {
        return this.currentParams.items[param].split('|').map(function (d) {
          return decodeURI(d);
        });
      }
      return output;
    }
  }, {
    key: "getAPIQuery",
    value: function getAPIQuery() {
      var ignoredParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      if (this.currentParams && this.currentParams.items) {
        var query = [];
        for (var key in this.currentParams.items) {
          if (ignoredParams.indexOf(key) === -1) {
            query.push("".concat(key).concat(this.options.fieldValueSeparator).concat(this.currentParams.items[key]));
          }
        }
        return query;
      }
      return [];
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      // const id = event.target.id        
      if (event.target.classList.contains(this.options.triggerClass)) {
        var view = event.target.getAttribute(this.options.viewAttribute);
        var group = event.target.getAttribute(this.options.groupAttribute);
        this.navigate(view, group || 'main', event);
      }
    }
  }, {
    key: "init",
    value: function init() {
      // this.registerElements(document)
      var view = '';
      var params = this.formatParams(this.queryParams);
      var url;
      if (this.currentPath === '' && this.options.defaultView !== '') {
        view = this.options.defaultView;
      } else if (this.currentPath !== '') {
        view = this.currentPath;
      }
      url = view;
      if (typeof params !== 'undefined') {
        url += "?".concat(params.path);
      }
      this.navigate(url);
      // this.currentView = view
      // this.currentViewMain = view
      // if (this.currentView === '/' || this.currentView === '') {
      //   this.currentView = this.options.defaultView
      // }
      // if (this.currentViewMain === '/' || this.currentViewMain === '') {
      //   this.currentViewMain = this.options.defaultView
      // }    
      // if (view !== '') {
      //   this.showView(view, params, 'main')      
      // }
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(event) {
      this.controlPressed = false;
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      switch (event.key) {
        case 'Control':
        case 'Meta':
          this.controlPressed = true;
          break;
      }
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event) {
      this.controlPressed = false;
    }
  }, {
    key: "hideChildren",
    value: function hideChildren(view, group) {
      var children = this.getActiveViewsFromParent(view);
      for (var c = 0; c < children.length; c++) {
        this.hideTriggerItems(children[c].view, group);
        this.hideViewItems(children[c].view, group);
        this.publish('hide', [children[c].view]);
      }
    }
  }, {
    key: "hideView",
    value: function hideView(view, group) {
      if (view === '/' || view === '') {
        view = this.options.defaultView;
      }
      this.hideChildren(view, group);
      if (this.previousView !== this.currentView || group !== this.options.defaultGroup) {
        this.hideTriggerItems(view, group);
        this.hideViewItems(view, group);
        this.publish('hide', [view]);
        if (this.options.views && this.options.views[view]) {
          this.options.views[view].components.forEach(function (c) {
            if (typeof c.instance !== 'undefined') {
              if (c.instance.close) {
                c.instance.close();
              }
            }
          });
        }
      }
      // else if (group !== this.options.defaultGroup) {
      //   this.hideTriggerItems(view, group)
      //   this.hideViewItems(view, group)
      //   this.publish('hide', [view])
      // }    
    }
    // registerElements (root) {
    //   if (root.nodeName === '#document') {
    //     this.groups = {}  
    //   }    
    //   let triggerItems = root.getElementsByClassName(this.options.triggerClass)
    //   for (let i = 0; i < triggerItems.length; i++) {
    //     if (!triggerItems[i].id) {
    //       triggerItems[i].id = this.generateId('trigger')
    //     }
    //     if (this.triggerIdList.indexOf(triggerItems[i].id) !== -1) {
    //       continue
    //     }
    //     this.triggerIdList.push(triggerItems[i].id)
    //     // get the view for each item
    //     let viewAttr = triggerItems[i].attributes[this.options.viewAttribute]
    //     if (viewAttr && viewAttr.value !== '') {
    //       // check to see if the item belongs to a group
    //       // use the group to add an additional class to the item
    //       // this combines the triggerClass and groupAttr properties
    //       let groupAttr = triggerItems[i].attributes[this.options.groupAttribute]
    //       let group = this.options.defaultGroup
    //       if (groupAttr && groupAttr.value !== '') {
    //         // if no group is found, assign it to the default group
    //         group = groupAttr.value
    //       }
    //       let parentAttr = triggerItems[i].attributes[this.options.parentAttribute]
    //       if (parentAttr && parentAttr.value !== '') {
    //         triggerItems[i].classList.add(`parent-${parentAttr.value}`)
    //       }
    //       triggerItems[i].classList.add(`${this.options.triggerClass}-${group}`)        
    //     }
    //   }
    //   // Assign group class to views
    //   let viewItems = root.getElementsByClassName(this.options.viewClass)
    //   for (let i = 0; i < viewItems.length; i++) {
    //     let groupAttr = viewItems[i].attributes[this.options.groupAttribute]
    //     let viewAttr = viewItems[i].attributes[this.options.viewAttribute]
    //     if (!groupAttr || groupAttr.value === '') {
    //       // if no group is found, assign it to the default group
    //       viewItems[i].classList.add(`${this.options.viewClass}-${this.options.defaultGroup}`)
    //     }
    //     else {
    //       this.addGroup(groupAttr.value)
    //       if (viewItems[i].classList.contains(this.options.activeClass)) {
    //         this.groups[groupAttr.value].activeView = viewAttr.value
    //       }
    //       viewItems[i].classList.add(`${this.options.viewClass}-${groupAttr.value}`)
    //     }
    //     let parentAttr = viewItems[i].attributes[this.options.parentAttribute]
    //     if (parentAttr && parentAttr.value !== '') {
    //       viewItems[i].classList.add(`parent-${parentAttr.value}`)
    //       if (groupAttr && groupAttr.value !== '' && this.groups[groupAttr.value]) {
    //         this.groups[groupAttr.value].parent = parentAttr.value
    //       }
    //     }
    //   }
    // }
  }, {
    key: "prepComponent",
    value: function prepComponent(elementId, options) {
      var el = document.getElementById("".concat(elementId, "_content"));
      if (el) {
        return '';
      }
      var html = "\n      <article id='".concat(elementId, "_content' class='websy-content-article'></article>\n      <div id='").concat(elementId, "_loading' class='websy-loading-container'><div class='websy-ripple'><div></div><div></div></div></div>\n    ");
      if (options && options.help && options.help !== '') {
        html += "\n        <Help not yet supported>\n      ";
      }
      if (options && options.tooltip && options.tooltip.value && options.tooltip.value !== '') {
        html += "\n          <div class=\"websy-info ".concat(this.options.tooltip.classes.join(' ') || '', "\" data-info=\"").concat(this.options.tooltip.value, "\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 512 512\"><title>ionicons-v5-e</title><path d=\"M256,56C145.72,56,56,145.72,56,256s89.72,200,200,200,200-89.72,200-200S366.28,56,256,56Zm0,82a26,26,0,1,1-26,26A26,26,0,0,1,256,138Zm48,226H216a16,16,0,0,1,0-32h28V244H228a16,16,0,0,1,0-32h32a16,16,0,0,1,16,16V332h28a16,16,0,0,1,0,32Z\"/></svg>\n          </div>   \n        ");
      }
      el = document.getElementById(elementId);
      if (el) {
        el.innerHTML = html;
      }
    }
  }, {
    key: "showComponents",
    value: function showComponents(view) {
      var _this33 = this;
      if (this.options.views && this.options.views[view] && this.options.views[view].components) {
        this.options.views[view].components.forEach(function (c) {
          if (typeof c.instance === 'undefined') {
            _this33.prepComponent(c.elementId, c.options);
            c.instance = new c.Component(c.elementId, c.options);
          } else if (c.instance.render) {
            c.instance.render();
          }
        });
      }
    }
  }, {
    key: "preloadView",
    value: function preloadView(view, callbackFn) {
      if (this.options.views[view].load) {
        this.options.views[view].load(callbackFn);
      } else if (callbackFn) {
        callbackFn();
      }
    }
  }, {
    key: "initView",
    value: function initView(view) {
      var _this34 = this;
      return new Promise(function (resolve, reject) {
        if (!_this34.options.views[view]) {
          _this34.options.views[view] = {
            components: []
          };
        }
        if (_this34.options.views[view].ready === true) {
          resolve();
        } else if (_this34.options.views[view].template) {
          _this34.preloadView(view, function () {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var viewEl = document.querySelector("[data-view='".concat(view, "'].").concat(_this34.options.viewClass));
            if (viewEl) {
              _this34.options.views[view].templateInstance = new WebsyDesigns.Template(viewEl, {
                template: _this34.options.views[view].template,
                data: data,
                readyCallbackFn: function readyCallbackFn() {
                  _this34.options.views[view].ready = true;
                  resolve();
                }
              });
            } else {
              console.log("No view element found for '".concat(view, "' to render template"));
              _this34.options.views[view].ready = true;
              resolve();
            }
          });
        } else if (_this34.options.views[view].ready !== true && _this34.options.views[view].load) {
          _this34.preloadView(view, function () {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            _this34.options.views[view].ready = true;
            resolve();
          });
        } else {
          _this34.options.views[view].ready = true;
          resolve();
        }
      });
    }
  }, {
    key: "showView",
    value: function showView(view, params, group) {
      var _this35 = this;
      if (view === '/' || view === '') {
        view = this.options.defaultView || '';
      }
      this.initView(view).then(function () {
        _this35.activateItem(view, _this35.options.triggerClass);
        _this35.activateItem(view, _this35.options.viewClass);
        var children = _this35.getActiveViewsFromParent(view);
        for (var c = 0; c < children.length; c++) {
          _this35.activateItem(children[c].view, _this35.options.triggerClass);
          _this35.activateItem(children[c].view, _this35.options.viewClass);
          _this35.showComponents(children[c].view);
          if (children[c].show) {
            children[c].show.call(children[c]);
          }
          _this35.publish('show', [children[c].view, null, group]);
        }
        if (_this35.previousView !== _this35.currentView || group !== 'main') {
          _this35.showComponents(view);
          if (_this35.options.views[view].show) {
            _this35.options.views[view].show.call(_this35.options.views[view]);
          }
          _this35.publish('show', [view, params, group]);
        } else if (_this35.previousView === _this35.currentView && _this35.previousParams.path !== _this35.currentParams.path) {
          _this35.showComponents(view);
          if (_this35.options.views[view].show) {
            _this35.options.views[view].show.call(_this35.options.views[view]);
          }
          _this35.publish('show', [view, params, group]);
        }
      });
    }
  }, {
    key: "reloadCurrentView",
    value: function reloadCurrentView() {
      this.showView(this.currentView, this.currentParams, 'main');
    }
  }, {
    key: "navigate",
    value: function navigate(inputPath) {
      var group = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'main';
      var event = arguments.length > 2 ? arguments[2] : undefined;
      var popped = arguments.length > 3 ? arguments[3] : undefined;
      if (inputPath.indexOf('http') === 0) {
        window.open(inputPath, '_blank');
        return;
      }
      if (typeof popped === 'undefined') {
        popped = false;
      }
      this.popped = popped;
      var toggle = false;
      var noInputParams = inputPath.indexOf('?') === -1;
      var groupActiveView;
      var params = {};
      var newPath = inputPath;
      if (inputPath.split('?')[0] === this.options.defaultView && this.usesHTMLSuffix === false) {
        inputPath = inputPath.replace(this.options.defaultView, '/');
      }
      if (this.options.persistentParameters === true) {
        if (inputPath.indexOf('?') === -1 && this.queryParams) {
          inputPath += "?".concat(this.queryParams);
        }
      }
      if (this.usesHTMLSuffix === true) {
        if (inputPath.indexOf('?') === -1) {
          inputPath = "?view=".concat(inputPath);
        } else if (inputPath.indexOf('view=') === -1) {
          inputPath = "&view=".concat(inputPath);
        }
      }
      var previousParamsPath = this.currentParams.path;
      if (this.controlPressed === true && group === this.options.defaultGroup) {
        // Open the path in a new browser tab
        window.open("".concat(window.location.origin, "/").concat(inputPath), '_blank');
        return;
      }
      if (inputPath.indexOf('?') !== -1 && group === this.options.defaultGroup) {
        var parts = inputPath.split('?');
        params = this.formatParams(parts[1]);
        inputPath = parts[0];
      } else if (group === this.options.defaultGroup) {
        this.previousParams = _extends({}, this.currentParams);
        this.currentParams = {
          path: '',
          items: {}
        };
      }
      if (event) {
        if (event.target && event.target.classList.contains(this.options.triggerToggleClass)) {
          toggle = true;
        } else if (typeof event === 'boolean') {
          toggle = event;
        }
      }
      if (!this.groups) {
        this.groups = {};
      }
      if (!this.groups[group]) {
        this.addGroup(group);
      }
      if (toggle === true && this.groups[group].activeView !== '') {
        newPath = inputPath === this.groups[group].activeView ? '' : inputPath;
      }
      this.previousView = this.currentView;
      this.previousPath = this.currentPath;
      if (this.groups[group]) {
        if (toggle === false) {
          groupActiveView = this.groups[group].activeView;
        }
        this.previousPath = this.groups[group].activeView;
      }
      if (group && this.groups[group] && group !== this.options.defaultGroup) {
        this.groups[group].activeView = newPath;
      }
      if (toggle === false && group === 'main') {
        this.currentView = inputPath;
      }
      if (group === 'main') {
        this.currentViewMain = inputPath;
      }
      if (this.currentView === '/') {
        this.currentView = this.options.defaultView;
      }
      if (this.currentViewMain === '/') {
        this.currentViewMain = this.options.defaultView;
      }
      if (toggle === true) {
        if (this.previousPath !== '') {
          this.hideView(this.previousPath, group);
        }
      } else if (group === this.options.defaultGroup) {
        this.hideView(this.previousView, group);
      } else {
        this.hideView(this.previousPath, group);
      }
      if (toggle === true && newPath === groupActiveView) {
        return;
      }
      if (this.usesHTMLSuffix === true) {
        inputPath = window.location.pathname.split('/').pop() + inputPath;
      }
      if ((this.currentPath !== inputPath || previousParamsPath !== this.currentParams.path) && group === this.options.defaultGroup) {
        var historyUrl = inputPath;
        this.updateHistory(historyUrl, popped);
      }
      if (toggle === false) {
        this.showView(newPath.split('?')[0], this.currentParams, group);
      } else if (newPath && newPath !== '') {
        this.showView(newPath, null, group);
      }
    }
  }, {
    key: "on",
    value: function on(event, fn) {
      this.options.subscribers[event].push(fn);
    }
  }, {
    key: "onPopState",
    value: function onPopState(event) {
      if (event.state) {
        var url;
        if (event.state.url) {
          url = event.state.url;
        } else {
          url = event.state.inputPath;
          if (url.indexOf(this.options.urlPrefix) !== -1) {
            url = url.replace("/".concat(this.options.urlPrefix, "/"), '');
          }
        }
        this.navigate(url, 'main', null, true);
      } else {
        this.navigate(this.options.defaultView || '/', 'main', null, true);
      }
    }
  }, {
    key: "publish",
    value: function publish(event, params) {
      this.options.subscribers[event].forEach(function (item) {
        item.apply(null, params);
      });
    }
  }, {
    key: "updateHistory",
    value: function updateHistory(historyUrl) {
      var replaceState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var overridePersistent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (this.options.urlPrefix) {
        historyUrl = historyUrl === '/' ? '' : "/".concat(historyUrl);
        historyUrl = "/".concat(this.options.urlPrefix).concat(historyUrl).replace(/\/\//g, '/');
      }
      if (this.currentParams && this.currentParams.path || overridePersistent === true) {
        historyUrl += "?".concat(this.currentParams.path);
      } else if (this.queryParams && this.options.persistentParameters === true) {
        historyUrl += "?".concat(this.queryParams);
      }
      if (replaceState === false) {
        history.pushState({
          inputPath: historyUrl
        }, 'unused', historyUrl);
      } else {
        history.replaceState({
          inputPath: historyUrl
        }, 'unused', historyUrl);
      }
    }
  }, {
    key: "subscribe",
    value: function subscribe(event, fn) {
      this.options.subscribers[event].push(fn);
    }
  }, {
    key: "currentPath",
    get: function get() {
      var path = window.location.pathname.split('/').pop();
      if (path.indexOf('.htm') !== -1) {
        return '';
      }
      if (this.options.urlPrefix && path === this.options.urlPrefix) {
        return '';
      }
      return path;
    }
  }, {
    key: "queryParams",
    get: function get() {
      if (window.location.search.length > 1) {
        return window.location.search.substring(1);
      }
      return '';
    }
  }, {
    key: "hideTriggerItems",
    value: function hideTriggerItems(view, group) {
      this.hideItems(this.options.triggerClass, group);
    }
  }, {
    key: "hideViewItems",
    value: function hideViewItems(view, group) {
      this.hideItems(view, group);
    }
  }, {
    key: "hideItems",
    value: function hideItems(view, group) {
      var els;
      if (group && group !== 'main') {
        els = _toConsumableArray(document.querySelectorAll("[".concat(this.options.groupAttribute, "='").concat(group, "']")));
      } else {
        els = _toConsumableArray(document.querySelectorAll("[".concat(this.options.viewAttribute, "='").concat(view, "']")));
      }
      if (els) {
        for (var i = 0; i < els.length; i++) {
          els[i].classList.remove(this.options.activeClass);
        }
      }
    }
  }, {
    key: "activateItem",
    value: function activateItem(path, className) {
      var els = document.getElementsByClassName(className);
      if (els) {
        for (var i = 0; i < els.length; i++) {
          if (els[i].attributes[this.options.viewAttribute] && els[i].attributes[this.options.viewAttribute].value === path) {
            els[i].classList.add(this.options.activeClass);
            break;
          }
        }
      }
    }
  }]);
  return WebsyRouter;
}();
/* global */
var Switch = /*#__PURE__*/function () {
  function Switch(elementId, options) {
    _classCallCheck(this, Switch);
    this.elementId = elementId;
    var DEFAULTS = {
      enabled: false
    };
    this.options = _extends({}, DEFAULTS, options);
    var el = document.getElementById(this.elementId);
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      this.render();
    }
  }
  _createClass(Switch, [{
    key: "data",
    get: function get() {
      return this.options.enabled;
    },
    set: function set(d) {
      this.options.enabled = d;
    }
  }, {
    key: "disable",
    value: function disable() {
      this.options.enabled = false;
      var method = this.options.enabled === true ? 'add' : 'remove';
      var el = document.getElementById("".concat(this.elementId, "_switch"));
      el.classList[method]('enabled');
      if (this.options.onToggle) {
        this.options.onToggle(this.options.enabled);
      }
    }
  }, {
    key: "enable",
    value: function enable() {
      this.options.enabled = true;
      var method = this.options.enabled === true ? 'add' : 'remove';
      var el = document.getElementById("".concat(this.elementId, "_switch"));
      el.classList[method]('enabled');
      if (this.options.onToggle) {
        this.options.onToggle(this.options.enabled);
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      this.options.enabled = !this.options.enabled;
      var method = this.options.enabled === true ? 'add' : 'remove';
      var el = document.getElementById("".concat(this.elementId, "_switch"));
      el.classList[method]('enabled');
      if (this.options.onToggle) {
        this.options.onToggle(this.options.enabled);
      }
    }
  }, {
    key: "on",
    value: function on(event, fn) {
      if (!this.options.subscribers[event]) {
        this.options.subscribers[event] = [];
      }
      this.options.subscribers[event].push(fn);
    }
  }, {
    key: "publish",
    value: function publish(event, params) {
      this.options.subscribers[event].forEach(function (item) {
        item.apply(null, params);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var el = document.getElementById(this.elementId);
      if (el) {
        el.innerHTML = "\n        <div class=\"websy-switch-container\">\n          <div class=\"websy-switch-label\">".concat(this.options.label || '', "</div>\n          <div id=\"").concat(this.elementId, "_switch\" class=\"websy-switch ").concat(this.options.enabled === true ? 'enabled' : '', "\"></div>      \n        </div>\n      ");
      }
    }
  }]);
  return Switch;
}();
/* global WebsyDesigns */
var WebsyTemplate = /*#__PURE__*/function () {
  function WebsyTemplate(elementId, options) {
    var _this36 = this;
    _classCallCheck(this, WebsyTemplate);
    var DEFAULTS = {
      listeners: {
        click: {}
      }
    };
    this.options = _extends({}, DEFAULTS, options);
    if (_typeof(elementId) === 'object') {
      if (elementId.id) {
        this.elementId = elementId.id;
      } else {
        elementId.id = WebsyDesigns.Utils.createIdentity();
        this.elementId = elementId.id;
      }
    } else {
      this.elementId = elementId;
    }
    this.templateService = new WebsyDesigns.APIService('');
    if (!elementId) {
      console.log('No element Id provided for Websy Template');
      return;
    }
    var el = document.getElementById(elementId);
    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
    }
    if (_typeof(options.template) === 'object' && options.template.url) {
      this.templateService.get(options.template.url).then(function (templateString) {
        _this36.options.template = templateString;
        _this36.render();
      });
    } else {
      this.render();
    }
  }
  _createClass(WebsyTemplate, [{
    key: "buildHTML",
    value: function buildHTML() {
      var _this37 = this;
      var html = "";
      if (this.options.template) {
        var template = this.options.template;
        // find conditional elements
        var ifMatches = _toConsumableArray(template.matchAll(/<\s*if[^>]*>([\s\S]*?)<\s*\/\s*if>/g));
        ifMatches.forEach(function (m) {
          // get the condition
          if (m[0] && m.index > -1) {
            var conditionMatch = m[0].match(/(\scondition=["|']\w.+)["|']/g);
            if (conditionMatch && conditionMatch[0]) {
              var c = conditionMatch[0].trim().replace('condition=', '');
              if (c.split('')[0] === '"') {
                c = c.replace(/"/g, '');
              } else if (c.split('')[0] === '\'') {
                c = c.replace(/'/g, '');
              }
              var parts = [];
              var polarity = true;
              if (c.indexOf('===') !== -1) {
                parts = c.split('===');
              } else if (c.indexOf('!==') !== -1) {
                parts = c.split('!==');
                polarity = false;
              } else if (c.indexOf('==') !== -1) {
                parts = c.split('==');
              } else if (c.indexOf('!=') !== -1) {
                parts = c.split('!=');
                polarity = false;
              }
              var removeAll = true;
              if (parts.length === 2) {
                if (!isNaN(parts[1])) {
                  parts[1] = +parts[1];
                }
                if (parts[1] === 'true') {
                  parts[1] = true;
                }
                if (parts[1] === 'false') {
                  parts[1] = false;
                }
                if (typeof parts[1] === 'string') {
                  if (parts[1].indexOf('"') !== -1) {
                    parts[1] = parts[1].replace(/"/g, '');
                  } else if (parts[1].indexOf('\'') !== -1) {
                    parts[1] = parts[1].replace(/'/g, '');
                  }
                }
                if (polarity === true) {
                  if (typeof _this37.options.data[parts[0]] !== 'undefined' && _this37.options.data[parts[0]] === parts[1]) {
                    // remove the <if> tags
                    removeAll = false;
                  } else if (parts[0] === parts[1]) {
                    removeAll = false;
                  }
                } else if (polarity === false) {
                  if (typeof _this37.options.data[parts[0]] !== 'undefined' && _this37.options.data[parts[0]] !== parts[1]) {
                    // remove the <if> tags
                    removeAll = false;
                  }
                }
              }
              if (removeAll === true) {
                // remove the whole markup                
                template = template.replace(m[0], '');
              } else {
                // remove the <if> tags
                var newMarkup = m[0];
                newMarkup = newMarkup.replace('</if>', '').replace(/<\s*if[^>]*>/g, '');
                template = template.replace(m[0], newMarkup);
              }
            }
          }
        });
        var tagMatches = _toConsumableArray(template.matchAll(/(\sdata-event=["|']\w.+)["|']/g));
        tagMatches.forEach(function (m) {
          if (m[0] && m.index > -1) {
            template = template.replace(m[0], "".concat(m[0]));
          }
        });
        for (var key in this.options.data) {
          var rg = new RegExp("{".concat(key, "}"), 'gm');
          if (rg) {
            template = template.replace(rg, this.options.data[key]);
          }
        }
        html = template;
      }
      return html;
    }
  }, {
    key: "data",
    set: function set(d) {
      this.options.data = d;
      this.render();
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('clickable')) {
        this.handleEvent(event, 'clickable', 'click');
      }
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event, eventType, action) {
      var l = event.target.getAttribute('data-event');
      if (l) {
        l = l.split('(');
        var params = [];
        var id = event.target.getAttribute('data-id');
        // const locator = event.target.getAttribute('data-locator')
        // if (l[1]) {
        //   l[1] = l[1].replace(')', '')
        //   params = l[1].split(',')      
        // }
        // l = l[0]
        var data = this.options.data;
        // if (locator !== '') {
        //   let locatorItems = locator.split(';')
        //   locatorItems.forEach(loc => {
        //     let locatorParts = loc.split(':')
        //     if (data[locatorParts[0]]) {
        //       data = data[locatorParts[0]]
        //       let parts = locatorParts[1].split('.')
        //       parts.forEach(p => {
        //         data = data[p]
        //       })              
        //     }
        //   })
        // }
        // params = params.map(p => {
        //   if (typeof p !== 'string' && typeof p !== 'number') {
        //     if (data[+id]) {
        //       p = data[+id][p]
        //     }
        //   }
        //   else if (typeof p === 'string') {
        //     p = p.replace(/"/g, '').replace(/'/g, '')
        //   }
        //   return p
        // })
        if (event.target.classList.contains(eventType) && this.options.listeners[action] && this.options.listeners[action][l]) {
          var _this$options$listene2;
          event.stopPropagation();
          (_this$options$listene2 = this.options.listeners[action][l]).call.apply(_this$options$listene2, [this, event, data[+id]].concat(params));
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      this.resize();
    }
  }, {
    key: "resize",
    value: function resize() {
      var html = this.buildHTML();
      var el = document.getElementById(this.elementId);
      el.innerHTML = html.replace(/\n/g, '');
      if (this.options.readyCallbackFn) {
        this.options.readyCallbackFn();
      }
    }
  }]);
  return WebsyTemplate;
}();
var WebsyUtils = {
  createIdentity: function createIdentity() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 6;
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < size; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },
  getElementPos: function getElementPos(el) {
    var rect = el.getBoundingClientRect();
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top,
      // + scrollTop,
      left: rect.left,
      // + scrollLeft,
      // bottom: rect.top + scrollTop + el.clientHeight,
      bottom: rect.top + el.clientHeight,
      // right: rect.left + scrollLeft + el.clientWidth,
      right: rect.left + el.clientWidth,
      width: rect.width,
      height: rect.height
    };
  },
  getLightDark: function getLightDark(backgroundColor) {
    var darkColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#000000';
    var lightColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#ffffff';
    var colorParts;
    var red = 0;
    var green = 0;
    var blue = 0;
    var alpha = 1;
    if (backgroundColor.indexOf('#') !== -1) {
      // hex color
      backgroundColor = backgroundColor.replace('#', '');
      colorParts = backgroundColor;
      colorParts = colorParts.split('');
      red = parseInt(colorParts[0] + colorParts[1], 16);
      green = parseInt(colorParts[2] + colorParts[3], 16);
      blue = parseInt(colorParts[4] + colorParts[5], 16);
    } else if (backgroundColor.toLowerCase().indexOf('rgb') !== -1) {
      // rgb color
      colorParts = backgroundColor.replace(/rgba\(/gi, '').replace(/\)/gi, '');
      colorParts = colorParts.replace(/rgb\(/gi, '');
      colorParts = colorParts.split(',');
      red = colorParts[0];
      green = colorParts[1];
      blue = colorParts[2];
      alpha = colorParts[3] || 1;
    }
    return (red * 0.299 + green * 0.587 + blue * 0.114) / alpha > 186 ? darkColor : lightColor;
  },
  measureText: function measureText(text) {
    var rotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var fontSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '12px';
    if (!isNaN(fontSize)) {
      fontSize = "".concat(fontSize, "px");
    }
    var html = "<div style='display: inline-block; width: auto; font-size: ".concat(fontSize, "'>").concat(text, "</div>");
    var el = document.createElement('div');
    el.style.position = 'absolute';
    el.style.visibility = 'hidden';
    el.style.transform = "rotate(".concat(rotation, "deg)");
    el.innerHTML = html;
    document.body.appendChild(el);
    var w = el.getBoundingClientRect();
    el.remove();
    return w;
  },
  parseUrlParams: function parseUrlParams() {
    var queryString = window.location.search.replace('?', '');
    var params = {};
    var parts = queryString.split('&');
    for (var i = 0; i < parts.length; i++) {
      var keyValue = parts[i].split('=');
      params[keyValue[0]] = keyValue[1];
    }
    return params;
  },
  buildUrlParams: function buildUrlParams(params) {
    var out = [];
    for (var key in params) {
      out.push("".concat(key, "=").concat(params[key]));
    }
    return out.join('&');
  },
  fromQlikDate: function fromQlikDate(d) {
    var output = new Date(Math.round((d - 25569) * 86400000));
    output.setTime(output.getTime() + output.getTimezoneOffset() * 60000);
    return output;
  },
  toReduced: function toReduced(v) {
    var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var isPercentage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var test = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var control = arguments.length > 4 ? arguments[4] : undefined;
    var ranges = [{
      divider: 1e18,
      suffix: 'E'
    }, {
      divider: 1e15,
      suffix: 'P'
    }, {
      divider: 1e12,
      suffix: 'T'
    }, {
      divider: 1e9,
      suffix: 'G'
    }, {
      divider: 1e6,
      suffix: 'M'
    }, {
      divider: 1e3,
      suffix: 'K'
    }];
    var numOut;
    var divider;
    var suffix = '';
    if (control) {
      var settings = getDivider(control);
      divider = settings.divider;
      suffix = settings.suffix;
    }
    if (v === 0) {
      numOut = 0;
    } else if (control) {
      numOut = v / divider; // .toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$100,')
    } else if (v < 1000 && v % 1 === 0) {
      numOut = v;
      // decimals = 0
    } else {
      numOut = v;
      for (var i = 0; i < ranges.length; i++) {
        if (v >= ranges[i].divider) {
          numOut = v / ranges[i].divider; // .toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$100,')
          suffix = ranges[i].suffix;
          break;
        }
        // else if (isPercentage === true) {
        //   numOut = (this * 100).toFixed(decimals)
        // }
        // else {
        //   numOut = (this).toFixed(decimals)
        // }
      }
    }

    if (isPercentage === true) {
      numOut = numOut * 100;
    }
    if (numOut % 1 > 0) {
      decimals = 1;
    }
    if (numOut < 1 && decimals === 0) {
      decimals = getZeroDecimals(numOut);
    }
    numOut = (+numOut).toFixed(decimals);
    if (test === true) {
      return numOut;
    }
    if (numOut.replace) {
      numOut = numOut.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    function getDivider(n) {
      var s = '';
      var d = 1;
      // let out
      for (var _i8 = 0; _i8 < ranges.length; _i8++) {
        if (n >= ranges[_i8].divider) {
          d = ranges[_i8].divider;
          s = ranges[_i8].suffix;
          // out = (n / ranges[i].divider).toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$100,')                
          break;
        }
      }
      return {
        divider: d,
        suffix: s
      };
    }
    function getZeroDecimals(n) {
      var d = 0;
      n = Math.abs(n);
      if (n === 0) {
        return 0;
      }
      while (n < 10) {
        d++;
        n = n * 10;
      }
      return d;
    }
    return "".concat(numOut).concat(suffix).concat(isPercentage === true ? '%' : '');
  },
  toQlikDateNum: function toQlikDateNum(d) {
    return Math.floor(d.getTime() / 86400000 + 25570);
  },
  toQlikDate: function toQlikDate(d) {
    return Math.floor(d.getTime() / 86400000 + 25570);
  }
};

/* global WebsyDesigns */
var WebsyTable = /*#__PURE__*/function () {
  function WebsyTable(elementId, options) {
    var _this38 = this;
    _classCallCheck(this, WebsyTable);
    var DEFAULTS = {
      pageSize: 20,
      paging: 'scroll'
    };
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    this.rowCount = 0;
    this.busy = false;
    this.tooltipTimeoutFn = null;
    this.data = [];
    this._isRendered = false;
    var el = document.getElementById(this.elementId);
    if (el) {
      var html = "\n        <div id='".concat(this.elementId, "_tableContainer' class='websy-vis-table ").concat(this.options.paging === 'pages' ? 'with-paging' : '', "'>\n          <!--<div class=\"download-button\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z\"/></svg>\n          </div>-->\n          <table>\n            <thead id=\"").concat(this.elementId, "_head\">\n            </thead>\n            <tbody id=\"").concat(this.elementId, "_body\">\n            </tbody>\n            <tfoot id=\"").concat(this.elementId, "_foot\">\n            </tfoot>\n          </table>      \n          <div id=\"").concat(this.elementId, "_errorContainer\" class='websy-vis-error-container'>\n            <div>\n              <div id=\"").concat(this.elementId, "_errorTitle\"></div>\n              <div id=\"").concat(this.elementId, "_errorMessage\"></div>\n            </div>            \n          </div>\n          <div id=\"").concat(this.elementId, "_loadingContainer\"></div>\n        </div>\n      ");
      if (this.options.paging === 'pages') {
        html += "\n          <div class=\"websy-table-paging-container\">\n            Show <div id=\"".concat(this.elementId, "_pageSizeSelector\" class=\"websy-vis-page-selector\"></div> rows\n            <ul id=\"").concat(this.elementId, "_pageList\" class=\"websy-vis-page-list\"></ul>\n          </div>\n        ");
      }
      var pageOptions = [10, 20, 50, 100, 200];
      el.innerHTML = html;
      if (this.options.paging === 'pages') {
        this.pageSizeSelector = new WebsyDesigns.Dropdown("".concat(this.elementId, "_pageSizeSelector"), {
          selectedItems: [pageOptions.indexOf(this.options.pageSize)],
          items: pageOptions.map(function (p) {
            return {
              label: p.toString(),
              value: p
            };
          }),
          allowClear: false,
          disableSearch: true,
          onItemSelected: function onItemSelected(selectedItem) {
            if (_this38.options.onChangePageSize) {
              _this38.options.onChangePageSize(selectedItem.value);
            }
          }
        });
      }
      el.addEventListener('click', this.handleClick.bind(this));
      el.addEventListener('mouseout', this.handleMouseOut.bind(this));
      el.addEventListener('mousemove', this.handleMouseMove.bind(this));
      var scrollEl = document.getElementById("".concat(this.elementId, "_tableContainer"));
      scrollEl.addEventListener('scroll', this.handleScroll.bind(this));
      this.loadingDialog = new WebsyDesigns.LoadingDialog("".concat(this.elementId, "_loadingContainer"));
      this.render();
    } else {
      console.error("No element found with ID ".concat(this.elementId));
    }
  }
  _createClass(WebsyTable, [{
    key: "isRendered",
    get: function get() {
      return this._isRendered;
    }
  }, {
    key: "appendRows",
    value: function appendRows(data) {
      var _this39 = this;
      this._isRendered = false;
      this.hideError();
      var bodyHTML = '';
      if (data) {
        bodyHTML += data.map(function (r, rowIndex) {
          return '<tr>' + r.map(function (c, i) {
            if (_this39.options.columns[i].show !== false) {
              var style = '';
              if (c.style) {
                style += c.style;
              }
              if (_this39.options.columns[i].width) {
                style += "width: ".concat(_this39.options.columns[i].width, "; ");
              }
              if (c.backgroundColor) {
                style += "background-color: ".concat(c.backgroundColor, "; ");
                if (!c.color) {
                  style += "color: ".concat(WebsyDesigns.Utils.getLightDark(c.backgroundColor), "; ");
                }
              }
              if (c.color) {
                style += "color: ".concat(c.color, "; ");
              }
              if (_this39.options.columns[i].showAsLink === true && c.value.trim() !== '') {
                return "\n                <td \n                  data-row-index='".concat(_this39.rowCount + rowIndex, "' \n                  data-col-index='").concat(i, "' \n                  class='").concat(_this39.options.columns[i].classes || '', "' \n                  style='").concat(style, "'\n                  colspan='").concat(c.colspan || 1, "'\n                  rowspan='").concat(c.rowspan || 1, "'\n                >\n                  <a href='").concat(c.value, "' target='").concat(_this39.options.columns[i].openInNewTab === true ? '_blank' : '_self', "'>").concat(c.displayText || _this39.options.columns[i].linkText || c.value, "</a>\n                </td>\n              ");
              } else if ((_this39.options.columns[i].showAsNavigatorLink === true || _this39.options.columns[i].showAsRouterLink === true) && c.value.trim() !== '') {
                return "\n                <td \n                  data-view='".concat(c.value, "' \n                  data-row-index='").concat(_this39.rowCount + rowIndex, "' \n                  data-col-index='").concat(i, "' \n                  class='websy-trigger trigger-item ").concat(_this39.options.columns[i].clickable === true ? 'clickable' : '', " ").concat(_this39.options.columns[i].classes || '', "' \n                  style='").concat(style, "'\n                  colspan='").concat(c.colspan || 1, "'\n                  rowspan='").concat(c.rowspan || 1, "'\n                >").concat(c.displayText || _this39.options.columns[i].linkText || c.value, "</td>\n              ");
              } else {
                var info = c.value;
                if (_this39.options.columns[i].showAsImage === true) {
                  c.value = "\n                  <img src='".concat(c.value, "'>\n                ");
                }
                var html = "\n                <td \n              ";
                if (!_this39.options.columns[i].showAsImage && c.value && c.value.indexOf && c.value.indexOf('<svg') === -1 && c.value.indexOf('<img') === -1) {
                  html += "\n                  data-info='".concat(info, "'\n                ");
                }
                html += "\n                  data-row-index='".concat(_this39.rowCount + rowIndex, "' \n                  data-col-index='").concat(i, "' \n                  class='").concat(_this39.options.columns[i].classes || '', "' \n                  style='").concat(style, "'\n                  colspan='").concat(c.colspan || 1, "'\n                  rowspan='").concat(c.rowspan || 1, "'\n                >").concat(c.value, "</td>\n              ");
                return html;
              }
            }
          }).join('') + '</tr>';
        }).join('');
        this.data = this.data.concat(data);
        this.rowCount = this.data.length;
      }
      var bodyEl = document.getElementById("".concat(this.elementId, "_body"));
      bodyEl.innerHTML += bodyHTML;
      this._isRendered = true;
    }
  }, {
    key: "buildSearchIcon",
    value: function buildSearchIcon(field) {
      return "\n      <div>\n        <svg\n          class=\"tableSearchIcon\"\n          data-field=\"".concat(field, "\"\n          xmlns=\"http://www.w3.org/2000/svg\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\"\n        >\n          <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n          <path d=\"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z\"/>\n        </svg>\n      </div>\n    ");
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('download-button')) {
        window.viewManager.dataExportController.exportData(this.options.model);
      }
      if (event.target.classList.contains('sortable-column')) {
        var colIndex = +event.target.getAttribute('data-index');
        var column = this.options.columns[colIndex];
        if (this.options.onSort) {
          this.options.onSort(event, column, colIndex);
        } else {
          this.internalSort(column, colIndex);
        }
        // const colIndex = +event.target.getAttribute('data-index')
        // const dimIndex = +event.target.getAttribute('data-dim-index')
        // const expIndex = +event.target.getAttribute('data-exp-index')
        // const reverse = event.target.getAttribute('data-reverse') === 'true'
        // const patchDefs = [{
        //   qOp: 'replace',
        //   qPath: '/qHyperCubeDef/qInterColumnSortOrder',
        //   qValue: JSON.stringify([colIndex])
        // }]
        // patchDefs.push({
        //   qOp: 'replace',
        //   qPath: `/qHyperCubeDef/${dimIndex > -1 ? 'qDimensions' : 'qMeasures'}/${dimIndex > -1 ? dimIndex : expIndex}/qDef/qReverseSort`,
        //   qValue: JSON.stringify(reverse)
        // })
        // this.options.model.applyPatches(patchDefs) // .then(() => this.render())
      } else if (event.target.classList.contains('tableSearchIcon')) {
        var field = event.target.getAttribute('data-field');
        window.viewManager.views.global.objects[1].instance.show(field, {
          x: event.pageX,
          y: event.pageY
        }, function () {
          event.target.classList.remove('active');
        });
      }
      // else if (event.target.classList.contains('clickable')) {
      //   const colIndex = +event.target.getAttribute('data-col-index')
      //   const rowIndex = +event.target.getAttribute('data-row-index')
      //   if (this.options.onClick) {
      //     this.options.onClick(event, this.data[rowIndex][colIndex], this.data[rowIndex], this.options.columns[colIndex])
      //   }      
      // }
      else if (event.target.classList.contains('websy-page-num')) {
        var pageNum = +event.target.getAttribute('data-page');
        if (this.options.onSetPage) {
          this.options.onSetPage(pageNum);
        }
      } else {
        var _colIndex = +event.target.getAttribute('data-col-index');
        var rowIndex = +event.target.getAttribute('data-row-index');
        if (this.options.onClick) {
          this.options.onClick(event, {
            cell: this.data[rowIndex][_colIndex],
            row: this.data[rowIndex],
            column: this.options.columns[_colIndex],
            colIndex: _colIndex,
            rowIndex: rowIndex
          });
        }
      }
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      if (this.tooltipTimeoutFn) {
        event.target.classList.remove('websy-delayed-info');
        clearTimeout(this.tooltipTimeoutFn);
      }
      if (event.target.tagName === 'TD') {
        this.tooltipTimeoutFn = setTimeout(function () {
          event.target.classList.add('websy-delayed-info');
        }, 500);
      }
    }
  }, {
    key: "handleMouseOut",
    value: function handleMouseOut(event) {
      if (this.tooltipTimeoutFn) {
        event.target.classList.remove('websy-delayed-info');
        clearTimeout(this.tooltipTimeoutFn);
      }
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(event) {
      if (this.options.onScroll && this.options.paging === 'scroll') {
        this.options.onScroll(event);
      }
    }
  }, {
    key: "hideError",
    value: function hideError() {
      var containerEl = document.getElementById("".concat(this.elementId, "_errorContainer"));
      if (containerEl) {
        containerEl.classList.remove('active');
      }
    }
  }, {
    key: "hideLoading",
    value: function hideLoading() {
      this.loadingDialog && this.loadingDialog.hide();
    }
  }, {
    key: "internalSort",
    value: function internalSort(column, colIndex) {
      this.options.columns.forEach(function (c, i) {
        c.activeSort = i === colIndex;
      });
      if (column.sortFunction) {
        this.data = column.sortFunction(this.data, column);
      } else {
        var sortProp = 'value';
        var sortOrder = column.sort === 'asc' ? 'desc' : 'asc';
        column.sort = sortOrder;
        var sortType = column.sortType || 'alphanumeric';
        if (column.sortProp) {
          sortProp = column.sortProp;
        }
        this.data.sort(function (a, b) {
          switch (sortType) {
            case 'numeric':
              if (sortOrder === 'asc') {
                return a[colIndex][sortProp] - b[colIndex][sortProp];
              } else {
                return b[colIndex][sortProp] - a[colIndex][sortProp];
              }
            default:
              if (sortOrder === 'asc') {
                return a[colIndex][sortProp] > b[colIndex][sortProp] ? 1 : -1;
              } else {
                return a[colIndex][sortProp] < b[colIndex][sortProp] ? 1 : -1;
              }
          }
        });
      }
      this.render(this.data);
    }
  }, {
    key: "render",
    value: function render(data) {
      var _this40 = this;
      this._isRendered = false;
      if (!this.options.columns) {
        return;
      }
      this.hideError();
      this.data = [];
      this.rowCount = 0;
      var bodyEl = document.getElementById("".concat(this.elementId, "_body"));
      bodyEl.innerHTML = '';
      if (this.options.allowDownload === true) {
        // doesn't do anything yet
        var el = document.getElementById(this.elementId);
        if (el) {
          el.classList.add('allow-download');
        } else {
          el.classList.remove('allow-download');
        }
      }
      var headHTML = '<tr>' + this.options.columns.map(function (c, i) {
        if (c.show !== false) {
          var style = '';
          if (c.style) {
            style += c.style;
          }
          if (c.width) {
            style += "width: ".concat(c.width || 'auto', ";");
          }
          return "\n        <th style=\"".concat(style, "\">\n          <div class =\"tableHeader\">\n            <div class=\"leftSection\">\n              <div\n                class=\"tableHeaderField ").concat(['asc', 'desc'].indexOf(c.sort) !== -1 ? 'sortable-column' : '', "\"\n                data-index=\"").concat(i, "\"                \n                data-sort=\"").concat(c.sort, "\"                \n              >\n                ").concat(c.name, "\n              </div>\n            </div>\n            <div class=\"").concat(c.activeSort ? c.sort + ' sortOrder' : '', "\"></div>\n            <!--").concat(c.searchable === true ? _this40.buildSearchIcon(c.qGroupFieldDefs[0]) : '', "-->\n          </div>\n        </th>\n        ");
        }
      }).join('') + '</tr>';
      var headEl = document.getElementById("".concat(this.elementId, "_head"));
      headEl.innerHTML = headHTML;
      // let footHTML = '<tr>' + this.options.columns.map((c, i) => {
      //   if (c.show !== false) {
      //     return `
      //       <th></th>
      //     `
      //   }
      // }).join('') + '</tr>'
      // const footEl = document.getElementById(`${this.elementId}_foot`)
      // footEl.innerHTML = footHTML
      if (this.options.paging === 'pages') {
        var pagingEl = document.getElementById("".concat(this.elementId, "_pageList"));
        if (pagingEl) {
          var pages = new Array(this.options.pageCount).fill('').map(function (item, index) {
            return "<li data-page=\"".concat(index, "\" class=\"websy-page-num ").concat(_this40.options.pageNum === index ? 'active' : '', "\">").concat(index + 1, "</li>");
          });
          var startIndex = 0;
          if (this.options.pageCount > 8) {
            startIndex = Math.max(0, this.options.pageNum - 4);
            pages = pages.splice(startIndex, 10);
            if (startIndex > 0) {
              pages.splice(0, 0, "<li>Page&nbsp;</li><li data-page=\"0\" class=\"websy-page-num\">First</li><li>...</li>");
            } else {
              pages.splice(0, 0, '<li>Page&nbsp;</li>');
            }
            if (this.options.pageNum < this.options.pageCount - 1) {
              pages.push('<li>...</li>');
              pages.push("<li data-page=\"".concat(this.options.pageCount - 1, "\" class=\"websy-page-num\">Last</li>"));
            }
          }
          pagingEl.innerHTML = pages.join('');
        }
      }
      if (data) {
        // this.data = this.data.concat(data)
        this.appendRows(data);
      }
    }
  }, {
    key: "showError",
    value: function showError(options) {
      var containerEl = document.getElementById("".concat(this.elementId, "_errorContainer"));
      if (containerEl) {
        containerEl.classList.add('active');
      }
      if (options.title) {
        var titleEl = document.getElementById("".concat(this.elementId, "_errorTitle"));
        if (titleEl) {
          titleEl.innerHTML = options.title;
        }
      }
      if (options.message) {
        var messageEl = document.getElementById("".concat(this.elementId, "_errorTitle"));
        if (messageEl) {
          messageEl.innerHTML = options.message;
        }
      }
      this._isRendered = true;
    }
  }, {
    key: "showLoading",
    value: function showLoading(options) {
      this.loadingDialog && this.loadingDialog.show(options);
    }
  }]);
  return WebsyTable;
}();
/* global WebsyDesigns */
var WebsyTable2 = /*#__PURE__*/function () {
  function WebsyTable2(elementId, options) {
    var _this41 = this;
    _classCallCheck(this, WebsyTable2);
    var DEFAULTS = {
      pageSize: 20,
      paging: 'scroll',
      cellSize: 35,
      virtualScroll: false,
      leftColumns: 0
    };
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    this.rowCount = 0;
    this.busy = false;
    this.tooltipTimeoutFn = null;
    this.data = [];
    var el = document.getElementById(this.elementId);
    if (el) {
      var html = "\n        <div id='".concat(this.elementId, "_tableContainer' class='websy-vis-table ").concat(this.options.paging === 'pages' ? 'with-paging' : '', " ").concat(this.options.virtualScroll === true ? 'with-virtual-scroll' : '', "'>\n          <!--<div class=\"download-button\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z\"/></svg>\n          </div>-->\n          <table id=\"").concat(this.elementId, "_table\">            \n            <thead id=\"").concat(this.elementId, "_head\">\n            </thead>\n            <tbody id=\"").concat(this.elementId, "_body\">\n            </tbody>\n            <tfoot id=\"").concat(this.elementId, "_foot\">\n            </tfoot>\n          </table>      \n          <div id=\"").concat(this.elementId, "_errorContainer\" class='websy-vis-error-container'>\n            <div>\n              <div id=\"").concat(this.elementId, "_errorTitle\"></div>\n              <div id=\"").concat(this.elementId, "_errorMessage\"></div>\n            </div>            \n          </div>\n          <div id=\"").concat(this.elementId, "_vScrollContainer\" class=\"websy-v-scroll-container\">\n            <div id=\"").concat(this.elementId, "_vScrollHandle\" class=\"websy-scroll-handle websy-scroll-handle-y\"></div>\n          </div>\n          <div id=\"").concat(this.elementId, "_hScrollContainer\" class=\"websy-h-scroll-container\">\n            <div id=\"").concat(this.elementId, "_hScrollHandle\" class=\"websy-scroll-handle websy-scroll-handle-x\"></div>\n          </div>\n          <div id=\"").concat(this.elementId, "_dropdownContainer\"></div>\n          <div id=\"").concat(this.elementId, "_loadingContainer\"></div>\n        </div>\n      ");
      if (this.options.paging === 'pages') {
        html += "\n          <div class=\"websy-table-paging-container\">\n            Show <div id=\"".concat(this.elementId, "_pageSizeSelector\" class=\"websy-vis-page-selector\"></div> rows\n            <ul id=\"").concat(this.elementId, "_pageList\" class=\"websy-vis-page-list\"></ul>\n          </div>\n        ");
      }
      var pageOptions = [10, 20, 50, 100, 200];
      el.innerHTML = html;
      if (this.options.paging === 'pages') {
        this.pageSizeSelector = new WebsyDesigns.Dropdown("".concat(this.elementId, "_pageSizeSelector"), {
          selectedItems: [pageOptions.indexOf(this.options.pageSize)],
          items: pageOptions.map(function (p) {
            return {
              label: p.toString(),
              value: p
            };
          }),
          allowClear: false,
          disableSearch: true,
          onItemSelected: function onItemSelected(selectedItem) {
            if (_this41.options.onChangePageSize) {
              _this41.options.onChangePageSize(selectedItem.value);
            }
          }
        });
      }
      el.addEventListener('click', this.handleClick.bind(this));
      el.addEventListener('mouseout', this.handleMouseOut.bind(this));
      el.addEventListener('mousemove', this.handleMouseMove.bind(this));
      el.addEventListener('mousedown', this.handleMouseDown.bind(this));
      el.addEventListener('mouseup', this.handleMouseUp.bind(this));
      document.addEventListener('mouseup', this.handleGlobalMouseUp.bind(this));
      var scrollEl = document.getElementById("".concat(this.elementId, "_tableContainer"));
      scrollEl.addEventListener('scroll', this.handleScroll.bind(this));
      this.loadingDialog = new WebsyDesigns.LoadingDialog("".concat(this.elementId, "_loadingContainer"));
      this.render();
    } else {
      console.error("No element found with ID ".concat(this.elementId));
    }
  }
  _createClass(WebsyTable2, [{
    key: "appendRows",
    value: function appendRows(data) {
      var _this42 = this;
      this.hideError();
      var bodyEl = document.getElementById("".concat(this.elementId, "_body"));
      var bodyHTML = '';
      if (data) {
        bodyHTML += data.map(function (r, rowIndex) {
          return '<tr>' + r.map(function (c, i) {
            if (_this42.options.columns[i].show !== false) {
              var style = "height: ".concat(_this42.options.cellSize, "px; line-height: ").concat(_this42.options.cellSize, "px;");
              if (c.style) {
                style += c.style;
              }
              if (_this42.options.columns[i].width) {
                style += "width: ".concat(_this42.options.columns[i].width, "; ");
              }
              if (c.backgroundColor) {
                style += "background-color: ".concat(c.backgroundColor, "; ");
                if (!c.color) {
                  style += "color: ".concat(WebsyDesigns.Utils.getLightDark(c.backgroundColor), "; ");
                }
              }
              if (c.color) {
                style += "color: ".concat(c.color, "; ");
              }
              if (_this42.options.columns[i].showAsLink === true && c.value.trim() !== '') {
                return "\n                <td \n                  data-row-index='".concat(_this42.rowCount + rowIndex, "' \n                  data-col-index='").concat(i, "' \n                  class='").concat(_this42.options.columns[i].classes || '', "' \n                  style='").concat(style, "'\n                  colspan='").concat(c.colspan || 1, "'\n                  rowspan='").concat(c.rowspan || 1, "'\n                >\n                  <a href='").concat(c.value, "' target='").concat(_this42.options.columns[i].openInNewTab === true ? '_blank' : '_self', "'>").concat(c.displayText || _this42.options.columns[i].linkText || c.value, "</a>\n                </td>\n              ");
              } else if ((_this42.options.columns[i].showAsNavigatorLink === true || _this42.options.columns[i].showAsRouterLink === true) && c.value.trim() !== '') {
                return "\n                <td \n                  data-view='".concat(c.value, "' \n                  data-row-index='").concat(_this42.rowCount + rowIndex, "' \n                  data-col-index='").concat(i, "' \n                  class='websy-trigger trigger-item ").concat(_this42.options.columns[i].clickable === true ? 'clickable' : '', " ").concat(_this42.options.columns[i].classes || '', "' \n                  style='").concat(style, "'\n                  colspan='").concat(c.colspan || 1, "'\n                  rowspan='").concat(c.rowspan || 1, "'\n                >").concat(c.displayText || _this42.options.columns[i].linkText || c.value, "</td>\n              ");
              } else {
                var info = c.value;
                if (_this42.options.columns[i].showAsImage === true) {
                  c.value = "\n                  <img src='".concat(c.value, "'>\n                ");
                }
                return "\n                <td \n                  data-info='".concat(info, "' \n                  data-row-index='").concat(_this42.rowCount + rowIndex, "' \n                  data-col-index='").concat(i, "' \n                  class='").concat(_this42.options.columns[i].classes || '', "' \n                  style='").concat(style, "'\n                  colspan='").concat(c.colspan || 1, "'\n                  rowspan='").concat(c.rowspan || 1, "'\n                >").concat(c.value, "</td>\n              ");
              }
            }
          }).join('') + '</tr>';
        }).join('');
        this.data = this.data.concat(data);
        this.rowCount = this.data.length;
      }
      bodyEl.innerHTML += bodyHTML;
      if (this.options.virtualScroll === true) {
        // get height of the thead      
        if (this.options.paging !== 'pages') {
          var headEl = document.getElementById("".concat(this.elementId, "_head"));
          var vScrollContainerEl = document.getElementById("".concat(this.elementId, "_vScrollContainer"));
          vScrollContainerEl.style.top = "".concat(headEl.clientHeight, "px");
        }
        var hScrollContainerEl = document.getElementById("".concat(this.elementId, "_hScrollContainer"));
        var left = 0;
        var cells = bodyEl.querySelectorAll("tr:first-of-type td");
        for (var i = 0; i < this.options.leftColumns; i++) {
          left += cells[i].offsetWidth || cells[i].clientWidth;
        }
        hScrollContainerEl.style.left = "".concat(left, "px");
      }
    }
  }, {
    key: "buildSearchIcon",
    value: function buildSearchIcon(columnIndex) {
      return "\n      <div class=\"websy-table-search-icon\" data-col-index=\"".concat(columnIndex, "\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 512 512\"><title>ionicons-v5-f</title><path d=\"M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z\" style=\"fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px\"/><line x1=\"338.29\" y1=\"338.29\" x2=\"448\" y2=\"448\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px\"/></svg>\n      </div>\n    ");
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('download-button')) {
        window.viewManager.dataExportController.exportData(this.options.model);
      }
      if (event.target.classList.contains('sortable-column')) {
        var colIndex = +event.target.getAttribute('data-index');
        var sortIndex = +event.target.getAttribute('data-sort-index');
        var column = this.options.columns[colIndex];
        if (this.options.onSort) {
          this.options.onSort(event, column, colIndex, sortIndex);
        } else {
          this.internalSort(column, colIndex);
        }
        // const colIndex = +event.target.getAttribute('data-index')
        // const dimIndex = +event.target.getAttribute('data-dim-index')
        // const expIndex = +event.target.getAttribute('data-exp-index')
        // const reverse = event.target.getAttribute('data-reverse') === 'true'
        // const patchDefs = [{
        //   qOp: 'replace',
        //   qPath: '/qHyperCubeDef/qInterColumnSortOrder',
        //   qValue: JSON.stringify([colIndex])
        // }]
        // patchDefs.push({
        //   qOp: 'replace',
        //   qPath: `/qHyperCubeDef/${dimIndex > -1 ? 'qDimensions' : 'qMeasures'}/${dimIndex > -1 ? dimIndex : expIndex}/qDef/qReverseSort`,
        //   qValue: JSON.stringify(reverse)
        // })
        // this.options.model.applyPatches(patchDefs) // .then(() => this.render())
      } else if (event.target.classList.contains('websy-table-search-icon')) {
        // let field = event.target.getAttribute('data-field')
        // window.viewManager.views.global.objects[1].instance.show(field, { x: event.pageX, y: event.pageY }, () => {
        //   event.target.classList.remove('active')
        // })
        var _colIndex2 = +event.target.getAttribute('data-col-index');
        if (this.options.columns[_colIndex2].onSearch) {
          this.options.columns[_colIndex2].onSearch(event, this.options.columns[_colIndex2]);
        }
      } else if (event.target.classList.contains('clickable')) {
        var _colIndex3 = +event.target.getAttribute('data-col-index');
        var rowIndex = +event.target.getAttribute('data-row-index');
        if (this.options.onClick) {
          this.options.onClick(event, this.data[rowIndex][_colIndex3], this.data[rowIndex], this.options.columns[_colIndex3]);
        }
      } else if (event.target.classList.contains('websy-page-num')) {
        var pageNum = +event.target.getAttribute('data-page');
        if (this.options.onSetPage) {
          this.options.onSetPage(pageNum);
        }
      } else if (event.target.classList.contains('websy-h-scroll-container')) {
        console.log('scroll handle clicked', event);
        var clickX = event.clientX;
        var elX = event.target.getBoundingClientRect().left;
        var handleEl = document.getElementById("".concat(this.elementId, "_hScrollHandle"));
        var startPoint = clickX - elX - handleEl.clientWidth / 2;
        startPoint = Math.max(0, Math.min(startPoint, event.target.clientWidth - handleEl.clientWidth));
        handleEl.style.left = "".concat(startPoint, "px");
        if (this.options.onScrollX) {
          this.options.onScrollX(startPoint);
        }
      }
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(event) {
      if (event.target.classList.contains('websy-scroll-handle')) {
        this.scrolling = true;
        var el = document.getElementById(this.elementId);
        el.classList.add('scrolling');
      }
      if (event.target.classList.contains('websy-scroll-handle-x')) {
        var handleEl = document.getElementById("".concat(this.elementId, "_hScrollHandle"));
        this.handleXStart = handleEl.offsetLeft;
        this.scrollXStart = event.clientX;
        this.scrollDirection = 'X';
      }
    }
  }, {
    key: "handleGlobalMouseUp",
    value: function handleGlobalMouseUp(event) {
      this.scrolling = false;
      var el = document.getElementById(this.elementId);
      if (el) {
        el.classList.remove('scrolling');
      }
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(event) {
      this.scrolling = false;
      var el = document.getElementById(this.elementId);
      el.classList.remove('scrolling');
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      if (this.tooltipTimeoutFn) {
        event.target.classList.remove('websy-delayed-info');
        clearTimeout(this.tooltipTimeoutFn);
      }
      if (event.target.tagName === 'TD') {
        this.tooltipTimeoutFn = setTimeout(function () {
          event.target.classList.add('websy-delayed-info');
        }, 500);
      }
      if (this.scrolling === true && this.options.virtualScroll === true) {
        var tableContainerEl = document.getElementById("".concat(this.elementId, "_tableContainer"));
        if (this.scrollDirection === 'X') {
          var handleEl = document.getElementById("".concat(this.elementId, "_hScrollHandle"));
          // console.log(this.handleXStart + handleEl.offsetWidth + (event.clientX - this.scrollXStart), this.columnParameters.scrollableWidth)        
          var startPoint = 0;
          if (this.handleXStart + (event.clientX - this.scrollXStart) < this.columnParameters.scrollableWidth - handleEl.offsetWidth) {
            handleEl.style.left = "".concat(this.handleXStart + (event.clientX - this.scrollXStart), "px");
            startPoint = this.handleXStart + (event.clientX - this.scrollXStart);
          } else {
            startPoint = this.columnParameters.scrollableWidth - handleEl.offsetWidth;
          }
          if (this.handleXStart + (event.clientX - this.scrollXStart) < 0) {
            handleEl.style.left = 0;
            startPoint = 0;
          }
          if (this.options.onScrollX) {
            this.options.onScrollX(startPoint);
          }
        }
      }
    }
  }, {
    key: "handleMouseOut",
    value: function handleMouseOut(event) {
      if (this.tooltipTimeoutFn) {
        event.target.classList.remove('websy-delayed-info');
        clearTimeout(this.tooltipTimeoutFn);
      }
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(event) {
      if (this.options.onScroll && this.options.paging === 'scroll') {
        this.options.onScroll(event);
      }
    }
  }, {
    key: "hideError",
    value: function hideError() {
      var el = document.getElementById("".concat(this.elementId, "_tableContainer"));
      if (el) {
        el.classList.remove('has-error');
      }
      var tableEl = document.getElementById("".concat(this.elementId, "_table"));
      tableEl.classList.remove('hidden');
      var containerEl = document.getElementById("".concat(this.elementId, "_errorContainer"));
      if (containerEl) {
        containerEl.classList.remove('active');
      }
    }
  }, {
    key: "hideLoading",
    value: function hideLoading() {
      if (this.options.onLoading) {
        this.options.onLoading(false);
      } else {
        this.loadingDialog.hide();
      }
    }
  }, {
    key: "internalSort",
    value: function internalSort(column, colIndex) {
      this.options.columns.forEach(function (c, i) {
        c.activeSort = i === colIndex;
      });
      if (column.sortFunction) {
        this.data = column.sortFunction(this.data, column);
      } else {
        var sortProp = 'value';
        var sortOrder = column.sort === 'asc' ? 'desc' : 'asc';
        column.sort = sortOrder;
        var sortType = column.sortType || 'alphanumeric';
        if (column.sortProp) {
          sortProp = column.sortProp;
        }
        this.data.sort(function (a, b) {
          switch (sortType) {
            case 'numeric':
              if (sortOrder === 'asc') {
                return a[colIndex][sortProp] - b[colIndex][sortProp];
              } else {
                return b[colIndex][sortProp] - a[colIndex][sortProp];
              }
            default:
              if (sortOrder === 'asc') {
                return a[colIndex][sortProp] > b[colIndex][sortProp] ? 1 : -1;
              } else {
                return a[colIndex][sortProp] < b[colIndex][sortProp] ? 1 : -1;
              }
          }
        });
      }
      this.render(this.data);
    }
  }, {
    key: "render",
    value: function render(data) {
      var _this43 = this;
      if (!this.options.columns) {
        return;
      }
      this.hideError();
      this.data = [];
      this.rowCount = 0;
      var bodyEl = document.getElementById("".concat(this.elementId, "_body"));
      bodyEl.innerHTML = '';
      if (this.options.allowDownload === true) {
        // doesn't do anything yet
        var el = document.getElementById(this.elementId);
        if (el) {
          el.classList.add('allow-download');
        } else {
          el.classList.remove('allow-download');
        }
      }
      // let colGroupHTML = this.options.columns.map(c => `<col style="${c.width ? 'width: ' + c.width : ''}"></col>`)
      var headHTML = '<tr>' + this.options.columns.map(function (c, i) {
        if (c.show !== false) {
          var style = '';
          if (c.style) {
            style += c.style;
          }
          if (c.width) {
            style += "width: ".concat(c.width || 'auto', "; ");
          }
          return "\n        <th style=\"".concat(style, "\">\n          <div class =\"tableHeader\">\n            <div class=\"leftSection\">\n              <div\n                class=\"tableHeaderField ").concat(['asc', 'desc'].indexOf(c.sort) !== -1 ? 'sortable-column' : '', "\"\n                data-sort-index=\"").concat(c.sortIndex || i, "\"\n                data-index=\"").concat(i, "\"\n                data-sort=\"").concat(c.sort, "\"\n                style=\"").concat(c.style || '', "\"                \n              >\n                ").concat(c.name, "\n              </div>\n            </div>\n            <div class=\"").concat(c.activeSort ? c.sort + ' sortOrder' : '', "\"></div>\n            ").concat(c.searchable === true ? _this43.buildSearchIcon(i) : '', "\n          </div>\n        </th>\n        ");
        }
      }).join('') + '</tr>';
      var headEl = document.getElementById("".concat(this.elementId, "_head"));
      headEl.innerHTML = headHTML;
      var dropdownEl = document.getElementById("".concat(this.elementId, "_dropdownContainer"));
      if (dropdownEl.innerHTML === '') {
        var dropdownHTML = "";
        this.options.columns.forEach(function (c, i) {
          if (c.searchable && c.searchField) {
            dropdownHTML += "\n            <div id=\"".concat(_this43.elementId, "_columnSearch_").concat(i, "\" class=\"websy-modal-dropdown\"></div>\n          ");
          }
        });
        dropdownEl.innerHTML = dropdownHTML;
      }
      // const colGroupEl = document.getElementById(`${this.elementId}_cols`)
      // colGroupEl.innerHTML = colGroupHTML
      // let footHTML = '<tr>' + this.options.columns.map((c, i) => {
      //   if (c.show !== false) {
      //     return `
      //       <th></th>
      //     `
      //   }
      // }).join('') + '</tr>'
      // const footEl = document.getElementById(`${this.elementId}_foot`)
      // footEl.innerHTML = footHTML
      if (this.options.paging === 'pages') {
        var pagingEl = document.getElementById("".concat(this.elementId, "_pageList"));
        if (pagingEl) {
          var pages = new Array(this.options.pageCount).fill('').map(function (item, index) {
            return "<li data-page=\"".concat(index, "\" class=\"websy-page-num ").concat(_this43.options.pageNum === index ? 'active' : '', "\">").concat(index + 1, "</li>");
          });
          var startIndex = 0;
          if (this.options.pageCount > 8) {
            startIndex = Math.max(0, this.options.pageNum - 4);
            pages = pages.splice(startIndex, 10);
            if (startIndex > 0) {
              pages.splice(0, 0, "<li>Page&nbsp;</li><li data-page=\"0\" class=\"websy-page-num\">First</li><li>...</li>");
            } else {
              pages.splice(0, 0, '<li>Page&nbsp;</li>');
            }
            if (this.options.pageNum < this.options.pageCount - 1) {
              pages.push('<li>...</li>');
              pages.push("<li data-page=\"".concat(this.options.pageCount - 1, "\" class=\"websy-page-num\">Last</li>"));
            }
          }
          pagingEl.innerHTML = pages.join('');
        }
      }
      if (data) {
        this.appendRows(data);
      }
    }
  }, {
    key: "showError",
    value: function showError(options) {
      var el = document.getElementById("".concat(this.elementId, "_tableContainer"));
      if (el) {
        el.classList.add('has-error');
      }
      var tableEl = document.getElementById("".concat(this.elementId, "_table"));
      tableEl.classList.add('hidden');
      var containerEl = document.getElementById("".concat(this.elementId, "_errorContainer"));
      if (containerEl) {
        containerEl.classList.add('active');
      }
      if (options.title) {
        var titleEl = document.getElementById("".concat(this.elementId, "_errorTitle"));
        if (titleEl) {
          titleEl.innerHTML = options.title;
        }
      }
      if (options.message) {
        var messageEl = document.getElementById("".concat(this.elementId, "_errorMessage"));
        if (messageEl) {
          messageEl.innerHTML = options.message;
        }
      }
    }
  }, {
    key: "setHorizontalScroll",
    value: function setHorizontalScroll(options) {
      var el = document.getElementById("".concat(this.elementId, "_hScrollHandle"));
      if (options.width) {
        el.style.width = "".concat(options.width, "px");
      }
    }
  }, {
    key: "setWidth",
    value: function setWidth(width) {
      var el = document.getElementById("".concat(this.elementId, "_table"));
      if (el) {
        el.style.width = "".concat(width, "px");
      }
    }
  }, {
    key: "showLoading",
    value: function showLoading(options) {
      if (this.options.onLoading) {
        this.options.onLoading(true);
      } else {
        this.loadingDialog.show(options);
      }
    }
  }, {
    key: "getColumnParameters",
    value: function getColumnParameters(values) {
      var _this44 = this;
      var tableEl = document.getElementById("".concat(this.elementId, "_table"));
      tableEl.style.tableLayout = 'auto';
      tableEl.style.width = 'auto';
      var headEl = document.getElementById("".concat(this.elementId, "_head"));
      var bodyEl = document.getElementById("".concat(this.elementId, "_body"));
      headEl.innerHTML = '<tr style="visibility: hidden;">' + values.map(function (c, i) {
        return "\n      <th>\n        <div class =\"tableHeader\">\n          <div class=\"leftSection\">\n            <div\n              class=\"tableHeaderField\"              \n            >\n              ".concat(c.value || 'nbsp;', "\n            </div>\n          </div>          \n          ").concat(c.searchable === true ? _this44.buildSearchIcon(i) : '', "\n        </div>\n      </th>\n    ");
      }).join('') + '</tr>';
      bodyEl.innerHTML = '<tr style="visibility: hidden;">' + values.map(function (c) {
        return "\n      <td                 \n        style='height: ".concat(_this44.options.cellSize, "px; line-height: ").concat(_this44.options.cellSize, "px; padding: 10px 5px;'\n      >").concat(c.value || '&nbsp;', "</td>\n    ");
      }).join('') + '</tr>';
      // get height of the first data cell
      var cells = bodyEl.querySelectorAll("tr:first-of-type td");
      var tableContainerEl = document.getElementById("".concat(this.elementId, "_tableContainer"));
      var cellHeight = cells[0].offsetHeight || cells[0].clientHeight;
      var cellWidths = [];
      var accWidth = 0;
      var nonScrollableWidth = 0;
      for (var i = 0; i < cells.length; i++) {
        if (i < this.options.leftColumns) {
          nonScrollableWidth += values[i].width || cells[i].offsetWidth || cells[i].clientWidth;
        }
        cellWidths.push(values[i].width || cells[i].offsetWidth || cells[i].clientWidth);
        accWidth += values[i].width || cells[i].offsetWidth || cells[i].clientWidth;
      }
      // if the table doesn't fill the available space we adjust the space so that the columns grow
      if (accWidth < (tableContainerEl.offsetWidth || tableContainerEl.clientWidth) - nonScrollableWidth) {
        for (var _i9 = this.options.leftColumns; _i9 < cellWidths.length; _i9++) {
          cellWidths[_i9] = ((tableContainerEl.offsetWidth || tableContainerEl.clientWidth) - nonScrollableWidth) / (cellWidths.length - this.options.leftColumns);
        }
      }
      // const cellWidth = firstDataCell.offsetWidth || firstDataCell.clientWidth        
      // tableEl.style.width = ''
      this.columnParameters = {
        cellHeight: cellHeight,
        cellWidths: cellWidths,
        availableHeight: tableContainerEl.offsetHeight || tableContainerEl.clientHeight,
        availableWidth: tableContainerEl.offsetWidth || tableContainerEl.clientWidth,
        nonScrollableWidth: nonScrollableWidth,
        scrollableWidth: (tableContainerEl.offsetWidth || tableContainerEl.clientWidth) - nonScrollableWidth
      };
      bodyEl.innerHTML = '';
      tableEl.style.tableLayout = '';
      tableEl.style.width = '';
      return this.columnParameters;
    }
  }]);
  return WebsyTable2;
}();
/* global WebsyDesigns */
var WebsyTable3 = /*#__PURE__*/function () {
  function WebsyTable3(elementId, options) {
    _classCallCheck(this, WebsyTable3);
    this.elementId = elementId;
    var DEFAULTS = {
      virtualScroll: false,
      showTotalsAbove: true,
      minHandleSize: 20,
      maxColWidth: '50%',
      allowPivoting: false,
      searchIcon: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 512 512\"><title>ionicons-v5-f</title><path d=\"M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z\" style=\"fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px\"/><line x1=\"338.29\" y1=\"338.29\" x2=\"448\" y2=\"448\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px\"/></svg>",
      plusIcon: WebsyDesigns.Icons.PlusFilled,
      minusIcon: WebsyDesigns.Icons.MinusFilled,
      disableInternalLoader: false,
      disableTouch: false,
      scrollWidth: 10,
      touchScrollWidth: 30,
      autoFitColumns: true
    };
    this.options = _extends({}, DEFAULTS, options);
    this._isRendered = false;
    this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    if (this.options.disableTouch === true) {
      this.isTouchDevice = false;
    }
    this.sizes = {};
    this.currentData = [];
    this.scrollDragging = false;
    this.cellDragging = false;
    this.vScrollRequired = false;
    this.hScrollRequired = false;
    this.pinnedColumns = 0;
    this.startRow = 0;
    this.endRow = 0;
    this.startCol = 0;
    this.endCol = 0;
    this.mouseYStart = 0;
    this.mouseYStart = 0;
    if (!elementId) {
      console.log('No element Id provided for Websy Table');
      return;
    }
    var el = document.getElementById(this.elementId);
    el.style.position = 'relative';
    if (el) {
      var html = "\n        <div id='".concat(this.elementId, "_tableContainer' style='width: calc(100% - ").concat(this.options.isTouchDevice ? this.options.touchScrollWidth : this.options.scrollWidth, "px); height: calc(100% - ").concat(this.options.isTouchDevice ? this.options.touchScrollWidth : this.options.scrollWidth, "px);' class='websy-vis-table-3 ").concat(this.options.paging === 'pages' ? 'with-paging' : '', " ").concat(this.options.virtualScroll === true ? 'with-virtual-scroll' : '', " ").concat(this.isTouchDevice === true && this.options.virtualScroll === true ? 'touch-device' : '', "'>\n          <!--<div class=\"download-button\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z\"/></svg>\n          </div>-->\n          <div id=\"").concat(this.elementId, "_tableInner\" class=\"websy-table-inner-container\">\n            <table id=\"").concat(this.elementId, "_tableHeader\" class=\"websy-table-header\"></table>\n            <table id=\"").concat(this.elementId, "_tableBody\" class=\"websy-table-body\"></table>\n            <table id=\"").concat(this.elementId, "_tableFooter\" class=\"websy-table-footer\"></table>\n      ");
      if (this.isTouchDevice === true && this.options.virtualScroll === true) {
        html += "\n            <div id=\"".concat(this.elementId, "_touchScroller\" class=\"websy-table-touch-scroller\"></div>\n        ");
      }
      html += " \n          </div>                 \n          <div id=\"".concat(this.elementId, "_errorContainer\" class='websy-vis-error-container'>\n            <div>\n              <div id=\"").concat(this.elementId, "_errorTitle\"></div>\n              <div id=\"").concat(this.elementId, "_errorMessage\"></div>\n            </div>            \n          </div>\n          <div id=\"").concat(this.elementId, "_dropdownContainerx\" class=\"table-dropdown-container\"></div>\n          <div id=\"").concat(this.elementId, "_loadingContainer\"></div>\n        </div>\n        <div id=\"").concat(this.elementId, "_vScrollContainer\" class=\"websy-v-scroll-container\" style=\"width: ").concat(this.options.isTouchDevice ? this.options.touchScrollWidth : this.options.scrollWidth, "px;\">\n          <div id=\"").concat(this.elementId, "_vScrollHandle\" class=\"websy-scroll-handle websy-scroll-handle-y\"></div>\n        </div>\n        <div id=\"").concat(this.elementId, "_hScrollContainer\" class=\"websy-h-scroll-container\" style=\"height: ").concat(this.options.isTouchDevice ? this.options.touchScrollWidth : this.options.scrollWidth, "px;\">\n          <div id=\"").concat(this.elementId, "_hScrollHandle\" class=\"websy-scroll-handle websy-scroll-handle-x\"></div>\n        </div> \n      ");
      if (this.options.paging === 'pages') {
        html += "\n          <div class=\"websy-table-paging-container\">\n            Show <div id=\"".concat(this.elementId, "_pageSizeSelector\" class=\"websy-vis-page-selector\"></div> rows\n            <ul id=\"").concat(this.elementId, "_pageList\" class=\"websy-vis-page-list\"></ul>\n          </div>\n        ");
      }
      el.innerHTML = html;
      var dropdownContainerEl = document.getElementById("".concat(this.elementId, "_dropdownContainer"));
      if (dropdownContainerEl) {
        dropdownContainerEl.innerHTML = '';
      } else {
        var div = document.createElement('div');
        div.id = "".concat(this.elementId, "_dropdownContainer");
        div.classList.add('table-dropdown-container');
        document.body.appendChild(div);
      }
      el.addEventListener('click', this.handleClick.bind(this));
      el.addEventListener('mousedown', this.handleMouseDown.bind(this));
      el.addEventListener('touchstart', this.handleTouchStart.bind(this));
      el.addEventListener('touchmove', this.handleTouchMove.bind(this));
      window.addEventListener('touchend', this.handleTouchEnd.bind(this));
      window.addEventListener('mousemove', this.handleMouseMove.bind(this));
      window.addEventListener('mouseup', this.handleMouseUp.bind(this));
      var scrollEl = document.getElementById("".concat(this.elementId, "_tableBody"));
      if (scrollEl) {
        scrollEl.addEventListener('wheel', this.handleScrollWheel.bind(this));
      }
      this.loadingDialog = new WebsyDesigns.LoadingDialog("".concat(this.elementId, "_loadingContainer"));
      this.render(this.options.data);
    } else {
      console.error("No element found with ID ".concat(this.elementId));
    }
  }
  _createClass(WebsyTable3, [{
    key: "isRendered",
    get: function get() {
      return this._isRendered;
    }
  }, {
    key: "columns",
    set: function set(columns) {
      this.options.columns = columns;
      this.renderColumnHeaders();
    }
  }, {
    key: "totals",
    set: function set(totals) {
      this.options.totals = totals;
      this.renderTotals();
    }
  }, {
    key: "appendRows",
    value: function appendRows(data) {
      this._isRendered = false;
      this.hideError();
      var bodyEl = document.getElementById("".concat(this.elementId, "_tableBody"));
      if (bodyEl) {
        if (this.options.virtualScroll === true) {
          bodyEl.innerHTML = this.buildBodyHtml(data, true);
          this.currentData = data;
        } else {
          if (bodyEl.querySelector('tbody')) {
            bodyEl.querySelector('tbody').innerHTML += this.buildBodyHtml(data, true, true);
          } else {
            bodyEl.innerHTML += this.buildBodyHtml(data, true);
            this._isRendered = true;
          }
          this.currentData = this.currentData.concat(data);
        }
      }
      // this.data = this.data.concat(data)
      // this.rowCount = this.data.length   
    }
  }, {
    key: "buildBodyHtml",
    value: function buildBodyHtml() {
      var _this45 = this;
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var useWidths = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!this.options.columns) {
        return '';
      }
      if (data.length === 0) {
        return '';
      }
      var bodyHtml = "";
      var sizingColumns = this.options.columns[this.options.columns.length - 1].filter(function (c) {
        return c.show !== false;
      });
      if (useWidths === true) {
        bodyHtml += '<colgroup>';
        bodyHtml += sizingColumns.map(function (c) {
          return "\n        <col\n          style='width: ".concat(c.width || c.actualWidth, "px!important'\n        ></col>\n      ");
        }).join('');
        bodyHtml += '</colgroup>';
      }
      data.forEach(function (row, rowIndex) {
        bodyHtml += "<tr class=\"websy-table-row\">";
        row.forEach(function (cell, cellIndex) {
          var sizeIndex = cell.level || cellIndex;
          var colIndex = cell.index || cellIndex;
          if (typeof sizingColumns[sizeIndex] === 'undefined' || _this45.options.columns[_this45.options.columns.length - 1][colIndex].show === false) {
            return; // need to revisit this logic
          }

          var style = '';
          var divStyle = '';
          if (useWidths === true && (+cell.colspan === 1 || !cell.colspan)) {
            style = "width: ".concat(sizingColumns[sizeIndex].width || sizingColumns[sizeIndex].actualWidth, "px!important; ");
            divStyle = style;
          }
          if (cell.style) {
            style += cell.style;
          }
          if (useWidths === true && (+cell.colspan === 1 || !cell.colspan)) {
            style += "max-width: ".concat(sizingColumns[sizeIndex].width || sizingColumns[sizeIndex].actualWidth, "px!important;");
            divStyle += "max-width: ".concat(sizingColumns[sizeIndex].width || sizingColumns[sizeIndex].actualWidth, "px!important;");
          }
          if (cell.backgroundColor) {
            style += "background-color: ".concat(cell.backgroundColor, "; ");
            if (!cell.color) {
              style += "color: ".concat(WebsyDesigns.Utils.getLightDark(cell.backgroundColor), "; ");
            }
          }
          if (cell.color) {
            style += "color: ".concat(cell.color, "; ");
          }
          // console.log('rowspan', cell.rowspan)
          bodyHtml += "<td \n          class='websy-table-cell ".concat(sizeIndex < _this45.pinnedColumns ? 'pinned' : 'unpinned', " ").concat((cell.classes || []).join(' '), " ").concat((sizingColumns[sizeIndex].classes || []).join(' '), "'\n          style='").concat(style, "'\n        ");
          if (!sizingColumns[sizeIndex].showAsImage && cell.value.indexOf('<svg') === -1 && cell.value.indexOf('<img') === -1) {
            bodyHtml += "\n            data-info='".concat(cell.value.replace ? cell.value.replace(/'/g, '`') : cell.value, "'\n          ");
          }
          bodyHtml += "\n          colspan='".concat(cell.colspan || 1, "'\n          rowspan='").concat(cell.rowspan || 1, "'\n          data-row-index='").concat(rowIndex, "'\n          data-cell-index='").concat(cellIndex, "'\n          data-col-index='").concat(colIndex, "'\n        ");
          // if (useWidths === true) {
          //   bodyHtml += `
          //     style='width: ${sizingColumns[cellIndex].width || sizingColumns[cellIndex].actualWidth}px!important'
          //     width='${sizingColumns[cellIndex].width || sizingColumns[cellIndex].actualWidth}'
          //   `
          // }
          bodyHtml += "\n        ><div \n          style='".concat(divStyle, "' \n          class='websy-table-cell-content'\n          data-row-index='").concat(rowIndex, "'\n          data-cell-index='").concat(cellIndex, "'\n          data-col-index='").concat(colIndex, "'\n        >");
          if (cell.expandable === true) {
            bodyHtml += "<i \n            data-row-index='".concat(rowIndex, "'\n            data-col-index='").concat(cell.level || cellIndex, "'\n            class='websy-table-cell-expand'\n          >").concat(_this45.options.plusIcon, "</i>");
          }
          if (cell.collapsable === true) {
            bodyHtml += "<i \n            data-row-index='".concat(rowIndex, "'\n            data-col-index='").concat(cell.level || cellIndex, "'\n            class='websy-table-cell-collapse'\n          >").concat(_this45.options.minusIcon, "</i>");
          }
          if (sizingColumns[sizeIndex].showAsLink === true && cell.value.trim() !== '') {
            cell.value = "\n            <a href=\"".concat(encodeURI(cell.value), "\" target='").concat(sizingColumns[sizeIndex].openInNewTab === true ? '_blank' : '_self', "'>").concat(cell.displayText || sizingColumns[sizeIndex].linkText || cell.value, "</a>\n          ");
          }
          if (sizingColumns[sizeIndex].showAsRouterLink === true && cell.value.trim() !== '') {
            cell.value = "\n            <a data-view=\"".concat((cell.link || cell.value).replace(/'/g, '\''), "\" class='websy-trigger'>").concat(cell.value, "</a>\n          ");
          }
          if (sizingColumns[sizeIndex].showAsImage === true) {
            cell.value = "\n            <img               \n              style=\"width: ".concat(sizingColumns[sizeIndex].imgWidth ? sizingColumns[sizeIndex].imgWidth : 'auto', "; height: ").concat(sizingColumns[sizeIndex].imgHeight ? sizingColumns[sizeIndex].imgHeight : 'auto', ";\" \n              src='").concat(cell.value, "'\n              ").concat(sizingColumns[sizeIndex].errorImage ? 'onerror="this.src=\'' + sizingColumns[sizeIndex].errorImage + '\'"' : '', "\n            />\n          ");
          }
          bodyHtml += "\n          ".concat(cell.value, "\n        </div></td>");
        });
        bodyHtml += "</tr>";
      });
      // bodyHtml += `</div>`    
      return bodyHtml;
    }
  }, {
    key: "buildHeaderHtml",
    value: function buildHeaderHtml() {
      var _this46 = this;
      var useWidths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!this.options.columns) {
        return '';
      }
      var headerHtml = '';
      var sizingColumns = this.options.columns[this.options.columns.length - 1].filter(function (c) {
        return c.show !== false;
      });
      if (useWidths === true) {
        headerHtml += '<colgroup>';
        headerHtml += sizingColumns.map(function (c) {
          return "\n        <col\n          style='width: ".concat(c.width || c.actualWidth, "px!important'\n        ></col>\n      ");
        }).join('');
        headerHtml += '</colgroup>';
      }
      this.options.columns.forEach(function (row, rowIndex) {
        // if (useWidths === false && rowIndex !== this.options.columns.length - 1) {
        //   // if we're calculating the size we only want to render the last row of column headers
        //   return
        // }
        headerHtml += "<tr class=\"websy-table-row  websy-table-header-row ".concat(rowIndex !== _this46.options.columns.length - 1 ? 'websy-table-parent-header' : '', "\">");
        row.filter(function (c) {
          return c.show !== false;
        }).forEach(function (col, colIndex) {
          if (typeof sizingColumns[colIndex] === 'undefined' || sizingColumns[colIndex].show === false) {
            return; // need to revisit this logic
          }

          var style = "width: ".concat(sizingColumns[colIndex].width || sizingColumns[colIndex].actualWidth, "px!important; ");
          var divStyle = "width: ".concat(sizingColumns[colIndex].width || sizingColumns[colIndex].actualWidth, "px!important; ");
          if (useWidths === true) {
            style += "max-width: ".concat(sizingColumns[colIndex].width || sizingColumns[colIndex].actualWidth, "px!important;");
            divStyle += "max-width: ".concat(sizingColumns[colIndex].width || sizingColumns[colIndex].actualWidth, "px!important;");
          }
          if (col.colspan > 1) {
            divStyle = "width: 100%;";
          }
          if (col.style) {
            style += col.style;
          }
          headerHtml += "<td \n          class='websy-table-cell ".concat(colIndex < _this46.pinnedColumns ? 'pinned' : 'unpinned', " ").concat((col.classes || []).join(' '), "'  \n          style='").concat(style, "'       \n          colspan='").concat(col.colspan || 1, "'\n          rowspan='").concat(col.rowspan || 1, "'\n        ");
          // if (useWidths === true && rowIndex === this.options.columns.length - 1) {
          //   headerHtml += `
          //     style='width: ${col.width || col.actualWidth}px'
          //     width='${col.width || col.actualWidth}'
          //   `
          // }
          headerHtml += ">\n          <div \n            style='".concat(divStyle, "'\n            data-col-index=\"").concat(colIndex, "\"\n            class='").concat(['asc', 'desc'].indexOf(col.sort) !== -1 ? 'sortable-column' : '', "'\n          >\n            ").concat(col.name).concat(col.activeSort ? _this46.buildSortIcon(col.sort, colIndex) : '').concat(col.searchable === true ? _this46.buildSearchIcon(col, colIndex) : '', "\n          </div>\n        </td>");
        });
        headerHtml += "</tr>";
      });
      var dropdownEl = document.getElementById("".concat(this.elementId, "_dropdownContainer"));
      this.options.columns[this.options.columns.length - 1].forEach(function (c, i) {
        if (c.searchable && c.isExternalSearch === true) {
          var testEl = document.getElementById("".concat(_this46.elementId, "_columnSearch_").concat(c.dimId || i));
          if (!testEl) {
            var newE = document.createElement('div');
            newE.id = "".concat(_this46.elementId, "_columnSearch_").concat(c.dimId || i);
            newE.className = 'websy-modal-dropdown';
            dropdownEl.appendChild(newE);
          }
        }
      });
      return headerHtml;
    }
  }, {
    key: "buildSearchIcon",
    value: function buildSearchIcon(col, index) {
      // return `<div class="websy-table-search-icon" data-col-id="${col.dimId}" data-col-index="${index}">
      return "<div class=\"websy-table-search-icon\" data-col-index=\"".concat(index, "\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 512 512\"><path d=\"M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z\" style=\"fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px\"/><line x1=\"338.29\" y1=\"338.29\" x2=\"448\" y2=\"448\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px\"/></svg>\n      </div>");
    }
  }, {
    key: "buildSortIcon",
    value: function buildSortIcon(direction, index) {
      // return `<div class="websy-table-search-icon" data-col-id="${col.dimId}" data-col-index="${index}">
      return "<div class=\"websy-table-sort-icon ".concat(direction, "\" data-col-index=\"").concat(index, "\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"15\" height=\"15\" viewBox=\"0 0 512 512\"><path d=\"M98,190.06,237.78,353.18a24,24,0,0,0,36.44,0L414,190.06c13.34-15.57,2.28-39.62-18.22-39.62H116.18C95.68,150.44,84.62,174.49,98,190.06Z\"/></svg>\n      </div>");
    }
  }, {
    key: "buildTotalHtml",
    value: function buildTotalHtml() {
      var _this47 = this;
      var useWidths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!this.options.totals) {
        return '';
      }
      var sizingColumns = this.options.columns[this.options.columns.length - 1].filter(function (c) {
        return c.show !== false;
      });
      var totalHtml = "<tr class=\"websy-table-row  websy-table-total-row\">";
      this.options.totals.forEach(function (col, colIndex) {
        if (typeof sizingColumns[colIndex] === 'undefined' || sizingColumns[colIndex].show === false) {
          return; // need to revisit this logic
        }

        totalHtml += "<td \n        class='websy-table-cell ".concat((col.classes || []).join(' '), "'\n        colspan='").concat(col.colspan || 1, "'\n        rowspan='").concat(col.rowspan || 1, "'\n      ");
        if (useWidths === true) {
          totalHtml += "\n          style='width: ".concat(_this47.options.columns[_this47.options.columns.length - 1][colIndex].width || _this47.options.columns[_this47.options.columns.length - 1][colIndex].actualWidth, "px'\n          width='").concat(col.width || col.actualWidth, "'\n        ");
        }
        totalHtml += "        \n        >\n        ".concat(col.value, "\n      </td>");
      });
      totalHtml += "</tr>";
      return totalHtml;
    }
  }, {
    key: "calculateSizes",
    value: function calculateSizes() {
      var _this48 = this;
      var sample = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var totalRowCount = arguments.length > 1 ? arguments[1] : undefined;
      var totalColumnCount = arguments.length > 2 ? arguments[2] : undefined;
      var pinnedColumns = arguments.length > 3 ? arguments[3] : undefined;
      this.totalRowCount = totalRowCount; // probably need some error handling here if no value is passed in
      this.totalColumnCount = totalColumnCount; // probably need some error handling here if no value is passed in
      this.pinnedColumns = pinnedColumns; // probably need some error handling here if no value is passed in    
      var outerEl = document.getElementById(this.elementId);
      var tableEl = document.getElementById("".concat(this.elementId, "_tableContainer"));
      var headEl = document.getElementById("".concat(this.elementId, "_tableHeader"));
      if (!headEl) {
        // something isn't right so exit the function
        return;
      }
      headEl.style.width = 'auto';
      headEl.innerHTML = this.buildHeaderHtml();
      this.sizes.outer = outerEl.getBoundingClientRect();
      this.sizes.table = tableEl.getBoundingClientRect();
      this.sizes.header = headEl.getBoundingClientRect();
      var maxWidth;
      if (typeof this.options.maxColWidth === 'number') {
        maxWidth = this.options.maxColWidth;
      } else if (this.options.maxColWidth.indexOf('%') !== -1) {
        maxWidth = this.sizes.table.width * (+this.options.maxColWidth.replace('%', '') / 100);
      } else if (this.options.maxColWidth.indexOf('px') !== -1) {
        maxWidth = +this.options.maxColWidth.replace('px', '');
      }
      var bodyEl = document.getElementById("".concat(this.elementId, "_tableBody"));
      bodyEl.style.width = 'auto';
      bodyEl.innerHTML = this.buildBodyHtml([sample]);
      var footerEl = document.getElementById("".concat(this.elementId, "_tableFooter"));
      footerEl.innerHTML = this.buildTotalHtml();
      this.sizes.total = footerEl.getBoundingClientRect();
      var rows = Array.from(tableEl.querySelectorAll('.websy-table-row:not(.websy-table-parent-header)'));
      var totalWidth = 0;
      this.sizes.scrollableWidth = this.sizes.table.width;
      var firstNonPinnedColumnWidth = 0;
      var columnsForSizing = this.options.columns[this.options.columns.length - 1].filter(function (c) {
        return c.show !== false;
      });
      rows.forEach(function (row, rowIndex) {
        Array.from(row.children).forEach(function (col, colIndex) {
          var colSize = col.getBoundingClientRect();
          _this48.sizes.cellHeight = colSize.height;
          if (columnsForSizing[colIndex]) {
            if (!columnsForSizing[colIndex].actualWidth) {
              columnsForSizing[colIndex].potentialWidth = 0;
              columnsForSizing[colIndex].actualWidth = 0;
            }
            columnsForSizing[colIndex].potentialWidth = Math.max(columnsForSizing[colIndex].potentialWidth, colSize.width);
            columnsForSizing[colIndex].actualWidth = Math.min(Math.max(columnsForSizing[colIndex].actualWidth, colSize.width), maxWidth);
            // if (columnsForSizing[colIndex].width) {
            //   columnsForSizing[colIndex].actualWidth = columnsForSizing[colIndex].width
            // }
            columnsForSizing[colIndex].cellHeight = colSize.height;
            if (colIndex >= _this48.pinnedColumns) {
              firstNonPinnedColumnWidth = columnsForSizing[colIndex].actualWidth;
            }
          }
        });
      });
      // columnsForSizing.forEach((col, colIndex) => {
      //   if (colIndex < this.pinnedColumns) {
      //     this.sizes.scrollableWidth -= col.actualWidth
      //   }
      // })
      this.sizes.totalWidth = columnsForSizing.reduce(function (a, b) {
        return a + (b.width || b.actualWidth);
      }, 0);
      this.sizes.totalNonPinnedWidth = columnsForSizing.filter(function (c, i) {
        return i >= _this48.pinnedColumns;
      }).reduce(function (a, b) {
        return a + (b.width || b.actualWidth);
      }, 0);
      this.sizes.pinnedWidth = this.sizes.totalWidth - this.sizes.totalNonPinnedWidth;
      // const outerSize = outerEl.getBoundingClientRect()    
      if (this.sizes.totalWidth < this.sizes.table.width) {
        var requiredSpace = 0;
        var availableSpace = this.sizes.table.width - this.sizes.totalWidth;
        columnsForSizing.forEach(function (c) {
          c.shouldGrow = true;
          if (_this48.options.autoFitColumns === false) {
            c.shouldGrow = false;
            if (c.potentialWidth > c.actualWidth) {
              c.shouldGrow = true;
              c.growDiff = c.potentialWidth - c.actualWidth;
              c.growDiffPerc = (c.potentialWidth - c.actualWidth) / availableSpace;
              requiredSpace += c.growDiff;
            }
          }
        });
        var equalWidth = (this.sizes.table.width - this.sizes.totalWidth) / columnsForSizing.filter(function (c) {
          return c.shouldGrow;
        }).length;
        this.sizes.totalWidth = 0;
        this.sizes.totalNonPinnedWidth = 0;
        columnsForSizing.forEach(function (c, i) {
          // if (!c.width) {
          // if (c.actualWidth < equalWidth) {
          // adjust the width
          if (_this48.options.autoFitColumns === true) {
            if (c.width) {
              c.width += equalWidth;
            }
            c.actualWidth += equalWidth;
          } else {
            if (requiredSpace > 0 && requiredSpace <= availableSpace) {
              if (c.shouldGrow) {
                if (c.width) {
                  c.width += c.growDiff;
                }
                c.actualWidth += c.growDiff;
              }
            } else {
              if (c.shouldGrow) {
                if (c.width) {
                  c.width += availableSpace * (c.growDiff / requiredSpace);
                }
                c.actualWidth += availableSpace * (c.growDiff / requiredSpace);
              }
            }
          }
          //   }
          // }
          _this48.sizes.totalWidth += c.width || c.actualWidth;
          if (i > _this48.pinnedColumns) {
            _this48.sizes.totalNonPinnedWidth += c.width || c.actualWidth;
          }
          // equalWidth = (outerSize.width - this.sizes.totalWidth) / (this.options.columns[this.options.columns.length - 1].length - (i + 1))
        });
      }
      // check that we have enough from for all of the pinned columns plus 1 non pinned column    
      if (this.sizes.pinnedWidth > this.sizes.table.width - firstNonPinnedColumnWidth) {
        this.sizes.totalWidth = 0;
        var diff = this.sizes.pinnedWidth - (this.sizes.table.width - firstNonPinnedColumnWidth);
        var oldPinnedWidth = this.sizes.pinnedWidth;
        this.sizes.pinnedWidth = 0;
        // let colDiff = diff / this.pinnedColumns
        for (var i = 0; i < columnsForSizing.length; i++) {
          if (i < this.pinnedColumns) {
            var colDiff = columnsForSizing[i].actualWidth / oldPinnedWidth * diff;
            columnsForSizing[i].actualWidth -= colDiff;
            this.sizes.pinnedWidth += columnsForSizing[i].actualWidth;
          }
          this.sizes.totalWidth += columnsForSizing[i].width || columnsForSizing[i].actualWidth;
        }
      }
      // take the height of the last cell as the official height for data cells
      // this.sizes.dataCellHeight = this.options.columns[this.options.columns.length - 1].cellHeight
      this.sizes.scrollableWidth = this.sizes.table.width - this.sizes.pinnedWidth;
      headEl.innerHTML = '';
      bodyEl.innerHTML = '';
      footerEl.innerHTML = '';
      headEl.style.width = 'initial';
      bodyEl.style.width = 'initial';
      this.sizes.bodyHeight = this.sizes.table.height - (this.sizes.header.height + this.sizes.total.height);
      if (this.options.maxHeight) {
        var requiredHeight = ((this.totalRowCount || 9) + 1) * this.sizes.cellHeight;
        this.sizes.bodyHeight = Math.min(requiredHeight, this.options.maxHeight - (this.sizes.header.height + this.sizes.total.height));
      }
      this.sizes.rowsToRender = Math.ceil(this.sizes.bodyHeight / this.sizes.cellHeight);
      this.sizes.rowsToRenderPrecise = this.sizes.bodyHeight / this.sizes.cellHeight;
      // this.startRow = 0
      this.endRow = this.startRow + this.sizes.rowsToRender;
      this.startCol = 0;
      this.endCol = this.options.columns[this.options.columns.length - 1].length;
      if (this.sizes.rowsToRender < this.totalRowCount) {
        this.vScrollRequired = true;
      } else {
        this.vScrollRequired = false;
      }
      if (this.sizes.totalWidth.toFixed(3) > this.sizes.table.width.toFixed(3)) {
        this.hScrollRequired = true;
      } else {
        this.hScrollRequired = false;
      }
      this.options.allColumns = this.options.columns.map(function (c) {
        return c;
      });
      // console.log('sizes', this.sizes)
      return this.sizes;
    }
  }, {
    key: "createSample",
    value: function createSample(data) {
      var _this49 = this;
      var output = [];
      this.options.columns[this.options.columns.length - 1].forEach(function (col, colIndex) {
        if (col.maxLength) {
          output.push({
            value: new Array(col.maxLength).fill('W').join('')
          });
        } else if (data) {
          var longest = '';
          for (var i = 0; i < Math.min(data.length, 1000); i++) {
            if (data[i].length === _this49.options.columns[_this49.options.columns.length - 1].length) {
              if (longest.length < data[i][colIndex].value.length) {
                longest = data[i][colIndex].value;
              }
            }
          }
          output.push({
            value: longest
          });
        } else {
          output.push({
            value: ''
          });
        }
      });
      return output;
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      var colIndex = +event.target.getAttribute('data-col-index');
      var cellIndex = +event.target.getAttribute('data-cell-index');
      var rowIndex = +event.target.getAttribute('data-row-index');
      if (event.target.classList.contains('websy-table-search-icon')) {
        if (this.options.columns[this.options.columns.length - 1][colIndex].onSearch) {
          this.options.columns[this.options.columns.length - 1][colIndex].onSearch(event, this.options.columns[this.options.columns.length - 1][colIndex]);
        }
      }
      if (event.target.classList.contains('websy-table-cell-collapse')) {
        if (this.options.onCollapseCell) {
          this.options.onCollapseCell(event, +rowIndex, +colIndex);
        } else {
          // out of box function
        }
      } else if (event.target.classList.contains('websy-table-cell-expand')) {
        if (this.options.onExpandCell) {
          this.options.onExpandCell(event, +rowIndex, +colIndex);
        } else {
          // out of box function
        }
      } else if (event.target.classList.contains('sortable-column')) {
        // const sortIndex = +event.target.getAttribute('data-sort-index')
        var column = this.options.columns[this.options.columns.length - 1][colIndex];
        if (this.options.onSort) {
          this.options.onSort(event, column, colIndex);
        } else {
          this.internalSort(column, colIndex);
        }
      } else if (event.target.classList.contains('websy-table-cell-content') || event.target.classList.contains('websy-table-cell')) {
        if (this.options.onCellSelect) {
          this.options.onCellSelect(event, {
            cellIndex: cellIndex,
            colIndex: colIndex,
            rowIndex: rowIndex,
            cell: (this.currentData[rowIndex] || [])[cellIndex],
            column: (this.options.columns[this.options.columns.length - 1] || [])[colIndex]
          });
        }
      }
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(event) {
      if (this.isTouchDevice) {
        return;
      }
      if (event.target.classList.contains('websy-scroll-handle-y')) {
        // set up the scroll start values
        this.scrollDragging = true;
        this.scrollDirection = 'y';
        var scrollHandleEl = document.getElementById("".concat(this.elementId, "_vScrollHandle"));
        this.handleYStart = scrollHandleEl.offsetTop;
        this.mouseYStart = event.pageY;
        // console.log('mouse down', this.handleYStart, this.mouseYStart)
        // console.log(scrollHandleEl.offsetTop)
      } else if (event.target.classList.contains('websy-scroll-handle-x')) {
        if (this.isTouchDevice) {
          event.preventDefault();
        }
        this.scrollDragging = true;
        this.scrollDirection = 'x';
        var _scrollHandleEl = document.getElementById("".concat(this.elementId, "_hScrollHandle"));
        this.handleXStart = _scrollHandleEl.offsetLeft;
        this.mouseXStart = event.pageX;
      }
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      // event.preventDefault()
      if (this.scrollDragging === true) {
        if (this.isTouchDevice) {
          event.preventDefault();
        }
        if (this.scrollDirection === 'y') {
          var diff = event.pageY - this.mouseYStart;
          this.scrollY(diff);
        } else if (this.scrollDirection === 'x') {
          var _diff = event.pageX - this.mouseXStart;
          this.scrollX(_diff);
        }
      }
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(event) {
      this.scrollDragging = false;
      this.cellDragging = false;
      this.handleYStart = null;
      this.mouseYStart = null;
      this.handleXStart = null;
      this.mouseXStart = null;
    }
  }, {
    key: "handleScrollWheel",
    value: function handleScrollWheel(event) {
      if (this.options.virtualScroll === true) {
        event.preventDefault();
        // console.log('scrollwheel', event)
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
          // this.scrollX(Math.max(-2, Math.min(2, event.deltaX)))
          if (this.hScrollRequired === false) {
            return;
          }
          var scrollHandleEl = document.getElementById("".concat(this.elementId, "_hScrollHandle"));
          var scrollContainerEl = document.getElementById("".concat(this.elementId, "_hScrollContainer"));
          var resolvedDelta = (scrollContainerEl.getBoundingClientRect().width - scrollHandleEl.getBoundingClientRect().width) / this.totalColumnCount;
          if (event.deltaX < 0) {
            resolvedDelta = resolvedDelta * -1;
          }
          this.scrollX(resolvedDelta);
        } else {
          // console.log('delta', event.deltaY)
          // force the scroll to be a single row at a time
          if (this.vScrollRequired === false) {
            return;
          }
          var _scrollHandleEl2 = document.getElementById("".concat(this.elementId, "_vScrollHandle"));
          var _scrollContainerEl = document.getElementById("".concat(this.elementId, "_vScrollContainer"));
          var _resolvedDelta = (_scrollContainerEl.getBoundingClientRect().height - _scrollHandleEl2.getBoundingClientRect().height) / this.totalRowCount;
          if (event.deltaY < 0) {
            _resolvedDelta = _resolvedDelta * -1;
          }
          // console.log('resolvedDelta', resolvedDelta)
          // this.scrollY(Math.max(-2, Math.min(2, event.deltaY)))
          this.scrollY(_resolvedDelta);
        }
      } else if (this.options.onNativeScroll) {
        var el = document.getElementById("".concat(this.elementId, "_tableBody"));
        this.options.onNativeScroll(el.scrollTop);
      }
    }
  }, {
    key: "handleTouchEnd",
    value: function handleTouchEnd(event) {
      // console.log('touch end fired')
      this.scrollDragging = false;
      this.cellDragging = false;
      this.handleYStart = null;
      this.mouseYStart = null;
      this.handleXStart = null;
      this.mouseXStart = null;
      if (typeof event.targetTouches !== 'undefined') {
        this.isTouchScrolling = false;
        // this.touchEndTime = (new Date()).getTime()
        // this.isPerpetual = true
        // this.perpetualScroll()	
        // this.touchStartTime = null
        // const touchScrollEl = document.getElementById(`${this.elementId}_touchScroller`)
        // touchScrollEl.classList.add('hidden')
      }
    }
  }, {
    key: "handleTouchMove",
    value: function handleTouchMove(event) {
      // console.log(event.target.classList)
      if (this.isTouchScrolling === true) {
        event.preventDefault();
        event.stopPropagation();
        if (typeof event.targetTouches !== 'undefined' && event.targetTouches.length > 0) {
          event.deltaX = this.touchXStart - event.targetTouches[0].pageX;
          event.deltaY = this.touchYStart - event.targetTouches[0].pageY;
          if (Math.abs(event.deltaY) > 50) {
            event.deltaX = 0;
            this.handleScrollWheel(event);
          } else if (Math.abs(event.deltaX) > 50) {
            event.deltaY = 0;
            this.handleScrollWheel(event);
          }
        }
      }
      if (this.scrollDragging === true) {
        event.preventDefault();
        if (this.scrollDirection === 'y') {
          var diff = event.targetTouches[0].pageY - this.mouseYStart;
          this.scrollY(diff);
        } else if (this.scrollDirection === 'x') {
          var _diff2 = event.targetTouches[0].pageX - this.mouseXStart;
          this.scrollX(_diff2);
        }
      }
    }
  }, {
    key: "handleTouchStart",
    value: function handleTouchStart(event) {
      if (event.target.classList.contains('websy-table-cell-expand')) {
        return;
      }
      if (event.target.classList.contains('websy-table-cell-collapse')) {
        return;
      }
      // console.log(event.target.classList)
      if (event.target.classList.contains('websy-table-touch-scroller')) {
        if (this.options.virtualScroll === true) {
          //   this.touchStartTime = (new Date()).getTime()
          this.isTouchScrolling = true;
          //   this.isPerpetual = false
          this.touchYStart = event.targetTouches[0].pageY;
          this.touchXStart = event.targetTouches[0].pageX;
        }
      }
      if (event.target.classList.contains('websy-scroll-handle-y')) {
        // set up the scroll start values
        this.scrollDragging = true;
        this.scrollDirection = 'y';
        var scrollHandleEl = document.getElementById("".concat(this.elementId, "_vScrollHandle"));
        this.handleYStart = scrollHandleEl.offsetTop;
        this.mouseYStart = event.targetTouches[0].pageY;
        // console.log('mouse down', this.handleYStart, this.mouseYStart)
        // console.log(scrollHandleEl.offsetTop)
      } else if (event.target.classList.contains('websy-scroll-handle-x')) {
        if (this.isTouchDevice) {
          event.preventDefault();
        }
        this.scrollDragging = true;
        this.scrollDirection = 'x';
        var _scrollHandleEl3 = document.getElementById("".concat(this.elementId, "_hScrollHandle"));
        this.handleXStart = _scrollHandleEl3.offsetLeft;
        this.mouseXStart = event.targetTouches[0].pageX;
      }
      //   // const touchScrollEl = document.getElementById(`${this.elementId}_touchScroller`)
      //   // touchScrollEl.classList.remove('hidden')
      //   const handleYEl = document.getElementById(`${this.elementId}_vScrollHandle`)
      //   this.handleYStart = handleYEl.offsetTop
      //   const handleXEl = document.getElementById(`${this.elementId}_hScrollHandle`)
      //   this.handleXStart = handleXEl.offsetLeft  
      // }    
    }
  }, {
    key: "hideError",
    value: function hideError() {
      var el = document.getElementById("".concat(this.elementId, "_tableContainer"));
      if (el) {
        el.classList.remove('has-error');
      }
      var tableEl = document.getElementById("".concat(this.elementId, "_tableInner"));
      if (tableEl) {
        tableEl.classList.remove('hidden');
      }
      var containerEl = document.getElementById("".concat(this.elementId, "_errorContainer"));
      if (containerEl) {
        containerEl.classList.remove('active');
      }
    }
  }, {
    key: "hideLoading",
    value: function hideLoading() {
      this.loadingDialog.hide();
    }
  }, {
    key: "perpetualScroll",
    value: function perpetualScroll() {
      var _this50 = this;
      // if the currentTouchtime and touchEndTime are more than 300ms apart then we abort the perpetual scroll
      if (this.touchEndTime - this.currentTouchtime > 300) {
        return;
      }
      // get the difference in time between when the touch initially started and when it ended
      // the longer the touch duration, the slower the scroll
      var touchDuration = this.touchEndTime - this.touchStartTime;
      // get the distance moved between when the touch initially started and when it ended
      var touchDistance = this.currentClientY - this.mouseYStart;
      // the bigger the distance, the more we scroll
      // use the duration and distance to calculate the duration of the perpetual scroll
      var perpetualDistance = Math.abs(touchDistance * (1 / (touchDuration / 1000)));
      var perpetualDuration = touchDuration * 1.5 / 1000;
      var requiredFrames = Math.abs(Math.ceil(perpetualDistance / this.sizes.cellHeight));
      var fps = requiredFrames / perpetualDuration;
      var direction = touchDistance > 0 ? -1 : 1;
      var _loop2 = function _loop2(i) {
        setTimeout(function () {
          var delta = _this50.mouseYStart - _this50.currentClientY + _this50.sizes.cellHeight * (i + 1) * direction;
          delta = Math.min(10, delta);
          delta = Math.max(-10, delta);
          // only run this if isPerpetual === true
          // this value is reset to false on touchStart
          if (_this50.isPerpetual === true) {
            // this.$scope.scrollTop += (delta / (this.$scope.layout.qHyperCube.qSize.qcy / this.$scope.rowsToLoad / (this.$scope.totalSpaceAvailable / 250)))
            // this.$scope.scrollTop += (delta / (this.$scope.layout.qHyperCube.qSize.qcy / this.$scope.rowsToLoad / (this.$scope.totalSpaceAvailable / 200)))
            _this50.scrollY(Math.max(-5, Math.min(5, delta)));
            if (_this50.scrollTimeout) {
              clearTimeout(_this50.scrollTimeout);
            }
          }
        }, 1000 / fps * i);
      };
      for (var i = 0; i < requiredFrames; i++) {
        _loop2(i);
      }
    }
  }, {
    key: "render",
    value: function render(data) {
      var calcSizes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!this.options.columns) {
        console.log("No columns provided for table with ID ".concat(this.elementId));
        return;
      }
      if (this.options.columns.length === 0) {
        console.log("No columns provided for table with ID ".concat(this.elementId));
        return;
      }
      // this.data = []
      this.currentData = [];
      // Adjust the sizing of the header/body/footer
      if (calcSizes === true) {
        var sample = this.createSample(data);
        this.calculateSizes(sample, data.length, (data[0] || []).length, 0);
      }
      // console.log(this.options.columns)
      var tableInnerEl = document.getElementById("".concat(this.elementId, "_tableInner"));
      if (tableInnerEl) {
        tableInnerEl.style.width = "".concat(this.sizes.totalWidth, "px");
      }
      this.renderColumnHeaders();
      this.renderTotals();
      if (data) {
        this.appendRows(data);
      }
      var bodyEl = document.getElementById("".concat(this.elementId, "_tableBody"));
      if (!bodyEl) {
        // something isn't right so exit the function
        return;
      }
      // bodyEl.innerHTML = this.buildBodyHtml(data, true)
      // if (this.options.maxHeight) {
      //   bodyEl.style.height = `${this.options.maxHeight - this.sizes.header.height - this.sizes.total.height}px`
      // }
      // else {
      //   bodyEl.style.height = `calc(100% - ${this.sizes.header.height}px - ${this.sizes.total.height}px)`
      // }    
      bodyEl.style.height = "".concat(this.sizes.bodyHeight, "px");
      if (this.isTouchDevice === true) {
        var touchScrollEl = document.getElementById("".concat(this.elementId, "_touchScroller"));
        if (touchScrollEl) {
          touchScrollEl.style.top = "".concat(this.sizes.header.height, "px");
          touchScrollEl.style.height = "calc(100% - ".concat(this.sizes.header.height + 30, "px)");
        }
      }
      if (this.options.virtualScroll === true) {
        // set the scroll element positions
        var vScrollEl = document.getElementById("".concat(this.elementId, "_vScrollContainer"));
        var vHandleEl = document.getElementById("".concat(this.elementId, "_vScrollHandle"));
        if (this.vScrollRequired === true) {
          vScrollEl.style.top = "".concat(this.sizes.header.height + this.sizes.total.height, "px");
          vScrollEl.style.height = "".concat(this.sizes.bodyHeight, "px");
          if (this.isTouchDevice === true) {
            vScrollEl.style.visibility = "unset";
          }
          vHandleEl.style.height = Math.max(this.options.minHandleSize, this.sizes.bodyHeight * (this.sizes.rowsToRenderPrecise / this.totalRowCount)) + 'px';
          var scrollableSpace = vScrollEl.getBoundingClientRect().height - vHandleEl.getBoundingClientRect().height;
          vHandleEl.style.top = Math.round(this.startRow / (this.totalRowCount - this.sizes.rowsToRender) * scrollableSpace) + 'px';
        } else {
          vHandleEl.style.height = '0px';
        }
        var hScrollEl = document.getElementById("".concat(this.elementId, "_hScrollContainer"));
        var hHandleEl = document.getElementById("".concat(this.elementId, "_hScrollHandle"));
        if (this.hScrollRequired === true) {
          hScrollEl.style.right = "".concat(this.isTouchDevice ? this.options.touchScrollWidth : this.options.scrollWidth, "px");
          // hScrollEl.style.left = `${this.sizes.table.width - this.sizes.scrollableWidth}px`
          // hScrollEl.style.width = `${this.sizes.scrollableWidth - (this.isTouchDevice ? this.options.touchScrollWidth : this.options.scrollWidth)}px` 
          hScrollEl.style.width = "".concat(this.sizes.scrollableWidth, "px");
          hHandleEl.style.width = Math.max(this.options.minHandleSize, this.sizes.scrollableWidth * (this.sizes.scrollableWidth / this.sizes.totalNonPinnedWidth)) + 'px';
          if (this.isTouchDevice === true) {
            hScrollEl.style.visibility = "unset";
          }
        } else {
          hHandleEl.style.width = '0px';
        }
      }
    }
  }, {
    key: "renderColumnHeaders",
    value: function renderColumnHeaders() {
      var headEl = document.getElementById("".concat(this.elementId, "_tableHeader"));
      if (headEl) {
        headEl.innerHTML = this.buildHeaderHtml(true);
      }
    }
  }, {
    key: "renderTotals",
    value: function renderTotals() {
      var headEl = document.getElementById("".concat(this.elementId, "_tableHeader"));
      var totalHtml = this.buildTotalHtml(true);
      if (this.options.showTotalsAbove === true && headEl) {
        headEl.innerHTML += totalHtml;
      } else {
        var footerEl = document.getElementById("".concat(this.elementId, "_tableFooter"));
        if (footerEl) {
          footerEl.innerHTML = totalHtml;
        }
      }
    }
  }, {
    key: "resize",
    value: function resize() {}
  }, {
    key: "showError",
    value: function showError(options) {
      var el = document.getElementById("".concat(this.elementId, "_tableContainer"));
      if (el) {
        el.classList.add('has-error');
      }
      var containerEl = document.getElementById("".concat(this.elementId, "_errorContainer"));
      if (containerEl) {
        containerEl.classList.add('active');
      }
      if (options.title) {
        var titleEl = document.getElementById("".concat(this.elementId, "_errorTitle"));
        if (titleEl) {
          titleEl.innerHTML = options.title;
        }
      }
      if (options.message) {
        var messageEl = document.getElementById("".concat(this.elementId, "_errorMessage"));
        if (messageEl) {
          messageEl.innerHTML = options.message;
        }
      }
    }
  }, {
    key: "scrollX",
    value: function scrollX(diff) {
      var el = document.getElementById("".concat(this.elementId, "_tableContainer"));
      if (!el.classList.contains('scrolling')) {
        el.classList.add('scrolling');
      }
      if (this.scrollTimeoutFn) {
        clearTimeout(this.scrollTimeoutFn);
      }
      this.scrollTimeoutFn = setTimeout(function () {
        el.classList.remove('scrolling');
      }, 200);
      if (this.hScrollRequired === false) {
        return;
      }
      var scrollContainerEl = document.getElementById("".concat(this.elementId, "_hScrollContainer"));
      var scrollHandleEl = document.getElementById("".concat(this.elementId, "_hScrollHandle"));
      var handlePos;
      if (typeof this.handleXStart !== 'undefined' && this.handleXStart !== null) {
        handlePos = this.handleXStart + diff;
      } else {
        handlePos = scrollHandleEl.offsetLeft + diff;
      }
      var scrollableSpace = scrollContainerEl.getBoundingClientRect().width - scrollHandleEl.getBoundingClientRect().width;
      // console.log('dragging x', diff, scrollContainerEl.getBoundingClientRect().width - scrollHandleEl.getBoundingClientRect().width)
      scrollHandleEl.style.left = Math.min(scrollableSpace, Math.max(0, handlePos)) + 'px';
      if (this.options.onScroll) {
        var actualLeft = (this.sizes.totalNonPinnedWidth - this.sizes.scrollableWidth) * (Math.min(scrollableSpace, Math.max(0, handlePos)) / scrollableSpace);
        var cumulativeWidth = 0;
        this.startCol = 0;
        this.endCol = 0;
        for (var i = this.pinnedColumns; i < this.options.allColumns[this.options.allColumns.length - 1].length; i++) {
          if (this.options.allColumns[this.options.allColumns.length - 1][i].show !== false) {
            cumulativeWidth += this.options.allColumns[this.options.allColumns.length - 1][i].actualWidth;
            if (actualLeft < cumulativeWidth) {
              this.startCol = i;
              break;
            }
          }
        }
        cumulativeWidth = 0;
        var lastColWidth = 0;
        for (var _i10 = this.startCol; _i10 < this.options.allColumns[this.options.allColumns.length - 1].length; _i10++) {
          if (this.options.allColumns[this.options.allColumns.length - 1][_i10].show !== false) {
            cumulativeWidth += this.options.allColumns[this.options.allColumns.length - 1][_i10].actualWidth;
            if (cumulativeWidth < this.sizes.scrollableWidth) {
              this.endCol = _i10;
            }
          }
        }
        if (this.endCol < this.options.allColumns[this.options.allColumns.length - 1].length - 1) {
          this.endCol += 1;
        }
        if (this.endCol === this.options.allColumns[this.options.allColumns.length - 1].length - 1 && cumulativeWidth > this.sizes.scrollableWidth && actualLeft > 0) {
          this.startCol += 1;
        }
        if (scrollHandleEl.offsetWidth + scrollHandleEl.offsetLeft >= scrollContainerEl.offsetWidth - lastColWidth) {
          this.endCol = this.options.allColumns[this.options.allColumns.length - 1].length - 1;
          this.startCol = this.endCol + 1;
          // one last measurement
          var finalAcc = 0;
          for (var _i11 = this.endCol; _i11 > -1; _i11--) {
            if (this.options.allColumns[this.options.allColumns.length - 1][_i11].show !== false) {
              finalAcc += this.options.allColumns[this.options.allColumns.length - 1][_i11].actualWidth;
              if (finalAcc < this.sizes.scrollableWidth) {
                this.startCol--;
              }
            }
          }
        }
        this.endCol = Math.max(this.startCol, this.endCol);
        this.options.onScroll('y', this.startRow, this.endRow, this.startCol - this.pinnedColumns, this.endCol - this.pinnedColumns);
      }
    }
  }, {
    key: "scrollY",
    value: function scrollY(diff) {
      var el = document.getElementById("".concat(this.elementId, "_tableContainer"));
      if (this.vScrollRequired === false) {
        return;
      }
      if (!el.classList.contains('scrolling')) {
        el.classList.add('scrolling');
      }
      if (this.scrollTimeoutFn) {
        clearTimeout(this.scrollTimeoutFn);
      }
      this.scrollTimeoutFn = setTimeout(function () {
        el.classList.remove('scrolling');
      }, 200);
      // if (this.vScrollRequired === false) {
      //   return
      // }
      // console.log('this.handleYStart', this.handleYStart)
      var scrollContainerEl = document.getElementById("".concat(this.elementId, "_vScrollContainer"));
      var scrollHandleEl = document.getElementById("".concat(this.elementId, "_vScrollHandle"));
      var handlePos;
      if (typeof this.handleYStart !== 'undefined' && this.handleYStart !== null) {
        handlePos = this.handleYStart + diff;
      } else {
        // console.log('appending not resetting')
        handlePos = +scrollHandleEl.style.top.replace('px', '') + diff;
      }
      var scrollableSpace = scrollContainerEl.getBoundingClientRect().height - scrollHandleEl.getBoundingClientRect().height;
      // console.log('dragging y', (diff), scrollContainerEl.getBoundingClientRect().height - scrollHandleEl.getBoundingClientRect().height)
      scrollHandleEl.style.top = Math.min(scrollableSpace, Math.max(0, handlePos)) + 'px';
      if (this.options.onScroll) {
        this.startRow = Math.min(this.totalRowCount - this.sizes.rowsToRender, Math.max(0, Math.round((this.totalRowCount - this.sizes.rowsToRender) * (handlePos / scrollableSpace))));
        this.endRow = this.startRow + this.sizes.rowsToRender;
        if (this.endRow === this.totalRowCount) {
          this.startRow += 1;
        }
        this.options.onScroll('y', this.startRow, this.endRow, Math.max(0, this.startCol - this.pinnedColumns), this.endCol - this.pinnedColumns);
      }
    }
  }, {
    key: "showLoading",
    value: function showLoading(options) {
      if (this.options.disableInternalLoader !== true) {
        this.loadingDialog.show(options);
      }
    }
  }]);
  return WebsyTable3;
}();
/* global d3 include WebsyDesigns */
var WebsyChart = /*#__PURE__*/function () {
  function WebsyChart(elementId, options) {
    var _this51 = this;
    _classCallCheck(this, WebsyChart);
    var DEFAULTS = {
      margin: {
        top: 20,
        left: 3,
        bottom: 3,
        right: 3,
        axisBottom: 0,
        axisLeft: 0,
        axisRight: 0,
        axisTop: 0,
        legendBottom: 0,
        legendLeft: 0,
        legendRight: 0,
        legendTop: 0
      },
      axis: {},
      orientation: 'vertical',
      colors: ['#5e4fa2', '#3288bd', '#66c2a5', '#abdda4', '#e6f598', '#fee08b', '#fdae61', '#f46d43', '#d53e4f', '#9e0142'],
      transitionDuration: 650,
      curveStyle: 'curveLinear',
      lineWidth: 2,
      forceZero: true,
      grouping: 'grouped',
      groupPadding: 3,
      fontSize: 14,
      symbolSize: 20,
      showTrackingLine: true,
      showTooltip: true,
      showLegend: false,
      legendPosition: 'bottom',
      tooltipWidth: 200,
      brushHeight: 50,
      minBandWidth: 30,
      maxBandWidth: 100,
      allowUnevenBands: true,
      allowBrushing: true,
      balancedMinMax: false,
      onRendered: function onRendered() {}
    };
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    this._isRendered = false;
    this.leftAxis = null;
    this.rightAxis = null;
    this.topAxis = null;
    this.bottomAxis = null;
    this.renderedKeys = {};
    this.brushedDomain = [];
    this.brushBarsInitialized = {};
    this.brushLinesInitialized = {};
    if (!elementId) {
      console.log('No element Id provided for Websy Chart');
      return;
    }
    this.invertOverride = function (input, input2) {
      var forBrush = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var xAxis = 'bottom';
      if (_this51.options.orientation === 'horizontal') {
        xAxis = 'left';
      }
      if (forBrush === true) {
        xAxis += 'Brush';
      }
      xAxis += 'Axis';
      var output;
      var width = _this51.options.data[xAxis.replace('Brush', '').replace('Axis', '')].bandWidth;
      // if (this.customBottomRange) {
      for (var index = 0; index < _this51.customBottomRange.length; index++) {
        if (input > _this51.customBottomRange[index]) {
          if (_this51.customBottomRange[index + 1]) {
            if (input < _this51.customBottomRange[index + 1]) {
              output = index;
              break;
            }
          } else {
            output = index;
            break;
          }
        }
      }
      return output;
    };
    var that = this;
    this.brushed = function (event) {
      var newX = that.options.margin.left + that.options.margin.axisLeft + (1 - event.selection[0] / (that.plotWidth / (that.widthForCalc + that.totalBandPadding)));
      var newY = that.options.margin.top + that.options.margin.axisTop;
      if (that.options.orientation === 'horizontal') {
        newX = that.options.brushHeight + that.options.margin.left + that.options.margin.axisLeft;
        newY = that.options.margin.top + that.options.margin.axisTop + (1 - event.selection[0] / (that.plotHeight / (that.widthForCalc + that.totalBandPadding)));
      }
      if (that.plotArea) {
        that.plotArea.attr('transform', "translate(".concat(newX, ", ").concat(newY, ")"));
      }
      if (that.areaLayer) {
        that.areaLayer.attr('transform', "translate(".concat(newX, ", ").concat(newY, ")"));
      }
      if (that.lineLayer) {
        that.lineLayer.attr('transform', "translate(".concat(newX, ", ").concat(newY, ")"));
      }
      if (that.barLayer) {
        that.barLayer.attr('transform', "translate(".concat(newX, ", ").concat(newY, ")"));
      }
      if (that.labelLayer) {
        that.labelLayer.attr('transform', "translate(".concat(newX, ", ").concat(newY, ")"));
      }
      if (that.symbolLayer) {
        that.symbolLayer.attr('transform', "translate(".concat(newX, ", ").concat(newY, ")"));
      }
      if (that.refLineLayer) {
        that.refLineLayer.attr('transform', "translate(".concat(newX, ", ").concat(newY, ")"));
      }
      if (that.options.orientation === 'horizontal') {
        if (that.leftAxisLayer) {
          that.leftAxisLayer.attr('transform', "translate(".concat(that.options.brushHeight + that.options.margin.left + that.options.margin.axisLeft, ", ").concat(newY, ")"));
        }
      } else {
        if (that.bottomAxisLayer) {
          that.bottomAxisLayer.attr('transform', "translate(".concat(newX, ", ").concat(newY + that.plotHeight, ")"));
        }
      }
    };
    var el = document.getElementById(this.elementId);
    if (el) {
      el.classList.add('websy-chart');
      if (typeof d3 === 'undefined') {
        console.error('d3 library has not been loaded');
      } else {
        el.innerHTML = '';
        this.svg = d3.select(el).append('svg'); // .attr('id', `${this.elementId}_chartContainer`)
        this.legendArea = d3.select(el).append('div').attr('id', "".concat(this.elementId, "_legend")).attr('class', 'websy-chart-legend');
        this.legend = new WebsyDesigns.Legend("".concat(this.elementId, "_legend"), {});
        this.errorContainer = d3.select(el).append('div').attr('id', "".concat(this.elementId, "_errorContainer")).attr('class', 'websy-vis-error-container').html("          \n            <div>\n              <div id=\"".concat(this.elementId, "_errorTitle\"></div>\n              <div id=\"").concat(this.elementId, "_errorMessage\"></div>\n            </div>\n          "));
        this.loadingContainer = d3.select(el).append('div').attr('id', "".concat(this.elementId, "_loadingContainer"));
        this.loadingDialog = new WebsyDesigns.LoadingDialog("".concat(this.elementId, "_loadingContainer"));
        this.prep();
        // el.innerHTML += `
        //   <div id="${this.elementId}_errorContainer" class='websy-vis-error-container'>
        //     <div>
        //       <div id="${this.elementId}_errorTitle"></div>
        //       <div id="${this.elementId}_errorMessage"></div>
        //     </div>            
        //   </div>
        // `
      }
    } else {
      console.error("No element found with ID ".concat(this.elementId));
    }
  }
  _createClass(WebsyChart, [{
    key: "data",
    set: function set(d) {
      this.options.data = d;
      this.render();
    }
  }, {
    key: "isRendered",
    get: function get() {
      return this._isRendered;
    }
  }, {
    key: "close",
    value: function close() {
      this.leftAxisLayer && this.leftAxisLayer.selectAll('*').remove();
      this.rightAxisLayer && this.rightAxisLayer.selectAll('*').remove();
      this.bottomAxisLayer && this.bottomAxisLayer.selectAll('*').remove();
      this.leftAxisLabel && this.leftAxisLabel.selectAll('*').remove();
      this.rightAxisLabel && this.rightAxisLabel.selectAll('*').remove();
      this.bottomAxisLabel && this.bottomAxisLabel.selectAll('*').remove();
      this.plotArea && this.plotArea.selectAll('*').remove();
      this.areaLayer && this.areaLayer.selectAll('*').remove();
      this.lineLayer && this.lineLayer.selectAll('*').remove();
      this.barLayer && this.barLayer.selectAll('*').remove();
      this.labelLayer && this.labelLayer.selectAll('*').remove();
      this.symbolLayer && this.symbolLayer.selectAll('*').remove();
    }
  }, {
    key: "createDomain",
    value: function createDomain(side) {
      var forBrush = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var domain = [];
      /* global d3 side domain:writable forBrush */
      // if we have a brushed domain we use that
      var xAxis = 'bottom';
      if (this.options.orientation === 'horizontal') {
        xAxis = 'left';
      }
      if (this.brushedDomain.length > 0 && side === xAxis && forBrush === false) {
        domain = _toConsumableArray(this.brushedDomain);
      } else {
        // otherwise we create the domain
        if (typeof this.options.data[side].min !== 'undefined' && typeof this.options.data[side].max !== 'undefined') {
          // domain = [this.options.data[side].min - (this.options.data[side].min * 0.1), this.options.data[side].max * 1.1]
          domain = [this.options.data[side].min, this.options.data[side].max];
          if (this.options.forceZero === true) {
            domain = [Math.min(0, this.options.data[side].min), this.options.data[side].max];
          }
        }
        if (this.options.data[side].data) {
          domain = this.options.data[side].data.map(function (d) {
            return d.value;
          });
        }
        if (this.options.data[side].scale === 'Time') {
          var min = this.options.data[side].data[0].value;
          var max = this.options.data[side].data[this.options.data[side].data.length - 1].value;
          min = this.parseX(min);
          max = this.parseX(max);
          domain = [min, max];
        }
      }
      return domain;
    }
  }, {
    key: "createIdentity",
    value: function createIdentity() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < size; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }
  }, {
    key: "handleEventMouseOut",
    value: function handleEventMouseOut(event, d) {
      this.trackingLineLayer.select('.tracking-line').attr('stroke-opacity', 0);
      this.tooltip.hide();
      if (this.options.onMouseOut) {
        this.options.onMouseOut();
      }
    }
  }, {
    key: "handleEventMouseMove",
    value: function handleEventMouseMove(event, d) {
      var _this52 = this;
      var bisectDate = d3.bisector(function (d) {
        return _this52.parseX(d.x.value);
      }).left;
      if (this.options.showTrackingLine === true && d3.pointer(event)) {
        var xAxis = 'bottomAxis';
        var xData = 'bottom';
        var x0 = d3.pointer(event)[0];
        if (this.options.orientation === 'horizontal') {
          xAxis = 'leftAxis';
          xData = 'left';
          x0 = d3.pointer(event)[1];
        }
        var xPoint;
        var data;
        var tooltipHTML = '';
        var tooltipTitle = '';
        var tooltipData = [];
        if (!this[xAxis].invert) {
          this[xAxis].invert = this.invertOverride;
        }
        x0 = this[xAxis].invert(x0);
        var xDiff;
        if (typeof x0 === 'undefined') {
          this.tooltip.hide();
          if (this.options.onMouseOut) {
            this.options.onMouseOut();
          }
          return;
        }
        var xLabel = this[xAxis].domain()[x0];
        if (this.options.orientation === 'horizontal') {
          xLabel = _toConsumableArray(this[xAxis].domain().reverse())[x0];
        }
        this.options.data.series.forEach(function (s) {
          if (_this52.options.data[xData].scale !== 'Time') {
            // if (this.customBottomRange && this.customBottomRange.length > 0) {
            xPoint = _this52.customBottomRange[x0] + (_this52.customBottomRange[x0 + 1] - _this52.customBottomRange[x0]) / 2;
            // }
            // else {
            //   xPoint = this[xAxis](this.parseX(xLabel))
            // }
            s.data.forEach(function (d) {
              if (d.x.value === xLabel) {
                if (!tooltipTitle) {
                  tooltipTitle = d.x.value;
                }
                if (!d.y.color) {
                  d.y.color = s.color;
                }
                tooltipData.push(d);
              }
            });
          } else {
            var index = bisectDate(s.data, x0, 1);
            var pointA = s.data[index - 1];
            var pointB = s.data[index];
            if (_this52.options.orientation === 'horizontal') {
              pointA = _toConsumableArray(s.data).reverse()[index - 1];
              pointB = _toConsumableArray(s.data).reverse()[index];
            }
            if (pointA && !pointB) {
              xPoint = _this52[xAxis](_this52.parseX(pointA.x.value));
              tooltipTitle = pointA.x.value;
              if (!pointA.y.color) {
                pointA.y.color = s.color;
              }
              tooltipData.push(pointA);
              if (typeof pointA.x.value.getTime !== 'undefined') {
                tooltipTitle = d3.timeFormat(_this52.options.dateFormat || _this52.options.calculatedTimeFormatPattern)(pointA.x.value);
              }
            }
            if (pointB && !pointA) {
              xPoint = _this52[xAxis](_this52.parseX(pointB.x.value));
              tooltipTitle = pointB.x.value;
              if (!pointB.y.color) {
                pointB.y.color = s.color;
              }
              tooltipData.push(pointB);
              if (typeof pointB.x.value.getTime !== 'undefined') {
                tooltipTitle = d3.timeFormat(_this52.options.dateFormat || _this52.options.calculatedTimeFormatPattern)(pointB.x.value);
              }
            }
            if (pointA && pointB) {
              var d0 = _this52[xAxis](_this52.parseX(pointA.x.value));
              var d1 = _this52[xAxis](_this52.parseX(pointB.x.value));
              var mid = Math.abs(d0 - d1) / 2;
              if (d3.pointer(event)[0] - d0 >= mid) {
                xPoint = d1;
                tooltipTitle = pointB.x.value;
                if (typeof pointB.x.value.getTime !== 'undefined') {
                  tooltipTitle = d3.timeFormat(_this52.options.dateFormat || _this52.options.calculatedTimeFormatPattern)(pointB.x.value);
                }
                if (!pointB.y.color) {
                  pointB.y.color = s.color;
                }
                tooltipData.push(pointB);
              } else {
                xPoint = d0;
                tooltipTitle = pointA.x.value;
                if (typeof pointB.x.value.getTime !== 'undefined') {
                  tooltipTitle = d3.timeFormat(_this52.options.dateFormat || _this52.options.calculatedTimeFormatPattern)(pointB.x.value);
                }
                if (!pointA.y.color) {
                  pointA.y.color = s.color;
                }
                tooltipData.push(pointA);
              }
            }
          }
        });
        tooltipHTML = "          \n        <ul>\n      ";
        tooltipHTML += tooltipData.map(function (d) {
          return "\n        <li>\n          <i style='background-color: ".concat(d.y.color, ";'></i>\n          ").concat(d.y.tooltipLabel || '', "<span>: ").concat(d.y.tooltipValue || d.value, "</span>\n        </li>\n      ");
        }).join('');
        if (this.options.onMouseOver) {
          this.options.onMouseOver(tooltipData);
        }
        tooltipHTML += "</ul>";
        var posOptions = {
          width: this.options.tooltipWidth,
          left: 0,
          top: 0,
          onLeft: xPoint > this.plotWidth / 2
        };
        if (xPoint > this.plotWidth / 2) {
          posOptions.left = xPoint - this.options.tooltipWidth - 15; // + this.options.margin.left + this.options.margin.axisLeft + 15)
          if (this.options.data[xData].scale !== 'Time') {
            // posOptions.left -= (this[xAxis].bandwidth())
            posOptions.left += 10;
          }
        } else {
          posOptions.left = xPoint + this.options.margin.left + this.options.margin.axisLeft + 15;
          if (this.options.data[xData].scale !== 'Time') {
            posOptions.left += this.options.data[xAxis.replace('Axis', '')].bandWidth / 2;
          }
        }
        posOptions.top = this.options.margin.top + this.options.margin.axisTop;
        if (this.options.orientation === 'horizontal') {
          delete posOptions.onLeft;
          var adjuster = 0;
          if (this.options.data[xData].scale !== 'Time') {
            adjuster = this.options.data[xAxis.replace('Axis', '')].bandWidth / 2; // - this.options.margin.top
          }

          posOptions = {
            width: this.options.tooltipWidth,
            left: this.options.margin.left + this.options.margin.axisLeft + this.plotWidth - this.options.tooltipWidth,
            onTop: xPoint > this.plotHeight / 2,
            positioning: 'vertical'
          };
          if (xPoint > this.plotHeight / 2) {
            posOptions.bottom = xPoint + this.options.margin.top + this.options.margin.axisTop;
          } else {
            posOptions.top = xPoint + this.options.margin.top + this.options.margin.axisTop + 15 + adjuster;
          }
        }
        this.tooltip.setHeight(this.plotHeight);
        if (isNaN(posOptions.left)) {
          this.tooltip.hide();
          if (this.options.onMouseOut) {
            this.options.onMouseOut();
          }
          return;
        }
        this.options.showTooltip && this.tooltip.show(tooltipTitle, tooltipHTML, posOptions);
        // }
        // else {
        //   xPoint = x0
        // }      
        if (this.options.data[xData].scale !== 'Time' && this.customBottomRange.length === 0) {
          xPoint += this.options.data[xAxis.replace('Axis', '')].bandWidth / 2; // - this.options.margin.top
        }

        var trackingXStart = xPoint;
        var trackingXEnd = xPoint;
        var trackingYStart = 0;
        var trackingYEnd = this.plotHeight;
        if (this.options.orientation === 'horizontal') {
          trackingXStart = 0;
          trackingXEnd = this.plotWidth;
          trackingYStart = xPoint;
          trackingYEnd = xPoint;
        }
        this.trackingLineLayer.select('.tracking-line').attr('x1', trackingXStart).attr('x2', trackingXEnd).attr('y1', trackingYStart).attr('y2', trackingYEnd).attr('stroke-width', 1).attr('stroke-dasharray', '4 2').attr('stroke', '#cccccc').attr('stroke-opacity', 1);
      }
    }
  }, {
    key: "prep",
    value: function prep() {
      /* global d3 WebsyDesigns */
      this.defs = this.svg.append('defs');
      this.clip = this.defs.append('clipPath').attr('id', "".concat(this.elementId, "_clip")).append('rect');
      this.xAxisClip = this.defs.append('clipPath').attr('id', "".concat(this.elementId, "_xAxisClip")).append('rect');
      this.yAxisClip = this.defs.append('clipPath').attr('id', "".concat(this.elementId, "_yAxisClip")).append('rect');
      this.brushClip = this.defs.append('clipPath').attr('id', "".concat(this.elementId, "_brushclip")).append('rect');
      this.leftAxisLayer = this.svg.append('g').attr('class', 'left-axis-layer').attr('clip-path', "url(#".concat(this.elementId, "_yAxisClip)")).append('g');
      this.rightAxisLayer = this.svg.append('g').attr('class', 'right-axis-layer');
      this.bottomAxisLayer = this.svg.append('g').attr('class', 'bottom-axis-layer').attr('clip-path', "url(#".concat(this.elementId, "_xAxisClip)")).append('g');
      this.leftAxisLabel = this.svg.append('g').attr('class', 'left-axis-label-layer');
      this.rightAxisLabel = this.svg.append('g').attr('class', 'right-axis-label-layer');
      this.bottomAxisLabel = this.svg.append('g').attr('class', 'bottom-axis-label-layer');
      this.plotArea = this.svg.append('g').attr('class', 'plot-layer').attr('clip-path', "url(#".concat(this.elementId, "_clip)")).append('g');
      this.barLayer = this.svg.append('g').attr('class', 'bar-layer').attr('clip-path', "url(#".concat(this.elementId, "_clip)")).append('g');
      this.areaLayer = this.svg.append('g').attr('class', 'area-layer').attr('clip-path', "url(#".concat(this.elementId, "_clip)")).append('g');
      this.lineLayer = this.svg.append('g').attr('class', 'line-layer').attr('clip-path', "url(#".concat(this.elementId, "_clip)")).append('g');
      // this.barLayer.attr('clip-path', `url(#${this.elementId}_clip)`)
      this.labelLayer = this.svg.append('g').attr('class', 'label-layer').attr('clip-path', "url(#".concat(this.elementId, "_clip)")).append('g');
      this.symbolLayer = this.svg.append('g').attr('class', 'symbol-layer').attr('clip-path', "url(#".concat(this.elementId, "_clip)")).append('g');
      this.refLineLayer = this.svg.append('g').attr('class', 'refline-layer').attr('clip-path', "url(#".concat(this.elementId, "_clip)")).append('g');
      this.trackingLineLayer = this.svg.append('g').attr('class', 'tracking-line-layer');
      this.trackingLineLayer.append('line').attr('class', 'tracking-line');
      this.tooltip = new WebsyDesigns.WebsyChartTooltip(this.svg);
      this.brushLayer = this.svg.append('g');
      // .attr(
      //   'clip-path',
      //   `url(#${this.elementId.replace(/\s/g, '_')}_brushclip)`
      // )
      this.brushArea = this.brushLayer.append('g').attr('class', 'brush-area');
      this.brushLayer.append('g').attr('class', 'brush');
      this.eventLayer = this.svg.append('g').attr('class', 'event-line').append('rect');
      this.eventLayer.on('mouseout', this.handleEventMouseOut.bind(this)).on('mousemove', this.handleEventMouseMove.bind(this));
      this.render();
    }
  }, {
    key: "render",
    value: function render(options) {
      var _this53 = this;
      /* global d3 options WebsyUtils */
      this._isRendered = false;
      if (typeof options !== 'undefined') {
        this.options = _extends({}, this.options, options);
        if (this.options.legendOptions) {
          this.legend.setOptions(this.options.legendOptions);
        }
      }
      if (!this.options.data) {
        // tell the user no data has been provided
      } else {
        this.processedX = {};
        this.transition = d3.transition().duration(this.options.transitionDuration);
        if (this.options.data.bottom.scale && this.options.data.bottom.scale === 'Time') {
          this.parseX = function (input) {
            if (typeof input.getTime !== 'undefined') {
              return input;
            } else {
              d3.timeParse(this.options.timeParseFormat)(input);
            }
          };
        } else {
          this.parseX = function (input) {
            return input;
          };
        }
        if (this.options.disableTransitions === true) {
          this.transition = d3.transition().duration(0);
        }
        // Add placeholders for the data entries that don't exist
        if (!this.options.data.left) {
          this.options.data.left = {
            data: []
          };
        }
        if (!this.options.data.right) {
          this.options.data.right = {
            data: []
          };
        }
        if (!this.options.data.bottom) {
          this.options.data.bottom = {
            data: []
          };
        }
        if (this.options.orientation === 'vertical') {
          this.leftAxisLayer && this.leftAxisLayer.attr('class', 'y-axis');
          this.rightAxisLayer && this.rightAxisLayer.attr('class', 'y-axis');
          this.bottomAxisLayer && this.bottomAxisLayer.attr('class', 'x-axis');
        } else {
          this.leftAxisLayer && this.leftAxisLayer.attr('class', 'x-axis');
          this.rightAxisLayer && this.rightAxisLayer.attr('class', 'x-axis');
          this.bottomAxisLayer && this.bottomAxisLayer.attr('class', 'y-axis');
        }
        var el = document.getElementById(this.elementId);
        if (el) {
          this.width = el.clientWidth;
          this.height = el.clientHeight;
          // establish the space and size for the legend
          // the legend gets rendered so that we can get its actual size
          if (this.options.showLegend === true) {
            var legendData = [];
            if (this.options.legendData && this.options.legendData.length > 0) {
              legendData = this.options.legendData;
            } else {
              this.options.data.series.map(function (s, i) {
                return {
                  value: s.label || s.key,
                  color: s.color || _this53.options.colors[i % _this53.options.colors.length]
                };
              });
            }
            if (this.options.legendPosition === 'top' || this.options.legendPosition === 'bottom') {
              this.legendArea.style('width', '100%');
              if (this.legend.options.maxSize) {
                this.legendArea.style('height', "".concat(this.legend.options.maxSize, "px"));
              }
              this.legend.options.align = 'center';
            }
            if (this.options.legendPosition === 'left' || this.options.legendPosition === 'right') {
              var longestLegendValue = legendData.reduce(function (a, b) {
                return a.length > (b.value || '').length ? a : b.value;
              }, '');
              this.legend.options.align = 'left';
              this.legendArea.style('height', '100%');
              this.legendArea.style('width', this.legend.testWidth(longestLegendValue) + 'px');
              if (this.legend.options.maxSize) {
                this.legendArea.style('width', "".concat(this.legend.options.maxSize, "px"));
              }
            }
            this.legend.data = legendData;
            var legendSize = this.legend.getSize();
            this.options.margin.legendTop = 0;
            this.options.margin.legendBottom = 0;
            this.options.margin.legendLeft = 0;
            this.options.margin.legendRight = 0;
            if (this.options.legendPosition === 'top') {
              this.options.margin.legendTop = legendSize.height;
              this.legendArea.style('top', '0').style('bottom', 'unset');
            }
            if (this.options.legendPosition === 'bottom') {
              this.options.margin.legendBottom = legendSize.height;
              this.legendArea.style('top', 'unset').style('bottom', '0');
            }
            if (this.options.legendPosition === 'left') {
              this.options.margin.legendLeft = legendSize.width;
              this.legendArea.style('left', '0').style('right', 'unset').style('top', '0');
            }
            if (this.options.legendPosition === 'right') {
              this.options.margin.legendRight = legendSize.width;
              this.legendArea.style('left', 'unset').style('right', '0').style('top', '0');
            }
          }
          this.svg.attr('width', this.width - this.options.margin.legendLeft - this.options.margin.legendRight).attr('height', this.height - this.options.margin.legendTop - this.options.margin.legendBottom).attr('transform', "translate(".concat(this.options.margin.legendLeft, ", ").concat(this.options.margin.legendTop, ")"));
          this.longestLeft = 0;
          this.longestRight = 0;
          this.longestBottom = 0;
          var firstBottom = '';
          if (this.options.data.bottom && this.options.data.bottom.data && typeof this.options.data.bottom.max === 'undefined') {
            // this.options.data.bottom.max = this.options.data.bottom.data.reduce((a, b) => a.length > b.value.length ? a : b.value, '')
            // this.options.data.bottom.min = this.options.data.bottom.data.reduce((a, b) => a.length < b.value.length ? a : b.value, this.options.data.bottom.max)      
            this.options.data.bottom.max = this.options.data.bottom.data[this.options.data.bottom.data.length - 1].value;
            this.options.data.bottom.min = this.options.data.bottom.data[0].value;
          }
          if (this.options.data.bottom && typeof this.options.data.bottom.max !== 'undefined') {
            this.longestBottom = this.options.data.bottom.max.toString();
            if (this.options.data.bottom.formatter) {
              this.longestBottom = this.options.data.bottom.formatter(this.options.data.bottom.max).toString();
              if (this.options.data.bottom.data && this.options.data.bottom.data[0] && this.options.data.bottom.data[0].value) {
                firstBottom = this.options.data.bottom.formatter(this.options.data.bottom.data[0].value).toString();
              }
            } else {
              if (this.options.data.bottom.scale === 'Time') {
                this.longestBottom = '01/01/2000';
                firstBottom = '01/01/2000';
              } else {
                this.longestBottom = this.options.data.bottom.data.reduce(function (a, b) {
                  return a.length > b.value.length ? a : b.value;
                }, '');
                // firstBottom = (this.options.data.bottom.data[0] || [{value: ''}]).value
                if (this.options.data.bottom.data && this.options.data.bottom.data[0] && this.options.data.bottom.data[0].value) {
                  firstBottom = this.options.data.bottom.data[0].value;
                }
              }
            }
          }
          if (this.options.data.left && this.options.data.left.data && this.options.data.left.max === 'undefined') {
            this.options.data.left.min = d3.min(this.options.data.left.data);
            this.options.data.left.max = d3.max(this.options.data.left.data);
          }
          if (!this.options.data.left.max && this.options.data.left.data) {
            this.options.data.left.max = this.options.data.left.data.reduce(function (a, b) {
              return a.length > b.value.length ? a : b.value;
            }, '');
          }
          if (!this.options.data.left.min && this.options.data.left.data) {
            this.options.data.left.min = this.options.data.left.data.reduce(function (a, b) {
              return a.length < b.value.length ? a : b.value;
            }, this.options.data.left.max);
          }
          if (this.options.data.left && typeof this.options.data.left.max !== 'undefined') {
            this.longestLeft = this.options.data.left.max.toString();
            if (this.options.data.left.formatter) {
              this.longestLeft = this.options.data.left.formatter(this.options.data.left.max).toString();
            }
          }
          if (this.options.data.right && this.options.data.right.data && this.options.data.right.max === 'undefined') {
            this.options.data.right.min = d3.min(this.options.data.right.data);
            this.options.data.right.max = d3.max(this.options.data.right.data);
          }
          if (this.options.data.right && typeof this.options.data.right.max !== 'undefined') {
            this.longestRight = this.options.data.right.max.length > this.options.data.right.min.length ? this.options.data.right.max.toString() : this.options.data.right.min.toString();
            if (this.options.data.right.formatter) {
              this.longestRight = this.options.data.right.formatter(this.longestRight).toString();
            }
          }
          // Check to see if we need to balance the min and max values
          if (this.options.balancedMinMax === true) {
            if (this.options.orientation === 'horizontal') {
              var biggestBottom = Math.max(Math.abs(this.options.data.bottom.min), this.options.data.bottom.max);
              this.options.data.bottom.min = 1 - biggestBottom;
              this.options.data.bottom.max = biggestBottom;
            } else {
              var biggestLeft = Math.max(Math.abs(this.options.data.left.min), this.options.data.left.max);
              this.options.data.left.min = biggestLeft * -1;
              this.options.data.left.max = biggestLeft;
              var biggestRight = Math.max(Math.abs(this.options.data.right.min), this.options.data.right.max);
              this.options.data.right.min = biggestRight * -1;
              this.options.data.right.max = biggestRight;
            }
          }
          // establish the space needed for the various axes    
          // this.options.margin.axisLeft = this.longestLeft * ((this.options.data.left && this.options.data.left.fontSize) || this.options.fontSize) * 0.7
          // this.options.margin.axisRight = this.longestRight * ((this.options.data.right && this.options.data.right.fontSize) || this.options.fontSize) * 0.7
          // this.options.margin.axisBottom = ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize) + 10
          var longestLeftBounds = WebsyUtils.measureText(this.longestLeft, 0, this.options.data.left && this.options.data.left.fontSize || this.options.fontSize);
          var longestRightBounds = WebsyUtils.measureText(this.longestRight, 0, this.options.data.right && this.options.data.right.fontSize || this.options.fontSize);
          var longestBottomBounds = WebsyUtils.measureText(this.longestBottom, this.options.data.bottom && this.options.data.bottom.rotate || 0, this.options.data.bottom && this.options.data.bottom.fontSize || this.options.fontSize);
          var firstBottomWidth = 0;
          if (this.options.orientation === 'vertical') {
            firstBottomWidth = WebsyUtils.measureText(firstBottom, this.options.data.bottom && this.options.data.bottom.rotate || 0, this.options.data.bottom && this.options.data.bottom.fontSize || this.options.fontSize).width;
            if (Math.abs(this.options.data.bottom && this.options.data.bottom.rotate || 0) !== 90) {
              firstBottomWidth = firstBottomWidth / 2;
            } else if (Math.abs(this.options.data.bottom && this.options.data.bottom.rotate || 0) === 90) {
              firstBottomWidth = 0;
            }
            if (this.options.data.bottom.scale !== 'Time') {
              firstBottom = Math.max(0, firstBottomWidth);
            }
          }
          this.options.margin.axisLeft = Math.max(longestLeftBounds.width, firstBottomWidth) + 5; // + 5 to accommodate for space between text and axis line
          this.options.margin.axisRight = longestRightBounds.width + 10;
          this.options.margin.axisBottom = longestBottomBounds.height + 10;
          this.options.margin.axisTop = 0;
          // adjust axis margins based on title options
          if (this.options.data.left && this.options.data.left.showTitle === true) {
            if (this.options.data.left.titlePosition === 1) {
              this.options.margin.axisLeft += (this.options.data.left.titleFontSize || 10) + 10;
            } else {
              this.options.margin.axisTop += (this.options.data.left.titleFontSize || 10) + 10;
            }
          }
          if (this.options.data.right && this.options.data.right.showTitle === true) {
            if (this.options.data.right.titlePosition === 1) {
              this.options.margin.axisRight += (this.options.data.right.titleFontSize || 10) + 10;
            } else if (this.options.margin.axisTop === 0) {
              this.options.margin.axisTop += (this.options.data.right.titleFontSize || 10) + 10;
            }
          }
          if ((this.options.data.bottom && this.options.data.bottom.rotate || 0) === 0 && this.options.axis.hideBottom !== true) {
            this.options.margin.axisLeft = Math.max(this.options.margin.axisLeft, longestBottomBounds.width / 2);
          } else if ((this.options.data.bottom && this.options.data.bottom.rotate || 0) < 0 && this.options.axis.hideBottom !== true) {
            this.options.margin.axisLeft = Math.max(this.options.margin.axisLeft, firstBottomWidth / 2);
          } else if ((this.options.data.bottom && this.options.data.bottom.rotate || 0) > 0 && this.options.axis.hideBottom !== true) {
            this.options.margin.axisRight = Math.max(this.options.margin.axisRight, longestBottomBounds.width);
          }
          // if (this.options.data.bottom.rotate) {
          //   // this.options.margin.bottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)   
          //   this.options.margin.axisBottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize) * 0.4
          //   // this.options.margin.bottom = this.options.margin.bottom * (1 + this.options.data.bottom.rotate / 100)
          // }  
          // hide the margin if necessary
          if (this.options.axis) {
            if (this.options.axis.hideAll === true) {
              this.options.margin.axisLeft = 0;
              this.options.margin.axisRight = 0;
              this.options.margin.axisBottom = 0;
            }
            if (this.options.axis.hideLeft === true) {
              this.options.margin.axisLeft = 0;
            }
            if (this.options.axis.hideRight === true) {
              this.options.margin.axisRight = 0;
            }
            if (this.options.axis.hideBottom === true) {
              this.options.margin.axisBottom = 0;
            }
          }
          // At some point before this we need to add in logic to make space for any data point labels
          // Define the plot size
          this.plotWidth = this.width - this.options.margin.legendLeft - this.options.margin.legendRight - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight;
          this.plotHeight = this.height - this.options.margin.legendTop - this.options.margin.legendBottom - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom - this.options.margin.axisTop;
          this.brushNeeded = false;
          var proposedBandWidth; // distance between x axis data points.    
          var maxBandWidthFits = false;
          // Check to see if all bars at the max allowed width will fit
          this.bandPadding = 0;
          this.totalBandPadding = 0;
          this.brushBandPadding = 0;
          this.totalBrushBandPadding = 0;
          var noOfPoints = 0;
          var noOfGroups = 0;
          var plotable = 0;
          if (this.options.maxBandWidth) {
            if (this.options.orientation === 'horizontal') {
              this.options.data.left.totalValueCount = this.options.data.left.data.reduce(function (a, b) {
                if (typeof b.valueCount === 'undefined') {
                  return a + 1;
                }
                return a + b.valueCount;
              }, 0);
              if (this.options.data.left.padding) {
                this.totalBandPadding = this.plotHeight * this.options.data.left.padding;
                this.bandPadding = this.totalBandPadding / this.options.data.left.data.length;
                this.totalBrushBandPadding = this.plotHeight * this.options.data.left.padding;
                this.brushBandPadding = this.totalBandPadding / this.options.data.left.data.length;
              }
              plotable = this.plotHeight - this.totalBandPadding;
              noOfPoints = this.options.grouping === 'grouped' && this.options.allowUnevenBands === true ? this.options.data.left.totalValueCount : this.options.data.left.data.length;
              noOfGroups = this.options.data.left.data.length;
            } else {
              this.options.data.bottom.totalValueCount = this.options.data.bottom.data.reduce(function (a, b) {
                if (typeof b.valueCount === 'undefined') {
                  return a + 1;
                }
                return a + b.valueCount;
              }, 0);
              if (this.options.data.bottom.padding) {
                this.totalBandPadding = this.plotWidth * this.options.data.bottom.padding;
                this.bandPadding = this.totalBandPadding / this.options.data.bottom.data.length;
                this.totalBrushBandPadding = this.plotWidth * this.options.data.bottom.padding;
                this.brushBandPadding = this.totalBandPadding / this.options.data.bottom.data.length;
              }
              plotable = this.plotWidth - this.totalBandPadding;
              noOfPoints = this.options.grouping === 'grouped' && this.options.allowUnevenBands === true ? this.options.data.bottom.totalValueCount : this.options.data.bottom.data.length;
              noOfGroups = this.options.data.bottom.data.length;
            }
            if (plotable / noOfPoints > this.options.maxBandWidth) {
              maxBandWidthFits = true;
              proposedBandWidth = this.options.maxBandWidth;
            }
            if (!maxBandWidthFits && this.options.allowBrushing === true) {
              // Check to see if all bars at the min allowed width will fit
              if (plotable / noOfPoints < this.options.minBandWidth) {
                this.brushNeeded = true;
                proposedBandWidth = this.options.minBandWidth;
                if (this.options.orientation === 'horizontal') {
                  this.plotWidth -= this.options.brushHeight;
                } else {
                  this.plotHeight -= this.options.brushHeight;
                }
              } else {
                proposedBandWidth = plotable / noOfPoints;
              }
            }
          }
          // if (this.options.minBandWidth) {
          //   this.widthForCalc = this.options.data.bottom.totalValueCount * this.options.minBandWidth
          //   if (this.options.data.bottom.padding) {
          //     this.widthForCalc += (this.options.minBandWidth * this.options.data.bottom.padding) * this.options.data.bottom.totalValueCount
          //     this.widthForCalc += (this.options.data.bottom.data.length * this.options.groupPadding * 2)
          //   }
          // }
          // if (this.options.orientation === 'vertical') {
          //   this.options.data.bottom.totalValueCount = this.options.data.bottom.data.reduce((a, b) => {
          //     if (typeof b.valueCount === 'undefined') {
          //       return a + 1
          //     }
          //     return a + b.valueCount
          //   }, 0)
          //   if (this.options.maxBandWidth) {                  
          //     this.plotWidth = Math.min(this.plotWidth, (this.options.data.bottom.totalValueCount) * this.options.maxBandWidth)
          //   }      
          //   // some if to check if brushing is needed
          //   if (this.plotWidth / this.options.data.bottom.totalValueCount < this.options.minBandWidth) {
          //     this.brushNeeded = true
          //     this.plotHeight -= this.options.brushHeight
          //   }
          // }
          // else {
          //   // some if to check if brushing is needed
          //   this.options.data.left.totalValueCount = this.options.data.left.data.reduce((a, b) => {
          //     if (typeof b.valueCount === 'undefined') {
          //       return a + 1
          //     }
          //     return a + b.valueCount
          //   }, 0)
          //   if (this.plotHeight / this.options.data.left.totalValueCount < this.options.minBandWidth) {
          //     this.brushNeeded = true
          //     this.plotWidth -= this.options.brushHeight
          //   }
          // }    
          // Translate the layers
          var leftBrushAdjustment = this.options.orientation === 'horizontal' && this.brushNeeded === true ? this.options.brushHeight : 0;
          // const bottomBrushAdjustment = this.options.orientation === 'vertical' && this.brushNeeded === true ? this.options.brushHeight : 0
          this.leftAxisLayer.attr('transform', "translate(".concat(leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")")).style('font-size', this.options.data.left && this.options.data.left.fontSize || this.options.fontSize);
          this.rightAxisLayer.attr('transform', "translate(".concat(leftBrushAdjustment + this.options.margin.left + this.plotWidth + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")")).style('font-size', this.options.data.right && this.options.data.right.fontSize || this.options.fontSize);
          this.bottomAxisLayer.attr('transform', "translate(".concat(leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop + this.plotHeight, ")")).style('font-size', this.options.data.bottom && this.options.data.bottom.fontSize || this.options.fontSize);
          this.leftAxisLabel.attr('transform', "translate(".concat(leftBrushAdjustment + this.options.margin.left, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
          this.rightAxisLabel.attr('transform', "translate(".concat(leftBrushAdjustment + this.options.margin.left + this.plotWidth + this.options.margin.axisLeft + this.options.margin.axisRight, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
          this.bottomAxisLabel.attr('transform', "translate(".concat(leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop + this.plotHeight, ")"));
          this.plotArea.attr('transform', "translate(".concat(leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
          this.areaLayer.attr('transform', "translate(".concat(leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
          this.lineLayer.attr('transform', "translate(".concat(leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
          this.barLayer.attr('transform', "translate(".concat(leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
          this.labelLayer.attr('transform', "translate(".concat(leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
          this.symbolLayer.attr('transform', "translate(".concat(leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
          this.refLineLayer.attr('transform', "translate(".concat(leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
          this.trackingLineLayer.attr('transform', "translate(".concat(leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
          this.clip.attr('transform', "translate(".concat(leftBrushAdjustment + this.options.margin.left + this.options.margin.axisLeft, ", 0)")).attr('width', this.plotWidth).attr('height', this.plotHeight + this.options.margin.top + this.options.margin.axisTop);
          if (this.options.orientation === 'horizontal') {
            this.brushLayer.attr('transform', "translate(".concat(this.options.margin.left, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
            this.yAxisClip.attr('transform', "translate(".concat(leftBrushAdjustment, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")")).attr('width', this.options.margin.axisLeft + 10).attr('height', this.plotHeight);
            this.xAxisClip.attr('transform', "translate(".concat(this.options.margin.left, ", ").concat(this.options.margin.top + this.options.margin.axisTop + this.plotHeight, ")")).attr('width', this.plotWidth + this.options.margin.axisLeft + this.options.margin.axisRight + this.options.margin.right).attr('height', longestBottomBounds.height + 10);
            this.brushClip.attr('transform', "translate(".concat(this.options.margin.left, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")")).attr('height', this.plotHeight).attr('width', this.options.brushHeight);
          } else {
            this.brushLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop + this.plotHeight + longestBottomBounds.height, ")"));
            this.yAxisClip.attr('transform', "translate(0, ".concat(this.options.margin.top + this.options.margin.axisTop - 10, ")")).attr('width', this.options.margin.axisLeft + 10).attr('height', this.plotHeight + 20);
            this.xAxisClip.attr('transform', "translate(".concat(this.options.margin.left, ", ").concat(this.options.margin.top + this.options.margin.axisTop + this.plotHeight, ")")).attr('width', this.plotWidth + this.options.margin.axisLeft + this.options.margin.axisRight + this.options.margin.right).attr('height', longestBottomBounds.height + 10);
            this.brushClip.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop + this.plotHeight + longestBottomBounds.height, ")")).attr('width', this.plotWidth).attr('height', this.options.brushHeight);
          }
          this.eventLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
          var that = this;
          this.eventLayer.attr('x', 0).attr('y', 0).attr('width', this.plotWidth).attr('height', this.plotHeight).attr('fill-opacity', '0');
          // this.tooltip.transform(this.options.margin.left + this.options.margin.axisLeft, this.options.margin.top + this.options.margin.axisTop)
          // Configure the bottom axis
          var bottomDomain = this.createDomain('bottom');
          // let bottomBrushDomain = this.createDomain('bottom', true)
          var bottomBrushDomain = this.createDomain('bottom');
          var bottomRange = [0, this.plotWidth];
          var bottomBrushRange = [0, this.plotWidth];
          var leftRange = [this.plotHeight, 0];
          var leftBrushRange = [this.options.brushHeight, 0];
          if (this.options.orientation === 'horizontal') {
            leftBrushRange = [this.plotHeight, 0];
            bottomBrushRange = [0, this.options.brushHeight];
          }
          this.widthForCalc = proposedBandWidth * noOfPoints; // + totalPadding
          this.customBottomRange = [];
          this.customBottomDetailRange = [];
          this.customBottomBrushRange = [];
          this.customLeftRange = [];
          this.customLeftDetailRange = [];
          this.customLeftBrushRange = [];
          // if (this.options.allowUnevenBands === true) {
          // always allow uneven bands
          var customRangeSide = 'Bottom';
          var customRangeSideLC = 'bottom';
          if (this.options.orientation === 'horizontal') {
            customRangeSide = 'Left';
            customRangeSideLC = 'left';
          }
          if (this.options.data[customRangeSideLC].data && this.options.data[customRangeSideLC].data[0] && (this.options.data[customRangeSideLC].data[0].valueCount || 1) && this.options.data[customRangeSideLC].scale === 'Ordinal') {
            var acc = 0;
            this["custom".concat(customRangeSide, "Range")] = [0].concat(_toConsumableArray(this.options.data[customRangeSideLC].data.map(function (d, index, arr) {
              var adjustment = _this53.bandPadding * index + _this53.bandPadding;
              // if (this.options.data.bottom.padding) {
              // adjustment = (this.widthForCalc * this.options.data.bottom.padding) / (arr.length * 2)
              // }
              var start = _this53.widthForCalc / noOfPoints * acc;
              for (var i = 0; i < (d.valueCount || 1); i++) {
                var pos = i * proposedBandWidth;
                _this53["custom".concat(customRangeSide, "DetailRange")].push(start + adjustment + pos);
              }
              acc += _this53.options.grouping !== 'stacked' && _this53.options.allowUnevenBands === true ? d.valueCount || 1 : 1;
              var end = _this53.widthForCalc / noOfPoints * acc;
              // this.customBottomBrushRange.push((end + adjustment) * (this.plotWidth / this.widthForCalc))
              return end + adjustment;
            })));
            acc = 0;
            this["custom".concat(customRangeSide, "BrushRange")] = [0].concat(_toConsumableArray(this.options.data[customRangeSideLC].data.map(function (d, index, arr) {
              var adjustment = _this53.brushBandPadding * index + _this53.brushBandPadding;
              acc += _this53.options.grouping !== 'stacked' && _this53.options.allowUnevenBands === true ? d.valueCount || 1 : 1;
              return (_this53.options.orientation === 'vertical' ? _this53.plotWidth : _this53.plotHeight) / noOfPoints * acc;
            })));
          }
          // }
          var rangeLength = bottomDomain.length;
          this.options.data.bottomBrush = {};
          this.options.data.leftBrush = {};
          this.options.data.rightBrush = {};
          if (this.options.orientation === 'vertical') {
            this.options.data.bottom.bandWidth = proposedBandWidth;
            this.options.data.bottomBrush.bandWidth = (this.plotWidth - this.totalBandPadding) / noOfPoints;
          } else {
            this.options.data.left.bandWidth = proposedBandWidth;
            this.options.data.leftBrush.bandWidth = (this.plotHeight - this.totalBandPadding) / noOfPoints;
            this.options.data.rightBrush.bandWidth = (this.plotHeight - this.totalBandPadding) / noOfPoints;
          }
          this.brushBandPadding = this.totalBandPadding / noOfGroups;
          if (this.options.orientation === 'vertical') {
            bottomRange = [0, this.widthForCalc + this.totalBandPadding];
          } else {
            leftRange = [this.widthForCalc + this.totalBandPadding, 0];
          }
          if (this.options.allowBrushing !== true) {
            bottomRange = bottomBrushRange;
          }
          this.bottomAxis = d3["scale".concat(this.options.data.bottom.scale || 'Ordinal')]().domain(bottomDomain).range(bottomRange);
          if (!this.brushInitialized) {
            this.bottomBrushAxis = d3["scale".concat(this.options.data.bottom.scale || 'Ordinal')]().domain(bottomBrushDomain).range(bottomBrushRange);
          }
          if (this.bottomAxis.nice) {
            // this.bottomAxis.nice()
          }
          if (this.bottomAxis.padding && this.options.data.bottom.padding) {
            this.bottomAxis.padding(this.options.data.bottom.padding || 0);
          }
          // BRUSH
          var brushMethod = "brushX";
          var brushLength = this.plotWidth;
          var brushEnd = this.plotWidth;
          var brushThickness = this.options.brushHeight;
          if (this.options.orientation === 'horizontal') {
            brushMethod = 'brushY';
            brushLength = this.options.brushHeight;
            brushThickness = this.plotHeight;
            if (this.brushNeeded) {
              brushEnd = this.plotHeight * (this.plotHeight / (this.widthForCalc + this.totalBandPadding));
            }
          } else {
            if (this.brushNeeded) {
              brushEnd = this.plotWidth * (this.plotWidth / (this.widthForCalc + this.totalBandPadding));
            }
          }
          this.brush = d3[brushMethod]().extent([[0, 0], [brushLength, brushThickness]]).on('brush end', this.brushed);
          // const brushResizePath = d => {
          //   let e = +(d.type === 'e')
          //   let x = e ? 1 : -1
          //   let y = this.options.brushHeight
          //   return (
          //     'M' +
          //     0.5 * x +
          //     ',' +
          //     y +
          //     'A6,6 0 0 ' +
          //     e +
          //     ' ' +
          //     6.5 * x +
          //     ',' +
          //     (y + 6) +
          //     'V' +
          //     (2 * y - 6) +
          //     'A6,6 0 0 ' +
          //     e +
          //     ' ' +
          //     0.5 * x +
          //     ',' +
          //     2 * y +
          //     'Z' +
          //     'M' +
          //     2.5 * x +
          //     ',' +
          //     (y + 8) +
          //     'V' +
          //     (2 * y - 8) +
          //     'M' +
          //     4.5 * x +
          //     ',' +
          //     (y + 8) +
          //     'V' +
          //     (2 * y - 8)
          //   )
          // }
          // this.brushHandle = this.brushLayer
          //   .select('.brush')
          //   .selectAll('.handle--custom')
          //   .remove()
          // this.brushHandle = this.brushLayer
          //   .select('.brush')
          //   .selectAll('.handle--custom')
          //   .data([{ type: 'w' }, { type: 'e' }])
          //   .enter()
          //   .append('path')
          //   .attr('class', 'handle--custom')
          //   .attr('stroke', 'transparent')
          //   .attr('fill', 'transparent')
          //   .attr('cursor', 'ew-resize')
          //   .attr('d', brushResizePath)
          // BRUSH END  
          // this.brushLayer.selectAll('.handle').remove()
          if (this.brushNeeded) {
            if (!this.brushInitialized) {
              this.brushLayer.style('visibility', 'visible');
              this.brushInitialized = true;
              this.brushLayer.select('.brush').call(this.brush).call(this.brush.move, [0, brushEnd]);
            } else {
              this.brushLayer.style('visibility', 'visible');
            }
          } else {
            this.brushLayer.style('visibility', 'hidden');
            // this.brushLayer.selectAll().remove()
            // this.brushArea.selectAll('*').remove()
          }

          if (this.options.margin.axisBottom > 0) {
            var timeFormatPattern = '';
            var tickDefinition;
            if (this.options.data.bottom.data) {
              if (this.options.data.bottom.scale === 'Time') {
                var diff = this.options.data.bottom.max.getTime() - this.options.data.bottom.min.getTime();
                var oneDay = 1000 * 60 * 60 * 24;
                if (diff < oneDay / 24 / 6) {
                  tickDefinition = d3.timeSecond.every(15);
                  timeFormatPattern = '%H:%M:%S';
                } else if (diff < oneDay / 24) {
                  tickDefinition = d3.timeMinute.every(1);
                  timeFormatPattern = '%H:%M';
                } else if (diff < oneDay / 6) {
                  tickDefinition = d3.timeMinute.every(10);
                  timeFormatPattern = '%H:%M';
                } else if (diff < oneDay / 2) {
                  tickDefinition = d3.timeMinute.every(30);
                  timeFormatPattern = '%H:%M';
                } else if (diff < oneDay) {
                  tickDefinition = d3.timeHour.every(1);
                  timeFormatPattern = '%H:%M';
                } else if (diff < 7 * oneDay) {
                  tickDefinition = d3.timeDay.every(1);
                  timeFormatPattern = '%d %b @ %H:%M';
                } else if (diff < 14 * oneDay) {
                  tickDefinition = d3.timeDay.every(2);
                  timeFormatPattern = '%d %b %Y';
                } else if (diff < 21 * oneDay) {
                  tickDefinition = d3.timeDay.every(3);
                  timeFormatPattern = '%d %b %Y';
                } else if (diff < 28 * oneDay) {
                  tickDefinition = d3.timeDay.every(4);
                  timeFormatPattern = '%d %b %Y';
                } else if (diff < 60 * oneDay) {
                  tickDefinition = d3.timeDay.every(7);
                  timeFormatPattern = '%d %b %Y';
                } else {
                  tickDefinition = d3.timeMonth.every(1);
                  timeFormatPattern = '%b %Y';
                }
              } else {
                tickDefinition = this.options.data.bottom.ticks || Math.min(this.options.data.bottom.data.length, 5);
              }
            } else {
              tickDefinition = this.options.data.bottom.ticks || 5;
            }
            this.options.calculatedTimeFormatPattern = timeFormatPattern;
            this.bAxisFunc = d3.axisBottom(this.bottomAxis).ticks(tickDefinition);
            if (this.options.data.bottom.formatter) {
              this.bAxisFunc.tickFormat(function (d) {
                return _this53.options.data.bottom.formatter(d);
              });
            }
            this.bottomAxisLayer.call(this.bAxisFunc);
            // console.log(this.bottomAxisLayer.ticks)
            if (this.options.data.bottom.rotate) {
              this.bottomAxisLayer.selectAll('text').attr('transform', "rotate(".concat(this.options.data.bottom && this.options.data.bottom.rotate || 0, ")")).style('text-anchor', "".concat((this.options.data.bottom && this.options.data.bottom.rotate || 0) === 0 ? 'middle' : 'end')).style('transform-origin', (this.options.data.bottom && this.options.data.bottom.rotate || 0) === 0 ? '0 0' : "0 ".concat(this.options.data.bottom && this.options.data.bottom.fontSize || this.options.fontSize, "px"));
            }
            if (this.customBottomRange.length > 0) {
              this.bottomAxisLayer.selectAll('g').attr('transform', function (d, i) {
                return "translate(".concat(_this53.customBottomRange[i] + (_this53.customBottomRange[i + 1] - _this53.customBottomRange[i]) / 2, ", 0)");
              });
            }
          }
          // Configure the left axis
          var leftDomain = this.createDomain('left');
          var leftBrushDomain = this.createDomain('left');
          var rightDomain = this.createDomain('right');
          var rightBrushDomain = this.createDomain('right');
          this.leftAxis = d3["scale".concat(this.options.data.left.scale || 'Linear')]().domain(leftDomain).range(leftRange);
          this.leftBrushAxis = d3["scale".concat(this.options.data.left.scale || 'Linear')]().domain(leftBrushDomain).range(leftBrushRange);
          if (this.leftAxis.padding && this.options.data.left.padding) {
            this.leftAxis.padding(this.options.data.left.padding || 0);
          }
          if (this.leftAxis.nice) {
            this.leftAxis.nice();
          }
          if (this.options.margin.axisLeft > 0) {
            this.leftAxisLayer.call(d3.axisLeft(this.leftAxis).ticks(this.options.data.left.ticks || 5).tickFormat(function (d) {
              if (_this53.options.data.left.formatter) {
                d = _this53.options.data.left.formatter(d);
              }
              return d;
            }));
            if (this.customLeftRange.length > 0) {
              this.leftAxisLayer.selectAll('g').attr('transform', function (d, i) {
                return "translate(0, ".concat(_this53.customLeftRange[i] + (_this53.customLeftRange[i + 1] - _this53.customLeftRange[i]) / 2, ")");
              });
            }
          }
          if (this.options.data.left && this.options.data.left.showTitle === true) {
            this.leftAxisLabel.selectAll('.title').remove();
            this.leftAxisLabel.selectAll('.dot').remove();
            if (this.options.data.left.titlePosition === 1) {
              // put the title vertically on the left
              var t = this.leftAxisLabel.append('text').attr('class', 'title').attr('x', 1 - this.plotHeight / 2).attr('y', (this.options.data.left.titleFontSize || 10) / 2 + 2).attr('font-size', this.options.data.left.titleFontSize || 10).attr('fill', this.options.data.left.titleColor || '#888888').attr('text-anchor', 'middle').style('transform', 'rotate(-90deg)').text(this.options.data.left.title || '');
              if (rightDomain.length > 0) {
                // we have 2 axis so we can treat the title like a legend
                this.leftAxisLabel.append('circle').attr('class', 'dot').style('fill', this.options.data.left.color || 'transparent').attr('r', this.options.data.left.titleFontSize && this.options.data.left.titleFontSize / 2 || 5).attr('cx', 3).attr('cy', this.plotHeight / 2 - t.node().getBBox().width / 2 - 15);
              }
            } else {
              // put the title horizontally on the top
              this.leftAxisLabel.append('text').attr('class', 'title').attr('x', 0).attr('y', 5).attr('font-size', this.options.data.left.titleFontSize || 10).attr('fill', this.options.data.left.titleColor || '#888888').attr('text-anchor', 'left').text(this.options.data.left.title || '');
            }
          }
          // Configure the right axis    
          if (rightDomain.length > 0) {
            this.rightAxis = d3["scale".concat(this.options.data.right.scale || 'Linear')]().domain(rightDomain).range([this.plotHeight, 0]);
            this.rightBrushAxis = d3["scale".concat(this.options.data.right.scale || 'Linear')]().domain(rightBrushDomain).range(leftBrushRange);
            if (this.rightAxis.nice) {
              this.rightAxis.nice();
            }
            if (this.options.margin.axisRight > 0 && (this.options.data.right.min !== 0 || this.options.data.right.max !== 0)) {
              this.rightAxisLayer.call(d3.axisRight(this.rightAxis).ticks(this.options.data.right.ticks || 5).tickFormat(function (d) {
                if (_this53.options.data.right.formatter) {
                  d = _this53.options.data.right.formatter(d);
                }
                return d;
              }));
            }
          }
          if (this.options.data.right && this.options.data.right.showTitle === true) {
            this.rightAxisLabel.selectAll('.title').remove();
            if (this.options.data.right.titlePosition === 1) {
              // put the title vertically on the left
              var _t = this.rightAxisLabel.append('text').attr('class', 'title').attr('x', this.plotHeight / 2).attr('y', 5).attr('font-size', this.options.data.right.titleFontSize || 10).attr('fill', this.options.data.right.titleColor || '#888888').attr('text-anchor', 'middle').style('transform', 'rotate(90deg)').text(this.options.data.right.title || '');
              if (rightDomain.length > 0) {
                // we have 2 axis so we can treat the title like a legend
                this.rightAxisLabel.append('circle').attr('class', 'dot').style('fill', this.options.data.right.color || 'transparent').attr('r', this.options.data.right.titleFontSize && this.options.data.right.titleFontSize / 2 || 5).attr('cx', -2).attr('cy', this.plotHeight / 2 - _t.node().getBBox().width / 2 - 15);
              }
            } else {
              // put the title horizontally on the top
            }
          }
          // Remove the unnecessary series
          var newKeys = this.options.data.series.map(function (s) {
            return s.key;
          });
          for (var key in this.renderedKeys) {
            if (newKeys.indexOf(key) === -1) {
              // remove the components
              // this[`remove${this.renderedKeys[key]}`](key)
              this.removeline(key);
              this.removebar(key);
              this.removesymbol(key);
              this.removelabel(key);
            }
          }
          this.renderComponents();
        }
      }
    }
  }, {
    key: "renderComponents",
    value: function renderComponents() {
      var _this54 = this;
      // Draw the series data
      this.renderedKeys = {};
      this.options.data.series.forEach(function (series, index) {
        if (!series.key) {
          series.key = _this54.createIdentity();
        }
        if (!series.color) {
          series.color = _this54.options.colors[index % _this54.options.colors.length];
        }
        _this54["render".concat(series.type || 'bar')](series, index);
        _this54.renderLabels(series, index);
        _this54.renderedKeys[series.key] = series.type;
      });
      this.refLineLayer.selectAll('.reference-line').remove();
      this.refLineLayer.selectAll('.reference-line-label').remove();
      if (this.options.refLines && this.options.refLines.length > 0) {
        this.options.refLines.forEach(function (l) {
          return _this54.renderRefLine(l);
        });
      }
      this._isRendered = true;
    }
  }, {
    key: "renderarea",
    value: function renderarea(series, index) {
      var _this55 = this;
      /* global d3 series index */
      var drawArea = function drawArea(xAxis, yAxis, curveStyle) {
        return d3.area().x(function (d) {
          if (_this55.options.data[xAxis].scale === 'Time') {
            return _this55["".concat(xAxis, "Axis")](_this55.parseX(d.x.value));
          } else {
            var xIndex = _this55[xAxis + 'Axis'].domain().indexOf(d.x.value);
            var xPos = _this55["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex];
            if (_this55["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex + 1]) {
              xPos = xPos + (_this55["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex + 1] - xPos) / 2;
            }
            return xPos;
          }
        }).y0(function (d) {
          return _this55["".concat(yAxis, "Axis")](0);
        }).y1(function (d) {
          return _this55["".concat(yAxis, "Axis")](isNaN(d.y.value) ? 0 : d.y.value);
        }).curve(d3[curveStyle || _this55.options.curveStyle]);
      };
      var xAxis = 'bottom';
      var yAxis = series.axis === 'secondary' ? 'right' : 'left';
      if (this.options.orientation === 'horizontal') {
        xAxis = series.axis === 'secondary' ? 'right' : 'left';
        yAxis = 'bottom';
      }
      var areas = this.areaLayer.selectAll(".area_".concat(series.key)).data([series.data]);
      // Exit
      areas.exit().transition(this.transition).style('fill-opacity', 1e-6).remove();
      // Update
      areas
      // .style('stroke-width', series.lineWidth || this.options.lineWidth)
      // .attr('id', `line_${series.key}`)
      // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
      .attr('fill', function (d) {
        return d[0].y.color || series.color;
      })
      // .attr('stroke', 'transparent')
      .transition(this.transition).attr('d', function (d) {
        return drawArea(xAxis, yAxis, series.curveStyle)(d);
      });
      // Enter
      areas.enter().append('path').attr('d', function (d) {
        return drawArea(xAxis, yAxis, series.curveStyle)(d);
      }).attr('class', "area_".concat(series.key)).attr('id', "area_".concat(series.key))
      // .attr('transform', 'translate(' + (this.options.data[xAxis].scale === 'Time' ? 0 : this.options.data[xAxis].bandWidth / 2) + ',0)')
      // .style('stroke-width', series.lineWidth || this.options.lineWidth)
      .attr('fill', function (d) {
        return d[0].y.color || series.color;
      })
      // .style('fill-opacity', 0)
      .attr('stroke', 'transparent')
      // .transition(this.transition)
      .style('fill-opacity', series.opacity || 0.3);
    }
  }, {
    key: "renderbar",
    value: function renderbar(series, index) {
      var _this56 = this;
      /* global series index d3 */
      var xAxis = 'bottom';
      var yAxis = 'left';
      var bars = this.barLayer.selectAll(".bar_".concat(series.key)).data(series.data);
      var brushBars = this.brushArea.selectAll(".bar_".concat(series.key)).data(series.data);
      var acummulativeY = new Array(this.options.data.series.length).fill(0);
      if (this.options.orientation === 'horizontal') {
        xAxis = 'left';
        yAxis = 'bottom';
      }
      function getBarHeight(d, i, yAxis, xAxis) {
        var output;
        if (this.options.orientation === 'horizontal') {
          output = Math.max(1, this.options.data[xAxis].bandWidth - (xAxis.indexOf('Brush') !== -1 ? 2 : this.options.groupPadding * 2));
        } else {
          var x = getBarX.call(this, d, i, yAxis, xAxis);
          if (typeof x === 'undefined' || x === null) {
            return null;
          }
          output = this["".concat(yAxis, "Axis")](0) - this["".concat(yAxis, "Axis")](Math.abs(d.y.value));
        }
        if (isNaN(output)) {
          return null;
        }
        return output;
      }
      function getBarWidth(d, i, yAxis, xAxis) {
        var output;
        if (this.options.orientation === 'horizontal') {
          // output = this[`${yAxis}Axis`](Math.abs(d.y.value))
          // output = this[`${yAxis}Axis`](Math.abs(d.y.value))
          // output = (this[`${yAxis}Axis`](0)) + this[`${yAxis}Axis`](Math.abs(d.y.value))
          output = this["".concat(yAxis, "Axis")](0) - this["".concat(yAxis, "Axis")](Math.abs(d.y.value));
        } else {
          var x = getBarX.call(this, d, i, yAxis, xAxis);
          if (typeof x === 'undefined' || x === null) {
            return null;
          }
          output = Math.max(1, this.options.data[xAxis].bandWidth - (xAxis.indexOf('Brush') !== -1 ? 2 : this.options.groupPadding * 2));
        }
        if (isNaN(output)) {
          return 0;
        }
        return output;
      }
      function getBarX(d, i, yAxis, xAxis) {
        var output;
        if (this.options.orientation === 'horizontal') {
          // if (this.options.grouping === 'stacked') {      
          //   // let h = getBarWidth.call(this, d, i, xAxis)
          //   // let adjustment = 0
          //   // if (d.y.accumulative && d.y.accumulative !== 0) {
          //   //   adjustment = this[`${yAxis}Axis`](d.y.accumulative || 0)
          //   // }
          //   // output = this[`${yAxis}Axis`](0) + (adjustment * (d.y.value < 0 ? 1 : 0)) + (h * (d.y.value < 0 ? 1 : 0))
          //   let accH = getBarWidth.call(this, {x: d.x, y: { value: d.y.accumulative }}, i, xAxis)
          //   // let h = getBarWidth.call(this, d, i, xAxis)      
          //   output = (accH * (d.y.accumulative < 0 ? 0 : 1))
          // }
          // else {
          //   let h = getBarWidth.call(this, d, i, xAxis)
          //   output = (this[`${yAxis}Axis`](0)) + (h * (d.y.value < 0 ? 1 : 0))
          // }
          if (this.options.grouping === 'stacked') {
            // no support for stacks yet
            var accH = getBarWidth.call(this, {
              x: d.x,
              y: {
                value: d.y.accumulative
              }
            }, i, yAxis, xAxis);
            var h = getBarWidth.call(this, d, i, yAxis, xAxis);
            // output = (this[`${yAxis}Axis`](0)) + ((accH + h) * (d.y.accumulative > 0 ? 0 : 1))
            if (d.y.value >= 0) {
              output = this["".concat(yAxis, "Axis")](0) + Math.abs(accH) * (d.y.accumulative > 0 ? 1 : 0);
            } else {
              output = this["".concat(yAxis, "Axis")](0) - (Math.abs(accH) + Math.abs(h)) * (d.y.accumulative > 0 ? 1 : 0);
            }
          } else {
            var _h = getBarWidth.call(this, d, i, yAxis, xAxis);
            if (d.y.value >= 0) {
              output = this["".concat(yAxis, "Axis")](0);
            } else {
              output = this["".concat(yAxis, "Axis")](0) + _h;
            }
          }
        } else {
          // let adjustment = this.options.data[xAxis.replace('Brush', '')].scale === 'Time' ? 0 : this.options.data[xAxis.replace('Brush', '')].bandWidth / 2
          // let adjustment = this[`custom${xAxis.toInitialCaps()}Range`][i] + (i * this.options.data[xAxis].bandWidth)
          if (this.options.grouping === 'grouped') {
            var xIndex = 0;
            if (this.processedX[d.x.value]) {
              xIndex = Math.max(0, this.processedX[d.x.value].indexOf(d.y.tooltipLabel));
            }
            var barAdjustment = this.options.data[xAxis].bandWidth * xIndex + (xAxis.indexOf('Brush') !== -1 ? this.brushBandPadding : this.bandPadding) / 2 + (xAxis.indexOf('Brush') !== -1 ? 1 : this.options.groupPadding);
            if (this["custom".concat(xAxis.toInitialCaps(), "Range")].length > 0) {
              output = this["custom".concat(xAxis.toInitialCaps(), "Range")][this[xAxis + 'Axis'].domain().indexOf(d.x.value)] + barAdjustment;
              // output = this[`custom${xAxis.toInitialCaps().replace('Brush', '')}DetailRange`][this[xAxis + 'Axis'].domain().indexOf(d.x.value)]
            } else {
              output = this["".concat(xAxis, "Axis")](this.parseX(d.x.value)) + barAdjustment;
            }
            if (!this.processedX[d.x.value]) {
              this.processedX[d.x.value] = [];
            }
            if (this.processedX[d.x.value].indexOf(d.y.tooltipLabel) === -1) {
              this.processedX[d.x.value].push(d.y.tooltipLabel);
            }
            // console.log(d.x.value, d.y.tooltipLabel, xIndex, i, barAdjustment, output)  
          } else {
            var _barAdjustment = (xAxis.indexOf('Brush') !== -1 ? this.brushBandPadding : this.bandPadding) / 2 + (xAxis.indexOf('Brush') !== -1 ? 1 : this.options.groupPadding);
            output = this["custom".concat(xAxis.toInitialCaps(), "Range")][this[xAxis + 'Axis'].domain().indexOf(d.x.value)] + _barAdjustment;
          }
        }
        if (isNaN(output)) {
          return null;
        }
        return output;
      }
      function getBarY(d, i, yAxis, xAxis) {
        var output;
        if (this.options.orientation === 'horizontal') {
          if (this.options.grouping !== 'grouped') {
            var barAdjustment = (xAxis.indexOf('Brush') !== -1 ? this.brushBandPadding : this.bandPadding) / 2 + (xAxis.indexOf('Brush') !== -1 ? 1 : this.options.groupPadding);
            output = this["custom".concat(xAxis.toInitialCaps(), "Range")][this[xAxis + 'Axis'].domain().indexOf(d.x.value)] + barAdjustment;
          } else {
            // output = this[`${xAxis}Axis`](this.parseX(d.x.value)) + ((d.y.index || i) * this.options.data[xAxis.replace('Brush', '')].barWidth)
            var xIndex = 0;
            if (this.processedX[d.x.value]) {
              xIndex = Math.max(0, this.processedX[d.x.value].indexOf(d.y.tooltipLabel));
            }
            var _barAdjustment2 = this.options.data[xAxis].bandWidth * xIndex + (xAxis.indexOf('Brush') !== -1 ? this.brushBandPadding : this.bandPadding) / 2 + (xAxis.indexOf('Brush') !== -1 ? 1 : this.options.groupPadding);
            if (this["custom".concat(xAxis.toInitialCaps(), "Range")].length > 0) {
              output = this["custom".concat(xAxis.toInitialCaps(), "Range")][this[xAxis + 'Axis'].domain().indexOf(d.x.value)] + _barAdjustment2;
              // output = this[`custom${xAxis.toInitialCaps().replace('Brush', '')}DetailRange`][this[xAxis + 'Axis'].domain().indexOf(d.x.value)]
            } else {
              output = this["".concat(xAxis, "Axis")](this.parseX(d.x.value)) + _barAdjustment2;
            }
            if (!this.processedX[d.x.value]) {
              this.processedX[d.x.value] = [];
            }
            if (this.processedX[d.x.value].indexOf(d.y.tooltipLabel) === -1) {
              this.processedX[d.x.value].push(d.y.tooltipLabel);
            }
          }
        } else {
          if (this.options.grouping === 'stacked') {
            var accH = getBarHeight.call(this, {
              x: d.x,
              y: {
                value: d.y.accumulative
              }
            }, i, yAxis, xAxis);
            var h = getBarHeight.call(this, d, i, yAxis, xAxis);
            output = this["".concat(yAxis, "Axis")](0) - (accH + h) * (d.y.accumulative < 0 ? 0 : 1);
          } else {
            var _h2 = getBarHeight.call(this, d, i, yAxis, xAxis);
            output = this["".concat(yAxis, "Axis")](0) - _h2 * (d.y.value < 0 ? 0 : 1);
          }
        }
        if (isNaN(output)) {
          return null;
        }
        return output;
      }
      bars.exit().transition(this.transition).style('fill-opacity', 1e-6).remove();
      bars.attr('width', function (d, i) {
        return Math.abs(getBarWidth.call(_this56, d, i, yAxis, xAxis));
      }).attr('height', function (d, i) {
        return getBarHeight.call(_this56, d, i, yAxis, xAxis);
      }).attr('x', function (d, i) {
        return getBarX.call(_this56, d, i, yAxis, xAxis);
      }).attr('y', function (d, i) {
        return getBarY.call(_this56, d, i, yAxis, xAxis);
      })
      // .transition(this.transition)  
      .attr('fill', function (d) {
        return d.y.color || d.color || series.color;
      });
      bars.enter().append('rect').attr('width', function (d, i) {
        return Math.abs(getBarWidth.call(_this56, d, i, yAxis, xAxis));
      }).attr('height', function (d, i) {
        return getBarHeight.call(_this56, d, i, yAxis, xAxis);
      }).attr('x', function (d, i) {
        return getBarX.call(_this56, d, i, yAxis, xAxis);
      }).attr('y', function (d, i) {
        return getBarY.call(_this56, d, i, yAxis, xAxis);
      })
      // .transition(this.transition)
      .attr('fill', function (d) {
        return d.y.color || d.color || series.color;
      }).attr('class', function (d) {
        return "bar bar_".concat(series.key);
      });
      if (!this.brushBarsInitialized[series.key]) {
        this.brushBarsInitialized[series.key] = true;
        brushBars.exit().transition(this.transition).style('fill-opacity', 1e-6).remove();
        brushBars.attr('width', function (d, i) {
          return Math.abs(getBarWidth.call(_this56, d, i, "".concat(yAxis, "Brush"), "".concat(xAxis, "Brush")));
        }).attr('height', function (d, i) {
          return getBarHeight.call(_this56, d, i, "".concat(yAxis, "Brush"), "".concat(xAxis, "Brush"));
        }).attr('x', function (d, i) {
          return getBarX.call(_this56, d, i, "".concat(yAxis, "Brush"), "".concat(xAxis, "Brush"));
        }).attr('y', function (d, i) {
          return getBarY.call(_this56, d, i, "".concat(yAxis, "Brush"), "".concat(xAxis, "Brush"));
        })
        // .transition(this.transition)  
        .attr('fill', function (d) {
          return d.y.color || d.color || series.color;
        });
        brushBars.enter().append('rect').attr('width', function (d, i) {
          return Math.abs(getBarWidth.call(_this56, d, i, "".concat(yAxis, "Brush"), "".concat(xAxis, "Brush")));
        }).attr('height', function (d, i) {
          return getBarHeight.call(_this56, d, i, "".concat(yAxis, "Brush"), "".concat(xAxis, "Brush"));
        }).attr('x', function (d, i) {
          return getBarX.call(_this56, d, i, "".concat(yAxis, "Brush"), "".concat(xAxis, "Brush"));
        }).attr('y', function (d, i) {
          return getBarY.call(_this56, d, i, "".concat(yAxis, "Brush"), "".concat(xAxis, "Brush"));
        })
        // .transition(this.transition)
        .attr('fill', function (d) {
          return d.y.color || d.color || series.color;
        }).attr('class', function (d) {
          return "bar bar_".concat(series.key);
        });
      }
    }
  }, {
    key: "removebar",
    value: function removebar(key) {
      /* global key d3 */
      this.barLayer.selectAll(".bar_".concat(key)).transition(this.transition).style('fill-opacity', 1e-6).remove();
      // remove from the brush as well
      this.brushArea.selectAll(".bar_".concat(key)).transition(this.transition).style('fill-opacity', 1e-6).remove();
    }
  }, {
    key: "renderLabels",
    value: function renderLabels(series, index) {
      var _this57 = this;
      /* global series index d3 WebsyDesigns */
      var xAxis = 'bottom';
      var yAxis = 'left';
      var that = this;
      if (this.options.orientation === 'horizontal') {
        xAxis = 'left';
        yAxis = 'bottom';
      }
      if (this.options.showLabels === true || series.showLabels === true) {
        // need to add logic to handle positioning options
        // e.g. Inside, Outide, Auto (this will also affect the available plot space)
        // We currently only support 'Auto'  
        var labels = this.labelLayer.selectAll(".label_".concat(series.key)).data(series.data);
        labels.exit().transition(this.transition).style('stroke-opacity', 1e-6).remove();
        labels.attr('x', function (d) {
          return getLabelX.call(_this57, d, series.labelPosition);
        }).attr('y', function (d) {
          return getLabelY.call(_this57, d, series.labelPosition);
        }).attr('class', "label_".concat(series.key)).attr('fill', function (d) {
          if (_this57.options.grouping === 'stacked' && d.y.value === 0) {
            return 'transparent';
          }
          return _this57.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(d.y.color || d.color || series.color);
        }).style('font-size', "".concat(this.options.labelSize || this.options.fontSize, "px")).transition(this.transition).text(function (d) {
          return d.y.label || d.y.value;
        }).each(function (d, i) {
          if (that.options.orientation === 'horizontal') {
            if (that.options.grouping === 'stacked' && series.labelPosition !== 'outside') {
              this.setAttribute('text-anchor', 'middle');
            } else if (that.plotWidth - getLabelX.call(that, d) < this.getComputedTextLength()) {
              this.setAttribute('text-anchor', 'end');
              this.setAttribute('x', +this.getAttribute('x') - 8);
              this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(d.y.color || d.color || series.color));
            } else if (d.y.value < 0 && this.getAttribute('x') < 0) {
              this.setAttribute('text-anchor', 'start');
              this.setAttribute('x', Math.max(+this.getAttribute('x') + 8, 8));
              this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(d.y.color || d.color || series.color));
            } else if (d.y.value < 0 && this.getAttribute('x') > 0) {
              this.setAttribute('text-anchor', 'end');
              this.setAttribute('x', +this.getAttribute('x') - 8);
              this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark('#ffffff'));
            } else if (series.labelPosition === 'outside') {
              this.setAttribute('text-anchor', 'start');
              this.setAttribute('x', +this.getAttribute('x') + 8);
              this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark('#ffffff'));
            } else {
              this.setAttribute('text-anchor', 'start');
              this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark('#ffffff'));
            }
          } else {
            if (that.plotheight - getLabelX.call(that, d) < (that.options.labelSize || that.options.fontSize)) {
              this.setAttribute('y', +this.getAttribute('y') + 8);
            }
          }
        });
        labels.enter().append('text').attr('class', "label_".concat(series.key)).attr('x', function (d) {
          return getLabelX.call(_this57, d, series.labelPosition);
        }).attr('y', function (d) {
          return getLabelY.call(_this57, d, series.labelPosition);
        }).attr('alignment-baseline', 'central').attr('text-anchor', this.options.orientation === 'horizontal' ? 'left' : 'middle').attr('fill', function (d) {
          if (_this57.options.grouping === 'stacked' && d.y.value === 0) {
            return 'transparent';
          }
          return _this57.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(d.y.color || d.color || series.color);
        }).style('font-size', "".concat(this.options.labelSize || this.options.fontSize, "px")).text(function (d) {
          return d.y.label || d.y.value;
        }).each(function (d, i) {
          if (that.options.orientation === 'horizontal') {
            if (that.options.grouping === 'stacked' && series.labelPosition !== 'outside') {
              this.setAttribute('text-anchor', 'middle');
            } else if (that.plotWidth - getLabelX.call(that, d) < this.getComputedTextLength()) {
              this.setAttribute('text-anchor', 'end');
              this.setAttribute('x', +this.getAttribute('x') - 8);
              this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(d.y.color || d.color || series.color));
            } else if (d.y.value < 0 && this.getAttribute('x') < 0) {
              this.setAttribute('text-anchor', 'start');
              this.setAttribute('x', Math.max(+this.getAttribute('x') + 8, 8));
              this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(d.y.color || d.color || series.color));
            } else if (d.y.value < 0 && this.getAttribute('x') > 0) {
              this.setAttribute('text-anchor', 'end');
              this.setAttribute('x', +this.getAttribute('x') - 8);
              this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark('#ffffff'));
            } else if (series.labelPosition === 'outside') {
              this.setAttribute('text-anchor', 'start');
              this.setAttribute('x', +this.getAttribute('x') + 8);
              this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark('#ffffff'));
            } else {
              this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark('#ffffff'));
            }
          } else {
            if (that.plotheight - getLabelX.call(that, d) < (that.options.labelSize || that.options.fontSize)) {
              this.setAttribute('y', +this.getAttribute('y') + 8);
            }
            if (series.labelPosition !== 'outside') {
              this.setAttribute('fill', that.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(d.y.color || d.color || series.color));
            }
          }
        });
      }
      function getLabelX(d) {
        var labelPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'inside';
        if (this.options.orientation === 'horizontal') {
          if (this.options.grouping === 'stacked') {
            return this[yAxis + 'Axis'](d.y.accumulative) + this[yAxis + 'Axis'](d.y.value) / (labelPosition === 'inside' ? 2 : 1);
          } else {
            return this[yAxis + 'Axis'](isNaN(d.y.value) ? 0 : d.y.value) + 4;
          }
        } else {
          // return this[xAxis](this.parseX(d.x.value)) + (this.options.data[xAxis.replace('Axis', '')].bandWidth / 2)
          var xIndex = this[xAxis + 'Axis'].domain().indexOf(d.x.value);
          var xPos = this["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex];
          if (this["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex + 1]) {
            xPos = xPos + (this["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex + 1] - xPos) / 2;
          }
          return xPos;
        }
      }
      function getLabelY(d) {
        var labelPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'inside';
        if (this.options.orientation === 'horizontal') {
          var xIndex = this[xAxis + 'Axis'].domain().indexOf(d.x.value);
          var xPos = this["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex];
          if (this["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex + 1]) {
            xPos = xPos + (this["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex + 1] - xPos) / 2;
          }
          return xPos;
        } else {
          if (this.options.grouping === 'stacked') {
            var accH = this["".concat(yAxis, "Axis")](0) - this["".concat(yAxis, "Axis")](Math.abs(d.y.accumulative));
            var h = this["".concat(yAxis, "Axis")](0) - this["".concat(yAxis, "Axis")](Math.abs(d.y.value));
            return this["".concat(yAxis, "Axis")](0) - (accH + h - (labelPosition === 'inside' ? h / 2 : 0)) * (d.y.accumulative < 0 ? 0 : 1);
            // return (this[`${yAxis}Axis`](0)) - (this[yAxis + 'Axis'](d.y.accumulative) - (this[yAxis + 'Axis'](d.y.value))) // / (labelPosition === 'inside' ? 2 : 1)))
          } else {
            return this[yAxis + 'Axis'](isNaN(d.y.value) ? 0 : d.y.value) - (this.options.labelSize || this.options.fontSize);
          }
        }
      }
    }
  }, {
    key: "renderline",
    value: function renderline(series, index) {
      var _this58 = this;
      /* global series index d3 */
      var drawLine = function drawLine(xAxis, yAxis, curveStyle) {
        return d3.line().x(function (d) {
          if (_this58.options.orientation === 'horizontal') {
            return _this58["".concat(yAxis, "Axis")](isNaN(d.y.value) ? 0 : d.y.value);
          } else {
            if (_this58.options.data[xAxis].scale === 'Time') {
              return _this58["".concat(xAxis, "Axis")](_this58.parseX(d.x.value));
            } else {
              var xIndex = _this58[xAxis + 'Axis'].domain().indexOf(d.x.value);
              var xPos = _this58["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex];
              if (_this58["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex + 1]) {
                xPos = xPos + (_this58["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex + 1] - xPos) / 2;
              }
              return xPos;
            }
          }
        }).y(function (d) {
          if (_this58.options.orientation === 'horizontal') {
            var adjustment = _this58.options.data[xAxis.replace('Brush', '')].scale === 'Time' ? 0 : _this58.options.data[xAxis].bandWidth / 2;
            return _this58["".concat(xAxis, "Axis")](_this58.parseX(d.x.value)) + adjustment;
          } else {
            return _this58["".concat(yAxis, "Axis")](isNaN(d.y.value) ? 0 : d.y.value);
          }
        }).curve(d3[curveStyle || _this58.options.curveStyle]);
      };
      var xAxis = 'bottom';
      var yAxis = series.axis === 'secondary' ? 'right' : 'left';
      if (this.options.orientation === 'horizontal') {
        xAxis = series.axis === 'secondary' ? 'right' : 'left';
        yAxis = 'bottom';
      }
      var xBrushAxis = 'bottomBrush';
      var yBrushAxis = series.axis === 'secondary' ? 'rightBrush' : 'leftBrush';
      if (this.options.orientation === 'horizontal') {
        xBrushAxis = 'leftBrush';
        yBrushAxis = 'bottomBrush';
      }
      var lines = this.lineLayer.selectAll(".line_".concat(series.key)).data([series.data]);
      var brushLines = this.brushArea.selectAll(".line_".concat(series.key)).data([series.data]);
      // Exit
      lines.exit().transition(this.transition).style('stroke-opacity', 1e-6).remove();
      // Update
      lines.style('stroke-width', series.lineWidth || this.options.lineWidth)
      // .attr('id', `line_${series.key}`)
      // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
      .attr('stroke', function (d) {
        return d[0].y.color || series.color;
      }).attr('fill', 'transparent').transition(this.transition).attr('d', function (d) {
        return drawLine(xAxis, yAxis, series.curveStyle)(d);
      });
      // Enter
      lines.enter().append('path').attr('d', function (d) {
        return drawLine(xAxis, yAxis, series.curveStyle)(d);
      }).attr('class', "line_".concat(series.key)).attr('id', "line_".concat(series.key))
      // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
      .style('stroke-width', series.lineWidth || this.options.lineWidth).attr('stroke', function (d) {
        return d[0].y.color || series.color;
      }).attr('fill', 'transparent')
      // .transition(this.transition)
      .style('stroke-opacity', 1);
      if (!this.brushLinesInitialized[series.key]) {
        this.brushLinesInitialized[series.key] = true;
        // Exit
        brushLines.exit().transition(this.transition).style('stroke-opacity', 1e-6).remove();
        // Update
        brushLines.style('stroke-width', 1)
        // .attr('id', `line_${series.key}`)
        // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
        .attr('stroke', series.color).attr('fill', 'transparent').transition(this.transition).attr('d', function (d) {
          return drawLine(xBrushAxis, yBrushAxis, series.curveStyle)(d);
        });
        // Enter
        brushLines.enter().append('path').attr('d', function (d) {
          return drawLine(xBrushAxis, yBrushAxis, series.curveStyle)(d);
        }).attr('class', "line_".concat(series.key)).attr('id', "line_".concat(series.key))
        // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
        .style('stroke-width', 1).attr('stroke', series.color).attr('fill', 'transparent')
        // .transition(this.transition)
        .style('stroke-opacity', 1);
      }
      if (series.showArea === true) {
        this.renderarea(series, index);
      }
      if (series.showSymbols === true) {
        this.rendersymbol(series, index);
      }
    }
  }, {
    key: "renderRefLine",
    value: function renderRefLine(data) {
      /* global d3 data */
      var xAxis = 'bottom';
      var yAxis = 'left';
      var yAttr = 'y';
      var xAttr = 'x';
      var that = this;
      var length = this.plotWidth;
      if (this.options.orientation === 'horizontal') {
        xAxis = 'left';
        yAxis = 'bottom';
        yAttr = 'x';
        xAttr = 'y';
        length = this.plotHeight;
      }
      this.refLineLayer.append('line').attr("".concat(yAttr, "1"), this["".concat(yAxis, "Axis")](data.value)).attr("".concat(yAttr, "2"), this["".concat(yAxis, "Axis")](data.value)).attr("".concat(xAttr, "2"), length).attr('class', "reference-line").style('stroke', data.color).style('stroke-width', "".concat(data.lineWidth, "px")).style('stroke-dasharray', data.lineStyle);
      if (data.label && data.label !== '') {
        // show the text on the line
        this.refLineLayer.append('text').attr('class', "reference-line-label").attr('x', length).attr('y', this["".concat(yAxis, "Axis")](data.value)).attr('font-size', this.options.fontSize).attr('fill', data.color).text(data.label).attr('text-anchor', 'end').attr('alignment-baseline', 'text-after-edge');
      }
    }
  }, {
    key: "removeline",
    value: function removeline(key) {
      /* global key d3 */
      var lines = this.lineLayer.selectAll(".line_".concat(key)).transition(this.transition).style('stroke-opacity', 1e-6).remove();
      var areas = this.areaLayer.selectAll(".area_".concat(key)).transition(this.transition).style('stroke-opacity', 1e-6).remove();
    }
  }, {
    key: "removelabel",
    value: function removelabel(key) {
      /* global key d3 */
      var labels = this.labelLayer.selectAll(".label_".concat(key)).transition(this.transition).style('stroke-opacity', 1e-6).remove();
    }
  }, {
    key: "removesymbol",
    value: function removesymbol(key) {
      /* global key d3 */
      var symbols = this.symbolLayer.selectAll(".symbol_".concat(key)).transition(this.transition).style('stroke-opacity', 1e-6).remove();
    }
  }, {
    key: "rendersymbol",
    value: function rendersymbol(series, index) {
      var _this59 = this;
      /* global d3 series index series.key */
      var drawSymbol = function drawSymbol(size) {
        return d3.symbol()
        // .type(d => {
        //   return d3.symbols[0]
        // })
        .size(size || _this59.options.symbolSize);
      };
      var xAxis = 'bottom';
      var yAxis = series.axis === 'secondary' ? 'right' : 'left';
      if (this.options.orientation === 'horizontal') {
        xAxis = series.axis === 'secondary' ? 'right' : 'left';
        yAxis = 'bottom';
      }
      var symbols = this.symbolLayer.selectAll(".symbol_".concat(series.key)).data(series.data);
      // Exit
      symbols.exit().transition(this.transition).style('fill-opacity', 1e-6).remove();
      // Update
      symbols.attr('d', function (d) {
        return drawSymbol(d.y.size || series.symbolSize)(d);
      }).transition(this.transition).attr('fill', function (d) {
        return series.fillSymbols ? d.y.color || series.color : 'white';
      }).attr('stroke', function (d) {
        return d.y.color || series.color;
      }).attr('transform', function (d) {
        // let adjustment = (this.options.data[xAxis].scale === 'Time' || this.options.data[xAxis].scale === 'Linear') ? 0 : this.options.data[xAxis].bandWidth / 2
        // if (this.options.orientation === 'horizontal') {  
        //   return `translate(${this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)}, ${this[`${xAxis}Axis`](this.parseX(d.x.value)) + adjustment})` 
        // }
        // else {
        //   return `translate(${this[`${xAxis}Axis`](this.parseX(d.x.value)) + adjustment}, ${this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)})` 
        // }
        var xIndex = _this59[xAxis + 'Axis'].domain().indexOf(d.x.value);
        var xPos = _this59["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex];
        if (_this59["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex + 1]) {
          xPos = xPos + (_this59["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex + 1] - xPos) / 2;
        }
        var adjustment = _this59.options.data[xAxis].scale === 'Time' || _this59.options.data[xAxis].scale === 'Linear' ? 0 : _this59.options.data[xAxis].bandWidth / 2;
        if (_this59.options.orientation === 'horizontal') {
          return "translate(".concat(_this59["".concat(yAxis, "Axis")](isNaN(d.y.value) ? 0 : d.y.value), ", ").concat(xPos, ")");
        } else {
          if (_this59.options.data[xAxis].scale === 'Time') {
            xPos = _this59["".concat(xAxis, "Axis")](_this59.parseX(d.x.value));
          } else {
            var _xIndex = _this59[xAxis + 'Axis'].domain().indexOf(d.x.value);
            var _xPos = _this59["custom".concat(xAxis.toInitialCaps(), "Range")][_xIndex];
            if (_this59["custom".concat(xAxis.toInitialCaps(), "Range")][_xIndex + 1]) {
              _xPos = _xPos + (_this59["custom".concat(xAxis.toInitialCaps(), "Range")][_xIndex + 1] - _xPos) / 2;
            }
            // return xPos
          }
          // return `translate(${this[`${xAxis}Axis`](this.parseX(d.x.value)) + adjustment}, ${this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)})` 
          return "translate(".concat(xPos, ", ").concat(_this59["".concat(yAxis, "Axis")](isNaN(d.y.value) ? 0 : d.y.value), ")");
        }
      });
      // Enter
      symbols.enter().append('path').attr('d', function (d) {
        return drawSymbol(d.y.size || series.symbolSize)(d);
      })
      // .transition(this.transition)
      .attr('fill', function (d) {
        return series.fillSymbols ? d.y.color || series.color : 'white';
      }).attr('stroke', function (d) {
        return d.y.color || series.color;
      }).attr('class', function (d) {
        return "symbol symbol_".concat(series.key);
      }).attr('transform', function (d) {
        var xIndex = _this59[xAxis + 'Axis'].domain().indexOf(d.x.value);
        var xPos = _this59["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex];
        if (_this59["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex + 1]) {
          xPos = xPos + (_this59["custom".concat(xAxis.toInitialCaps(), "Range")][xIndex + 1] - xPos) / 2;
        }
        var adjustment = _this59.options.data[xAxis].scale === 'Time' || _this59.options.data[xAxis].scale === 'Linear' ? 0 : _this59.options.data[xAxis].bandWidth / 2;
        if (_this59.options.orientation === 'horizontal') {
          return "translate(".concat(_this59["".concat(yAxis, "Axis")](isNaN(d.y.value) ? 0 : d.y.value), ", ").concat(xPos, ")");
        } else {
          if (_this59.options.data[xAxis].scale === 'Time') {
            xPos = _this59["".concat(xAxis, "Axis")](_this59.parseX(d.x.value));
          } else {
            var _xIndex2 = _this59[xAxis + 'Axis'].domain().indexOf(d.x.value);
            var _xPos2 = _this59["custom".concat(xAxis.toInitialCaps(), "Range")][_xIndex2];
            if (_this59["custom".concat(xAxis.toInitialCaps(), "Range")][_xIndex2 + 1]) {
              _xPos2 = _xPos2 + (_this59["custom".concat(xAxis.toInitialCaps(), "Range")][_xIndex2 + 1] - _xPos2) / 2;
            }
            // return xPos
          }
          // return `translate(${this[`${xAxis}Axis`](this.parseX(d.x.value)) + adjustment}, ${this[`${yAxis}Axis`](isNaN(d.y.value) ? 0 : d.y.value)})` 
          return "translate(".concat(xPos, ", ").concat(_this59["".concat(yAxis, "Axis")](isNaN(d.y.value) ? 0 : d.y.value), ")");
        }
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      /* global d3 */
      var el = document.getElementById(this.elementId);
      if (el) {
        this.width = el.clientWidth;
        this.height = el.clientHeight;
        this.svg.attr('width', this.width - this.options.margin.legendLeft - this.options.margin.legendRight).attr('height', this.height - this.options.margin.legendTop - this.options.margin.legendBottom).attr('transform', "translate(".concat(this.options.margin.legendLeft, ", ").concat(this.options.margin.legendTop, ")"));
        // Define the plot height  
        // this.plotWidth = this.width - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight
        // this.plotHeight = this.height - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom
        this.plotWidth = this.width - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight;
        this.plotHeight = this.height - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom - this.options.margin.axisTop;
        // establish the space needed for the various axes
        this.longestRight = 5;
        this.longestBottom = 5;
        this.options.margin.axisLeft = this.longestLeft * (this.options.data.left && this.options.data.left.fontSize || this.options.fontSize) * 0.7;
        this.options.margin.axisRight = this.longestRight * (this.options.data.right && this.options.data.right.fontSize || this.options.fontSize) * 0.7;
        this.options.margin.axisBottom = (this.options.data.bottom && this.options.data.bottom.fontSize || this.options.fontSize) + 10;
        if (this.options.data.bottom.rotate) {
          // this.options.margin.bottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)   
          this.options.margin.axisBottom = this.longestBottom * (this.options.data.bottom && this.options.data.bottom.fontSize || this.options.fontSize) * 0.4;
          // this.options.margin.bottom = this.options.margin.bottom * (1 + this.options.data.bottom.rotate / 100)
        }
        // hide the margin if necessary
        if (this.options.axis) {
          if (this.options.axis.hideAll === true) {
            this.options.margin.axisLeft = 0;
            this.options.margin.axisRight = 0;
            this.options.margin.axisBottom = 0;
          }
          if (this.options.axis.hideLeft === true) {
            this.options.margin.axisLeft = 0;
          }
          if (this.options.axis.hideRight === true) {
            this.options.margin.axisRight = 0;
          }
          if (this.options.axis.hideBottom === true) {
            this.options.margin.axisBottom = 0;
          }
        }
        // Translate the layers
        // this.leftAxisLayer
        //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
        // this.rightAxisLayer
        //   .attr('transform', `translate(${this.options.margin.left + this.plotWidth + this.options.margin.axisLeft}, ${this.options.margin.top})`)
        // this.bottomAxisLayer
        //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top + this.plotHeight})`)
        // this.plotArea
        //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
        // this.areaLayer
        //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
        // this.lineLayer
        //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
        // this.barLayer
        //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
        // this.labelLayer
        //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
        // this.symbolLayer
        //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
        // this.trackingLineLayer
        //   .attr('transform', `translate(${this.options.margin.left + this.options.margin.axisLeft}, ${this.options.margin.top})`)
        this.leftAxisLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
        this.rightAxisLayer.attr('transform', "translate(".concat(this.options.margin.left + this.plotWidth + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
        this.bottomAxisLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop + this.plotHeight, ")"));
        this.leftAxisLabel.attr('transform', "translate(".concat(this.options.margin.left, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
        this.rightAxisLabel.attr('transform', "translate(".concat(this.options.margin.left + this.plotWidth + this.options.margin.axisLeft + this.options.margin.axisRight, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
        this.bottomAxisLabel.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop + this.plotHeight, ")"));
        this.plotArea.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
        this.areaLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
        this.lineLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
        this.barLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
        this.labelLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
        this.symbolLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
        this.trackingLineLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
        this.eventLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")"));
      }
    }
  }, {
    key: "hideError",
    value: function hideError() {
      var el = document.getElementById("".concat(this.elementId));
      if (el) {
        el.classList.remove('has-error');
      }
      if (this.svg) {
        this.svg.classed('hidden', false);
      }
      var containerEl = document.getElementById("".concat(this.elementId, "_errorContainer"));
      if (containerEl) {
        containerEl.classList.remove('active');
      }
    }
  }, {
    key: "hideLoading",
    value: function hideLoading() {
      this.loadingDialog.hide();
    }
  }, {
    key: "showError",
    value: function showError(options) {
      var el = document.getElementById("".concat(this.elementId));
      if (el) {
        el.classList.add('has-error');
      }
      // const chartEl = document.getElementById(`${this.elementId}_chartContainer`)
      // chartEl.classList.add('hidden') 
      if (this.svg) {
        this.svg.classed('hidden', true);
      }
      var containerEl = document.getElementById("".concat(this.elementId, "_errorContainer"));
      if (containerEl) {
        containerEl.classList.add('active');
      }
      if (options.title) {
        var titleEl = document.getElementById("".concat(this.elementId, "_errorTitle"));
        if (titleEl) {
          titleEl.innerHTML = options.title;
        }
      }
      if (options.message) {
        var messageEl = document.getElementById("".concat(this.elementId, "_errorMessage"));
        if (messageEl) {
          messageEl.innerHTML = options.message;
        }
      }
    }
  }, {
    key: "showLoading",
    value: function showLoading(options) {
      this.loadingDialog.show(options);
    }
  }]);
  return WebsyChart;
}();
var WebsyLegend = /*#__PURE__*/function () {
  function WebsyLegend(elementId, options) {
    _classCallCheck(this, WebsyLegend);
    var DEFAULTS = {
      align: 'center',
      direction: 'horizontal',
      style: 'circle',
      symbolSize: 16,
      hPadding: 20,
      vPadding: 10
    };
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    this._data = [];
    if (!elementId) {
      console.log('No element Id provided for Websy Chart');
      return;
    }
    var el = document.getElementById(this.elementId);
    if (el) {
      el.classList.add('websy-legend');
      this.render();
    } else {
      console.error("No element found with ID ".concat(this.elementId));
    }
  }
  _createClass(WebsyLegend, [{
    key: "getLegendItemHTML",
    value: function getLegendItemHTML(d) {
      return "\n      <div \n        class='websy-legend-item ".concat(this.options.direction, "' \n        style='margin: ").concat(this.options.vPadding / 2, "px ").concat(this.options.hPadding / 2, "px;'\n      >\n        <span \n          class='symbol ").concat(d.style || this.options.style, "' \n          style='\n            background-color: ").concat(d.color, ";\n            width: ").concat(this.options.symbolSize, "px;\n            height: ").concat(this.options.style === 'line' ? 3 : this.options.symbolSize, "px;\n          '\n        ></span>\n        ").concat(d.value, "\n      </div>\n    ");
    }
  }, {
    key: "getSize",
    value: function getSize() {
      var el = document.getElementById(this.elementId);
      if (el) {
        return {
          width: el.clientWidth,
          height: el.clientHeight
        };
      }
    }
  }, {
    key: "data",
    set: function set(d) {
      this._data = d;
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      this.resize();
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this60 = this;
      var el = document.getElementById(this.elementId);
      if (el) {
        // if (this.options.width) {
        //   el.width = this.options.width
        // }
        // if (this.options.height) {
        //   el.height = this.options.height
        // }
        var html = "\n        <div class='text-".concat(this.options.align, "'>\n      ");
        html += this._data.map(function (d, i) {
          return _this60.getLegendItemHTML(d);
        }).join('');
        html += "\n        <div>\n      ";
        el.innerHTML = html;
      }
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.options = _extends({}, this.options, options);
    }
  }, {
    key: "testWidth",
    value: function testWidth(v) {
      var html = this.getLegendItemHTML({
        value: v
      });
      var el = document.createElement('div');
      el.style.position = 'absolute';
      // el.style.width = '100vw'
      el.style.visibility = 'hidden';
      el.innerHTML = html;
      document.body.appendChild(el);
      var w = el.clientWidth + 30; // for padding
      el.remove();
      return w;
    }
  }]);
  return WebsyLegend;
}();
/* global */
var WebsyKPI = /*#__PURE__*/function () {
  function WebsyKPI(elementId, options) {
    _classCallCheck(this, WebsyKPI);
    var DEFAULTS = {
      tooltip: {},
      label: {
        value: ''
      },
      value: {
        value: ''
      }
    };
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    this._isRendered = false;
    this.render();
  }
  _createClass(WebsyKPI, [{
    key: "isRendered",
    get: function get() {
      return this._isRendered;
    }
  }, {
    key: "render",
    value: function render(options) {
      this._isRendered = false;
      this.options = _extends({}, this.options, options);
      if (!this.options.label.classes) {
        this.options.label.classes = [];
      }
      if (!this.options.value.classes) {
        this.options.value.classes = [];
      }
      if (this.options.subValue && !this.options.subValue.classes) {
        this.options.subValue.classes = [];
      }
      if (!this.options.tooltip.classes) {
        this.options.tooltip.classes = [];
      }
      this.resize();
    }
  }, {
    key: "resize",
    value: function resize() {
      var el = document.getElementById(this.elementId);
      if (el) {
        var html = "\n        <div class=\"websy-kpi-container\">\n      ";
        if (this.options.icon) {
          html += "\n          <div class=\"websy-kpi-icon\"><img src=\"".concat(this.options.icon, "\"></div>   \n        ");
        }
        html += "   \n          <div class=\"websy-kpi-info\">\n            <div class=\"websy-kpi-label-container\">\n              <div class=\"websy-kpi-label ".concat(this.options.label.classes.join(' ') || '', "\">\n                ").concat((this.options.label || {}).value || '', "\n              </div>\n      ");
        if (this.options.tooltip && this.options.tooltip.value) {
          html += "\n          <div class=\"websy-info ".concat(this.options.tooltip.classes.join(' ') || '', "\" data-info=\"").concat(this.options.tooltip.value, "\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 512 512\"><title>ionicons-v5-e</title><path d=\"M256,56C145.72,56,56,145.72,56,256s89.72,200,200,200,200-89.72,200-200S366.28,56,256,56Zm0,82a26,26,0,1,1-26,26A26,26,0,0,1,256,138Zm48,226H216a16,16,0,0,1,0-32h28V244H228a16,16,0,0,1,0-32h32a16,16,0,0,1,16,16V332h28a16,16,0,0,1,0,32Z\"/></svg>\n          </div>   \n        ");
        }
        html += "\n            </div>\n            <div class=\"websy-kpi-value ".concat(this.options.value.classes.join(' ') || '', "\">").concat(this.options.value.value, "</div>\n      ");
        if (this.options.subValue) {
          html += "\n          <div class=\"websy-kpi-sub-value ".concat(this.options.subValue.classes.join(' ') || '', "\">").concat(this.options.subValue.value, "</div>\n        ");
        }
        html += "                                \n          </div>\n        </div>\n      ";
        el.innerHTML = html;
        this._isRendered = true;
      }
    }
  }]);
  return WebsyKPI;
}();
/* global d3 L WebsyDesigns */
var WebsyMap = /*#__PURE__*/function () {
  function WebsyMap(elementId, options) {
    _classCallCheck(this, WebsyMap);
    var DEFAULTS = {
      tileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      disablePan: false,
      disableZoom: false,
      markerSize: 10,
      useClustering: false,
      maxMarkerSize: 50,
      minMarkerSize: 20,
      data: {},
      legendPosition: 'bottom',
      colors: ['#5e4fa2', '#3288bd', '#66c2a5', '#abdda4', '#e6f598', '#fee08b', '#fdae61', '#f46d43', '#d53e4f', '#9e0142']
    };
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    this._isRendered = false;
    if (!elementId) {
      console.log('No element Id provided for Websy Map');
      return;
    }
    var mapOptions = _extends({}, options.mapOptions);
    mapOptions.click = this.handleMapClick.bind(this);
    if (this.options.disableZoom === true) {
      mapOptions.scrollWheelZoom = false;
      mapOptions.zoomControl = false;
    }
    if (this.options.disablePan === true) {
      mapOptions.dragging = false;
    }
    var el = document.getElementById(this.elementId);
    if (el) {
      if (typeof d3 === 'undefined') {
        // console.error('d3 library has not been loaded')
      }
      if (typeof L === 'undefined') {
        console.error('Leaflet library has not been loaded');
      }
      el.innerHTML = "\n        <div id=\"".concat(this.elementId, "_map\"></div>\n        <div id=\"").concat(this.elementId, "_legend\" class=\"websy-map-legend\"></div>\n      ");
      el.addEventListener('click', this.handleClick.bind(this));
      this.legend = new WebsyDesigns.Legend("".concat(this.elementId, "_legend"), {});
      this.map = L.map("".concat(this.elementId, "_map"), mapOptions);
      this.render();
    }
  }
  _createClass(WebsyMap, [{
    key: "isRendered",
    get: function get() {
      return this._isRendered;
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {}
  }, {
    key: "handleMapClick",
    value: function handleMapClick(event) {}
  }, {
    key: "render",
    value: function render() {
      var _this61 = this;
      this._isRendered = false;
      var mapEl = document.getElementById("".concat(this.elementId, "_map"));
      var legendEl = document.getElementById("".concat(this.elementId, "_map"));
      if (this.options.showLegend === true && this.options.data.polygons) {
        var legendData = this.options.data.polygons.map(function (s, i) {
          return {
            value: s.label || s.key,
            color: s.color || _this61.options.colors[i % _this61.options.colors.length]
          };
        });
        var longestValue = legendData.map(function (s) {
          return s.value;
        }).reduce(function (a, b) {
          return a.length > b.length ? a : b;
        });
        if (this.options.legendPosition === 'top' || this.options.legendPosition === 'bottom') {
          legendEl.style.width = '100%';
        }
        if (this.options.legendPosition === 'left' || this.options.legendPosition === 'right') {
          legendEl.style.height = '100%';
          legendEl.style.width = this.legend.testWidth(longestValue) + 'px';
        }
        this.legend.data = legendData;
        var legendSize = this.legend.getSize();
        mapEl.style.position = 'relative';
        if (this.options.legendPosition === 'top') {
          legendEl.style.top = 0;
          legendEl.style.bottom = 'unset';
          mapEl.style.top = legendSize.height;
          mapEl.style.height = "calc(100% - ".concat(legendSize.height, "px)");
        }
        if (this.options.legendPosition === 'bottom') {
          legendEl.style.top = 'unset';
          legendEl.style.bottom = 0;
          mapEl.style.height = "calc(100% - ".concat(legendSize.height, "px)");
        }
        if (this.options.legendPosition === 'left') {
          legendEl.style.left = 0;
          legendEl.style.right = 'unset';
          legendEl.style.top = 0;
          mapEl.style.left = "".concat(legendSize.width, "px");
          mapEl.style.width = "calc(100% - ".concat(legendSize.width, "px)");
        }
        if (this.options.legendPosition === 'right') {
          legendEl.style.left = 'unset';
          legendEl.style.right = 0;
          legendEl.style.top = 0;
          mapEl.style.width = "calc(100% - ".concat(legendSize.width, "px)");
        }
      } else {
        mapEl.style.width = '100%';
        mapEl.style.height = '100%';
      }
      var t = L.tileLayer(this.options.tileUrl, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
      if (this.geo) {
        this.map.removeLayer(this.geo);
      }
      if (this.polygons) {
        this.polygons.forEach(function (p) {
          return _this61.map.removeLayer(p);
        });
      }
      this.polygons = [];
      if (this.options.geoJSON) {
        this.geo = L.geoJSON(this.options.geoJSON, {
          style: function style(feature) {
            return {
              color: feature.color || '#ffffff',
              colorOpacity: feature.colorOpacity || 1,
              fillColor: feature.fillColor || '#e6463c',
              fillOpacity: feature.fillOpacity || 0,
              weight: feature.weight || 1
            };
          },
          onEachFeature: function onEachFeature(feature, layer) {
            layer.bindTooltip(feature.tooltip, {
              permanent: true,
              direction: 'center',
              className: feature.tooltipClass || 'websy-polygon-tooltip'
            });
          }
        }).addTo(this.map);
      }
      // this.markers = []        
      // this.data = [] // this.data.filter(d => d.Latitude.qNum !== 0 && d.Longitude.qNum !== 0)    
      // this.data.forEach(r => {
      //   // console.log(r)
      //   if (r.Latitude.qNum !== 0 && r.Longitude.qNum !== 0) {
      //     const markerOptions = {}
      //     if (this.options.simpleMarker === true) {
      //       markerOptions.icon = L.divIcon({className: 'simple-marker'})
      //     }
      //     if (this.options.markerUrl) {
      //       markerOptions.icon = L.icon({iconUrl: this.options.markerUrl})
      //     }
      //     markerOptions.data = r
      //     let m = L.marker([r.Latitude.qText, r.Longitude.qText], markerOptions)
      //     m.on('click', this.handleMapClick.bind(this))
      //     if (this.options.useClustering === false) {
      //       m.addTo(this.map)
      //     }
      //     this.markers.push(m)
      //     if (this.options.useClustering === true) {
      //       this.cluster.addLayer(m)
      //     }
      //   }
      // })
      if (this.options.data.polygons) {
        this.options.data.polygons.forEach(function (p, i) {
          if (!p.options) {
            p.options = {};
          }
          if (!p.options.color) {
            p.options.color = _this61.options.colors[i % _this61.options.colors.length];
          }
          var pol = L.polygon(p.data.map(function (c) {
            return c.map(function (d) {
              return [d.Latitude, d.Longitude];
            });
          }), p.options).addTo(_this61.map);
          _this61.polygons.push(pol);
          _this61.map.fitBounds(pol.getBounds());
        });
      }
      // if (this.data.markers.length > 0) {            
      //   el.classList.remove('hidden')
      //   if (this.options.useClustering === true) {
      //     this.map.addLayer(this.cluster)
      //   }
      //   const g = L.featureGroup(this.markers)
      //   this.map.fitBounds(g.getBounds())
      //   this.map.invalidateSize()
      // }
      if (this.geo) {
        this.map.fitBounds(this.geo.getBounds());
      } else if (this.polygons) {
        // this.map.fitBounds(this.geo.getBounds())
      } else if (this.options.center) {
        this.map.setView(this.options.center, this.options.zoom || null);
      }
      this._isRendered = true;
    }
  }]);
  return WebsyMap;
}();
var WebsyChartTooltip = /*#__PURE__*/function () {
  function WebsyChartTooltip(el) {
    _classCallCheck(this, WebsyChartTooltip);
    // el should be the element Id of an SVG element
    // or a reference to an SVG element
    if (typeof el === 'string') {
      this.svg = document.getElementById(el);
    } else {
      this.svg = el;
    }
    this.tooltipLayer = this.svg.append('g').attr('class', 'tooltip-layer');
    this.tooltipContent = this.tooltipLayer.append('foreignObject').attr('class', 'websy-chart-tooltip').append('xhtml:div').attr('class', 'websy-chart-tooltip-content');
  }
  _createClass(WebsyChartTooltip, [{
    key: "hide",
    value: function hide() {
      this.tooltipContent.classed('active', false);
    }
  }, {
    key: "setHeight",
    value: function setHeight(h) {
      this.tooltipLayer.select('foreignObject').style('height', h);
    }
  }, {
    key: "show",
    value: function show(title, html) {
      var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        top: 'unset',
        bottom: 'unset',
        left: 0,
        width: 0,
        height: 0,
        onLeft: false
      };
      var classes = ['active'];
      if (position.positioning === 'vertical') {
        classes.push('vertical');
      }
      if (position.onLeft === true) {
        classes.push('left');
      }
      if (position.onTop === true) {
        classes.push('top');
      }
      var fO = this.tooltipLayer.selectAll('foreignObject').attr('width', "".concat(position.width, "px"))
      // .attr('height', `${position.height}px`)
      // .attr('y', `0px`)      
      .attr('class', "websy-chart-tooltip ".concat(classes.join(' ')));
      this.tooltipContent.attr('class', "websy-chart-tooltip-content ".concat(classes.join(' '))).style('width', "".concat(position.width, "px"))
      // .style('left', '0px')
      // .style('top', `0px`)
      .html("<div class='title'>".concat(title, "</div>").concat(html));
      if (navigator.userAgent.indexOf('Chrome') === -1 && navigator.userAgent.indexOf('Safari') !== -1) {
        fO.attr('x', '0px');
        this.tooltipContent.style('left', position.positioning !== 'vertical' ? "".concat(position.left, "px") : 'unset').style('top', position.onTop !== true ? "".concat(position.top, "px") : 'unset').style('bottom', position.onTop === true ? "".concat(position.bottom, "px") : 'unset');
        // that.tooltipLayer.selectAll('foreignObject').transform(that.margin.left, that.margin.top)
      } else {
        if (position.positioning === 'vertical') {
          fO.attr('x', "".concat(position.left, "px"));
          fO.attr('y', "".concat(position.onTop === true ? position.bottom - this.tooltipContent._groups[0][0].clientHeight : position.top, "px"));
        } else {
          fO.attr('x', "".concat(position.left, "px"));
          fO.attr('y', "".concat(position.top, "px"));
        }
        this.tooltipContent.style('left', 'unset');
        this.tooltipContent.style('top', 'unset');
      }
    }
  }, {
    key: "transform",
    value: function transform(x, y) {
      this.tooltipLayer.attr('transform', "translate(".concat(x, ", ").concat(y, ")"));
    }
  }]);
  return WebsyChartTooltip;
}();
var WebsyDesigns = {
  WebsyPopupDialog: WebsyPopupDialog,
  PopupDialog: WebsyPopupDialog,
  WebsyLoadingDialog: WebsyLoadingDialog,
  LoadingDialog: WebsyLoadingDialog,
  WebsyNavigationMenu: WebsyNavigationMenu,
  NavigationMenu: WebsyNavigationMenu,
  WebsyForm: WebsyForm,
  Form: WebsyForm,
  MultiForm: MultiForm,
  WebsyDatePicker: WebsyDatePicker,
  DatePicker: WebsyDatePicker,
  WebsyDragDrop: WebsyDragDrop,
  DragDrop: WebsyDragDrop,
  WebsyDropdown: WebsyDropdown,
  Dropdown: WebsyDropdown,
  WebsyResultList: WebsyResultList,
  ResultList: WebsyResultList,
  WebsyTemplate: WebsyTemplate,
  Template: WebsyTemplate,
  WebsyPubSub: WebsyPubSub,
  PubSub: WebsyPubSub,
  WebsyRouter: WebsyRouter,
  Router: WebsyRouter,
  WebsyTable: WebsyTable,
  WebsyTable2: WebsyTable2,
  WebsyTable3: WebsyTable3,
  Table: WebsyTable,
  Table2: WebsyTable2,
  Table3: WebsyTable3,
  WebsyChart: WebsyChart,
  Chart: WebsyChart,
  WebsyChartTooltip: WebsyChartTooltip,
  ChartTooltip: WebsyChartTooltip,
  Legend: WebsyLegend,
  WebsyMap: WebsyMap,
  Map: WebsyMap,
  WebsyKPI: WebsyKPI,
  KPI: WebsyKPI,
  WebsyPDFButton: WebsyPDFButton,
  PDFButton: WebsyPDFButton,
  APIService: APIService,
  WebsyUtils: WebsyUtils,
  Utils: WebsyUtils,
  ButtonGroup: ButtonGroup,
  WebsySwitch: Switch,
  Pager: Pager,
  Switch: Switch,
  ResponsiveText: ResponsiveText,
  WebsyResponsiveText: ResponsiveText,
  QlikPlugin: _websyDesignsQlikPluginEs["default"],
  Icons: WebsyIcons,
  WebsyIcons: WebsyIcons
};
WebsyDesigns.service = new WebsyDesigns.APIService('');
window.GlobalPubSub = new WebsyPubSub('empty', {});
var _default = WebsyDesigns;
exports["default"] = _default;
