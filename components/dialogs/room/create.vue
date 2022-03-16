<template>
  <div>
    <el-dialog
      title="Create Room"
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
              Room name
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
        </div>
        <div class="row-input grid grid-cols-3 gap-4">
          <div class="col-span-3 mams-label md:col-span-1">
            <div class="mams-label">
              Price (VND)
            </div>
            <validation-provider
              v-slot="{ errors }"
              name="price"
              :rules="{ required: true, numeric: true}"
              class="mb-3"
              tag="div"
            >
              <el-input v-model="formData.price" placeholder="Please input price" />
              <div class="text-error">
                {{ errors[0] }}
              </div>
            </validation-provider>
          </div>
          <div class="col-span-3 mams-label md:col-span-1">
            <div class="mams-label">
              Acreage (m2)
            </div>
            <validation-provider
              v-slot="{ errors }"
              name="acreage"
              :rules="{ required: true, numeric: true}"
              class="mb-3"
              tag="div"
            >
              <el-input v-model="formData.acreage" placeholder="Please input acreage" />
              <div class="text-error">
                {{ errors[0] }}
              </div>
            </validation-provider>
          </div>
          <div class="col-span-3 mams-label md:col-span-1">
            <div class="mams-label">
              Number of pepple
            </div>
            <validation-provider
              v-slot="{ errors }"
              name="number of pepple"
              :rules="{ required: true, numeric: true}"
              class="mb-3"
              tag="div"
            >
              <el-input v-model="formData.number_of_people" placeholder="Please input umber of pepple" />
              <div class="text-error">
                {{ errors[0] }}
              </div>
            </validation-provider>
          </div>
        </div>
        <div class="row-input grid grid-cols-7 gap-4">
          <div class="col-span-7">
            <div class="mams-label">
              Date empty
            </div>
            <validation-provider
              v-slot="{ errors }"
              name="building name"
              :rules="{ required: true}"
              class="mb-3"
              tag="div"
            >
              <el-date-picker
                v-model="formData.date_empty"
                type="date"
                placeholder="Pick a day"
              />
              <div class="text-error">
                {{ errors[0] }}
              </div>
            </validation-provider>
          </div>
        </div>
        <div class="tab">
          <el-tabs v-model="activeName" @tab-click="handleClickTab">
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
        name: '',
        price: '',
        acreage: '',
        number_of_people: '',
        deposit: '',
        date_empty: '',
        rules: [],
        utilities: [],
        detail: '',
        images: []
      },
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
        if (this.formData.district !== '') {
          this.optionsCommunes = COMMUNES.filter(e => parseInt(e.district) === parseInt(this.formData.district))
        }
      },
      deep: true
    }
  },
  mounted () {
    EventBus.$on('OpenCreateBuilding', (val) => {
      this.dialogVisible = val
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
      this.handleClearform()
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
      this.$emit('handle-import-image', fileImg)
      this.dialogImageUrl = fileImg.url
      this.dialogVisibleImage = true
    },
    handleClickTab (tab) {
      // eslint-disable-next-line no-console
      console.log(tab)
    },
    handleClearform () {
      this.formData = {
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
        detail: '',
        images: []
      }
    }
  }
}
</script>

<style>
.el-input__inner {
  width: 100%;
}
</style>
