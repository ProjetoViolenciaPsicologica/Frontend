import React from "react";
import { Pie } from "@ant-design/plots";

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


  const config = {
  data: [
    { name: "Vermelho", sinalizacao: chartData.Vermelho },
    { name: "Amarelo", sinalizacao: chartData.Amarelo },
    { name: "Verde", sinalizacao: chartData.Verde },
  ],
    angleField: 'sinalizacao',
    colorField: 'name',
    color: ["#d6514a", "#FFFF58", "#58FF94"],
    label: {
      text: 'sinalizacao',
      style: {
        fontWeight: 'bold',
        size:"20px"
      },
    },
    legend: {
      color: {
        title: false,
        position: 'top',
        rowPadding: 5,
      },
      
    },
  };


  return (
    <div className="w-full h-full ml-8">
      {<Pie {...config} />}
    </div>
  );
};

export default PieChart;