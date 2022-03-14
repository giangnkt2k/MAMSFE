<template>
  <div>
    <el-dialog
      title="Create Building"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <ValidationObserver
        ref="obsAddBuilding"
        tag="div"
      >
        <div class="row-input grid grid-cols-4 gap-4">
          <div class="col-span-4 md:col-span-3">
            <div class="mams-label">
              Building name
            </div>
            <validation-provider
              v-slot="{ errors }"
              name="building name"
              :rules="{ required: true}"
              class="mb-3"
              tag="div"
            >
              <el-input v-model="formData.name" placeholder="Please input building name" />
              <div class="text-error">
                {{ errors[0] }}
              </div>
            </validation-provider>
          </div>
          <div class="col-span-4 mams-label md:col-span-1">
            <div class="mams-label">
              Building type
            </div>
            <el-select v-model="formData.type_building" class="item-input" placeholder="Select building type">
              <el-option
                v-for="(item, index) in optionsBuildingType"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="row-input grid grid-cols-4 gap-4">
          <div class="col-span-4 md:col-span-3">
            <div class="mams-label">
              Building address
            </div>
            <el-input v-model="formData.address" placeholder="Please input building address" />
          </div>
          <div class="col-span-4 mams-label md:col-span-1">
            <div class="mams-label">
              Rental form
            </div>
            <el-select v-model="formData.rental_form" class="item-input" placeholder="Select rental form">
              <el-option
                v-for="(item, index) in optionsRentalForm"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="row-input grid grid-cols-3 gap-4">
          <div class="col-span-3 mams-label md:col-span-1">
            <div class="mams-label">
              City/Province
            </div>
            <el-select v-model="formData.city" class="item-input" filterable placeholder="Select district">
              <el-option
                v-for="(item, index) in optionsCities"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="col-span-3 mams-label md:col-span-1">
            <div class="mams-label">
              District
            </div>
            <el-select v-model="formData.district" class="item-input" filterable placeholder="Select district">
              <el-option
                v-for="(item, index) in optionsDistricts"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="col-span-3 mams-label md:col-span-1">
            <div class="mams-label">
              Commune
            </div>
            <el-select v-model="formData.commune" class="item-input" placeholder="Select commune">
              <el-option
                v-for="(item, index) in optionsCommunes"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="row-input grid grid-cols-2 gap-4">
          <div class="col-span-2 md:col-span-1">
            <div class="mams-label">
              Electricity bill per 1 kwH
            </div>
            <el-input v-model="formData.e_money_1kwh" type="number" placeholder="Number only" />
          </div>
          <div class="col-span-2 mams-label md:col-span-1">
            <div class="mams-label">
              Water bill per 1 block
            </div>
            <el-input v-model="formData.w_money_1block" type="number" placeholder="Number only" />
          </div>
        </div>
        <div class="row-input grid grid-cols-2 gap-4">
          <div class="col-span-2 md:col-span-1">
            <div class="mams-label">
              Date of recording electricity and water indicator
            </div>
            <el-input v-model="formData.date_record_ew" placeholder="Please input date record ew" />
          </div>
          <div class="col-span-2 mams-label md:col-span-1">
            <div class="mams-label">
              Closing date - charge
            </div>
            <el-input v-model="formData.date_charge" placeholder="Please input date charge" />
          </div>
        </div>
        <div class="tab">
          <el-tabs v-model="activeName">
            <el-tab-pane label="Utilities" name="first">
              <el-checkbox-group v-model="formData.utilities" class=" grid grid-cols-3 gap-4">
                <el-checkbox v-for="(item, index) in utilitiesList" :key="index" :label="item.value">
                  <i :class="[item.icon]" />
                  <span class="margin-left: 5px;">{{ item.label }}</span>
                </el-checkbox>
              </el-checkbox-group>
            </el-tab-pane>
            <el-tab-pane label="Rule" name="second">
              <el-checkbox-group v-model="formData.rules" class=" grid grid-cols-1 gap-4 md:grid-span-2">
                <el-checkbox v-for="(item, index) in rulesList" :key="index" :label="item.value">
                  <i :class="[item.icon]" />
                  <span class="margin-left: 5px;">{{ item.label }}</span>
                </el-checkbox>
              </el-checkbox-group>
            </el-tab-pane>
            <el-tab-pane label="Images" name="fourth">
              <el-upload
                action="#"
                :before-upload="beforeUpload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :file-list="fileList"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog :visible.sync="dialogVisibleImage">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="Detail" name="fith">
              <el-input
                v-model="formData.detail"
                type="textarea"
                :rows="2"
                placeholder="Please input"
              />
            </el-tab-pane>
          </el-tabs>
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
import { CITIES, DISTRICTS } from '@/configs/valuesSelect.js'
import { COMMUNES } from '@/configs/communes.js'
import { RULES } from '@/configs/rules.js'
import { UTILITIES } from '@/configs/utilities.js'
export default {
  name: 'ComponentCreateBuilding',
  components: {
    ValidationObserver,
    ValidationProvider
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
        id: '',
        name: '',
        type_building: '',
        address: '',
        rental_form: '',
        city: '',
        district: '',
        w_money_1block: '',
        e_money_1kwh: '',
        commune: '',
        rules: [],
        utilities: [],
        decription: '',
        date_charge: '',
        date_record_ew: '',
        detail: ''
      },
      fileList: [],
      dialogImageUrl: '',
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
      optionsCities: CITIES,
      optionsCommunes: [],
      optionsDistricts: [],
      utilitiesList: UTILITIES,
      rulesList: RULES,
      activeName: 'first'
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
    },
    formData: {
      handler () {
        if (this.formData.city !== '') {
          this.optionsDistricts = DISTRICTS.filter(e => parseInt(e.city) === parseInt(this.formData.city))
        }
        if (this.formData.city !== '') {
          this.optionsCommunes = COMMUNES.filter(e => parseInt(e.district) === parseInt(this.formData.district))
        }
      },
      deep: true
    }
  },
  mounted () {
    EventBus.$on('OpenEditBuilding', (val, data) => {
      this.dialogVisible = val
      this.fileList = []
      // eslint-disable-next-line no-console
      console.log('data', data.data.data)
      const datas = data.data.data
      this.formData.id = datas.id
      this.formData.name = datas.name
      this.formData.type_building = datas.type_building
      this.formData.address = datas.address
      this.formData.rental_form = datas.rental_form
      this.formData.city = datas.city
      this.formData.district = datas.district
      this.formData.commune = datas.commune
      this.formData.w_money_1block = datas.w_money_1block
      this.formData.e_money_1kwh = datas.e_money_1kwh
      this.formData.rules = (datas.rules.slice(1, -1)).split(',').map(e => parseInt(e))
      this.formData.utilities = (datas.utilities.slice(1, -1)).split(',').map(e => parseInt(e))
      this.formData.images = datas.images ? (datas.images.slice(1, -1)).split(',') : []
      this.formData.decription = datas.decription
      this.formData.date_charge = datas.date_charge
      this.formData.date_record_ew = datas.date_record_ew
      this.formData.detail = datas.detail
      // eslint-disable-next-line no-console
      console.log('formdata', this.formData)
      // eslint-disable-next-line no-console
      console.log('formdataimages', this.formData.images.length, this.formData.images)
      if (this.formData.images.length > 0 && this.formData.images[0] !== '') {
        for (let index = 0; index < this.formData.images.length; index++) {
          const element = this.formData.images[index]
          this.fileList.push({
            name: element,
            url: process.env.imgLink + element.slice(1, -1)
          })
        }
      }
      // eslint-disable-next-line no-console
      console.log('com', this.fileList)
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
      this.$emit('handle-submit', this.formData)
      this.dialogVisible = false
    },
    beforeUpload (file, fileList) {
      this.$emit('handle-import-image', file)
    },
    handleRemove (file, fileList) {
      this.$emit('handle-remove', file)
      // eslint-disable-next-line no-console
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisibleImage = true
    }
  }
}
</script>

<style>
.el-input__inner {
  width: 100%;
}
</style>
