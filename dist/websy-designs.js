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
          html += "\n          <div id='".concat(this.elementId, "_menuIcon' class='websy-menu-icon'>\n            <svg width=\"40\" height=\"40\">              \n              <rect x=\"0\" y=\"0\" width=\"40\" height=\"4\" rx=\"2\"></rect>\n              <rect x=\"0\" y=\"12\" width=\"40\" height=\"4\" rx=\"2\"></rect>\n              <rect x=\"0\" y=\"24\" width=\"40\" height=\"4\" rx=\"2\"></rect>\n            </svg>\n            </div>\n          <div class='logo ").concat(this.options.logo.classes && this.options.logo.classes.join(' '), "'><img src='").concat(this.options.logo.url, "'></img></div>\n          <div id='").concat(this.elementId, "_mask' class='websy-menu-mask'></div>\n          <div id=\"").concat(this.elementId, "_menuContainer\" class=\"websy-menu-block-container\">\n        ");
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
/* global WebsyDesigns FormData */


var WebsyForm = /*#__PURE__*/function () {
  function WebsyForm(elementId, options) {
    _classCallCheck(this, WebsyForm);

    var defaults = {
      submit: {
        text: 'Save',
        classes: ''
      },
      clearAfterSave: false,
      fields: []
    };
    this.options = _extends(defaults, {}, {// defaults go here
    }, options);

    if (!elementId) {
      console.log('No element Id provided');
      return;
    }

    this.apiService = new WebsyDesigns.APIService(this.options.url);
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
    key: "render",
    value: function render() {
      var el = document.getElementById(this.elementId);

      if (el) {
        var html = "\n        <form id=\"".concat(this.elementId, "Form\">\n      ");
        this.options.fields.forEach(function (f) {
          html += "\n          ".concat(f.label ? "<label for=\"".concat(f.field, "\">").concat(f.label, "</label>") : '', "\n          <input class=\"websy-input ").concat(f.classes, "\" name=\"").concat(f.field, "\" placeholder=\"").concat(f.placeholder || '', "\"/>\n        ");
        });
        html += "          \n        </form>\n        <button class=\"websy-btn submit ".concat(this.options.submit.classes, "\">").concat(this.options.submit.text || 'Save', "</button>\n      ");
        el.innerHTML = html;
      }
    }
  }, {
    key: "submitForm",
    value: function submitForm() {
      var _this = this;

      var formEl = document.getElementById("".concat(this.elementId, "Form"));
      var formData = new FormData(formEl);
      var data = {};
      var temp = new FormData(formEl);
      temp.forEach(function (value, key) {
        data[key] = value;
      });
      this.apiService.add('', data).then(function (result) {
        if (_this.options.clearAfterSave === true) {
          _this.render();
        }
      }, function (err) {
        return console.log(err);
      });
    }
  }]);

  return WebsyForm;
}();
/* global WebsyDesigns */


var WebsyResultList = /*#__PURE__*/function () {
  function WebsyResultList(elementId, options) {
    var _this2 = this;

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
        _this2.options.template = templateString;

        _this2.render();
      });
    } else {
      this.render();
    }
  }

  _createClass(WebsyResultList, [{
    key: "findById",
    value: function findById(id) {
      console.log('finding', id);

      for (var i = 0; i < this.rows.length; i++) {
        console.log(id, this.rows[i].id);

        if (this.rows[i].id === id) {
          return this.rows[i];
        }
      }

      return null;
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      var l = event.target.getAttribute('data-event');
      var id = event.target.getAttribute('data-id');

      if (event.target.classList.contains('clickable') && this.options.listeners.click[l]) {
        event.stopPropagation();
        this.options.listeners.click[l].call(this, event, this.rows[+id]);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.options.entity) {
        this.apiService.get(this.options.entity).then(function (results) {
          _this3.rows = results.rows;

          _this3.resize();
        });
      } else {
        this.resize();
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this4 = this;

      if (this.options.template) {
        var html = "";
        this.rows.forEach(function (row, ix) {
          var template = _this4.options.template;

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
        var el = document.getElementById(this.elementId);
        el.innerHTML = html;
      }
    }
  }, {
    key: "data",
    set: function set(d) {
      this.rows = d || [];
      this.render();
    }
  }, {
    key: "date",
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
        this.subscriptions[method](data);
      }
    }
  }, {
    key: "subscribe",
    value: function subscribe(method, fn) {
      if (!this.subscriptions[method]) {
        this.subscriptions[method] = fn;
      }
    }
  }]);

  return WebsyPubSub;
}();
/* global XMLHttpRequest */


var APIService = /*#__PURE__*/function () {
  function APIService(baseUrl) {
    _classCallCheck(this, APIService);

    this.baseUrl = baseUrl; // this.referrerPolicy = referrerPolicy || 'strict-origin-when-cross-origin'
  }

  _createClass(APIService, [{
    key: "add",
    value: function add(entity, data) {
      var url = this.buildUrl(entity);
      return this.run('POST', url, data);
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
    key: "run",
    value: function run(method, url, data) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json'); // xhr.setRequestHeader('Referrer-Policy', this.referrerPolicy)

        xhr.onload = function () {
          var response = xhr.responseText;

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
            resolve(response);
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
    }
  }]);

  return APIService;
}();

var WebsyDesigns = {
  WebsyPopupDialog: WebsyPopupDialog,
  WebsyLoadingDialog: WebsyLoadingDialog,
  WebsyNavigationMenu: WebsyNavigationMenu,
  WebsyForm: WebsyForm,
  WebsyResultList: WebsyResultList,
  WebsyPubSub: WebsyPubSub,
  APIService: APIService
};
