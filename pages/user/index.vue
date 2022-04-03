<template>
  <div>
    <div class="md:container md:mx-auto  pt-6 px-6 md:px-2">
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
            Create User
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
    </div>
    <create
      :props-dialog-visible="dialogPop"
      @handle-submit="handleCreate"
      @handle-import-image-id-card="handleImportImage"
      @handle-import-avatar="handleImportAvatar"
      @handle-remove="handleRemove"
    />
    <edit
      :props-dialog-visible="dialogPop"
      @handle-submit="handleSubmitEdit"
      @handle-import-image-id-card="handleImportImage"
      @handle-import-avatar="handleImportAvatar"
      @handle-remove="handleRemove"
    />
  </div>
</template>

<script>
import * as client from '@/api/client'
import ComponentsTable from '@/components/tableCURD/index.vue'
import create from '@/components/dialogs/client/create.vue'
import edit from '@/components/dialogs/client/edit.vue'
import EventBus from '@/utils/eventBus'
import initToken from '~/mixins/auth.js'

export default {
  name: 'BuildingIndex',
  components: {
    ComponentsTable,
    create,
    edit
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
          field: 'avatar',
          title: 'Avatar'
        },
        {
          field: 'address',
          title: 'Address'
        },
        {
          field: 'email',
          title: 'Email'
        },
        {
          field: 'dob',
          title: 'Date of birth'
        },
        {
          field: 'phone',
          title: 'Phone'
        }
      ],
      // pagination default
      currentPage: 1,
      pageSizes: [10, 50, 100],
      perPage: 5,
      totalItems: 100,
      imageList: [],
      imageListAva: ''
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    openDialog () {
      EventBus.$emit('OpenCreateClient', true)
    },
    async handleEdit (data) {
      // eslint-disable-next-line no-console
      console.log('data', data)
      try {
        const detailData = await client.details(data.id)
        EventBus.$emit('OpenEditClient', true, detailData)
      } catch (e) {
        this.$message.error('Create building unsuccess')
        this.dialogPop = false
        this.$store.commit('pages/setLoading', false)
      }
    },
    async handleSubmitEdit (data, imagesData) {
      try {
        this.$store.commit('pages/setLoading', true)
        if (this.imageList.length > 0) {
          const imagesParam = []
          for (let index = 0; index < imagesData.length; index++) {
            const element = imagesData[index].name.slice(1, -1)
            imagesParam.push(element)
          }
          for (let index = 0; index < this.imageList.length; index++) {
            const element = this.imageList[index]
            imagesParam.push(element)
          }
          data.images = imagesParam
        } else {
          delete data.images
        }
        if (this.imageListAva !== '') {
          // eslint-disable-next-line no-console
          console.log('imageListAva', this.imageListAva)
          data.avatar = this.imageListAva.slice(1, -1)
        } else {
          delete data.avatar
        }
        // eslint-disable-next-line no-console
        console.log('submit', data)
        await client.update(data)
        this.$message.success('Update building success')
        this.dialogPop = false
        this.imageList = []
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
        if (this.imageList.length > 0) {
          data.images = this.imageList
        } else {
          delete data.images
        }
        if (this.imageListAva !== '') {
          data.avatar = this.imageListAva
        } else {
          delete data.avatar
        }
        await client.add(data)
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
        const deleted = await client.destroy(id)
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
        const res = await client.list(query)
        // eslint-disable-next-line no-console
        console.log('pagin', res.data.data.pagination)
        const pagination = res.data.data.pagination || {}
        this.currentPage = pagination.current_page
        this.perPage = pagination.per_page
        this.totalItems = pagination.total_records
        const listData = []
        res.data.data.result.length > 0 && res.data.data.result.map((e) => {
          const eData = {
            ...e,
            avatar: (e.avatar) ? process.env.imgLink + e.avatar.slice(1, -1) : '#'
          }
          return listData.push(eData)
        })
        this.tableData = listData
        // eslint-disable-next-line no-console
        console.log('ok', this.tableData)
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
    async handleImportAvatar (file) {
      this.initToken()
      try {
        // eslint-disable-next-line no-console
        const formData = new FormData()

        formData.append('avatar', file)
        const image = await client.importFileAvatar(formData)
        this.imageListAva = image.data.data
        // eslint-disable-next-line no-console
        console.log('ava', this.imageListAva)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('e', e)
      }
    },
    async handleImportImage (file) {
      this.initToken()
      try {
        // eslint-disable-next-line no-console
        const formData = new FormData()

        formData.append('file', file)
        const image = await client.importFile(formData)
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
      this.imageList = this.imageList.filter(file => file !== fileRemove.name)
      await client.deleteImg(fileRemove.name)
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
