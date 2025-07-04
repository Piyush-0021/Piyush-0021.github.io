
declare module 'react-apexcharts' {
  import React from 'react';
  import {
    ApexOptions,
    ApexAxisChartSeries,
    ApexNonAxisChartSeries,
  } from 'apexcharts';

  export interface Props {
    options: ApexOptions;
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    type:
      | 'line'
      | 'area'
      | 'bar'
      | 'pie'
      | 'donut'
      | 'radialBar'
      | 'scatter'
      | 'bubble'
      | 'heatmap'
      | 'candlestick'
      | 'boxPlot'
      | 'radar'
      | 'polarArea'
      | 'rangeBar'
      | 'treemap';
    height?: number | string;
    width?: number | string;
  }

  const ReactApexChart: React.FC<Props>;
  export default ReactApexChart;
}
