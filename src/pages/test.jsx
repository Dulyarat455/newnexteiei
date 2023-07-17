import React from "react";
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = () => {
  const chartRef = useRef(null);
  let chartInstance = null;

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstance) {
      chartInstance.destroy();
    }
    let x = 57

    chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [{
          data: [x, 40, 20],
          backgroundColor: ['#ff0000', '#00ff00', '#0000ff'],
        }],
      },
    });

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="w-64 h-64">
      <canvas ref={chartRef} />
    </div>
  );
};

export default PieChart;