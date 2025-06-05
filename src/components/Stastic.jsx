
import React, { useEffect, useRef } from 'react';
import '../css/stats.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'chart.js'; // Needed for instantiating the charts
import {Bar} from 'react-chartjs-2';
// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Stastic() {
  const taskChartRef = useRef(null);
  const revenueChartRef = useRef(null);

  const totalTasks = 50;
  const completedTasks = 30;
  const pendingTasks = 15;
  const rejectedTasks = 5;
  const totalRevenue = 1500;
  const averageRevenue = totalRevenue / completedTasks;

  useEffect(() => {
    const taskCtx = taskChartRef.current.getContext('2d');
    const revenueCtx = revenueChartRef.current.getContext('2d');

    const taskChart = new Chart(taskCtx, {
      type: 'bar',
      data: {
        labels: ['Completed', 'Pending', 'Rejected'],
        datasets: [
          {
            label: 'Number of Tasks',
            data: [completedTasks, pendingTasks, rejectedTasks],
            backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Task Status',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const revenueChart = new Chart(revenueCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Monthly Revenue ($)',
            data: [200, 180, 250, 300, 270, 400, 450, 430, 480, 500, 520, 600],
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.3)',
            fill: true,
            tension: 0.7,
          },
        ],
      },
      options: {
        
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Revenue Over Time',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      taskChart.destroy();
      revenueChart.destroy();
    };
  }, []);

  return (
    <div className="flex-row stats-cont">
      <div className="chart">
        <div className="no-of-task">
          <canvas ref={taskChartRef} width={700} height={450}></canvas>
        </div>
        <div className="revenueChart">
          <canvas ref={revenueChartRef}></canvas>
        </div>
      </div>

      <div className="stats-card">
        <h2 className="text-center">TaskMaster Statistics</h2>

        <div className="card">
          <div className="stat-card">
            <h4>Total Tasks</h4>
            <p>{totalTasks}</p>
          </div>
        </div>

        <div className="card">
          <div className="stat-card">
            <h4>Completed</h4>
            <p>{completedTasks}</p>
          </div>
        </div>

        <div className="card">
          <div className="stat-card">
            <h4>Pending</h4>
            <p>{pendingTasks}</p>
          </div>
        </div>

        <div className="card">
          <div className="stat-card">
            <h4>Rejected</h4>
            <p>{rejectedTasks}</p>
          </div>
        </div>

        <div className="card offset-md-3">
          <h2>Revenue</h2>
          <div className="stat-card">
            <h4>Total Revenue</h4>
            <p>${totalRevenue}</p>
          </div>
        </div>

        <div className="card">
          <div className="stat-card">
            <h4>Average Revenue Per Task</h4>
            <p>${averageRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}