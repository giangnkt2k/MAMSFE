<template>
  <div>
    <div class="md:container md:mx-auto  pt-6 px-6 md:px-2">
      <el-card class="block  py-2">
        <div class="row-floo my-3 grid grid-cols-6 gap-4">
          <div class="block col-start-1 col-end-6  md:col-end-2">
            <el-date-picker
              v-model="month"
              type="month"
              :format="'yyyy-MM'"
              value-format="yyyy-MM-dd"
              placeholder="Pick a month"
            />
          </div>
          <el-select
            v-model="building_id"
            filterable
            clearable
            placeholder="Select building"
            class="object-center col-start-1 col-end-6 md:col-start-2  md:col-end-4"
            style="width: 100%;"
            @clear="handleClearBuildingId"
          >
            <el-option
              v-for="(item, index) in optionsBuildings"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-select
            v-model="floor"
            :disabled="building_id === ''"
            filterable
            placeholder="Select floor"
            class="object-center mr-3 col-start-1 col-end-6  md:col-start-4 col-end-5"
            style="width: 100%;"
          >
            <el-option
              v-for="(item, index) in optionFloors"
              :key="index"
              :label="'Floor '+ item"
              :value="item"
            />
          </el-select>
          <el-button :disabled="floor === ''" class="object-center mr-3 col-start-1 col-end-6  md:col-start-6 col-end-6" icon="el-icon-search" @click="fetchData" />
        </div>
      </el-card>
      <div class="block  py-5">
        <el-card class="object-center mr-3 col">
          <el-button :disabled="tableData.length === 0" type="success" @click="createMany">
            Create All Bill
          </el-button>
          <el-dropdown :disabled="tableData.length === 0" split-button type="primary" @command="handleCommand">
            Send bill to user
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="sendingBillEmail">
                  <i class="el-icon-eleme" /> By Email
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="sendingBillSMS">
                  <i class="el-icon-message" /> By SMS
                </div>
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-s-promotion">
                By Telegram
              </el-dropdown-item>
              <el-dropdown-item icon="el-icon-position">
                By Zalo
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-card>
      </div>

      <components-table
        :props-table-data="tableData"
        :props-table-header="tableHeader"
        :props-current-page="currentPage"
        :props-page-sizes="pageSizes"
        :props-page-size="perPage"
        :props-total-items="totalItems"
        :props-hide-edit="true"
        :props-hide-delete="true"
        @handle-save="createOneBill"
        @handle-change-status-bill="changeStatusBill"
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import * as room from '@/api/room'
import * as building from '@/api/building'
import * as bill from '@/api/bill'
// import * as client from '@/api/client'
// import * as contract from '@/api/contract'

import ComponentsTable from '@/components/tableBill/index.vue'
// import EventBus from '@/utils/eventBus'
import initToken from '~/mixins/auth.js'

