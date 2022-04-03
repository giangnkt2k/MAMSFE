<template>
  <div>
    <el-dialog
      title="Edit Client"
      :visible.sync="dialogVisible"
      append-to-body
      width="70%"
    >
      <div class="grid grid-cols-4 gap-4">
        <div class="col-span-4 md:col-span-1 justify-center">
          <div class="items-center">
            <div class="mams-label text-center">
              Avatar
            </div>
            <validation-provider
              v-slot="{ errors }"
              name="date of recording electricity and water indicator"
              :rules="{ required: true, numeric: true,}"
              class="mb-3"
              tag="div"
            >
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
              <div class="text-error">
                {{ errors[0] }}
              </div>
            </validation-provider>
          </div>
        </div>
        <div class="col-span-4 md:col-span-3">
          <ValidationObserver
            ref="obsAddBuilding"
            tag="div"
          >
            <div class="row-input grid grid-cols-2 gap-4">
              <div class="col-span-2 md:col-span-1">
                <div class="mams-label">
                  Name
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="name"
                  :rules="{ required: true}"
                  class="mb-3"
                  tag="div"
                >
                  <el-input v-model="formData.name" placeholder="Please input name" />
                  <div class="text-error">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </div>
              <div class="col-span-2 md:col-span-1">
                <div class="mams-label">
                  Phone
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="phone"
                  :rules="{ required: true}"
                  class="mb-3"
                  tag="div"
                >
                  <el-input v-model="formData.phone" placeholder="Please input phone" />
                  <div class="text-error">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </div>
            </div>
            <div class="row-input grid grid-cols-2 gap-4">
              <div class="col-span-2 md:col-span-1">
                <div class="mams-label">
                  Email
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="name"
                  :rules="{ required: true}"
                  class="mb-3"
                  tag="div"
                >
                  <el-input v-model="formData.email" placeholder="Please input email">
                    <template slot="append">
                      @gmail.com
                    </template>
                  </el-input>
                  <div class="text-error">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </div>
              <div class="col-span-2 md:col-span-1">
                <div class="mams-label">
                  Date of birth
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="phone"
                  :rules="{ required: true}"
                  class="mb-3"
                  tag="div"
                >
                  <el-date-picker
                    v-model="formData.dob"
                    type="date"
                    placeholder="Pick a day"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  />
                  <div class="text-error">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </div>
            </div>
            <div class="row-input grid grid-cols-3 gap-4">
              <div class="col-span-3 mams-label md:col-span-1">
                <div class="mams-label">
                  City/Province
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="city"
                  :rules="{ required: true}"
                  class="mb-3"
                  tag="div"
                >
                  <el-select v-model="formData.city" class="item-input" filterable placeholder="Select district">
                    <el-option
                      v-for="(item, index) in optionsCities"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <div class="text-error">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </div>
              <div class="col-span-3 mams-label md:col-span-1">
                <div class="mams-label">
                  District
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="district"
                  :rules="{ required: true}"
                  class="mb-3"
                  tag="div"
                >
                  <el-select v-model="formData.district" class="item-input" filterable placeholder="Select district">
                    <el-option
                      v-for="(item, index) in optionsDistricts"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <div class="text-error">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </div>
              <div class="col-span-3 mams-label md:col-span-1">
                <div class="mams-label">
                  Commune
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="commune"
                  :rules="{ required: true}"
                  class="mb-3"
                  tag="div"
                >
                  <el-select v-model="formData.commune" class="item-input" placeholder="Select commune">
                    <el-option
                      v-for="(item, index) in optionsCommunes"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <div class="text-error">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </div>
            </div>
            <div class="row-input grid grid-cols-4 gap-4">
              <div class=" col-start-1 col-end-5">
                <div class="mams-label">
                  Address
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="building type"
                  :rules="{ required: true}"
                  class="mb-3"
                  tag="div"
                >
                  <el-input v-model="formData.address" placeholder="Please input building address" style="width: 100%;" />
                  <div class="text-error">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </div>
            </div>

            <div class="row-input grid grid-cols-2 gap-4">
              <div class="col-span-2 md:col-span-1">
                <div class="mams-label">
                  Identity card number
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="identity card number"
                  :rules="{ required: true, numeric: true,}"
                  class="mb-3"
                  tag="div"
                >
                  <el-input v-model="formData.ci_number" placeholder="Number only" />
                  <div class="text-error">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </div>
              <div class="col-span-2 mams-label md:col-span-1">
                <div class="mams-label">
                  Date of issuance of identity card
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="phone"
                  :rules="{ required: true}"
                  class="mb-3"
                  tag="div"
                >
                  <el-date-picker
                    v-model="formData.date_of_issuance_of_ci"
                    type="date"
                    placeholder="Pick a day"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  />
                  <div class="text-error">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </div>
            </div>
            <div class="row-input grid grid-cols-4 gap-4">
              <div class=" col-start-1 col-end-5">
                <div class="mams-label">
                  The place where the people's identity card is issued
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="the place"
                  :rules="{ required: true}"
                  class="mb-3"
                  tag="div"
                >
                  <el-input v-model="formData.place_of_issuance_of_ci" placeholder="Please input the place" style="width: 100%;" />
                  <div class="text-error">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </div>
            </div>
            <div class="row-input grid grid-cols-1 gap-4">
              <div class="col-span-1">
                <div class="mams-label">
                  Identity card images
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  :rules="{ required: false}"
                  class="mb-3"
                  tag="div"
                >
                  <el-upload
                    action="#"
                    :before-upload="beforeUploadIDCard"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                  >
                    <i class="el-icon-plus" />
                  </el-upload>
                  <div class="text-error">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </div>
            </div>
            <div class="row-input grid grid-cols-1 gap-4">
              <div class="col-span-1">
                <div class="mams-label">
                  Note
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  :rules="{ required: false}"
                  class="mb-3"
                  tag="div"
                >
                  <el-input
                    v-model="formData.detail"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="Note..."
                  />
                  <div class="text-error">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </div>
            </div>
          </ValidationObserver>
        </div>
      </div>

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
        avatar: ''
      },
      fileList: [],
      dialogImageUrl: '',
      optionsCities: CITIES,
      optionsCommunes: [],
      optionsDistricts: [],
      utilitiesList: UTILITIES,
      rulesList: RULES,
      activeName: 'first',
      imageUrl: ''
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
    EventBus.$on('OpenEditClient', (val, data) => {
      this.dialogVisible = val
      this.fileList = []
      // eslint-disable-next-line no-console
      console.log('dataOpenEditClient', data.data.data)
      const datas = data.data.data
      this.formData.id = datas.id
      this.formData.name = datas.name
      this.formData.type_building = datas.type_building
      this.formData.address = datas.address
      this.formData.city = datas.city
      this.formData.district = datas.district
      this.formData.commune = datas.commune
      this.formData.images = datas.images ? (datas.images.slice(1, -1)).split(',') : []
      this.formData.detail = datas.detail
      this.formData.phone = datas.phone
      this.imageUrl = (datas.avatar) ? process.env.imgLink + datas.avatar.slice(1, -1) : '#'
      this.formData.avatar = (datas.avatar) ? datas.avatar : '#'
      this.formData.email = datas.email
      this.formData.dob = datas.dob
      this.formData.ci_number = datas.ci_number
      this.formData.date_of_issuance_of_ci = datas.date_of_issuance_of_ci
      this.formData.place_of_issuance_of_ci = datas.place_of_issuance_of_ci
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
      this.$emit('handle-submit', this.formData, this.fileList)
      this.dialogVisible = false
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeUploadIDCard (file, fileList) {
      // eslint-disable-next-line no-console
      this.$emit('handle-import-image-id-card', file)
    },
    beforeAvatarUpload (file, fileList) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 2048 / 2048 < 2

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      this.$emit('handle-import-avatar', file)
      return isJPG && isLt2M
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 200px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 200px;
  display: block;
}
</style>
