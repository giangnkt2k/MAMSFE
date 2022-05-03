<template>
  <div>
    <div class="md:container md:mx-auto  pt-6 px-6 md:px-2">
      <el-card class="block  py-2">
        <div class="row-btn-room">
          <el-dropdown class="mr-2">
            <el-button type="primary">
              Bill Option<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>Automatic invoice generation</el-dropdown-item>
              <el-dropdown-item>Customize invoice</el-dropdown-item>
              <el-dropdown-item>Print invoice</el-dropdown-item>
              <el-dropdown-item>Send Invoice</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="primary">
            Price list configuration
          </el-button>
          <el-button :disabled="(typeof building_id !== 'number' || floor === '')" type="success" @click="openDialog">
            Create Room
          </el-button>
        </div>
        <div class="row-floo my-3 grid grid-cols-6 gap-4">
          <el-select
            v-model="building_id"
            filterable
            clearable
            placeholder="Select building"
            class="object-center col-start-1 col-end-6  md:col-end-4"
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
      <el-card class="my-5">
        <div class="block grid grid-cols-6 gap-4 items-center mt-3s">
          <div class="w-80 search-div col-start-1 col-end-8  md:col-end-4 flex flex-row">
            <el-input
              v-model="key_search"
              :disabled="(typeof building_id !== 'number' || floor === '')"
              placeholder="Type to search"
            />
            <el-button :disabled="(typeof building_id !== 'number' || floor === '')" class="ml-3" icon="el-icon-search" @click="handleSearch" />
          </div>
        </div>
      </el-card>

      <!-- <csv /> -->
      <components-table
        :props-table-data="tableData"
        :props-table-header="tableHeader"
        :props-current-page="currentPage"
        :props-page-sizes="pageSizes"
        :props-page-size="perPage"
        :props-total-items="totalItems"
        @handle-edit="handleEdit"
        @handle-delete="handleDelete"
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"
        @handle-renting="handleRenting"
        @handle-deposit="handleDeposit"
      />
    </div>
    <create
      :props-dialog-visible="dialogPop"
      @handle-submit="handleCreate"
      @handle-import-image="handleImportImage"
      @handle-remove="handleRemove"
    />
    <edit
      :props-dialog-visible="dialogPopEdit"
      @handle-submit="handleSubmitEdit"
      @handle-import-image="handleImportImage"
      @handle-remove="handleRemove"
    />
    <renting
      @handle-submit="handleRental"
    />
  </div>
</template>

<script>
import * as room from '@/api/room'
import * as building from '@/api/building'
import * as client from '@/api/client'
import * as contract from '@/api/contract'
import * as rental from '@/api/rental'

import ComponentsTable from '@/components/tableExpandable/index.vue'
// import csv from '@/components/csv/index.vue'
import create from '@/components/dialogs/room/create.vue'
import edit from '@/components/dialogs/room/edit.vue'
import renting from '@/components/dialogs/room/renting.vue'
import EventBus from '@/utils/eventBus'
import initToken from '~/mixins/auth.js'