export default {
  name: 'BuildingIndex',
  components: {
    ComponentsTable
  },
  mixins: [initToken],
  data () {
    return {
      dialogPop: false,
      key_search: '',
      tableData: [],
      tableHeader: [
        {
          field: 'id',
          title: 'ID'
        },
        {
          field: 'building_name',
          title: 'Building'
        },
        {
          field: 'floor_id',
          title: 'Floor'
        },
        {
          field: 'room_name',
          title: 'Room'
        },
        {
          field: 'user_name',
          title: 'User'
        },
        {
          field: 'date',
          title: 'date'
        },
        {
          field: 'room_price',
          title: 'Room price'
        },
        {
          field: 'water_price',
          title: 'Water price'
        },
        {
          field: 'electric_price',
          title: 'Electric price'
        },
        {
          field: 'service_price',
          title: 'Service price'
        },
        {
          field: 'totalPrice',
          title: 'Total Price'
        },
        {
          field: 'status_bill',
          title: 'Status bill'
        }
      ],
      building_id: '',
      floor: '',
      month: '',
      // pagination default
      currentPage: 1,
      pageSizes: [10, 50, 100],
      perPage: 5,
      totalItems: 100,
      imageList: [],
      optionsBuildings: [],
      optionFloors: [],
      dateFinal: 1,
      id_water: '',
      listBillCreated: []
    }
  },
  watch: {
    building_id () {
      if (typeof this.building_id === 'number') {
        const building = this.optionsBuildings.filter(e => e.id === this.building_id)
        this.optionFloors = parseInt(building[0].floor)
        this.dateFinal = building[0].date_record_ew
        // eslint-disable-next-line no-console
        console.log(typeof this.building_id)
      } else {
        this.optionFloors = []
        this.floor = ''
      }
    }
  },
  created () {
    // this.fetchData()
    const now = new Date()
    this.month = new Date(Date.UTC(now.getFullYear(), now.getMonth())).toISOString().slice(0, 10)
    this.fetchListBuilding()
  },
  methods: {
    async createMany () {
      const listBill = []
      for (let i = 0; i < this.tableData.length; i++) {
        const element = this.tableData[i]
        if (this.handleCreatedBillOrNot({
          room_id: element.id,
          date: this.month.slice(0, -3) + '-' + this.dateFinal
        }) !== true) {
          const itemAdd = {
            room_id: element.id,
            user_id: element.user.id,
            date: this.month.slice(0, -3) + '-' + this.dateFinal,
            invoice_component: {
              room_price: element.room_price,
              water_price: element.water_price,
              electric_price: element.electric_price,
              service_price: element.service_price,
              totalPrice: element.totalPrice
            },
            status_bill: 0
          }
          listBill.push(itemAdd)
        }
      }
      // eslint-disable-next-line no-console
      console.log('listBill', listBill)
      try {
        await bill.addMany({
          bills: listBill
        })
        this.fetchData()
        this.$message.success('Save new bills success')
        this.$store.commit('pages/setLoading', false)
      } catch (e) {

      }
    },
    async createOneBill (item) {
      // eslint-disable-next-line no-console
      console.log('item', item)
      try {
        this.$store.commit('pages/setLoading', true)
        await bill.addOne({
          room_id: item.id,
          user_id: item.user.id,
          date: this.month.slice(0, -3) + '-' + this.dateFinal,
          invoice_component: {
            room_price: item.room_price,
            water_price: item.water_price,
            electric_price: item.electric_price,
            service_price: item.service_price,
            totalPrice: item.totalPrice
          },
          status_bill: 0

        })
        this.fetchData()
        this.$message.success('Save new bill success')
        this.$store.commit('pages/setLoading', false)
      } catch (e) {

      }
    },
    async changeStatusBill (item) {
      try {
        // Check the invoice exists or not
        const check = this.listBillCreated.filter(e => (e.room_id === item.id) && (e.date === item.date))

        await bill.update({
          id: check[0].id,
          date: this.month.slice(0, -3) + '-' + this.dateFinal,
          status_bill: 1
        })
        this.fetchData()
        this.$message.success('Save new number success')
        this.$store.commit('pages/setLoading', false)
      } catch (e) {

      }
    },
    async fetchDataBill (query) {
      try {
        this.$store.commit('pages/setLoading', true)
        const res = await bill.listBillByDate(query)
        const data = res.data.data.result ? res.data.data.result : []
        // eslint-disable-next-line no-console
        console.log('data bill', data)
        this.listBillCreated = data
        this.$store.commit('pages/setLoading', false)
      } catch (e) {

      }
    },
    async sendingBillEmail () {
      try {
        this.$store.commit('pages/setLoading', true)
        await bill.sendBillEmail({
          building_id: this.building_id,
          floor_id: this.floor,
          date: this.month.slice(0, -3) + '-' + this.dateFinal
        })
        this.$message.success('Send bill by email success')
        this.$store.commit('pages/setLoading', false)
      } catch (e) {

      }
    },
    async sendingBillSMS () {
      try {
        this.$store.commit('pages/setLoading', true)
        await bill.sendBillSMS({
          building_id: this.building_id,
          floor_id: this.floor,
          date: this.month.slice(0, -3) + '-' + this.dateFinal
        })
        this.$message.success('Send bill by email success')
        this.$store.commit('pages/setLoading', false)
      } catch (e) {

      }
    },
    handleCreatedBillOrNot (value) {
      const check = this.listBillCreated.filter(e => (e.room_id === value.room_id) && (e.date === value.date))
      // eslint-disable-next-line no-console
      console.log('checked', check)
      if (check.length > 0) {
        return true
      } else {
        return false
      }
    },
    statusBill (value) {
      const check = this.listBillCreated.filter(e => (e.room_id === value.room_id) && (e.date === value.date))
      // eslint-disable-next-line no-console
      console.log('checked', check)
      if (check.length > 0) {
        return check[0].status_bill
      } else {
        return 0
      }
    },
    async fetchListBuilding () {
      try {
        this.$store.commit('pages/setLoading', true)
        const res = await building.list({
          page: 1,
          per_page: -1
        })
        // eslint-disable-next-line no-console
        this.optionsBuildings = res.data.data.result ? res.data.data.result : []
        this.$store.commit('pages/setLoading', false)
      } catch (e) {

      }
    },
    async fetchData () {
      try {
        this.$store.commit('pages/setLoading', true)
        const query = {
          page: this.currentPage,
          per_page: this.perPage,
          building_id: this.building_id,
          floor_id: this.floor,
          date: this.month.slice(0, -3) + '-' + this.dateFinal
        }
        this.fetchDataBill({
          date: this.month.slice(0, -3) + '-' + this.dateFinal
        })
        // eslint-disable-next-line no-console
        console.log('query', query)
        const res = await room.listForBill(query)

        const pagination = res.data.data.pagination || {}
        this.currentPage = pagination.current_page
        this.perPage = pagination.per_page
        this.totalItems = pagination.total_records
        const data = res.data.data.result
        const formData = []
        data.length > 0 && data.map((e) => {
          const item = {
            ...e,
            room_name: e.name,
            date: this.month.slice(0, -3) + '-' + this.dateFinal,
            room_price: e.price,
            building_name: e.building.name,
            water_price: (e.water.length > 0) ? (e.water[0].new_number - e.water[0].old_number) * e.building.w_money_1block : 0,
            electric_price: (e.electric.length > 0) ? (e.electric[0].new_number - e.electric[0].old_number) * e.building.e_money_1kwh : 0,
            service_price: (e.utilities.length > 0) ? this.getUtilities(e.utilities).listService : 0,
            user_name: (e.user !== null) ? e.user.name : 'Unknown',
            status_bill: this.statusBill({
              date: this.month.slice(0, -3) + '-' + this.dateFinal,
              room_id: e.id
            }),
            created: this.handleCreatedBillOrNot({
              date: this.month.slice(0, -3) + '-' + this.dateFinal,
              room_id: e.id
            })
          }
          // eslint-disable-next-line no-console
          console.log('item', item)
          const total = parseInt(item.price) + parseInt(item.water_price) + parseInt(item.electric_price) + parseInt(this.getUtilities(e.utilities).totalPrice)
          const itemReturn = {
            ...item,
            totalPrice: total
          }
          return formData.push(itemReturn)
        })
        this.tableData = formData
        // eslint-disable-next-line no-console
        console.log('res', this.tableData)

        this.$store.commit('pages/setLoading', false)
      } catch (e) {
        this.$store.commit('pages/setLoading', false)
      }
    },
    getUtilities (arr) {
      const list = []
      let total = 0
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index]
        const item = {
          id: element.id,
          label: element.label,
          price: element.price
        }
        total = total + parseInt(element.price)
        list.push(item)
      }
      const dataReturn = {
        listService: list,
        totalPrice: total
      }
      return dataReturn
    },
    handleWaterNumber (item, date, type) {
      if (item.length < 1) {
        return 0
      } else if (item.length === 1) {
        const data = item.filter(e => e.date === date)
        if (data.length > 0) {
          return (type === 'old') ? data[0].old_number : data[0].new_number
        } else {
          // eslint-disable-next-line no-console
          console.log('item filter', data[0])
          return (type === 'old') ? data[0].new_number : 0
        }
      } else {
        const data = item.filter(e => e.date === date)
        if (data.length > 0) {
          return (type === 'old') ? data[0].old_number : data[0].new_number
        }
      }
      // eslint-disable-next-line no-console
      console.log('item, date, type', item, date, type)
    },
    async handleSearch () {
      await this.fetchData()
    },
    handleSizeChange (value) {
      this.perPage = value
      this.fetchData()
    },
    handleCurrentChange (value) {
      this.currentPage = value
      this.fetchData()
    },
    handleClearBuildingId () {
      this.floor = ''
      this.optionFloors = []
    }

  }
}
</script>
