import React from "react"

class Retool extends React.Component {
    constructor(props) {
        super(props)

        if (!this.props.url)
            throw new Error("Please pass a url into the Retool component.")

        this.state = {
            url: props.url,
            elementWatchers: {},
            parentData: this.props.data || {},
        }
    }

    componentDidMount() {
        this.startListening()
        this.startWatchers()
    }

    startListening = () => {
        if (this.iframe) {
            window.addEventListener("message", (e) => this.handle(e))
        }
    }

    startWatchers = () => {
        var watcherKeys = Object.keys(this.state.elementWatchers)

        for (var i = 0; i < watcherKeys.length; i++) {
            var key = watcherKeys[i]
            var watcher = this.state.elementWatchers[key]
            var selector = watcher.selector
            const value = this.dataFromSelector(selector)
            if (value !== watcher.prevValue) {
                watcher.prevValue = value
                watcher.iframe.contentWindow.postMessage(
                    {
                        type: "PARENT_WINDOW_RESULT",
                        result: value,
                        id: watcher.queryId,
                        pageName: watcher.pageName,
                    },
                    "*"
                )
            }
        }

        setTimeout(this.startWatchers, 100)
    }

    createOrReplaceWatcher = (selector, pageName, queryId) => {
        var watcherId = pageName + "-" + queryId
        var watchers = { ...this.state.elementWatchers }

        watchers[watcherId] = {
            iframe: this.iframe,
            selector: selector,
            pageName: pageName,
            queryId: queryId,
            prevValue: null,
        }

        this.setState({ elementWatchers: watchers })
    }

    dataFromSelector = (selector) => {
        // Two places the app might be asking for data:
        //  1. The textContent of an HTML element.
        //  2. From data passed into this component
        const matchingInjectedData = this.state.parentData[selector]
        const nodeData = document.querySelector(selector)?.textContent
        return matchingInjectedData || nodeData || null
    }

    postMessageForSelector = (messageType, eventData) => {
        const maybeData = this.dataFromSelector(eventData.selector)

        if (maybeData) {
            this.iframe.contentWindow.postMessage(
                {
                    type: messageType,
                    result: maybeData,
                    id: eventData.id,
                    pageName: eventData.pageName,
                },
                "*"
            )
        } else {
            console.log(
                `Not sending data back to Retool, nothing found for selector: ${eventData.selector}`
            )
        }
    }

    handle = (event) => {
        if (!this.iframe.contentWindow) return
        if (event.data.type === "PARENT_WINDOW_QUERY") {
            this.createOrReplaceWatcher(
                event.data.selector,
                event.data.pageName,
                event.data.id
            )
            this.postMessageForSelector("PARENT_WINDOW_RESULT", event.data)
        }

        if (event.data.type === "PARENT_WINDOW_PREVIEW_QUERY") {
            this.postMessageForSelector(
                "PARENT_WINDOW_PREVIEW_RESULT",
                event.data
            )
        }
    }

    render() {
        return (
            <iframe
                height="100%"
                width="100%"
                frameBorder="none"
                src={this.state.url}
                ref={(e) => {
                    this.iframe = e
                }}
                title="retool"
            ></iframe>
        )
    }
}

export default Retool
