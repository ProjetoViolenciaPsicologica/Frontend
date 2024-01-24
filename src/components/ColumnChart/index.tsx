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

  return (
    <>
      <select
        value={selectedMonth || ''}
        onChange={(e) => setSelectedMonth(e.target.value || null)}
      >
        <option value="">Selecione um mês</option>
        {Object.keys(data).map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <Chart options={chartOptions} series={chartSeries} type="bar" height="70%" width="100%" />
    </>
  );
};

export default ColumnChart;
