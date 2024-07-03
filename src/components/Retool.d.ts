import * as React from 'react';

export interface RetoolProps<T> {
  /**
   * url prop pointing to an embedded Retool application. You can generate this URL in the editor
   * mode of a Retool app by clicking "Share" then "Public".
   */
  url: string
  /**
   * an optional data object, which is made available to the embedded application. When an embedded
   * Retool application runs a Parent Window Query, <Retool> will check if data contains a key
   * matching the Parent Window Query's selector, and if so, return that value to the query.
   */
  data?: Record<string, T>
  /**
   * optional height and width props which will be used for the dimensions of the embedded window.
   */
  height?: string | number
  /**
   * optional height and width props which will be used for the dimensions of the embedded window.
   */
  width?: string | number
  /**
   * optional onData callback that will be called with the data of an event that is sent from the
   * embedded Retool app. These events can be sent from a JavaScript query inside of Retool by using
   * the parent.postMessage() syntax.
   */
  onData?: (data: T) => void
  /**
   * optional sandbox parameter to configure permissions of the iframe used to embed the Retool
   * app. allow-scripts and allow-same-origin are required in order to run Retool, so if sandbox is
   * specified, allow-scripts and allow-same-origin will always be appended to ensure the Retool app
   * works.
   */
  sandbox?: boolean | string
  /**
   * optional allow parameter to configure permissions of the iframe used to embed the Retool app.
   */
  allow?: string
  /**
   * optional styling prop object that can be used to pass in styles to the iframe component.
   */
  styling?: React.CSSProperties
}

declare const Retool: <T> (props: RetoolProps<T>) => React.ReactElement

export default Retool
