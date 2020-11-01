
declare module 'express-prometheus-middleware' {
  import express = require("express");
  interface PrometheusMiddlewareOptions {
    /**
    * Url route that will expose the metrics for scraping.
    * defaults to '/metrics'
    */
    metricsPath: string,
    collectDefaultMetrics: boolean,
    requestDurationBuckets: number[],
  }
  function e(options?: Partial<PrometheusMiddlewareOptions>): express.RequestHandler;
  export = e;
}