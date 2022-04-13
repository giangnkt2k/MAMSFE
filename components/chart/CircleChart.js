import { Pie } from 'vue-chartjs'
import * as dashboard from '@/api/dashboard.js'

export default {
  extends: Pie,
  props: ['data', 'options'],
  async mounted () {
    try {
      this.$store.commit('pages/setLoading', true)
      const res = await dashboard.roomStatus()
      const dataC = res.data.data
      const newTitle = ['Fill', 'Empty']
      // data.title.length > 0 && data.title.map((tt) => {
      //   const newT = tt.slice(0, 8)
      //   return newTitle.push(newT)
      // })
      const barChartData = {
        labels: newTitle,
        datasets: [
          {
            label: 'Client',
            data: dataC,
            backgroundColor: ['#fff', '#294fc2'],
            borderColor: '#294fc2',
            borderWidth: 2
          }
        ]
      }
      this.renderChart(barChartData, this.options)

      // eslint-disable-next-line no-console
      this.$store.commit('pages/setLoading', false)
    } catch (e) {
      this.$message.error(e.response.data.status_code + ' ' + e.response.data.message)
      this.$store.commit('pages/setLoading', false)
    }
  }
}
