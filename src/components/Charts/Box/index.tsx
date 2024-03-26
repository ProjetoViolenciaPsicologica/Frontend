// components/StandardDeviationChart.tsx

import React from "react";
import Chart from "react-apexcharts";
import { api } from "@/services";
import { useQuery } from "react-query";
import { ApexOptions } from "apexcharts";

type StandardDeviationChartProps = {
  data: number[]; // Dados do desvio padrão
};
const StandardDeviationChart: React.FC<StandardDeviationChartProps> = ({
  data,
}) => {
  const mean = data?.reduce((acc, val) => acc + val, 0) / data?.length;
  const stdDeviation = Math.sqrt(
    data?.map((val) => (val - mean) ** 2).reduce((acc, val) => acc + val, 0) /
      data?.length
  );
  const cores = ["Verde", "Amarelo", "Vermelho"];

  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: true,
      },
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    title: {
      text: "Visualização da Média e Desvio Padrão",
      align: "center",
      style: {
        fontSize: "16px",
      },
    },
    xaxis: {
      categories: data?.map((_, index) => `${cores[index]}`),
      title: {
        text: "",
      },
    },
    yaxis: {
      title: {
        text: "Valores",
      },
    },
    annotations: {
      yaxis: [
        {
          y: mean,
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: {
              color: "#fff",
              background: "#00E396",
            },
            text: "Média",
          },
        },
        {
          y: mean + stdDeviation,
          borderColor: "#FEB019",
          label: {
            borderColor: "#FEB019",
            style: {
              color: "#fff",
              background: "#FEB019",
            },
            text: "Desvio Padrão",
          },
        },
      ],
    },
  };

  const chartSeries = [
    {
      name: "Quantidade de respostas",
      data: data,
    },
  ];

  return (
    <div className="w-full h-full">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={"100%"}
      />
    </div>
  );
};

export default StandardDeviationChart;
