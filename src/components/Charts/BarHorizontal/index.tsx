import React from 'react';
import { Bar } from '@ant-design/charts';

type ChartData = {
  [key: string]: number;
};

const HorizontalBarChart: React.FC<{ data: ChartData }> = ({ data }) => {
  const categories = Object.keys(data);
  const values = Object.values(data);
  const colors = ['#FFB200', '#4339F2', '#02A0FC', '#FF3A29']; // Cores correspondentes às categorias
 
  const config = {
    data: categories.map((resposta, index) => ({
      resposta,
      color: colors[index],
      value: values[index],
    })),
    xField: 'value',
    yField: 'resposta',
    seriesField: 'resposta',
    legend: {
      position: 'top',
      itemName: {
        textStyle: {
            fontSize: "18px",
        }
      }
    },
    colorField: 'resposta', // Usar o campo 'resposta' para mapear as cores das barras
    yAxis: { label: { autoRotate: false } },
  };

  return <div className='w-full h-full'><Bar {...config} /></div>;
};

export default HorizontalBarChart;
