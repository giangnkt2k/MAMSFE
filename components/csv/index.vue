<template>
  <div>
    <el-card class="my-5">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-change="handleChange"
        :file-list="fileList"
        :before-upload="beforeAvatarUpload"
      >
        <el-button size="small" type="primary">
          Upload file building
        </el-button>
        <div slot="tip" class="el-upload__tip">
          csv/excel files with a size less than 2mb
        </div>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'IndexCsv',
  data () {
    return {
      fileList: []
    }
  },
  methods: {
    beforeAvatarUpload (file, fileList) {
      // eslint-disable-next-line no-console
      console.log('type', file.type)
      const isJPG = file.type === 'text/csv'
      const isLt2M = file.size / 2048 / 2048 < 2

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      this.$emit('handle-import-avatar', file)
      return isJPG && isLt2M
    }
  }
}
</script>

<style>

</style>
