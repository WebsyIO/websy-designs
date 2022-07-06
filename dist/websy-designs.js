"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

/* global XMLHttpRequest fetch ENV */
var APIService = /*#__PURE__*/function () {
  function APIService() {
    var baseUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, APIService);

    this.baseUrl = baseUrl;
    this.options = _extends({}, options);
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
        query.push("id:".concat(id));
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
    key: "get",
    value: function get(entity, id, query) {
      var url = this.buildUrl(entity, id, query);
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
          'Content-Type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded',

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
          if (xhr.status === 401 || xhr.status === 403) {
            if (ENV && ENV.AUTH_REDIRECT) {
              window.location = ENV.AUTH_REDIRECT;
            } else {
              window.location = '/login';
            } // reject('401 - Unauthorized')


            return;
          }

          var response = xhr.responseType === 'text' ? xhr.responseText : xhr.response;

          if (response !== '' && response !== 'null') {
            try {
              response = JSON.parse(response);
            } catch (e) {// Either a bad Url or a string has been returned
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
      activeItem: 0
    };
    this.options = _extends({}, DEFAULTS, options);
    var el = document.getElementById(this.elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
      this.render();
    }
  }

  _createClass(ButtonGroup, [{
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('websy-button-group-item')) {
        var index = +event.target.getAttribute('data-index');

        if (this.options.activeItem !== index) {
          if (this.options.onDeactivate) {
            this.options.onDeactivate(this.options.items[this.options.activeItem], this.options.activeItem);
          }

          this.options.activeItem = index;

          if (this.options.onActivate) {
            this.options.onActivate(this.options.items[index], index);
          }

          this.render();
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
          return "\n        <div ".concat((t.attributes || []).join(' '), " data-id=\"").concat(t.id || t.label, "\" data-index=\"").concat(i, "\" class=\"websy-button-group-item ").concat((t.classes || []).join(' '), " ").concat(_this.options.style, "-style ").concat(i === _this.options.activeItem ? 'active' : '', "\">").concat(t.label, "</div>\n      ");
        }).join('');
      }
    }
  }]);

  return ButtonGroup;
}();
/* global */


var WebsyCarousel = /*#__PURE__*/function () {
  function WebsyCarousel(elementId, options) {
    _classCallCheck(this, WebsyCarousel);

    var DEFAULTS = {
      currentFrame: 0,
      frameDuration: 4000,
      showFrameSelector: true,
      showPrevNext: true
    };
    this.playTimeoutFn = null;
    this.options = _extends({}, DEFAULTS, options);

    if (!elementId) {
      console.log('No element Id provided');
    }

    var el = document.getElementById(elementId);

    if (el) {
      this.elementId = elementId;
      el.addEventListener('click', this.handleClick.bind(this));
      this.render();
    }
  }

  _createClass(WebsyCarousel, [{
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('websy-next-arrow')) {
        this.next();
      }

      if (event.target.classList.contains('websy-prev-arrow')) {
        this.prev();
      }

      if (event.target.classList.contains('websy-progress-btn' || 'websy-progress-btn-active')) {
        var index = +event.target.getAttribute('data-index');
        var prevFrameIndex = this.options.currentFrame;
        this.options.currentFrame = index;
        this.showFrame(prevFrameIndex, index);
      }
    }
  }, {
    key: "next",
    value: function next() {
      this.pause();
      var prevFrameIndex = this.options.currentFrame;

      if (this.options.currentFrame === this.options.frames.length - 1) {
        this.options.currentFrame = 0;
      } else {
        this.options.currentFrame++;
      }

      this.showFrame(prevFrameIndex, this.options.currentFrame);
      this.play(); // document.getElementById(`${this.elementId}_frame_${this.options.currentFrame}`)
      //   .style.transform = `translateX(-100%)`
      // if (`${this.options.currentFrame === this.options.frames.length - 1}`) {
      //   document.getElementById`${this.elementId}_frame_${this.options.currentFrame}`.style.transform = `translateX('-100%')`
      // }
    }
  }, {
    key: "pause",
    value: function pause() {
      if (this.playTimeoutFn) {
        clearTimeout(this.playTimeoutFn);
      }
    }
  }, {
    key: "play",
    value: function play() {
      var _this2 = this;

      this.playTimeoutFn = setTimeout(function () {
        var prevFrameIndex = _this2.options.currentFrame;

        if (_this2.options.currentFrame === _this2.options.frames.length - 1) {
          _this2.options.currentFrame = 0;
        } else {
          _this2.options.currentFrame++;
        }

        _this2.showFrame(prevFrameIndex, _this2.options.currentFrame);

        _this2.play();
      }, this.options.frameDuration);
    }
  }, {
    key: "prev",
    value: function prev() {
      this.pause();
      var prevFrameIndex = this.options.currentFrame;

      if (this.options.currentFrame === 0) {
        this.options.currentFrame = this.options.frames.length - 1;
      } else {
        this.options.currentFrame--;
      }

      this.showFrame(prevFrameIndex, this.options.currentFrame);
      this.play(); // document.getElementById(`${this.elementId}_frame_${this.options.currentFrame}`)
      //   .style.transform = `translateX(100%)`
    }
  }, {
    key: "render",
    value: function render(options) {
      this.options = _extends({}, this.options, options);
      this.resize();
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this3 = this;

      var el = document.getElementById(this.elementId);

      if (el) {
        var html = "\n      <div class=\"websy-carousel\">\n        ";
        this.options.frames.forEach(function (frame, frameIndex) {
          html += "\n        <div id=\"".concat(_this3.elementId, "_frame_").concat(frameIndex, "\" class=\"websy-frame-container animate\" style=\"transform: translateX(").concat(frameIndex === 0 ? '0' : '100%', ")\">\n        ");
          frame.images.forEach(function (image) {
            html += "\n          <div style=\"".concat(image.style || 'position: absolute; width: 100%; height: 100%; top: 0; left: 0;', " background-image: url('").concat(image.url, "')\" class=\"").concat(image.classes || '', " websy-carousel-image\">\n          </div>\n        ");
          });
          frame.text && frame.text.forEach(function (text) {
            html += "\n          <div style=\"".concat(text.style || 'position: absolute; width: 100%; height: 100%; top: 0; left: 0;', "\" class=\"").concat(text.classes || '', " websy-carousel-image\">\n          ").concat(text.html, "\n          </div>\n        ");
          });
          html += "</div>";
        });

        if (this.options.showFrameSelector === true) {
          html += "<div class=\"websy-btn-parent\">";
          this.options.frames.forEach(function (frame, frameIndex) {
            html += "\n          <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" data-index=\"".concat(frameIndex, "\" id=\"").concat(_this3.elementId, "_selector_").concat(frameIndex, "\" \n            class=\"websy-progress-btn ").concat(_this3.options.currentFrame === frameIndex ? 'websy-progress-btn-active' : '', "\">\n          <title>Ellipse</title><circle cx=\"256\" cy=\"256\" r=\"192\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"32\"/>\n          </svg>\n          ");
          });
          html += "</div>";
        }

        if (this.options.showPrevNext === true) {
          html += "\n      <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"websy-prev-arrow\"\n      viewBox=\"0 0 512 512\">\n      <title>Caret Back</title>\n      <path d=\"M321.94 98L158.82 237.78a24 24 0 000 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18z\"/>\n      </svg>\n      </div>\n      <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"websy-next-arrow\">\n      <title>Caret Forward</title>\n      <path d=\"M190.06 414l163.12-139.78a24 24 0 000-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z\"/>\n      </svg>\n      ";
        }

        html += "\n      </div>\n      ";
        el.innerHTML = html;
      }

      this.play(); // this.showFrameSelector()
    }
  }, {
    key: "showFrame",
    value: function showFrame(prevFrameIndex, currFrameIndex) {
      var prevTranslateX = prevFrameIndex > currFrameIndex ? '100%' : '-100%';
      var nextTranslateX = prevFrameIndex < currFrameIndex ? '100%' : '-100%';

      if (currFrameIndex === 0 && prevFrameIndex === this.options.frames.length - 1) {
        prevTranslateX = '-100%';
        nextTranslateX = '100%';
      } else if (prevFrameIndex === 0 && currFrameIndex === this.options.frames.length - 1) {
        prevTranslateX = '100%';
        nextTranslateX = '-100%';
      }

      var prevF = document.getElementById("".concat(this.elementId, "_frame_").concat(prevFrameIndex));
      setTimeout(function () {
        prevF.style.transform = "translateX(".concat(prevTranslateX, ")");
      }, 100);
      var btnInactive = document.getElementById("".concat(this.elementId, "_selector_").concat(prevFrameIndex));
      btnInactive.classList.remove('websy-progress-btn-active');
      var newF = document.getElementById("".concat(this.elementId, "_frame_").concat(currFrameIndex));
      newF.classList.remove('animate');
      newF.style.transform = "translateX(".concat(nextTranslateX, ")");
      setTimeout(function () {
        newF.classList.add('animate');
        newF.style.transform = 'translateX(0%)';
      }, 100);
      var btnActive = document.getElementById("".concat(this.elementId, "_selector_").concat(currFrameIndex));
      btnActive.classList.add('websy-progress-btn-active');
    } // showFrameSelector () {
    // }

  }]);

  return WebsyCarousel;
}();

