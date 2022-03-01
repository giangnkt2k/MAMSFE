<template>
  <div class="app-main">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet">
    <right-bar :props-collapse="isCollapse" />
    <div
      :class="{marginOff: isCollapse}"
      class="main-content-container"
    >
      <top-bar @handle-change-type-menu="handleChangeTypeMenu" />
      <nuxt class="min-h-screen bg-gray-100" />
      <loading :props-is-loading="isLoading" />
    </div>
  </div>
</template>

<script>
import RightBar from '@/components/layouts/RightBar.vue'
import TopBar from '@/components/layouts/TopBar.vue'
import loading from '@/components/elements/loading/index.vue'
export default {
  name: 'DefaultLayoutTemplate',
  components: {
    RightBar,
    TopBar,
    loading
  },
  middleware: ['initAuth', 'auth'],
  data () {
    return {
      isCollapse: false
    }
  },
  computed: {
    isLoading () {
      // eslint-disable-next-line no-console
      return this.$store.getters['pages/getLoading']
    }
  },
  methods: {
    handleChangeTypeMenu (value) {
      this.isCollapse = value
    }
  }
}
</script>
<style scoped>
.marginOn {
  margin-left: 210px;
  transition: margin-left 0.5s;
}

.marginOff {
  margin-left: 65px !important;
  transition: margin-left 0.25s;
}
.main-content-container {
  transition: margin-left 0.25s;
  margin-left: 210px;
}
</style>
