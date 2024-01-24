import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ColumnChartProps {
  data: {
    Jan: number;
    Fev: number;
    Mar: number;
    Abr: number;
    Mai: number;
    Jun: number;
    Jul: number;
    Ago: number;
    Set: number;
    Out: number;
    Nov: number;
    Dez: number;
  };
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const filteredData = selectedMonth ? { [selectedMonth]: data[selectedMonth as keyof typeof data] } : data;

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: Object.keys(filteredData),
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        columnWidth: '32px',
      },
    },
  };

  const chartSeries = [
    {
      name: 'Quantidade',
      data: Object.values(filteredData),
    },
  ];

  const fullMonthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return (
    <>
      <select
        value={selectedMonth || ''}
        onChange={(e) => setSelectedMonth(e.target.value || null)}
        className="w-[90%] sm:w-[269px] h-[46px] mb-4 bg-white rounded-[10px] shadow border border-black border-opacity-10"
      >
        <option value="">Selecione um mês</option>
        {Object.keys(data).map((month, index) => (
          <option key={month} value={month}>
            {fullMonthNames[index]}
          </option>
        ))}
      </select>
      <Chart options={chartOptions} series={chartSeries} type="bar" height="70%" width="100%" />
    </>
  );
};

export default ColumnChart;
