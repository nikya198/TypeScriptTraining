import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PopulationData } from '../PopulationData.model';

interface PopulationGraphProps {
  data: PopulationData[];
  graphType: number;
}

const PopulationGraph: React.FC<PopulationGraphProps> = (props) => {
  let series: Highcharts.SeriesOptionsType[] = [];
  let xData: string[] = [];
  let label = '';

  props.data.forEach((prefecData) => {
    let yData: number[] = [];
    series.push({
      type: 'line',
      name: prefecData.prefName,
      data: yData,
    });
    label = prefecData.data[props.graphType].label;
    prefecData.data[props.graphType].data.forEach((selectData) => {
      yData.push(selectData.value);
      xData.push(String(selectData.year));
    });
  });

  // for (let i = 0; i < props.data.length; i++) {
  //   let data: number[] = [];

  //   series.push({
  //     type: 'line',
  //     name: props.data[i].prefName,
  //     data: data,
  //   });
  //   //console.log(series);

  //   const prefectureData = props.data[i].data[props.graphType];

  //   label = prefectureData.label;
  //   for (let j = 0; j < prefectureData.data.length; j++) {
  //     data.push(prefectureData.data[j].value);
  //     categories.push(String(prefectureData.data[j].year));
  //   }
  // }

  Highcharts.setOptions({
    lang: {
      numericSymbols: null || undefined,
    },
  });

  const options: Highcharts.Options = {
    title: {
      text: label,
    },
    xAxis: {
      title: {
        text: '年度',
      },
      categories: xData,
    },
    yAxis: {
      tickInterval: 100000, //目盛り間隔
      title: {
        text: '人口数',
      },
    },
    series: series,
    accessibility: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PopulationGraph;
