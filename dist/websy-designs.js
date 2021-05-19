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
      var html = "\n\t\t\t<div class='websy-popup-dialog-container'>\n\t\t\t\t<div class='websy-popup-dialog'>\n\t\t";

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

      var buttonEl = document.getElementById("".concat(this.elementId, "_menuIcon"));

      if (buttonEl) {
        buttonEl.classList[method]('open');
      }

      var menuEl = document.getElementById("".concat(this.elementId, "_menuContainer"));

      if (menuEl) {
        menuEl.classList[method]('open');
      }

      var maskEl = document.getElementById("".concat(this.elementId, "_mask"));

      if (maskEl) {
        maskEl.classList[method]('open');
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
      label: ''
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
      this.render();
    } else {
      console.log('No element found with Id', elementId);
    }
  }

  _createClass(WebsyDropdown, [{
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
      if (event.target.classList.contains('websy-dropdown-header')) {
        this.open();
      } else if (event.target.classList.contains('websy-dropdown-mask')) {
        this.close();
      } else if (event.target.classList.contains('websy-dropdown-item')) {
        var index = event.target.getAttribute('data-index');
        this.updateSelected(+index);
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
      var _this6 = this;

      if (!this.elementId) {
        console.log('No element Id provided for Websy Loading Dialog');
        return;
      }

      var el = document.getElementById(this.elementId);
      console.log('rendering dropdown', this.selectedItems);
      console.log(this.selectedItems.length === 1 ? 'one-selected' : '');
      var html = "\n      <div class='websy-dropdown-container'>\n        <div id='".concat(this.elementId, "_header' class='websy-dropdown-header ").concat(this.selectedItems.length === 1 ? 'one-selected' : '', "'>\n          <span class='websy-dropdown-header-label'>").concat(this.options.label, "</span>\n          <span class='websy-dropdown-header-value' id='").concat(this.elementId, "_selectedItems'>").concat(this.selectedItems.map(function (s) {
        return _this6.options.items[s].label;
      }).join(','), "</span>\n          <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z\"/></svg>\n        </div>\n        <div id='").concat(this.elementId, "_mask' class='websy-dropdown-mask'></div>\n        <div id='").concat(this.elementId, "_content' class='websy-dropdown-content'>\n          <div class='websy-dropdown-items'>\n            <ul>\n              ").concat(this.options.items.map(function (r, i) {
        return "\n                <li data-index='".concat(i, "' class='websy-dropdown-item ").concat(_this6.selectedItems.indexOf(i) !== -1 ? 'active' : '', "'>").concat(r.label, "</li>\n              ");
      }).join(''), "\n            </ul>\n          </div><!--\n          --><div class='websy-dropdown-custom'></div>\n        </div>\n      </div>\n    ");
      el.innerHTML = html;
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
          console.log('we got here for some reason');
          labelEl.innerHTML = '';
        }

        if (this.options.onItemSelected) {
          this.options.onItemSelected(item, this.selectedItems, this.options.items);
        }

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
      this.render();
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
    var _this7 = this;

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
        _this7.options.template = templateString;

        _this7.render();
      });
    } else {
      this.render();
    }
  }

  _createClass(WebsyResultList, [{
    key: "appendData",
    value: function appendData(d) {
      this.rows = this.rows.concat(d);
      var html = this.buildHTML(d);
      var el = document.getElementById(this.elementId);
      el.innerHTML += html.replace(/\n/g, '');
    }
  }, {
    key: "buildHTML",
    value: function buildHTML(d) {
      var _this8 = this;

      var html = "";

      if (this.options.template) {
        if (d.length > 0) {
          d.forEach(function (row, ix) {
            var template = "".concat(ix > 0 ? '-->' : '').concat(_this8.options.template).concat(ix < d.length - 1 ? '<!--' : ''); // find conditional elements

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
                template = template.replace(m[0], "".concat(m[0], " data-id=").concat(ix));
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
      var _this9 = this;

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
              if (_this9.rows[+id]) {
                p = _this9.rows[+id][p];
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
      var _this10 = this;

      if (this.options.entity) {
        this.apiService.get(this.options.entity).then(function (results) {
          _this10.rows = results.rows;

          _this10.resize();
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
/* global XMLHttpRequest fetch */


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
            reject('401 - Unathorized');
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

var WebsyDesigns = {
  WebsyPopupDialog: WebsyPopupDialog,
  WebsyLoadingDialog: WebsyLoadingDialog,
  WebsyNavigationMenu: WebsyNavigationMenu,
  WebsyForm: WebsyForm,
  WebsyDatePicker: WebsyDatePicker,
  WebsyDropdown: WebsyDropdown,
  WebsyResultList: WebsyResultList,
  WebsyPubSub: WebsyPubSub,
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
