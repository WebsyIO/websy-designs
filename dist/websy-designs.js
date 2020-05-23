"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* global  
  WebsyPopupDialog 
  WebsyLoadingDialog 
  WebsyNavigationMenu 
  WebsyPubSub
*/
var WebsyPopupDialog =
/*#__PURE__*/
function () {
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

var WebsyLoadingDialog =
/*#__PURE__*/
function () {
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
      el.classList.remove('active');
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
      el.classList.add('active');
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

var WebsyNavigationMenu =
/*#__PURE__*/
function () {
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
        this.toggleMobileMenu();
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
    value: function toggleMobileMenu() {
      var buttonEl = document.getElementById("".concat(this.elementId, "_menuIcon"));

      if (buttonEl) {
        buttonEl.classList.toggle('open');
      }

      var menuEl = document.getElementById("".concat(this.elementId, "_menuContainer"));

      if (menuEl) {
        menuEl.classList.toggle('open');
      }

      var maskEl = document.getElementById("".concat(this.elementId, "_mask"));

      if (maskEl) {
        maskEl.classList.toggle('open');
      }
    }
  }]);

  return WebsyNavigationMenu;
}();

var WebsyPubSub =
/*#__PURE__*/
function () {
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

var WebsyDesigns = {
  WebsyPopupDialog: WebsyPopupDialog,
  WebsyLoadingDialog: WebsyLoadingDialog,
  WebsyNavigationMenu: WebsyNavigationMenu,
  WebsyPubSub: WebsyPubSub
};
