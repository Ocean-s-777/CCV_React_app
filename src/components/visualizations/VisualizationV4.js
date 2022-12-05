// Line Chart V4 + V3 + V10
// Antarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurements

import React from "react";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import { Chart } from "chart.js/auto"; // We need this unless/until we do some bundle optimization
import { useState, useEffect } from "react";

const BORDERWIDTH = 2;
const POINTRADIUS = 0;
const COLOR3 = "#FFC05B";
const COLOR2 = "#0054E6dd";
const COLOR1 = "#dd8282dd";
const COLOR4 = "#228C1Bdd";
const fetchURL = "https://oceans777.herokuapp.com";

<<<<<<< HEAD
// This will be removed once we get the real data
const dummyValue = 350
const dummyData = [
  {
    time: "1346",
    value: 300,
    text: "bubonic plague kills a third of the human population"
  },
  {
    time: "1542",
    value: 300,
    text: "global population of humans passes 500 million; annual energy use per person averages 9800 kWh"
  },
  {
    time: "1886",
    value: 300,
    text: "first car with gasoline-powered internal combustion engine (Karl Benz, Germany, 1886)"
  },
  {
    time: "1900",
    value: 300,
    text: "global average life expectancy equals 32 years by 1900"
  },
  {
    time: "1918",
    value: 300,
    text: "Spanish flu pandemic (1918-20): infects a third and kills 50-100 million"
  },
  {
    time: "1973",
    value: 300,
    text: "global average life expectancy exceeds 60 years by 1973"
  },
  {
    time: "1986",
    value: 300,
    text: "global population of humans passes 5 billion; annual energy use per person averages 18300 kWh"
  },
  {
    time: "2017",
    value: 300,
    text: "first national legislation for a mid-century target of net-zero emissions (Sweden, 2017)"
  },
]

=======
>>>>>>> 2f329a813a1b4ade272bd613dddfdf80f2f85015
const buildDataset = (label, data, color, x, y, hidden) => ({
  label,
  data: data.map((d) => ({
    time: d[x],
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
});

const VisualizationV4 = () => {
  const [data, setData] = useState();
  const fonts = 'Arial, "Times New Roman", Times, serif'
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

  if (!data) return null;

  const options = {
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
        text: "\nAntarctic Ice Core records of atmospheric CO2 ratios combined with Mauna Loa measurement",
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

  return (
    <div className="graph-box">
      <br />
<<<<<<< HEAD
      <Line options={options} data={data}/*  width={600} height={200}  *//>
=======
      <div className="line-box">
        <Line options={options} data={data} />
      </div>
>>>>>>> 2f329a813a1b4ade272bd613dddfdf80f2f85015

      <div className="graph-text-box">
        <p>
          This chart combines the Ice core measurements DE08, DE08-02 and DSS to
          Mauna Loa CO2 annual mean data.
        </p>

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
            the data used
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
            the data used
          </a>
        </p>

        <p>
          <a
            href="https://www.southampton.ac.uk/~cpd/history.html"
            target="_blank"
            rel="noreferrer"
          >
            Human Evolution and Activities description & data
          </a>
        </p>
      </div>
      <hr />
    </div>
  );
};

export default VisualizationV4;
