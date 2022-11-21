import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart } from "chart.js/auto";  // We need this unless/until we do some bundle optimization

// The dummy data. This will be replaced with the API call.
const dataset_1 = require("../../dummy_data/test-1.json");
const dataset_2 = require("../../dummy_data/test-2.json");
const dataset_3 = require("../../dummy_data/test-3.json");

// Common attributes of graphs/lines/plots
const BORDERWIDTH = 2;
const POINTRADIUS = 0;
const COLOR1 = "black";
const COLOR2 = "blue";
const COLOR3 = "red";
const COLOR4 = "orange";

export default function VisualizationV1() {
  const data = {
    datasets: [
      {
        label: "Global monthly",
        data: dataset_1.map((data) => {
          return {
            time: data.Time,
            value: data.Global,
          };
        }),
        borderColor: COLOR1,
        backgroundColor: COLOR1,
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        borderWidth: BORDERWIDTH,
        pointRadius: POINTRADIUS,
      },
      {
        label: "Global annual",
        data: dataset_2.map((data) => {
          return {
            time: data.Time,
            value: data.Global,
          };
        }),
        borderColor: COLOR1,
        backgroundColor: COLOR1,
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        borderWidth: BORDERWIDTH,
        pointRadius: POINTRADIUS,
      },
      {
        label: "Northern monthly",
        data: dataset_1.map((data) => {
          return {
            time: data.Time,
            value: data.Northern,
          };
        }),
        borderColor: COLOR2,
        backgroundColor: COLOR2,
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        borderWidth: BORDERWIDTH,
        pointRadius: POINTRADIUS,
      },
      {
        label: "Northern annual",
        data: dataset_2.map((data) => {
          return {
            time: data.Time,
            value: data.Northern,
          };
        }),
        borderColor: COLOR2,
        backgroundColor: COLOR2,
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        borderWidth: BORDERWIDTH,
        pointRadius: POINTRADIUS,
      },
      {
        label: "Southern monthly",
        data: dataset_1.map((data) => {
          return {
            time: data.Time,
            value: data.Southern,
          };
        }),
        borderColor: COLOR3,
        backgroundColor: COLOR3,
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        borderWidth: BORDERWIDTH,
        pointRadius: POINTRADIUS,
      },
      {
        label: "Southern annual",
        data: dataset_2.map((data) => {
          return {
            time: data.Time,
            value: data.Southern,
          };
        }),
        borderColor: COLOR3,
        backgroundColor: COLOR3,
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        borderWidth: BORDERWIDTH,
        pointRadius: POINTRADIUS,
      },
      {
        label: "2000 year temperatures",
        hidden: true,
        data: dataset_3.map((data) => {
          return {
            time: data.Year,
            value: data.T,
          };
        }),
        borderColor: COLOR4,
        backgroundColor: COLOR4,
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        borderWidth: BORDERWIDTH,
        pointRadius: POINTRADIUS,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Global historical surface temperature anomalies from January 1850 onwards",
        font: {
          size: 24,
          family: '"Times New Roman", Times, serif',
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "year",
        },
      },
      yAxis: {
        type: "linear",
      },
    },
  };

  return (
    <div className="graph-box">
      <Line options={options} data={data} width={600} height={200} />
      <div className="graph-text-box">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a orci
          nec nisi egestas vestibulum. Curabitur ut eros elit. Aenean fermentum
          neque odio, scelerisque efficitur justo egestas at. Etiam vulputate
          risus eget faucibus porttitor. Cras blandit, ex quis molestie
          ultrices, elit augue dapibus tortor, eget gravida magna metus quis
          erat. Duis fringilla luctus orci, sit amet rhoncus ipsum commodo et.
          Aenean eget laoreet nunc. Aenean vel libero magna.
        </p>
        <a href="https://www.metoffice.gov.uk/hadobs/hadcrut5/" target="_blank" rel="noreferrer">
          Source
        </a>
      </div>
    </div>
  );
}
