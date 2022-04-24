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
      <components-table
        :props-table-data="tableData"
        :props-table-header="tableHeader"
        :props-current-page="currentPage"
        :props-page-sizes="pageSizes"
        :props-page-size="perPage"
        :props-total-items="totalItems"
        :props-hide-edit="true"
        :props-hide-delete="true"
        @handle-save="handleSave"
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import * as room from '@/api/room'
import * as building from '@/api/building'
import * as water from '@/api/water'
// import * as client from '@/api/client'
// import * as contract from '@/api/contract'

import ComponentsTable from '@/components/tableEditInside/index.vue'
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
          field: 'building',
          title: 'Building'
        },
        {
          field: 'floor_id',
          title: 'Floor'
        },
        {
          field: 'room',
          title: 'Room'
        },
        {
          field: 'old_number',
          title: 'Old number'
        },
        {
          field: 'new_number',
          title: 'New number'
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
      id_water: ''
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
    async handleSave (item, val) {
      // eslint-disable-next-line no-console
      // eslint-disable-next-line no-console
      console.log('waterw==>', item)
      if (item.water.length > 0) {
        const data = item.water.filter(e => e.date === this.month.slice(0, -3) + '-' + this.dateFinal)
        // eslint-disable-next-line no-console
        console.log('water==>', data)
        if (data.length > 0) {
          this.id_water = data[0].id
        } else {
          this.id_water = ''
        }
      }
      // eslint-disable-next-line no-console
      console.log('item==>', typeof (this.id_water), this.id_water)

      try {
        this.$store.commit('pages/setLoading', true)
        if (this.id_water !== '') {
          await water.update({
            id: this.id_water,
            room_id: item.id,
            old_number: parseInt(item.old_number),
            new_number: parseInt(item.new_number),
            date: this.month.slice(0, -3) + '-' + this.dateFinal

          })
        } else {
          await water.add({
            room_id: item.id,
            old_number: parseInt(item.old_number),
            new_number: parseInt(item.new_number),
            date: this.month.slice(0, -3) + '-' + this.dateFinal
          })
        }

        // eslint-disable-next-line no-console
        this.$message.success('Save new number success')
        this.$store.commit('pages/setLoading', false)
      } catch (e) {

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
        // eslint-disable-next-line no-console
        console.log('query', query)
        const res = await room.listWaterCollections(query)

        const pagination = res.data.data.pagination || {}
        this.currentPage = pagination.current_page
        this.perPage = pagination.per_page
        this.totalItems = pagination.total_records
        const data = res.data.data.result
        const formData = []
        data.length > 0 && data.map((e) => {
          const item = {
            ...e,
            building: e.building.name,
            floor_id: e.floor_id,
            room: e.name,
            old_number: this.handleWaterNumber(e.water, this.month.slice(0, -3) + '-' + this.dateFinal, 'old')
            // new_number: this.handleWaterNumber(e.water, this.month.slice(0, -3) + '-' + this.dateFinal, 'new')
          }
          return formData.push(item)
        })
        this.tableData = formData
        // eslint-disable-next-line no-console
        console.log('tableData', this.tableData)
        this.$store.commit('pages/setLoading', false)

        // eslint-disable-next-line no-console
        console.log('res', this.tableData)
      } catch (e) {
        this.$store.commit('pages/setLoading', false)
      }
    },
    handleWaterNumber (item, date, type) {
      if (item.length < 1) {
        return 0
      } else {
        const dataThisMonth = item.filter(e => e.date === date)
        const dataLastMonth = item.filter(e => e.date !== date)

        if (dataThisMonth.length > 0 && dataLastMonth.length > 0) {
          return (type === 'old') ? dataLastMonth[0].new_number : dataThisMonth[0].new_number
        } else if (dataThisMonth.length > 0 && dataLastMonth.length < 1) {
          return (type === 'old') ? dataThisMonth[0].old_number : dataThisMonth[0].new_number
        } else if (dataThisMonth.length < 1 && dataLastMonth.length > 0) {
          return (type === 'old') ? dataLastMonth[0].new_number : 0
        }
      }
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
