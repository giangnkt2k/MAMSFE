<template>
  <div>
    <el-dialog
      title="Create Many Building"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <div style="text-align: -webkit-center;">
        <el-upload
          class="upload-demo"
          drag
          action="#"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          multiple
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
        <!-- <div slot="tip" class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div> -->
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleSubmit">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus'

export default {
  data () {
    return {
      dialogVisible: false
    }
  },
  mounted () {
    EventBus.$on('OpenCreateManyBuilding', (val) => {
      // eslint-disable-next-line no-console
      console.log('ngon')
      this.dialogVisible = val
    })
    EventBus.$on('hideDeleteConfirmDialog', () => {
      this.dialogVisible = false
    })
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
    }
  }
}
</script>

<style>

</style>