var WebsyDatePicker = /*#__PURE__*/function () {
  function WebsyDatePicker(elementId, options) {
    _classCallCheck(this, WebsyDatePicker);

    this.oneDay = 1000 * 60 * 60 * 24;
    this.currentselection = [];
    this.validDates = [];
    this.validYears = [];
    this.customRangeSelected = true;
    this.shiftPressed = false;
    var DEFAULTS = {
      defaultRange: 0,
      minAllowedDate: this.floorDate(new Date(new Date(new Date().setFullYear(new Date().getFullYear() - 1)).setDate(1))),
      maxAllowedDate: this.floorDate(new Date(new Date())),
      minAllowedYear: 1970,
      maxAllowedYear: new Date().getFullYear(),
      daysOfWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
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
      var html = "\n        <div class='websy-date-picker-container'>\n          <span class='websy-dropdown-header-label'>".concat(this.options.label || 'Date', "</span>\n          <div class='websy-date-picker-header'>\n            <span id='").concat(this.elementId, "_selectedRange'>").concat(this.options.ranges[this.options.mode][this.selectedRange].label, "</span>\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z\"/></svg>\n          </div>\n          <div id='").concat(this.elementId, "_mask' class='websy-date-picker-mask'></div>\n          <div id='").concat(this.elementId, "_content' class='websy-date-picker-content'>\n            <div class='websy-date-picker-ranges'>\n              <ul id='").concat(this.elementId, "_rangelist'>\n                ").concat(this.renderRanges(), "\n              </ul>\n            </div><!--\n            --><div id='").concat(this.elementId, "_datelist' class='websy-date-picker-custom'>").concat(this.renderDates(), "</div>\n            <div class='websy-dp-button-container'>\n              <span class=\"dp-footnote\">Click and drag or hold Shift and click to select a range of values</span>\n              <button class='").concat(this.options.cancelBtnClasses || '', " websy-btn websy-dp-cancel'>\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" viewBox=\"0 0 512 512\"><line x1=\"368\" y1=\"368\" x2=\"144\" y2=\"144\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/><line x1=\"368\" y1=\"144\" x2=\"144\" y2=\"368\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/></svg>\n              </button>\n              <button class='").concat(this.options.confirmBtnClasses || '', " websy-btn websy-dp-confirm'>\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" viewBox=\"0 0 512 512\"><polyline points=\"416 128 192 384 96 288\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/></svg>\n              </button>\n            </div>\n          </div>          \n        </div>\n      ");
      el.innerHTML = html;
      this.render();
    } else {
      console.log('No element found with Id', elementId);
    }
  }

  _createClass(WebsyDatePicker, [{
    key: "close",
    value: function close(confirm) {
      var maskEl = document.getElementById("".concat(this.elementId, "_mask"));
      var contentEl = document.getElementById("".concat(this.elementId, "_content"));
      maskEl.classList.remove('active');
      contentEl.classList.remove('active');

      if (confirm === true) {
        if (this.options.onChange) {
          if (this.customRangeSelected === true) {
            this.options.onChange(this.selectedRangeDates, true);
          } else {
            this.options.onChange(this.currentselection, false);
          }
        }

        this.updateRange();
      } else {
        this.selectedRangeDates = _toConsumableArray(this.priorSelectedDates);
        this.selectedRange = this.priorSelectedRange;
        this.customRangeSelected = this.priorCustomRangeSelected;
        this.currentselection = _toConsumableArray(this.priorselection);
        this.highlightRange();
      }
    }
  }, {
    key: "floorDate",
    value: function floorDate(d) {
      if (typeof d === 'number') {
        d = new Date(d);
      }

      return new Date(d.setHours(0, 0, 0, 0));
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
      } else if (event.target.classList.contains('websy-dp-date')) {// if (event.target.classList.contains('websy-disabled-date')) {
        //   return
        // }
        // const timestamp = event.target.id.split('_')[0]
        // this.selectDate(+timestamp)
      } else if (event.target.classList.contains('websy-dp-confirm')) {
        this.close(true);
      } else if (event.target.classList.contains('websy-dp-cancel')) {
        this.close();
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      console.log('key down', event);

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
        this.selectDate(+event.target.id.split('_')[0]);
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

          this.mouseDownId = +event.target.id.split('_')[0];
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

          if (event.target.id.split('_')[0] !== this.mouseDownId) {
            this.dragging = true;
            this.selectDate(+event.target.id.split('_')[0]);
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
      var _this4 = this;

      var el = document.getElementById("".concat(this.elementId, "_dateList"));
      var dateEls = el.querySelectorAll('.websy-dp-date');

      for (var i = 0; i < dateEls.length; i++) {
        dateEls[i].classList.remove('selected');
        dateEls[i].classList.remove('first');
        dateEls[i].classList.remove('last');
      }

      if (this.selectedRange === 0) {
        return;
      }

      if (this.customRangeSelected === true) {
        var diff;

        if (this.options.mode === 'date') {
          diff = Math.floor((this.selectedRangeDates[this.selectedRangeDates.length - 1].getTime() - this.selectedRangeDates[0].getTime()) / this.oneDay);

          if (this.selectedRangeDates[0].getMonth() !== this.selectedRangeDates[this.selectedRangeDates.length - 1].getMonth()) {
            diff += 1;
          }
        } else if (this.options.mode === 'year') {
          diff = this.selectedRangeDates[this.selectedRangeDates.length - 1] - this.selectedRangeDates[0];

          if (this.selectedRangeDates[this.selectedRangeDates.length - 1] !== this.selectedRangeDates[0]) {// diff += 1
          }
        }

        for (var _i = 0; _i < diff + 1; _i++) {
          var d = void 0;
          var rangeStart = void 0;
          var rangeEnd = void 0;

          if (this.options.mode === 'date') {
            d = this.floorDate(new Date(this.selectedRangeDates[0].getTime() + _i * this.oneDay));
            d = d.getTime();
            rangeStart = this.selectedRangeDates[0].getTime();
            rangeEnd = this.selectedRangeDates[this.selectedRangeDates.length - 1].getTime();
          } else if (this.options.mode === 'year') {
            d = this.selectedRangeDates[0] + _i;
            rangeStart = this.selectedRangeDates[0];
            rangeEnd = this.selectedRangeDates[this.selectedRangeDates.length - 1];
          }

          var dateEl = void 0;

          if (this.options.mode === 'date') {
            dateEl = document.getElementById("".concat(d, "_date"));
          } else if (this.options.mode === 'year') {
            dateEl = document.getElementById("".concat(d, "_year"));
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
        this.currentselection.forEach(function (d) {
          var dateEl;

          if (_this4.options.mode === 'date') {
            dateEl = document.getElementById("".concat(d, "_date"));
          } else if (_this4.options.mode === 'year') {
            dateEl = document.getElementById("".concat(d, "_year"));
          }

          dateEl.classList.add('selected');
          dateEl.classList.add('first');
          dateEl.classList.add('last');
        });
      }
    }
  }, {
    key: "open",
    value: function open(options) {
      var override = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var maskEl = document.getElementById("".concat(this.elementId, "_mask"));
      var contentEl = document.getElementById("".concat(this.elementId, "_content"));
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
      var _this5 = this;

      var disabled = [];
      this.validDates = [];
      this.validYears = [];

      if (disabledDates) {
        disabled = disabledDates.map(function (d) {
          if (_this5.options.mode === 'date') {
            return d.getTime();
          } else if (_this5.options.mode === 'year') {
            return d;
          }

          return d.getTime();
        });
      } // first disabled all of the ranges


      this.options.ranges[this.options.mode].forEach(function (r) {
        return r.disabled = true;
      });
      var diff;

      if (this.options.mode === 'date') {
        diff = Math.ceil((this.options.maxAllowedDate.getTime() - this.options.minAllowedDate.getTime()) / this.oneDay) + 1;
      } else if (this.options.mode === 'year') {
        diff = this.options.maxAllowedYear - this.options.minAllowedYear + 1;
      }

      var months = {};
      var yearList = [];

      for (var i = 0; i < diff; i++) {
        if (this.options.mode === 'date') {
          var d = this.floorDate(new Date(this.options.minAllowedDate.getTime() + i * this.oneDay));
          var monthYear = "".concat(this.options.monthMap[d.getMonth()], " ").concat(d.getFullYear());

          if (!months[monthYear]) {
            months[monthYear] = [];
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
        }
      } // check each range to see if it can be enabled


      for (var _i2 = 0; _i2 < this.options.ranges[this.options.mode].length; _i2++) {
        var r = this.options.ranges[this.options.mode][_i2];

        if (this.options.mode === 'date') {
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

            for (var _i5 = 0; _i5 < months[key][0].dayOfWeek; _i5++) {
              paddedDays.push("<li>&nbsp;</li>");
            }

            html += paddedDays.join('');
          }

          html += months[key].map(function (d) {
            return "<li id='".concat(d.id, "_date' class='websy-dp-date ").concat(d.disabled === true ? 'websy-disabled-date' : '', "'>").concat(d.dayOfMonth, "</li>");
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
          return "<li id='".concat(d.id, "_year' class='websy-dp-date websy-dp-year ").concat(d.disabled === true ? 'websy-disabled-date' : '', "'>").concat(d.year, "</li>");
        }).join('');
        html += "</ul></div>";
      }

      return html;
    }
  }, {
    key: "renderRanges",
    value: function renderRanges() {
      var _this6 = this;

      return this.options.ranges[this.options.mode].map(function (r, i) {
        return "\n      <li data-index='".concat(i, "' class='websy-date-picker-range ").concat(i === _this6.selectedRange ? 'active' : '', " ").concat(r.disabled === true ? 'websy-disabled-range' : '', "'>").concat(r.label, "</li>\n    ");
      }).join('') + "<li data-index='-1' class='websy-date-picker-range ".concat(this.selectedRange === -1 ? 'active' : '', "'>Custom</li>");
    }
  }, {
    key: "scrollRangeIntoView",
    value: function scrollRangeIntoView() {
      if (this.selectedRangeDates[0]) {
        var el;

        if (this.options.mode === 'date') {
          el = document.getElementById("".concat(this.selectedRangeDates[0].getTime(), "_date"));
        } else if (this.options.mode === 'year') {
          if (this.options.sortDirection === 'desc') {
            el = document.getElementById("".concat(this.selectedRangeDates[this.selectedRangeDates.length - 1], "_year"));
          } else {
            el = document.getElementById("".concat(this.selectedRangeDates[0], "_year"));
          }
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
          this.currentselection.push(timestamp);
          this.currentselection.sort(function (a, b) {
            return a - b;
          });
          this.customRangeSelected = false;
        }
      }

      if (this.options.mode === 'date') {
        this.selectedRangeDates = [new Date(this.currentselection[0]), new Date(this.currentselection[1] || this.currentselection[0])];
      } else if (this.options.mode === 'year') {
        this.selectedRangeDates = [this.currentselection[0], this.currentselection[1] || this.currentselection[0]];
      } // if (this.currentselection.length === 2) {
      //   this.currentselection = [] 
      // }    


      this.selectedRange = -1;
      this.highlightRange();
    }
  }, {
    key: "selectRange",
    value: function selectRange(index) {
      if (this.options.ranges[this.options.mode][index]) {
        this.selectedRangeDates = _toConsumableArray(this.options.ranges[this.options.mode][index].range);
        this.currentselection = _toConsumableArray(this.options.ranges[this.options.mode][index].range);
        this.selectedRange = +index;
        this.highlightRange();
        this.close(true);
      }
    }
  }, {
    key: "selectCustomRange",
    value: function selectCustomRange(range) {
      this.selectedRange = -1;
      this.selectedRangeDates = range; // check if the custom range matches a configured range

      for (var i = 0; i < this.options.ranges[this.options.mode].length; i++) {
        if (this.options.ranges[this.options.mode][i].range.length === 1) {
          if (this.options.ranges[this.options.mode][i].range[0] === range[0]) {
            this.selectedRange = i;
            break;
          }
        } else if (this.options.ranges[this.options.mode][i].range.length === 2) {
          if (this.options.ranges[this.options.mode][i].range[0] === range[0] && this.options.ranges[this.options.mode][i].range[1] === range[1]) {
            this.selectedRange = i;
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
      if (['All Dates', 'All Years'].indexOf(this.options.ranges[this.options.mode][0].label) !== -1) {
        this.options.ranges[this.options.mode][0].range = [range[0], range[1] || range[0]];
      }

      if (this.options.mode === 'date') {
        this.options.minAllowedDate = range[0];
        this.options.maxAllowedDate = range[1] || range[0];
      } else if (this.options.mode === 'year') {
        this.options.minAllowedYear = range[0];
        this.options.maxAllowedYear = range[1] || range[0];
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
          }
        });
        var start = list[0];
        var end = '';

        if (this.customRangeSelected === true) {
          end = " - ".concat(list[list.length - 1]);
        } else {
          start = "".concat(list.length, " selected");
        }

        range = {
          label: "".concat(start).concat(end)
        };
      } else {
        range = this.options.ranges[this.options.mode][this.selectedRange];
      }

      var el = document.getElementById(this.elementId);
      var labelEl = document.getElementById("".concat(this.elementId, "_selectedRange"));
      var rangeEls = el.querySelectorAll(".websy-date-picker-range");

      for (var i = 0; i < rangeEls.length; i++) {
        rangeEls[i].classList.remove('active');

        if (i === this.selectedRange) {
          rangeEls[i].classList.add('active');
        }
      }

      if (labelEl) {
        labelEl.innerHTML = range.label;
      }
    }
  }]);

  return WebsyDatePicker;
}();

Date.prototype.floor = function () {
  return new Date("".concat(this.getMonth() + 1, "/").concat(this.getDate(), "/").concat(this.getFullYear()));
};
/* global WebsyUtils */


var WebsyDropdown = /*#__PURE__*/function () {
  function WebsyDropdown(elementId, options) {
    var _this8 = this;

    _classCallCheck(this, WebsyDropdown);

    var DEFAULTS = {
      multiSelect: false,
      multiValueDelimiter: ',',
      allowClear: true,
      style: 'plain',
      items: [],
      label: '',
      disabled: false,
      minSearchCharacters: 2,
      showCompleteSelectedList: false,
      closeAfterSelection: true
    };
    this.options = _extends({}, DEFAULTS, options);
    this.tooltipTimeoutFn = null;
    this._originalData = [];
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
        return _this8.options.items[s].label || _this8.options.items[s].value;
      }).join(this.options.multiValueDelimiter);
      var headerValue = this.selectedItems.map(function (s) {
        return _this8.options.items[s].value || _this8.options.items[s].label;
      }).join(this.options.multiValueDelimiter);
      var html = "\n        <div id='".concat(this.elementId, "_container' class='websy-dropdown-container ").concat(this.options.disabled ? 'disabled' : '', " ").concat(this.options.disableSearch !== true ? 'with-search' : '', " ").concat(this.options.style, "'>\n          <div id='").concat(this.elementId, "_header' class='websy-dropdown-header ").concat(this.selectedItems.length === 1 ? 'one-selected' : '', " ").concat(this.options.allowClear === true ? 'allow-clear' : '', "'>\n            <svg class='search' width=\"20\" height=\"20\" viewBox=\"0 0 512 512\"><path d=\"M221.09,64A157.09,157.09,0,1,0,378.18,221.09,157.1,157.1,0,0,0,221.09,64Z\" style=\"fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px\"/><line x1=\"338.29\" y1=\"338.29\" x2=\"448\" y2=\"448\" style=\"fill:none;stroke:#000;stroke-linecap:round;stroke-miterlimit:10;stroke-width:32px\"/></svg>\n            <span id='").concat(this.elementId, "_headerLabel' class='websy-dropdown-header-label'>").concat(this.options.label, "</span>\n            <span data-info='").concat(headerLabel, "' class='websy-dropdown-header-value' id='").concat(this.elementId, "_selectedItems'>").concat(headerLabel, "</span>\n            <input class='dropdown-input' id='").concat(this.elementId, "_input' name='").concat(this.options.field || this.options.label, "' value='").concat(headerValue, "'>\n            <svg class='arrow' xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z\"/></svg>            \n      ");

      if (this.options.allowClear === true) {
        html += "\n          <svg class='clear' xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><title>ionicons-v5-l</title><line x1=\"368\" y1=\"368\" x2=\"144\" y2=\"144\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/><line x1=\"368\" y1=\"144\" x2=\"144\" y2=\"368\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/></svg>\n        ";
      }

      html += "          \n          </div>\n          <div id='".concat(this.elementId, "_mask' class='websy-dropdown-mask'></div>\n          <div id='").concat(this.elementId, "_content' class='websy-dropdown-content'>\n      ");

      if (this.options.disableSearch !== true) {
        html += "\n          <input id='".concat(this.elementId, "_search' class='websy-dropdown-search' placeholder='").concat(this.options.searchPlaceholder || 'Search', "'>\n        ");
      }

      html += "\n            <div id='".concat(this.elementId, "_itemsContainer' class='websy-dropdown-items'>\n              <ul id='").concat(this.elementId, "_items'>              \n              </ul>\n            </div><!--\n            --><div class='websy-dropdown-custom'></div>\n          </div>\n        </div>\n      ");
      el.innerHTML = html;
      var scrollEl = document.getElementById("".concat(this.elementId, "_itemsContainer"));
      scrollEl.addEventListener('scroll', this.handleScroll.bind(this));
      this.render();
    } else {
      console.log('No element found with Id', elementId);
    }
  }

  _createClass(WebsyDropdown, [{
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
      var maskEl = document.getElementById("".concat(this.elementId, "_mask"));
      var contentEl = document.getElementById("".concat(this.elementId, "_content"));
      maskEl.classList.remove('active');
      contentEl.classList.remove('active');
      contentEl.classList.remove('on-top');
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
    key: "handleClick",
    value: function handleClick(event) {
      if (this.options.disabled === true) {
        return;
      }

      if (event.target.classList.contains('websy-dropdown-header')) {
        this.open();
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
      }
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event) {
      if (event.target.classList.contains('websy-dropdown-search')) {
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
    value: function open(options) {
      var override = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var maskEl = document.getElementById("".concat(this.elementId, "_mask"));
      var contentEl = document.getElementById("".concat(this.elementId, "_content"));
      maskEl.classList.add('active');
      contentEl.classList.add('active');

      if (WebsyUtils.getElementPos(contentEl).bottom > window.innerHeight) {
        contentEl.classList.add('on-top');
      }

      if (this.options.disableSearch !== true) {
        var searchEl = document.getElementById("".concat(this.elementId, "_search"));

        if (searchEl) {
          searchEl.focus();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.elementId) {
        console.log('No element Id provided for Websy Dropdown');
        return;
      } // const el = document.getElementById(this.elementId)
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
      var _this9 = this;

      var html = this.options.items.map(function (r, i) {
        return "\n      <li data-index='".concat(i, "' class='websy-dropdown-item ").concat((r.classes || []).join(' '), " ").concat(_this9.selectedItems.indexOf(i) !== -1 ? 'active' : '', "'>").concat(r.label, "</li>\n    ");
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
    key: "updateHeader",
    value: function updateHeader(item) {
      var _this10 = this;

      var el = document.getElementById(this.elementId);
      var headerEl = document.getElementById("".concat(this.elementId, "_header"));
      var headerLabelEl = document.getElementById("".concat(this.elementId, "_headerLabel"));
      var labelEl = document.getElementById("".concat(this.elementId, "_selectedItems"));
      var inputEl = document.getElementById("".concat(this.elementId, "_input"));
      var itemEls = el.querySelectorAll(".websy-dropdown-item");

      for (var i = 0; i < itemEls.length; i++) {
        itemEls[i].classList.remove('active');

        if (this.selectedItems.indexOf(i) !== -1) {
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
          }
        } else if (this.selectedItems.length > 1) {
          if (this.options.showCompleteSelectedList === true) {
            var selectedLabels = this.selectedItems.map(function (s) {
              return _this10.options.items[s].label || _this10.options.items[s].value;
            }).join(this.options.multiValueDelimiter);
            var selectedValues = this.selectedItems.map(function (s) {
              return _this10.options.items[s].value || _this10.options.items[s].label;
            }).join(this.options.multiValueDelimiter);
            labelEl.innerHTML = selectedLabels;
            labelEl.setAttribute('data-info', selectedLabels);
            inputEl.value = selectedValues;
          } else {
            var _selectedValues = this.selectedItems.map(function (s) {
              return _this10.options.items[s].value || _this10.options.items[s].label;
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
      if (typeof index !== 'undefined' && index !== null) {
        var pos = this.selectedItems.indexOf(index);

        if (pos !== -1) {
          this.selectedItems.splice(pos, 1);
        }

        if (this.options.multiSelect === false) {
          this.selectedItems = [index];
        } else {
          this.selectedItems.push(index);
        }
      }

      var item = this.options.items[index];
      this.updateHeader(item);

      if (item && this.options.onItemSelected) {
        this.options.onItemSelected(item, this.selectedItems, this.options.items);
      }

      if (this.options.closeAfterSelection === true) {
        this.close();
      }
    }
  }, {
    key: "selections",
    set: function set(d) {
      this.selectedItems = d || [];
    }
  }, {
    key: "data",
    set: function set(d) {
      this.options.items = d || [];
      var el = document.getElementById("".concat(this.elementId, "_items"));

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
    },
    get: function get() {
      return this.options.items;
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
        classes: ''
      },
      clearAfterSave: false,
      fields: [],
      onSuccess: function onSuccess(data) {},
      onError: function onError(err) {
        console.log('Error submitting form data:', err);
      }
    };
    GlobalPubSub.subscribe('recaptchaready', this.recaptchaReady.bind(this));
    this.recaptchaResult = null;
    this.options = _extends(defaults, {}, {// defaults go here
    }, options);

    if (!elementId) {
      console.log('No element Id provided');
      return;
    }

    this.apiService = new WebsyDesigns.APIService('');
    this.elementId = elementId;
    var el = document.getElementById(elementId);

    if (el) {
      // if (this.options.classes) {
      //   this.options.classes.forEach(c => el.classList.add(c))
      // }
      el.addEventListener('click', this.handleClick.bind(this));
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
    }
  }, {
    key: "checkRecaptcha",
    value: function checkRecaptcha() {
      var _this11 = this;

      return new Promise(function (resolve, reject) {
        if (_this11.options.useRecaptcha === true) {
          if (_this11.recaptchaValue) {
            _this11.apiService.add('/google/checkrecaptcha', JSON.stringify({
              grecaptcharesponse: _this11.recaptchaValue
            })).then(function (response) {
              if (response.success && response.success === true) {
                resolve(true);
              } else {
                reject(false);
              }
            });
          } else {
            reject(false);
          }
        } else {
          resolve(true);
        }
      });
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
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('submit')) {
        event.preventDefault();
        this.submitForm();
      } else if (event.target.classList.contains('cancel')) {
        event.preventDefault();
        this.cancelForm();
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(event) {
      if (event.key === 'enter') {
        this.submitForm();
      }
    }
  }, {
    key: "handleKeyUp",
    value: function handleKeyUp(event) {}
  }, {
    key: "processComponents",
    value: function processComponents(components, callbackFn) {
      var _this12 = this;

      if (components.length === 0) {
        callbackFn();
      } else {
        components.forEach(function (c) {
          if (typeof WebsyDesigns[c.component] !== 'undefined') {
            c.instance = new WebsyDesigns[c.component]("".concat(_this12.elementId, "_input_").concat(c.field, "_component"), c.options);
          } else {// some user feedback here
          }
        });
      }
    }
  }, {
    key: "recaptchaReady",
    value: function recaptchaReady() {
      var el = document.getElementById("".concat(this.elementId, "_recaptcha"));

      if (el) {
        grecaptcha.render("".concat(this.elementId, "_recaptcha"), {
          sitekey: ENVIRONMENT.RECAPTCHA_KEY,
          callback: this.validateRecaptcha.bind(this)
        });
      }
    }
  }, {
    key: "render",
    value: function render(update, data) {
      var _this13 = this;

      var el = document.getElementById(this.elementId);
      var componentsToProcess = [];

      if (el) {
        var html = "\n        <form id=\"".concat(this.elementId, "Form\" class=\"").concat(this.options.classes || '', "\">\n      ");
        this.options.fields.forEach(function (f, i) {
          if (f.component) {
            componentsToProcess.push(f);
            html += "\n            ".concat(i > 0 ? '-->' : '', "<div class='").concat(f.classes || '', "'>\n              ").concat(f.label ? "<label for=\"".concat(f.field, "\">").concat(f.label, "</label>") : '', "\n              <div id='").concat(_this13.elementId, "_input_").concat(f.field, "_component' class='form-component'></div>\n            </div><!--\n          ");
          } else if (f.type === 'longtext') {
            html += "\n            ".concat(i > 0 ? '-->' : '', "<div class='").concat(f.classes || '', "'>\n              ").concat(f.label ? "<label for=\"".concat(f.field, "\">").concat(f.label, "</label>") : '', "\n              <textarea\n                id=\"").concat(_this13.elementId, "_input_").concat(f.field, "\"\n                ").concat(f.required === true ? 'required' : '', " \n                placeholder=\"").concat(f.placeholder || '', "\"\n                name=\"").concat(f.field, "\" \n                class=\"websy-input websy-textarea\"\n              ></textarea>\n            </div><!--\n          ");
          } else {
            html += "\n            ".concat(i > 0 ? '-->' : '', "<div class='").concat(f.classes || '', "'>\n              ").concat(f.label ? "<label for=\"".concat(f.field, "\">").concat(f.label, "</label>") : '', "\n              <input \n                id=\"").concat(_this13.elementId, "_input_").concat(f.field, "\"\n                ").concat(f.required === true ? 'required' : '', " \n                type=\"").concat(f.type || 'text', "\" \n                class=\"websy-input\" \n                name=\"").concat(f.field, "\" \n                placeholder=\"").concat(f.placeholder || '', "\"\n                value=\"").concat(f.value || '', "\"\n                valueAsDate=\"").concat(f.type === 'date' ? f.value : '', "\"\n                oninvalidx=\"this.setCustomValidity('").concat(f.invalidMessage || 'Please fill in this field.', "')\"\n              />\n            </div><!--\n          ");
          }
        });
        html += "\n        --><button class=\"websy-btn submit ".concat(this.options.submit.classes || '', "\">").concat(this.options.submit.text || 'Save', "</button>").concat(this.options.cancel ? '<!--' : '', "\n      ");

        if (this.options.cancel) {
          html += "\n          --><button class=\"websy-btn cancel ".concat(this.options.cancel.classes || '', "\">").concat(this.options.cancel.text || 'Cancel', "</button>\n        ");
        }

        html += "          \n        </form>\n        <div id=\"".concat(this.elementId, "_validationFail\" class=\"websy-validation-failure\"></div>\n      ");

        if (this.options.useRecaptcha === true) {
          html += "\n          <div id='".concat(this.elementId, "_recaptcha'></div>\n        ");
        }

        el.innerHTML = html;
        this.processComponents(componentsToProcess, function () {
          if (_this13.options.useRecaptcha === true && typeof grecaptcha !== 'undefined') {
            _this13.recaptchaReady();
          }
        });
      }
    }
  }, {
    key: "submitForm",
    value: function submitForm() {
      var _this14 = this;

      var formEl = document.getElementById("".concat(this.elementId, "Form"));

      if (formEl.reportValidity() === true) {
        this.checkRecaptcha().then(function (result) {
          if (result === true) {
            var formData = new FormData(formEl);
            var data = {};
            var temp = new FormData(formEl);
            temp.forEach(function (value, key) {
              data[key] = value;
            });

            if (_this14.options.url) {
              _this14.apiService.add(_this14.options.url, data).then(function (result) {
                if (_this14.options.clearAfterSave === true) {
                  // this.render()
                  formEl.reset();
                }

                _this14.options.onSuccess.call(_this14, result);
              }, function (err) {
                console.log('Error submitting form data:', err);

                _this14.options.onError.call(_this14, err);
              });
            } else if (_this14.options.submitFn) {
              _this14.options.submitFn(data, function () {
                if (_this14.options.clearAfterSave === true) {
                  // this.render()
                  formEl.reset();
                }
              });
            }
          } else {
            console.log('bad recaptcha');
          }
        });
      }
    }
  }, {
    key: "validateRecaptcha",
    value: function validateRecaptcha(token) {
      this.recaptchaValue = token;
    }
  }, {
    key: "data",
    set: function set(d) {
      var _this15 = this;

      if (!this.options.fields) {
        this.options.fields = [];
      }

      var _loop = function _loop(key) {
        _this15.options.fields.forEach(function (f) {
          if (f.field === key) {
            f.value = d[key];
            var el = document.getElementById("".concat(_this15.elementId, "_input_").concat(f.field));
            el.value = f.value;
          }
        });
      };

      for (var key in d) {
        _loop(key);
      }

      this.render();
    }
  }]);

  return WebsyForm;
}();

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
      el.classList.remove('loading');
      el.innerHTML = '';
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.elementId) {
        console.log('No element Id provided for Websy Loading Dialog');
        return;
      }

      var el = document.getElementById(this.elementId);
      var html = "\n\t\t\t<div class='websy-loading-container ".concat((this.options.classes || []).join(' '), "'>\n\t\t\t\t<div class='websy-ripple'>\n\t\t\t\t\t<div></div>\n\t\t\t\t\t<div></div>\n\t\t\t\t</div>\n\t\t\t\t<h4>").concat(this.options.title || 'Loading...', "</h4>\n\t\t");

      if (this.options.messages) {
        for (var i = 0; i < this.options.messages.length; i++) {
          html += "<p>".concat(this.options.messages[i], "</p>");
        }
      }

      html += "\n\t\t\t</div>\t\n    ";
      el.classList.add('loading');
      el.innerHTML = html;
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
/* global */


var WebsyNavigationMenu = /*#__PURE__*/function () {
  function WebsyNavigationMenu(elementId, options) {
    _classCallCheck(this, WebsyNavigationMenu);

    this.options = _extends({}, {
      collapsible: false,
      orientation: 'horizontal',
      parentMap: {},
      childIndentation: 10,
      activeSymbol: 'none'
    }, options);

    if (!elementId) {
      console.log('No element Id provided for Websy Menu');
      return;
    }

    var el = document.getElementById(elementId);

    if (el) {
      this.elementId = elementId;
      this.lowestLevel = 0;
      this.flatItems = [];
      this.itemMap = {};
      this.flattenItems(0, this.options.items);
      console.log(this.flatItems);
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
    key: "flattenItems",
    value: function flattenItems(index, items) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (items[index]) {
        this.lowestLevel = Math.max(level, this.lowestLevel);
        items[index].id = items[index].id || "".concat(this.elementId, "_").concat(this.normaliseString(items[index].text));
        this.itemMap[items[index].id] = items[index];
        items[index].level = level;
        this.flatItems.push(items[index]);

        if (items[index].items) {
          this.flattenItems(0, items[index].items, level + 1);
        }

        this.flattenItems(++index, items, level);
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('websy-menu-icon') || event.target.nodeName === 'svg' || event.target.nodeName === 'rect') {
        this.toggleMobileMenu();
      }

      if (event.target.classList.contains('websy-menu-header')) {
        var item = this.itemMap[event.target.id];

        if (event.target.classList.contains('trigger-item') && item.level === this.lowestLevel) {
          this.toggleMobileMenu('remove');
        }

        if (item.items) {
          event.target.classList.toggle('menu-open');
          this.toggleMenu(item.id);
        }
      }

      if (event.target.classList.contains('websy-menu-mask')) {
        this.toggleMobileMenu();
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
          html += "\n          <div id='".concat(this.elementId, "_menuIcon' class='websy-menu-icon'>\n            <svg viewbox=\"0 0 40 40\" width=\"30\" height=\"40\">              \n              <rect x=\"0\" y=\"0\" width=\"30\" height=\"4\" rx=\"2\"></rect>\n              <rect x=\"0\" y=\"12\" width=\"30\" height=\"4\" rx=\"2\"></rect>\n              <rect x=\"0\" y=\"24\" width=\"30\" height=\"4\" rx=\"2\"></rect>\n            </svg>\n          </div>\n        ");
        }

        if (this.options.logo) {
          if (Array.isArray(this.options.logo.classes)) {
            this.options.logo.classes = this.options.logo.classes.join(' ');
          }

          html += "          \n          <div \n            class='logo ".concat(this.options.logo.classes || '', "'\n            ").concat(this.options.logo.attributes && this.options.logo.attributes.join(' '), "\n          >\n          <img src='").concat(this.options.logo.url, "'></img>\n          </div>\n          <div id='").concat(this.elementId, "_mask' class='websy-menu-mask'></div>\n          <div id=\"").concat(this.elementId, "_menuContainer\" class=\"websy-menu-block-container\">\n        ");
        }

        html += this.renderBlock(this.options.items, 'main', 0);
        html += "</div>";
        el.innerHTML = html;
      }
    }
  }, {
    key: "renderBlock",
    value: function renderBlock(items, block) {
      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var html = "\n\t\t  <ul class='websy-".concat(this.options.orientation, "-list ").concat(level > 0 ? 'websy-child-list' : '', " ").concat(block !== 'main' ? 'websy-menu-collapsed' : '', "' id='").concat(this.elementId, "_").concat(block, "_list'\n\t  ");

      if (block !== 'main') {
        html += " data-collapsed='".concat(block !== 'main' ? 'true' : 'false', "'");
      }

      html += '>';

      for (var i = 0; i < items.length; i++) {
        // update the block to the current item		
        var selected = ''; // items[i].default === true ? 'selected' : ''

        var active = items[i]["default"] === true ? 'active' : '';
        var currentBlock = this.normaliseString(items[i].text);
        var blockId = items[i].id; //  || 	`${this.elementId}_${currentBlock}_label`

        if (Array.isArray(items[i].classes)) {
          items[i].classes = items[i].classes.join(' ');
        }

        html += "\n\t\t\t<li class='websy-".concat(this.options.orientation, "-list-item'>\n\t\t\t\t<div class='websy-menu-header ").concat(items[i].classes || '', " ").concat(selected, " ").concat(active, "' \n\t\t\t\t\t\t id='").concat(blockId, "' \n\t\t\t\t\t\t data-id='").concat(currentBlock, "'\n             data-menu-id='").concat(this.elementId, "_").concat(currentBlock, "_list'\n\t\t\t\t\t\t data-popout-id='").concat(level > 1 ? block : currentBlock, "'\n\t\t\t\t\t\t data-text='").concat(items[i].text, "'\n\t\t\t\t\t\t style='padding-left: ").concat(level * this.options.childIndentation, "px'\n\t\t\t\t\t\t ").concat(items[i].attributes && items[i].attributes.join(' ') || '', "\n        >\n      ");

        if (this.options.orientation === 'horizontal') {
          html += items[i].text;
        }

        if (this.options.activeSymbol === 'line') {
          html += "\n          <span class='selected-bar'></span>\n        ";
        }

        if (this.options.activeSymbol === 'triangle') {
          html += "\n          <span class='active-square'></span>\n        ";
        }

        html += "          \n          <span class='".concat(items[i].items && items[i].items.length > 0 ? 'menu-carat' : '', "'></span>\n      ");

        if (this.options.orientation === 'vertical') {
          html += "\n          &nbsp;\n        ";
        }

        html += "    \n\t\t\t\t</div>\n\t\t  ";

        if (items[i].items) {
          html += this.renderBlock(items[i].items, currentBlock, items[i].level + 1);
        } // map the item to it's parent


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
    var _this16 = this;

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
            if (_this16.options.onChangePageSize) {
              _this16.options.onChangePageSize(selectedItem.value);
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
      var _this17 = this;

      var el = document.getElementById("".concat(this.elementId, "_pageList"));

      if (el) {
        var pages = this.options.pages.map(function (item, index) {
          return "<li data-index=\"".concat(index, "\" class=\"websy-page-num ").concat(_this17.options.activePage === index ? 'active' : '', "\">").concat(index + 1, "</li>");
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
      directDownload: false
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
        this.popup = new WebsyDesigns.WebsyPopupDialog("".concat(this.elementId, "_popup")); // const formEl = document.getElementById(`${this.elementId}_form`)
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
      var _this18 = this;

      if (event.target.classList.contains('websy-pdf-button')) {
        this.loader.show();
        setTimeout(function () {
          if (_this18.options.targetId) {
            var el = document.getElementById(_this18.options.targetId);

            if (el) {
              var pdfData = {
                options: {}
              };

              if (_this18.options.pdfOptions) {
                pdfData.options = _extends({}, _this18.options.pdfOptions);
              }

              if (_this18.options.header) {
                if (_this18.options.header.elementId) {
                  var headerEl = document.getElementById(_this18.options.header.elementId);

                  if (headerEl) {
                    pdfData.header = headerEl.outerHTML;

                    if (_this18.options.header.css) {
                      pdfData.options.headerCSS = _this18.options.header.css;
                    }
                  }
                } else if (_this18.options.header.html) {
                  pdfData.header = _this18.options.header.html;

                  if (_this18.options.header.css) {
                    pdfData.options.headerCSS = _this18.options.header.css;
                  }
                } else {
                  pdfData.header = _this18.options.header;
                }
              }

              if (_this18.options.footer) {
                if (_this18.options.footer.elementId) {
                  var footerEl = document.getElementById(_this18.options.footer.elementId);

                  if (footerEl) {
                    pdfData.footer = footerEl.outerHTML;

                    if (_this18.options.footer.css) {
                      pdfData.options.footerCSS = _this18.options.footer.css;
                    }
                  }
                } else {
                  pdfData.footer = _this18.options.footer;
                }
              }

              pdfData.html = el.outerHTML; // document.getElementById(`${this.elementId}_pdfHeader`).value = pdfData.header
              // document.getElementById(`${this.elementId}_pdfHTML`).value = pdfData.html
              // document.getElementById(`${this.elementId}_pdfFooter`).value = pdfData.footer
              // document.getElementById(`${this.elementId}_form`).submit()

              _this18.service.add('', pdfData, {
                responseType: 'blob'
              }).then(function (response) {
                _this18.loader.hide();

                var blob = new Blob([response], {
                  type: 'application/pdf'
                });
                var msg = "\n                <div class='text-center websy-pdf-download'>\n                  <div>Your file is ready to download</div>\n                  <a href='".concat(URL.createObjectURL(blob), "' target='_blank'\n              ");

                if (_this18.options.directDownload === true) {
                  var fileName;

                  if (typeof _this18.options.fileName === 'function') {
                    fileName = _this18.options.fileName() || 'Export';
                  } else {
                    fileName = _this18.options.fileName || 'Export';
                  }

                  msg += "download='".concat(fileName, ".pdf'");
                }

                msg += "\n                  >\n                    <button class='websy-btn download-pdf'>".concat(_this18.options.buttonText, "</button>\n                  </a>\n                </div>\n              ");

                _this18.popup.show({
                  message: msg,
                  mask: true
                });
              }, function (err) {
                console.error(err);
              });
            }
          }
        }, this.options.wait);
      } else if (event.target.classList.contains('download-pdf')) {
        this.popup.hide();

        if (this.options.onClose) {
          this.options.onClose();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {// 
    }
  }]);

  return WebsyPDFButton;
}();

var WebsyPopupDialog = /*#__PURE__*/function () {
  function WebsyPopupDialog(elementId, options) {
    _classCallCheck(this, WebsyPopupDialog);

    this.DEFAULTS = {
      buttons: []
    };
    this.options = _extends({}, this.DEFAULTS, options);

    if (!elementId) {
      console.log('No element Id provided for Websy Popup');
      return;
    }

    this.closeOnOutsideClick = true;
    var el = document.getElementById(elementId);
    this.elementId = elementId;
    el.addEventListener('click', this.handleClick.bind(this));
  }

  _createClass(WebsyPopupDialog, [{
    key: "hide",
    value: function hide() {
      var el = document.getElementById(this.elementId);
      el.innerHTML = '';
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
      var html = '';

      if (this.options.mask === true) {
        html += "<div class='websy-mask'></div>";
      }

      html += "\n\t\t\t<div class='websy-popup-dialog-container'>\n\t\t\t\t<div class='websy-popup-dialog'>\n\t\t";

      if (this.options.title) {
        html += "<h1>".concat(this.options.title, "</h1>");
      }

      if (this.options.message) {
        html += "<p>".concat(this.options.message, "</p>");
      }

      if (typeof this.options.collectData !== 'undefined') {
        html += "\n        <div>\n          <input id=\"".concat(this.elementId, "_collect\" class=\"websy-input\" value=\"").concat(typeof this.options.collectData === 'boolean' ? '' : this.options.collectData, "\" placeholder=\"").concat(this.options.collectPlaceholder || '', "\">\n        </div>\n      ");
      }

      this.closeOnOutsideClick = true;

      if (this.options.buttons) {
        if (this.options.allowCloseOnOutsideClick !== true) {
          this.closeOnOutsideClick = false;
        }

        html += "<div class='websy-popup-button-panel'>";

        for (var i = 0; i < this.options.buttons.length; i++) {
          html += "\n\t\t\t\t\t<button class='websy-btn ".concat((this.options.buttons[i].classes || []).join(' '), "' data-index='").concat(i, "'>\n\t\t\t\t\t\t").concat(this.options.buttons[i].label, "\n\t\t\t\t\t</button>\n\t\t\t\t");
        }

        html += "</div>";
      }

      html += "\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t";
      el.innerHTML = html;
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
    value: function publish(method, data) {
      if (this.subscriptions[method]) {
        this.subscriptions[method].forEach(function (fn) {
          fn(data);
        });
      }
    }
  }, {
    key: "subscribe",
    value: function subscribe(method, fn) {
      if (!this.subscriptions[method]) {
        this.subscriptions[method] = [];
      }

      this.subscriptions[method].push(fn);
    }
  }]);

  return WebsyPubSub;
}();
/* global WebsyDesigns */


var WebsyResultList = /*#__PURE__*/function () {
  function WebsyResultList(elementId, options) {
    var _this19 = this;

    _classCallCheck(this, WebsyResultList);

    var DEFAULTS = {
      listeners: {
        click: {}
      }
    };
    this.options = _extends({}, DEFAULTS, options);
    this.elementId = elementId;
    this.rows = [];
    this.apiService = new WebsyDesigns.APIService('/api');
    this.templateService = new WebsyDesigns.APIService('');

    if (!elementId) {
      console.log('No element Id provided for Websy Search List');
      return;
    }

    var el = document.getElementById(elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));
    }

    if (_typeof(options.template) === 'object' && options.template.url) {
      this.templateService.get(options.template.url).then(function (templateString) {
        _this19.options.template = templateString;

        _this19.render();
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
      var html = this.buildHTML(d, startIndex);
      var el = document.getElementById(this.elementId);
      el.innerHTML += html.replace(/\n/g, '');
    }
  }, {
    key: "buildHTML",
    value: function buildHTML(d) {
      var _this20 = this;

      var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var html = "";

      if (this.options.template) {
        if (d.length > 0) {
          d.forEach(function (row, ix) {
            var template = "".concat(ix > 0 ? '-->' : '').concat(_this20.options.template).concat(ix < d.length - 1 ? '<!--' : ''); // find conditional elements

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

            var tagMatches = _toConsumableArray(template.matchAll(/(\sdata-event=["|']\w.+)["|']/g));

            tagMatches.forEach(function (m) {
              if (m[0] && m.index > -1) {
                template = template.replace(m[0], "".concat(m[0], " data-id=").concat(startIndex + ix));
              }
            });

            for (var key in row) {
              var rg = new RegExp("{".concat(key, "}"), 'gm');
              template = template.replace(rg, row[key]);
            }

            html += template;
          });
        } else if (this.options.noRowsHTML) {
          html += this.options.noRowsHTML;
        }
      }

      return html;
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
    key: "handleClick",
    value: function handleClick(event) {
      var _this21 = this;

      if (event.target.classList.contains('clickable')) {
        var l = event.target.getAttribute('data-event');

        if (l) {
          l = l.split('(');
          var params = [];
          var id = event.target.getAttribute('data-id');

          if (l[1]) {
            l[1] = l[1].replace(')', '');
            params = l[1].split(',');
          }

          l = l[0];
          params = params.map(function (p) {
            if (typeof p !== 'string' && typeof p !== 'number') {
              if (_this21.rows[+id]) {
                p = _this21.rows[+id][p];
              }
            } else if (typeof p === 'string') {
              p = p.replace(/"/g, '').replace(/'/g, '');
            }

            return p;
          });

          if (event.target.classList.contains('clickable') && this.options.listeners.click[l]) {
            var _this$options$listene;

            event.stopPropagation();

            (_this$options$listene = this.options.listeners.click[l]).call.apply(_this$options$listene, [this, event, this.rows[+id]].concat(_toConsumableArray(params)));
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this22 = this;

      if (this.options.entity) {
        this.apiService.get(this.options.entity).then(function (results) {
          _this22.rows = results.rows;

          _this22.resize();
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
    }
  }, {
    key: "data",
    set: function set(d) {
      this.rows = d || [];
      this.render();
    },
    get: function get() {
      return this.rows;
    }
  }]);

  return WebsyResultList;
}();
/* global history */


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
      persistentParameters: false
    };
    this.triggerIdList = [];
    this.viewIdList = [];
    this.previousPath = '';
    this.previousView = '';
    this.currentView = '';
    this.currentViewMain = '';
    this.currentParams = {};
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

    this.init();
  }

  _createClass(WebsyRouter, [{
    key: "addGroup",
    value: function addGroup(group) {
      var _this23 = this;

      if (!this.groups[group]) {
        var els = document.querySelectorAll(".websy-view[data-group=\"".concat(group, "\"]"));

        if (els) {
          console.log('els', els);
          this.getClosestParent(els[0], function (parent) {
            _this23.groups[group] = {
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
      if (typeof params === 'undefined') {
        return;
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

      this.currentParams = output;
      var inputPath = this.currentView;

      if (this.options.urlPrefix) {
        inputPath = "/".concat(this.options.urlPrefix, "/").concat(inputPath);
      }

      history.pushState({
        inputPath: inputPath
      }, inputPath, "".concat(inputPath, "?").concat(path));
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

      var parentEl = document.querySelector(".websy-view[data-view=\"".concat(parent, "\"]"));

      if (parentEl) {
        var els = parentEl.querySelectorAll(".websy-view[data-group]");

        for (var i = 0; i < els.length; i++) {
          var g = els[i].getAttribute('data-group');
          var v = els[i].getAttribute('data-view');

          if (!this.groups[g]) {
            this.addGroup(g);
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
        output.items[bits[0]] = bits[1];
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
          } else {
            views.push({
              view: this.groups[g].views[0],
              group: g
            });
          }
        }
      }

      return views;
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

      this.currentView = view;
      this.currentViewMain = view;

      if (this.currentView === '/' || this.currentView === '') {
        this.currentView = this.options.defaultView;
      }

      if (this.currentViewMain === '/' || this.currentViewMain === '') {
        this.currentViewMain = this.options.defaultView;
      }

      if (view !== '') {
        this.showView(view, params, 'main');
      }
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
      this.hideChildren(view, group);

      if (this.previousView !== this.currentView) {
        this.hideTriggerItems(view, group);
        this.hideViewItems(view, group);
        this.publish('hide', [view]);
      } else if (group !== this.options.defaultGroup) {
        this.hideTriggerItems(view, group);
        this.hideViewItems(view, group);
        this.publish('hide', [view]);
      }
    } // registerElements (root) {
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

      if (options.help && options.help !== '') {
        html += "\n        <Help not yet supported>\n      ";
      }

      if (options.tooltip && options.tooltip.value && options.tooltip.value !== '') {
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
      var _this24 = this;

      if (this.options.views && this.options.views[view] && this.options.views[view].components) {
        this.options.views[view].components.forEach(function (c) {
          if (typeof c.instance === 'undefined') {
            _this24.prepComponent(c.elementId, c.options);

            c.instance = new c.Component(c.elementId, c.options);
          } else if (c.instance.render) {
            c.instance.render();
          }
        });
      }
    }
  }, {
    key: "showView",
    value: function showView(view, params, group) {
      this.activateItem(view, this.options.triggerClass);
      this.activateItem(view, this.options.viewClass);
      var children = this.getActiveViewsFromParent(view);

      for (var c = 0; c < children.length; c++) {
        this.activateItem(children[c].view, this.options.triggerClass);
        this.activateItem(children[c].view, this.options.viewClass);
        this.showComponents(children[c].view);
        this.publish('show', [children[c].view, null, group]);
      }

      if (this.previousView !== this.currentView || group !== 'main') {
        this.showComponents(view);
        this.publish('show', [view, params, group]);
      }
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

      if (typeof popped === 'undefined') {
        popped = false;
      }

      this.popped = popped;
      var toggle = false;
      var noInputParams = inputPath.indexOf('?') === -1;
      var groupActiveView;
      var params = {};
      var newPath = inputPath;

      if (inputPath === this.options.defaultView && this.usesHTMLSuffix === false) {
        inputPath = inputPath.replace(this.options.defaultView, '/');
      }

      if (this.options.persistentParameters === true) {
        if (inputPath.indexOf('?') === -1 && this.queryParams) {
          inputPath += "?".concat(this.queryParams);
        }
      } else {
        this.currentParams = {};
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
        this.currentParams = {};
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
        newPath = '';
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
      } else {
        this.hideView(this.previousView, group);
      }

      if (toggle === true && newPath === groupActiveView) {
        return;
      }

      if (toggle === false) {
        this.showView(this.currentView, this.currentParams, group);
      } else if (newPath && newPath !== '') {
        this.showView(newPath, null, group);
      }

      if (this.usesHTMLSuffix === true) {
        inputPath = window.location.pathname.split('/').pop() + inputPath;
      }

      if ((this.currentPath !== newPath || previousParamsPath !== this.currentParams.path) && group === this.options.defaultGroup) {
        if (popped === false) {
          var historyUrl = inputPath;

          if (this.options.urlPrefix) {
            historyUrl = "/".concat(this.options.urlPrefix, "/").concat(historyUrl);
            inputPath = "/".concat(this.options.urlPrefix, "/").concat(inputPath);
          }

          if (this.currentParams && this.currentParams.path) {
            historyUrl += "?".concat(this.currentParams.path);
          } else if (this.queryParams && this.options.persistentParameters === true) {
            historyUrl += "?".concat(this.queryParams);
          }

          history.pushState({
            inputPath: inputPath
          }, inputPath, historyUrl);
        } else {// 
        }
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
    key: "subscribe",
    value: function subscribe(event, fn) {
      this.options.subscribers[event].push(fn);
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
    key: "disable",
    value: function disable() {
      this.options.enabled = false;
      this.render();
    }
  }, {
    key: "enable",
    value: function enable() {
      this.options.enabled = true;
      this.render();
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
    var _this25 = this;

    _classCallCheck(this, WebsyTemplate);

    var DEFAULTS = {
      listeners: {
        click: {}
      }
    };
    this.options = _extends({}, DEFAULTS, options);
    this.elementId = elementId;
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
        _this25.options.template = templateString;

        _this25.render();
      });
    } else {
      this.render();
    }
  }

  _createClass(WebsyTemplate, [{
    key: "buildHTML",
    value: function buildHTML() {
      var _this26 = this;

      var html = "";

      if (this.options.template) {
        var template = this.options.template; // find conditional elements

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
                  if (typeof _this26.options.data[parts[0]] !== 'undefined' && _this26.options.data[parts[0]] === parts[1]) {
                    // remove the <if> tags
                    removeAll = false;
                  } else if (parts[0] === parts[1]) {
                    removeAll = false;
                  }
                } else if (polarity === false) {
                  if (typeof _this26.options.data[parts[0]] !== 'undefined' && _this26.options.data[parts[0]] !== parts[1]) {
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
    key: "handleClick",
    value: function handleClick(event) {// 
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
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      bottom: rect.top + scrollTop + el.clientHeight,
      right: rect.left + scrollLeft + el.clientWidth
    };
  },
  getLightDark: function getLightDark(backgroundColor) {
    var darkColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#000000';
    var lightColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#ffffff';
    var colorParts;
    var red = 0;
    var green = 0;
    var blue = 0;

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
      colorParts = backgroundColor;
      colorParts = colorParts.split(',');
      red = colorParts[0];
      green = colorParts[1];
      blue = colorParts[2];
    }

    return red * 0.299 + green * 0.587 + blue * 0.114 > 186 ? darkColor : lightColor;
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
      numOut = v; // decimals = 0
    } else {
      numOut = v;

      for (var i = 0; i < ranges.length; i++) {
        if (v >= ranges[i].divider) {
          numOut = v / ranges[i].divider; // .toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$100,')

          suffix = ranges[i].suffix;
          break;
        } // else if (isPercentage === true) {
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

    if (numOut < 1) {
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
      var d = 1; // let out

      for (var _i6 = 0; _i6 < ranges.length; _i6++) {
        if (n >= ranges[_i6].divider) {
          d = ranges[_i6].divider;
          s = ranges[_i6].suffix; // out = (n / ranges[i].divider).toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$100,')                

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
  }
};
/* global WebsyDesigns */

var WebsyTable = /*#__PURE__*/function () {
  function WebsyTable(elementId, options) {
    var _this27 = this;

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
            if (_this27.options.onChangePageSize) {
              _this27.options.onChangePageSize(selectedItem.value);
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
    key: "appendRows",
    value: function appendRows(data) {
      var _this28 = this;

      this.hideError();
      var bodyHTML = '';

      if (data) {
        bodyHTML += data.map(function (r, rowIndex) {
          return '<tr>' + r.map(function (c, i) {
            if (_this28.options.columns[i].show !== false) {
              var style = '';

              if (c.style) {
                style += c.style;
              }

              if (_this28.options.columns[i].width) {
                style += "width: ".concat(_this28.options.columns[i].width, "; ");
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

              if (_this28.options.columns[i].showAsLink === true && c.value.trim() !== '') {
                return "\n                <td \n                  data-row-index='".concat(_this28.rowCount + rowIndex, "' \n                  data-col-index='").concat(i, "' \n                  class='").concat(_this28.options.columns[i].classes || '', "' \n                  style='").concat(style, "'\n                  colspan='").concat(c.colspan || 1, "'\n                  rowspan='").concat(c.rowspan || 1, "'\n                >\n                  <a href='").concat(c.value, "' target='").concat(_this28.options.columns[i].openInNewTab === true ? '_blank' : '_self', "'>").concat(c.displayText || _this28.options.columns[i].linkText || c.value, "</a>\n                </td>\n              ");
              } else if ((_this28.options.columns[i].showAsNavigatorLink === true || _this28.options.columns[i].showAsRouterLink === true) && c.value.trim() !== '') {
                return "\n                <td \n                  data-view='".concat(c.value, "' \n                  data-row-index='").concat(_this28.rowCount + rowIndex, "' \n                  data-col-index='").concat(i, "' \n                  class='trigger-item ").concat(_this28.options.columns[i].clickable === true ? 'clickable' : '', " ").concat(_this28.options.columns[i].classes || '', "' \n                  style='").concat(style, "'\n                  colspan='").concat(c.colspan || 1, "'\n                  rowspan='").concat(c.rowspan || 1, "'\n                >").concat(c.displayText || _this28.options.columns[i].linkText || c.value, "</td>\n              ");
              } else {
                var info = c.value;

                if (_this28.options.columns[i].showAsImage === true) {
                  c.value = "\n                  <img src='".concat(c.value, "'>\n                ");
                }

                return "\n                <td \n                  data-info='".concat(info, "' \n                  data-row-index='").concat(_this28.rowCount + rowIndex, "' \n                  data-col-index='").concat(i, "' \n                  class='").concat(_this28.options.columns[i].classes || '', "' \n                  style='").concat(style, "'\n                  colspan='").concat(c.colspan || 1, "'\n                  rowspan='").concat(c.rowspan || 1, "'\n                >").concat(c.value, "</td>\n              ");
              }
            }
          }).join('') + '</tr>';
        }).join('');
        this.data = this.data.concat(data);
        this.rowCount = this.data.length;
      }

      var bodyEl = document.getElementById("".concat(this.elementId, "_body"));
      bodyEl.innerHTML += bodyHTML;
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
        } // const colIndex = +event.target.getAttribute('data-index')
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
      } else if (event.target.classList.contains('clickable')) {
        var _colIndex = +event.target.getAttribute('data-col-index');

        var rowIndex = +event.target.getAttribute('data-row-index');

        if (this.options.onClick) {
          this.options.onClick(event, this.data[rowIndex][_colIndex], this.data[rowIndex], this.options.columns[_colIndex]);
        }
      } else if (event.target.classList.contains('websy-page-num')) {
        var pageNum = +event.target.getAttribute('data-page');

        if (this.options.onSetPage) {
          this.options.onSetPage(pageNum);
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
      this.loadingDialog.hide();
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
      var _this29 = this;

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
          return "\n        <th ".concat(c.width ? 'style="width: ' + (c.width || 'auto') + ';"' : '', ">\n          <div class =\"tableHeader\">\n            <div class=\"leftSection\">\n              <div\n                class=\"tableHeaderField ").concat(['asc', 'desc'].indexOf(c.sort) !== -1 ? 'sortable-column' : '', "\"\n                data-index=\"").concat(i, "\"                \n                data-sort=\"").concat(c.sort, "\"                \n              >\n                ").concat(c.name, "\n              </div>\n            </div>\n            <div class=\"").concat(c.activeSort ? c.sort + ' sortOrder' : '', "\"></div>\n            <!--").concat(c.searchable === true ? _this29.buildSearchIcon(c.qGroupFieldDefs[0]) : '', "-->\n          </div>\n        </th>\n        ");
        }
      }).join('') + '</tr>';
      var headEl = document.getElementById("".concat(this.elementId, "_head"));
      headEl.innerHTML = headHTML; // let footHTML = '<tr>' + this.options.columns.map((c, i) => {
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
            return "<li data-page=\"".concat(index, "\" class=\"websy-page-num ").concat(_this29.options.pageNum === index ? 'active' : '', "\">").concat(index + 1, "</li>");
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
    }
  }, {
    key: "showLoading",
    value: function showLoading(options) {
      this.loadingDialog.show(options);
    }
  }]);

  return WebsyTable;
}();
/* global WebsyDesigns */


var WebsyTable2 = /*#__PURE__*/function () {
  function WebsyTable2(elementId, options) {
    var _this30 = this;

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
            if (_this30.options.onChangePageSize) {
              _this30.options.onChangePageSize(selectedItem.value);
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
      var _this31 = this;

      this.hideError();
      var bodyEl = document.getElementById("".concat(this.elementId, "_body"));
      var bodyHTML = '';

      if (data) {
        bodyHTML += data.map(function (r, rowIndex) {
          return '<tr>' + r.map(function (c, i) {
            if (_this31.options.columns[i].show !== false) {
              var style = "height: ".concat(_this31.options.cellSize, "px; line-height: ").concat(_this31.options.cellSize, "px;");

              if (c.style) {
                style += c.style;
              }

              if (_this31.options.columns[i].width) {
                style += "width: ".concat(_this31.options.columns[i].width, "; ");
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

              if (_this31.options.columns[i].showAsLink === true && c.value.trim() !== '') {
                return "\n                <td \n                  data-row-index='".concat(_this31.rowCount + rowIndex, "' \n                  data-col-index='").concat(i, "' \n                  class='").concat(_this31.options.columns[i].classes || '', "' \n                  style='").concat(style, "'\n                  colspan='").concat(c.colspan || 1, "'\n                  rowspan='").concat(c.rowspan || 1, "'\n                >\n                  <a href='").concat(c.value, "' target='").concat(_this31.options.columns[i].openInNewTab === true ? '_blank' : '_self', "'>").concat(c.displayText || _this31.options.columns[i].linkText || c.value, "</a>\n                </td>\n              ");
              } else if ((_this31.options.columns[i].showAsNavigatorLink === true || _this31.options.columns[i].showAsRouterLink === true) && c.value.trim() !== '') {
                return "\n                <td \n                  data-view='".concat(c.value, "' \n                  data-row-index='").concat(_this31.rowCount + rowIndex, "' \n                  data-col-index='").concat(i, "' \n                  class='trigger-item ").concat(_this31.options.columns[i].clickable === true ? 'clickable' : '', " ").concat(_this31.options.columns[i].classes || '', "' \n                  style='").concat(style, "'\n                  colspan='").concat(c.colspan || 1, "'\n                  rowspan='").concat(c.rowspan || 1, "'\n                >").concat(c.displayText || _this31.options.columns[i].linkText || c.value, "</td>\n              ");
              } else {
                var info = c.value;

                if (_this31.options.columns[i].showAsImage === true) {
                  c.value = "\n                  <img src='".concat(c.value, "'>\n                ");
                }

                return "\n                <td \n                  data-info='".concat(info, "' \n                  data-row-index='").concat(_this31.rowCount + rowIndex, "' \n                  data-col-index='").concat(i, "' \n                  class='").concat(_this31.options.columns[i].classes || '', "' \n                  style='").concat(style, "'\n                  colspan='").concat(c.colspan || 1, "'\n                  rowspan='").concat(c.rowspan || 1, "'\n                >").concat(c.value, "</td>\n              ");
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
        var column = this.options.columns[colIndex];

        if (this.options.onSort) {
          this.options.onSort(event, column, colIndex);
        } else {
          this.internalSort(column, colIndex);
        } // const colIndex = +event.target.getAttribute('data-index')
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
      el.classList.remove('scrolling');
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
          var handleEl = document.getElementById("".concat(this.elementId, "_hScrollHandle")); // console.log(this.handleXStart + handleEl.offsetWidth + (event.clientX - this.scrollXStart), this.columnParameters.scrollableWidth)        

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
      this.loadingDialog.hide();
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
      var _this32 = this;

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
      } // let colGroupHTML = this.options.columns.map(c => `<col style="${c.width ? 'width: ' + c.width : ''}"></col>`)


      var headHTML = '<tr>' + this.options.columns.map(function (c, i) {
        if (c.show !== false) {
          return "\n        <th ".concat(c.width ? 'style="width: ' + (c.width || 'auto') + ';"' : '', ">\n          <div class =\"tableHeader\">\n            <div class=\"leftSection\">\n              <div\n                class=\"tableHeaderField ").concat(['asc', 'desc'].indexOf(c.sort) !== -1 ? 'sortable-column' : '', "\"\n                data-index=\"").concat(i, "\"                \n                data-sort=\"").concat(c.sort, "\"                \n              >\n                ").concat(c.name, "\n              </div>\n            </div>\n            <div class=\"").concat(c.activeSort ? c.sort + ' sortOrder' : '', "\"></div>\n            ").concat(c.searchable === true ? _this32.buildSearchIcon(i) : '', "\n          </div>\n        </th>\n        ");
        }
      }).join('') + '</tr>';
      var headEl = document.getElementById("".concat(this.elementId, "_head"));
      headEl.innerHTML = headHTML;
      var dropdownEl = document.getElementById("".concat(this.elementId, "_dropdownContainer"));

      if (dropdownEl.innerHTML === '') {
        var dropdownHTML = "";
        this.options.columns.forEach(function (c, i) {
          if (c.searchable && c.searchField) {
            dropdownHTML += "\n            <div id=\"".concat(_this32.elementId, "_columnSearch_").concat(i, "\" class=\"websy-modal-dropdown\"></div>\n          ");
          }
        });
        dropdownEl.innerHTML = dropdownHTML;
      } // const colGroupEl = document.getElementById(`${this.elementId}_cols`)
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
            return "<li data-page=\"".concat(index, "\" class=\"websy-page-num ").concat(_this32.options.pageNum === index ? 'active' : '', "\">").concat(index + 1, "</li>");
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
      this.loadingDialog.show(options);
    }
  }, {
    key: "getColumnParameters",
    value: function getColumnParameters(values) {
      var _this33 = this;

      var tableEl = document.getElementById("".concat(this.elementId, "_table"));
      tableEl.style.tableLayout = 'auto';
      tableEl.style.width = 'auto';
      var bodyEl = document.getElementById("".concat(this.elementId, "_body"));
      bodyEl.innerHTML = '<tr>' + values.map(function (c) {
        return "\n      <td                 \n        style='height: ".concat(_this33.options.cellSize, "px; line-height: ").concat(_this33.options.cellSize, "px;'\n      >").concat(c.value || '&nbsp;', "</td>\n    ");
      }).join('') + '</tr>'; // get height of the first data cell

      var cells = bodyEl.querySelectorAll("tr:first-of-type td");
      var tableContainerEl = document.getElementById("".concat(this.elementId, "_tableContainer"));
      var cellHeight = cells[0].offsetHeight || cells[0].clientHeight;
      var cellWidths = [];
      var nonScrollableWidth = 0;

      for (var i = 0; i < cells.length; i++) {
        if (i < this.options.leftColumns) {
          nonScrollableWidth += values[i].width || cells[i].offsetWidth || cells[i].clientWidth;
        }

        cellWidths.push(values[i].width || cells[i].offsetWidth || cells[i].clientWidth);
      } // const cellWidth = firstDataCell.offsetWidth || firstDataCell.clientWidth        
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
/* global d3 include WebsyDesigns */


var WebsyChart = /*#__PURE__*/function () {
  function WebsyChart(elementId, options) {
    var _this34 = this;

    _classCallCheck(this, WebsyChart);

    var DEFAULTS = {
      margin: {
        top: 10,
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
      orientation: 'vertical',
      colors: ['#5e4fa2', '#3288bd', '#66c2a5', '#abdda4', '#e6f598', '#fee08b', '#fdae61', '#f46d43', '#d53e4f', '#9e0142'],
      transitionDuration: 650,
      curveStyle: 'curveLinear',
      lineWidth: 2,
      forceZero: true,
      fontSize: 14,
      symbolSize: 20,
      showTrackingLine: true,
      showTooltip: true,
      showLegend: false,
      legendPosition: 'bottom',
      tooltipWidth: 200
    };
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    this.leftAxis = null;
    this.rightAxis = null;
    this.topAxis = null;
    this.bottomAxis = null;

    if (!elementId) {
      console.log('No element Id provided for Websy Chart');
      return;
    }

    this.invertOverride = function (input, input2) {
      var xAxis = 'bottomAxis';

      if (_this34.options.orientation === 'horizontal') {
        xAxis = 'leftAxis';
      }

      var width = _this34[xAxis].step();

      var output;

      var domain = _toConsumableArray(_this34[xAxis].domain());

      if (_this34.options.orientation === 'horizontal') {
        domain = domain.reverse();
      }

      for (var j = 0; j < domain.length; j++) {
        var breakA = _this34[xAxis](domain[j]) - width / 2;
        var breakB = breakA + width;

        if (input > breakA && input <= breakB) {
          output = j;
          break;
        }
      }

      return output;
    };

    var el = document.getElementById(this.elementId);

    if (el) {
      el.classList.add('websy-chart');

      if (typeof d3 === 'undefined') {
        console.error('d3 library has not been loaded');
      } else {
        el.innerHTML = '';
        this.svg = d3.select(el).append('svg');
        this.legendArea = d3.select(el).append('div').attr('id', "".concat(this.elementId, "_legend")).attr('class', 'websy-chart-legend');
        this.legend = new WebsyDesigns.Legend("".concat(this.elementId, "_legend"), {});
        this.prep();
      }
    } else {
      console.error("No element found with ID ".concat(this.elementId));
    }
  }

  _createClass(WebsyChart, [{
    key: "close",
    value: function close() {
      this.leftAxisLayer.selectAll('*').remove();
      this.rightAxisLayer.selectAll('*').remove();
      this.bottomAxisLayer.selectAll('*').remove();
      this.leftAxisLabel.selectAll('*').remove();
      this.rightAxisLabel.selectAll('*').remove();
      this.bottomAxisLabel.selectAll('*').remove();
      this.plotArea.selectAll('*').remove();
      this.areaLayer.selectAll('*').remove();
      this.lineLayer.selectAll('*').remove();
      this.barLayer.selectAll('*').remove();
      this.labelLayer.selectAll('*').remove();
      this.symbolLayer.selectAll('*').remove();
    }
  }, {
    key: "createDomain",
    value: function createDomain(side) {
      var domain = [];
      /* global d3 side domain:writable */

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
    }
  }, {
    key: "handleEventMouseMove",
    value: function handleEventMouseMove(event, d) {
      var _this35 = this;

      var bisectDate = d3.bisector(function (d) {
        return _this35.parseX(d.x.value);
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
          return;
        }

        var xLabel = this[xAxis].domain()[x0];

        if (this.options.orientation === 'horizontal') {
          xLabel = _toConsumableArray(this[xAxis].domain().reverse())[x0];
        }

        this.options.data.series.forEach(function (s) {
          if (_this35.options.data[xData].scale !== 'Time') {
            xPoint = _this35[xAxis](_this35.parseX(xLabel));
            s.data.forEach(function (d) {
              if (d.x.value === xLabel) {
                if (!tooltipTitle) {
                  tooltipTitle = d.x.value;
                }

                if (!d.y.color) {
                  d.y.color = s.color;
                }

                tooltipData.push(d.y);
              }
            });
          } else {
            var index = bisectDate(s.data, x0, 1);
            var pointA = s.data[index - 1];
            var pointB = s.data[index];

            if (_this35.options.orientation === 'horizontal') {
              pointA = _toConsumableArray(s.data).reverse()[index - 1];
              pointB = _toConsumableArray(s.data).reverse()[index];
            }

            if (pointA && !pointB) {
              xPoint = _this35[xAxis](_this35.parseX(pointA.x.value));
              tooltipTitle = pointA.x.value;

              if (!pointA.y.color) {
                pointA.y.color = s.color;
              }

              tooltipData.push(pointA.y);

              if (typeof pointA.x.value.getTime !== 'undefined') {
                tooltipTitle = d3.timeFormat(_this35.options.dateFormat || _this35.options.calculatedTimeFormatPattern)(pointA.x.value);
              }
            }

            if (pointB && !pointA) {
              xPoint = _this35[xAxis](_this35.parseX(pointB.x.value));
              tooltipTitle = pointB.x.value;

              if (!pointB.y.color) {
                pointB.y.color = s.color;
              }

              tooltipData.push(pointB.y);

              if (typeof pointB.x.value.getTime !== 'undefined') {
                tooltipTitle = d3.timeFormat(_this35.options.dateFormat || _this35.options.calculatedTimeFormatPattern)(pointB.x.value);
              }
            }

            if (pointA && pointB) {
              var d0 = _this35[xAxis](_this35.parseX(pointA.x.value));

              var d1 = _this35[xAxis](_this35.parseX(pointB.x.value));

              var mid = Math.abs(d0 - d1) / 2;

              if (d3.pointer(event)[0] - d0 >= mid) {
                xPoint = d1;
                tooltipTitle = pointB.x.value;

                if (typeof pointB.x.value.getTime !== 'undefined') {
                  tooltipTitle = d3.timeFormat(_this35.options.dateFormat || _this35.options.calculatedTimeFormatPattern)(pointB.x.value);
                }

                if (!pointB.y.color) {
                  pointB.y.color = s.color;
                }

                tooltipData.push(pointB.y);
              } else {
                xPoint = d0;
                tooltipTitle = pointA.x.value;

                if (typeof pointB.x.value.getTime !== 'undefined') {
                  tooltipTitle = d3.timeFormat(_this35.options.dateFormat || _this35.options.calculatedTimeFormatPattern)(pointB.x.value);
                }

                if (!pointA.y.color) {
                  pointA.y.color = s.color;
                }

                tooltipData.push(pointA.y);
              }
            }
          }
        });
        tooltipHTML = "          \n        <ul>\n      ";
        tooltipHTML += tooltipData.map(function (d) {
          return "\n        <li>\n          <i style='background-color: ".concat(d.color, ";'></i>\n          ").concat(d.tooltipLabel || '', "<span> - ").concat(d.tooltipValue || d.value, "</span>\n        </li>\n      ");
        }).join('');
        tooltipHTML += "</ul>";
        var posOptions = {
          width: this.options.tooltipWidth,
          left: 0,
          top: 0,
          onLeft: xPoint > this.plotWidth / 2
        };

        if (xPoint > this.plotWidth / 2) {
          posOptions.left = xPoint - this.options.tooltipWidth - 15;
        } else {
          posOptions.left = xPoint + this.options.margin.left + this.options.margin.axisLeft + 15;
        }

        posOptions.top = this.options.margin.top + this.options.margin.axisTop;

        if (this.options.orientation === 'horizontal') {
          delete posOptions.onLeft;
          var adjuster = 0;

          if (this.options.data[xData].scale !== 'Time') {
            adjuster = this[xAxis].bandwidth() / 2; // - this.options.margin.top
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
        this.options.showTooltip && this.tooltip.show(tooltipTitle, tooltipHTML, posOptions); // }
        // else {
        //   xPoint = x0
        // }      

        if (this.options.data[xData].scale !== 'Time') {
          xPoint += this[xAxis].bandwidth() / 2; // - this.options.margin.top
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
      this.leftAxisLayer = this.svg.append('g').attr('class', 'left-axis-layer');
      this.rightAxisLayer = this.svg.append('g').attr('class', 'right-axis-layer');
      this.bottomAxisLayer = this.svg.append('g').attr('class', 'bottom-axis-layer');
      this.leftAxisLabel = this.svg.append('g').attr('class', 'left-axis-label-layer');
      this.rightAxisLabel = this.svg.append('g').attr('class', 'right-axis-label-layer');
      this.bottomAxisLabel = this.svg.append('g').attr('class', 'bottom-axis-label-layer');
      this.plotArea = this.svg.append('g').attr('class', 'plot-layer');
      this.areaLayer = this.svg.append('g').attr('class', 'area-layer');
      this.lineLayer = this.svg.append('g').attr('class', 'line-layer');
      this.barLayer = this.svg.append('g').attr('class', 'bar-layer');
      this.labelLayer = this.svg.append('g').attr('class', 'label-layer');
      this.symbolLayer = this.svg.append('g').attr('class', 'symbol-layer');
      this.trackingLineLayer = this.svg.append('g').attr('class', 'tracking-line-layer');
      this.trackingLineLayer.append('line').attr('class', 'tracking-line');
      this.tooltip = new WebsyDesigns.WebsyChartTooltip(this.svg);
      this.eventLayer = this.svg.append('g').attr('class', 'event-line').append('rect');
      this.eventLayer.on('mouseout', this.handleEventMouseOut.bind(this)).on('mousemove', this.handleEventMouseMove.bind(this));
      this.render();
    }
  }, {
    key: "render",
    value: function render(options) {
      var _this36 = this;

      /* global d3 options */
      if (typeof options !== 'undefined') {
        this.options = _extends({}, this.options, options);
      }

      if (!this.options.data) {// tell the user no data has been provided
      } else {
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
        } // Add placeholders for the data entries that don't exist


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
          this.leftAxisLayer.attr('class', 'y-axis');
          this.rightAxisLayer.attr('class', 'y-axis');
          this.bottomAxisLayer.attr('class', 'x-axis');
        } else {
          this.leftAxisLayer.attr('class', 'x-axis');
          this.rightAxisLayer.attr('class', 'x-axis');
          this.bottomAxisLayer.attr('class', 'y-axis');
        }

        var el = document.getElementById(this.elementId);

        if (el) {
          this.width = el.clientWidth;
          this.height = el.clientHeight; // establish the space and size for the legend
          // the legend gets rendered so that we can get its actual size

          if (this.options.showLegend === true) {
            var legendData = this.options.data.series.map(function (s, i) {
              return {
                value: s.label || s.key,
                color: s.color || _this36.options.colors[i % _this36.options.colors.length]
              };
            });

            if (this.options.legendPosition === 'top' || this.options.legendPosition === 'bottom') {
              this.legendArea.style('width', '100%');
            }

            if (this.options.legendPosition === 'left' || this.options.legendPosition === 'right') {
              this.legendArea.style('height', '100%');
              this.legendArea.style('width', this.legend.testWidth(d3.max(legendData.map(function (d) {
                return d.value;
              }))) + 'px');
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

          if (this.options.data.bottom && this.options.data.bottom.data && typeof this.options.data.bottom.max === 'undefined') {
            // this.options.data.bottom.max = this.options.data.bottom.data.reduce((a, b) => a.length > b.value.length ? a : b.value, '')
            // this.options.data.bottom.min = this.options.data.bottom.data.reduce((a, b) => a.length < b.value.length ? a : b.value, this.options.data.bottom.max)      
            this.options.data.bottom.max = this.options.data.bottom.data[this.options.data.bottom.data.length - 1].value;
            this.options.data.bottom.min = this.options.data.bottom.data[0].value;
          }

          if (this.options.data.bottom && typeof this.options.data.bottom.max !== 'undefined') {
            this.longestBottom = this.options.data.bottom.max.toString().length;

            if (this.options.data.bottom.formatter) {
              this.longestBottom = this.options.data.bottom.formatter(this.options.data.bottom.max).toString().length;
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
            this.longestLeft = this.options.data.left.max.toString().length;

            if (this.options.data.left.formatter) {
              this.longestLeft = this.options.data.left.formatter(this.options.data.left.max).toString().length;
            }
          }

          if (this.options.data.right && this.options.data.right.data && this.options.data.right.max === 'undefined') {
            this.options.data.right.min = d3.min(this.options.data.right.data);
            this.options.data.right.max = d3.max(this.options.data.right.data);
          }

          if (this.options.data.right && typeof this.options.data.right.max !== 'undefined') {
            this.longestRight = this.options.data.right.max.toString().length;

            if (this.options.data.right.formatter) {
              this.longestRight = this.options.data.right.formatter(this.options.data.right.max).toString().length;
            }
          } // establish the space needed for the various axes    


          this.options.margin.axisLeft = this.longestLeft * (this.options.data.left && this.options.data.left.fontSize || this.options.fontSize) * 0.7;
          this.options.margin.axisRight = this.longestRight * (this.options.data.right && this.options.data.right.fontSize || this.options.fontSize) * 0.7;
          this.options.margin.axisBottom = (this.options.data.bottom && this.options.data.bottom.fontSize || this.options.fontSize) + 10;
          this.options.margin.axisTop = 0; // adjust axis margins based on title options

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

          if (this.options.data.bottom.rotate) {
            // this.options.margin.bottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)   
            this.options.margin.axisBottom = this.longestBottom * (this.options.data.bottom && this.options.data.bottom.fontSize || this.options.fontSize) * 0.4; // this.options.margin.bottom = this.options.margin.bottom * (1 + this.options.data.bottom.rotate / 100)
          } // hide the margin if necessary


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
          } // Define the plot size


          this.plotWidth = this.width - this.options.margin.legendLeft - this.options.margin.legendRight - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight;
          this.plotHeight = this.height - this.options.margin.legendTop - this.options.margin.legendBottom - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom - this.options.margin.axisTop; // Translate the layers

          this.leftAxisLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")")).style('font-size', this.options.data.left && this.options.data.left.fontSize || this.options.fontSize);
          this.rightAxisLayer.attr('transform', "translate(".concat(this.options.margin.left + this.plotWidth + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop, ")")).style('font-size', this.options.data.right && this.options.data.right.fontSize || this.options.fontSize);
          this.bottomAxisLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.options.margin.axisTop + this.plotHeight, ")")).style('font-size', this.options.data.bottom && this.options.data.bottom.fontSize || this.options.fontSize);
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
          var that = this;
          this.eventLayer.attr('x', 0).attr('y', 0).attr('width', this.plotWidth).attr('height', this.plotHeight).attr('fill-opacity', '0'); // this.tooltip.transform(this.options.margin.left + this.options.margin.axisLeft, this.options.margin.top + this.options.margin.axisTop)
          // Configure the bottom axis

          var bottomDomain = this.createDomain('bottom');
          this.bottomAxis = d3["scale".concat(this.options.data.bottom.scale || 'Band')]().domain(bottomDomain).range([0, this.plotWidth]);

          if (this.bottomAxis.nice) {// this.bottomAxis.nice()
          }

          if (this.bottomAxis.padding && this.options.data.bottom.padding) {
            this.bottomAxis.padding(this.options.data.bottom.padding || 0);
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
            var bAxisFunc = d3.axisBottom(this.bottomAxis) // .ticks(this.options.data.bottom.ticks || Math.min(this.options.data.bottom.data.length, 5))
            .ticks(tickDefinition);
            console.log('tickDefinition', tickDefinition);
            console.log(bAxisFunc);

            if (this.options.data.bottom.formatter) {
              bAxisFunc.tickFormat(function (d) {
                return _this36.options.data.bottom.formatter(d);
              });
            }

            this.bottomAxisLayer.call(bAxisFunc);
            console.log(this.bottomAxisLayer.ticks);

            if (this.options.data.bottom.rotate) {
              this.bottomAxisLayer.selectAll('text').attr('transform', "rotate(".concat(this.options.data.bottom.rotate, ")")).style('text-anchor', 'end');
            }
          } // Configure the left axis


          var leftDomain = this.createDomain('left');
          var rightDomain = this.createDomain('right');
          this.leftAxis = d3["scale".concat(this.options.data.left.scale || 'Linear')]().domain(leftDomain).range([this.plotHeight, 0]);

          if (this.leftAxis.padding && this.options.data.left.padding) {
            this.leftAxis.padding(this.options.data.left.padding || 0);
          }

          if (this.leftAxis.nice) {
            this.leftAxis.nice();
          }

          if (this.options.margin.axisLeft > 0) {
            this.leftAxisLayer.call(d3.axisLeft(this.leftAxis).ticks(this.options.data.left.ticks || 5).tickFormat(function (d) {
              if (_this36.options.data.left.formatter) {
                d = _this36.options.data.left.formatter(d);
              }

              return d;
            }));
          }

          if (this.options.data.left && this.options.data.left.showTitle === true) {
            this.leftAxisLabel.selectAll('.title').remove();
            this.leftAxisLabel.selectAll('.dot').remove();

            if (this.options.data.left.titlePosition === 1) {
              // put the title vertically on the left
              var t = this.leftAxisLabel.append('text').attr('class', 'title').attr('x', 1 - this.plotHeight / 2).attr('y', 5).attr('font-size', this.options.data.left.titleFontSize || 10).attr('fill', this.options.data.left.titleColor || '#888888').attr('text-anchor', 'middle').style('transform', 'rotate(-90deg)').text(this.options.data.left.title || '');

              if (rightDomain.length > 0) {
                // we have 2 axis so we can treat the title like a legend
                this.leftAxisLabel.append('circle').attr('class', 'dot').style('fill', this.options.data.left.color || 'transparent').attr('r', this.options.data.left.titleFontSize && this.options.data.left.titleFontSize / 2 || 5).attr('cx', 3).attr('cy', this.plotHeight / 2 - t.node().getBBox().width / 2 - 15);
              }
            } else {
              // put the title horizontally on the top
              this.leftAxisLabel.append('text').attr('class', 'title').attr('x', 0).attr('y', 5).attr('font-size', this.options.data.left.titleFontSize || 10).attr('fill', this.options.data.left.titleColor || '#888888').attr('text-anchor', 'left').text(this.options.data.left.title || '');
            }
          } // Configure the right axis    


          if (rightDomain.length > 0) {
            this.rightAxis = d3["scale".concat(this.options.data.right.scale || 'Linear')]().domain(rightDomain).range([this.plotHeight, 0]);

            if (this.rightAxis.nice) {
              this.rightAxis.nice();
            }

            console.log('axis right', this.options.margin.axisRight);

            if (this.options.margin.axisRight > 0 && (this.options.data.right.min !== 0 || this.options.data.right.max !== 0)) {
              this.rightAxisLayer.call(d3.axisRight(this.rightAxis).ticks(this.options.data.left.ticks || 5).tickFormat(function (d) {
                if (_this36.options.data.right.formatter) {
                  d = _this36.options.data.right.formatter(d);
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
            } else {// put the title horizontally on the top
            }
          } // Draw the series data


          this.options.data.series.forEach(function (series, index) {
            if (!series.key) {
              series.key = _this36.createIdentity();
            }

            if (!series.color) {
              series.color = _this36.options.colors[index % _this36.options.colors.length];
            }

            _this36["render".concat(series.type || 'bar')](series, index);

            _this36.renderLabels(series, index);
          });
        }
      }
    }
  }, {
    key: "renderarea",
    value: function renderarea(series, index) {
      var _this37 = this;

      /* global d3 series index */
      var drawArea = function drawArea(xAxis, yAxis, curveStyle) {
        return d3.area().x(function (d) {
          return _this37[xAxis](_this37.parseX(d.x.value));
        }).y0(function (d) {
          return _this37[yAxis](0);
        }).y1(function (d) {
          return _this37[yAxis](isNaN(d.y.value) ? 0 : d.y.value);
        }).curve(d3[curveStyle || _this37.options.curveStyle]);
      };

      var xAxis = 'bottomAxis';
      var yAxis = series.axis === 'secondary' ? 'rightAxis' : 'leftAxis';

      if (this.options.orienation === 'horizontal') {
        xAxis = series.axis === 'secondary' ? 'rightAxis' : 'leftAxis';
        yAxis = 'bottomAxis';
      }

      var areas = this.areaLayer.selectAll(".area_".concat(series.key)).data([series.data]); // Exit

      areas.exit().transition(this.transition).style('fill-opacity', 1e-6).remove(); // Update

      areas // .style('stroke-width', series.lineWidth || this.options.lineWidth)
      // .attr('id', `line_${series.key}`)
      // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
      // .attr('fill', series.colour)
      // .attr('stroke', 'transparent')
      .transition(this.transition).attr('d', function (d) {
        return drawArea(xAxis, yAxis, series.curveStyle)(d);
      }); // Enter

      areas.enter().append('path').attr('d', function (d) {
        return drawArea(xAxis, yAxis, series.curveStyle)(d);
      }).attr('class', "area_".concat(series.key)).attr('id', "area_".concat(series.key)) // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
      // .style('stroke-width', series.lineWidth || this.options.lineWidth)
      .attr('fill', series.color) // .style('fill-opacity', 0)
      .attr('stroke', 'transparent') // .transition(this.transition)
      .style('fill-opacity', series.opacity || 0.5);
    }
  }, {
    key: "renderbar",
    value: function renderbar(series, index) {
      /* global series index d3 */
      var xAxis = 'bottomAxis';
      var yAxis = 'leftAxis';
      var bars = this.barLayer.selectAll(".bar_".concat(series.key)).data(series.data);
      var acummulativeY = new Array(this.options.data.series.length).fill(0);

      if (this.options.orientation === 'horizontal') {
        xAxis = 'leftAxis';
        yAxis = 'bottomAxis';
      }

      var barWidth = this[xAxis].bandwidth();

      if (this.options.data.series.length > 1 && this.options.grouping !== 'stacked') {
        barWidth = barWidth / this.options.data.series.length - 4;
      }

      function getBarHeight(d, i) {
        if (this.options.orientation === 'horizontal') {
          return barWidth;
        } else {
          return this[yAxis](d.y.value);
        }
      }

      function getBarWidth(d, i) {
        if (this.options.orientation === 'horizontal') {
          var width = this[yAxis](d.y.value);
          acummulativeY[d.y.index] += width;
          return width;
        } else {
          return barWidth;
        }
      }

      function getBarX(d, i) {
        if (this.options.orientation === 'horizontal') {
          if (this.options.grouping === 'stacked') {
            return this[yAxis](d.y.accumulative);
          } else {
            return 0;
          }
        } else {
          if (this.options.grouping !== 'stacked') {
            return this[xAxis](this.parseX(d.x.value));
          } else {
            return this[xAxis](this.parseX(d.x.value)) + i * barWidth;
          }
        }
      }

      function getBarY(d, i) {
        if (this.options.orientation === 'horizontal') {
          if (this.options.grouping === 'stacked') {
            return this[xAxis](this.parseX(d.x.value));
          } else {
            return this[xAxis](this.parseX(d.x.value)) + (d.y.index || i) * barWidth;
          }
        } else {
          if (this.options.grouping === 'stacked') {
            return this[yAxis](d.y.accumulative);
          } else {
            return 0;
          }
        }
      }

      bars.exit().transition(this.transition).style('stroke-opacity', 1e-6).remove();
      bars.attr('width', getBarWidth.bind(this)).attr('height', getBarHeight.bind(this)).attr('x', getBarX.bind(this)).attr('y', getBarY.bind(this)).transition(this.transition).attr('fill', series.color);
      bars.enter().append('rect').attr('width', getBarWidth.bind(this)).attr('height', getBarHeight.bind(this)).attr('x', getBarX.bind(this)).attr('y', getBarY.bind(this)) // .transition(this.transition)
      .attr('fill', series.color).attr('class', function (d) {
        return "bar bar_".concat(series.key);
      });
    }
  }, {
    key: "renderLabels",
    value: function renderLabels(series, index) {
      /* global series index d3 WebsyDesigns */
      var xAxis = 'bottomAxis';
      var yAxis = 'leftAxis';
      var that = this;

      if (this.options.orientation === 'horizontal') {
        xAxis = 'leftAxis';
        yAxis = 'bottomAxis';
      }

      if (this.options.showLabels) {
        // need to add logic to handle positioning options
        // e.g. Inside, Outide, Auto (this will also affect the available plot space)
        // We currently only support 'Auto'  
        var labels = this.labelLayer.selectAll(".label_".concat(series.key)).data(series.data);
        labels.exit().transition(this.transition).style('stroke-opacity', 1e-6).remove();
        labels.attr('x', getLabelX.bind(this)).attr('y', getLabelY.bind(this)).attr('class', "label_".concat(series.key)).style('font-size', "".concat(this.options.labelSize || this.options.fontSize, "px")).style('fill', this.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(series.color)).transition(this.transition).text(function (d) {
          return d.y.label || d.y.value;
        });
        labels.enter().append('text').attr('class', "label_".concat(series.key)).attr('x', getLabelX.bind(this)).attr('y', getLabelY.bind(this)).attr('alignment-baseline', 'central').attr('text-anchor', this.options.orientation === 'horizontal' ? 'left' : 'middle').style('font-size', "".concat(this.options.labelSize || this.options.fontSize, "px")).style('fill', this.options.labelColor || WebsyDesigns.WebsyUtils.getLightDark(series.color)).text(function (d) {
          return d.y.label || d.y.value;
        }).each(function (d, i) {
          if (that.options.orientation === 'horizontal') {
            if (that.options.grouping === 'stacked') {
              this.setAttribute('text-anchor', 'middle');
            } else if (that.plotWidth - getLabelX.call(that, d) < this.getComputedTextLength()) {
              this.setAttribute('text-anchor', 'end');
              this.setAttribute('x', +this.getAttribute('x') - 8);
            }
          } else {
            if (that.plotheight - getLabelX.call(that, d) < (that.options.labelSize || that.options.fontSize)) {
              this.setAttribute('y', +this.getAttribute('y') + 8);
            }
          }
        });
      }

      function getLabelX(d) {
        if (this.options.orientation === 'horizontal') {
          if (this.options.grouping === 'stacked') {
            return this[yAxis](d.y.accumulative) + this[yAxis](d.y.value) / 2;
          } else {
            return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value) + 4;
          }
        } else {
          return this[xAxis](this.parseX(d.x.value)) + this[xAxis].bandwidth() / 2;
        }
      }

      function getLabelY(d) {
        if (this.options.orientation === 'horizontal') {
          return this[xAxis](this.parseX(d.x.value)) + this[xAxis].bandwidth() / 2;
        } else {
          if (this.options.grouping === 'stacked') {// 
          } else {
            return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value) - 4;
          }
        }
      }
    }
  }, {
    key: "renderline",
    value: function renderline(series, index) {
      var _this38 = this;

      /* global series index d3 */
      var drawLine = function drawLine(xAxis, yAxis, curveStyle) {
        return d3.line().x(function (d) {
          return _this38[xAxis](_this38.parseX(d.x.value));
        }).y(function (d) {
          return _this38[yAxis](isNaN(d.y.value) ? 0 : d.y.value);
        }).curve(d3[curveStyle || _this38.options.curveStyle]);
      };

      var xAxis = 'bottomAxis';
      var yAxis = series.axis === 'secondary' ? 'rightAxis' : 'leftAxis';

      if (this.options.orienation === 'horizontal') {
        xAxis = series.axis === 'secondary' ? 'rightAxis' : 'leftAxis';
        yAxis = 'bottomAxis';
      }

      var lines = this.lineLayer.selectAll(".line_".concat(series.key)).data([series.data]); // Exit

      lines.exit().transition(this.transition).style('stroke-opacity', 1e-6).remove(); // Update

      lines.style('stroke-width', series.lineWidth || this.options.lineWidth) // .attr('id', `line_${series.key}`)
      // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
      .attr('stroke', series.color).attr('fill', 'transparent').transition(this.transition).attr('d', function (d) {
        return drawLine(xAxis, yAxis, series.curveStyle)(d);
      }); // Enter

      lines.enter().append('path').attr('d', function (d) {
        return drawLine(xAxis, yAxis, series.curveStyle)(d);
      }).attr('class', "line_".concat(series.key)).attr('id', "line_".concat(series.key)) // .attr('transform', 'translate('+ (that.bandWidth/2) +',0)')
      .style('stroke-width', series.lineWidth || this.options.lineWidth).attr('stroke', series.color).attr('fill', 'transparent') // .transition(this.transition)
      .style('stroke-opacity', 1);

      if (series.showArea === true) {
        this.renderarea(series, index);
      }

      if (series.showSymbols === true) {
        this.rendersymbol(series, index);
      }
    }
  }, {
    key: "rendersymbol",
    value: function rendersymbol(series, index) {
      var _this39 = this;

      /* global d3 series index series.key */
      var drawSymbol = function drawSymbol(size) {
        return d3.symbol() // .type(d => {
        //   return d3.symbols[0]
        // })
        .size(size || _this39.options.symbolSize);
      };

      var xAxis = 'bottomAxis';
      var yAxis = series.axis === 'secondary' ? 'rightAxis' : 'leftAxis';

      if (this.options.orienation === 'horizontal') {
        xAxis = series.axis === 'secondary' ? 'rightAxis' : 'leftAxis';
        yAxis = 'bottomAxis';
      }

      var symbols = this.symbolLayer.selectAll(".symbol_".concat(series.key)).data(series.data); // Exit

      symbols.exit().transition(this.transition).style('fill-opacity', 1e-6).remove(); // Update

      symbols.attr('d', function (d) {
        return drawSymbol(d.y.size || series.symbolSize)(d);
      }).transition(this.transition).attr('fill', 'white').attr('stroke', series.color).attr('transform', function (d) {
        return "translate(".concat(_this39[xAxis](_this39.parseX(d.x.value)), ", ").concat(_this39[yAxis](isNaN(d.y.value) ? 0 : d.y.value), ")");
      }); // Enter

      symbols.enter().append('path').attr('d', function (d) {
        return drawSymbol(d.y.size || series.symbolSize)(d);
      }) // .transition(this.transition)
      .attr('fill', 'white').attr('stroke', series.color).attr('class', function (d) {
        return "symbol symbol_".concat(series.key);
      }).attr('transform', function (d) {
        return "translate(".concat(_this39[xAxis](_this39.parseX(d.x.value)), ", ").concat(_this39[yAxis](isNaN(d.y.value) ? 0 : d.y.value), ")");
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
        this.svg.attr('width', this.width - this.options.margin.legendLeft - this.options.margin.legendRight).attr('height', this.height - this.options.margin.legendTop - this.options.margin.legendBottom).attr('transform', "translate(".concat(this.options.margin.legendLeft, ", ").concat(this.options.margin.legendTop, ")")); // Define the plot height  
        // this.plotWidth = this.width - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight
        // this.plotHeight = this.height - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom

        this.plotWidth = this.width - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight;
        this.plotHeight = this.height - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom - this.options.margin.axisTop; // establish the space needed for the various axes

        this.longestRight = 5;
        this.longestBottom = 5;
        this.options.margin.axisLeft = this.longestLeft * (this.options.data.left && this.options.data.left.fontSize || this.options.fontSize) * 0.7;
        this.options.margin.axisRight = this.longestRight * (this.options.data.right && this.options.data.right.fontSize || this.options.fontSize) * 0.7;
        this.options.margin.axisBottom = (this.options.data.bottom && this.options.data.bottom.fontSize || this.options.fontSize) + 10;

        if (this.options.data.bottom.rotate) {
          // this.options.margin.bottom = this.longestBottom * ((this.options.data.bottom && this.options.data.bottom.fontSize) || this.options.fontSize)   
          this.options.margin.axisBottom = this.longestBottom * (this.options.data.bottom && this.options.data.bottom.fontSize || this.options.fontSize) * 0.4; // this.options.margin.bottom = this.options.margin.bottom * (1 + this.options.data.bottom.rotate / 100)
        } // hide the margin if necessary


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
        } // Translate the layers
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
    key: "data",
    set: function set(d) {
      this.options.data = d;
      this.render();
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
    key: "render",
    value: function render() {
      this.resize();
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this40 = this;

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
          return _this40.getLegendItemHTML(d);
        }).join('');
        html += "\n        <div>\n      ";
        el.innerHTML = html;
      }
    }
  }, {
    key: "testWidth",
    value: function testWidth(v) {
      var html = this.getLegendItemHTML({
        value: v
      });
      var el = document.createElement('div');
      el.style.position = 'absolute'; // el.style.width = '100vw'

      el.style.visibility = 'hidden';
      el.innerHTML = html;
      document.body.appendChild(el);
      var w = el.clientWidth + 30; // for padding

      el.remove();
      return w;
    }
  }, {
    key: "data",
    set: function set(d) {
      this._data = d;
      this.render();
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
      label: {},
      value: {},
      subValue: {}
    };
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
  }

  _createClass(WebsyKPI, [{
    key: "render",
    value: function render(options) {
      this.options = _extends({}, this.options, options);

      if (!this.options.label.classes) {
        this.options.label.classes = [];
      }

      if (!this.options.value.classes) {
        this.options.value.classes = [];
      }

      if (!this.options.subValue.classes) {
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

        html += "   \n          <div class=\"websy-kpi-info\">\n            <div class=\"websy-kpi-label ".concat(this.options.label.classes.join(' ') || '', "\">\n              ").concat(this.options.label.value || '', "\n      ");

        if (this.options.tooltip && this.options.tooltip.value) {
          html += "\n          <div class=\"websy-info ".concat(this.options.tooltip.classes.join(' ') || '', "\" data-info=\"").concat(this.options.tooltip.value, "\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 512 512\"><title>ionicons-v5-e</title><path d=\"M256,56C145.72,56,56,145.72,56,256s89.72,200,200,200,200-89.72,200-200S366.28,56,256,56Zm0,82a26,26,0,1,1-26,26A26,26,0,0,1,256,138Zm48,226H216a16,16,0,0,1,0-32h28V244H228a16,16,0,0,1,0-32h32a16,16,0,0,1,16,16V332h28a16,16,0,0,1,0,32Z\"/></svg>\n          </div>   \n        ");
        }

        html += "\n            </div>\n            <div class=\"websy-kpi-value ".concat(this.options.value.classes.join(' ') || '', "\">").concat(this.options.value.value, "</div>\n      ");

        if (this.options.subValue) {
          html += "\n          <div class=\"websy-kpi-sub-value ".concat(this.options.subValue.classes.join(' ') || '', "\">").concat(this.options.subValue.value, "</div>\n        ");
        }

        html += "                                \n          </div>\n        </div>\n      ";
        el.innerHTML = html;
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

    if (!elementId) {
      console.log('No element Id provided for Websy Map');
      return;
    }

    var mapOptions = {
      click: this.handleMapClick.bind(this)
    };

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
        console.error('d3 library has not been loaded');
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
    key: "handleClick",
    value: function handleClick(event) {}
  }, {
    key: "handleMapClick",
    value: function handleMapClick(event) {}
  }, {
    key: "render",
    value: function render() {
      var _this41 = this;

      var mapEl = document.getElementById("".concat(this.elementId, "_map"));
      var legendEl = document.getElementById("".concat(this.elementId, "_map"));

      if (this.options.showLegend === true && this.options.data.polygons) {
        var legendData = this.options.data.polygons.map(function (s, i) {
          return {
            value: s.label || s.key,
            color: s.color || _this41.options.colors[i % _this41.options.colors.length]
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
          return _this41.map.removeLayer(p);
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
      } // this.markers = []        
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
            p.options.color = _this41.options.colors[i % _this41.options.colors.length];
          }

          var pol = L.polygon(p.data.map(function (c) {
            return c.map(function (d) {
              return [d.Latitude, d.Longitude];
            });
          }), p.options).addTo(_this41.map);

          _this41.polygons.push(pol);

          _this41.map.fitBounds(pol.getBounds());
        });
      } // if (this.data.markers.length > 0) {            
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
      } else if (this.polygons) {// this.map.fitBounds(this.geo.getBounds())
      } else if (this.options.center) {
        this.map.setView(this.options.center, this.options.zoom || null);
      }
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

      console.log(classes.join(' '));
      var fO = this.tooltipLayer.selectAll('foreignObject').attr('width', "".concat(position.width, "px")) // .attr('height', `${position.height}px`)
      // .attr('y', `0px`)      
      .attr('class', "websy-chart-tooltip ".concat(classes.join(' ')));
      this.tooltipContent.attr('class', "websy-chart-tooltip-content ".concat(classes.join(' '))).style('width', "".concat(position.width, "px")) // .style('left', '0px')
      // .style('top', `0px`)
      .html("<div class='title'>".concat(title, "</div>").concat(html));

      if (navigator.userAgent.indexOf('Chrome') === -1 && navigator.userAgent.indexOf('Safari') !== -1) {
        fO.attr('x', '0px');
        this.tooltipContent.style('left', position.positioning !== 'vertical' ? "".concat(position.left, "px") : 'unset').style('top', position.onTop !== true ? "".concat(position.top, "px") : 'unset').style('bottom', position.onTop === true ? "".concat(position.bottom, "px") : 'unset'); // that.tooltipLayer.selectAll('foreignObject').transform(that.margin.left, that.margin.top)
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
  WebsyDatePicker: WebsyDatePicker,
  DatePicker: WebsyDatePicker,
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
  Table: WebsyTable,
  Table2: WebsyTable2,
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
  Switch: Switch
};
WebsyDesigns.service = new WebsyDesigns.APIService('');
var GlobalPubSub = new WebsyPubSub('empty', {});

function recaptchaReadyCallBack() {
  GlobalPubSub.publish('recaptchaready');
} // need a way of initializing these based on environment variables


function useGoogleRecaptcha() {
  var rcs = document.createElement('script');
  rcs.src = '//www.google.com/recaptcha/api.js?onload=recaptchaReadyCallBack';
  document.getElementsByTagName('body')[0].appendChild(rcs);
}

function usePayPal() {
  var pps = document.createElement('script');
  pps.src = '//www.paypal.com/sdk/js';
  document.getElementsByTagName('body')[0].appendChild(pps);
}
