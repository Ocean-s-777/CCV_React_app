// Line Chart V4 + V3 + V10
// Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";
import buildDataset from "./modules/buildDataset";
import loadingMessage from "./modules/loadingMessage";
import { fetchURL } from "./modules/fetchURL";

const COLOR3 = "#FFC05B";
const COLOR2 = "#0054E6dd";
const COLOR1 = "#dd8282dd";
const COLOR4 = "#228C1Bdd";

const VisualizationV4 = ({ customDescription }) => {
  const [data, setData] = useState();
  const fonts = 'Arial, "Times New Roman", Times, serif';
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(fetchURL + "/v4");
      const json = await response.json();
      let dataObject = {
        datasets: [
          buildDataset(
            "DE08",
            json.v4_de08,
            COLOR1,
            "Mean Air Age year AD",
            "CO2 Mixing Ratio ppm"
          ),
          buildDataset(
            "DE08-2",
            json["v4_de08-2"],
            COLOR2,
            "Mean Air Age year AD",
            "CO2 Mixing Ratio ppm"
          ),
          buildDataset(
            "DSS",
            json.v4_dss,
            COLOR3,
            "Mean Air Age year AD",
            "CO2 Mixing Ratio ppm"
          ),
          buildDataset(
            "Mauna Loa CO2 annual mean data",
            json.v3_a,
            COLOR4,
            "year",
            "mean"
          ),
          {
            label: "Human Evolution and Activities",
            data: json.v10_v4.map((d) => ({
              time: d["Time"],
              value: 300,
              event: d["Event"],
            })),
            borderColor: "#a89d1b",
            backgroundColor: "#c74714",
            parsing: {
              xAxisKey: "time",
              yAxisKey: "value",
            },
            borderWidth: 2,
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
    layout: {
      padding: {
        right: 20,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          title: (contex) => {
            //console.log(contex);
            return contex[0].raw.time;
          },
          label: (tooltipItem) => {
            //console.log(tooltipItem)
            //console.log(data.datasets[tooltipItem.datasetIndex].data[tooltipItem.dataIndex])
            if (tooltipItem.datasetIndex === 4) {
              return data.datasets[4].data[tooltipItem.dataIndex]["event"];
            } else {
              return tooltipItem.raw.value + " ppm";
            }
          },
        },
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurement",
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
        type: "linear",
        title: {
          display: true,
          text: "CO2 Mixing Ratio (ppm)",
          font: {
            size: 16,
            family: fonts,
          },
        },
      },
    },
  };

  let strandardDescription =
    "V4 standard description. (It will be something like: This chart combines the Ice core measurements DE08, DE08-02 and DSS to Mauna Loa CO2 annual mean data.)";
  if (!customDescription) customDescription = strandardDescription;

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
              href="https://cdiac.ess-dive.lbl.gov/trends/co2/lawdome.html"
              target="_blank"
              rel="noreferrer"
            >
              Historical CO2 Records from the Law Dome DE08, DE08-2, and DSS Ice
              Cores description
            </a>
            &nbsp; & &nbsp;
            <a
              href="https://cdiac.ess-dive.lbl.gov/ftp/trends/co2/lawdome.combined.dat"
              target="_blank"
              rel="noreferrer"
            >
              data source
            </a>
          </p>

          <p>
            <a
              href="https://gml.noaa.gov/ccgg/about/co2_measurements.html"
              target="_blank"
              rel="noreferrer"
            >
              Mauna Loa CO2 measurements description
            </a>
            &nbsp; & &nbsp;
            <a
              href="https://gml.noaa.gov/ccgg/trends/data.html"
              target="_blank"
              rel="noreferrer"
            >
              data source
            </a>
          </p>

          <p>
            <a
              href="https://www.southampton.ac.uk/~cpd/history.html"
              target="_blank"
              rel="noreferrer"
            >
              Human Evolution and Activities description/source
            </a>
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default VisualizationV4;
