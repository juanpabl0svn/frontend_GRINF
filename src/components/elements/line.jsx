import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const createData = (lenghth) => {
  const array = [];

  for (let i = 1; i <= lenghth; i++) {
    array.push(i);
  }

  return array;
};

const colors = {
  0: ["rgb(255, 99, 132)", "rgba(255, 99, 132, 0.5)"],
  1: ["rgb(0, 102, 255)", "rgba(0, 102, 255,0.5)"],
  2: ["rgb(0, 255, 127)", "rgba(0, 255, 127,0.5)"],
};

export default function LinesChart({ dataStatistic, length, label, color }) {
  const rows = createData(length);

  var midata = {
    labels: rows,
    datasets: [
      // Cada una de las líneas del gráfico
      {
        label,
        data: dataStatistic,
        tension: 0.5,
        fill: true,
        borderColor: colors[color][0] || "rgb(255, 99, 132)",
        backgroundColor: colors[color][1] || "rgba(255, 99, 132, 0.5)",
        pointRadius: 5,
        pointBorderColor: colors[color][0] || "rgb(255, 99, 132)",
        pointBackgroundColor: colors[color][0] || "rgb(255, 99, 132)",
      },
    ],
  };

  var misoptions = {
    scales: {
      y: {
        min: 0,
      },
      x: {
        ticks: { color: "rgb(255, 99, 132)" },
      },
    },
  };
  return <Line data={midata} options={misoptions} />;
}
