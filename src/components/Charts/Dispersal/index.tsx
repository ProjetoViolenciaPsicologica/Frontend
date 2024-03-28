import React from "react";
import Chart from "react-apexcharts";

type FormData = {
  id: number;
  data_e_hora: string;
  campo_questoes: string;
  sinalizacao: string;
};

type ScatterPlotProps = {
  data: FormData[];
};

const ScatterPlot: React.FC<ScatterPlotProps> = ({ data }) => {

  // Calcula a pontuação total de cada formulário
  const formDataWithScore = data.map((formData) => {
    const scores = formData.campo_questoes.split(",").map(Number);
    const totalScore = scores.reduce((acc, score) => acc + score, 0);
    return {
      id: formData.id,
      totalScore: totalScore,
    };
  });

  // Calcula a quantidade de formulários
  const numberOfForms = formDataWithScore.length;

  // Extrai os dados para o gráfico de dispersão
  const seriesData = formDataWithScore.map((formData) => ({
    x: numberOfForms,
    y: formData.totalScore,
  }));
console.log(formDataWithScore)
  const options = {
    chart: {
      height: 350,
      type: "scatter",
    },
    xaxis: {
      title: {
        text: "Quantidade de Formulários",
      },
    },
    yaxis: {
      title: {
        text: "Pontuação Total",
      },
    },
    markers: {
      size: 6,
    },
  };

  const series = [
    {
      name: "Pontos",
      data: seriesData,
    },
  ];

  return (
    <div className="w-full h-full">
        {/* <Chart options={options} series={series} type="scatter" height={"100%"} width="100%" /> */}
    </div>
  );
};

export default ScatterPlot;
