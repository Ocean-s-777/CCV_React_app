// Multiaxis line chart V7 + V10
// Evolution of global temperature over the past two million years

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import loadingMessage from "./modules/loadingMessage";
import { fetchURL } from "./modules/fetchURL";

const BORDERWIDTH = 2;
const POINTRADIUS = 0;
const COLOR1 = "#0054E6dd";
const COLOR2 = "#FFC05B";

const buildDataset = (label, data, color, x, y, hidden, yAxis) => ({
  label,
  data: data.map((d) => ({
    time: Math.round(d[x] / 1000),
    value: d[y],
  })),
  borderColor: color,
  backgroundColor: color,
  parsing: {
    xAxisKey: "time",
    yAxisKey: "value",
  },
  borderWidth: BORDERWIDTH,
  pointRadius: POINTRADIUS,
  hidden,
  yAxisID: yAxis,
});

const VisualizationV7 = ({ customDescription }) => {
  const [data, setData] = useState();
  const fonts = 'Arial, "Times New Roman", Times, serif';
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchURL + "/v7");
      const json = await response.json();
      let dataObject = {
        datasets: [
          buildDataset(
            "co2 ppm",
            json.v6_800k,
            COLOR1,
            "Time",
            "co2_ppm",
            false,
            "y"
          ),
          buildDataset(
            "surface temperature change",
            json.v7_2m,
            COLOR2,
            "Time",
            "50%",
            false,
            "y2"
          ),
          {
            label: "Human Evolution and Activities",
            data: json.v10_v7.map((d) => ({
              time: Math.round(d["Time"] / 1000),
              value: 175,
              event: d["Event"],
            })),
            borderColor: "#011b4a",
            backgroundColor: "#011b4a88",
            parsing: {
              xAxisKey: "time",
              yAxisKey: "value",
            },
            borderWidth: BORDERWIDTH,
            pointRadius: 10,
            hidden: false,
            showLine: false,
          },
        ],
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
    plugins: {
      tooltip: {
        callbacks: {
          title: (contex) => {
            let value = contex[0].raw.time;
            if (value === 0) {
              return value;
            } else if (value < 0) {
              return value * -1 + " kyr BC";
            } else {
              return value * 1000;
            }
          },
          label: (tooltipItem) => {
            if (tooltipItem.datasetIndex === 2) {
              return data.datasets[2].data[tooltipItem.dataIndex]["event"];
            } else {
              return tooltipItem.raw.value;
            }
          },
        },
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Evolution of global temperature over the past two million years",
        font: {
          size: 20,
          family: fonts,
        },
      },
    },
    scales: {
      x: {
        offset: true,
        max: 2,
        type: "linear",
        ticks: {
          stepSize: 100,
          callback: (value, index, ticks) => {
            if (value === 0) {
              return value;
            } else if (value < 0) {
              return value * -1 + " kyr BC";
            } else {
              return value * 1000;
            }
          },
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
      y: {
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "CO2 (ppm)",
          color: COLOR1,
          font: {
            size: 16,
            family: fonts,
          },
        },
      },
      y2: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: "Surface temperature (deg C)",
          color: COLOR2,
          font: {
            size: 16,
            family: fonts,
          },
        },
      },
    },
  };

  let standardDescription = "This multi-axis graph combines representation of the global average surface temperature over the past two million years and CO2 measurements from the last 800k years. It displays also how the peaks and troughs of both the CO2 and the air temperature levels occur at around the same times, bringing focus to the alarming rise in the latest century.";
  if (!customDescription) customDescription = standardDescription;

  return (
    <div className="graph-box">
      <br />
      <div className="line-box">
        <Line options={options} data={data} />
      </div>

      <div className="graph-text-box">
        {customDescription}
        <div className="graph-text-box-sources">
          <p>
            <a
              href="https://climate.fas.harvard.edu/files/climate/files/snyder_2016.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Detailed description
            </a>

            <a
              href="http://carolynsnyder.com/publications.php"
              target="_blank"
              rel="noreferrer"
            >
              Data source
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisualizationV7;
