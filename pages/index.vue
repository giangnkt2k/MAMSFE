<template>
  <div>
    <div class="md:container md:mx-auto pt-6 px-6 md:px-2">
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
      <div class="block mb-8 grid grid-cols-3 gap-4 items-center">
        <el-card shadow="hover" class="col-start-1 col-end-4 md:col-end-2">
          <div class="flex flex-row items-center">
            <div class="icon-div mr-2">
              <i class="el-icon-s-data text-3xl text-yellow-400" />
            </div>
            <div class="content-card">
              <span>Number of buildings: 1</span>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" class="col-start-1 col-end-4 md:col-start-2 md:col-end-3">
          <div class="flex flex-row items-center">
            <div class="icon-div mr-2">
              <i class="el-icon-s-grid text-3xl text-blue-500" />
            </div>
            <div class="content-card">
              <span>Number of rooms: 1</span>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" class="col-start-1 col-end-4 md:col-start-3">
          <div class="flex flex-row items-center">
            <div class="icon-div mr-2">
              <i class="el-icon-s-custom text-3xl text-purple-500" />
            </div>
            <div class="content-card">
              <span>Number of clients: 1</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="block mb-8 grid grid-cols-2 gap-4 items-center items-baseline">
        <div class="col-start-1 md:col-end-1 col-end-3">
          <el-card shadow="hover">
            <!-- <DonutChart v-if="barChartData !== {}" :data="barChartData" :options="pieOprions" :height="400" /> -->
            <BarChart :options="barChartOptions" :height="400" />
          </el-card>
        </div>
        <div class="md:col-start-2 md:col-end-2 col-start-1 col-end-3">
          <el-card shadow="hover">
            <CircleChart :options="circleChartOptions" :height="400" />
          </el-card>
        </div>
      </div>
      <div class="block mb-8 items-center items-baseline">
        <el-card shadow="hover">
          <div>
            <LineChart :options="lineChartOptions" :height="100" />
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from '@/components/chart/BarChart.js'
import CircleChart from '@/components/chart/CircleChart.js'
import LineChart from '@/components/chart/LineChart.js'
export default {
  name: 'DashboardIndex',
  components: {
    BarChart,
    CircleChart,
    LineChart
  },
  data () {
    return {
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: 'top'
        },
        title: {
          display: true,
          text: 'Number of people in the building',
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1
              },
              gridLines: {
                display: true
              }
            }
          ]
        }
      },
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Index water and electricity',
          fontSize: 24,
          fontColor: '#6b7280'
        }
      },
      circleChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: 'top'
        },
        title: {
          display: true,
          text: 'Status rooms',
          fontSize: 24,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        }
      }
    }
  }
}
</script>
