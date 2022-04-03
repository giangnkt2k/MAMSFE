<template>
  <div>
    <el-dialog
      title="User rent room"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <ValidationObserver
        ref="obsAddBuilding"
        tag="div"
      >
        <div class="row-input grid grid-cols-7 gap-4">
          <div class="col-span-7">
            <div class="mams-label">
              User
            </div>
            <div class="flex flex-row">
              <validation-provider
                v-slot="{ errors }"
                name="building name"
                :rules="{ required: true}"
                class="mb-3 mr-3"
                tag="div"
              >
                <el-select v-model="user" filterable placeholder="Select">
                  <el-option
                    v-for="item in optionsUser"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    clearable
                  />
                </el-select>
                <div class="text-error">
                  {{ errors[0] }}
                </div>
              </validation-provider>
              <div>
                <el-button type="primary" @click="getInforUser(user)">
                  Get infor user
                </el-button>
              </div>
            </div>
            <div v-if="inforUser.name !== ''" class="my-5">
              <el-descriptions class="margin-top" title="User infor" :column="3" size="small" border>
                <!-- <template slot="extra">
                  <el-button type="primary" size="small">
                    Operation
                  </el-button>
                </template> -->
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-user" />
                    Username
                  </template>
                  {{ inforUser.name }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-mobile-phone" />
                    Telephone
                  </template>
                  {{ inforUser.phone }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-s-promotion" />
                    Email
                  </template>
                  {{ inforUser.email }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-date" />
                    Date of birth
                  </template>
                  {{ inforUser.dob }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-tickets" />
                    Indentity card number
                  </template>
                  {{ inforUser.ci_number }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-office-building" />
                    Granting agencies:
                  </template>
                  {{ inforUser.place_of_issuance_of_ci }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-date" />
                    Date of issuance of identity card
                  </template>
                  {{ inforUser.date_of_issuance_of_ci }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label">
                    <i class="el-icon-office-building" />
                    Address
                  </template>
                  {{ inforUser.address }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
            <div class="mt-5">
              <el-tag>{{ constract.type }}</el-tag>
            </div>
            <div class="mt-5">
              <ckeditor-nuxt v-model="constract.content" :config="editorConfig" />
            </div>
          </div>
        </div>
      </ValidationObserver>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import EventBus from '@/utils/eventBus'

export default {
  name: 'ComponentCreateBuilding',
  components: {
    ValidationObserver,
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } }
  },
  props: {
    propsDialogVisible: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      dialogVisible: false,
      dialogVisibleImage: false,
      formData: {
        name: '',
        price: '',
        acreage_m2: '',
        number_of_people: '',
        deposit: '',
        date_empty: '',
        rules: [],
        utilities: [],
        detail: '',
        images: []
      },
      dialogImageUrl: '',
      optionsUser: [],
      user: '',
      inforUser: {
        address: '',
        avatar: '',
        commune: '',
        city: '',
        district: '',
        dob: '',
        name: '',
        phone: '',
        email: '',
        date_of_issuance_of_ci: '',
        ci_number: '',
        id: ''
      },
      room: {
        id: ''
      },
      activeName: 'first',
      constract: {
        type: '',
        content: ''
      }
    }
  },
  watch: {
    dialogVisible (newVal) {
      // eslint-disable-next-line no-console
      console.log(this.propsDialogVisible)
      this.$emit('input', newVal)
    },
    propsDialogVisible (newVal) {
      this.innerValue = newVal
    }
  },
  mounted () {
    EventBus.$on('OpenPopRent', (val, clients, contractInfor, roomDetail) => {
      this.dialogVisible = val
      this.optionsUser = clients
      this.constract = contractInfor
      this.room = roomDetail
    })
    EventBus.$on('hideDeleteConfirmDialog', () => {
      this.dialogVisible = false
    })
  },
  created () {
    this.dialogVisible = this.propsDialogVisible
  },
  methods: {
    async handleSubmit () {
      const isValid = await this.$refs.obsAddBuilding.validate()
      if (!isValid) {
        this.$message.warning('Something went wrong')
        return
      }
      const today = new Date()

      const dateToday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
      const query = {
        user_id: this.inforUser.id,
        contract_id: this.constract.id,
        content: this.constract.content,
        room_id: this.room.id,
        date: dateToday
      }
      // eslint-disable-next-line no-console
      console.log('==>', query)
      this.$emit('handle-submit', query)
      this.dialogVisible = false
      this.handleClearform()
    },
    getInforUser (id) {
      const userId = this.optionsUser.filter(item => item.id === parseInt(this.user))
      this.inforUser = userId[0]
    },
    beforeUpload (file, fileList) {
      // eslint-disable-next-line no-console
      this.$emit('handle-import-image', file)
    },
    handleRemove (file, fileList) {
      this.$emit('handle-remove', file)
      // eslint-disable-next-line no-console
      console.log(file, fileList)
    },
    handlePictureCardPreview (fileImg, list) {
      this.dialogImageUrl = fileImg.url
      this.dialogVisibleImage = true
    },
    handleClickTab (tab) {
      // eslint-disable-next-line no-console
      console.log(tab)
    },
    handleClearform () {
      this.formData = {
        user: '',
        type_contract: '',
        content: ''
      }
      this.dialogImageUrl = ''
    }
  }
}
</script>

<style>
.el-input__inner {
  width: 100%;
}
</style>
