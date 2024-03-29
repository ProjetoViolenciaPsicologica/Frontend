import React from "react";
import { Bar } from "@ant-design/charts";

type ChartData = {
  [key: string]: number;
};

const HorizontalBarChart: React.FC<{ data: ChartData }> = ({ data }) => {
  const categories = Object?.keys(data);
  const values = Object.values(data);
  const colors = ["#FFB200", "#4339F2", "#02A0FC", "#FF3A29"]; // Cores correspondentes às categorias

  // Verifica se existem categorias para mostrar
  const hasData = categories.length > 0;

  // Configuração do gráfico apenas se houver dados para mostrar
  const config = {
    data: hasData
      ? categories.map((resposta, index) => ({
          resposta,
          color: colors[index],
          value: values[index],
        }))
      : [],
    xField: "resposta",
    yField: "value",
    seriesField: "resposta",
    legend: {
      position: "top",
      itemName: {
        textStyle: {
          fontSize: "18px",
        },
      },
    },
    colorField: "resposta", // Usar o campo 'resposta' para mapear as cores das barras
    yAxis: { label: { autoRotate: false } },
  };

  return (
    <div className="w-full h-full">
      {/* Renderiza o gráfico somente se houver dados para mostrar */}
      {hasData && <Bar {...config} />}
      {/* Renderiza uma mensagem se não houver dados */}
      {!hasData && <p>Não há dados disponíveis para exibir</p>}
    </div>
  );
};

export default HorizontalBarChart;
