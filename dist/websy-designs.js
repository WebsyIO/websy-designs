"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
  WebsyResultList
  WebsyTable
  WebsyChart
  WebsyKPI
  WebsyPDFButton
  APIService
*/
var WebsyPopupDialog = /*#__PURE__*/function () {
  function WebsyPopupDialog(elementId, options) {
    _classCallCheck(this, WebsyPopupDialog);

    this.options = _extends({}, options);

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

        if (buttonInfo.preventClose !== true) {
          this.hide();
        }

        if (buttonInfo.fn) {
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
        this.options = _extends({}, options);
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
      orientation: 'horizontal'
    }, options);

    if (!elementId) {
      console.log('No element Id provided for Websy Menu');
      return;
    }

    var el = document.getElementById(elementId);

    if (el) {
      this.elementId = elementId;
      el.classList.add("websy-".concat(this.options.orientation, "-list-container"));

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

        if (this.options.logo) {
          html += "\n          <div id='".concat(this.elementId, "_menuIcon' class='websy-menu-icon'>\n            <svg viewbox=\"0 0 40 40\" width=\"40\" height=\"40\">              \n              <rect x=\"0\" y=\"0\" width=\"40\" height=\"4\" rx=\"2\"></rect>\n              <rect x=\"0\" y=\"12\" width=\"40\" height=\"4\" rx=\"2\"></rect>\n              <rect x=\"0\" y=\"24\" width=\"40\" height=\"4\" rx=\"2\"></rect>\n            </svg>\n            </div>\n          <div \n            class='logo ").concat(this.options.logo.classes && this.options.logo.classes.join(' ') || '', "'\n            ").concat(this.options.logo.attributes && this.options.logo.attributes.join(' '), "\n          >\n          <img src='").concat(this.options.logo.url, "'></img>\n          </div>\n          <div id='").concat(this.elementId, "_mask' class='websy-menu-mask'></div>\n          <div id=\"").concat(this.elementId, "_menuContainer\" class=\"websy-menu-block-container\">\n        ");
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
        html += "\n\t\t\t<li class='websy-".concat(this.options.orientation, "-list-item'>\n\t\t\t\t<div class='websy-menu-header ").concat(items[i].classes && items[i].classes.join(' '), " ").concat(selected, " ").concat(active, "' \n\t\t\t\t\t\t id='").concat(this.elementId, "_").concat(currentBlock, "_label' \n\t\t\t\t\t\t data-id='").concat(currentBlock, "' \n\t\t\t\t\t\t data-popout-id='").concat(level > 1 ? block : currentBlock, "'\n\t\t\t\t\t\t data-text='").concat(items[i].text, "'\n\t\t\t\t\t\t style='padding-left: ").concat(level * this.options.menuHPadding, "px'\n\t\t\t\t\t\t ").concat(items[i].attributes && items[i].attributes.join(' '), "\n        >\n      ");

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
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('submit')) {
        this.submitForm();
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
      var _this2 = this;

      var el = document.getElementById(this.elementId);

      if (el) {
        var html = "\n        <form id=\"".concat(this.elementId, "Form\">\n      ");
        this.options.fields.forEach(function (f) {
          if (f.type === 'longtext') {
            html += "\n            ".concat(f.label ? "<label for=\"".concat(f.field, "\">").concat(f.label, "</label>") : '', "\n            <textarea\n              id=\"").concat(_this2.elementId, "_input_").concat(f.field, "\"\n              ").concat(f.required === true ? 'required' : '', " \n              placeholder=\"").concat(f.placeholder || '', "\"\n              name=\"").concat(f.field, "\" \n              class=\"websy-input websy-textarea ").concat(f.classes, "\"\n            ></textarea>\n          ");
          } else {
            html += "\n            ".concat(f.label ? "<label for=\"".concat(f.field, "\">").concat(f.label, "</label>") : '', "\n            <input \n              id=\"").concat(_this2.elementId, "_input_").concat(f.field, "\"\n              ").concat(f.required === true ? 'required' : '', " \n              type=\"").concat(f.type || 'text', "\" \n              class=\"websy-input ").concat(f.classes, "\" \n              name=\"").concat(f.field, "\" \n              placeholder=\"").concat(f.placeholder || '', "\"\n              value=\"").concat(f.value || '', "\"\n              oninvalidx=\"this.setCustomValidity('").concat(f.invalidMessage || 'Please fill in this field.', "')\"\n            />\n          ");
          }
        });
        html += "          \n        </form>\n      ";

        if (this.options.useRecaptcha === true) {
          html += "\n          <div id='".concat(this.elementId, "_recaptcha'></div>\n        ");
        }

        html += "\n        <button class=\"websy-btn submit ".concat(this.options.submit.classes, "\">").concat(this.options.submit.text || 'Save', "</button>\n      ");
        el.innerHTML = html;

        if (this.options.useRecaptcha === true && typeof grecaptcha !== 'undefined') {
          this.recaptchaReady();
        }
      }
    }
  }, {
    key: "submitForm",
    value: function submitForm() {
      var _this3 = this;

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

            if (_this3.options.url) {
              _this3.apiService.add(_this3.options.url, data).then(function (result) {
                if (_this3.options.clearAfterSave === true) {
                  // this.render()
                  formEl.reset();
                }

                _this3.options.onSuccess.call(_this3, result);
              }, function (err) {
                console.log('Error submitting form data:', err);

                _this3.options.onError.call(_this3, err);
              });
            } else if (_this3.options.submitFn) {
              _this3.options.submitFn(data);

              if (_this3.options.clearAfterSave === true) {
                // this.render()
                formEl.reset();
              }
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
      var _this4 = this;

      if (!this.options.fields) {
        this.options.fields = [];
      }

      var _loop = function _loop(key) {
        _this4.options.fields.forEach(function (f) {
          if (f.field === key) {
            f.value = d[key];
            var el = document.getElementById("".concat(_this4.elementId, "_input_").concat(f.field));
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

    var DEFAULTS = {
      defaultRange: 2,
      ranges: [{
        label: 'Today',
        range: [new Date()]
      }, {
        label: 'Yesterday',
        range: [new Date()]
      }, {
        label: 'Last 7 Days',
        range: [new Date()]
      }, {
        label: 'This Month',
        range: [new Date()]
      }, {
        label: 'This Year',
        range: [new Date()]
      }]
    };
    this.options = _extends({}, DEFAULTS, options);
    this.selectedRange = this.options.defaultRange || 0;

    if (!elementId) {
      console.log('No element Id provided');
      return;
    }

    var el = document.getElementById(elementId);

    if (el) {
      this.elementId = elementId;
      el.addEventListener('click', this.handleClick.bind(this));
      this.render();
    } else {
      console.log('No element found with Id', elementId);
    }
  }

  _createClass(WebsyDatePicker, [{
    key: "close",
    value: function close() {
      var maskEl = document.getElementById("".concat(this.elementId, "_mask"));
      var contentEl = document.getElementById("".concat(this.elementId, "_content"));
      maskEl.classList.remove('active');
      contentEl.classList.remove('active');
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('websy-date-picker-header')) {
        this.open();
      } else if (event.target.classList.contains('websy-date-picker-mask')) {
        this.close();
      } else if (event.target.classList.contains('websy-date-picker-range')) {
        var index = event.target.getAttribute('data-index');
        this.updateRange(index);
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
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      if (!this.elementId) {
        console.log('No element Id provided for Websy Loading Dialog');
        return;
      }

      var el = document.getElementById(this.elementId);
      var html = "\n\t\t\t<div class='websy-date-picker-container'>\n        <div class='websy-date-picker-header'>\n          <span id='".concat(this.elementId, "_selectedRange'>").concat(this.options.ranges[this.selectedRange].label, "</span>\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z\"/></svg>\n        </div>\n        <div id='").concat(this.elementId, "_mask' class='websy-date-picker-mask'></div>\n        <div id='").concat(this.elementId, "_content' class='websy-date-picker-content'>\n          <div class='websy-date-picker-ranges'>\n            <ul>\n              ").concat(this.options.ranges.map(function (r, i) {
        return "\n                <li data-index='".concat(i, "' class='websy-date-picker-range ").concat(i === _this5.selectedRange ? 'active' : '', "'>").concat(r.label, "</li>\n              ");
      }).join(''), "\n            </ul>\n          </div><!--\n          --><div class='websy-date-picker-custom'></div>\n        </div>\n      </div>\n    ");
      el.innerHTML = html;
    }
  }, {
    key: "updateRange",
    value: function updateRange(index) {
      if (index === this.selectedRange) {
        return;
      }

      this.selectedRange = index;
      var range = this.options.ranges[index];
      var el = document.getElementById(this.elementId);
      var labelEl = document.getElementById("".concat(this.elementId, "_selectedRange"));
      var rangeEls = el.querySelectorAll(".websy-date-picker-range");

      for (var i = 0; i < rangeEls.length; i++) {
        rangeEls[i].classList.remove('active');

        if (i === index) {
          rangeEls[i].classList.add('active');
        }
      }

      if (labelEl) {
        labelEl.innerHTML = range.label;

        if (this.options.onRangeChanged) {
          this.options.onRangeChanged(range);
        }

        this.close();
      }
    }
  }]);

  return WebsyDatePicker;
}();

var WebsyDropdown = /*#__PURE__*/function () {
  function WebsyDropdown(elementId, options) {
    _classCallCheck(this, WebsyDropdown);

    var DEFAULTS = {
      multiSelect: false,
      allowClear: true,
      style: 'plain',
      items: [],
      label: '',
      minSearchCharacters: 2
    };
    this.options = _extends({}, DEFAULTS, options);
    this.selectedItems = [];

    if (!elementId) {
      console.log('No element Id provided');
      return;
    }

    var el = document.getElementById(elementId);

    if (el) {
      this.elementId = elementId;
      el.addEventListener('click', this.handleClick.bind(this));
      el.addEventListener('keyup', this.handleKeyUp.bind(this));
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
      console.log('keyup', event);

      if (event.target.classList.contains('websy-dropdown-search')) {
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
            }
          } else {
            if (this.options.onSearch) {
              this.options.onSearch(event.target.value);
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
    key: "open",
    value: function open(options) {
      var override = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var maskEl = document.getElementById("".concat(this.elementId, "_mask"));
      var contentEl = document.getElementById("".concat(this.elementId, "_content"));
      maskEl.classList.add('active');
      contentEl.classList.add('active');

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
      var _this6 = this;

      if (!this.elementId) {
        console.log('No element Id provided for Websy Dropdown');
        return;
      }

      var el = document.getElementById(this.elementId);
      var html = "\n      <div class='websy-dropdown-container ".concat(this.options.disableSearch !== true ? 'with-search' : '', "'>\n        <div id='").concat(this.elementId, "_header' class='websy-dropdown-header ").concat(this.selectedItems.length === 1 ? 'one-selected' : '', "'>\n          <span class='websy-dropdown-header-label'>").concat(this.options.label, "</span>\n          <span class='websy-dropdown-header-value' id='").concat(this.elementId, "_selectedItems'>").concat(this.selectedItems.map(function (s) {
        return _this6.options.items[s].label;
      }).join(','), "</span>\n          <svg class='arrow' xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z\"/></svg>\n          <svg class='clear' xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><title>ionicons-v5-l</title><line x1=\"368\" y1=\"368\" x2=\"144\" y2=\"144\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/><line x1=\"368\" y1=\"144\" x2=\"144\" y2=\"368\" style=\"fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px\"/></svg>\n        </div>\n        <div id='").concat(this.elementId, "_mask' class='websy-dropdown-mask'></div>\n        <div id='").concat(this.elementId, "_content' class='websy-dropdown-content'>\n    ");

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
      var _this7 = this;

      var html = this.options.items.map(function (r, i) {
        return "\n      <li data-index='".concat(i, "' class='websy-dropdown-item ").concat(_this7.selectedItems.indexOf(i) !== -1 ? 'active' : '', "'>").concat(r.label, "</li>\n    ");
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
      var el = document.getElementById(this.elementId);
      var headerEl = document.getElementById("".concat(this.elementId, "_header"));
      var labelEl = document.getElementById("".concat(this.elementId, "_selectedItems"));
      var itemEls = el.querySelectorAll(".websy-dropdown-item");

      for (var i = 0; i < itemEls.length; i++) {
        itemEls[i].classList.remove('active');

        if (this.selectedItems.indexOf(i) !== -1) {
          itemEls[i].classList.add('active');
        }
      }

      if (headerEl) {
        headerEl.classList.remove('one-selected');
        headerEl.classList.remove('multi-selected');

        if (this.selectedItems.length === 1) {
          headerEl.classList.add('one-selected');
        } else if (this.selectedItems.length > 1) {
          headerEl.classList.add('multi-selected');
        }
      }

      if (labelEl) {
        if (this.selectedItems.length === 1) {
          labelEl.innerHTML = item.label;
        } else if (this.selectedItems.length > 1) {
          labelEl.innerHTML = "".concat(this.selectedItems.length, " selected");
        } else {
          labelEl.innerHTML = '';
        }
      }
    }
  }, {
    key: "updateSelected",
    value: function updateSelected(index) {
      if (typeof index !== 'undefined' && index !== null) {
        if (this.selectedItems.indexOf(index) !== -1) {
          return;
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

      this.close();
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
    var _this8 = this;

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
        _this8.options.template = templateString;

        _this8.render();
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
      var _this9 = this;

      var startIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var html = "";

      if (this.options.template) {
        if (d.length > 0) {
          d.forEach(function (row, ix) {
            var template = "".concat(ix > 0 ? '-->' : '').concat(_this9.options.template).concat(ix < d.length - 1 ? '<!--' : ''); // find conditional elements

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
      var _this10 = this;

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
              if (_this10.rows[+id]) {
                p = _this10.rows[+id][p];
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
      var _this11 = this;

      if (this.options.entity) {
        this.apiService.get(this.options.entity).then(function (results) {
          _this11.rows = results.rows;

          _this11.resize();
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
      } // console.log(`${this.baseUrl}/${entity}${id ? `/${id}` : ''}`)


      return "".concat(this.baseUrl, "/").concat(entity).concat(query.length > 0 ? "?where=".concat(query.join(';')) : '');
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
        console.log('using this');

        xhr.onload = function () {
          if (xhr.status === 401) {
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
    var _this12 = this;

    _classCallCheck(this, WebsyPDFButton);

    var DEFAULTS = {
      classes: [],
      wait: 0
    };
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    this.service = new WebsyDesigns.APIService('pdf');
    var el = document.getElementById(this.elementId);

    if (el) {
      el.addEventListener('click', this.handleClick.bind(this));

      if (options.html) {
        el.innerHTML = options.html;
      } else {
        el.innerHTML = "\n          <form style='display: none;' id='".concat(this.elementId, "_form' action='/pdf' method='POST'>\n            <input id='").concat(this.elementId, "_pdfHeader' value='' name='header'>\n            <input id='").concat(this.elementId, "_pdfHTML' value='' name='html'>\n            <input id='").concat(this.elementId, "_pdfFooter' value='' name='footer'>\n          </form>\n          <button class='websy-btn websy-pdf-button ").concat(this.options.classes.join(' '), "'>\n            Create PDF\n            <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                viewBox=\"0 0 184.153 184.153\" style=\"enable-background:new 0 0 184.153 184.153;\" xml:space=\"preserve\">\n              <g>\n                <g>\n                  <g>\n                    <path d=\"M129.318,0H26.06c-1.919,0-3.475,1.554-3.475,3.475v177.203c0,1.92,1.556,3.475,3.475,3.475h132.034\n                      c1.919,0,3.475-1.554,3.475-3.475V34.131C161.568,22.011,140.771,0,129.318,0z M154.62,177.203H29.535V6.949h99.784\n                      c7.803,0,25.301,18.798,25.301,27.182V177.203z\"/>\n                    <path d=\"M71.23,76.441c15.327,0,27.797-12.47,27.797-27.797c0-15.327-12.47-27.797-27.797-27.797\n                      c-15.327,0-27.797,12.47-27.797,27.797C43.433,63.971,55.902,76.441,71.23,76.441z M71.229,27.797\n                      c11.497,0,20.848,9.351,20.848,20.847c0,0.888-0.074,1.758-0.183,2.617l-18.071-2.708L62.505,29.735\n                      C65.162,28.503,68.112,27.797,71.229,27.797z M56.761,33.668l11.951,19.869c0.534,0.889,1.437,1.49,2.462,1.646l18.669,2.799\n                      c-3.433,6.814-10.477,11.51-18.613,11.51c-11.496,0-20.847-9.351-20.847-20.847C50.381,42.767,52.836,37.461,56.761,33.668z\"/>\n                    <rect x=\"46.907\" y=\"90.339\" width=\"73.058\" height=\"6.949\"/>\n                    <rect x=\"46.907\" y=\"107.712\" width=\"48.644\" height=\"6.949\"/>\n                    <rect x=\"46.907\" y=\"125.085\" width=\"62.542\" height=\"6.949\"/>\n                  </g>\n                </g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              <g>\n              </g>\n              </svg>\n          </button>          \n          <div id='").concat(this.elementId, "_loader'></div>\n          <div id='").concat(this.elementId, "_popup'></div>\n        ");
        this.loader = new WebsyDesigns.WebsyLoadingDialog("".concat(this.elementId, "_loader"), {
          classes: ['global-loader']
        });
        this.popup = new WebsyDesigns.WebsyPopupDialog("".concat(this.elementId, "_popup"));
        var formEl = document.getElementById("".concat(this.elementId, "_form"));

        if (formEl) {
          formEl.addEventListener('load', function () {
            _this12.loader.hide();
          });
        }
      }
    }
  }

  _createClass(WebsyPDFButton, [{
    key: "handleClick",
    value: function handleClick(event) {
      var _this13 = this;

      if (event.target.classList.contains('websy-pdf-button')) {
        this.loader.show();
        setTimeout(function () {
          if (_this13.options.targetId) {
            var el = document.getElementById(_this13.options.targetId);

            if (el) {
              var pdfData = {
                options: {}
              };

              if (_this13.options.pdfOptions) {
                pdfData.options = _extends({}, _this13.options.pdfOptions);
              }

              if (_this13.options.header) {
                if (_this13.options.header.elementId) {
                  var headerEl = document.getElementById(_this13.options.header.elementId);

                  if (headerEl) {
                    pdfData.header = headerEl.outerHTML;

                    if (_this13.options.header.css) {
                      pdfData.options.headerCSS = _this13.options.header.css;
                    }
                  }
                } else {
                  pdfData.header = _this13.options.header;
                }
              }

              if (_this13.options.footer) {
                if (_this13.options.footer.elementId) {
                  var footerEl = document.getElementById(_this13.options.footer.elementId);

                  if (footerEl) {
                    pdfData.footer = footerEl.outerHTML;

                    if (_this13.options.footer.css) {
                      pdfData.options.footerCSS = _this13.options.footer.css;
                    }
                  }
                } else {
                  pdfData.footer = _this13.options.footer;
                }
              }

              pdfData.html = el.outerHTML;
              document.getElementById("".concat(_this13.elementId, "_pdfHeader")).value = pdfData.header;
              document.getElementById("".concat(_this13.elementId, "_pdfHTML")).value = pdfData.html;
              document.getElementById("".concat(_this13.elementId, "_pdfFooter")).value = pdfData.footer;
              document.getElementById("".concat(_this13.elementId, "_form")).submit(); // this.service.add('', pdfData).then(response => {

              _this13.loader.hide(); //   // const blob = new Blob([response], {type: 'application/pdf'})
              //   this.popup.show({
              //     message: `
              //       <div class='text-center'>
              //         <div>Your file is ready to download</div>
              //         <a href='/pdf' target='_blank'>Download</a>
              //     `,
              //     mask: true
              //   })
              //   console.log(response)
              // }, err => {
              //   console.error(err)
              // })

            }
          }
        }, this.options.wait);
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
    var el = document.getElementById(this.elementId);

    if (el) {
      el.innerHTML = "\n        <div class='websy-vis-table'>\n          <!--<div class=\"download-button\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M16 11h5l-9 10-9-10h5v-11h8v11zm1 11h-10v2h10v-2z\"/></svg>\n          </div>-->\n          <table>\n            <thead id=\"".concat(this.elementId, "_head\">\n            </thead>\n            <tbody id=\"").concat(this.elementId, "_body\">\n            </tbody>\n          </table>\n        </div>\n      ");
      el.addEventListener('click', this.handleClick.bind(this));
      var scrollEl = document.getElementById("".concat(this.elementId));
      scrollEl.addEventListener('scroll', this.handleScroll.bind(this));
      this.init();
    } else {
      console.error("No element found with ID ".concat(this.elementId));
    }
  }

  _createClass(WebsyTable, [{
    key: "appendRows",
    value: function appendRows(page) {
      var _this14 = this;

      var bodyHTML = '';

      if (page) {
        bodyHTML += page.qMatrix.map(function (r) {
          return '<tr>' + r.map(function (c, i) {
            if (_this14.columns[i].show !== false) {
              if (_this14.columns[i].showAsLink === true && c.qText.trim() !== '') {
                return "\n                <td data-view='".concat(c.qText, "' data-index='").concat(i, "' class='trigger-item ").concat(_this14.columns[i].selectOnClick === true ? 'selectable' : '', " ").concat(_this14.columns[i].classes || '', "' ").concat(_this14.columns[i].width ? 'style="width: ' + _this14.columns[i].width + '"' : '', ">").concat(_this14.columns[i].linkText || 'Link', "</td>\n              ");
              } else {
                var v = c.qNum === 'NaN' ? c.qText : c.qNum.toReduced(2, c.qText.indexOf('%') !== -1);

                if (c.qText && c.qText.indexOf('€') !== -1) {
                  v = v.toCurrency('€');
                }

                return "\n                <td class='".concat(_this14.columns[i].classes || '', "' ").concat(_this14.columns[i].width ? 'style="width: ' + _this14.columns[i].width + '"' : '', ">").concat(v, "</td>\n              ");
              }
            }
          }).join('') + '</tr>';
        }).join('');
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
    key: "getData",
    value: function getData(callbackFn) {
      var _this15 = this;

      if (this.busy === false) {
        this.busy = true;
        var pageDefs = [{
          qTop: this.rowCount,
          qLeft: 0,
          qWidth: this.dataWidth,
          qHeight: this.dataWidth * this.options.pageSize > 10000 ? Math.floor(10000 / this.dataWidth) : this.options.pageSize
        }];

        if (this.rowCount < this.layout.qHyperCube.qSize.qcy) {
          this.options.model.getHyperCubeData('/qHyperCubeDef', pageDefs).then(function (pages) {
            if (pages && pages[0]) {
              pages[0].qMatrix = pages[0].qMatrix.filter(function (r) {
                return r[0].qText !== '-';
              });

              _this15.layout.qHyperCube.qDataPages.push(pages[0]);

              _this15.rowCount += pages[0].qMatrix.length;
              _this15.busy = false;

              if (callbackFn) {
                callbackFn(pages[0]);
              }
            }
          });
        } else {
          this.busy = false;
        }
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event.target.classList.contains('download-button')) {
        window.viewManager.dataExportController.exportData(this.options.model);
      }

      if (event.target.classList.contains('sortable-column')) {
        var colIndex = +event.target.getAttribute('data-index');
        var dimIndex = +event.target.getAttribute('data-dim-index');
        var expIndex = +event.target.getAttribute('data-exp-index');
        var reverse = event.target.getAttribute('data-reverse') === 'true';
        var patchDefs = [{
          qOp: 'replace',
          qPath: '/qHyperCubeDef/qInterColumnSortOrder',
          qValue: JSON.stringify([colIndex])
        }];
        patchDefs.push({
          qOp: 'replace',
          qPath: "/qHyperCubeDef/".concat(dimIndex > -1 ? 'qDimensions' : 'qMeasures', "/").concat(dimIndex > -1 ? dimIndex : expIndex, "/qDef/qReverseSort"),
          qValue: JSON.stringify(reverse)
        });
        this.options.model.applyPatches(patchDefs); // .then(() => this.render())
      } else if (event.target.classList.contains('tableSearchIcon')) {
        var field = event.target.getAttribute('data-field');
        window.viewManager.views.global.objects[1].instance.show(field, {
          x: event.pageX,
          y: event.pageY
        }, function () {
          event.target.classList.remove('active');
        });
      } else if (event.target.classList.contains('selectable')) {
        var index = event.target.getAttribute('data-index');
        var data = this.layout.qHyperCube.qDataPages[0].qMatrix[index];
        this.options.model.selectHyperCubeValues('/qHyperCubeDef', 0, [data[0].qElemNumber], false);
      }
    }
  }, {
    key: "handleScroll",
    value: function handleScroll(event) {
      var _this16 = this;

      if (event.target.scrollTop / (event.target.scrollHeight - event.target.clientHeight) > 0.7) {
        this.getData(function (page) {
          _this16.appendRows(page);
        });
      }
    }
  }, {
    key: "init",
    value: function init() {
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      var _this17 = this;

      var bodyEl = document.getElementById("".concat(this.elementId, "_body"));
      bodyEl.innerHTML = '';
      this.rowCount = 0;
      this.options.model.getLayout().then(function (layout) {
        _this17.layout = layout;
        _this17.dataWidth = _this17.layout.qHyperCube.qSize.qcx;
        _this17.columnOrder = _this17.layout.qHyperCube.qColumnOrder;

        if (typeof _this17.columnOrder === 'undefined') {
          _this17.columnOrder = new Array(_this17.layout.qHyperCube.qSize.qcx).fill({}).map(function (r, i) {
            return i;
          });
        }

        _this17.columns = _this17.layout.qHyperCube.qDimensionInfo.concat(_this17.layout.qHyperCube.qMeasureInfo);
        _this17.columns = _this17.columns.map(function (c, i) {
          c.colIndex = _this17.columnOrder.indexOf(i);
          return c;
        });

        _this17.columns.sort(function (a, b) {
          return a.colIndex - b.colIndex;
        });

        _this17.activeSort = _this17.layout.qHyperCube.qEffectiveInterColumnSortOrder[0];

        _this17.getData(function (page) {
          _this17.update();
        });
      });
    }
  }, {
    key: "update",
    value: function update() {
      var _this18 = this;

      if (this.layout.allowDownload === true) {
        var el = document.getElementById(this.elementId);

        if (el) {
          el.classList.add('allow-download');
        } else {
          el.classList.remove('allow-download');
        }
      }

      var headHTML = '<tr>' + this.columns.map(function (c, i) {
        if (c.show !== false) {
          return "\n        <th ".concat(c.width ? 'style="width: ' + c.width + '"' : '', ">\n          <div class =\"tableHeader\">\n            <div class=\"leftSection\">\n              <div\n                class=\"tableHeaderField ").concat(['A', 'D'].indexOf(c.qSortIndicator) !== -1 ? 'sortable-column' : '', "\"\n                data-index=\"").concat(i, "\"\n                data-dim-index=\"").concat(i < _this18.layout.qHyperCube.qDimensionInfo.length ? i : -1, "\"\n                data-exp-index=\"").concat(i >= _this18.layout.qHyperCube.qDimensionInfo.length ? i - _this18.layout.qHyperCube.qDimensionInfo.length : -1, "\"\n                data-sort=\"").concat(c.qSortIndicator, "\"\n                data-reverse=\"").concat(_this18.activeSort === i && c.qReverseSort !== true, "\"\n              >\n                ").concat(c.qFallbackTitle, "\n              </div>\n            </div>\n            <div class=\"").concat(_this18.activeSort === i ? 'sortOrder' : '', " ").concat(c.qSortIndicator === 'A' ? 'ascending' : 'descending', "\"></div>\n            ").concat(c.searchable === true ? _this18.buildSearchIcon(c.qGroupFieldDefs[0]) : '', "\n          </div>\n        </th>\n        ");
        }
      }).join('') + '</tr>';
      var headEl = document.getElementById("".concat(this.elementId, "_head"));
      headEl.innerHTML = headHTML;
      this.appendRows(this.layout.qHyperCube.qDataPages[0]);
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
        axisRight: 0
      },
      orientation: 'vertical',
      colors: d3.schemeCategory10,
      transitionDuration: 650,
      curveStyle: 'curveLinear',
      lineWidth: 2,
      forceZero: true,
      fontSize: 14,
      symbolSize: 20
    };
    this.elementId = elementId;
    this.options = _extends({}, DEFAULTS, options);
    this.leftAxis = null;
    this.rightAxis = null;
    this.topAxis = null;
    this.bottomAxis = null;

    if (!elementId) {
      console.log('No element Id provided for Websy Menu');
      return;
    }

    var el = document.getElementById(this.elementId);

    if (el) {
      el.classList.add('websy-chart');

      if (typeof d3 === 'undefined') {
        console.error('d3 library has not been loaded');
      } else {
        this.svg = d3.select(el).append('svg');
        this.prep();
      }
    } else {
      console.error("No element found with ID ".concat(this.elementId));
    }
  }

  _createClass(WebsyChart, [{
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
    key: "prep",
    value: function prep() {
      this.leftAxisLayer = this.svg.append('g');
      this.rightAxisLayer = this.svg.append('g');
      this.bottomAxisLayer = this.svg.append('g');
      this.plotArea = this.svg.append('g');
      this.areaLayer = this.svg.append('g');
      this.lineLayer = this.svg.append('g');
      this.barLayer = this.svg.append('g');
      this.symbolLayer = this.svg.append('g');
      this.trackingLineLayer = this.svg.append('g');
      this.render();
    }
  }, {
    key: "render",
    value: function render(options) {
      var _this19 = this;

      /* global d3 options */
      if (typeof options !== 'undefined') {
        this.options = _extends({}, this.options, options);
      }

      if (!this.options.data) {// tell the user no data has been provided
      } else {
        this.transition = d3.transition().duration(this.options.transitionDuration);

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
            this.options.data.bottom.max = this.options.data.bottom.data.reduce(function (a, b) {
              return a.length > b.value.length ? a : b.value;
            }, '');
            this.options.data.bottom.min = this.options.data.bottom.data.reduce(function (a, b) {
              return a.length < b.value.length ? a : b.value;
            }, this.options.data.bottom.max);
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
          }

          console.log('longest left', this.longestLeft);
          console.log('longest right', this.longestRight); // establish the space needed for the various axes    

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
          }

          console.log('margins', this.options.margin); // Define the plot size

          this.plotWidth = this.width - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight;
          this.plotHeight = this.height - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom; // Translate the layers

          this.leftAxisLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")"));
          this.rightAxisLayer.attr('transform', "translate(".concat(this.options.margin.left + this.plotWidth + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")"));
          this.bottomAxisLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.plotHeight, ")"));
          this.plotArea.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")"));
          this.areaLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")"));
          this.lineLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")"));
          this.barLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")"));
          this.symbolLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")"));
          this.trackingLineLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")")); // Configure the bottom axis

          var bottomDomain = this.options.data.bottom.data.map(function (d) {
            return d.value;
          });
          this.bottomAxis = d3["scale".concat(this.options.data.bottom.scale || 'Band')]().domain(bottomDomain).padding(0).range([0, this.plotWidth]);

          if (this.options.margin.axisBottom > 0) {
            this.bottomAxisLayer.call(d3.axisBottom(this.bottomAxis));

            if (this.options.data.bottom.rotate) {
              this.bottomAxisLayer.selectAll('text').attr('transform', "rotate(".concat(this.options.data.bottom.rotate, ")")).style('text-anchor', 'end');
            }
          } // Configure the left axis


          var leftDomain = [];

          if (typeof this.options.data.left.min !== 'undefined' && typeof this.options.data.left.max !== 'undefined') {
            leftDomain = [this.options.data.left.min - this.options.data.left.min * 0.1, this.options.data.left.max * 1.1];

            if (this.options.forceZero === true) {
              leftDomain = [Math.min(0, this.options.data.left.min), this.options.data.left.max];
            }
          }

          this.leftAxis = d3["scale".concat(this.options.data.left.scale || 'Linear')]().domain(leftDomain).range([this.plotHeight, 0]);

          if (this.options.margin.axisLeft > 0) {
            this.leftAxisLayer.call(d3.axisLeft(this.leftAxis).tickFormat(function (d) {
              if (_this19.options.data.left.formatter) {
                d = _this19.options.data.left.formatter(d);
              }

              return d;
            }));
          } // Configure the right axis


          var rightDomain = [];

          if (typeof this.options.data.right.min !== 'undefined' && typeof this.options.data.right.max !== 'undefined') {
            rightDomain = [this.options.data.right.min - this.options.data.right.min * 0.15, this.options.data.right.max * 1.15];

            if (this.options.forceZero === true) {
              rightDomain = [Math.min(0, this.options.data.right.min - this.options.data.right.min * 0.15), this.options.data.right.max * 1.15];
            }
          }

          if (rightDomain.length > 0) {
            this.rightAxis = d3["scale".concat(this.options.data.right.scale || 'Linear')]().domain(rightDomain).range([this.plotHeight, 0]);

            if (this.options.margin.axisRight > 0) {
              this.rightAxisLayer.call(d3.axisRight(this.rightAxis).tickFormat(function (d) {
                if (_this19.options.data.right.formatter) {
                  d = _this19.options.data.right.formatter(d);
                }

                return d;
              }));
            }
          } // Draw the series data


          this.options.data.series.forEach(function (series, index) {
            if (!series.key) {
              series.key = _this19.createIdentity();
            }

            if (!series.color) {
              series.color = _this19.options.colors[index % _this19.options.colors.length];
            }

            _this19["render".concat(series.type || 'bar')](series, index);
          });
        }
      }
    }
  }, {
    key: "renderarea",
    value: function renderarea(series, index) {
      var _this20 = this;

      /* global d3 series index */
      var drawArea = function drawArea(xAxis, yAxis, curveStyle) {
        return d3.area().x(function (d) {
          return _this20[xAxis](d.x.value);
        }).y0(function (d) {
          return _this20[yAxis](0);
        }).y1(function (d) {
          return _this20[yAxis](isNaN(d.y.value) ? 0 : d.y.value);
        }).curve(d3[curveStyle || _this20.options.curveStyle]);
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
      .attr('fill', series.color).style('fill-opacity', 0).attr('stroke', 'transparent').transition(this.transition).style('fill-opacity', series.opacity || 1);
    }
  }, {
    key: "renderbar",
    value: function renderbar(series, index) {
      /* global */
    }
  }, {
    key: "renderline",
    value: function renderline(series, index) {
      var _this21 = this;

      /* global series index d3 */
      var drawLine = function drawLine(xAxis, yAxis, curveStyle) {
        return d3.line().x(function (d) {
          return _this21[xAxis](d.x.value);
        }).y(function (d) {
          return _this21[yAxis](isNaN(d.y.value) ? 0 : d.y.value);
        }).curve(d3[curveStyle || _this21.options.curveStyle]);
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
      .style('stroke-width', series.lineWidth || this.options.lineWidth).attr('stroke', series.color).attr('fill', 'transparent').transition(this.transition).style('stroke-opacity', 1);

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
      var _this22 = this;

      /* global d3 series index series.key */
      var drawSymbol = function drawSymbol(size) {
        return d3.symbol() // .type(d => {
        //   return d3.symbols[0]
        // })
        .size(size || _this22.options.symbolSize);
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
        return "translate(".concat(_this22[xAxis](d.x.value), ", ").concat(_this22[yAxis](d.y.value), ")");
      }); // Enter

      symbols.enter().append('path').attr('d', function (d) {
        return drawSymbol(d.y.size || series.symbolSize)(d);
      }).transition(this.transition).attr('fill', 'white').attr('stroke', series.color).attr('class', function (d) {
        return "symbol symbol_".concat(series.key);
      }).attr('transform', function (d) {
        return "translate(".concat(_this22[xAxis](d.x.value), ", ").concat(_this22[yAxis](d.y.value), ")");
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
        this.svg.attr('width', this.width).attr('height', this.height); // establish the space needed for the various axes
        // this.longestLeft = ([0]).concat(this.options.data.left.data.map(d => d.value.toString().length)).sort().pop()
        // this.longestRight = ([0]).concat(this.options.data.right.data.map(d => d.value.toString().length)).sort().pop()
        // this.longestBottom = ([0]).concat(this.options.data.bottom.data.map(d => d.value.toString().length)).sort().pop()
        // this.longestLeft = 5

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
        } // Define the plot height  


        this.plotWidth = this.width - this.options.margin.left - this.options.margin.right - this.options.margin.axisLeft - this.options.margin.axisRight;
        this.plotHeight = this.height - this.options.margin.top - this.options.margin.bottom - this.options.margin.axisBottom; // Translate the layers

        this.leftAxisLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")"));
        this.rightAxisLayer.attr('transform', "translate(".concat(this.options.margin.left + this.plotWidth + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")"));
        this.bottomAxisLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top + this.plotHeight, ")"));
        this.plotArea.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")"));
        this.areaLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")"));
        this.lineLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")"));
        this.barLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")"));
        this.symbolLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")"));
        this.trackingLineLayer.attr('transform', "translate(".concat(this.options.margin.left + this.options.margin.axisLeft, ", ").concat(this.options.margin.top, ")"));
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

var WebsyDesigns = {
  WebsyPopupDialog: WebsyPopupDialog,
  WebsyLoadingDialog: WebsyLoadingDialog,
  WebsyNavigationMenu: WebsyNavigationMenu,
  WebsyForm: WebsyForm,
  WebsyDatePicker: WebsyDatePicker,
  WebsyDropdown: WebsyDropdown,
  WebsyResultList: WebsyResultList,
  WebsyPubSub: WebsyPubSub,
  WebsyTable: WebsyTable,
  WebsyChart: WebsyChart,
  WebsyKPI: WebsyKPI,
  WebsyPDFButton: WebsyPDFButton,
  PDFButton: WebsyPDFButton,
  APIService: APIService
};
var GlobalPubSub = new WebsyPubSub('empty', {});

function recaptchaReadyCallBack() {
  GlobalPubSub.publish('recaptchaready');
} // need a way of initializing these based on environment variables


var rcs = document.createElement('script');
rcs.src = '//www.google.com/recaptcha/api.js?onload=recaptchaReadyCallBack';
document.getElementsByTagName('body')[0].appendChild(rcs);
var pps = document.createElement('script');
rcs.src = '//www.paypal.com/sdk/js';
document.getElementsByTagName('body')[0].appendChild(pps);
