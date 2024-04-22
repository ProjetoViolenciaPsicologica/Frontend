import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

type data = {
  idade: number;
  pontuacao: number;
};

const ScatterChart = ({ data }: { data: data[] }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 490);
    };

    handleResize(); // Define o tamanho inicial da tela
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Executa este efeito apenas uma vez no momento da montagem

  // Dados das idades e pontuações
  const idades = data.map((datas) => {
    return datas.idade;
  });
  const pontuacoes = data.map((datas) => {
    return datas.pontuacao;
  });

  // Calculando a linha de regressão
  let somatorioXY = 0;
  let somatorioX = 0;
  let somatorioY = 0;
  let somatorioXQuadrado = 0;

  for (let i = 0; i < idades.length; i++) {
    somatorioXY += idades[i] * pontuacoes[i];
    somatorioX += idades[i];
    somatorioY += pontuacoes[i];
    somatorioXQuadrado += Math.pow(idades[i], 2);
  }

  const b =
    (idades.length * somatorioXY - somatorioX * somatorioY) /
    (idades.length * somatorioXQuadrado - Math.pow(somatorioX, 2));

  const a = somatorioY / idades.length - b * (somatorioX / idades.length);
  const idadesUnicas = [...new Set(idades)];
  // Gerando os pontos da linha de regressão
  const linhaRegressao = idadesUnicas.map((idade) => ({
    x: idade,
    y: pontuacoes,
  }));

  // Configurações do gráfico de dispersão
  const scatterChartOptions = {
    chart: {
      id: "scatter-chart",
      animations: { enabled: true }, // Desativa animações
    },
    xaxis: {
      title: { text: "Idade",  style: {
        color: undefined,
        fontSize: '18px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 700,
        
    }},
    },
    yaxis: {
      title: { text: "Pontuação", style: {
        color: undefined,
        fontSize: '18px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 700,
       
    }},
    },
    stroke: {
      width: 2,
    },
    markers: {
      size: 8, // Tamanho dos marcadores
    },

    toolbar: {
      show: true
    },
    legend: {
      show: true,
      position: "bottom",
      fontSize: '18px',
      fontWeight: 700,
    },
  };

  

// Usando os dados únicos de idades para mapear os pontos
const scatterChartData = [
  {
    name: "Pontuações por Idade",
    data: idadesUnicas.map((idade) => ({
      x: idade,
      y: pontuacoes[idades.findIndex((value) => value === idade)],
    })),
    
  },
  {
    name: "Linha de Regressão",
    data: linhaRegressao,
  },
];

  return (
    <div className="h-full w-full">
      <Chart
        options={{
          ...scatterChartOptions,
          legend: {
            ...scatterChartOptions.legend,
            position: isSmallScreen ? "bottom" : "top", // Specify a valid position value for the legend
          },
        }}
        series={scatterChartData}
        type="scatter"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default ScatterChart;
