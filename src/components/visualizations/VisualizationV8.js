// Stacked line chart V8
// CO2 emissions by country

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import loadingMessage from "./modules/loadingMessage";

const fetchURL = "https://oceans777.herokuapp.com";

const VisualizationV8 = () => {
  const [data, setData] = useState();
  const fonts = 'Arial, "Times New Roman", Times, serif'
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchURL + "/v8_1");
      const json = await response.json();

      const dataSource = json.v8_ebc_v1;
      const BORDERWIDTH = 2;
      const POINTRADIUS = 0;

      const buildDatasetForV8 = (country, color) => ({
        label: country,
        data: dataSource.map((d) => ({
          time: d["Time"],
          value: d[country],
        })),
        fill: true,
        borderColor: color,
        backgroundColor: color,
        parsing: {
          xAxisKey: "time",
          yAxisKey: "value",
        },
        borderWidth: BORDERWIDTH,
        pointRadius: POINTRADIUS,
      });

      const buildAllV8DataSets = () => {
        let allV8DataSets = [];
        for (let i = 0; i < Object.keys(dataSource[0]).length - 2; i++) {
          let country = Object.keys(dataSource[0])[i + 2];

          // Generate color for each country
          let red = 0 + i * 11;
          let green = 0 + i * 33;
          let blue = 100 + i * 22;
          while (red > 255) red -= 255;
          while (green > 255) green -= 255;
          while (blue > 255) blue -= 255;
          let color = "rgb(" + red + ", " + green + ", " + blue + ")";

          allV8DataSets.push(buildDatasetForV8(country, color));
        }
        return allV8DataSets;
      };

      let dataObject = {
        datasets: buildAllV8DataSets(),
      };
      setData(dataObject);
    };
    if (!data) {
      fetchData();
    }
  }, [data]);

  if (!data) return loadingMessage();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1.6,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          pointStyleWidth: 11,
        },
      },
      title: {
        display: true,
        text: "CO2 emissions by country",
        font: {
          size: 20,
          family: fonts,
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "year",
        },
        title: {
          display: true,
          text: "Year",
          color: "black",
          font: {
            size: 16,
            family: fonts,
          },
        },
      },
      yAxis: {
        max: 40000,
        stacked: true,
        type: "linear",
        title: {
          display: true,
          text: "Million tonnes of CO2",
          font: {
            size: 16,
            family: fonts,
          },
        },
      },
    },
  };

  return (
    <div className="graph-box">
      <br />
      <div className="line-box-V8">
        <Line options={options} data={data} />
      </div>

      <div className="graph-text-box">
        <p>Here should be some text</p>

        <p>
          <a
            href="https://www.icos-cp.eu/science-and-impact/global-carbon-budget/2021"
            target="_blank"
            rel="noreferrer"
          >
            Detailed description
          </a>
          &nbsp; & &nbsp;
          <a
            href="https://data.icos-cp.eu/licence_accept?ids=%5B%22lApekzcmd4DRC34oGXQqOxbJ%22%5D"
            target="_blank"
            rel="noreferrer"
          >
            the data used (download)
          </a>
        </p>
      </div>
      <hr />
    </div>
  );
};

export default VisualizationV8;
