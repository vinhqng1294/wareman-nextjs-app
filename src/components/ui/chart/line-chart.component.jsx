import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { random } from 'lodash';
import { useState } from 'react';
import { useEffect } from 'react';
import { DotLoader } from '../loader/loader.component';
import {
  arrayIsNotEmpty,
  stringIsNotEmpty,
} from '@/utils/commons/validateNotEmpty.utils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = function ({
  chartTitle = '',
  chartLabels = [],
  chartDatasets = [],
  ...props
}) {
  const [loading, setLoading] = useState(true);

  const [chartOptions, setChartOptions] = useState({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: '',
      },
    },
  });

  // const [data, setData] = useState({
  //   labels: [],
  //   datasets: [],
  // });

  useEffect(
    function () {
      if (stringIsNotEmpty(chartTitle)) {
        setChartOptions({
          ...chartOptions,
          plugins: {
            title: {
              display: true,
              text: chartTitle,
            },
          },
        });
      } else {
        setChartOptions({
          ...chartOptions,
          plugins: {
            title: {
              display: false,
              text: '',
            },
          },
        });
      }
      setLoading(false);
    },
    [chartTitle]
  );

  // useEffect(
  //   function () {
  //     if (arrayIsNotEmpty(chartLabels)) {
  //       setData({ ...data, labels: [...chartLabels] });
  //     } else {
  //       setData({ ...data, labels: [] });
  //     }
  //   },
  //   [chartLabels]
  // );

  // useEffect(
  //   function () {
  //     if (arrayIsNotEmpty(chartDatasets)) {
  //       setData({ ...data, datasets: [...chartDatasets] });
  //     } else {
  //       setData({ ...data, datasets: [] });
  //     }
  //   },
  //   [chartDatasets]
  // );

  return (
    <React.Fragment>
      {loading ? (
        <React.Fragment>
          <div className='flex flex-col items-center py-10 px-3 mx-auto'>
            <DotLoader loading={loading} />
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='flex flex-col w-full h-full'>
            <Line
              options={chartOptions}
              data={{
                labels: chartLabels,
                datasets: chartDatasets,
              }}
            />
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default LineChart;

export const datasetTemplate = {
  label: '',
  data: [],
  backgroundColor: '',
  borderColor: '',
};
