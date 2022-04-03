<template>
  <div>
    <el-dialog
      title="Create Contract"
      :visible.sync="dialogVisible"
      append-to-body
      width="70%"
    >
      <div>
        <div>
          <ValidationObserver
            ref="obsAddContract"
            tag="div"
          >
            <div class="row-input grid grid-cols-2 gap-4">
              <div class="col-span-2 md:col-span-1">
                <div class="mams-label">
                  Type
                </div>
                <validation-provider
                  v-slot="{ errors }"
                  name="name"
                  :rules="{ required: true}"
                  class="mb-3"
                  tag="div"
                >
                  <el-input v-model="formData.type" placeholder="Please input name" />
                  <div class="text-error">
                    {{ errors[0] }}
                  </div>
                </validation-provider>
              </div>
            </div>
            <div class="row-input grid grid-cols-1 gap-4">
              <div class="col-span-1">
                <div class="mams-label">
                  Content
                </div>
                <ckeditor-nuxt v-model="formData.content" :config="editorConfig" />
                <validation-provider
                  v-slot="{ errors }"
                  :name="'content'"
                  class="mb-3"
                  tag="div"
                >
                  <!-- <ckeditor v-model="formData.content" /> -->
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
        type: '',
        content: ''
      },
      dialogImageUrl: '',
      optionsCommunes: [],
      optionsDistricts: [],
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
    }
  },
  mounted () {
    EventBus.$on('OpenCreateContract', (val) => {
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
      const isValid = await this.$refs.obsAddContract.validate()
      if (!isValid) {
        this.$message.warning('Something went wrong')
        return
      }
      this.$emit('handle-submit', this.formData)
      this.dialogVisible = false
      this.handleClearform()
    },

    handleClearform () {
      this.formData = {
        type: '',
        content: ''
      }
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
.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-blurred {
  height: 600px;
}
.ck.ck-content.ck-editor__editable.ck-rounded-corners.ck-editor__editable_inline.ck-focused {
  height: 600px;
}
</style>
