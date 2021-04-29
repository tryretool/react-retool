function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import './retool.css';

class Retool extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "startListening", () => {
      window.addEventListener('message', e => this.handle(e));
    });

    _defineProperty(this, "startWatchers", () => {
      var watcherKeys = Object.keys(this.state.elementWatchers);

      for (var i = 0; i < watcherKeys.length; i++) {
        var key = watcherKeys[i];
        var watcher = this.state.elementWatchers[key];
        var selector = watcher.selector;
        var node = document.querySelector(selector);
        var value = node?.textContent;

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

      setTimeout(this.startWatchers, 100);
    });

    _defineProperty(this, "createOrReplaceWatcher", (selector, pageName, queryId) => {
      var watcherId = pageName + '-' + queryId;
      var watchers = { ...this.state.elementWatchers
      };
      watchers[watcherId] = {
        iframe: this.iframe,
        selector: selector,
        pageName: pageName,
        queryId: queryId,
        prevValue: null
      };
      this.setState({
        elementWatchers: watchers
      });
    });

    _defineProperty(this, "handle", event => {
      if (!this.iframe.contentWindow) return;
      var node;

      if (event.data.type === 'PARENT_WINDOW_QUERY') {
        node = document.querySelector(event.data.selector);
        this.createOrReplaceWatcher(event.data.selector, event.data.pageName, event.data.id);
        this.iframe.contentWindow.postMessage({
          type: 'PARENT_WINDOW_RESULT',
          result: node?.textContent,
          id: event.data.id,
          pageName: event.data.pageName
        }, '*');
      }

      if (event.data.type === 'PARENT_WINDOW_PREVIEW_QUERY') {
        node = document.querySelector(event.data.selector);
        this.iframe.contentWindow.postMessage({
          type: 'PARENT_WINDOW_PREVIEW_RESULT',
          result: node?.textContent,
          id: event.data.id
        }, '*');
      }
    });

    this.state = {
      url: props.url,
      elementWatchers: {}
    };
  }

  componentDidMount() {
    this.startListening();
    this.startWatchers();
  }

  render() {
    return /*#__PURE__*/React.createElement("iframe", {
      frameBorder: "none",
      src: this.state.url,
      ref: e => {
        this.iframe = e;
      }
    });
  }

}

export default Retool;