import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type StandardDeviationChartProps = {
  data: number[]; // Dados do desvio padrão
};

const StandardDeviationChart: React.FC<StandardDeviationChartProps> = ({
  data,
}) => {
  const mean =
    data?.reduce((acc, val) => acc + val, 0) / data?.length;
  const stdDeviation = Math.sqrt(
    data?.map((val) => (val - mean) ** 2).reduce((acc, val) => acc + val, 0) /
      data?.length
  );
  const cores = ["Verde", "Amarelo", "Vermelho"];
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 490);
    };

    handleResize(); // Define o tamanho inicial da tela
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Executa este efeito apenas uma vez no momento da montagem

  // Calcular médias para cada cor
  const corData: { [key: string]: number[] } = {
    Verde: [],
    Amarelo: [],
    Vermelho: [],
  };

  data.forEach((value, index) => {
    corData[cores[index]].push(value);
  });

  const corMeans = Object.keys(corData).reduce((acc: any, cor) => {
    acc[cor] =
      corData[cor].reduce((sum, val) => sum + val, 0) / corData[cor].length;
    return acc;
  }, {});

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: false, // Não empilhado
      toolbar: {
        show: isSmallScreen ? false : true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false, // Vertical
        columnWidth: "50%", // Largura das colunas
      },
    },
    xaxis: {
      title: { text: "cores de sinalização",  style: {
        color: undefined,
        fontSize: '18px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 700,
        
    }},
      categories: Object.keys(corMeans), // Categorias são as cores
    } as any,
    yaxis: [
      {
        title: { text: "Valores",  style: {
          color: undefined,
          fontSize: '18px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 700,
          
      }},
        labels: {
          formatter: function (val: any) {
            return Math.round(val).toString();
          },
        },
      },
    ],
    title: {
      text: "Desvio Padrão por Cor",
      align: "center",
      style: {
        fontSize: "16px",
      },
    },
    legend: {
      show: true,
      position: "top",
    },
    colors: ["#58FF94", "#0000FF", "#FFFF58","#0000FF", "#FFFF58", "#0000FF"], // Cores correspondentes a Verde, Amarelo, Vermelho e Desvio Padrão
  };

  const chartSeries = [
    {
      name: "Média",
      data: Object.values(corMeans), // Dados de média
    },
    {
      name: "Desvio Padrão",
      data: Object.values(corMeans).map((mean: any) =>
        (mean + stdDeviation).toFixed(0)
      ), // Dados de desvio padrão
    },
  ];

  return (
    <div className="w-full h-full">
      <Chart options={chartOptions} series={chartSeries} type="bar" height={"100%"} />
    </div>
  );
};

export default StandardDeviationChart;
