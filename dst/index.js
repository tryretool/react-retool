"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./retool.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Retool = /*#__PURE__*/function (_React$Component) {
  _inherits(Retool, _React$Component);

  var _super = _createSuper(Retool);

  function Retool(props) {
    var _this;

    _classCallCheck(this, Retool);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "startListening", function () {
      if (_this.iframe) {
        window.addEventListener('message', function (e) {
          return _this.handle(e);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "startWatchers", function () {
      var watcherKeys = Object.keys(_this.state.elementWatchers);

      for (var i = 0; i < watcherKeys.length; i++) {
        var key = watcherKeys[i];
        var watcher = _this.state.elementWatchers[key];
        var selector = watcher.selector;
        var node = document.querySelector(selector);
        var value = node === null || node === void 0 ? void 0 : node.textContent;

        if (value !== watcher.prevValue) {
          watcher.prevValue = value;
          watcher.iframe.contentWindow.postMessage({
            type: 'PARENT_WINDOW_RESULT',
            result: value,
            id: watcher.queryId,
            pageName: watcher.pageName
          }, '*');
        }
      }

      setTimeout(_this.startWatchers, 100);
    });

    _defineProperty(_assertThisInitialized(_this), "createOrReplaceWatcher", function (selector, pageName, queryId) {
      var watcherId = pageName + '-' + queryId;

      var watchers = _objectSpread({}, _this.state.elementWatchers);

      watchers[watcherId] = {
        iframe: _this.iframe,
        selector: selector,
        pageName: pageName,
        queryId: queryId,
        prevValue: null
      };

      _this.setState({
        elementWatchers: watchers
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handle", function (event) {
      if (!_this.iframe.contentWindow) return;
      var node;

      if (event.data.type === 'PARENT_WINDOW_QUERY') {
        var _node;

        node = document.querySelector(event.data.selector);

        _this.createOrReplaceWatcher(event.data.selector, event.data.pageName, event.data.id);

        _this.iframe.contentWindow.postMessage({
          type: 'PARENT_WINDOW_RESULT',
          result: (_node = node) === null || _node === void 0 ? void 0 : _node.textContent,
          id: event.data.id,
          pageName: event.data.pageName
        }, '*');
      }

      if (event.data.type === 'PARENT_WINDOW_PREVIEW_QUERY') {
        var _node2;

        node = document.querySelector(event.data.selector);

        _this.iframe.contentWindow.postMessage({
          type: 'PARENT_WINDOW_PREVIEW_RESULT',
          result: (_node2 = node) === null || _node2 === void 0 ? void 0 : _node2.textContent,
          id: event.data.id
        }, '*');
      }
    });

    if (!_this.props.url) throw new Error('Please pass a url into the Retool component.');
    _this.state = {
      url: props.url,
      elementWatchers: {}
    };
    return _this;
  }

  _createClass(Retool, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.startListening();
      this.startWatchers();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react.default.createElement("iframe", {
        frameBorder: "none",
        src: this.state.url,
        ref: function ref(e) {
          _this2.iframe = e;
        }
      });
    }
  }]);

  return Retool;
}(_react.default.Component);

var _default = Retool;
exports.default = _default;