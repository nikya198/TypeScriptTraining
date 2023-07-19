import React, { useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
//import PrefectureList from './PrefectureList';

interface PopulationData {
  prefCode: string;
  prefName: string;
  data: {
    label: string;
    data: {
      year: number;
      value: number;
    }[];
  }[];
}

interface PopulationGraphProps {
  data: PopulationData[];
  graphType: number;
}

const PopulationGraph: React.FC<PopulationGraphProps> = (props) => {
  let series: Highcharts.SeriesOptionsType[] = [];
  let categories: string[] = [];
  let label = '';
  for (let i = 0; i < props.data.length; i++) {
    let data: number[] = [];
    series.push({
      type: 'line',
      name: props.data[i].prefName,
      data: data,
    });

    label = props.data[i].data[props.graphType].label;
    for (let j = 0; j < props.data[i].data[props.graphType].data.length; j++) {
      data.push(props.data[i].data[props.graphType].data[j].value);
      categories.push(String(props.data[i].data[props.graphType].data[j].year));
    }
  }

  const options: Highcharts.Options = {
    title: {
      text: label,
    },
    xAxis: {
      title: {
        text: '年度',
      },
      categories: categories,
    },
    yAxis: {
      title: {
        text: '人口数',
      },
    },
    series: series,
  };
  //const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      //ref={chartComponentRef}
      //{...props}
    />
  );
};

export default PopulationGraph;
