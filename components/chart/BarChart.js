import { Bar } from 'vue-chartjs'
import * as dashboard from '@/api/dashboard.js'

export default {
  extends: Bar,
  props: ['data', 'options'],
  async mounted () {
    try {
      this.$store.commit('pages/setLoading', true)
      const res = await dashboard.clientsInBuilding()
      // eslint-disable-next-line no-console
      console.log('res', res.data.data[0])
      const data = res.data.data[0]
      // const data = res.data.data
      // data.title.length > 0 && data.title.map((tt) => {
      //   const newT = tt.slice(0, 8)
      //   return newTitle.push(newT)
      // })
      const barChartData = {
        labels: data.labels,
        datasets: [
          {
            label: 'Client',
            data: data.clients,
            backgroundColor: '#294fc2',
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
