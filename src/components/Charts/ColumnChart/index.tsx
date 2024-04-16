import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { parseCookies } from "nookies";
import { api } from "@/services";
import { Karla } from "next/font/google";

interface ColumnChartProps {
  data: {
    [key: string]: number;
  };
}

const karla = Karla({
  style: "normal",
  subsets: ["latin"],
});

const ColumnChart: React.FC<ColumnChartProps> = ({ data }: any) => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any>(null); // Estado para armazenar os dados do gráfico
  const cookies = parseCookies();
  const token = cookies["psi-token"];
  // Função para buscar os dados do mês selecionado na API
  const fetchDataForMonth = async (month: string) => {
    try {
      const response = await api.get(`formulario/porMes/${month}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = await response.data;
      setChartData(responseData);
    } catch (error) {
      console.error("Erro ao buscar os dados do mês:", error);
    }
  };

  // Função para atualizar os dados do gráfico quando um mês é selecionado
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.target.value;
    setSelectedMonth(selectedMonth);
    if (selectedMonth) {
      fetchDataForMonth(selectedMonth);
    } else {
      setChartData(null); // Se nenhum mês for selecionado, mostrar os dados de todos os meses
    }
  };

  // Configurações do gráfico
  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: chartData ? Object.keys(chartData) : Object?.keys(data), // Usar os dados do mês selecionado ou todos os dados
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        columnWidth: "32px",
      },
    },
  };

  const chartSeries = [
    {
      name: "Quantidade",
      data: chartData ? Object.values(chartData) : Object.values(data), // Usar os dados do mês selecionado ou todos os dados
    },
  ];

  const allMonths = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return (
    <>
      <div className="flex flex-col mt-20">
        <span className={`text-black text-xl font-bold ${karla.className}`}>
          Filtro por Meses
        </span>
        <select
          value={selectedMonth || ""}
          onChange={handleMonthChange}
          className="w-[90%] sm:w-[269px] h-[46px] mb-4 bg-white rounded-[10px] shadow border border-black border-opacity-10"
        >
          <option value="">-------</option>
          {allMonths.map((month, index) => (
            <option key={month} value={index + 1}>
              {month}
            </option> // O value é o índice do mês + 1
          ))}
        </select>
      </div>

      <Chart
        options={chartOptions}
        series={chartSeries as ApexAxisChartSeries}
        type="bar"
        height="70%"
        width="100%"
      />
    </>
  );
};

export default ColumnChart;
