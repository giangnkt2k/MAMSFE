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
import EventBus from '@/utils/eventBus'
import { currentUser } from '@/api/user'
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
  async created () {
    await this.fetchCurrentUser()
    EventBus.$on('responseStatusCode', (statusCode) => {
      if (statusCode === 401) {
        this.$store.commit('auth/logout')
      }
    })
    // eslint-disable-next-line no-console
    console.log('Deploy version: 1.1.0')
  },
  methods: {
    handleChangeTypeMenu (value) {
      this.isCollapse = value
    },
    async fetchCurrentUser () {
      this.$store.commit('pages/setLoading', true)
      try {
        const res = await currentUser()
        const user = res.data.data || {}
        this.$store.commit('user/setCurrentUser', user)
        this.$store.commit('pages/setLoading', false)
      } catch (e) {
        this.$store.commit('pages/setLoading', false)
        const message = e.response.data.message || ''
        this.$toast.error(message)
      }
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
