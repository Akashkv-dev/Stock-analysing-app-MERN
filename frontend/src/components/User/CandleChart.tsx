import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from 'apexcharts';
interface candlestickData {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}
interface CandleStickChartProps {
  data:candlestickData[]
}

const CandleChart: React.FC<CandleStickChartProps> = (props) => {
  const { data } = props;
  const options:ApexCharts.ApexOptions = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "CandleStick Chart",
      align: "left",
      style: {
        color: "#fff",
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#FFF",
        },
      },
      
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: "#fff",
        },
      },
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          chart: {
            width: "100%",
          },
        },
      },
      {
        breakpoint: 600,
        options: {
          chart: {
            width: "100%",
          },
        },
      },
    ],
    tooltip: {
      theme: "dark",
    },

    series : [
        {
          data: data.map((item: candlestickData) => ({
            x: item.date,
            y: [item.open, item.high, item.low, item.close],
          })),
        }
      ]
  };

   

  return (
    <div id="chart" style={{ width: "100%"}}>
      <ReactApexChart
        options={options}
        series={options.series}
        type="candlestick"
        height={"100%"}
      />
    </div>
  );
};

export default CandleChart;
