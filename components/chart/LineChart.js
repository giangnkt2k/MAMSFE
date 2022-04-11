import { Line } from 'vue-chartjs'
// import * as dashboard from '@/api/dashboard.js'

export default {
  extends: Line,
  props: {
    date: {
      require: true,
      type: Number
    }
  },
  mounted () {
    this.fetchData()
  },
  watch: {
    department () {
      this.fetchData()
    }
  },
  methods: {
    fetchData () {
      try {
        if (this.department !== '') {
          this.$store.commit('pages/setLoading', true)
          // const res = await dashboard.statsUser({
          //   department_id: this.department
          // })
          // const data = res.data.data
          const lineChartData = {
            labels: ['Jan', 'Feb', 'March'],
            datasets: [
              {
                label: 'Electric',
                data: [5, 10, 15],
                backgroundColor: '#ded535',
                borderColor: '#ded535',
                tension: 0.1,
                fill: false
              },
              {
                label: 'Water',
                data: [3, 5, 7],
                backgroundColor: '#294fc2',
                borderColor: '#294fc2',
                tension: 0.1,
                fill: false
              }
            ]
          }
          this.renderChart(lineChartData, this.options)

          // eslint-disable-next-line no-console
          this.$store.commit('pages/setLoading', false)
        }
      } catch (e) {
        this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
        this.$store.commit('pages/setLoading', false)
      }
    }
  }
}
