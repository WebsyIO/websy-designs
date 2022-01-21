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
  WebsyChart
  WebsyChartTooltip
  WebsyMap
  WebsyKPI
  WebsyPDFButton
  WebsyTemplate
  APIService
  WebsyUtils
*/
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

        if (buttonInfo && buttonInfo.preventClose !== true) {
          this.hide();
        }

        if (buttonInfo && buttonInfo.fn) {
          buttonInfo.fn(buttonInfo);
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

var WebsyNavigationMenu = /*#__PURE__*/function () {
  function WebsyNavigationMenu(elementId, options) {
    _classCallCheck(this, WebsyNavigationMenu);

    this.options = _extends({}, {
      collapsable: false,
      orientation: 'horizontal',
      parentMap: {},
      childIndentation: 10
    }, options);

    if (!elementId) {
      console.log('No element Id provided for Websy Menu');
      return;
    }

    var el = document.getElementById(elementId);

    if (el) {
      this.elementId = elementId;
      el.classList.add("websy-".concat(this.options.orientation, "-list-container"));
      el.classList.add('websy-menu');

      if (this.options.classes) {
        this.options.classes.forEach(function (c) {
          return el.classList.add(c);
        });
      }

      el.addEventListener('click', this.handleClick.bind(this));
      this.render();
    }
  }

  _createClass(WebsyNavigationMenu, [{
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('websy-menu-icon') || event.target.nodeName === 'svg' || event.target.nodeName === 'rect') {
        this.toggleMobileMenu();
      }

      if (event.target.classList.contains('trigger-item') && event.target.classList.contains('websy-menu-header')) {
        this.toggleMobileMenu('remove');
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

        if (this.options.collapsable === true) {
          html += "\n          <div id='".concat(this.elementId, "_menuIcon' class='websy-menu-icon'>\n            <svg viewbox=\"0 0 40 40\" width=\"30\" height=\"40\">              \n              <rect x=\"0\" y=\"0\" width=\"30\" height=\"4\" rx=\"2\"></rect>\n              <rect x=\"0\" y=\"12\" width=\"30\" height=\"4\" rx=\"2\"></rect>\n              <rect x=\"0\" y=\"24\" width=\"30\" height=\"4\" rx=\"2\"></rect>\n            </svg>\n          </div>\n        ");
        }

        if (this.options.logo) {
          html += "          \n          <div \n            class='logo ".concat(this.options.logo.classes && this.options.logo.classes.join(' ') || '', "'\n            ").concat(this.options.logo.attributes && this.options.logo.attributes.join(' '), "\n          >\n          <img src='").concat(this.options.logo.url, "'></img>\n          </div>\n          <div id='").concat(this.elementId, "_mask' class='websy-menu-mask'></div>\n          <div id=\"").concat(this.elementId, "_menuContainer\" class=\"websy-menu-block-container\">\n        ");
        }

        html += this.renderBlock(this.options.items, 'main', 1);
        html += "</div>";
        el.innerHTML = html;

        if (this.options.navigator) {
          this.options.navigator.registerElements(el);
        }
      }
    }
  }, {
    key: "renderBlock",
    value: function renderBlock(items, block, level) {
      var html = "\n\t\t  <ul class='websy-".concat(this.options.orientation, "-list ").concat(block !== 'main' ? 'websy-menu-collapsed' : '', "' id='").concat(this.elementId, "_").concat(block, "_list'\n\t  ");

      if (block !== 'main') {
        html += " data-collapsed='".concat(block !== 'main' ? 'true' : 'false', "'");
      }

      html += '>';

      for (var i = 0; i < items.length; i++) {
        // update the block to the current item		
        var selected = ''; // items[i].default === true ? 'selected' : ''

        var active = items[i]["default"] === true ? 'active' : '';
        var currentBlock = this.normaliseString(items[i].text);
        html += "\n\t\t\t<li class='websy-".concat(this.options.orientation, "-list-item'>\n\t\t\t\t<div class='websy-menu-header ").concat(items[i].classes && items[i].classes.join(' '), " ").concat(selected, " ").concat(active, "' \n\t\t\t\t\t\t id='").concat(this.elementId, "_").concat(currentBlock, "_label' \n\t\t\t\t\t\t data-id='").concat(currentBlock, "'\n             data-menu-id='").concat(this.elementId, "_").concat(currentBlock, "_list'\n\t\t\t\t\t\t data-popout-id='").concat(level > 1 ? block : currentBlock, "'\n\t\t\t\t\t\t data-text='").concat(items[i].text, "'\n\t\t\t\t\t\t style='padding-left: ").concat(level * this.options.childIndentation, "px'\n\t\t\t\t\t\t ").concat(items[i].attributes && items[i].attributes.join(' '), "\n        >\n      ");

        if (this.options.orientation === 'horizontal') {
          html += items[i].text;
        }

        html += "\n          <span class='selected-bar'></span>\n          <span class='active-square'></span>\n          <span class='".concat(items[i].items && items[i].items.length > 0 ? 'menu-carat' : '', "'></span>\n      ");

        if (this.options.orientation === 'vertical') {
          html += "\n          &nbsp;\n        ";
        }

        html += "    \n\t\t\t\t</div>\n\t\t  ";

        if (items[i].items) {
          html += this.renderBlock(items[i].items, currentBlock, level + 1);
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
    key: "toggleOpen",
    value: function toggleOpen() {}
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
      if (this.options.classes) {
        this.options.classes.forEach(function (c) {
          return el.classList.add(c);
        });
      }

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
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this.options.useRecaptcha === true) {
          if (_this.recaptchaValue) {
            _this.apiService.add('/google/checkrecaptcha', JSON.stringify({
              grecaptcharesponse: _this.recaptchaValue
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
      event.preventDefault();

      if (event.target.classList.contains('submit')) {
        this.submitForm();
      } else if (event.target.classList.contains('cancel')) {
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
      var _this2 = this;

      if (components.length === 0) {
        callbackFn();
      } else {
        components.forEach(function (c) {
          if (typeof WebsyDesigns[c.component] !== 'undefined') {
            var comp = new WebsyDesigns[c.component]("".concat(_this2.elementId, "_input_").concat(c.field, "_component"), c.options);
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
      var _this3 = this;

      var el = document.getElementById(this.elementId);
      var componentsToProcess = [];

      if (el) {
        var html = "\n        <form id=\"".concat(this.elementId, "Form\">\n      ");
        this.options.fields.forEach(function (f, i) {
          if (f.component) {
            componentsToProcess.push(f);
            html += "\n            ".concat(i > 0 ? '-->' : '', "<div class='").concat(f.classes, "'>\n              ").concat(f.label ? "<label for=\"".concat(f.field, "\">").concat(f.label, "</label>") : '', "\n              <div id='").concat(_this3.elementId, "_input_").concat(f.field, "_component' class='form-component'></div>\n            </div><!--\n          ");
          } else if (f.type === 'longtext') {
            html += "\n            ".concat(i > 0 ? '-->' : '', "<div class='").concat(f.classes, "'>\n              ").concat(f.label ? "<label for=\"".concat(f.field, "\">").concat(f.label, "</label>") : '', "\n              <textarea\n                id=\"").concat(_this3.elementId, "_input_").concat(f.field, "\"\n                ").concat(f.required === true ? 'required' : '', " \n                placeholder=\"").concat(f.placeholder || '', "\"\n                name=\"").concat(f.field, "\" \n                class=\"websy-input websy-textarea\"\n              ></textarea>\n            </div><!--\n          ");
          } else {
            html += "\n            ".concat(i > 0 ? '-->' : '', "<div class='").concat(f.classes, "'>\n              ").concat(f.label ? "<label for=\"".concat(f.field, "\">").concat(f.label, "</label>") : '', "\n              <input \n                id=\"").concat(_this3.elementId, "_input_").concat(f.field, "\"\n                ").concat(f.required === true ? 'required' : '', " \n                type=\"").concat(f.type || 'text', "\" \n                class=\"websy-input\" \n                name=\"").concat(f.field, "\" \n                placeholder=\"").concat(f.placeholder || '', "\"\n                value=\"").concat(f.value || '', "\"\n                oninvalidx=\"this.setCustomValidity('").concat(f.invalidMessage || 'Please fill in this field.', "')\"\n              />\n            </div><!--\n          ");
          }
        });
        html += "\n        --><button class=\"websy-btn submit ".concat(this.options.submit.classes, "\">").concat(this.options.submit.text || 'Save', "</button>").concat(this.options.cancel ? '<!--' : '', "\n      ");

        if (this.options.cancel) {
          html += "\n          --><button class=\"websy-btn cancel ".concat(this.options.cancel.classes, "\">").concat(this.options.cancel.text || 'Cancel', "</button>\n        ");
        }

        html += "          \n        </form>\n        <div id=\"".concat(this.elementId, "_validationFail\" class=\"websy-validation-failure\"></div>\n      ");

        if (this.options.useRecaptcha === true) {
          html += "\n          <div id='".concat(this.elementId, "_recaptcha'></div>\n        ");
        }

        el.innerHTML = html;
        this.processComponents(componentsToProcess, function () {
          if (_this3.options.useRecaptcha === true && typeof grecaptcha !== 'undefined') {
            _this3.recaptchaReady();
          }
        });
      }
    }
  }, {
    key: "submitForm",
    value: function submitForm() {
      var _this4 = this;

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

            if (_this4.options.url) {
              _this4.apiService.add(_this4.options.url, data).then(function (result) {
                if (_this4.options.clearAfterSave === true) {
                  // this.render()
                  formEl.reset();
                }

                _this4.options.onSuccess.call(_this4, result);
              }, function (err) {
                console.log('Error submitting form data:', err);

                _this4.options.onError.call(_this4, err);
              });
            } else if (_this4.options.submitFn) {
              _this4.options.submitFn(data, function () {
                if (_this4.options.clearAfterSave === true) {
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
      var _this5 = this;

      if (!this.options.fields) {
        this.options.fields = [];
      }

      var _loop = function _loop(key) {
        _this5.options.fields.forEach(function (f) {
          if (f.field === key) {
            f.value = d[key];
            var el = document.getElementById("".concat(_this5.elementId, "_input_").concat(f.field));
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

var WebsyDatePicker = /*#__PURE__*/function () {
  function WebsyDatePicker(elementId, options) {
    _classCallCheck(this, WebsyDatePicker);

    this.oneDay = 1000 * 60 * 60 * 24;
    this.currentselection = [];
    this.validDates = [];
    var DEFAULTS = {
      defaultRange: 0,
      minAllowedDate: this.floorDate(new Date(new Date(new Date().setFullYear(new Date().getFullYear() - 1)).setDate(1))),
      maxAllowedDate: this.floorDate(new Date(new Date())),
      daysOfWeek: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
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
    DEFAULTS.ranges = [{
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
    }];
    this.options = _extends({}, DEFAULTS, options);
    this.selectedRange = this.options.defaultRange || 0;
    this.selectedRangeDates = _toConsumableArray(this.options.ranges[this.options.defaultRange || 0].range);
    this.priorSelectedDates = null;

    if (!elementId) {
      console.log('No element Id provided');
      return;
    }

    var el = document.getElementById(elementId);

    if (el) {
      this.elementId = elementId;
      el.addEventListener('click', this.handleClick.bind(this));
      var html = "\n        <div class='websy-date-picker-container'>\n          <span class='websy-dropdown-header-label'>".concat(this.options.label || 'Date', "</span>\n          <div class='websy-date-picker-header'>\n            <span id='").concat(this.elementId, "_selectedRange'>").concat(this.options.ranges[this.selectedRange].label, "</span>\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z\"/></svg>\n          </div>\n          <div id='").concat(this.elementId, "_mask' class='websy-date-picker-mask'></div>\n          <div id='").concat(this.elementId, "_content' class='websy-date-picker-content'>\n            <div class='websy-date-picker-ranges'>\n              <ul id='").concat(this.elementId, "_rangelist'>\n                ").concat(this.renderRanges(), "\n              </ul>\n            </div><!--\n            --><div id='").concat(this.elementId, "_datelist' class='websy-date-picker-custom'>").concat(this.renderDates(), "</div>\n            <div class='websy-dp-button-container'>\n              <button class='websy-btn websy-dp-cancel'>Cancel</button>\n              <button class='websy-btn websy-dp-confirm'>Confirm</button>\n            </div>\n          </div>          \n        </div>\n      ");
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
          this.options.onChange(this.selectedRangeDates);
        }

        this.updateRange();
      } else {
        this.selectedRangeDates = _toConsumableArray(this.priorSelectedDates);
        this.selectedRange = this.priorSelectedRange;
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
      } else if (event.target.classList.contains('websy-dp-date')) {
        if (event.target.classList.contains('websy-disabled-date')) {
          return;
        }

        var timestamp = event.target.id.split('_')[0];
        this.selectDate(+timestamp);
      } else if (event.target.classList.contains('websy-dp-confirm')) {
        this.close(true);
      } else if (event.target.classList.contains('websy-dp-cancel')) {
        this.close();
      }
    }
  }, {
    key: "highlightRange",
    value: function highlightRange() {
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

      var daysDiff = Math.floor((this.selectedRangeDates[this.selectedRangeDates.length - 1].getTime() - this.selectedRangeDates[0].getTime()) / this.oneDay);

      if (this.selectedRangeDates[0].getMonth() !== this.selectedRangeDates[this.selectedRangeDates.length - 1].getMonth()) {
        daysDiff += 1;
      }

      for (var _i = 0; _i < daysDiff + 1; _i++) {
        var d = this.floorDate(new Date(this.selectedRangeDates[0].getTime() + _i * this.oneDay));
        var dateEl = document.getElementById("".concat(d.getTime(), "_date"));

        if (dateEl) {
          dateEl.classList.add('selected');

          if (d.getTime() === this.selectedRangeDates[0].getTime()) {
            dateEl.classList.add('first');
          }

          if (d.getTime() === this.selectedRangeDates[this.selectedRangeDates.length - 1].getTime()) {
            dateEl.classList.add('last');
          }
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
      this.priorSelectedDates = _toConsumableArray(this.selectedRangeDates);
      this.priorSelectedRange = this.selectedRange;
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
      var disabled = [];
      this.validDates = [];

      if (disabledDates) {
        disabled = disabledDates.map(function (d) {
          return d.getTime();
        });
      } // first disabled all of the ranges


      this.options.ranges.forEach(function (r) {
        return r.disabled = true;
      });
      var daysDiff = Math.ceil((this.options.maxAllowedDate.getTime() - this.options.minAllowedDate.getTime()) / this.oneDay) + 1;
      var months = {};

      for (var i = 0; i < daysDiff; i++) {
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
      } // check each range to see if it can be enabled


      for (var _i2 = 0; _i2 < this.options.ranges.length; _i2++) {
        var r = this.options.ranges[_i2]; // check the first date

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
      }

      var html = '';
      html += "\n      <ul class='websy-dp-days-header'>\n    ";
      html += this.options.daysOfWeek.map(function (d) {
        return "<li>".concat(d, "</li>");
      }).join('');
      html += "\n      </ul>\n      <div id='".concat(this.elementId, "_dateList' class='websy-dp-date-list'>\n    ");

      for (var key in months) {
        html += "\n        <div class='websy-dp-month-container'>\n          <span id='".concat(key.replace(/\s/g, '_'), "'>").concat(key, "</span>\n          <ul>\n      ");

        if (months[key][0].dayOfWeek > 0) {
          var paddedDays = [];

          for (var _i4 = 0; _i4 < months[key][0].dayOfWeek; _i4++) {
            paddedDays.push("<li>&nbsp;</li>");
          }

          html += paddedDays.join('');
        }

        html += months[key].map(function (d) {
          return "<li id='".concat(d.id, "_date' class='websy-dp-date ").concat(d.disabled === true ? 'websy-disabled-date' : '', "'>").concat(d.dayOfMonth, "</li>");
        }).join('');
        html += "\n          </ul>\n        </div>\n      ";
      }

      html += '</div>';
      return html;
    }
  }, {
    key: "renderRanges",
    value: function renderRanges() {
      var _this6 = this;

      return this.options.ranges.map(function (r, i) {
        return "\n      <li data-index='".concat(i, "' class='websy-date-picker-range ").concat(i === _this6.selectedRange ? 'active' : '', " ").concat(r.disabled === true ? 'websy-disabled-range' : '', "'>").concat(r.label, "</li>\n    ");
      }).join('');
    }
  }, {
    key: "scrollRangeIntoView",
    value: function scrollRangeIntoView() {
      if (this.selectedRangeDates[0]) {
        var el = document.getElementById("".concat(this.selectedRangeDates[0].getTime(), "_date"));
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
        if (timestamp > this.currentselection[0]) {
          this.currentselection.push(timestamp);
        } else {
          this.currentselection.splice(0, 0, timestamp);
        }
      }

      this.selectedRangeDates = [new Date(this.currentselection[0]), new Date(this.currentselection[1] || this.currentselection[0])];

      if (this.currentselection.length === 2) {
        this.currentselection = [];
      }

      this.selectedRange = -1;
      this.highlightRange();
    }
  }, {
    key: "selectRange",
    value: function selectRange(index) {
      if (this.options.ranges[index]) {
        this.selectedRangeDates = _toConsumableArray(this.options.ranges[index].range);
        this.selectedRange = +index;
        this.highlightRange();
        this.close(true);
      }
    }
  }, {
    key: "selectCustomRange",
    value: function selectCustomRange(range) {
      this.selectedRange = -1;
      this.selectedRangeDates = range;
      this.highlightRange();
      this.updateRange();
    }
  }, {
    key: "setDateBounds",
    value: function setDateBounds(range) {
      if (this.options.ranges[0].label === 'All Dates') {
        this.options.ranges[0].range = [range[0], range[1] || range[0]];
      }

      this.options.minAllowedDate = range[0];
      this.options.maxAllowedDate = range[1] || range[0];
    }
  }, {
    key: "updateRange",
    value: function updateRange() {
      var range;

      if (this.selectedRange === -1) {
        var start = this.selectedRangeDates[0].toLocaleDateString();
        var end = '';

        if (this.selectedRangeDates[1] && this.selectedRangeDates[0].getTime() !== this.selectedRangeDates[1].getTime()) {
          end = " - ".concat(this.selectedRangeDates[1].toLocaleDateString());
        }

        range = {
          label: "".concat(start).concat(end)
        };
      } else {
        range = this.options.ranges[this.selectedRange];
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
      this.render();
    } else {
      console.log('No element found with Id', elementId);
    }
  }

  _createClass(WebsyDropdown, [{
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
        if (this.options.onCancelSearch) {
          this.options.onCancelSearch('');
        }

        searchEl.value = '';
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
      var _this7 = this;

      if (!this.elementId) {
        console.log('No element Id provided for Websy Dropdown');
        return;
      }

      var el = document.getElementById(this.elementId);
      var headerLabel = this.selectedItems.map(function (s) {
        return _this7.options.items[s].label || _this7.options.items[s].value;
      }).join(this.options.multiValueDelimiter);
      var headerValue = this.selectedItems.map(function (s) {
        return _this7.options.items[s].value || _this7.options.items[s].label;
      }).join(this.options.multiValueDelimiter);
      var html = "\n      <div class='websy-dropdown-container ".concat(this.options.disabled ? 'disabled' : '', " ").concat(this.options.disableSearch !== true ? 'with-search' : '', "'>\n        <div id='").concat(this.elementId, "_header' class='websy-dropdown-header ").concat(this.selectedItems.length === 1 ? 'one-selected' : '', " ").concat(this.options.allowClear === true ? 'allow-clear' : '', "'>\n          <span id='").concat(this.elementId, "_headerLabel' class='websy-dropdown-header-label'>").concat(this.options.label, "</span>\n          <span data-info='").concat(headerLabel, "' class='websy-dropdown-header-value' id='").concat(this.elementId, "_selectedItems'>").concat(headerLabel, "</span>\n          <input class='dropdown-input' id='").concat(this.elementId, "_input' name='").concat(this.options.field || this.options.label, "' value='").concat(headerValue, "'>\n          <svg class='arrow' xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z\"/></svg>\n    ");

      if (this.options.allowClear === true) {
        html += "\n        <svg class='clear' xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><title>ionicons-v5-l</title><line x1=\"368\" y1=\"368\" x2=\"144\" y2=\"144\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/><line x1=\"368\" y1=\"144\" x2=\"144\" y2=\"368\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/></svg>\n      ";
      }

      html += "          \n        </div>\n        <div id='".concat(this.elementId, "_mask' class='websy-dropdown-mask'></div>\n        <div id='").concat(this.elementId, "_content' class='websy-dropdown-content'>\n    ");

      if (this.options.disableSearch !== true) {
        html += "\n        <input id='".concat(this.elementId, "_search' class='websy-dropdown-search' placeholder='").concat(this.options.searchPlaceholder || 'Search', "'>\n      ");
      }

      html += "\n          <div class='websy-dropdown-items'>\n            <ul id='".concat(this.elementId, "_items'>              \n            </ul>\n          </div><!--\n          --><div class='websy-dropdown-custom'></div>\n        </div>\n      </div>\n    ");
      el.innerHTML = html;
      this.renderItems();
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this8 = this;

      var html = this.options.items.map(function (r, i) {
        return "\n      <li data-index='".concat(i, "' class='websy-dropdown-item ").concat(_this8.selectedItems.indexOf(i) !== -1 ? 'active' : '', "'>").concat(r.label, "</li>\n    ");
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
      var _this9 = this;

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
          labelEl.innerHTML = item.label;
          labelEl.setAttribute('data-info', item.label);
          inputEl.value = item.value;
        } else if (this.selectedItems.length > 1) {
          if (this.options.showCompleteSelectedList === true) {
            var selectedLabels = this.selectedItems.map(function (s) {
              return _this9.options.items[s].label || _this9.options.items[s].value;
            }).join(this.options.multiValueDelimiter);
            var selectedValues = this.selectedItems.map(function (s) {
              return _this9.options.items[s].value || _this9.options.items[s].label;
            }).join(this.options.multiValueDelimiter);
            labelEl.innerHTML = selectedLabels;
            labelEl.setAttribute('data-info', selectedLabels);
            inputEl.value = selectedValues;
          } else {
            var _selectedValues = this.selectedItems.map(function (s) {
              return _this9.options.items[s].value || _this9.options.items[s].label;
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
/* global WebsyDesigns */


var WebsyResultList = /*#__PURE__*/function () {
  function WebsyResultList(elementId, options) {
    var _this10 = this;

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
        _this10.options.template = templateString;

        _this10.render();
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
      var _this11 = this;

      var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var html = "";

      if (this.options.template) {
        if (d.length > 0) {
          d.forEach(function (row, ix) {
            var template = "".concat(ix > 0 ? '-->' : '').concat(_this11.options.template).concat(ix < d.length - 1 ? '<!--' : ''); // find conditional elements

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
      var _this12 = this;

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
              if (_this12.rows[+id]) {
                p = _this12.rows[+id][p];
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
      var _this13 = this;

      if (this.options.entity) {
        this.apiService.get(this.options.entity).then(function (results) {
          _this13.rows = results.rows;

          _this13.resize();
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
/* global WebsyDesigns */


var WebsyTemplate = /*#__PURE__*/function () {
  function WebsyTemplate(elementId, options) {
    var _this14 = this;

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
        _this14.options.template = templateString;

        _this14.render();
      });
    } else {
      this.render();
    }
  }

  _createClass(WebsyTemplate, [{
    key: "buildHTML",
    value: function buildHTML() {
      var _this15 = this;

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
                  if (typeof _this15.options.data[parts[0]] !== 'undefined' && _this15.options.data[parts[0]] === parts[1]) {
                    // remove the <if> tags
                    removeAll = false;
                  } else if (parts[0] === parts[1]) {
                    removeAll = false;
                  }
                } else if (polarity === false) {
                  if (typeof _this15.options.data[parts[0]] !== 'undefined' && _this15.options.data[parts[0]] !== parts[1]) {
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
/* global history */


var WebsyRouter = /*#__PURE__*/function () {
  function WebsyRouter(options) {
    _classCallCheck(this, WebsyRouter);

    var defaults = {
      triggerClass: 'trigger-item',
      triggerToggleClass: 'trigger-toggle',
      viewClass: 'view',
      activeClass: 'active',
      viewAttribute: 'data-view',
      groupAttribute: 'data-group',
      parentAttribute: 'data-parent',
      defaultView: '',
      defaultGroup: 'main',
      subscribers: {
        show: [],
        hide: []
      }
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
    this.options = _extends({}, defaults, options); // add any necessary CSS if the viewClass has been changed

    if (this.options.viewClass !== defaults.viewClass || this.options.activeClass !== defaults.activeClass) {
      var style = "\n        <style>\n          .".concat(this.options.viewClass, "{ display: none; }\n          .").concat(this.options.viewClass, ".").concat(this.options.activeClass, "{ display: initial; }\n          .").concat(this.options.triggerClass, "{cursor: pointer;}\n        </style>\n      ");
      document.querySelector('head').innerHTML += style;
    } // this.navigate(this.currentPath, this.options.defaultGroup)

  }

  _createClass(WebsyRouter, [{
    key: "addGroup",
    value: function addGroup(group) {
      if (!this.groups[group]) {
        this.groups[group] = {
          activeView: ''
        };
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

      for (var g in this.groups) {
        if (this.groups[g].parent === parent) {
          if (this.groups[g].activeView) {
            views.push(this.groups[g].activeView);
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
      this.registerElements(document);
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
        this.showView(view, params);
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
    key: "hideView",
    value: function hideView(view, group) {
      this.hideTriggerItems(view, group);
      this.hideViewItems(view, group);

      if (group === this.options.defaultGroup) {
        var children = document.getElementsByClassName("parent-".concat(view));

        if (children) {
          for (var c = 0; c < children.length; c++) {
            if (children[c].classList.contains(this.options.viewClass)) {
              var viewAttr = children[c].attributes[this.options.viewAttribute];
              var groupAttr = children[c].attributes[this.options.groupAttribute];

              if (viewAttr && viewAttr.value !== '') {
                this.hideView(viewAttr.value, groupAttr.value || this.options.defaultGroup);
              }
            }
          }
        }
      } else {
        if (this.groups[group] && this.groups[group].activeView === view) {
          this.groups[group].activeView = null;
        }
      }

      this.publish('hide', [view]);
    }
  }, {
    key: "registerElements",
    value: function registerElements(root) {
      if (root.nodeName === '#document') {
        this.groups = {};
      }

      var triggerItems = root.getElementsByClassName(this.options.triggerClass);

      for (var i = 0; i < triggerItems.length; i++) {
        if (!triggerItems[i].id) {
          triggerItems[i].id = this.generateId('trigger');
        }

        if (this.triggerIdList.indexOf(triggerItems[i].id) !== -1) {
          continue;
        }

        this.triggerIdList.push(triggerItems[i].id); // get the view for each item

        var viewAttr = triggerItems[i].attributes[this.options.viewAttribute];

        if (viewAttr && viewAttr.value !== '') {
          // check to see if the item belongs to a group
          // use the group to add an additional class to the item
          // this combines the triggerClass and groupAttr properties
          var groupAttr = triggerItems[i].attributes[this.options.groupAttribute];
          var group = this.options.defaultGroup;

          if (groupAttr && groupAttr.value !== '') {
            // if no group is found, assign it to the default group
            group = groupAttr.value;
          }

          var parentAttr = triggerItems[i].attributes[this.options.parentAttribute];

          if (parentAttr && parentAttr.value !== '') {
            triggerItems[i].classList.add("parent-".concat(parentAttr.value));
          }

          triggerItems[i].classList.add("".concat(this.options.triggerClass, "-").concat(group));
        }
      } // Assign group class to views


      var viewItems = root.getElementsByClassName(this.options.viewClass);

      for (var _i5 = 0; _i5 < viewItems.length; _i5++) {
        var _groupAttr = viewItems[_i5].attributes[this.options.groupAttribute];
        var _viewAttr = viewItems[_i5].attributes[this.options.viewAttribute];

        if (!_groupAttr || _groupAttr.value === '') {
          // if no group is found, assign it to the default group
          viewItems[_i5].classList.add("".concat(this.options.viewClass, "-").concat(this.options.defaultGroup));
        } else {
          this.addGroup(_groupAttr.value);

          if (viewItems[_i5].classList.contains(this.options.activeClass)) {
            this.groups[_groupAttr.value].activeView = _viewAttr.value;
          }

          viewItems[_i5].classList.add("".concat(this.options.viewClass, "-").concat(_groupAttr.value));
        }

        var _parentAttr = viewItems[_i5].attributes[this.options.parentAttribute];

        if (_parentAttr && _parentAttr.value !== '') {
          viewItems[_i5].classList.add("parent-".concat(_parentAttr.value));

          if (_groupAttr && _groupAttr.value !== '' && this.groups[_groupAttr.value]) {
            this.groups[_groupAttr.value].parent = _parentAttr.value;
          }
        }
      }
    }
  }, {
    key: "showView",
    value: function showView(view, params) {
      this.activateItem(view, this.options.triggerClass);
      this.activateItem(view, this.options.viewClass);
      var children = this.getActiveViewsFromParent(view);

      for (var c = 0; c < children.length; c++) {
        this.activateItem(children[c], this.options.triggerClass);
        this.activateItem(children[c], this.options.viewClass);
        this.publish('show', [children[c]]);
      }

      this.publish('show', [view, params]);
    }
  }, {
    key: "reloadCurrentView",
    value: function reloadCurrentView() {
      this.showView(this.currentView, this.currentParams);
    }
  }, {
    key: "navigate",
    value: function navigate(inputPath, group, event, popped) {
      if (typeof popped === 'undefined') {
        popped = false;
      }

      this.popped = popped;
      var toggle = false;
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

      if (toggle === true && this.groups[group].activeView !== '') {
        newPath = '';
      }

      this.previousView = this.currentView;
      this.previousPath = this.currentPath;

      if (!this.groups) {
        this.groups = {};
      }

      if (this.groups[group]) {
        if (toggle === false) {
          groupActiveView = this.groups[group].activeView;
        }

        this.previousPath = this.groups[group].activeView;
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

      if (toggle === false) {
        this.showView(this.currentView, this.currentParams);
      } else if (newPath && newPath !== '') {
        this.showView(newPath);
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
          } else if (this.queryParams) {
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
/* global XMLHttpRequest fetch ENV */


var APIService = /*#__PURE__*/function () {
  function APIService(baseUrl) {
    _classCallCheck(this, APIService);

    this.baseUrl = baseUrl;
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
/* global WebsyDesigns Blob */


var WebsyPDFButton = /*#__PURE__*/function () {
  function WebsyPDFButton(elementId, options) {
    _classCallCheck(this, WebsyPDFButton);

    var DEFAULTS = {
      classes: [],
      wait: 0,
      buttonText: 'Download'
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
      var _this16 = this;

      if (event.target.classList.contains('websy-pdf-button')) {
        this.loader.show();
        setTimeout(function () {
          if (_this16.options.targetId) {
            var el = document.getElementById(_this16.options.targetId);

            if (el) {
              var pdfData = {
                options: {}
              };

              if (_this16.options.pdfOptions) {
                pdfData.options = _extends({}, _this16.options.pdfOptions);
              }

              if (_this16.options.header) {
                if (_this16.options.header.elementId) {
                  var headerEl = document.getElementById(_this16.options.header.elementId);

                  if (headerEl) {
                    pdfData.header = headerEl.outerHTML;

                    if (_this16.options.header.css) {
                      pdfData.options.headerCSS = _this16.options.header.css;
                    }
                  }
                } else if (_this16.options.header.html) {
                  pdfData.header = _this16.options.header.html;

                  if (_this16.options.header.css) {
                    pdfData.options.headerCSS = _this16.options.header.css;
                  }
                } else {
                  pdfData.header = _this16.options.header;
                }
              }

              if (_this16.options.footer) {
                if (_this16.options.footer.elementId) {
                  var footerEl = document.getElementById(_this16.options.footer.elementId);

                  if (footerEl) {
                    pdfData.footer = footerEl.outerHTML;

                    if (_this16.options.footer.css) {
                      pdfData.options.footerCSS = _this16.options.footer.css;
                    }
                  }
                } else {
                  pdfData.footer = _this16.options.footer;
                }
              }

              pdfData.html = el.outerHTML; // document.getElementById(`${this.elementId}_pdfHeader`).value = pdfData.header
              // document.getElementById(`${this.elementId}_pdfHTML`).value = pdfData.html
              // document.getElementById(`${this.elementId}_pdfFooter`).value = pdfData.footer
              // document.getElementById(`${this.elementId}_form`).submit()

              _this16.service.add('', pdfData, {
                responseType: 'blob'
              }).then(function (response) {
                _this16.loader.hide();

                var blob = new Blob([response], {
                  type: 'application/pdf'
                });

                _this16.popup.show({
                  message: "\n                  <div class='text-center websy-pdf-download'>\n                    <div>Your file is ready to download</div>\n                    <a href='".concat(URL.createObjectURL(blob), "' target='_blank'>\n                      <button class='websy-btn download-pdf'>").concat(_this16.options.buttonText, "</button>\n                    </a>\n                  </div>\n                "),
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

var WebsyTable = /*#__PURE__*/function () {
  function WebsyTable(elementId, options) {
    _classCallCheck(this, WebsyTable);

    var DEFAULTS = {
      pageSize: 20
    };
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    this.rowCount = 0;
    this.busy = false;
    this.tooltipTimeoutFn = null;
    this.data = [];
    var el = document.getElementById(this.elementId);

    if (el) {
      el.innerHTML = "\n        <div id='".concat(this.elementId, "_tableContainer' class='websy-vis-table'>\n          <!--<div class=\"download-button\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z\"/></svg>\n          </div>-->\n          <table>\n            <thead id=\"").concat(this.elementId, "_head\">\n            </thead>\n            <tbody id=\"").concat(this.elementId, "_body\">\n            </tbody>\n            <tfoot id=\"").concat(this.elementId, "_foot\">\n            </tfoot>\n          </table>\n        </div>\n      ");
      el.addEventListener('click', this.handleClick.bind(this));
      el.addEventListener('mouseout', this.handleMouseOut.bind(this));
      el.addEventListener('mousemove', this.handleMouseMove.bind(this));
      var scrollEl = document.getElementById("".concat(this.elementId, "_tableContainer"));
      scrollEl.addEventListener('scroll', this.handleScroll.bind(this));
      this.render();
    } else {
      console.error("No element found with ID ".concat(this.elementId));
    }
  }

  _createClass(WebsyTable, [{
    key: "appendRows",
    value: function appendRows(data) {
      var _this17 = this;

      var bodyHTML = '';

      if (data) {
        bodyHTML += data.map(function (r, rowIndex) {
          return '<tr>' + r.map(function (c, i) {
            if (_this17.options.columns[i].show !== false) {
              if (_this17.options.columns[i].showAsLink === true && c.value.trim() !== '') {
                return "\n                <td data-row-index='".concat(_this17.rowCount + rowIndex, "' data-col-index='").concat(i, "' class='").concat(_this17.options.columns[i].classes || '', "' ").concat(_this17.options.columns[i].width ? 'style="width: ' + _this17.options.columns[i].width + '"' : '', "><a href='").concat(c.value, "' target='").concat(_this17.options.columns[i].openInNewTab === true ? '_blank' : '_self', "'>").concat(_this17.options.columns[i].linkText || c.value, "</a></td>\n              ");
              } else if (_this17.options.columns[i].showAsNavigatorLink === true && c.value.trim() !== '') {
                return "\n                <td data-view='".concat(c.value, "' data-row-index='").concat(_this17.rowCount + rowIndex, "' data-col-index='").concat(i, "' class='trigger-item ").concat(_this17.options.columns[i].clickable === true ? 'clickable' : '', " ").concat(_this17.options.columns[i].classes || '', "' ").concat(_this17.options.columns[i].width ? 'style="width: ' + _this17.options.columns[i].width + '"' : '', ">").concat(_this17.options.columns[i].linkText || c.value, "</td>\n              ");
              } else {
                return "\n                <td data-info='".concat(c.value, "' data-row-index='").concat(_this17.rowCount + rowIndex, "' data-col-index='").concat(i, "' class='").concat(_this17.options.columns[i].classes || '', "' ").concat(_this17.options.columns[i].width ? 'style="width: ' + (_this17.options.columns[i].width || 'auto') + '"' : '', ">").concat(c.value, "</td>\n              ");
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
      if (this.options.onScroll) {
        this.options.onScroll(event);
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
      var _this18 = this;

      if (!this.options.columns) {
        return;
      }

      this.data = [];
      this.rowCount = 0;
      var bodyEl = document.getElementById("".concat(this.elementId, "_body"));
      bodyEl.innerHTML = '';

      if (this.options.allowDownload === true) {
        var el = document.getElementById(this.elementId);

        if (el) {
          el.classList.add('allow-download');
        } else {
          el.classList.remove('allow-download');
        }
      }

      var headHTML = '<tr>' + this.options.columns.map(function (c, i) {
        if (c.show !== false) {
          return "\n        <th ".concat(c.width ? 'style="width: ' + (c.width || 'auto') + ';"' : '', ">\n          <div class =\"tableHeader\">\n            <div class=\"leftSection\">\n              <div\n                class=\"tableHeaderField ").concat(['asc', 'desc'].indexOf(c.sort) !== -1 ? 'sortable-column' : '', "\"\n                data-index=\"").concat(i, "\"                \n                data-sort=\"").concat(c.sort, "\"                \n              >\n                ").concat(c.name, "\n              </div>\n            </div>\n            <div class=\"").concat(c.activeSort ? c.sort + ' sortOrder' : '', "\"></div>\n            <!--").concat(c.searchable === true ? _this18.buildSearchIcon(c.qGroupFieldDefs[0]) : '', "-->\n          </div>\n        </th>\n        ");
        }
      }).join('') + '</tr>';
      var headEl = document.getElementById("".concat(this.elementId, "_head"));
      headEl.innerHTML = headHTML;
      var footHTML = '<tr>' + this.options.columns.map(function (c, i) {
        if (c.show !== false) {
          return "\n          <th></th>\n        ";
        }
      }).join('') + '</tr>';
      var footEl = document.getElementById("".concat(this.elementId, "_foot"));
      footEl.innerHTML = footHTML;

      if (data) {
        // this.data = this.data.concat(data)
        this.appendRows(data);
      }
    }
  }]);

  return WebsyTable;
}();
/* global d3 include */


var WebsyChart = /*#__PURE__*/function () {
  function WebsyChart(elementId, options) {
    _classCallCheck(this, WebsyChart);

    var DEFAULTS = {
      margin: {
        top: 3,
        left: 3,
        bottom: 3,
        right: 3,
        axisBottom: 0,
        axisLeft: 0,
        axisRight: 0,
        axisTop: 0
      },
      orientation: 'vertical',
      colors: d3.schemeCategory10,
      transitionDuration: 650,
      curveStyle: 'curveLinear',
      lineWidth: 2,
      forceZero: true,
      fontSize: 14,
      symbolSize: 20,
      dateFormat: '%b/%m/%Y',
      showTrackingLine: true,
      showTooltip: true,
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

    var el = document.getElementById(this.elementId);

    if (el) {
      el.classList.add('websy-chart');

      if (typeof d3 === 'undefined') {
        console.error('d3 library has not been loaded');
      } else {
        el.innerHTML = '';
        this.svg = d3.select(el).append('svg');
        this.prep();
      }
    } else {
      console.error("No element found with ID ".concat(this.elementId));
    }
  }

  _createClass(WebsyChart, [{
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
      var _this19 = this;

      // console.log('mouse move', event, d, d3.pointer(event))
      var bisectDate = d3.bisector(function (d) {
        return _this19.parseX(d.x.value);
      }).left;

      if (this.options.showTrackingLine === true && d3.pointer(event)) {
        var x0 = d3.pointer(event)[0];
        var xPoint;
        var data;
        var tooltipHTML = '';
        var tooltipTitle = '';
        var tooltipData = [];

        if (this.bottomAxis.invert) {
          x0 = this.bottomAxis.invert(x0);
          this.options.data.series.forEach(function (s) {
            var index = bisectDate(s.data, x0, 1);
            var pointA = s.data[index - 1];
            var pointB = s.data[index];

            if (pointA) {
              xPoint = _this19.bottomAxis(_this19.parseX(pointA.x.value));
              tooltipTitle = pointA.x.value;

              if (typeof pointA.x.value.getTime !== 'undefined') {
                tooltipTitle = d3.timeFormat(_this19.options.dateFormat)(pointA.x.value);
              }
            }

            if (pointA && pointB) {
              var d0 = _this19.bottomAxis(_this19.parseX(pointA.x.value));

              var d1 = _this19.bottomAxis(_this19.parseX(pointB.x.value));

              var mid = Math.abs(d0 - d1) / 2;

              if (d3.pointer(event)[0] - d0 >= mid) {
                xPoint = d1;
                tooltipTitle = pointB.x.value;

                if (typeof pointB.x.value.getTime !== 'undefined') {
                  tooltipTitle = d3.timeFormat(_this19.options.dateFormat)(pointB.x.value);
                }

                tooltipData.push(pointB.y);
              } else {
                xPoint = d0;
                tooltipData.push(pointA.y);
              }
            }
          });
          tooltipHTML = "          \n          <ul>\n        ";
          tooltipHTML += tooltipData.map(function (d) {
            return "\n          <li>\n            <i style='background-color: ".concat(d.color, ";'></i>\n            ").concat(d.tooltipLabel || '', "<span>").concat(d.tooltipValue || d.value, "</span>\n          </li>\n        ");
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
          this.tooltip.show(tooltipTitle, tooltipHTML, posOptions); // data = this.bottomAxis(data)
        } else {
          xPoint = x0;
        }

        this.trackingLineLayer.select('.tracking-line').attr('x1', xPoint).attr('x2', xPoint).attr('y1', 0).attr('y2', this.plotHeight).attr('stroke-width', 1).attr('stroke-dasharray', '4 2').attr('stroke', '#cccccc').attr('stroke-opacity', 1);
      }
    }
  }, {
    key: "prep",
    value: function prep() {
      /* global d3 WebsyDesigns */
      this.leftAxisLayer = this.svg.append('g');
      this.rightAxisLayer = this.svg.append('g');
      this.bottomAxisLayer = this.svg.append('g');
      this.leftAxisLabel = this.svg.append('g');
      this.rightAxisLabel = this.svg.append('g');
      this.bottomAxisLabel = this.svg.append('g');
      this.plotArea = this.svg.append('g');
      this.areaLayer = this.svg.append('g');
      this.lineLayer = this.svg.append('g');
      this.barLayer = this.svg.append('g');
      this.labelLayer = this.svg.append('g');
      this.symbolLayer = this.svg.append('g');
      this.trackingLineLayer = this.svg.append('g');
      this.trackingLineLayer.append('line').attr('class', 'tracking-line');
      this.tooltip = new WebsyDesigns.WebsyChartTooltip(this.svg);
      this.eventLayer = this.svg.append('g').append('rect');
      this.eventLayer.on('mouseout', this.handleEventMouseOut.bind(this)).on('mousemove', this.handleEventMouseMove.bind(this));
      this.render();
    }
  }, {
    key: "render",
    value: function render(options) {
      var _this20 = this;

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
          this.height = el.clientHeight;
          this.svg.attr('width', this.width).attr('height', this.height);
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


          this.plotWidth = this.width - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight;
          this.plotHeight = this.height - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom - this.options.margin.axisTop; // Translate the layers

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
            var tickDefinition;

            if (this.options.data.bottom.data) {
              if (this.options.data.bottom.scale === 'Time') {
                var diff = this.options.data.bottom.max.getTime() - this.options.data.bottom.min.getTime();
                var oneDay = 1000 * 60 * 60 * 24;

                if (diff < 7 * oneDay) {
                  tickDefinition = d3.timeDay.every(1);
                } else if (diff < 14 * oneDay) {
                  tickDefinition = d3.timeDay.every(2);
                } else if (diff < 21 * oneDay) {
                  tickDefinition = d3.timeDay.every(3);
                } else if (diff < 28 * oneDay) {
                  tickDefinition = d3.timeDay.every(4);
                } else if (diff < 60 * oneDay) {
                  tickDefinition = d3.timeDay.every(7);
                } else {
                  tickDefinition = d3.timeMonth.every(1);
                }
              } else {
                tickDefinition = this.options.data.bottom.ticks || Math.min(this.options.data.bottom.data.length, 5);
              }
            } else {
              tickDefinition = this.options.data.bottom.ticks || 5;
            }

            var bAxisFunc = d3.axisBottom(this.bottomAxis) // .ticks(this.options.data.bottom.ticks || Math.min(this.options.data.bottom.data.length, 5))
            .ticks(tickDefinition);

            if (this.options.data.bottom.formatter) {
              bAxisFunc.tickFormat(function (d) {
                return _this20.options.data.bottom.formatter(d);
              });
            }

            this.bottomAxisLayer.call(bAxisFunc);

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
              if (_this20.options.data.left.formatter) {
                d = _this20.options.data.left.formatter(d);
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

            if (this.options.margin.axisRight > 0) {
              this.rightAxisLayer.call(d3.axisRight(this.rightAxis).ticks(this.options.data.left.ticks || 5).tickFormat(function (d) {
                if (_this20.options.data.right.formatter) {
                  d = _this20.options.data.right.formatter(d);
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
              series.key = _this20.createIdentity();
            }

            if (!series.color) {
              series.color = _this20.options.colors[index % _this20.options.colors.length];
            }

            _this20["render".concat(series.type || 'bar')](series, index);

            _this20.renderLabels(series, index);
          });
        }
      }
    }
  }, {
    key: "renderarea",
    value: function renderarea(series, index) {
      var _this21 = this;

      /* global d3 series index */
      var drawArea = function drawArea(xAxis, yAxis, curveStyle) {
        return d3.area().x(function (d) {
          return _this21[xAxis](_this21.parseX(d.x.value));
        }).y0(function (d) {
          return _this21[yAxis](0);
        }).y1(function (d) {
          return _this21[yAxis](isNaN(d.y.value) ? 0 : d.y.value);
        }).curve(d3[curveStyle || _this21.options.curveStyle]);
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
      .style('fill-opacity', series.opacity || 1);
    }
  }, {
    key: "renderbar",
    value: function renderbar(series, index) {
      /* global series index d3 */
      var xAxis = 'bottomAxis';
      var yAxis = 'leftAxis';
      var bars = this.barLayer.selectAll(".bar_".concat(series.key)).data(series.data);

      if (this.options.orientation === 'horizontal') {
        xAxis = 'leftAxis';
        yAxis = 'bottomAxis';
      }

      var barWidth = this[xAxis].bandwidth();

      function getBarHeight(d) {
        if (this.options.orientation === 'horizontal') {
          return barWidth;
        } else {
          return this[yAxis](d.y.value);
        }
      }

      function getBarWidth(d) {
        if (this.options.orientation === 'horizontal') {
          return this[yAxis](d.y.value);
        } else {
          return barWidth;
        }
      }

      function getBarX(d) {
        if (this.options.orientation === 'horizontal') {
          return 0;
        } else {
          return this[xAxis](this.parseX(d.x.value));
        }
      }

      function getBarY(d) {
        if (this.options.orientation === 'horizontal') {
          return this[xAxis](this.parseX(d.x.value));
        } else {
          return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value);
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
      /* global series index d3 */
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
        labels.attr('x', getLabelX.bind(this)).attr('y', getLabelY.bind(this)).attr('class', ".label_".concat(series.key)).style('font-size', "".concat(this.options.labelSize || this.options.fontSize, "px")).transition(this.transition).text(function (d) {
          return d.y.label || d.y.value;
        });
        labels.enter().append('text').attr('class', ".label_".concat(series.key)).attr('x', getLabelX.bind(this)).attr('y', getLabelY.bind(this)).attr('alignment-baseline', 'central').attr('text-anchor', this.options.orientation === 'horizontal' ? 'left' : 'middle').style('font-size', "".concat(this.options.labelSize || this.options.fontSize, "px")).text(function (d) {
          return d.y.label || d.y.value;
        }).each(function (d, i) {
          if (that.options.orientation === 'horizontal') {
            if (that.plotWidth - getLabelX.call(that, d) < this.getComputedTextLength()) {
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
          return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value) + 4;
        } else {
          return this[xAxis](this.parseX(d.x.value)) + this[xAxis].bandwidth() / 2;
        }
      }

      function getLabelY(d) {
        if (this.options.orientation === 'horizontal') {
          return this[xAxis](this.parseX(d.x.value)) + this[xAxis].bandwidth() / 2;
        } else {
          return this[yAxis](isNaN(d.y.value) ? 0 : d.y.value) - 4;
        }
      }
    }
  }, {
    key: "renderline",
    value: function renderline(series, index) {
      var _this22 = this;

      /* global series index d3 */
      var drawLine = function drawLine(xAxis, yAxis, curveStyle) {
        return d3.line().x(function (d) {
          return _this22[xAxis](_this22.parseX(d.x.value));
        }).y(function (d) {
          return _this22[yAxis](isNaN(d.y.value) ? 0 : d.y.value);
        }).curve(d3[curveStyle || _this22.options.curveStyle]);
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
      var _this23 = this;

      /* global d3 series index series.key */
      var drawSymbol = function drawSymbol(size) {
        return d3.symbol() // .type(d => {
        //   return d3.symbols[0]
        // })
        .size(size || _this23.options.symbolSize);
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
        return "translate(".concat(_this23[xAxis](_this23.parseX(d.x.value)), ", ").concat(_this23[yAxis](isNaN(d.y.value) ? 0 : d.y.value), ")");
      }); // Enter

      symbols.enter().append('path').attr('d', function (d) {
        return drawSymbol(d.y.size || series.symbolSize)(d);
      }) // .transition(this.transition)
      .attr('fill', 'white').attr('stroke', series.color).attr('class', function (d) {
        return "symbol symbol_".concat(series.key);
      }).attr('transform', function (d) {
        return "translate(".concat(_this23[xAxis](_this23.parseX(d.x.value)), ", ").concat(_this23[yAxis](isNaN(d.y.value) ? 0 : d.y.value), ")");
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
        this.svg.attr('width', this.width).attr('height', this.height); // Define the plot height  
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
/* global L */


var WebsyMap = /*#__PURE__*/function () {
  function WebsyMap(elementId, options) {
    _classCallCheck(this, WebsyMap);

    var DEFAULTS = {
      tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      disablePan: false,
      disableZoom: false,
      markerSize: 10,
      useClustering: false,
      maxMarkerSize: 50,
      minMarkerSize: 20
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

      el.addEventListener('click', this.handleClick.bind(this));
      this.map = L.map(this.elementId, mapOptions);
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
      var _this24 = this;

      var el = document.getElementById("".concat(this.options.elementId, "_map"));
      var t = L.tileLayer(this.options.tileUrl, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      if (this.geo) {
        this.map.removeLayer(this.geo);
      }

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

      this.markers = [];

      if (this.cluster) {
        this.map.removeLayer(this.cluster);
      } // this.cluster = L.markerClusterGroup({
      //   iconCreateFunction: cluster => {
      //     let markerSize = this.options.minMarkerSize + ((this.options.maxMarkerSize - this.options.minMarkerSize) * (cluster.getChildCount() / this.data.length))
      //     console.log(this.data.length, cluster.getChildCount(), markerSize)
      //     return L.divIcon({
      //       html: `
      //         <div
      //           class='simple-marker'
      //           style='
      //             height: ${markerSize}px;
      //             width: ${markerSize}px;
      //             margin-top: -${markerSize / 2}px;
      //             margin-left: -${markerSize / 2}px;
      //             text-align: center;
      //             line-height: ${markerSize}px;
      //           '>
      //           ${cluster.getChildCount()}
      //         </div>
      //       `
      //     })
      //   }
      // })


      this.data = []; // this.data.filter(d => d.Latitude.qNum !== 0 && d.Longitude.qNum !== 0)    

      this.data.forEach(function (r) {
        // console.log(r)
        if (r.Latitude.qNum !== 0 && r.Longitude.qNum !== 0) {
          var markerOptions = {};

          if (_this24.options.simpleMarker === true) {
            markerOptions.icon = L.divIcon({
              className: 'simple-marker'
            });
          }

          if (_this24.options.markerUrl) {
            markerOptions.icon = L.icon({
              iconUrl: _this24.options.markerUrl
            });
          }

          markerOptions.data = r;
          var m = L.marker([r.Latitude.qText, r.Longitude.qText], markerOptions);
          m.on('click', _this24.handleMapClick.bind(_this24));

          if (_this24.options.useClustering === false) {
            m.addTo(_this24.map);
          }

          _this24.markers.push(m);

          if (_this24.options.useClustering === true) {
            _this24.cluster.addLayer(m);
          }
        }
      });

      if (this.data.length > 0) {
        el.classList.remove('hidden');

        if (this.options.useClustering === true) {
          this.map.addLayer(this.cluster);
        }

        var g = L.featureGroup(this.markers);
        this.map.fitBounds(g.getBounds());
        this.map.invalidateSize();
      } else if (this.geo) {
        this.map.fitBounds(this.geo.getBounds());
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
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        onLeft: false
      };
      var fO = this.tooltipLayer.selectAll('foreignObject').attr('width', "".concat(position.width, "px")) // .attr('height', `${position.height}px`)
      .attr('y', "0px").classed('left', position.onLeft);
      this.tooltipContent.classed('active', true).style('width', "".concat(position.width, "px")) // .style('left', '0px')
      .style('top', "0px").html("<div class='title'>".concat(title, "</div>").concat(html));

      if (navigator.userAgent.indexOf('Chrome') === -1 && navigator.userAgent.indexOf('Safari') !== -1) {
        fO.attr('x', '0px');
        this.tooltipContent.style('left', "".concat(position.top, "px")).style('top', "".concat(position.top, "px")); // that.tooltipLayer.selectAll('foreignObject').transform(that.margin.left, that.margin.top)
      } else {
        fO.attr('x', "".concat(position.left, "px"));
        this.tooltipContent.style('left', '0px');
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
  }
};
var WebsyDesigns = {
  WebsyPopupDialog: WebsyPopupDialog,
  WebsyLoadingDialog: WebsyLoadingDialog,
  WebsyNavigationMenu: WebsyNavigationMenu,
  WebsyForm: WebsyForm,
  WebsyDatePicker: WebsyDatePicker,
  WebsyDropdown: WebsyDropdown,
  WebsyResultList: WebsyResultList,
  WebsyTemplate: WebsyTemplate,
  WebsyPubSub: WebsyPubSub,
  WebsyRouter: WebsyRouter,
  WebsyTable: WebsyTable,
  WebsyChart: WebsyChart,
  WebsyChartTooltip: WebsyChartTooltip,
  WebsyMap: WebsyMap,
  WebsyKPI: WebsyKPI,
  WebsyPDFButton: WebsyPDFButton,
  PDFButton: WebsyPDFButton,
  APIService: APIService,
  WebsyUtils: WebsyUtils
};
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
