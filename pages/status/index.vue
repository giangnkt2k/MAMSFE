<template>
  <div class="md:mx-auto pt-6 px-6 md:px-2">
    <div class="block mb-8 grid grid-cols-6 gap-4">
      <div class="col-start-1 col-end-9 md:col-end-3 flex flex-col">
        <div class="max-w-full mx-11">
          <el-card class="bg-white shadow-xl rounded-lg py-3">
            <div class="photo-wrapper p-2">
              <!-- <el-upload
                class="avatar-uploader"
                action="#"
                style="text-align-last: center;"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="formData.avatar" :src="formData.avatar" class="avatar">
                <i class="el-icon-plus avatar-uploader-icon" />
              </el-upload> -->
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="avatar">
            </div>
            <div class="p-2">
              <h3
                class="text-center text-xl text-gray-900 font-medium leading-8"
              >
                {{ currentUser.name }}
              </h3>
              <div class="text-center text-gray-400 text-xs font-semibold">
                <p>{{ (currentUser.role === 3) ? 'Client' : 'Admin' }}</p>
              </div>
              <div class="text-center text-gray-400 text-xs font-semibold" />
              <table class="text-xs my-3">
                <tbody>
                  <!-- <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">
                      <div>Gender</div>
                    </td>
                    <td class="px-2 py-2">
                      <div>{{ currentUser.gender }}</div>
                    </td>
                  </tr> -->
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">
                      <div>Email</div>
                    </td>
                    <td class="px-2 py-2">
                      <div>{{ currentUser.email }}</div>
                    </td>
                    <td class="px-2 py-2" />
                  </tr>
                  <!-- <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">
                      <div>Date of birth</div>
                    </td>
                    <td class="px-2 py-2">
                      <div>{{ formData.dob }}</div>
                    </td>
                  </tr> -->
                  <tr>
                    <td class="px-2 py-2 text-gray-500 font-semibold">
                      <div>Phone</div>
                    </td>
                    <td class="px-2 py-2">
                      <div>{{ currentUser.phone }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-center my-3" />
            </div>
          </el-card>
        </div>
      </div>

      <el-card
        class="
          main-content
          col-start-1
          md:col-start-3
          col-end-9
          bg-white
          shadow-xl
          rounded-lg
        "
      >
        <div class="block mb-8 grid grid-cols-3 gap-4 items-center">
          <el-card shadow="hover" class="col-start-1 col-end-4 md:col-end-2">
            <div class="flex flex-row items-center">
              <div class="icon-div mr-2">
                <i class="el-icon-s-data text-3xl text-yellow-400" />
              </div>
              <div class="content-card">
                <span>Building: {{ status.building }} </span>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover" class="col-start-1 col-end-4 md:col-start-2 md:col-end-3">
            <div class="flex flex-row items-center">
              <div class="icon-div mr-2">
                <i class="el-icon-s-grid text-3xl text-blue-500" />
              </div>
              <div class="content-card">
                <span>Room: {{ status.room }}</span>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover" class="col-start-1 col-end-4 md:col-start-3">
            <div class="flex flex-row items-center">
              <div class="icon-div mr-2">
                <i class="el-icon-s-custom text-3xl text-purple-500" />
              </div>
              <div class="content-card">
                <span>Number of pepple in room: {{ status.numberOfPeople }}</span>
              </div>
            </div>
          </el-card>
        </div>
        <div class="block mb-8 grid grid-cols-2 gap-4 items-center">
          <el-card shadow="hover" class="col-start-1 col-end-1">
            <div class="flex flex-row items-center">
              <div class="icon-div mr-2">
                <i class="el-icon-s-opportunity text-3xl text-yellow-400" />
              </div>
              <div class="content-card">
                <span>Electricity index: {{ status.electric }} </span>
              </div>
            </div>
          </el-card>
          <el-card shadow="hover" class="col-start-2 col-end-2">
            <div class="flex flex-row items-center">
              <div class="icon-div mr-2">
                <i class="el-icon-ship text-3xl text-blue-500" />
              </div>
              <div class="content-card">
                <span>Water index: {{ status.water }} </span>
              </div>
            </div>
          </el-card>
        </div>
        <div>
          <div>
            <span class="text-xl">
              History Bill
            </span>
          </div>
          <components-table
            :props-table-data="tableData"
            :props-table-header="tableHeader"
            :props-current-page="currentPage"
            :props-page-sizes="pageSizes"
            :props-page-size="perPage"
            :props-total-items="totalItems"
            @handle-size-change="handleSizeChange"
            @handle-current-change="handleCurrentChange"
          />
        </div>
        <div class="my-5">
          <div>
            <span class="text-xl">
              Report to Admin
            </span>
          </div>
          <div>
            <el-input
              v-model="mail"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="Please input"
            />
          </div>
          <el-button class="my-2" type="danger" icon="el-icon-message" @click="sendtoAdmin" />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import ComponentsTable from '@/components/tableHistory/index.vue'
import * as bill from '@/api/bill'
import * as status from '@/api/status'
// import * as client from '@/api/client'

export default {
  name: 'StatusUser',
  // middleware: ['routerRole']
  components: {
    ComponentsTable
  },
  data () {
    return {
      formData: {
        name: '',
        phome: '',
        address: '',
        ci_number: '',
        email: '',
        city: '',
        district: '',
        place_of_issuance_of_ci: '',
        date_of_issuance_of_ci: '',
        commune: '',
        rules: [],
        utilities: [],
        detail: '',
        images: [],
        avatar: '',
        dob: ''
      },
      tableHeader: [
        {
          field: 'id',
          title: 'ID'
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
      currentPage: 1,
      pageSizes: [10, 50, 100],
      perPage: 5,
      totalItems: 100,
      tableData: [],
      status: {
        building: null,
        room: null,
        numberOfPeople: null,
        water: null,
        electric: null
      },
      mail: ''
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters['user/getCurrentUser']
    }
  },
  created () {
    this.handleData()
    this.fetchDataBill()
    this.getStatus()
  },
  methods: {
    handleData () {
      setTimeout(() => {
        this.formData.name = this.$store.getters['user/getCurrentUser'].name
        this.formData.id = this.$store.getters['user/getCurrentUser'].id
        this.formData.email = this.$store.getters['user/getCurrentUser'].email
        this.formData.gender = this.$store.getters['user/getCurrentUser'].gender
        this.formData.avatar = this.$store.getters['user/getCurrentUser'].avatar
        this.formData.client_id = this.$store.getters['user/getCurrentUser'].client_id
      }, 500)
    },
    async fetchDataBill () {
      try {
        this.$store.commit('pages/setLoading', true)
        const res = await bill.listBillByRoom({
          user_id: this.$store.getters['user/getCurrentUser'].client_id
        })
        const data = res.data.data.result ? res.data.data.result : []

        // eslint-disable-next-line no-console
        console.log('data bill', data)
        const formData = []
        data.length > 0 && data.map((e) => {
          const item = {
            ...e,
            water_price: e.invoice_component.water_price + ' VND',
            electric_price: e.invoice_component.electric_price + ' VND',
            service_price: this.getUtilities(e.invoice_component.service_price),
            status_bill: (e.status_bill === 0) ? 'Unpaid' : 'Paided',
            totalPrice: e.invoice_component.totalPrice + ' VND'
          }
          // eslint-disable-next-line no-console
          return formData.push(item)
        })
        this.tableData = formData
        const pagination = res.data.data.pagination || {}
        this.currentPage = pagination.current_page
        this.perPage = pagination.per_page
        this.totalItems = pagination.total_records
        this.$store.commit('pages/setLoading', false)
      } catch (e) {

      }
    },
    getUtilities (arr) {
      const list = []
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index]
        const item = element.label + ':' + element.price + ' VND'
        list.push(item)
      }
      return list
    },
    async getStatus () {
      try {
        this.$store.commit('pages/setLoading', true)
        const res = await status.list({
          user_id: this.$store.getters['user/getCurrentUser'].client_id
        })
        const data = res.data.data ? res.data.data : []
        // eslint-disable-next-line no-console
        console.log('data status', data)

        this.status.building = data.room[0].building.name
        this.status.room = data.room[0].name
        this.status.water = data.water
        this.status.electric = data.electric
        this.status.numberOfPeople = data.room[0].number_of_people
        this.$store.commit('pages/setLoading', false)
      } catch (e) {

      }
    },
    async sendtoAdmin () {
      try {
        this.$store.commit('pages/setLoading', true)
        await status.sendtoAdmin({
          client: this.$store.getters['user/getCurrentUser'].name,
          content: this.mail
        })
        this.$message.success('Report success')
        this.$store.commit('pages/setLoading', false)
        this.mail = ''
      } catch (e) {

      }
    },
    handleSizeChange (value) {
      this.perPage = value
      this.fetchDataBill()
    },
    handleCurrentChange (value) {
      this.currentPage = value
      this.fetchDataBill()
    }
  }
}
</script>

<style>

</style>
