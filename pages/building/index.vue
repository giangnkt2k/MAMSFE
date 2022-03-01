<template>
  <div>
    <div class="md:container md:mx-auto pt-6">
      <div class="block mb-8 grid grid-cols-6 gap-4 items-center">
        <div class="w-80 search-div col-start-1 col-end-3 flex flex-row">
          <el-input
            v-model="search"
            placeholder="Type to search"
          />
          <el-button icon="el-icon-search" style="margin-left: 5px;" />
        </div>
        <div class="create-div col-end-8">
          <el-button type="success" @click="openDialog">
            Create Building
          </el-button>
        </div>
      </div>
      <components-table
        :props-table-data="tableData"
        :props-table-header="tableHeader"
        :props-current-page="currentPage1"
        :props-page-sizes="pageSizes"
        :props-page-size="pageSize"
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
    />
  </div>
</template>

<script>
import * as buiding from '@/api/building'
import ComponentsTable from '@/components/tableCURD/index.vue'
import DialogsCreateBuilding from '~/components/dialogs/dialogsCreateBuilding.vue'
import EventBus from '@/utils/eventBus'

export default {
  name: 'BuildingIndex',
  components: {
    ComponentsTable,
    DialogsCreateBuilding
  },
  data () {
    return {
      dialogPop: false,
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
      // pagination default
      currentPage1: 1,
      pageSizes: [10, 50, 100],
      pageSize: 5,
      totalItems: 100
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    handleClick () {
      // eslint-disable-next-line no-console
      console.log('click')
    },
    openDialog () {
      EventBus.$emit('OpenCreateBuilding', true)
    },
    handleCreate () {
      this.dialogPop = false
    },
    async fetchData () {
      this.$store.commit('pages/setLoading', true)
      const res = await buiding.list({})
      this.tableData = res.data.data.result
      this.$store.commit('pages/setLoading', false)

      // eslint-disable-next-line no-console
      console.log('res', this.tableData)
    },
    handleSizeChange (val) {
      // eslint-disable-next-line no-console
      console.log(`${val} items per page`)
    },
    handleCurrentChange (val) {
      // eslint-disable-next-line no-console
      console.log(`current page: ${val}`)
    }

  }
}
</script>
