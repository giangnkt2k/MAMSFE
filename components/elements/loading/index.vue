<template>
  <div v-loading.fullscreen.lock="propsIsLoading" />
</template>

<script>
export default {
  name: 'LoadingComponent',
  props: {
    propsIsLoading: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fullscreenLoading: false
    }
  }
}
</script>

<style>
.el-loading-spinner {
    top: 50%;
    margin-top: -21px;
    left: 50%;
    width: 100%;
    text-align: center;
    position: absolute;
}
</style>
