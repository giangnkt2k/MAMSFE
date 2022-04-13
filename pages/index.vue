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
              <span>Number of buildings: {{ buildings }}</span>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" class="col-start-1 col-end-4 md:col-start-2 md:col-end-3">
          <div class="flex flex-row items-center">
            <div class="icon-div mr-2">
              <i class="el-icon-s-grid text-3xl text-blue-500" />
            </div>
            <div class="content-card">
              <span>Number of rooms: {{ rooms }}</span>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" class="col-start-1 col-end-4 md:col-start-3">
          <div class="flex flex-row items-center">
            <div class="icon-div mr-2">
              <i class="el-icon-s-custom text-3xl text-purple-500" />
            </div>
            <div class="content-card">
              <span>Number of clients: {{ users }}</span>
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
      <div class="block mb-8 items-center items-baseline">
        <el-card shadow="hover">
          <div class="text-current text-2xl mb-4 text-center font-medium">
            List bills not paied
          </div>
          <div class="md:container md:mx-auto pt-6 justify-center">
            <el-table
              :data="tableData"
              border
            >
              <template v-for="(col, index) in propsTableHeader">
                <el-table-column
                  :key="index"
                  :label="col.title"
                >
                  <template slot-scope="scope">
                    <span class="rowSpan">{{ scope.row[col.field] }}</span>
                  </template>
                </el-table-column>
              </template>
            </el-table>
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
import * as dashboard from '@/api/dashboard'
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
      },
      buildings: '',
      rooms: '',
      users: '',
      tableData: [],
      propsTableHeader: [
        {
          field: 'id',
          title: 'ID'
        },
        {
          field: 'building',
          title: 'Building'
        },
        {
          field: 'room',
          title: 'Room'
        },
        {
          field: 'user',
          title: 'User'
        },
        {
          field: 'date',
          title: 'Date'
        }
      ]
    }
  },
  created () {
    this.fetchSum()
  },
  methods: {
    async fetchSum () {
      try {
        this.$store.commit('pages/setLoading', true)
        const res = await dashboard.list()
        const restTable = await dashboard.listRoomNotPaied()
        const dataResTable = restTable.data.data
        // eslint-disable-next-line no-console
        console.log('restTable', dataResTable)
        const data = res.data.data
        this.buildings = data.buildings
        this.rooms = data.rooms
        this.users = data.users
        const listData = []
        dataResTable.length > 0 && dataResTable.map((e) => {
          // eslint-disable-next-line no-console
          console.log('e', e)
          const item = {
            id: e.id,
            building: e.room.building.name,
            room: e.room.name,
            user: e.user.name,
            date: e.date
          }
          // eslint-disable-next-line no-console
          console.log('item', item)
          return listData.push(item)
        })
        this.tableData = listData
        // eslint-disable-next-line no-console
        console.log('tableData', this.tableData)

        // eslint-disable-next-line no-console
        this.$store.commit('pages/setLoading', false)
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    }
  }
}
</script>
