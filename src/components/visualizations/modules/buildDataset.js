const BORDERWIDTH = 2;
const POINTRADIUS = 0;

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

  export default buildDataset;