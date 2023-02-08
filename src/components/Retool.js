import { useEffect, useRef, useState } from "react";

const MINIMUM_SANDBOX_PERMISSIONS = "allow-scripts allow-same-origin";

const Retool = ({
  data,
  url,
  height,
  width,
  onData,
  sandbox,
  allow,
  styling,
}) => {
  const embeddedIframe = useRef(null);
  const [elementWatchers, setElementWatchers] = useState({});

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
    // if the URL changes, we want to clear previous set of Element Watchers
    setElementWatchers({});

    /* Handle events - if PWQ then create/replace watchers -> return result */
    const handler = (event) => {
      if (!embeddedIframe?.current?.contentWindow) return;

      /* Handle messages passed up from Retool */
      if (
        event.origin === new URL(url).origin &&
        event.data?.type !== "PARENT_WINDOW_QUERY" &&
        event.data?.type !== "intercom-snippet__ready"
      ) {
        onData?.(event.data);
      }

      /* Handle requests from Retool looking for data */
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
  }, [url]);

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

  const sandboxAttrib =
    typeof sandbox === "string"
      ? `${MINIMUM_SANDBOX_PERMISSIONS} ${sandbox}`
      : sandbox === true
      ? MINIMUM_SANDBOX_PERMISSIONS
      : sandbox;

  return (
    <iframe
      allow={allow}
      sandbox={sandboxAttrib}
      height={height ?? "100%"}
      width={width ?? "100%"}
      frameBorder="none"
      src={url}
      ref={embeddedIframe}
      title="retool"
      style={styling}
    />
  );
};

export default Retool;
