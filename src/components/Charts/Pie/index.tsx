import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

type ChartData = {
  Vermelho: number;
  Amarelo: number;
  Verde: number;
};

export default function PieChart({chartData}:{chartData:ChartData}) {
  


const options = {
    labels: ['Vermelho', 'Amarelo', 'Verde'],
    colors: ['#FF3A29', '#FFF500', '#00FF66'],
    dataLabels: {
      enabled: false, // Desabilita a exibição de números percentuais
    },
    legend: {
      show: true,
      position: 'bottom',
      onItemClick: {
        toggleDataSeries: true,
      },
    },
    tooltip: {
      enabled: true, // Habilita a exibição dos dados ao passar o mouse
    },
  };
  

  return (
    <Chart
    options={{
        ...options,
        legend: {
            ...options.legend,  
            position: 'bottom',
        },
    }}
      series={[chartData.Vermelho, chartData.Amarelo, chartData.Verde]}
      type="pie"
      width="350px"
    />
  );
};



