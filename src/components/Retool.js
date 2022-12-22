import { useEffect, useRef, useState } from "react";

const IFramePermissionKeys = set(['downloads', 'forms', 'modals', 'popups', 'fullscreen', 'camera', 'microphone', 'geolocation', 'payment', 'topNavigation', 'sameOrigin'])

const constructPermissionStrings = (permissions) => {
  if (!permissions || permissions.length === 0) {
    return { allowString: undefined, sandboxString: undefined }
  }

  const allowArray = []
  const sandboxArray = []

  permissions.filter(permission => IFramePermissionKeys.has(permission)).forEach(permission => {
    switch (permission) {
      case 'downloads':
        sandboxArray.push('allow-downloads')
        break
      case 'forms':
        sandboxArray.push('allow-forms')
        break
      case 'modals':
        sandboxArray.push('allow-modals')
        break
      case 'popups':
        sandboxArray.push('allow-popups', 'allow-popups-to-escape-sandbox')
        break
      case 'fullscreen':
        allowArray.push('fullscreen')
        break
      case 'camera':
        allowArray.push('camera')
        break
      case 'microphone':
        allowArray.push('microphone')
        break
      case 'geolocation':
        allowArray.push('geolocation')
        break
      case 'payment':
        allowArray.push('payment')
        break
      case 'topNavigation':
        sandboxArray.push('allow-top-navigation', 'allow-top-navigation-by-user-activation')
        break
      case 'sameOrigin':
        sandboxArray.push('allow-same-origin')
        break
    }
  })

  const allowString = allowArray.length > 0 ? allowArray.join(';') : undefined
  const sandboxString = sandboxArray.length > 0 ? sandboxArray.join(' ') : undefined

  return { allowString, sandboxString }
}

const Retool = ({ data, url, height, width, onData, permissions }) => {
  const embeddedIframe = useRef(null);
  const [elementWatchers, setElementWatchers] = useState({});

  const { allowString, sandboxString } = constructPermissionStrings(permissions)

  /* Retool passes up the list of elements to watch on page load  */
  useEffect(() => {
    for (const key in elementWatchers) {
      const watcher = elementWatchers[key];
      watcher.iframe?.contentWindow.postMessage(
        {
          type: "PARENT_WINDOW_RESULT",
          result: data[watcher.selector],
          id: watcher.queryId,
          pageName: watcher.pageName,
        },
        "*"
      );
    }
  }, [data, elementWatchers]);

  /* On page load, add event listener to listen for events from Retool */
  useEffect(() => {
    /* Handle events - if PWQ then create/replace watchers -> return result */
    const handler = (event) => {
      if (!embeddedIframe?.current?.contentWindow) return;
      
      if (
        event.origin === new URL(url).origin &&
        event.data?.type !== "PARENT_WINDOW_QUERY" &&
        event.data?.type !== 'intercom-snippet__ready'
      ) {
        onData?.(event.data);
      }
      
      if (event.data.type === "PARENT_WINDOW_QUERY") {
        createOrReplaceWatcher(
          event.data.selector,
          event.data.pageName,
          event.data.id
        );
        postMessageForSelector("PARENT_WINDOW_RESULT", event.data);
      }
    };

    window.addEventListener("message", handler);

    return () => window.removeEventListener("message", handler);
  }, []);

  /* Creates or updates the list of values for us to watch for changes */
  const createOrReplaceWatcher = (selector, pageName, queryId) => {
    const watcherId = pageName + "-" + queryId;
    const updatedState = elementWatchers;

    updatedState[watcherId] = {
      iframe: embeddedIframe.current,
      selector: selector,
      pageName: pageName,
      queryId: queryId,
    };

    setElementWatchers(updatedState);
  };

  /* Checks for selectors for data and posts message for Retool to read */
  const postMessageForSelector = (messageType, eventData) => {
    const maybeData = data[eventData.selector];

    if (maybeData) {
      embeddedIframe.current.contentWindow.postMessage(
        {
          type: messageType,
          result: maybeData,
          id: eventData.id,
          pageName: eventData.pageName,
        },
        "*"
      );
    } else {
      console.log(
        `Not sending data back to Retool, nothing found for selector: ${eventData.selector}`
      );
    }
  };

  return (
    <iframe
      allow={allowString}
      sandbox={sandboxString}
      height={height ?? "100%"}
      width={width ?? "100%"}
      frameBorder="none"
      src={url}
      ref={embeddedIframe}
      title="retool"
    ></iframe>
  );
};

export default Retool;
