<template>
  <div>
    <div class="md:container md:mx-auto  pt-6 px-6 md:px-2">
      <el-card class="mb-8">
        <div class="block grid grid-cols-6 gap-4 items-center">
          <div class="w-80 search-div col-start-1 col-end-8  md:col-end-4 flex flex-row">
            <el-input
              v-model="key_search"
              placeholder="Type to search"
            />
            <el-button class="ml-3" icon="el-icon-search" @click="handleSearch" />
          </div>
          <div class="create-div col-start-1 md:col-start-8 col-end-8">
            <el-button type="success" @click="openDialog">
              Create Building
            </el-button>
            <el-button type="warning" @click="openDialogMany">
              Import CSV
            </el-button>
          </div>
        </div>
      </el-card>

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
    </div>
    <dialogs-create-building
      :props-dialog-visible="dialogPop"
      @handle-submit="handleCreate"
      @handle-import-image="handleImportImage"
      @handle-remove="handleRemove"
    />
    <edit
      :props-dialog-visible="dialogPop"
      @handle-submit="handleSubmitEdit"
      @handle-import-image="handleImportImage"
      @handle-remove="handleRemove"
    />
    <create-many
      :props-dialog-visible="dialogPop"
      @handle-create-csv="handleCreateMany"
    />
  </div>
</template>

<script>
import * as buiding from '@/api/building'
import ComponentsTable from '@/components/tableCURD/index.vue'
import DialogsCreateBuilding from '@/components/dialogs/building/dialogsCreateBuilding.vue'
import edit from '@/components/dialogs/building/edit.vue'
import createMany from '@/components/dialogs/building/createMany.vue'
import EventBus from '@/utils/eventBus'
import { CITIES, DISTRICTS } from '@/configs/valuesSelect.js'
import { COMMUNES } from '@/configs/communes.js'
import initToken from '~/mixins/auth.js'

export default {
  name: 'BuildingIndex',
  components: {
    ComponentsTable,
    DialogsCreateBuilding,
    edit,
    createMany
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
          field: 'address',
          title: 'Address'
        },
        {
          field: 'city',
          title: 'City'
        },
        {
          field: 'commune',
          title: 'Commune'
        },
        {
          field: 'date_charge',
          title: 'Date charge'
        },
        {
          field: 'date_record_ew',
          title: 'Date record ew'
        },
        {
          field: 'district',
          title: 'District'
        },
        {
          field: 'rental_form',
          title: 'Rental form'
        },
        {
          field: 'type_building',
          title: 'Type Building'
        },
        {
          field: 'e_money_1kwh',
          title: 'Electric Money 1kwh'
        },
        {
          field: 'w_money_1block',
          title: 'W money 1block'
        }
      ],
      optionsBuildingType: [{
        value: 1,
        label: 'Shop, kiot'
      }, {
        value: 2,
        label: 'Motel'
      }, {
        value: 3,
        label: 'Whole house'
      }, {
        value: 4,
        label: 'Dormitory'
      }, {
        value: 5,
        label: 'Other'
      }],
      optionsRentalForm: [{
        value: 1,
        label: 'Room cover'
      },
      {
        value: 2,
        label: 'Dormitory'
      }],
      // pagination default
      currentPage: 1,
      pageSizes: [10, 50, 100],
      perPage: 5,
      totalItems: 100,
      imageList: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    openDialog () {
      EventBus.$emit('OpenCreateBuilding', true)
    },
    openDialogMany () {
      EventBus.$emit('OpenCreateManyBuilding', true)
    },
    async handleEdit (data) {
      // eslint-disable-next-line no-console
      console.log('data', data)
      try {
        const detailData = await buiding.details(data.id)
        EventBus.$emit('OpenEditBuilding', true, detailData)
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
        await buiding.update(data)
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
        await buiding.add(data)
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
        const deleted = await buiding.destroy(id)
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
          key_search: this.key_search
        }
        if (query.key_search === '') {
          delete query.key_search
        }
        const res = await buiding.list(query)
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
    async handleSearch () {
      await this.fetchData()
    },
    async handleImportImage (file) {
      this.initToken()
      try {
        // eslint-disable-next-line no-console
        const formData = new FormData()

        formData.append('file', file)
        const image = await buiding.importFile(formData)
        // eslint-disable-next-line no-console
        console.log('img', image)
        this.imageList.push(image.data.data)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('e', e)
      }
    },
    async handleCreateMany (file) {
      try {
        // eslint-disable-next-line no-console
        const formData = new FormData()

        formData.append('file', file)
        const image = await buiding.importFileBuilding(formData)
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
      await buiding.deleteImg(fileRemove.name)
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
    }

  }
}
</script>
