"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* global  WebsyPopupDialog WebsyLoadingDialog */
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

      html += "\n\t\t\t</div>\t\n\t\t";
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

var WebsyDesigns = {
  WebsyPopupDialog: WebsyPopupDialog,
  WebsyLoadingDialog: WebsyLoadingDialog
};