export default {
  name: 'BuildingIndex',
  components: {
    ComponentsTable,
    create,
    edit,
    renting
    // csv
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
          field: 'name',
          title: 'Name'
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
          field: 'number_of_people',
          title: 'Number Of People'
        },
        {
          field: 'price',
          title: 'Price'
        },
        {
          field: 'acreage_m2',
          title: 'Acreage (m2)'
        },
        {
          field: 'deposit',
          title: 'Deposit'
        },
        {
          field: 'date_empty',
          title: 'Date empty'
        }
        // {
        //   field: 'status',
        //   title: 'Status'
        // }
      ],
      building_id: '',
      floor: '',
      // pagination default
      currentPage: 1,
      pageSizes: [10, 50, 100],
      perPage: 5,
      totalItems: 100,
      imageList: [],
      optionsBuildings: [],
      optionFloors: []
    }
  },
  watch: {
    building_id () {
      if (typeof this.building_id === 'number') {
        const building = this.optionsBuildings.filter(e => e.id === this.building_id)
        this.optionFloors = parseInt(building[0].floor)
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
    this.fetchListBuilding()
  },
  methods: {
    // renting
    async handleRenting (val) {
      // eslint-disable-next-line no-console
      console.log('val', val)
      try {
        const resClients = await client.list({
          page: 1,
          per_page: -1
        })
        const clients = resClients.data.data.result
        const resContract = await contract.details(1)
        const contracts = resContract.data.data
        const detailData = await room.details(val.id)
        const roomDetail = detailData.data.data
        EventBus.$emit('OpenPopRent', true, clients, contracts, roomDetail)
      } catch (e) {
        this.$message.error('Open fail')
        this.$store.commit('pages/setLoading', false)
      }
    },
    async handleDeposit (val) {
      // eslint-disable-next-line no-console
      console.log('val', val)
      try {
        const resClients = await client.list({
          page: 1,
          per_page: -1
        })
        const clients = resClients.data.data.result
        const resContract = await contract.details(2)
        const contracts = resContract.data.data
        const detailData = await room.details(val.id)
        const roomDetail = detailData.data.data
        EventBus.$emit('OpenPopRent', true, clients, contracts, roomDetail)
      } catch (e) {
        this.$message.error('Open fail')
        this.$store.commit('pages/setLoading', false)
      }
    },
    async handleRental (query) {
      try {
        const res = await rental.add(query)
        // eslint-disable-next-line no-console
        console.log('data', res)
        this.$message.success('Create rental success')
        this.fetchData()
      } catch (e) {
        this.$message.error('Open fail')
        this.$store.commit('pages/setLoading', false)
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
        console.log('list building', res.data.data.result)
        this.optionsBuildings = res.data.data.result ? res.data.data.result : []
        this.$store.commit('pages/setLoading', false)
      } catch (e) {

      }
    },
    openDialog () {
      EventBus.$emit('OpenCreateBuilding', true)
    },
    async handleEdit (data) {
      // eslint-disable-next-line no-console
      console.log('data', data)
      try {
        const detailData = await room.details(data.id)
        EventBus.$emit('OpenEditRoom', true, detailData)
      } catch (e) {
        this.$message.error('Create building unsuccess')
        this.dialogPopEdit = false
        this.$store.commit('pages/setLoading', false)
      }
    },
    async handleSubmitEdit (data) {
      try {
        this.$store.commit('pages/setLoading', true)
        data.images = this.imageList
        // eslint-disable-next-line no-console
        console.log('submit', data)
        await room.update(data)
        this.$message.success('Update building success')
        this.dialogPop = false
        this.$store.commit('pages/setLoading', false)
        this.fetchData()
      } catch (e) {
        this.$message.error('Update building unsuccess')
        this.dialogPop = false
        this.$store.commit('pages/setLoading', false)
      }
    },
    async handleCreate (data) {
      try {
        this.$store.commit('pages/setLoading', true)
        data.images = this.imageList
        data.building_id = this.building_id
        data.floor_id = this.floor
        await room.add(data)
        this.imageList = []
        this.$message.success('Create building success')
        this.dialogPop = false
        this.$store.commit('pages/setLoading', false)
        this.fetchData()
      } catch (e) {
        this.$message.error('Create building unsuccess')
        this.dialogPop = false
        this.$store.commit('pages/setLoading', false)
      }
    },
    async handleDelete (id) {
      try {
        this.$store.commit('pages/setLoading', true)
        const deleted = await room.destroy(id)
        this.$message.success('Delete building success')
        // eslint-disable-next-line no-console
        console.log('del', deleted)
        this.$store.commit('pages/setLoading', false)
        this.fetchData()
      } catch (e) {
        this.$message.error('Some things happened')
        this.dialogPop = false
        this.$store.commit('pages/setLoading', false)
      }
    },
    async fetchData () {
      try {
        this.$store.commit('pages/setLoading', true)
        const query = {
          page: this.currentPage,
          per_page: this.perPage,
          key_search: this.key_search,
          building_id: this.building_id,
          floor: this.floor
        }
        if (query.key_search === '') {
          delete query.key_search
        }
        const res = await room.list(query)
        // eslint-disable-next-line no-console
        console.log('pagin', res.data.data.pagination)
        const pagination = res.data.data.pagination || {}
        this.currentPage = pagination.current_page
        this.perPage = pagination.per_page
        this.totalItems = pagination.total_records
        const data = res.data.data.result
        const formData = []
        data.length > 0 && data.map((e) => {
          const item = {
            ...e,
            building: e.building.name

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
    async handleSearch () {
      await this.fetchData()
    },
    async handleImportImage (file) {
      this.initToken()
      try {
        // eslint-disable-next-line no-console
        const formData = new FormData()

        formData.append('file', file)
        const image = await room.importFile(formData)
        // eslint-disable-next-line no-console
        console.log('img', image)
        this.imageList.push(image.data.data)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('e', e)
      }
    },
    async handleRemove (fileRemove) {
      this.initToken()

      // eslint-disable-next-line no-console
      console.log('remove đê', fileRemove)
      this.imageList = this.imageList.filter(file => file.name !== fileRemove.name)
      await room.deleteImg(fileRemove.name)
      // eslint-disable-next-line no-console
      console.log('remove luôn', this.imageList)
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
