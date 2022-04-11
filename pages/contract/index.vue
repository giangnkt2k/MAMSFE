<template>
  <div>
    <div class="md:container md:mx-auto  pt-6 px-6 md:px-2">
      <el-card>
        <div class="my-5 text-lg text-xl">
          <span class="font-semibold text-cyan-800"> Deposit </span>
        </div>
        <div class="block mb-8 grid grid-cols-6 gap-4 items-center">
          <div class="w-80 search-div col-start-1 col-end-8  md:col-end-4 flex flex-row">
            <el-input
              v-model="key_search"
              placeholder="Type to search"
            />
            <el-button class="ml-3" icon="el-icon-search" @click="handleSearch" />
          </div>
          <div class="create-div col-start-1 md:col-start-8 col-end-8">
            <el-button type="success" @click="openDialog">
              Create Contract
            </el-button>
          </div>
        </div>
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
        />
      </el-card>
      <el-card class="my-5">
        <div>
          <div class="my-5 text-lg text-xl">
            <span class="font-semibold text-cyan-800"> Deposit Signed </span>
          </div>
          <components-table
            :props-table-data="tableDataContractSign"
            :props-table-header="tableHeaderContractSign"
            :props-current-page="currentPageContractSign"
            :props-page-sizes="pageSizesContractSign"
            :props-page-size="perPageContractSign"
            :props-hide-edit="true"
            :props-hide-delete="false"
            :props-total-items="totalItemsContractSign"
            @handle-delete="handleDeleteContractSign"
            @handle-size-change="handleSizeChangeContractSign"
            @handle-current-change="handleCurrentChangeContractSign"
          />
        </div>
      </el-card>
    </div>
    <create
      :props-dialog-visible="dialogPop"
      @handle-submit="handleCreate"
      @handle-remove="handleRemove"
    />
    <edit
      :props-dialog-visible="dialogPop"
      @handle-submit="handleSubmitEdit"
      @handle-remove="handleRemove"
    />
    <edit-contract-sign />
  </div>
</template>

<script>
import * as contract from '@/api/contract'
import * as rental from '@/api/rental'
import ComponentsTable from '@/components/tableCURD/index.vue'
import create from '@/components/dialogs/contract/create.vue'
import edit from '@/components/dialogs/contract/edit.vue'
import editContractSign from '@/components/dialogs/rental/edit.vue'
import EventBus from '@/utils/eventBus'
import { CITIES, DISTRICTS } from '@/configs/valuesSelect.js'
import { COMMUNES } from '@/configs/communes.js'
import initToken from '~/mixins/auth.js'

export default {
  name: 'BuildingIndex',
  components: {
    ComponentsTable,
    create,
    edit,
    editContractSign
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
          field: 'type',
          title: 'Type'
        }
      ],
      tableHeaderContractSign: [
        {
          field: 'id',
          title: 'ID'
        },
        {
          field: 'user',
          title: 'User'
        },
        {
          field: 'contract',
          title: 'Contract'
        },
        {
          field: 'room',
          title: 'Room'
        },
        {
          field: 'date',
          title: 'Date'
        }
      ],
      // pagination default
      currentPage: 1,
      pageSizes: [10, 50, 100],
      perPage: 5,
      totalItems: 100,

      currentPageContractSign: 1,
      pageSizesContractSign: [10, 50, 100],
      perPageContractSign: 5,
      totalItemsContractSign: 100,
      imageList: []
    }
  },
  created () {
    this.fetchData()
    this.fetchDataContractSign()
  },
  methods: {
    openDialog () {
      EventBus.$emit('OpenCreateContract', true)
    },
    async handleEdit (data) {
      // eslint-disable-next-line no-console
      console.log('data', data)
      try {
        const detailData = await contract.details(data.id)
        EventBus.$emit('OpenEditContract', true, detailData)
      } catch (e) {
        this.$message.error('Create building unsuccess')
        this.dialogPop = false
        this.$store.commit('pages/setLoading', false)
      }
    },
    async handleSubmitEdit (data) {
      try {
        this.$store.commit('pages/setLoading', true)
        data.images = this.imageList
        // eslint-disable-next-line no-console
        console.log('submit', data)
        await contract.update(data)
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
        await contract.add(data)
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
        const deleted = await contract.destroy(id)
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
    async handleDeleteContractSign (id) {
      try {
        this.$store.commit('pages/setLoading', true)
        const deleted = await rental.destroy(id)
        this.$message.success('Delete Rental contract success')
        // eslint-disable-next-line no-console
        console.log('del', deleted)
        this.$store.commit('pages/setLoading', false)
        this.fetchDataContractSign()
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
          key_search: this.key_search
        }
        if (query.key_search === '') {
          delete query.key_search
        }
        const res = await contract.list(query)
        // eslint-disable-next-line no-console
        console.log('pagin', res.data.data.pagination)
        const pagination = res.data.data.pagination || {}
        this.currentPage = pagination.current_page
        this.perPage = pagination.per_page
        this.totalItems = pagination.total_records
        this.tableData = res.data.data.result
        // eslint-disable-next-line no-console
        console.log('ok', this.tableData)
        for (let i = 0; i < this.tableData.length; i++) {
          const city = CITIES.filter(e => e.value === this.tableData[i].city)
          this.tableData[i].city = city[0].label
          const commune = COMMUNES.filter(e => e.value === this.tableData[i].commune)
          this.tableData[i].commune = commune[0].label
          const district = DISTRICTS.filter(e => e.value === this.tableData[i].district)
          this.tableData[i].district = district[0].label
          const rentalForm = this.optionsRentalForm.filter(e => e.value === this.tableData[i].rental_form)
          this.tableData[i].rental_form = rentalForm[0].label
          const typeBuilding = this.optionsBuildingType.filter(e => e.value === this.tableData[i].type_building)
          this.tableData[i].type_building = typeBuilding[0].label
        }
        this.$store.commit('pages/setLoading', false)

        // eslint-disable-next-line no-console
        console.log('res', this.tableData)
      } catch (e) {
        this.$store.commit('pages/setLoading', false)
      }
    },
    async fetchDataContractSign () {
      try {
        this.$store.commit('pages/setLoading', true)
        const query = {
          page: this.currentPage,
          per_page: this.perPage,
          key_search: this.key_search
        }
        if (query.key_search === '') {
          delete query.key_search
        }
        const res = await rental.list(query)
        // eslint-disable-next-line no-console
        console.log('pagin', res.data.data.pagination)
        const pagination = res.data.data.pagination || {}
        this.currentPageContractSign = pagination.current_page
        this.perPageContractSign = pagination.per_page
        this.totalItemsContractSign = pagination.total_records
        const dataContractSign = res.data.data.result
        const listData = []
        dataContractSign.length > 0 && dataContractSign.map((item) => {
          const itemCs = {
            id: item.id,
            user: item.user.name,
            contract: item.contract.type,
            room: item.room.name,
            date: item.date
          }
          return listData.push(itemCs)
        })
        this.tableDataContractSign = listData
        // eslint-disable-next-line no-console
        console.log('tableDataContractSign', this.tableDataContractSign)

        this.$store.commit('pages/setLoading', false)
      } catch (e) {
        this.$store.commit('pages/setLoading', false)
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
    }

  }
}
</script>
