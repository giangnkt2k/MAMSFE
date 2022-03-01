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
            <el-select v-model="formData.type" class="item-input" placeholder="Select building type">
              <el-option
                v-for="item in optionsBuildingType"
                :key="item.value"
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
                v-for="item in optionsRentalForm"
                :key="item.value"
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
                v-for="item in optionsCities"
                :key="item.value"
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
                v-for="item in optionsDistricts"
                :key="item.value"
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
                v-for="item in optionsCommunes"
                :key="item.value"
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
            <el-date-picker
              v-model="formData.date_record_ew"
              class="item-input"
              type="date"
              placeholder="Pick a Date"
              format="dd"
            />
          </div>
          <div class="col-span-2 mams-label md:col-span-1">
            <div class="mams-label">
              Closing date - charge
            </div>
            <el-date-picker
              v-model="formData.date_charge"
              class="item-input"
              type="date"
              placeholder="Pick a Date"
              format="dd"
            />
          </div>
        </div>
        <div class="tab">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Utilities" name="first">
              <el-checkbox-group v-model="formData.communes" class=" grid grid-cols-5 gap-4" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="item in communesList" :key="item" :label="item.value">
                  {{ item.label }}
                </el-checkbox>
              </el-checkbox-group>
            </el-tab-pane>
            <el-tab-pane label="Rule" name="second">
              Config
            </el-tab-pane>
            <el-tab-pane label="Map" name="third">
              Role
            </el-tab-pane>
            <el-tab-pane label="Images" name="fourth">
              Task
            </el-tab-pane>
            <el-tab-pane label="Detail" name="fith">
              Task
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
      formData: {
        name: '',
        type: '',
        address: '',
        rental_form: '',
        city: '',
        district: '',
        w_money_1block: '',
        e_money_1kwh: '',
        communes: []
      },
      optionsBuildingType: [{
        value: '1',
        label: 'Shop, kiot'
      }, {
        value: '2',
        label: 'Motel'
      }, {
        value: '3',
        label: 'Whole house'
      }, {
        value: '4',
        label: 'Dormitory'
      }, {
        value: '5',
        label: 'Other'
      }],
      optionsRentalForm: [{
        value: '1',
        label: 'Room cover'
      },
      {
        value: '2',
        label: 'Dormitory'
      }],
      optionsCities: CITIES,
      optionsCommunes: [],
      optionsDistricts: [],
      communesList: UTILITIES
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
      this.$emit('handleSubmit')
    }
  }
}
</script>

<style>
.el-input__inner {
  width: 100%;
}
</style>
