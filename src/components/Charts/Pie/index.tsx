import React from "react";
import Chart from "react-apexcharts";

type ChartData = {
  Vermelho: number;
  Amarelo: number;
  Verde: number;
};

const PieChart: React.FC<{ chartData: ChartData }> = ({ chartData }) => {
  // Verifica se há algum valor maior que 0
  const hasData = Object.values(chartData).some((value) => value > 0);

  // Retorna null se não houver dados
  if (!hasData) return null;

  const options = {
    labels: ["Vermelho", "Amarelo", "Verde"],
    colors: ["#FF3A29", "#FFF500", "#00FF66"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "top",
      onItemClick: {
        toggleDataSeries: true,
      },
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: "14px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: "bold",
        colors: ["#0000"],
      }, // Habilita a exibição dos dados ao passar o mouse
    },
  };

  return (
    <Chart
      options={{
        ...options,
        legend: {
          ...options.legend,
          position: "bottom",
        },
      }}
      series={[chartData?.Vermelho, chartData?.Amarelo, chartData?.Verde]}
      type="pie"
      width="350px"
    />
  );
};

export default PieChart;
