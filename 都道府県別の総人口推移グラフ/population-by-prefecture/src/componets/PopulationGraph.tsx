import React, { useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const PopulationGraph: React.FC = (props) => {
  const options: Highcharts.Options = {
    title: {
      text: 'My chart',
    },
    series: [
      {
        type: 'line',
        data: [1, 2, 3],
      },
    ],
  };
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
};

export default PopulationGraph;
